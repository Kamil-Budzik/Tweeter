import { useUser } from "@clerk/nextjs";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/ui/Loading";
import { Button } from "~/components/ui/Button";

type Inputs = {
  post: string;
};

const TweetForm = () => {
  const { user } = useUser();
  const ctx = api.useContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<Inputs>();
  const { mutate, isLoading } = api.posts.addItem.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
      reset();
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!user) return;
    mutate({ text: data.post, authorId: user.id });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            alt="Your profile image"
          />
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <textarea
              className="flex-grow resize-none pb-2 placeholder:font-semibold placeholder:text-[#BDBDBD]"
              id="post"
              placeholder="What's happening?"
              {...register("post", { required: true })}
            />
          )}
        </div>
      </div>

      {/*TODO: Add "Who can reply section" and maybe image upload*/}
      <Button isDisabled={!isValid} type="submit">
        Tweet
      </Button>
    </form>
  );
};

export default TweetForm;