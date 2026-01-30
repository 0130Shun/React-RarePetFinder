import { createHashRouter } from "react-router-dom";
import FrontendLayout from "../layout/FrontendLayout";

//前台頁面
import Home from "../views/front/home/Home";
import Articles from "../views/front/Articles";
import RarePetFinder from "../views/front/RarePetFinder";


// auth
import Login from "../views/auth/Login";
// misc
import NotFound from "../views/front/NotFound";

export const router = createHashRouter([
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'articles',
                element: <Articles />
            },
            {
                path: 'rarepetfinder',
                element: <RarePetFinder />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: '*',
                element: <NotFound />
            },
        ]
    },
]);


// 之後確定進度來得及再放

// {
//     path: "/admin",
//         element: <AdminLayout />,
//             children: [
//                 { index: true, element: <AdminDashboard /> },
//             ],
// }