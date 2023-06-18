import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import Posts from "~/components/Posts/Posts";
import SignIn from "~/components/ui/SignIn";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <SignIn />;

  const { data, isLoading } = api.profile.getHomePosts.useQuery({
    userId: user.id,
  });

  return (
    <>
      <Layout>
        <Posts data={data} isLoading={isLoading} />
      </Layout>
    </>
  );
};

export default Home;