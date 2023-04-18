import Layout from "~/components/layouts/Layout";
import { SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import PostsItem from "~/components/Posts/PostItem/PostsItem";

const Bookmarks = () => {
  const { isSignedIn, user } = useUser();
  if (!user) return <div />;
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