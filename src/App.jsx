import { RouterProvider } from "react-router-dom";
import { router } from './routers/router';


export default function App() {
  return (<>
    <RouterProvider router={router} />
  </>)
};
