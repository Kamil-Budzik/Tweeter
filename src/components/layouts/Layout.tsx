import { type FC, type ReactNode } from "react";
import { AiFillHome, AiFillCompass } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import Link from "next/link";
import MobileLogo from "~/assets/icons/tweeter-small";
import DesktopLogo from "~/assets/icons/tweeter";

import { UserButton } from "@clerk/clerk-react";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="fixed left-0 right-0 top-0">
      <div className="flex items-center justify-between p-2">
        <Link href="/">
          <MobileLogo />
          <DesktopLogo />
        </Link>
        <ul className="hidden md:flex">
          <li className="font-semibold text-blue-500">
            <Link href="/" className="mx-10 border-b-2 border-blue-500">
              HOME
            </Link>
          </li>
          <li className="text-[#828282]">
            <Link href="/" className="mx-10">
              Explore
            </Link>
          </li>
          <li className="text-[#828282]">
            <Link href="/" className="mx-10">
              Bookmarks
            </Link>
          </li>
        </ul>
        <div>
          <UserButton showName={true} />
        </div>
      </div>
      <main className="flex-grow bg-[#F2F2F2]">{props.children}</main>
      <nav className="fixed bottom-0 left-0 right-0 flex bg-white md:hidden">
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