"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { BsArrowRightCircle, BsPersonCircle } from "react-icons/bs";
import SlideMenu from "./component/SlideMenu";
import CopyRight from "./component/CopyRight";
import PhNav from "./component/PhNav";
import { usePathname } from "next/navigation";
import Context from "./component/context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [cookies] = useCookies(["user"]);
  const router = useRouter();
  const [status, setStatus] = useState("loading");
  const pathname = usePathname();
  const [slideOpen, setSlideOpen] = useState(false);

  useEffect(() => {
    if (cookies.user) {
      if (pathname == "/login") {
        router.push("/");
      }
      setStatus("authorized");
    } else if (pathname === "/login") {
      setStatus("authorized");
    } else router.push("/login");
  }, [cookies, pathname, router]);

  let position;
  let page;

  if (pathname == "/") {
    position = "-25rem";
    page = 1;
  } else if (pathname == "/details") {
    position = "-20.9rem";
    page = 2;
  } else if (pathname == "/results") {
    position = "-16.75rem";
    page = 3;
  } else if (pathname == "/images") {
    position = "-12.35rem";
    page = 4;
  } else if (pathname == "/notifications") {
    position = "-8.15rem";
    page = 5;
  } else if (pathname == "/about") {
    position = "-3.95rem";
    page = 6;
  }

  return (
    <html lang="en">
      
      <Context>
        <body className={inter.className}>
          {status === "loading" ? (
            <div className="min-h-screen min-w-screen loader-box flex justify-center items-center">
              <span className="loading loading-spinner loading-lg block mx-auto bg-primary"></span>
            </div>
          ) : (
            <>
              {pathname !== "/login" && cookies.user && cookies.user.admin && (
                <>
                  <BsArrowRightCircle
                    onClick={() => setSlideOpen(!slideOpen)}
                    className={`md:hidden block z-20 text-4xl absolute left-5 top-5 cursor-pointer rounded-full  p-1 duration-500 ${
                      slideOpen && "rotate-180 text-white"
                    }`}
                  />
                  {/* < className={`hidden md:block duration-500 text-2xl text-white absolute ml-auto w-full top-8 cursor-pointer `} onClick={()=>setActive(!active)}/> */}

                  <div className="bg-white w-full h-20 shadow-md sticky top-0 flex items-center justify-center z-10">
                    {/* <HiMenu className="text-3xl" /> */}

                    <img
                      className="h-14 md:hidden block"
                      src="iqralogo.png"
                      alt=""
                    />
                    <img
                      className="h-14 hidden md:block"
                      src="igrafull.png"
                      alt=""
                    />

                    <BsPersonCircle className="text-4xl absolute right-5 cursor-pointer rounded-full hover:bg-gray-200 p-1 duration-500" />
                  </div>
                </>
              )}
              {pathname !== "/login" && cookies.user && cookies.user.admin && (
                <SlideMenu
                  position={position}
                  page={page}
                  slideOpen={slideOpen}
                />
              )}

              {pathname != "/login" && cookies.user && !cookies.user.admin && (
                <PhNav />
              )}
              <ToastContainer/>
              <div>{children}</div>
             

            </>
          )}
        </body>
      </Context>
    </html>
  );
}
