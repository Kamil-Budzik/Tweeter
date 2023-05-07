import { SignInButton, useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import PostsItem from "~/components/Posts/PostItem/PostsItem";
import { LoadingPage } from "~/components/ui/Loading";
import ErrorPage from "~/components/ui/Error";
import { api } from "~/utils/api";

const Bookmarks = () => {
  const { isSignedIn, user } = useUser();

  const { data, isLoading } = api.posts.getSavedById.useQuery({
    userId: user?.id || "",
  });

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

  if (isLoading) return <LoadingPage />;

  if (!data) return <ErrorPage />;

  // TODO handle empty array later on

  return (
    <Layout>
      <div className="mt-8">
        {!data.length && <section>You {"don't"} have any saved tweets</section>}
        {data.map((item) => (
          <PostsItem
            post={item.post.post}
            author={item.author}
            key={item.post.id}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Bookmarks;