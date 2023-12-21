import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/action/userAction";
import logo from "../../assets/logo.png";
import "./Header.css";

const nav_links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/movies",
    display: "Movies",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const user = useSelector((state) => state.users.user);

  const movies = useSelector((state) => state.movies.movies);
  const [searchData, setSearchData] = useState([]);
  const [term, setTerm] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(term.toLowerCase())
  );

  useEffect(() => {
    const filteredMovies = movies.filter(
      (movie) =>
        movie.title && movie.title.toLowerCase().includes(term.toLowerCase())
    );

    setSearchData(filteredMovies);
  }, [term, movies]);
  useEffect(() => {
    const handleScroll = () => {
      headerRef.current.classList.toggle("sticky_header", window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle("show_menu");
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      localStorage.removeItem("accessToken");
      toast.success("Logout Successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="relative flex items-center justify-between nav_wrapper">
            <div className="500px:w-[20%] 800px:w-40 logo">
              <Link to="/">
                <img
                  src={logo}
                  alt="logo"
                  className="!w-full 800px:w-40 800px:mx-5 mt-2"
                />
              </Link>
            </div>

            <div className="relative mr-5" ref={searchRef}>
              <input
                type="text"
                placeholder="Search Movies..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="h-[40px] search_input w-[130px] 800px:w-[500px]   px-2 border-[#3957db] border-[2px] rounded-md"
              />
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-7 bg-transparent cursor-pointer !text-[#000] hidden 800px:inline-block"
              />
              {term && filteredMovies.length !== 0 && (
                <div className="absolute min-h-[30vh] w-[500px] ml-[-110px] 800px:ml-0 bg-slate-50 shadow-sm-2 z-[9] p-4 search_result">
                  {searchData.map((movie, index) => (
                    <Link to={`/movie/${movie._id}`} key={index}>
                      <div className="flex items-start ">
                        <img
                          src={movie?.poster?.url}
                          alt=""
                          className="w-[40px] h-[40px] mr-2"
                        />
                        <h5 className="text-black mt-[-20px]">{movie.title}</h5>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              className="w-3/12 navigation"
              ref={menuRef}
              onClick={toggleMenu}
            >
              <ul className="flex items-center justify-center gap-[30px] 1200px:gap-[60px] menu">
                {nav_links.map((item, index) => (
                  <li className="text-black nav_item" key={index}>
                    <Link
                      to={item.path}
                      className="text-black hover:text-[#ffbb00] active:text-[#ffbb00]"
                    >
                      {item.display}
                    </Link>
                  </li>
                ))}
                {user?.role === "Admin" && (
                  <li className="text-black nav_item">
                    <Link
                      to="/dashboard"
                      className="text-black hover:text-[#ffbb00] active:text-[#ffbb00]"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex items-center gap-4 mr-3">
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <>
                    <h5 className="hidden 1300px:block mx-12 text-xl text-[#ffbb00]">
                      {user?.name}
                    </h5>
                    <h4
                      className="text-[15px] 800px:text-xl mx-6 text-white hover:text-[#ffbb00]"
                      onClick={handleLogout}
                    >
                      Logout
                    </h4>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <h4 className="gap-2 text-[15px] 800px:text-xl mx-2 text-white hover:text-[#ffbb00]">
                        Login
                      </h4>
                    </Link>
                    <Link to="/register">
                      <h4 className="text-[15px] 800px:text-xl mx-6 text-white hover:text-[#ffbb00]">
                        Register
                      </h4>
                    </Link>
                  </>
                )}
              </div>

              <span className="mobile_menu" onClick={toggleMenu}>
                <AiOutlineMenu className="mb-4 text-2xl text-white cursor-pointer" />
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
