import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { setActiveUser } from "../../redux/actions/user";

import './logout.scss';

export const Logout = () => {
    const dispatch = useDispatch();

    const clickHandler = useCallback(() => {
        dispatch(setActiveUser(null));
        return <Redirect to="/login"></Redirect>
    });

    return <div className="btn-logout" onClick={ clickHandler }>Logout</div>
};
