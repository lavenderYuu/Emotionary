import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="735327731044-e6067uakpvoblp50ullcnaah2u7aaljv.apps.googleusercontent.com">
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
)
