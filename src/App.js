import { Route, Switch } from "react-router-dom";
import React, { Fragment, Suspense } from "react";
import "./App.css";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Laodign";

function App() {
  const LoginComponent = React.lazy(() => import("./pages/Login"));
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <LoginComponent />
          </Route>
          <Route path="/login">
            <LoginComponent />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Fragment>
  );
}

export default App;
