import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import MockCards from "./pages/mock/MockCards";

import MainLayout from "@/components/Layout/MainLayout";
import MockAboutPage from "@/pages/mock/MockAboutPage";
import MockHomePage from "@/pages/mock/MockHomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/">{/* 作成した本番用Pageコンポーネントを配置 */}</Route>
      <Route path="about" element={<AboutPage />} />
      <Route path="/mock">
        {/* // mock用ページ */}
        <Route index element={<MockHomePage />} />
        <Route path="about" element={<MockAboutPage />} />
        <Route path="cards" element={<MockCards />} />
      </Route>
      ,
    </Route>,
  ),
);

export default router;
