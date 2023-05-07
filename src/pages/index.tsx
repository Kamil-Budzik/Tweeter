import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import Posts from "~/components/Posts/Posts";
import SignIn from "~/components/ui/SignIn";

const Home: NextPage = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return <SignIn />;

  return (
    <>
      <Layout>
        <Posts />
      </Layout>
    </>
  );
};

export default Home;