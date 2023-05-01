import PostsItem from "~/components/Posts/PostItem/PostsItem";
import { api } from "~/utils/api";
import { type ACTIVE_FILTER } from "~/hooks/useProfile";

interface Props {
  filter: ACTIVE_FILTER;
  userId: string;
}

const ProfileTweets = ({ filter, userId }: Props) => {
  const { data } = api.posts.getWithFilters.useQuery({
    activeFilter: filter,
    userId: userId,
  });
  if (!data) {
    return (
      <div>
        <h1>
          Sorry, but we {`couldn't`} load your data. Please refresh the the page
          or contact our support!
        </h1>
      </div>
    );
  }

  return (
    <section className="mx-8 md:ml-0 md:mr-12 lg:mr-16">
      <div>
        {data.map((post) => (
          <PostsItem post={post.post} key={post.post.id} author={post.author} />
        ))}
      </div>
    </section>
  );
};

export default ProfileTweets;