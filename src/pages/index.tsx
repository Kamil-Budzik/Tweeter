import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layouts/Layout";
import { api } from "~/utils/api";
import MobileLayout from "~/components/layouts/MobileLayout";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const user = useUser();

  console.log(user.user?.id);
  if (isLoading) return <h1>LOADING...</h1>;

  if (!data) return <h1>ERROR</h1>;

  return (
    <>
      <MobileLayout>
        <h1>MAIN PAGE</h1>
      </MobileLayout>
    </>
  );
};

export default Home;