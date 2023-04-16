import Link from "next/link";
import dayjs from "dayjs";

interface Props {
  username: string;
  createdAt: Date;
}
const PostItemHeader = ({ username, createdAt }: Props) => (
  <div className="ml-3">
    <Link href={`/profile/${username}`}>
      <header className="text-lg font-semibold hover:underline">
        {username}
      </header>
    </Link>
    <p className="text-sm font-semibold text-[#BDBDBD]">
      {dayjs(createdAt).format("DD MMMM HH:mm")}
    </p>
  </div>
);

export default PostItemHeader;