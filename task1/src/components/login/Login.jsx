import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/user";

import './login.scss';

function Login(props) {
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();

    const nameInput = useRef(null);
    const passwordInput = useRef(null);

    const btnLoginHandler = useCallback(() => {
        console.log(userState);
        dispatch(getUsers());
    }, [dispatch]);

    const { usersLoading } = userState;

    console.log(usersLoading);

    return (
        <div className="login">
            <header>
                Login
            </header>
            <div className="form">
                <div className="name-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" ref={ nameInput } />
                </div>
                <div className="password-input">
                    <label htmlFor="username">Password</label>
                    <input type="text" id="username" ref={ passwordInput } />
                </div>

                <div className={ "btn-login" + (usersLoading ? " disable" : "") } onClick={ usersLoading ? () => { /** */ } : btnLoginHandler }>Login</div>
            </div>
        </div>
    )
}

export default Login;