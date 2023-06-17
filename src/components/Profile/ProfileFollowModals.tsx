import Modal from "react-modal";
import { api, type RouterOutputs } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { LoadingSpinner } from "~/components/ui/Loading";
import { Button } from "~/components/ui/Button";
import Link from "next/link";
import UserImage from "~/components/ui/UserImage";

interface Props {
  isFollowersModal: boolean;
  isFollowingModal: boolean;
  followData: RouterOutputs["profile"]["getDataByUsername"]["followData"];
  toggleFollowersModal: () => void;
  toggleFollowingModal: () => void;
  username: string;
}

const modalStyles = {
  content: {
    minWidth: "75vw",
    maxWidth: 636,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// TODO: move to a new file and change the name of inteface

interface IProps {
  id: string;
  username: string;
  profileImageUrl: string;
  bio: string;
}
const FollowModalItem = ({ id, profileImageUrl, username, bio }: IProps) => {
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

const ProfileFollowModals = ({
  toggleFollowersModal,
  isFollowingModal,
  isFollowersModal,
  toggleFollowingModal,
  followData,
  username,
}: Props) => {
  const { data } = api.profile.getFollowData.useQuery({
    followers: followData.followedBy,
    follows: followData.follows,
  });

  return (
    <>
      <Modal
        isOpen={isFollowersModal}
        contentLabel="Followers list pop-up"
        shouldCloseOnOverlayClick
        onRequestClose={toggleFollowersModal}
        style={modalStyles}
      >
        <div className="flex w-full items-center justify-between font-bold text-[#333333]">
          <p>{username} is following</p>
          <button onClick={toggleFollowersModal} className="text-4xl">
            &times;
          </button>
        </div>
        <ul>
          {data?.followedBy.map((follower) => (
            <FollowModalItem key={follower.id} {...follower} />
          ))}
        </ul>
      </Modal>
      <Modal
        isOpen={isFollowingModal}
        contentLabel="Following list pop-up"
        shouldCloseOnOverlayClick
        onRequestClose={toggleFollowingModal}
        style={modalStyles}
      >
        <div className="flex w-full justify-between font-bold text-[#333333]">
          <p>{username} is followed by</p>
          <button onClick={toggleFollowingModal} className="text-4xl">
            &times;
          </button>
        </div>
        {data?.follows.map((follow) => (
          <FollowModalItem key={follow.id} {...follow} />
        ))}
      </Modal>
    </>
  );
};

export default ProfileFollowModals;