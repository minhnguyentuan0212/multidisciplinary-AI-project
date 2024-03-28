import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import './History.css'
import { HistoryData } from './HistoryData';

const History = () => {
    return (
        <div className="history">
            <div className="title-bar">
                <div className="title">History</div>
                <div className="expand">View all</div>
            </div>
            
            <ul className="hist-data">
                {HistoryData.map((val,key) => {
                    return (
                        <li 
                            key={key} 
                            className="hist-row"
                            // onClick={() => {window.location.pathname = val.link}}
                        >
                            <div className="device-info">
                                <div className="device">{val.device}</div>
                                <div className="time">{val.time}</div>
                            </div>
                            
                            <div className="user-info">
                                <div className={"status " + (val.status ? "on" : "off")}>{(val.status ? "Turn On": "Turn Off")}</div>
                                <div className="user">{"| " + val.user}</div>
                            </div>
                            
                        </li>
                    )
                })}
            </ul>
                
        </div>
        
    )
}

export default History;