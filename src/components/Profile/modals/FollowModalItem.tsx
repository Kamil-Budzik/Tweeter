import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/ui/Loading";
import UserImage from "~/components/ui/UserImage";
import Link from "next/link";
import { Button } from "~/components/ui/Button";

interface Props {
  id: string;
  username: string;
  profileImageUrl: string;
  bio: string;
}
const FollowModalItem = ({ id, profileImageUrl, username, bio }: Props) => {
  const { user } = useUser();
  const ctx = api.useContext();
  const { data: isFollowed, isLoading } = api.profile.getFollowStatus.useQuery({
    userId: user?.id || "",
    userToCheck: id,
  });
  const { mutate } = api.profile.toggleFollow.useMutation({
    onSuccess: () => {
      void ctx.profile.getFollowStatus.invalidate();
      void ctx.profile.getDataByUsername.invalidate({ username });
    },
  });

  const handleClick = () => {
    mutate({
      isFollowed: isFollowed || false,
      userId: user?.id as string,
      userToFollow: id,
    });
  };
  // TODO: check after adding bio mechanism
  return (
    <li
      key={id}
      className="b-[#E0E0E0] mr-12 flex items-center justify-between border-b-2 py-6"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex">
            <UserImage size={16} username={username} imgUrl={profileImageUrl} />
            <div className="ml-6">
              <Link
                href={`/profile/${username}`}
                className="mb-1 font-semibold hover:underline"
              >
                {username}
              </Link>
              <p className="hidden text-[#828282] md:block">{bio}</p>
            </div>
          </div>
          {id !== user?.id && (
            <div onClick={handleClick} className="">
              {isFollowed ? (
                <Button>Following</Button>
              ) : (
                <Button icon="follow">Follow</Button>
              )}
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default FollowModalItem;