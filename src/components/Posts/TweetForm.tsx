import { useUser } from "@clerk/nextjs";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  post: string;
};

const TweetForm = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={() => handleSubmit(onSubmit)}
      className="mb-6 w-full max-w-3xl rounded-2xl bg-white px-4 py-2"
    >
      <div className="flex flex-col">
        <label
          htmlFor="post"
          className="border-b border-[#F2F2F2] pb-2 font-semibold text-[#4F4F4F]"
        >
          Tweet something
        </label>
        <div className="mt-2 flex items-center">
          <img
            className="mr-2 h-16 w-16 rounded-2xl object-cover"
            src={user?.profileImageUrl}
            alt="Your's profile image"
          />
          <textarea
            className="flex-grow resize-none pb-2 placeholder:font-semibold placeholder:text-[#BDBDBD]"
            id="post"
            placeholder="What's happening?"
            {...register("post", { required: true })}
          />
        </div>
      </div>

      {/*TODO: Add "Who can reply section" and maybe image upload*/}
      <button
        type="submit"
        className="mt-6 flex items-center justify-center rounded bg-blue-500 px-6 py-2 font-medium text-white transition hover:bg-blue-600 disabled:bg-blue-300"
        disabled={!isValid}
      >
        Tweet
      </button>
    </form>
  );
};

export default TweetForm;