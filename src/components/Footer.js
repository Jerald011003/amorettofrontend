import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white">
      <Container className="py-2">
      
        <Row>
          <Col className="text-center">
          
                <p style={{ fontFamily: 'Segoe Script' }}>
  Amoretto
</p>

          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
