import Link from "next/link";
import dayjs from "dayjs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

interface Props {
  postId: number;
  username: string;
  authorId: string;
  commentId: number;
  createdAt: Date;
}
const PostCommentHeader = ({
  postId,
  username,
  authorId,
  commentId,
  createdAt,
}: Props) => {
  const { user } = useUser();
  const ctx = api.useContext();
  const { mutate: deleteComment } = api.comments.deleteComment.useMutation({
    onSuccess: () => {
      void ctx.comments.getByPostId.invalidate({ postId });
    },
  });

  return (
    <div className="flex items-center text-[#BDBDBD]">
      <Link href={`/profile/${username}`}>
        <span className="mr-2 text-black hover:underline">{username}</span>
      </Link>
      {dayjs(createdAt).format("DD MMMM HH:mm")}
      {user?.id === authorId && (
        <BsFillTrash3Fill
          onClick={() => deleteComment({ id: commentId })}
          className="ml-2 cursor-pointer text-right text-black transition duration-500 hover:text-red-500"
        />
      )}
    </div>
  );
};

export default PostCommentHeader;