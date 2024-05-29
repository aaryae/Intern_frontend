import Adminhome from '@components/adminhome/Adminhome';
import Adminlist from '@components/adminlistui/Adminlist';
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

    ]
  },
  // { path: '/admin', element: <AdminDashboardui /> }
  {
    path: '/admin',
    element: <AdminTemplate />,
    children: [
      { index: true, element: <Adminhome /> },
      { path: 'editadmin', element: <Adminlist /> },

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
