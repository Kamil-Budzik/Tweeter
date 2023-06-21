import { api, type RouterOutputs } from "~/utils/api";
import FollowTemplate from "~/components/Profile/modals/FollowTemplate";
import FollowModalItem from "~/components/Profile/modals/FollowModalItem";

interface Props {
  isFollowersModal: boolean;
  isFollowingModal: boolean;
  followData: RouterOutputs["profile"]["getDataByUsername"]["followData"];
  toggleFollowersModal: () => void;
  toggleFollowingModal: () => void;
  username: string;
}

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

  console.log(data);

  return (
    <>
      <FollowTemplate
        isOpen={isFollowersModal}
        contentLabel="Followers list pop-up"
        handler={toggleFollowersModal}
        username={username}
      >
        {data?.followedBy.map((follower) => (
          <FollowModalItem key={follower.id} {...follower} />
        ))}
      </FollowTemplate>
      <FollowTemplate
        isOpen={isFollowingModal}
        contentLabel="Following list pop-up"
        handler={toggleFollowingModal}
        username={username}
      >
        {data?.follows.map((follow) => (
          <FollowModalItem key={follow.id} {...follow} />
        ))}
      </FollowTemplate>
    </>
  );
};

export default ProfileFollowModals;