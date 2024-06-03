import Createadmin from '@components/admincreate/Createadmin';
import Admindashboard from '@components/admindashboard/Admindashboard';
import Admindetail from '@components/admindetail/Admindetail';
import Adminhome from '@components/adminhome/Adminhome';
import Adminlist from '@components/adminlistui/Adminlist';
import UpdatePassword from '@components/adminpassword/UpdatePassword';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Template from '@templates/Template';
import ProtectedRoute from 'ProtectedRoute';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> }
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Adminhome /> },
      { path: 'adminlist', element: <Adminlist /> },
      { path: 'adminlist/admindetails', element: <Admindetail /> },
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



