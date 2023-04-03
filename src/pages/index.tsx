import { type NextPage } from "next";
import { SignInButton, useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const { isSignedIn } = useUser();

  if (isLoading) return <h1>LOADING...</h1>;

  if (!data) return <h1>ERROR</h1>;

  return (
    <>
      <Layout>
        {isSignedIn ? (
          <div className="h-screen">SIEEEMA</div>
        ) : (
          <Layout>
            <div className="flex h-screen items-center justify-center">
              <SignInButton mode="modal">
                <button className="btn rounded-2xl bg-blue-500 px-10 py-2 font-bold text-white transition hover:bg-blue-600">
                  Sign in
                </button>
              </SignInButton>
            </div>
          </Layout>
        )}
      </Layout>
    </>
  );
};

export default Home;