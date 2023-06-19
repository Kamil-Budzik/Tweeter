import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import SignIn from "~/components/ui/SignIn";
import Filters from "~/components/ui/Filters";
import PostsItem from "~/components/Posts/PostItem/PostsItem";
import { LoadingSpinner } from "~/components/ui/Loading";
import useExplore from "~/hooks/useExplore";
import SearchBar from "~/components/ui/SearchBar";

const Explore: NextPage = () => {
  const { isSignedIn } = useUser();
  const { data, isLoading, navItems, filter, setSearch } = useExplore();

  if (!isSignedIn) return <SignIn />;
  // TODO: implement search bar, the logic should be inside explore
  return (
    <>
      <Layout>
        <section className="content-wrapper py-4 md:grid md:grid-cols-[350px_1fr] md:grid-rows-[100px_auto]">
          <Filters activeFilter={filter} items={navItems} />
          <div className="mx-8 mb-4 md:mx-0">
            <SearchBar handler={setSearch} />
          </div>
          <section className="mx-8 md:col-start-2 md:col-end-3 md:mx-0 md:ml-0 md:mr-12 lg:mr-0">
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