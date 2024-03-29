import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import './Member.css'
import { MemberList } from './MemberList';

const Member = () => {
    return (
        <div className="member mb-0 mt-0">
            <div className="title-bar">
                <div className="title">Members</div>
                <div className="expand">View all</div>
            </div>
            
            <div className="member-box shadow p-4 mb-5">
                <ul className="mem-list">
                    {MemberList.map((val,key) => {
                        return (
                            <li 
                                key={key} 
                                className="mem-row"
                                // onClick={() => {window.location.pathname = val.link}}
                            >
                                <div className="avatar">{val.ava}</div>
                                <div className="info">
                                    <div className="name">{val.name}</div>
                                    <div className="desc">{val.desc}</div>
                                </div>
                                
                            </li>
                        )
                    })}
                </ul>
                <div className="btn">
                    <button type="button">Add member</button>
                </div>
                
            </div>
        </div>
        
    )
}

export default Member;