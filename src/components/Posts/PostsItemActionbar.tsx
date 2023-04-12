import { BiComment, BiRefresh } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { ITEMS_ACTION } from "./Posts.types";

const items = [
  {
    icon: <BiComment />,
    action: ITEMS_ACTION.COMMENT,
    styles: "hover:bg-blue-300 hover:text-blue-600",
  },
  {
    icon: <BiRefresh />,
    action: ITEMS_ACTION.RETWEET,
    styles: "hover:bg-green-300 hover:text-green-600",
  },
  {
    icon: <AiOutlineHeart />,
    action: ITEMS_ACTION.LIKE,
    styles: "hover:bg-red-300 hover:text-red-600",
  },
  {
    icon: <FaRegBookmark />,
    action: ITEMS_ACTION.BOOKMARK,
    styles: "hover:bg-blue-300 hover:text-blue-600",
  },
];
const PostsItemActionbar = () => {
  const handleClick = (action: ITEMS_ACTION) => {
    switch (action) {
      case ITEMS_ACTION.LIKE:
        console.log("LIKE A POST");
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
      {items.map((item) => (
        <li
          className={`mt-1 flex w-1/4 cursor-pointer items-center justify-center rounded py-3 transition duration-300 ${item.styles} `}
          key={item.action}
          onClick={() => handleClick(item.action)}
        >
          {item.icon}
        </li>
      ))}
    </ul>
  );
};

export default PostsItemActionbar;