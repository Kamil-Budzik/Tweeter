import { UserButton } from "@clerk/clerk-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div></div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Explore</Link>
        </li>
        <li>
          <Link href="/">Bookmarks</Link>
        </li>
      </ul>
      <div>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;