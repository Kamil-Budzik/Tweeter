import { type NextPage } from "next";
import { SignInButton, useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import Posts from "~/components/Posts";

// TODO: https://clerk.com/blog/building-custom-user-profile-with-clerk?utm_source=www.google.com&utm_medium=referral&utm_campaign=none
// TODO: CHECK this link for handling user bio with unsafeMetadata/publicMetadata

const Home: NextPage = () => {
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

  return (
    <>
      <Layout>
        <Posts />
      </Layout>
    </>
  );
};

export default Home;