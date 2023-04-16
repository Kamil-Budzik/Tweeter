import PostsItem from "~/components/Posts/PostItem/PostsItem";
import { type RouterOutputs } from "~/utils/api";

type Props = RouterOutputs["posts"]["getByUsername"];

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
    <section className="content-wrapper">
      <div className="profile-margins">
        {posts.map((post) => (
          <PostsItem post={post} key={post.id} author={user} />
        ))}
      </div>
    </section>
  );
};

export default ProfileTweets;