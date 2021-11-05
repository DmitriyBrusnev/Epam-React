import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getUsers, setActiveUser } from "../../redux/actions/user";

import './login.scss';

function Login(props) {
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();

    localStorage.setItem('login', JSON.stringify(false));

    const nameInput = useRef(null);
    const passwordInput = useRef(null);

    const btnLoginHandler = useCallback(() => {
        dispatch(getUsers());
    }, [dispatch]);

    if (userState.activeUser) {
        console.log('active user login jsx', userState.activeUser);
        localStorage.setItem('login', JSON.stringify(true));
        return <Redirect to={`/user/${userState.activeUser.id}`} />
    }

    if (userState.users.length !== 0) {
        const user = userState.users.find((el) => el.name === nameInput.current.value && el.username === passwordInput.current.value);
        if (user) {
            console.log('user', user);
            dispatch(setActiveUser(user));
        }
    }

    const { usersLoading } = userState;

    return (
        <div className="login">
            <header>
                Login
            </header>
            <div className="form">
                <div className="name-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" ref={ nameInput } value="Leanne Graham" />
                </div>
                <div className="password-input">
                    <label htmlFor="username">Password</label>
                    <input type="text" id="username" ref={ passwordInput } value="Bret" />
                </div>

                <div className={ "btn-login" + (usersLoading ? " disable" : "") } onClick={ usersLoading ? () => { /** */ } : btnLoginHandler }>Login</div>
            </div>
        </div>
    )
}

export default Login;