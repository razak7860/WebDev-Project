import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { GoChevronDown } from "react-icons/go";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing result ", result.data.allCategory);
      setSubLinks(result?.data?.data);
    } catch (error) {
      console.error("Couldn't fetch category list");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ">
      <div className="w-11/12 flex max-w-maxContent items-center justify-between ">
        <Link to="/">
          <img width={160} height={42} loading="lazy" src={logo} alt="" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25 items-center justify-center">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex relative items-center gap-1 justify-center group">
                      <p>{link.title}</p>
                      <GoChevronDown size={"22px"} />
                      <div
                        className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em]   flex-col 
                      rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible 
                      group-hover:opacity-100 group-hover:translate-y-[1.65em] lg:w-[300px]"
                      >
                        <div className="absolute left-[50%] top-0 -z-10 translate-x-[80%] translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-richblack-5"></div>
                        {console.log("printing sublinks", subLinks)}
                        {subLinks.map((sublink, index) => (
                          <Link to={`/catalog/${sublink.name}`} key={index}>
                            <p className="rounded-lg bg-transparent py-4 pl-4 ">
                              {sublink.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path} key={index}>
                      <p
                        className={`${
                          matchRoute(link.path)
                            ? "text-yellow-25"
                            : " text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/signup/Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md ">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
