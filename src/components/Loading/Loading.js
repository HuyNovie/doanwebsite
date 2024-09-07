import React from 'react';
import ReactLoading from 'react-loading';
import "./Loading.css"

const Loading = () => (
  <div className="loading">
    <ReactLoading type="spin" color="#000" />
  </div>
);

export default Loading;
