import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Register from './pages/Register.js';
import { nameDups } from './lib/getNameDups.js';
import { VerifyEmail } from './pages/VerifyEmail.js';
import { EmailVerification } from './pages/EmailVerification.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import ReportPainLevels from './pages/ReportPainLevels.js';

import './index.css';

import reportWebVitals from './reportWebVitals';

setTimeout(() => {
  let profileRoutes = [];
  for (let [name] of nameDups) {
    let nameInPath = name.toLowerCase();
    nameInPath = nameInPath.replaceAll(' ', '-');

    if (nameDups.get(name) > 1) nameInPath += `-${crypto.randomUUID()}`;

    profileRoutes.push(
      <Route path={`/${nameInPath}`} element={<Profile nameOfUser={name} />} />
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/register' element={<Register />} />
          {profileRoutes}
          <Route path='/please-verify' element={<VerifyEmail />} />
          <Route
            path='/verify-email/:VerificationString'
            element={<EmailVerification />}
          />
          <Route path='/login' element={<Login />} />
          <Route path='/report-pain-levels' element={<ReportPainLevels />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}, 150);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
