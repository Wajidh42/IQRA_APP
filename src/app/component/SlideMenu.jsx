'use client'
import React ,{useContext} from 'react'
import {  HiHome } from "react-icons/hi";
import { BsFileImageFill,BsArrowRightCircle,BsFillJournalBookmarkFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { MdNotificationsActive } from "react-icons/md"

import { UserContext } from './context';
import LogOut from './logOut';

function SlideMenu({page ,position,slideOpen}) {

  const [logOut,setLogOut]=useState(false)
  const {setUser}=useContext(UserContext)
    const style=`.menu-2 li:nth-child(${page}) svg, .menu-2 li:nth-child(${page}) span{
        color:#4f14ee;
    } 
    .mover{
        top:${position}
    }
    .menu-2 li:nth-child(${page}):hover{
        background:none
    }
    `
  const [active,setActive]=useState(false)
  return (
    <div className={`bg-primary ${slideOpen ?  ' w-20 ' : 'w-0'}  overflow-hidden md:block h-screen bg-primary fixed  duration-300 left-0 top-0 z-10 ${active ? 'md:w-40 md:overflow-hidden':'md:w-20'}`}>
        <style>{style}</style>
          <BsArrowRightCircle className={`hidden md:block duration-500 text-2xl text-white absolute ml-auto w-full top-8 cursor-pointer ${active && 'rotate-180'}`} onClick={()=>setActive(!active)}/>
          <ul className="menu-2 gap-2 mt-28 flex flex-col items-right">
            <li className={`bg-ghost flex items-left `}>
              <Link href='/' className={`flex items-center gap-4 m-5 ${active && 'w-32'} `}>
                <HiHome className={`text-3xl text-white`} />
                <span className={` text-left text-slate-300  ${!active && 'hidden'}`}>Home</span>
              </Link>
            </li>
            <li className={`bg-ghost flex items-left `}>
              <Link href='/details' className={`flex items-center justify-left gap-4 m-5 ${active && 'w-32'} `}>
                <TbListDetails className={`text-2xl text-white `} />
                <span className={` text-left text-slate-300 ${!active && 'hidden'}`}>Details</span>
              </Link>  
            </li>
            <li className={`bg-ghost flex items-left  `}>
              <Link href='/results' className={`flex items-center justify-left gap-4 m-5 ${active && 'w-32'} `}>
                <BsFillJournalBookmarkFill className={`text-2xl  text-white`} />
                <span className={`text-left text-slate-300  ${!active && 'hidden'}`}>Results</span>
              </Link>  
            </li>
            <li className={`bg-ghost flex items-left  `}>
              <Link href='/images' className={`flex items-center justify-left gap-4 m-5 ${active && 'w-32'} `}>
                <BsFileImageFill className={`text-2xl  text-white`} />
                <span className={`text-left  text-slate-300 ${!active && 'hidden'}`}>Images</span>
              </Link>  
            </li>
            <li className={`bg-ghost flex items-left  `}>
              <Link href='/notifications' className={`flex items-center justify-left gap-4 m-5 ${active && 'w-32'} `}>
                <MdNotificationsActive className={`text-2xl  text-white`} />
                <span className={`text-left text-slate-300  ${!active && 'hidden'}`}>Bell</span>
              </Link>  
            </li>
            <li className={`bg-ghost flex items-left  `}>
              <Link href='/about' className={`flex items-center justify-left gap-4 m-5 ${active && 'w-32'} `}>
                <FaInfoCircle className={`text-2xl text-white`} />
                <span className={`text-left  text-slate-300 ${!active && 'hidden'}`}>About</span>
              </Link>  
            </li>
          </ul><div onClick={()=>setLogOut(true)}   className="logout cursor-pointer"><AiOutlineLogout  className='text-2xl text-white '/></div>
          <div className={`mover h-16 bg-white -z-5 duration-300 ${active ? 'w-40': 'w-20'}   `}></div>
        {logOut && <LogOut close={setLogOut}/>}</div>
  )
} 

export default SlideMenu
