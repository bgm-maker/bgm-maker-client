import { BrowserRouter, Route } from "react-router-dom";

import MenuPage from "./pages/Menu";
import MainPage from "./pages/Main";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={MenuPage} />
      <Route path="/main" component={MainPage} />
    </BrowserRouter>
  );
}
