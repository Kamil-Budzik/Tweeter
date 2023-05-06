import { Button } from "~/components/ui/Button";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

interface Props {
  username: string;
  bio: string;
  following: number;
  followers: number;
  profileImageUrl: string;
  userId: string;
}

const ProfileHeader = ({
  username,
  bio,
  following,
  followers,
  profileImageUrl,
  userId,
}: Props) => {
  const ctx = api.useContext();
  const { user } = useUser();
  const { data: isFollowed } = api.profile.getFollowStatus.useQuery({
    userId: user?.id || "",
    userToCheck: userId || "",
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
      userToFollow: userId,
    });
  };

  return (
    <header>
      <img
        src="https://i.imgur.com/QfNtRGI.jpg"
        alt="Profile background"
        className="h-[300px] w-full object-cover"
      />
      <div className="content-wrapper">
        <div className="header-content-container profile-margins">
          {/*Profile Image*/}
          <div className="transform-header-items mx-6 flex h-36 w-36 items-center justify-center rounded-xl bg-white shadow-md md:transform md:justify-self-center">
            <img
              src={profileImageUrl}
              alt={`${username}'s profile image`}
              className="h-32 w-32 rounded-xl object-cover"
            />
          </div>

          {/*Username header*/}
          <h1 className="transform-header-items mb-2 text-center text-2xl font-bold text-[#333333] md:mb-0">
            {username}
          </h1>

          {/*Stats*/}
          <div className="transform-header-items flex">
            <p className="mr-3">
              <span className="font-bold text-[#333333]">{following}</span>{" "}
              Following
            </p>
            <p>
              <span className="font-bold text-[#333333]">{followers}</span>{" "}
              Followers
            </p>
          </div>

          {/*BIO*/}
          <p
            className="transform-header-items max-w-xs text-center
        md:col-start-2 md:row-span-2 md:self-start md:text-start"
          >
            {bio}
          </p>

          {/*Follow button*/}
          {user?.username !== username && (
            <div className="transform-header-items flex justify-center md:col-start-4  md:row-start-1 md:justify-self-center">
              <div onClick={handleClick}>
                {isFollowed ? (
                  <Button>Following</Button>
                ) : (
                  <Button icon="follow">Follow</Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;