import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { setActiveUser } from "../../redux/actions/user";

import './logout.scss';

export const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const clickHandler = useCallback(() => {
        dispatch(setActiveUser(null));
        history.push('/login');
    });

    return <div className="btn-logout" onClick={ clickHandler }>Logout</div>
};
