import { type RouterOutputs } from "~/utils/api";
import { LoadingPage } from "~/components/ui/Loading";
import PostsItem from "~/components/Posts/PostItem/PostsItem";
import TweetForm from "~/components/Posts/TweetForm";
import ErrorPage from "~/components/ui/Error";
interface Props {
  data?: RouterOutputs["posts"]["getAll"];
  isLoading: boolean;
}
const Posts = ({ data, isLoading }: Props) => {
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