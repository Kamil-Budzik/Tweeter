import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import PostsItem from "~/components/Posts/PostItem/PostsItem";
import SignIn from "~/components/ui/SignIn";
import { LoadingPage } from "~/components/ui/Loading";
import ErrorPage from "~/components/ui/Error";
import { api } from "~/utils/api";

const Bookmarks = () => {
  const { isSignedIn, user } = useUser();

  const { data, isLoading } = api.posts.getSavedById.useQuery({
    userId: user?.id || "",
  });

  if (!isSignedIn) return <SignIn />;

  if (isLoading) return <LoadingPage />;

  if (!data) return <ErrorPage isReturn />;

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