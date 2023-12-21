import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const About = () => {
  useEffect(() => {
    // Scroll to the top of the screen when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <section>
        <Container className="mx-12 my-5">
          <Row>
            <Col lg="12" md="12" sm="12" className="my-10">
              <h5 className="services_subtitle text-[#3d0274]">
                Elevating Your Movie Journey
              </h5>
              <h2 className="services_title">A Cinematic Revolution</h2>
              <p className="text-black">
                Welcome to a world where movie magic knows no bounds. We&apos;re
                not just another online movie ticket platform; we&apos;re your
                gateway to unparalleled entertainment. Explore a universe where
                the silver screen comes to life, and your movie experience is
                our top priority.
                <br />
                At Cinemedia, we&apos;re redefining the way you watch movies.
                With cutting-edge technology and seamless navigation, you can
                discover, book, and immerse yourself in the latest blockbusters
                and timeless classics. We&apos;re not just selling tickets;
                we&apos;re curating unforgettable journeys that start with a
                click.
                <br />
                Join us on a ride where convenience meets creativity. Our
                user-friendly interface ensures that your movie selection and
                booking process are as smooth as the plots on screen. Whether
                you&apos;re a film buff or a casual viewer, we&apos;re here to
                turn your movie nights into extraordinary cinematic adventures.
              </p>
            </Col>
            <Col lg="12" md="12" sm="12" className="my-10">
              <h5 className="services_subtitle text-[#3d0274]">
                Crafting Unforgettable Movie Moments
              </h5>
              <h2 className="services_title">A Symphony of Cinematics</h2>
              <p className="text-black">
                Every frame, every line, every emotion — we believe that every
                movie moment should resonate. Step into our realm, where the
                screen isn&apos;t just a canvas; it&apos;s a gateway to a world
                of imagination and emotion.
                <br />
                Cinemedia is more than a booking platform; it&apos;s your
                personal cinema concierge. We&apos;ve reimagined every step of
                the movie-going experience to ensure that you&apos;re not just
                watching films; you&apos;re creating memories. From the moment
                you browse our handpicked selections to the time you step out of
                the theater, we&apos;re here to make your journey unforgettable.
                <br />
                And it&apos;s not just about the movies — it&apos;s about the
                community too. Connect with fellow movie enthusiasts, share your
                reviews, and engage in discussions that enrich your cinematic
                encounters. At Cinemedia, we&apos;re building more than a
                platform; we&apos;re building a film-loving family.
              </p>
            </Col>

            <Col lg="6" md="6" sm="12" className="my-10">
              <h5 className="services_subtitle text-[#3d0274]">
                Redefining Accessibility
              </h5>
              <h2 className="services_title">Movies for Everyone</h2>
              <p className="text-black">
                Cinemedia is committed to making movie magic accessible to all.
                We understand that everyone deserves a chance to experience the
                joy and wonder of cinema. That&apos;s why we&apos;ve taken great
                strides to ensure our platform is inclusive and accommodating.
                <br />
                Our user-friendly features, including subtitles, audio
                descriptions, and accessible seating options, are designed to
                cater to diverse audiences. We believe that movies have the
                power to bring people together, regardless of their abilities,
                and we&apos;re here to ensure that every viewer can share in the
                cinematic experience.
                <br />
                Join us in our mission to make the magic of movies accessible to
                all. At Cinemedia, diversity isn&apos;t just a buzzword;
                it&apos;s at the heart of everything we do.
              </p>
            </Col>
            <Col lg="6" md="6" sm="12" className="my-10">
              <h5 className="services_subtitle text-[#3d0274]">
                Beyond the Screen
              </h5>
              <h2 className="services_title">Creating Connections</h2>
              <p className="text-black">
                Cinemedia is more than just a platform for watching movies;
                it&apos;s a community of film enthusiasts brought together by a
                shared love for cinema. We believe that movies have the power to
                spark conversations, ignite imaginations, and forge connections
                that transcend the screen.
                <br />
                Join our vibrant community to engage in discussions, share your
                insights, and discover new perspectives. From film analysis to
                behind-the-scenes trivia, our community is a treasure trove of
                knowledge and passion waiting to be explored.
                <br />
                At Cinemedia, we&apos;re not just selling tickets; we&apos;re
                fostering connections. Become a part of something bigger and
                embark on a journey that goes beyond the theater walls. Welcome
                to a world where every movie is a starting point for meaningful
                interactions and lifelong friendships.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default About;
