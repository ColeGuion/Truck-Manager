/*-------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------*/
import React from 'react';
import SignInScreen from './Screens/SignInScreen.jsx';
import HomeScreen from './Screens/HomeScreen.jsx';
import RegistrationScreen from './Screens/RegistrationScreen.jsx';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen.jsx';
import LoadInvoicesScreen from './Screens/LoadInvoicesScreen.jsx';
import AccountingScreen from './Screens/AccountingScreen.jsx';
import UserProfileScreen from './Screens/UserProfileScreen.jsx';
import ErrorBoundary from './Screens/ErrorBoundary';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './App.css'
import AddEmployee from './Screens/AddEmployee.jsx';

/*-------------------------------------------------------------------
    Top level access to application

    Includes browser router to facilitate routing between pages.
-------------------------------------------------------------------*/
function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <SignInScreen />, errorElement: <ErrorBoundary />,
    },
    {
      path: "/home", element: <HomeScreen />, errorElement: <ErrorBoundary />,
    },
    {
      path: "/register", element: <RegistrationScreen />, errorElement: <ErrorBoundary />,
    },
    {
      path: "/forgotpassword", element: <ForgotPasswordScreen />, errorElement: <ErrorBoundary />,
    },
    {
      path: "/loadinvoice", element: <LoadInvoicesScreen />, errorElement: <ErrorBoundary />,
    },
    {
      path: "/accounting", element: <AccountingScreen />, errorElement: <ErrorBoundary />,
    },
    {
      path: "/user", element: <UserProfileScreen />, errorElement: <ErrorBoundary />,
    },
    {
      path: "/addemployee", element: <AddEmployee />, errorElement: <ErrorBoundary />,
    },
    ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
