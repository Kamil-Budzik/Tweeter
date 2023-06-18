import { useUser } from "@clerk/nextjs";
import PostsItemActionbar from "~/components/Posts/PostItem/PostsItemActionbar";
import PostComments from "~/components/Posts/comments/PostComments";
import UserImage from "~/components/ui/UserImage";
import PostItemHeader from "~/components/Posts/PostItem/PostItemHeader";
import { api, type RouterOutputs } from "~/utils/api";

type Props = RouterOutputs["posts"]["getAll"][number];

const PostsItem = ({ post, author }: Props) => {
  const { user } = useUser();
  const { data: comments } = api.comments.getByPostId.useQuery({
    postId: post.id,
  });
  if (!post || !author) return <div />;

  const isLiked = post.likes.find((like) => like.userId === user?.id);
  const isSaved = post.saves.find((save) => save.userId === user?.id);

  return (
    <article className="mb-6 max-w-3xl rounded-2xl bg-white p-4 shadow">
      <div className="flex " id="post-card-header">
        <UserImage
          size={16}
          username={author.username}
          imgUrl={author.profileImageUrl}
        />
        <PostItemHeader username={author.username} createdAt={post.createdAt} />
      </div>

      <div id="post-card-content" className="my-4 text-[#4F4F4F]">
        <p>{post.content}</p>
      </div>

      <ul className="mb-4 flex justify-end">
        <li className="mr-2 text-[#BDBDBD]">{post.likes.length} Likes</li>
        <li className="mr-2 text-[#BDBDBD]">{comments?.length} comments</li>
        <li className="text-[#BDBDBD]">{post.saves?.length} Saves</li>
      </ul>
      <PostsItemActionbar
        isLiked={!!isLiked}
        postId={post.id}
        isSaved={!!isSaved}
      />
      <PostComments postId={post.id} />
    </article>
  );
};

export default PostsItem;