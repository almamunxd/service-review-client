import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import AddService from "../pages/AddService";
import PrivateRoute from "../PrivateRoute";
import Services from "../pages/services/Services";
import MyServices from "../pages/MyServices";
import MyReviews from "../pages/MyReviews";
import ServiceDetails from "../pages/ServiceDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <div>404 Not Found</div>,
        children: [

            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'addService',
                element: (
                    <PrivateRoute>
                        <AddService />
                    </PrivateRoute>
                ),
            },
            {
                path: 'services',
                element: <Services></Services>
            },
            {
                path: 'myServices',
                element: (
                    <PrivateRoute>
                        <MyServices />
                    </PrivateRoute>
                ),
            },
            {
                path: 'myReviews',
                element: (
                    <PrivateRoute>
                        <MyReviews></MyReviews>
                    </PrivateRoute>
                ),
            },
            {
                path: 'services/:id',
                element: (
                    <PrivateRoute>
                        <ServiceDetails></ServiceDetails>
                    </PrivateRoute>
                ),
            },

        ]
    },
]);

export default router;