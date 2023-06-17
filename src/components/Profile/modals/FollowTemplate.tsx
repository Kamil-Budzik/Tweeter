import { type ReactNode } from "react";
import Modal from "react-modal";

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

interface Props {
  isOpen: boolean;
  handler: () => void;
  username: string;
  contentLabel: string;
  children: ReactNode;
}

const FollowTemplate = ({
  isOpen,
  handler,
  username,
  children,
  contentLabel,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel={contentLabel}
      shouldCloseOnOverlayClick
      onRequestClose={handler}
      style={modalStyles}
    >
      <div className="flex w-full items-center justify-between font-bold text-[#333333]">
        <p>{username} is following</p>
        <button onClick={handler} className="text-4xl">
          &times;
        </button>
      </div>
      <ul>{children}</ul>
    </Modal>
  );
};

export default FollowTemplate;