import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/ui/Loading";
import dayjs from "dayjs";
import Link from "next/link";
import ProfileImage from "~/components/ui/ProfileImage";

import { BsFillTrash3Fill } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";
import PostCommentsLikes from "~/components/Posts/comments/PostCommentsLikes";

const PostCommentsList = ({ postId }: { postId: number }) => {
  const { data, isLoading } = api.comments.getByPostId.useQuery({ postId });
  const { user } = useUser();
  const ctx = api.useContext();
  const { mutate: deleteComment } = api.comments.deleteComment.useMutation({
    onSuccess: () => {
      void ctx.comments.getByPostId.invalidate({ postId });
    },
  });

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
              <div className="flex items-center text-[#BDBDBD]">
                <Link href={`/profile/${author!.username}`}>
                  <span className="mr-2 font-semibold text-black hover:underline">
                    {author?.username}
                  </span>
                </Link>
                {dayjs(comment.createdAt).format("DD MMMM HH:mm")}
                {user?.id === author?.id && (
                  <BsFillTrash3Fill
                    onClick={() => deleteComment({ id: comment.id })}
                    className="ml-2 cursor-pointer text-right text-black transition duration-500 hover:text-red-500"
                  />
                )}
              </div>
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