import Createadmin from '@components/admincreate/Createadmin';
import Admindashboard from '@components/admindashboard/Admindashboard';
import Admindetail from '@components/admindetail/Admindetail';
import Adminhome from '@components/adminhome/Adminhome';
import Adminlist from '@components/adminlistui/Adminlist';
import { default as Forgotpassword, default as UpdatePassword } from '@components/adminpassword/UpdatePassword';
import Home from '@pages/Home';
import Login from '@pages/Login';
import AdminTemplate from '@templates/AdminTemplate';
import Template from '@templates/Template';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/forgotpassword', element: <Forgotpassword /> },

    ]
  },
  // { path: '/admin', element: <AdminDashboardui /> }
  {
    path: '/admin',
    element: <AdminTemplate />,
    children: [
      { index: true, element: <Adminhome /> },
      { path: 'editadmin', element: <Adminlist /> },
      { path: 'editadmin/admindetails', element: <Admindetail /> },
      { path: 'dashboard', element: <Admindashboard /> },
      { path: 'createadmin', element: <Createadmin /> },
      { path: 'changepassword', element: <UpdatePassword /> },


    ]
  }
]);


function App() {
  return (
    <>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
