import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const user = useUser();

  console.log(user.user?.id);
  if (isLoading) return <h1>LOADING...</h1>;

  if (!data) return <h1>ERROR</h1>;

  return (
    <>
      <Layout>
        <h1>MAIN PAGE</h1>
      </Layout>
    </>
  );
};

export default Home;