import { BiComment, BiRefresh } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { ITEMS_ACTION } from "../Posts.types";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { LoadingSpinner } from "~/components/ui/Loading";

interface Props {
  isLiked: boolean;
  postId: number;
  isSaved: boolean;
}
const PostsItemActionbar = ({ isLiked, postId, isSaved }: Props) => {
  const ctx = api.useContext();
  const { user } = useUser();

  const { mutate: toggleLike, isLoading: isLoadingLike } =
    api.posts.toggleLike.useMutation({
      onSuccess: () => invalidateQueries(),
    });
  const { mutate: savePost, isLoading: isLoadingSave } =
    api.posts.toggleSave.useMutation({
      onSuccess: () => invalidateQueries(),
    });

  const invalidateQueries = () => {
    void ctx.posts.getAll.invalidate();
    void ctx.posts.getByUsername.invalidate();
    void ctx.posts.getSavedById.invalidate({ userId: user?.id });
    void ctx.posts.getWithFilters.invalidate({ userId: user?.id });
  };

  const handleClick = (action: ITEMS_ACTION) => {
    if (!user) return;
    switch (action) {
      case ITEMS_ACTION.LIKE:
        toggleLike({ isLiked: isLiked, postId, userId: user?.id });
        break;
      case ITEMS_ACTION.RETWEET:
        console.log("RETWEET");
        break;
      case ITEMS_ACTION.BOOKMARK:
        savePost({ isSaved: isSaved, userId: user?.id, postId });
        break;
      default:
        return;
    }
  };

  return (
    <ul className="flex items-center border-t border-[#F2F2F2] text-xl text-[#4F4F4F]">
      {/*COMMENT*/}
      <li
        className={`mt-1 flex w-1/4 cursor-pointer items-center justify-center rounded transition duration-300 hover:bg-blue-300 hover:text-blue-600`}
        onClick={() => handleClick(ITEMS_ACTION.COMMENT)}
      >
        <label
          htmlFor={`comment-input-${postId}`}
          className="flex w-full cursor-pointer items-center justify-center  py-3"
        >
          <BiComment />
          <p className="ml-2 hidden text-sm md:block">Comment</p>
        </label>
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
        {isLoadingLike ? (
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
        className={`mt-1 flex w-1/4 cursor-pointer items-center justify-center rounded py-3 transition duration-300 ${
          isSaved ? "text-blue-600" : "hover:bg-blue-300 hover:text-blue-600"
        }`}
        onClick={() => handleClick(ITEMS_ACTION.BOOKMARK)}
      >
        {isLoadingSave ? (
          <LoadingSpinner size={15} />
        ) : (
          <>
            <FaRegBookmark />
            <p className="ml-2 hidden text-sm md:block">
              {isSaved ? "Saved" : "Save"}
            </p>
          </>
        )}
      </li>
    </ul>
  );
};

export default PostsItemActionbar;