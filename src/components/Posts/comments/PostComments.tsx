import PostCommentForm from "~/components/Posts/comments/PostCommentForm";
import PostCommentsList from "~/components/Posts/comments/PostCommentsList";

interface Props {
  postId: number;
}

const PostComments = ({ postId }: Props) => {
  return (
    <div className="border-t border-[#F2F2F2]">
      <PostCommentForm postId={postId} />
      <PostCommentsList postId={postId} />
    </div>
  );
};

export default PostComments;