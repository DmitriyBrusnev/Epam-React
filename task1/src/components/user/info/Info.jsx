import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './info.scss';

function Info(props) {
    const { name, username, address, email, phone, website, company } = useSelector((state) => state.user);

    return (
        <div className="info">
            <div className="tabs">
                <input type="radio" name="tab-btn" id="tab-btn-1" value="" defaultChecked />
                <label htmlFor="tab-btn-1">Common info</label>

                <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
                <label htmlFor="tab-btn-2">Placement</label>

                <input type="radio" name="tab-btn" id="tab-btn-3" value="" />
                <label htmlFor="tab-btn-3">Contacts</label>

                <input type="radio" name="tab-btn" id="tab-btn-4" value="" />
                <label htmlFor="tab-btn-4">Work</label>

                <div id="content-1">
                    <div className="common_info">
                        <div className="common__item">Name: <span>{ name }</span></div>
                        <div className="common__item">Username: <span>{ username }</span></div>
                        <div className="common__item">Sex: <span>Man</span></div>
                    </div>
                </div>
                <div id="content-2">
                    <div className="common_info">
                        <div className="common__item">Street: <span>{ address.street }</span></div>
                        <div className="common__item">Suite: <span>{ address.suite }</span></div>
                        <div className="common__item">City: <span>{ address.city }</span></div>
                    </div>
                </div>
                <div id="content-3">
                    <div className="common_info">
                        <div className="common__item">Phone: <span>{ phone }</span></div>
                        <div className="common__item">Website: <span>{ website }</span></div>
                        <div className="common__item">Email: <span>{ email }</span></div>
                    </div>
                </div>
                <div id="content-4">
                    <div className="common_info">
                        <div className="common__item">Company Title: <span>{ company.name }</span></div>
                        <div className="common__item">Catch Phrase: <span>{ company.catchPhrase }</span></div>
                        <div className="common__item">BS: <span>{ company.bs }</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;

