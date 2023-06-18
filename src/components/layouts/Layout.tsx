import { type FC, type ReactNode } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/clerk-react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiFillHome, AiFillCompass } from "react-icons/ai";
import MobileLogo from "~/assets/icons/tweeter-small";
import DesktopLogo from "~/assets/icons/tweeter";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { user } = useUser();

  let activeRoute = "home";
  if (pathname === "/explore") activeRoute = "explore";
  if (pathname === "/bookmarks") activeRoute = "bookmarks";

  return (
    <div className="fixed left-0 right-0 top-0">
      <div className="flex items-center justify-between p-2">
        <Link href="/">
          <MobileLogo />
          <DesktopLogo />
        </Link>
        <ul className="hidden md:flex">
          <li>
            <Link
              href="/"
              className={`mx-10 ${
                activeRoute === "home"
                  ? "border-b-2 border-blue-500 font-semibold text-blue-500"
                  : "text-[#828282]"
              }`}
            >
              HOME
            </Link>
          </li>
          <li className="text-[#828282]">
            <Link
              href="/explore"
              className={`mx-10 ${
                activeRoute === "explore"
                  ? "border-b-2 border-blue-500 font-semibold text-blue-500"
                  : ""
              }`}
            >
              Explore
            </Link>
          </li>
          <li className="text-[#828282]">
            <Link
              href="/bookmarks"
              className={`mx-10 ${
                activeRoute === "bookmarks"
                  ? "border-b-2 border-blue-500 font-semibold text-blue-500"
                  : ""
              }`}
            >
              Bookmarks
            </Link>
          </li>
        </ul>
        <div className="flex">
          {user?.username && (
            <Link
              href={`/profile/${user?.username}`}
              className="mr-3 hover:underline"
            >
              {user?.username}
            </Link>
          )}
          <UserButton />
        </div>
      </div>
      <main className="h-screen flex-grow overflow-auto bg-[#F2F2F2] pb-24">
        {props.children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 flex bg-white md:hidden">
        <Link
          href="/"
          className={`flex h-14 w-1/3 items-center justify-center text-2xl ${
            activeRoute === "home" ? " border-b-2 border-blue-500 " : ""
          }`}
        >
          <AiFillHome fill={activeRoute === "home" ? "#3b82f6" : "#828282"} />
        </Link>
        <Link
          href="/"
          className={`flex h-14 w-1/3 items-center justify-center text-2xl ${
            activeRoute === "explore" ? " border-b-2 border-blue-500 " : ""
          }`}
        >
          <AiFillCompass
            fill={activeRoute === "explore" ? "#3b82f6" : "#828282"}
          />
        </Link>
        <Link
          href="/bookmarks"
          className={`flex h-14 w-1/3 items-center justify-center text-2xl ${
            activeRoute === "bookmarks" ? " border-b-2 border-blue-500 " : ""
          }`}
        >
          <BsFillBookmarkFill
            fill={activeRoute === "bookmarks" ? "#3b82f6" : "#828282"}
          />
        </Link>
      </nav>
    </div>
  );
};
export default Layout;