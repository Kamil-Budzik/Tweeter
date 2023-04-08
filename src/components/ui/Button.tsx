interface Props {
  isDisabled?: boolean;
  children: any;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, isDisabled, type }: Props) => (
  <button
    type={type ?? "button"}
    className="mt-6 flex items-center justify-center rounded bg-blue-500 px-6 py-2 font-medium text-white transition hover:bg-blue-600 disabled:bg-blue-300"
    disabled={isDisabled}
  >
    {children}
  </button>
);