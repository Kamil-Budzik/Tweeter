import Layout from "~/components/layouts/Layout";
import { SignInButton } from "@clerk/nextjs";

const SignIn = () => (
  <Layout>
    <div className="flex h-screen items-center justify-center">
      <SignInButton mode="modal">
        <button className="btn rounded-2xl bg-blue-500 px-10 py-2 font-bold text-white transition hover:bg-blue-600">
          Sign in
        </button>
      </SignInButton>
    </div>
  </Layout>
);

export default SignIn;