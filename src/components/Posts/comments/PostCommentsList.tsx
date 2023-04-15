import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/ui/Loading";
import dayjs from "dayjs";
import Link from "next/link";

const PostCommentsList = ({ postId }: { postId: number }) => {
  const { data, isLoading } = api.posts.getAdditionalData.useQuery({ postId });

  if (!data) return <div />;
  console.log(data);
  if (isLoading) return <LoadingSpinner />;

  // TODO extract image with hover effect to a new component that accepts width and height as arg

  return (
    <>
      <ul className="border-t border-[#F2F2F2]">
        {data.map(({ comment, author }) => (
          <li className="mt-2 flex" key={comment.id}>
            <Link href={`/profile/${author?.username}`}>
              <div className="mr-2 h-10 w-10 rounded-2xl bg-[#BDBDBD]">
                <img
                  className="duration-750 d mr-2 h-10 w-10 rounded-2xl object-cover transition hover:opacity-50"
                  src={author?.profileImageUrl}
                  alt="Author's image"
                />
              </div>
            </Link>
            <div className="flex-grow rounded bg-[#FAFAFA] p-2 pb-4 text-[#4F4F4F] shadow">
              <div className="flex items-center text-[#BDBDBD]">
                <Link href={`/profile/${author?.username}`}>
                  <span className="mr-2 font-semibold text-black hover:underline">
                    {author?.username}
                  </span>
                </Link>
                {dayjs(comment.createdAt).format("DD MMMM HH:mm")}
              </div>
              {comment.content}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostCommentsList;