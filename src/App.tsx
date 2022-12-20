import React, { useEffect } from 'react';
import routes from './utils/routes';
import { RouterProvider } from 'react-router-dom';
import "./index.css";
import { MainContext, useAuthContext } from './utils/context';
// export default router;
function App() {

  const authCtx = useAuthContext();

  useEffect(() => {
    authCtx.checkLogin();
    console.log("ddda", authCtx.user)
  }, []);

  return (
    <MainContext>
      <RouterProvider router={routes} />
    </MainContext>
  );
}

export default App;
