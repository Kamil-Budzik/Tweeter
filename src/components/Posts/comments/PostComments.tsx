import { type SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { LoadingSpinner } from "~/components/ui/Loading";
import { api } from "~/utils/api";
import PostCommentForm from "~/components/Posts/comments/PostCommentForm";
import PostCommentsList from "~/components/Posts/comments/PostCommentsList";

interface Props {
  postId: number;
}

const PostComments = ({ postId }: Props) => {
  const { data } = api.posts.getAdditionalData.useQuery({ postId });

  console.log(data);

  return (
    <div className="border-t border-[#F2F2F2]">
      <PostCommentForm postId={postId} />
      <PostCommentsList postId={postId} />
    </div>
  );
};

export default PostComments;