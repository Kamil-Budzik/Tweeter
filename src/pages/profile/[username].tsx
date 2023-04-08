import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "~/components/layouts/Layout";
import { Button } from "~/components/ui/Button";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data)
    return (
      <>
        <Head>
          <title>Not found</title>
        </Head>
        <Layout>
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <h1>
              {" "}
              {username} {"doesn't"} exist
            </h1>
            <Link href="/">
              <Button>Return to main page</Button>
            </Link>
          </div>
        </Layout>
      </>
    );

  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>
      <Layout>
        <div>{JSON.stringify(data)}</div>
      </Layout>
    </>
  );
};

import { prisma } from "~/server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      prisma,
    },
    transformer: superjson,
  });
  const username = context.params?.username;

  if (typeof username !== "string") throw new Error("no username");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;