import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import SignIn from "~/components/ui/SignIn";
import Filters from "~/components/ui/Filters";
import PostsItem from "~/components/Posts/PostItem/PostsItem";
import { LoadingSpinner } from "~/components/ui/Loading";
import useExplore from "~/hooks/useExplore";

const Explore: NextPage = () => {
  const { isSignedIn } = useUser();
  const { data, isLoading, navItems, filter } = useExplore();

  if (!isSignedIn) return <SignIn />;

  return (
    <>
      <Layout>
        <section className="content-wrapper p-4 md:grid md:grid-cols-[350px_1fr]">
          <Filters activeFilter={filter} items={navItems} />
          <section className="mx-8 md:ml-0 md:mr-12 lg:mr-16">
            <div>
              {isLoading ? (
                <div className="mt-12 flex w-full justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                data?.map(({ post, author }) => (
                  <PostsItem post={post} key={post.id} author={author} />
                ))
              )}
            </div>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Explore;