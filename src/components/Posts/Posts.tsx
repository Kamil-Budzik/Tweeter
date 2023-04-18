import { type NextPage } from "next";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/ui/Loading";
import PostsItem from "~/components/Posts/PostItem/PostsItem";
import TweetForm from "~/components/Posts/TweetForm";
import ErrorPage from "~/components/ui/Error";

const Posts: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!data) return <ErrorPage />;

  return (
    <div className="flex flex-col items-center p-4">
      <TweetForm />
      <section>
        {data.map((item) => (
          <PostsItem {...item} key={item.post.id} />
        ))}
      </section>
    </div>
  );
};

export default Posts;