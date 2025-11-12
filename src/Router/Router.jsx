import Home from "../Pages/Home";
import Layout from "../Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "../Pages/Registration";
import LoginForm from "../Pages/Login";
import AddListing from "../Pages/AddListing";
import PetsAndSupply from "../Pages/PetsAndSupply";
import ItemDetailsPage from "../Pages/ItemDetailsPage";
import PrivateRoute from "../Layout/PrivateRoute";
import MyListings from "../Pages/MyListings";
import MyOrders from "../Pages/MyOrders";
import NotFoundPage from "../components/NotFoundPage";
import PetsCategoryPage from "../Pages/PetsCategoryPage";
import PetFoodCategoryPage from "../Pages/PetFoodCategory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/listing/:id",
        element: (
          <PrivateRoute>
            <ItemDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/pets-supplies",
        element: <PetsAndSupply />,
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/category-filtered-product/pets",
        element: <PetsCategoryPage />,
      },
      {
        path: "/category-filtered-product/pet-food",
        element: <PetFoodCategoryPage />,
      },
    ],
  },
]);
