import { type FC, type ReactNode } from "react";
import { AiFillHome, AiFillCompass } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import Link from "next/link";
import Logo from "~/assets/icons/tweeter-small";
import { UserButton } from "@clerk/clerk-react";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-between p-2">
        <Link href="/">
          <Logo />
        </Link>
        <div>
          <UserButton showName={true} />
        </div>
      </div>
      <main className="flex-grow bg-[#F2F2F2]">{props.children}</main>
      <nav className="absolute bottom-0 left-0 right-0 flex bg-white">
        <Link
          href="/"
          className="flex h-14 w-1/3 items-center justify-center border-b-2 border-blue-500 text-2xl"
        >
          <AiFillHome fill="#3b82f6" />
        </Link>
        <Link
          href="/"
          className="flex h-14 w-1/3 items-center justify-center text-2xl"
        >
          <AiFillCompass fill="#828282" />
        </Link>
        <Link
          href="/"
          className="flex h-14 w-1/3 items-center justify-center text-2xl"
        >
          <BsFillBookmarkFill fill="#828282" />
        </Link>
      </nav>
    </div>
  );
};
export default Layout;