import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "~/components/layouts/Layout";
import { Button } from "~/components/ui/Button";
import useProfile, { ACTIVE_FILTER } from "~/hooks/useProfile";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data, filters, setFilters } = useProfile(username);

  if (!data)
    return (
      <>
        <Head>
          <title>Not found</title>
        </Head>
        <Layout>
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <h1>
              {" "}
              {username} {"doesn't"} exist
            </h1>
            <Link href="/">
              <Button>Return to main page</Button>
            </Link>
          </div>
        </Layout>
      </>
    );

  const { user, posts } = data;
  // TODO nav will be moved to a new component due to it's reusability, you might face some reactivity issue because of it!
  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>
      <Layout>
        <ProfileHeader
          username={user.username}
          bio={user.bio}
          following={2569}
          followers={10800}
          profileImageUrl={user.profileImageUrl}
        />
        <section className="content-wrapper md:grid md:grid-cols-[350px_1fr]">
          <nav className="profile-margins md:py-0flex mb-6 max-h-48 max-w-3xl flex-col justify-center rounded-2xl bg-white py-4 shadow">
            <ul className="flex flex-col gap-3 font-semibold text-[#828282]">
              <li
                className={
                  filters === ACTIVE_FILTER.TWEETS
                    ? "active-nav-item"
                    : "cursor-pointer"
                }
                onClick={() => setFilters(ACTIVE_FILTER.TWEETS)}
              >
                <p className="ml-2">Tweets</p>
              </li>
              <li
                className={
                  filters === ACTIVE_FILTER.REPLIES
                    ? "active-nav-item"
                    : "cursor-pointer"
                }
                onClick={() => setFilters(ACTIVE_FILTER.REPLIES)}
              >
                <p className="ml-2">Tweets & replies</p>
              </li>
              <li
                className={
                  filters === ACTIVE_FILTER.MEDIA
                    ? "active-nav-item"
                    : "cursor-pointer"
                }
                onClick={() => setFilters(ACTIVE_FILTER.MEDIA)}
              >
                <p className="ml-2">Media</p>
              </li>
              <li
                className={
                  filters === ACTIVE_FILTER.LIKES
                    ? "active-nav-item"
                    : "cursor-pointer"
                }
                onClick={() => setFilters(ACTIVE_FILTER.LIKES)}
              >
                <p className="ml-2">Likes</p>
              </li>
            </ul>
          </nav>
          <div className="mx-8 md:ml-0 md:mr-12 lg:mr-16">
            <ProfileTweets posts={posts} user={user} />
          </div>
        </section>
      </Layout>
    </>
  );
};

import { prisma } from "~/server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import ProfileTweets from "~/components/Profile/ProfileTweets";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      prisma,
    },
    transformer: superjson,
  });
  const username = context.params?.username;

  if (typeof username !== "string") throw new Error("no username");

  await ssg.posts.getByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;