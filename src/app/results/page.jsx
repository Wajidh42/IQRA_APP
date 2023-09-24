'use client'

import { useState } from "react";
import ResultSection from "../component/ResultSection";
import ResultCollapes from "../component/ResultCollapes";
import { useCookies } from "react-cookie";



export default function Home() {
  const [refresh,setRefresh]=useState()
  const [cookies] = useCookies(["user"]);
  return cookies.user && cookies.user.admin ? (
    <main className="max-w-4xl mx-auto mt-10 p-3">
      <div className="text-center my-5 flex flex-col gap-4">
        <ResultSection/>
      </div>
      
     
    </main>
  ):(<main className="min-h-screen flex justify-center overflow-hidden relative">
  <div className="min-h-screen home-grid-d w100 flex flex-col justify-center items-center bottom-0 py-16">
          <div className="h-48"></div>
    <ResultCollapes/>
  </div>
</main>) 
}
