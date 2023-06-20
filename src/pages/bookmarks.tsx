import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import SignIn from "~/components/ui/SignIn";
import { LoadingPage, LoadingSpinner } from "~/components/ui/Loading";
import ErrorPage from "~/components/ui/Error";
import Filters from "~/components/ui/Filters";
import useBookmarks from "~/hooks/useBookmarks";
import ProfileFilteredTweets from "~/components/Profile/ProfileFilteredTweets";
import { ACTIVE_FILTER } from "~/hooks/useProfile";
import PostsItem from "~/components/Posts/PostItem/PostsItem";

const Bookmarks = () => {
  const { isSignedIn, user } = useUser();
  const { data, isLoading, navItems, filter, emptyStateMsg } = useBookmarks();

  if (!isSignedIn) return <SignIn />;

  if (isLoading) return <LoadingPage />;

  if (!data) return <ErrorPage isReturn />;

  return (
    <Layout>
      <section className="content-wrapper py-4 md:grid md:grid-cols-[350px_1fr]">
        <Filters activeFilter={filter} items={navItems} />
        <div className="mx-8 md:col-start-2 md:col-end-3 md:mx-0 md:ml-0 md:mr-12 lg:mr-0">
          <div>
            {isLoading && (
              <div className="mt-12 flex w-full justify-center">
                <LoadingSpinner />
              </div>
            )}
            {!data.length && <section>{emptyStateMsg}</section>}
            {filter === ACTIVE_FILTER.TWEETS ? (
              data.map((item) => (
                <PostsItem
                  post={item.post.post}
                  author={item.author}
                  key={item.post.id}
                />
              ))
            ) : (
              <ProfileFilteredTweets filter={filter} userId={user?.id} />
            )}
            {/*{data.map((item) => (*/}
            {/*  <PostsItem*/}
            {/*    post={item.post.post}*/}
            {/*    author={item.author}*/}
            {/*    key={item.post.id}*/}
            {/*  />*/}
            {/*))}*/}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bookmarks;