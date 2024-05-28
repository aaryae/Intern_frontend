import Home from '@pages/Home';
import Login from '@pages/Login';
import Template from '@templates/Template';
import AdminDashboardui from '@components/admindashboard/AdminDashboardui'; // Uncomment this import
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
  { path: '/admindashboardui', element: <AdminDashboardui /> }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
