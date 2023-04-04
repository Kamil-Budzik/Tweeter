import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";

type Props = RouterOutputs["posts"]["getAll"][number];
const PostsItem = ({ post, author }: Props) => {
  if (!post || !author) return <div />;
  return (
    <article className="mb-6 max-w-3xl rounded rounded-2xl bg-white p-4 shadow">
      <div className="flex " id="post-card-header">
        <img
          className="h-16 w-16 rounded-2xl"
          src={author.profileImageUrl}
          alt={
            author.username
              ? `${author.username}'s picture`
              : `Author's picture`
          }
        />
        <div className="ml-3">
          <header className="text-lg font-semibold">{author.username}</header>
          <p className="text-sm font-semibold text-[#BDBDBD]">
            {dayjs(post.createdAt).format("DD MMMM HH:mm")}
          </p>
        </div>
      </div>
      <div id="post-card-content" className="mt-4 text-[#4F4F4F]">
        <p>{post.content}</p>
      </div>
    </article>
  );
};

export default PostsItem;