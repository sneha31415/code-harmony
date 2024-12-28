import React,{useState} from 'react'
import './LoginPage.css'
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


export const LoginPage = () => {

  const [action,setAction] = useState("SIGN UP");
  return (
    <div className='wrapper'>
      <form action="">
        <h1>{action}</h1>
        {action==="LOGIN"?<div></div>: <div className="input-box">
          <input type="text" placeholder='Name' required/>
          <FaUser className="icon"/>
        </div>}
        
        <div className="input-box">
          <input type="text" placeholder='Email' required/>
          <MdEmail className="icon"/>
        </div>
        <div className="input-box">
          <input type="text" placeholder='Password' required/>
          <RiLockPasswordFill className="icon"/>
        </div>
      </form>
      {action==="SIGN UP"?<div></div>:<div className="forgot-password">
        <a href="#"> Forgot password?</a>
      </div>}
      

      <div className="submit-container">
        <div className={action==="LOGIN"?"submit gray":"submit" } onClick={()=>{setAction("SIGN UP")}}>Sign Up</div>
        <div className={action==="SIGN UP"? "submit gray":"submit"} onClick={()=>{setAction("LOGIN")}}>Log In</div>
      </div>

    </div>
  )
}
