import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { App } from "./components/App";
import { Home } from "./views/Home";
import { Country } from "./views/Country";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="country/:name" element={<Country />} />
      <Route
        element={
          <section>
            <h1>404</h1>
          </section>
        }
        path="*"
      />
    </Route>
  )
);
