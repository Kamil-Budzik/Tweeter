import { type CommentLike } from "@prisma/client";
import { AiOutlineHeart } from "react-icons/ai";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

interface Props {
  likes: CommentLike[];
  commentId: number;
  postId: number;
}
const PostCommentsLikes = ({ likes, postId, commentId }: Props) => {
  const { user } = useUser();
  const ctx = api.useContext();
  const { mutate } = api.comments.toggleLike.useMutation({
    onSuccess: () => {
      void ctx.comments.getByPostId.invalidate({ postId });
    },
  });

  if (!user?.id) return <div />;

  const toggleLike = (v: boolean) => {
    mutate({ isLiked: v, userId: user?.id, commentId });
  };

  return (
    <div className="col-start-2 flex items-center text-[#BDBDBD]">
      {likes.find((like) => like.userId === user?.id) ? (
        <span
          onClick={() => toggleLike(true)}
          className="flex cursor-pointer items-center text-red-500"
        >
          <AiOutlineHeart className="mr-1" /> Liked
        </span>
      ) : (
        <span
          onClick={() => toggleLike(false)}
          className="flex cursor-pointer items-center hover:text-red-300"
        >
          <AiOutlineHeart className="mr-1" /> Like
        </span>
      )}
      <span className="mx-2">&#x2022;</span>
      {likes.length} likes
    </div>
  );
};

export default PostCommentsLikes;