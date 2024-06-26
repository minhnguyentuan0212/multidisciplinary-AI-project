import React from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import './Navigator.css'
import { MenuOptions, SettingOptions } from './NavigatorOptions';
import { Link } from 'react-router-dom';
// import { fetchData } from '../../actions/device';
// import { postData } from '../../actions/device';

const Navigator = () => {
    return (
        <div className="navigator shadow px-4 pt-1 pb-5 mt-0 me-4">
            <div className='welcome'>
                <div className="avatar"><img src="https://www.nautiljon.com/images/perso/00/76/loid_forger_20767.webp" /></div> {/* Need API */}
                <div className="hello-user">
                    <div className="hello">Hello</div>
                    <div className="user">Loid Forger</div> {/* Need API */}
                </div>
                
            </div>
            <ul className="nav-list menu-list">
                <div className="title">Menu</div>
                {MenuOptions.map((val,key) => {
                    return (
                        <Link to={val.link}>
                            <li 
                                key={key} 
                                className="nav-row"
                                // onClick={() => {window.location.pathname = val.link}}
                            >
                                <div className="icon">{val.icon}</div>
                                <div className="option">{val.title}</div>
                            </li>
                        </Link>
                    )
                })}
            </ul>
            <ul className="nav-list setting-list pb-5">
                <div className="title">Settings</div>
                {SettingOptions.map((val,key) => {
                    return (
                        <li 
                            key={key} 
                            className="nav-row"
                            onClick={() => {window.location.pathname = val.link}}
                        >
                            <div className="icon">{val.icon}</div>
                            <div className="option">{val.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Navigator;