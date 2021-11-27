import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const MenuPage = lazy(() => import("./pages/Menu"));
const MainPage = lazy(() => import("./pages/Main"));
const EditSamplePage = lazy(() => import("./pages/EditSample"));

export default function App() {

  function LoadingPage() {
    return (
      <StyledLoading>Now Loading...</StyledLoading>
    );
  }

  return (
    <BrowserRouter>
      <StyledGlobal />
      <Suspense fallback={<LoadingPage />}>
        <Route path="/" exact component={MenuPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/editSample" component={EditSamplePage} />
      </Suspense>
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

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 30px;
`;
