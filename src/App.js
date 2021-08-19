import { Route, Switch } from "react-router-dom";
import React, { Fragment, Suspense } from "react";
import "./App.css";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Laodign";
import Layout from "./Layout/Layout";
function App() {
  const LoginComponent = React.lazy(() => import("./pages/Login"));
  const ManageExpense = React.lazy(() =>
    import("./pages/ManageExpense")
  );
  const HalalCheck = React.lazy(() => import("./pages/HalalCheck"));

  return (
    <Fragment>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact>
              <LoginComponent />
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/manageExpense" exact>
              <ManageExpense />
            </Route>
            <Route path="/halalCheck" exact>
              <HalalCheck />
            </Route>
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </Fragment>
  );
}

export default App;
