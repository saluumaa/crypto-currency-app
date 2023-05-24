import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';
import {Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News} from './components';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                 <Route path="/" element={<Homepage />} />
                <Route exact path="/exchanges" element={<Exchanges />} /> 
                <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
                <Route exact path="/cryptodetails" element={<CryptoDetails />} />
                <Route exact path="/news" element={<News />} />
              </Routes> 
            </div>
          </Layout>

        <div className="footer">
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/cryptodetails">CryptoDetails</Link>
            <Link to="/news">News</Link>
          </Space>
          </div>
        </div>
    </div>
  );
}

export default App;
