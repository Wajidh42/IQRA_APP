import { useCookies } from "react-cookie";
import React ,{useContext} from 'react'
import { UserContext } from './context';
function LogOut({close}) {
    const {setUser}=useContext(UserContext)
    const [cookies,setCookie,removeCookie,]=useCookies(["user"])
  return (
    <dialog id="my_modal_1" className="modal modal-open">
  <div className="modal-box min-h-40">
    <h3 className="font-bold text-xl text-center">Are you ready to logout</h3>
    <div className="modal-action">
      <form method="dialog">
        <div className='flex items-center'><button className="btn mr-5 md:w-56 w-36" onClick={()=>close(false)}>Close</button>
        <button className="btn btn-error md:w-56 w-36 text-white" onClick={()=>{
        
        removeCookie('user',{path:'/'})
        setUser()
      }}>Logout</button></div>
      </form>
    </div>
  </div>
</dialog> 
  )
}

export default LogOut