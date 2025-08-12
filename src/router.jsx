import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { App } from "./components/App";
import { Home } from "./views/Home";
import { CountriesListView } from "./views/CountriesListView";
import { CountryDetailsView } from "./views/CountryDetailsView";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="country/:code" element={<CountryDetailsView />} />
      <Route path="countries" element={<CountriesListView />} />
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
