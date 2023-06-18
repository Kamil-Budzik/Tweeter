import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import Posts from "~/components/Posts/Posts";
import SignIn from "~/components/ui/SignIn";
import Filters from "~/components/ui/Filters";
import useExplore from "~/hooks/useExplore";
import PostsItem from "~/components/Posts/PostItem/PostsItem";
import ErrorPage from "~/components/ui/Error";
import { LoadingPage } from "~/components/ui/Loading";

const Explore: NextPage = () => {
  const { isSignedIn } = useUser();
  const { data, isLoading, navItems, filter } = useExplore();

  if (!isSignedIn) return <SignIn />;

  if (!data) return <ErrorPage />;
  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Layout>
        <section className="content-wrapper p-4 md:grid md:grid-cols-[350px_1fr]">
          <Filters activeFilter={filter} items={navItems} />
          <section className="mx-8 md:ml-0 md:mr-12 lg:mr-16">
            <div>
              {data.map(({ post, author }) => (
                <PostsItem post={post} key={post.id} author={author} />
              ))}
            </div>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Explore;