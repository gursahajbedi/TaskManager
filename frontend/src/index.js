import React from 'react';
import { render } from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from "./context/AuthContext";

render(
  <AuthContextProvider>
  <App></App>
  </AuthContextProvider>,
  document.getElementById("main")
)