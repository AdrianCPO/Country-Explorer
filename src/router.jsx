import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { App } from "./components/App";
import { CountriesListView } from "./views/CountriesListView";
import { CountryDetailsView } from "./views/CountryDetailsView";
import { AboutView } from "./views/AboutView";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="countries" replace />} />
      <Route path="countries" element={<CountriesListView />} />
      <Route path="country/:code" element={<CountryDetailsView />} />
      <Route path="/about" element={<AboutView />} />
      <Route
        element={
          <section>
            <h1>404 Sidan du sökt hittades tyvärr inte</h1>
          </section>
        }
        path="*"
      />
    </Route>
  )
);
