import { api, type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import Link from "next/link";
import PostsItemActionbar from "~/components/Posts/PostsItemActionbar";
import { useUser } from "@clerk/nextjs";
import PostComments from "~/components/Posts/comments/PostComments";
import ProfileImage from "~/components/ui/ProfileImage";

type Props = RouterOutputs["posts"]["getAll"][number];
const PostsItem = ({ post, author }: Props) => {
  const { user } = useUser();
  const { data: comments } = api.comments.getByPostId.useQuery({
    postId: post.id,
  });
  if (!post || !author) return <div />;

  const isLiked = post.likes.find((like) => like.userId === user?.id);

  return (
    <article className="mb-6 max-w-3xl rounded rounded-2xl bg-white p-4 shadow">
      <div className="flex " id="post-card-header">
        <ProfileImage
          size={16}
          username={author.username}
          imgUrl={author.profileImageUrl}
        />

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

      <div>{post.likes.length} Likes</div>
      <div>{comments?.length} comments</div>
      <PostsItemActionbar isLiked={!!isLiked} postId={post.id} />
      <PostComments postId={post.id} />
    </article>
  );
};

export default PostsItem;