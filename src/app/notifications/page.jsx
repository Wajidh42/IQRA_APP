'use client'
import React from 'react'
import AddNotifications from '../component/AddNotifications'
import NotificationList from '../component/NotificationList'
import NotificBox from '../component/NotificBox'
import { useCookies } from 'react-cookie';

function Page() {
  const [cookies] = useCookies(["user"]);
  
  return cookies.user && cookies.user.admin ?(
    <main className="max-w-4xl mx-auto  mt-20 p-3">
      <div className="text-center my-5 flex flex-col gap-4">
        {/* <h1 className="text-2xl font-bold">IQRA Admin Panel</h1> */}
        <AddNotifications/>
      </div>
      <NotificationList/>
      
     
    </main>
  ):(<main className="min-h-screen flex justify-center overflow-hidden relative">
  <div className="min-h-screen home-grid-d w100 bg-red-500 flex flex-col justify-center items-center bottom-0 pb-28">
          <div className="h-48 mb-16"></div>
    <NotificBox/>
  </div>
</main>  
)
}

export default Page
