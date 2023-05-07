import Layout from "~/components/layouts/Layout";
import { Button } from "~/components/ui/Button";
import Link from "next/link";

interface Props {
  msg?: string;
  isReturn?: boolean;
}
export const ErrorMsg = ({ msg, isReturn }: Props) => {
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
        {isReturn && (
          <Link href="/">
            <Button>Return to main page</Button>
          </Link>
        )}
      </h1>
    </div>
  );
};

const ErrorPage = (props: Props) => {
  return (
    <Layout>
      <ErrorMsg {...props} />
    </Layout>
  );
};

export default ErrorPage;