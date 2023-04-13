import { BiComment, BiRefresh } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { ITEMS_ACTION } from "./Posts.types";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { LoadingSpinner } from "~/components/ui/Loading";

interface Props {
  isLiked: boolean;
  postId: number;
}
const PostsItemActionbar = ({ isLiked, postId }: Props) => {
  const ctx = api.useContext();
  const { mutate, isLoading } = api.posts.toggleLike.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
  });
  const { user } = useUser();

  const handleClick = (action: ITEMS_ACTION) => {
    switch (action) {
      case ITEMS_ACTION.LIKE:
        console.log("LIKE A POST");
        if (!user) return;
        mutate({ isLiked: isLiked, postId, userId: user?.id });
        break;
      case ITEMS_ACTION.RETWEET:
        console.log("RETWEET");
        break;
      case ITEMS_ACTION.COMMENT:
        console.log("Comment");
        break;
      case ITEMS_ACTION.BOOKMARK:
        console.log("Bookmark a post");
        break;
      default:
        return;
    }
  };

  return (
    <ul className="flex items-center border-t border-[#F2F2F2] text-xl text-[#4F4F4F]">
      {/*COMMENT*/}
      <li
        className={`mt-1 flex w-1/4 cursor-pointer items-center justify-center rounded py-3 transition duration-300 hover:bg-blue-300 hover:text-blue-600`}
        onClick={() => handleClick(ITEMS_ACTION.COMMENT)}
      >
        <BiComment />
        <p className="ml-2 hidden text-sm md:block">Comment</p>
      </li>

      {/*RETWEET*/}
      <li
        className={`mt-1 flex w-1/4 cursor-pointer items-center justify-center rounded py-3 transition duration-300 hover:bg-green-300 hover:text-green-600`}
        onClick={() => handleClick(ITEMS_ACTION.RETWEET)}
      >
        <BiRefresh />
        <p className="ml-2 hidden text-sm md:block">Retweet</p>
      </li>

      {/*LIKE*/}
      <li
        className={`mt-1 flex w-1/4 cursor-pointer items-center justify-center rounded py-3 transition duration-300 ${
          isLiked ? "text-red-600" : "hover:bg-red-300 hover:text-red-600"
        }`}
        onClick={() => handleClick(ITEMS_ACTION.LIKE)}
      >
        {isLoading ? (
          <LoadingSpinner size={15} />
        ) : (
          <>
            <AiOutlineHeart />
            <p className="ml-2 hidden text-sm md:block">
              {isLiked ? "Liked" : "Like"}
            </p>
          </>
        )}
      </li>

      {/*SAVE*/}
      <li
        className={`mt-1 flex w-1/4 cursor-pointer items-center justify-center rounded py-3 transition duration-300 hover:bg-blue-300 hover:text-blue-600`}
        onClick={() => handleClick(ITEMS_ACTION.BOOKMARK)}
      >
        <FaRegBookmark />
        <p className="ml-2 hidden text-sm md:block">Save</p>
      </li>
    </ul>
  );
};

export default PostsItemActionbar;