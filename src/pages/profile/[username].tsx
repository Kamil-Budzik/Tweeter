import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import ErrorPage from "~/components/ui/Error";
import SignIn from "~/components/ui/SignIn";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import ProfileTweets from "~/components/Profile/ProfileTweets";
import Filters from "~/components/ui/Filters";
import ProfileFilteredTweets from "~/components/Profile/ProfileFilteredTweets";
import ProfileFollowModals from "~/components/Profile/modals/ProfileFollowModals";
import { prisma } from "~/server/db";
import { appRouter } from "~/server/api/root";
import useProfile, { ACTIVE_FILTER } from "~/hooks/useProfile";
import useModal from "~/hooks/useModal";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { isSignedIn } = useUser();
  const { data, filter, navItems } = useProfile(username);
  const { isModal: isFollowingModal, toggle: toggleFollowingModal } =
    useModal();
  const { isModal: isFollowersModal, toggle: toggleFollowersModal } =
    useModal();

  if (!isSignedIn) return <SignIn />;

  if (!data) return <ErrorPage isReturn msg={"Username doesn't exist"} />;

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
          openFollowersModal={toggleFollowersModal}
          openFollowingModal={toggleFollowingModal}
        />
        <section className="content-wrapper md:grid md:grid-cols-[350px_1fr]">
          <Filters activeFilter={filter} items={navItems} />
          {filter === ACTIVE_FILTER.TWEETS ? (
            <ProfileTweets posts={posts} user={user} />
          ) : (
            <ProfileFilteredTweets filter={filter} userId={user.id} />
          )}
        </section>
        <ProfileFollowModals
          isFollowersModal={isFollowersModal}
          isFollowingModal={isFollowingModal}
          toggleFollowersModal={toggleFollowersModal}
          toggleFollowingModal={toggleFollowingModal}
          followData={followData}
          username={user.username}
        />
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