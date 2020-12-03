import Layout from "../components/layout/layout";
import { Row, Col, Image } from "antd";

import LoginForm from "../components/login_form/login_form";

const pageStyle = {
  paddingTop: "20vh",
};

const columnStyle = {
  paddingTop: "1em",
  paddingBottom: "1em",
};

const LoginPage = () => {
  return (
    <Layout>
      <div style={pageStyle}>
        <Row align="middle">
          <Col
            style={columnStyle}
            offset={6}
            span={12}
            md={{ offset: 2, span: 6 }}
          >
            <Image src="/img/goalfund_full_logo.png" />
          </Col>
          <Col offset={2} span={20} md={{ span: 12 }} style={columnStyle}>
            <LoginForm />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
export default LoginPage;
