import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLogin from "../../pages/auth";
import Home from "../../pages/home";
import ProtectedRoute from "../../components/ProtectedRoute";
import MainLayout from "../../components/layout";
import { MainContext, useAuthContext } from "../context";
import FormSubmission from "../../pages/form";



const Router = (p: any) => {

  const { user } = useAuthContext();


  const router = createBrowserRouter([
    {
      element: <UserLogin />,
      path: "login",
    },
    {
      path: '',
      children: [
        {
          path: '',
          element: <ProtectedRoute Element={<Home />}/>
        },
        {
          path: 'form/:id',
          element: <ProtectedRoute Element={<FormSubmission />}/>
        }
      ],
      element: <MainLayout />,
    }
  ]);

  return (
    <MainContext>
      <RouterProvider router={router} />
    </MainContext>
  );
}

export default Router;