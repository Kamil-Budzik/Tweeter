import Layout from "~/components/layouts/Layout";
import { SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import ProfileTweets from "~/components/Profile/ProfileTweets";

const Bookmarks = () => {
  const { isSignedIn, user } = useUser();
  if (!user) return <div />;
  const author = {
    id: user.id,
    username: user.username!,
    profileImageUrl: user.profileImageUrl,
    bio: "",
  };
  const { data } = api.posts.getSavedById.useQuery({ userId: user?.id });

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

  if (!data) {
    return (
      <div>
        <h1>
          Sorry, but we {`couldn't`} load your data. Please refresh the the page
          or contact our support!
        </h1>
      </div>
    );
  }

  return (
    <Layout>
      <div className="mt-8">
        <ProfileTweets posts={data} user={author} />
      </div>
    </Layout>
  );
};

export default Bookmarks;