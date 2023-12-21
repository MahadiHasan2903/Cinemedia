import React, { useState } from "react";
import "./Newsletter.css";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cinemahall from "../../assets/cinemahall.webp";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "") {
      toast.error("Please enter your email.");
      setEmail("");
    } else if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      setEmail("");
    } else {
      toast.success("Thank you for subscribing!");
      setEmail(""); // Clear the email input
    }
  };

  return (
    <section className="mx-5 newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter_content">
              <h2>Subscribe now to get useful movie information.</h2>
              <div className="newsletter_input">
                <input
                  className="w-full"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  className="btn newsletter_btn"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                eos corrupti facere ex minima assumenda, dolor quam laborum
                tenetur.
              </p>
            </div>
          </Col>
          {/* <Col lg="6">
            <div className="newsletter_img">
              <img src={cinemahall} alt="maleTourist" />
            </div>
          </Col> */}
        </Row>
        <Row></Row>
      </Container>
    </section>
  );
};

export default Newsletter;
