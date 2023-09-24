'use client'

import React, { useState } from 'react'
import AddImages from '../component/AddImages'
import ImageSection from '../component/ImageSection'
import ImageBox from '../component/ImageBox'
import { useCookies } from 'react-cookie'


function Page() {
  const [refresh,setRefresh]=useState(false)
  const [cookies] = useCookies(["user"]);

  return cookies.user && cookies.user.admin ?(
    <main className="max-w-4xl mx-auto mt-20 p-3">
      <div className="text-center my-5 flex flex-col gap-4">
        {/* <h1 className="text-2xl font-bold">IQRA Admin Panel</h1> */}
        <AddImages refresh={refresh} setRefresh={setRefresh}/>
      </div>
      <ImageSection refresh={refresh}/>
      
     
    </main>
  ):(<main className="min-h-screen flex justify-center overflow-hidden relative">
  <div className="min-h-screen home-grid-d w100 bg-red-500 flex flex-col justify-center items-center bottom-0 pb-28">
          <div className="h-48 mb-16"></div>
    <ImageBox/>
  </div>
</main>)
}

export default Page
