import React from 'react';
import './SideBar.css';
import { IoMdHome } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoMusicalNotes } from "react-icons/io5";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { PiPlaylistFill } from "react-icons/pi";
import { MdLibraryMusic } from "react-icons/md";
import { IoHelpCircleSharp } from "react-icons/io5";

export const SideBar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <h2>MELODIFY</h2>
      </div>

      <div className="menu-list">
        <a href="#" className="item">
            <IoMdHome className="icon"/>
            HOME
            
        </a>
        <a href="#" className="item">
          <MdDashboard className="icon"/>
          DASHBOARD
          
        </a>
        <a href="#" className="item">
            
            <IoMusicalNotes className="icon"/>
            SEPARATE VOCALS
        </a>
        <a href="#" className="item">
            
            <BsFillMusicPlayerFill className="icon"/>
            GENERATE COVER
        </a>
        <a href="#" className="item">
          
          <PiPlaylistFill className="icon"/>
          CREATE PLAYLIST
          
        </a>
        <a href="#" className="item">
          
          <MdLibraryMusic className="icon"/>
          LIBRARY
        </a>
        <a href="#" className="item">
          
        <IoHelpCircleSharp className="icon"/>
          HELP
        </a>
      </div>
      

      <div className="logout">
      <button type="button" >LOG OUT</button>
      </div>
      </div>
  )
}



