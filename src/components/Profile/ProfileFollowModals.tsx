import Modal from "react-modal";
import { api, type RouterOutputs } from "~/utils/api";

interface Props {
  isFollowersModal: boolean;
  isFollowingModal: boolean;
  followData: RouterOutputs["profile"]["getDataByUsername"]["followData"];
  toggleFollowersModal: () => void;
  toggleFollowingModal: () => void;
}

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ProfileFollowModals = ({
  toggleFollowersModal,
  isFollowingModal,
  isFollowersModal,
  toggleFollowingModal,
  followData,
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
        FollowersModal
        {data?.followedBy.map((follower) => (
          <div>
            <h1>{follower.username}</h1>
          </div>
        ))}
        <button onClick={toggleFollowersModal}>Close</button>
      </Modal>
      <Modal
        isOpen={isFollowingModal}
        contentLabel="Following list pop-up"
        shouldCloseOnOverlayClick
        onRequestClose={toggleFollowingModal}
        style={modalStyles}
      >
        Following modal
        {data?.follows.map((follow) => (
          <div>
            <h1>{follow.username}</h1>
          </div>
        ))}
        <button onClick={toggleFollowingModal}>Close</button>
      </Modal>
    </>
  );
};

export default ProfileFollowModals;