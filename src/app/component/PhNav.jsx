import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { BsPerson } from "react-icons/bs";

function PhNav() {
  const pathname = usePathname();
  return (
    <main className="phnav-main mx-auto  relative z-50">
      <div className="h-48 bg-primary w-full phnav-head flex flex-col justify-center items-center fixed">
        <div className="flex items-center justify-between w-full px-7">
          {pathname !== "/" ? (
            <a href="/">
              <div className="icon-boxy-box"><BiArrowBack className="text-5xl text-white icon-boxy" /></div>
            </a>
          ) : (
            <div className="icon-boxy-box"><HiMenuAlt2 className="text-5xl text-white icon-boxy" /></div>
          )}

          <a href="/profile">
          <div className="icon-boxy-box"><BsPerson className="text-5xl text-white icon-boxy-r" /></div>
          </a>
        </div>
        <img className="h-16" src="iqralogowhite.png" alt="" />
      </div>
    </main>
  );
}

export default PhNav;