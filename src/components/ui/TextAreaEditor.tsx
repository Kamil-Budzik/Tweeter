import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Button } from "~/components/ui/Button";

const TextAreaEditor = ({ txt }: { txt: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [v, setV] = useState(txt);
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
    console.log(v);
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