import Link from "next/link";

interface Props {
  size: number;
  username: string;
  imgUrl: string;
}

const UserImage = ({ size, username, imgUrl }: Props) => (
  <Link href={`/profile/${username}`}>
    <div className={`mr-2 h-${size} w-${size} rounded-2xl bg-[#BDBDBD]`}>
      <img
        className={`duration-750 d mr-2 h-${size} w-${size} rounded-2xl object-cover transition hover:opacity-50`}
        src={imgUrl}
        alt="Author's image"
      />
    </div>
  </Link>
);

export default UserImage;