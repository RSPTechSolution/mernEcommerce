import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { Backdrop } from '@mui/material';
import { RxDashboard, RxExit } from 'react-icons/rx';
import { BsFillPersonFill } from 'react-icons/bs';
import { TfiViewListAlt } from 'react-icons/tfi'
import './Header.css';
import { useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../../actions/userAction';

const UserOptions = ({user}) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState();

    const options = [
        { icon: <TfiViewListAlt/>, name: "Orders", func: orders },
        { icon: <BsFillPersonFill/>, name: "Profile", func: account },
        { icon: <RxExit/>, name: "Logout", func: logoutUser },
    ];

    if(user.role === "admin"){
        options.unshift({ icon: <RxDashboard/>, name:"Dashboard", func:dashboard })
    }

    function dashboard(){
        Navigate('/dashboard');
    }
    function orders(){
        Navigate('/orders');
    }
    function account(){
        Navigate('/account');
    }
    function logoutUser(){
        dispatch(logout());
        Navigate('/');
        toast.success("Logout Successfully")
    }
  return (
    <>
        <Backdrop open={open} style={{ zIndex: "10" }}/>
      <SpeedDial className='speedDial' style={{zIndex: "11"}} ariaLabel='"speedDial tooltop example' onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} direction='down' icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt="Profile"/>} >
        {options.map((item) => (
            <SpeedDialAction icon={ item.icon } key={item.name} tooltipTitle={ item.name } onClick={item.func}/>

        ))}
      </SpeedDial>
    </>
  )
}

export default UserOptions
