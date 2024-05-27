

import Home from '@pages/Home';
import Login from '@pages/Login';
import Templatey from '@templates/Templatey';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import AdminDashboardui from 'admindashboard/AdminDashboardui';
import './App.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Templatey />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },

    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
    // <AdminDashboardui />

  )
}

export default App;
