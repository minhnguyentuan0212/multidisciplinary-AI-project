import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import './History.css'
import { HistoryData } from './HistoryData';

const History = () => {
    return (
        <div className="history card bg-white shadow">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div className="title">History</div>
                <div className="expand">View all</div>
            </div>
            
            <ul className="hist-data list-group list-group-flush">
                {HistoryData.map((val, key) => {
                    return (
                        <li key={key} className="hist-row list-group-item">
                            <div className="device-info">
                                <div className="device">{val.device}</div>
                                <div className="time">{val.time}</div>
                            </div>
                            
                            <div className="action-info">
                                <div className={"status " + (val.status ? "on" : "off")}>{val.status ? "On" : "Off"}</div>
                                <div className="user">by {val.user}</div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default History;