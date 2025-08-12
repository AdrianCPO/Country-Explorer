import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import "../styles/App.css";

export function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
