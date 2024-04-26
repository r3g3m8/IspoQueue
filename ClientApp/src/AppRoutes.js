import { RouteObject } from "react-router-dom";
import Counter from "./components/Counter.tsx";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home.tsx";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
