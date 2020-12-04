import { Container } from "reactstrap";

export const Layout = (props) => (
  <Container className="my-5">{props.children}</Container>
);
