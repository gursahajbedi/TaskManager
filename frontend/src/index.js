import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext";

render(
  <AuthContextProvider>
  <App></App>
  </AuthContextProvider>,
  document.getElementById("main")
)