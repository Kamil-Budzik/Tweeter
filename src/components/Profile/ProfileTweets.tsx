import PostsItem from "~/components/Posts/PostItem/PostsItem";
import { type RouterOutputs } from "~/utils/api";

interface Props {
  posts: RouterOutputs["profile"]["getDataByUsername"]["posts"];
  user: RouterOutputs["profile"]["getDataByUsername"]["user"];
}
const ProfileTweets = ({ posts, user }: Props) => {
  if (!posts) {
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
        {posts.map((post) => (
          <PostsItem post={post} key={post.id} author={user} />
        ))}
      </div>
    </section>
  );
};

export default ProfileTweets;