import { type NextPage } from "next";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/ui/Loading";
import PostsItem from "~/components/Posts/PostsItem";

const Posts: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  if (isLoading) {
    return <LoadingPage />;
  }

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
  console.log(data);

  return (
    <>
      <h1>Posts page</h1>
      {data.map((item) => (
        <PostsItem {...item} key={item.post.id} />
      ))}
      ;
    </>
  );
};

export default Posts;