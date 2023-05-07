import Modal from "react-modal";

interface Props {
  isFollowersModal: boolean;
  isFollowingModal: boolean;
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
}: Props) => {
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
        <button onClick={toggleFollowingModal}>Close</button>
      </Modal>
    </>
  );
};

export default ProfileFollowModals;