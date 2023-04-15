import { useUser } from "@clerk/nextjs";
import { type SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  input: string;
}

const PostCommentForm = ({ postId }: { postId: number }) => {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ input }) => {
    // if (!user) return;
    // mutate({ text: data.post, authorId: user.id });
    console.log(input);
  };

  return (
    <form className="my-2 flex items-center" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={`comment-input-${postId}`}>
        <img
          className="mr-2 h-10 w-10 rounded-2xl object-cover"
          src={user?.profileImageUrl}
          alt="Your profile image"
        />
      </label>
      <input
        className="b-[#FAFAFA] flex-grow rounded border bg-[#FAFAFA] p-2 placeholder:font-semibold placeholder:text-[#BDBDBD]"
        id={`comment-input-${postId}`}
        placeholder="Tweet your reply"
        {...register("input", { required: true })}
      />
    </form>
  );
};

export default PostCommentForm;