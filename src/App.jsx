import { createHashRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import './index.css'; 
import DessertsPage from './pages/DessertsPage';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<DessertsPage />} />
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

