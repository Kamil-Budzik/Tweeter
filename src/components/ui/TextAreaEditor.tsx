import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Button } from "~/components/ui/Button";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const TextAreaEditor = ({ txt }: { txt: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [v, setV] = useState(txt);
  const { user } = useUser();
  const ctx = api.useContext();
  const { mutate } = api.profile.editBio.useMutation({
    onSuccess: () => {
      void ctx.profile.getDataByUsername.invalidate({
        username: user?.username as string,
      });
    },
  });
  const handleEditClick = () => {
    if (isEditing) {
      setIsEditing(false);
      setV(txt);
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    mutate({ userId: user?.id as string, content: v });
  };

  return (
    <div className="transform-header-items flex max-w-xs items-start text-center md:col-start-2 md:col-end-4 md:row-span-2 md:max-w-xl md:self-start md:text-start">
      {isEditing ? (
        <div>
          <textarea
            className="w-full resize-y rounded border-2 border-blue-500 p-2"
            value={v}
            rows={6}
            cols={70}
            onChange={(e) => setV(e.target.value)}
          ></textarea>
          <Button className="mt-2" onClick={handleSave}>
            Save
          </Button>
        </div>
      ) : (
        <p className="">{txt}</p>
      )}
      <button onClick={handleEditClick}>
        <AiFillEdit />
      </button>
    </div>
  );
};

export default TextAreaEditor;