import { Button } from "~/components/ui/Button";

interface Props {
  username: string;
  bio: string;
  following: number;
  followers: number;
  profileImageUrl: string;
}

const ProfileHeader = ({
  username,
  bio,
  following,
  followers,
  profileImageUrl,
}: Props) => {
  return (
    <header>
      <img
        src="https://i.imgur.com/QfNtRGI.jpg"
        alt="Profile background"
        className="h-[300px] w-full object-cover"
      />
      <div className="mx-4 -translate-y-12 transform text-[#828282]">
        {/*White space container*/}
        <div className="rounded-2xl bg-white px-2 py-4">
          {/*Image container*/}
          <div className="flex flex-col items-center">
            <div className="flex h-36 w-36 -translate-y-16 transform items-center justify-center rounded-xl bg-white shadow-md">
              <img
                src={profileImageUrl}
                alt={`${username}'s profile image`}
                className="h-32 w-32 rounded-xl object-cover"
              />
            </div>
            {/*Content container*/}
            <div className="-translate-y-8 transform">
              <h1 className="mb-2 text-center text-2xl font-bold text-[#333333]">
                {username}
              </h1>
              <div className="mb-2 flex justify-center">
                <p className="mr-3">
                  <span className="text-[#333333]">{following}</span> Following
                </p>
                <p>
                  <span className="text-[#333333]">{followers}</span> Followers
                </p>
              </div>
              <p className="max-w-xs text-center">{bio}</p>
              <div className="flex justify-center">
                <Button>Follow</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;