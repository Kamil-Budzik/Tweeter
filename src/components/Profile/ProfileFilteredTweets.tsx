import PostsItem from "~/components/Posts/PostItem/PostsItem";
import { api } from "~/utils/api";
import { type ACTIVE_FILTER } from "~/hooks/useProfile";
import { LoadingSpinner } from "~/components/ui/Loading";

interface Props {
  filter: ACTIVE_FILTER;
  userId: string;
}

const ProfileTweets = ({ filter, userId }: Props) => {
  const { data, isLoading, isError } = api.posts.getWithFilters.useQuery({
    activeFilter: filter,
    userId: userId,
  });

  return (
    <section className="mx-8 md:ml-0 md:mr-12 lg:mr-16">
      <div>
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <LoadingSpinner size={36} />
          </div>
        )}
        {isError && !data && (
          <h1>
            Sorry, but we {`couldn't`} load your data. Please refresh the the
            page or contact our support!
          </h1>
        )}
        {!!data &&
          !isLoading &&
          data.map((post) => (
            <PostsItem
              post={post.post}
              key={post.post.id}
              author={post.author}
            />
          ))}
      </div>
    </section>
  );
};

export default ProfileTweets;