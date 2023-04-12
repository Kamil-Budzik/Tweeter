import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import Link from "next/link";
import PostsItemActionbar from "~/components/Posts/PostsItemActionbar";

type Props = RouterOutputs["posts"]["getAll"][number];
const PostsItem = ({ post, author }: Props) => {
  if (!post || !author) return <div />;
  return (
    <article className="mb-6 max-w-3xl rounded rounded-2xl bg-white p-4 shadow">
      <div className="flex " id="post-card-header">
        <Link
          href={`/profile/${author.username}`}
          className="rounded-2xl bg-[#BDBDBD]"
        >
          <img
            className="duration-750 h-16 w-16 cursor-pointer rounded-2xl object-cover transition hover:opacity-50"
            src={author.profileImageUrl}
            alt={
              author.username
                ? `${author.username}'s picture`
                : `Author's picture`
            }
          />
        </Link>

        <div className="ml-3">
          <Link href={`/profile/${author.username}`}>
            <header className="text-lg font-semibold hover:underline">
              {author.username}
            </header>
          </Link>
          <p className="text-sm font-semibold text-[#BDBDBD]">
            {dayjs(post.createdAt).format("DD MMMM HH:mm")}
          </p>
        </div>
      </div>
      <div id="post-card-content" className="my-4 text-[#4F4F4F]">
        <p>{post.content}</p>
      </div>
      <PostsItemActionbar />
    </article>
  );
};

export default PostsItem;