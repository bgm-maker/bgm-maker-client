import { BrowserRouter, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import MenuPage from "./pages/Menu";
import MainPage from "./pages/Main";
import EditSamplePage from "./pages/EditSample";

export default function App() {
  return (
    <BrowserRouter>
      <StyledGlobal />
      <Route path="/" exact component={MenuPage} />
      <Route path="/main" component={MainPage} />
      <Route path="/editSample" component={EditSamplePage} />
    </BrowserRouter>
  );
}

const StyledGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
`;
