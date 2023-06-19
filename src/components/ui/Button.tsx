import { type PropsWithChildren } from "react";
import { MdPersonAdd } from "react-icons/md";

interface Props {
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: "follow";
  onClick?: () => void;
}

export const Button = ({
  children,
  isDisabled,
  type,
  icon,
  onClick,
}: PropsWithChildren<Props>) => (
  <button
    onClick={onClick}
    type={type ?? "button"}
    className="flex items-center justify-center rounded bg-blue-500 px-6 py-2 font-medium text-white transition hover:bg-blue-600 disabled:bg-blue-300"
    disabled={isDisabled}
  >
    {icon === "follow" && <MdPersonAdd className="mr-1" />}
    {children}
  </button>
);