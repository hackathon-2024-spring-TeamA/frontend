import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainSelectionPage from "./pages/donation/MainSelectionPage";
import MockCardsPage from "./pages/mock/MockCardsPage";

import MainLayout from "@/components/Layout/MainLayout";
import MockAboutPage from "@/pages/mock/MockAboutPage";
import MockHomePage from "@/pages/mock/MockHomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/">
        {/* 作成した本番用Pageコンポーネントを配置 */}
        <Route path="donation">
          {/* 寄付機能 PATH */}
          {/* TODO: 各ページの作成  */}
          <Route path="selection" element={<MainSelectionPage />} />
          {/* <Route path="upload-image" element={} /> */}
          {/* <Route path="input-isbn" element={} /> */}
          {/* <Route path="scan-barcode" element={} /> */}
          {/* <Route path="confirm-book" element={} /> */}
          {/* <Route path="confirm-donation" element={} /> */}
        </Route>
      </Route>
      <Route path="/mock">
        {/* // mock用ページ */}
        <Route index element={<MockHomePage />} />
        <Route path="about" element={<MockAboutPage />} />
        <Route path="cards" element={<MockCardsPage />} />
      </Route>
      ,
    </Route>,
  ),
);

export default router;
