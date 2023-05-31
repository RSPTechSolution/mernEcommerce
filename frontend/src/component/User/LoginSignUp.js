import React, { useState, useRef, useEffect } from 'react'
import { MdEmail } from 'react-icons/md'
import { AiFillLock, AiOutlineUserAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import { toast } from 'react-toastify';
import './LoginSignUp.css';

const initalLoginData = {
    email: "",
    password: ""
}

const initalRegisterData = {
    name: "",
    email: "",
    password: ""
}

const LoginSignUp = () => {

    const dispatch = useDispatch();
    const {error, loading, isAuthenticated} = useSelector(state => state.user);
    const Navigate = useNavigate();


    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    
  
    const [loginFormData, setLoginFormData] = useState(initalLoginData);
    const [registerFormData, setRegisterFormData] = useState(initalRegisterData);
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/profile.png");

    //Hanle login Inputs
    const handleLoginFormData = (e) => {
        const {name, value} = e.target;
        setLoginFormData({...loginFormData, [name]:value});
    }
    //Handle Login Submit
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginFormData.email, loginFormData.password))
        // console.log(loginFormData);
    }

    //Handle Register Inputs
    const handleRegisteFormData = async     (e) => {
        const {name, value} = e.target;
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                  setAvatarPreview(reader.result);
                  setAvatar(reader.result);
                }
              };
                await reader.readAsDataURL(e.target.files[0]);
        }else{
            setRegisterFormData({...registerFormData, [name]:value});
        }
    }
    //Handle Register Form Submit
    const registerSubmit = (e) => {
        e.preventDefault();

        const {name, email, password} = registerFormData;
        const myForm = new FormData();
        
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    }

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            Navigate("/account");
        }
    }, [dispatch, error, isAuthenticated, Navigate]);

    const switchTabs = (e, tab) => {
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

  return (
    <>
    {loading ? (
        <Loader />
      ) : (
        <>
            <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button type="" ref={switcherTab}></button>
                </div>
                <form onSubmit={loginSubmit} className="loginForm" ref={loginTab}>
                    <div className="loginEmail">
                        <MdEmail/>
                        <input type="email" name="email" required placeholder="Email" value={loginFormData.email}  onChange={handleLoginFormData} />
                    </div>
                    <div className="loginPassword">
                        <AiFillLock/>
                        <input type="password" name="password"  value={loginFormData.password} placeholder="Password" onChange={handleLoginFormData}/>
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="submit" value="Login" className='loginBtn' />
                </form>
                <form onSubmit={registerSubmit} encType='multipart/form-data' className="signUpForm"  ref={registerTab}>
                    <div className="signUpName">
                        <AiOutlineUserAdd/>
                        <input type="text" name="name"  value={registerFormData.name} placeholder='Name' onChange={handleRegisteFormData} required />
                    </div>
                    <div className="signUpEmail">
                        <MdEmail/>
                        <input type="email" name="email"  value={registerFormData.email} placeholder='Email' onChange={handleRegisteFormData} required />
                    </div>
                    <div className="signUpPassword">
                        <AiFillLock/>
                        <input type="password" name="password" value={registerFormData.password}  onChange={handleRegisteFormData} placeholder='Password' required />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type="file" name="avatar" accept="image/*"  placeholder='Password'  onChange={handleRegisteFormData}/>
                    </div>
                    <input type="submit" value="Register" className="signUpBtn" />
                </form>
            </div>
            </div>
        </>
        )}
    </>
  )
}

export default LoginSignUp
