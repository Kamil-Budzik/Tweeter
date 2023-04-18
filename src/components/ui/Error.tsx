import Layout from "~/components/layouts/Layout";

interface Props {
  msg?: string;
}
export const ErrorMsg = ({ msg }: Props) => {
  return (
    <div>
      <h1>
        {msg ? (
          msg
        ) : (
          <p>
            Sorry, but we {`couldn't`} load your data. Please refresh the the
            page or contact our support!
          </p>
        )}
      </h1>
    </div>
  );
};

const ErrorPage = () => {
  return (
    <Layout>
      <ErrorMsg />
    </Layout>
  );
};

export default ErrorPage;