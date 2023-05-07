import { useState } from "react";

const useModal = (initialState = false) => {
  const [isModal, setIsModal] = useState(initialState);

  const toggle = () => setIsModal((prevState) => !prevState);

  return { isModal, toggle };
};

export default useModal;