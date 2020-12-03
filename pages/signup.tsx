import Link from "next/link";
import { Row, Col } from "antd";

import Layout from "../components/layout/layout";
const SignUpPage = () => {
  return (
    <Layout>
      <Row style={{ paddingTop: "20vh" }}>
        <Col offset={2} md={{ offset: 6 }}>
          Already have an account?{" "}
          <Link href="/login">
            <a href="/">Log in</a>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
};
export default SignUpPage;
