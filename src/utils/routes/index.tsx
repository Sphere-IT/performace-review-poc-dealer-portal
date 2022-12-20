import { createBrowserRouter } from "react-router-dom";
import UserLogin from "../../pages/auth";
import Home from "../../pages/home";
import ProtectedRoute from "../../components/ProtectedRoute";
import MainLayout from "../../components/layout";

const router = createBrowserRouter([
    {
      // it renders this element
      element: <UserLogin />,
  
      // when the URL matches this segment
      path: "login",
  
      // with this data loaded before rendering
    //   loader: async ({ request, params }) => {
    //     return fetch(
    //       `/fake/api/teams/${params.teamId}.json`,
    //       { signal: request.signal }
    //     );
    //   },
  
    //   // performing this mutation when data is submitted to it
    //   action: async ({ request }) => {
    //     return updateFakeTeam(await request.formData());
    //   },
  
    //   // and renders this element in case something went wrong
    //   errorElement: <ErrorBoundary />,
    },
    {
      path: '',
      children: [
        {
          path: '',
          element: <ProtectedRoute Element={<Home />}/>
        }
      ],
      element: <MainLayout />,
    }
  ]);

export default router;