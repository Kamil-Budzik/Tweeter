import { type SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { LoadingSpinner } from "~/components/ui/Loading";

interface Inputs {
  input: string;
}

interface Props {
  postId: number;
}

const PostComments = ({ postId }: Props) => {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ input }) => {
    // if (!user) return;
    // mutate({ text: data.post, authorId: user.id });
    console.log(input);
  };

  return (
    <div className="border-t border-[#F2F2F2]">
      <form
        className="mt-2 flex items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
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
    </div>
  );
};

export default PostComments;