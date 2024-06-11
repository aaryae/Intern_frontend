import  Admindashboard from '@components/adminDashboard/Admindashboard'
import Adminhome from '@components/adminhome/Adminhome';
import UpdatePassword from '@components/adminpassword/UpdatePassword';
import Manageadmin from '@components/manageadmin/Manageadmin';
import ProtectedRoute from '@components/protectedroute/Protectedroute';
import Userpage from '@components/userpage/Userpage';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Template from '@templates/Template'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
    ]
  },
  { path: '/user', element: <Userpage /> },

  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Adminhome /> },
      { path: 'manageadmin', element: <Manageadmin /> },
      { path: 'dashboard', element: <Admindashboard /> },
      { path: 'changepassword', element: <UpdatePassword /> },
    ]
  }
]);


function App() {
  return (
    <>
      <div id='toast-container-main'></div>
      <RouterProvider router={router} />

    </>
  );
}

export default App;



