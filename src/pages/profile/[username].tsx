import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "~/components/layouts/Layout";
import { Button } from "~/components/ui/Button";
import useProfile, { ACTIVE_FILTER } from "~/hooks/useProfile";
import { prisma } from "~/server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import ProfileTweets from "~/components/Profile/ProfileTweets";
import Filters from "~/components/ui/Filters";
import ProfileFilteredTweets from "~/components/Profile/ProfileFilteredTweets";
import { SignInButton, useUser } from "@clerk/nextjs";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data, filter, navItems } = useProfile(username);

  const { isSignedIn } = useUser();

  if (!isSignedIn)
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <SignInButton mode="modal">
            <button className="btn rounded-2xl bg-blue-500 px-10 py-2 font-bold text-white transition hover:bg-blue-600">
              Sign in
            </button>
          </SignInButton>
        </div>
      </Layout>
    );

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

  const { user, posts, followData } = data;

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
          following={followData.follows.length}
          followers={followData.followedBy.length}
          profileImageUrl={user.profileImageUrl}
          userId={user.id}
        />
        <section className="content-wrapper md:grid md:grid-cols-[350px_1fr]">
          <Filters activeFilter={filter} items={navItems} />
          {filter === ACTIVE_FILTER.TWEETS ? (
            <ProfileTweets posts={posts} user={user} />
          ) : (
            <ProfileFilteredTweets filter={filter} userId={user.id} />
          )}
        </section>
      </Layout>
    </>
  );
};

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

  await ssg.profile.getDataByUsername.prefetch({
    username,
  });

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