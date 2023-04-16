import { LoadingSpinner } from "~/components/ui/Loading";
import ProfileImage from "~/components/ui/ProfileImage";
import PostCommentsLikes from "~/components/Posts/comments/PostCommentsLikes";
import PostCommentHeader from "~/components/Posts/comments/PostCommentHeader";
import { api } from "~/utils/api";

const PostCommentsList = ({ postId }: { postId: number }) => {
  const { data, isLoading } = api.comments.getByPostId.useQuery({ postId });

  if (!data) return <div />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <ul className="border-t border-[#F2F2F2]">
        {data.map(({ comment, author }) => (
          <li
            className="mt-2 grid grid-cols-[auto_1fr] grid-rows-[auto_auto]"
            key={comment.id}
          >
            <ProfileImage
              size={10}
              username={author?.username ?? ""}
              imgUrl={author?.profileImageUrl ?? ""}
            />
            <div className="break-all rounded bg-[#FAFAFA] p-2 pb-4 text-[#4F4F4F] shadow">
              <PostCommentHeader
                postId={postId}
                username={author?.username ?? ""}
                authorId={author?.id ?? ""}
                createdAt={comment.createdAt}
                commentId={comment.id}
              />
              {comment.content}
            </div>
            <PostCommentsLikes
              likes={comment.likes}
              postId={postId}
              commentId={comment.id}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostCommentsList;