import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import BarcodeScannerPage from "./pages/donation/BarcodeScannerPage";
import BookTitleInputPage from "./pages/donation/BookTitleInputPage";
import DonationConfirmationPage from "./pages/donation/DonationConfirmationPage";
import ISBNInputPage from "./pages/donation/ISBNInputPage";
import MainSelectionPage from "./pages/donation/MainSelectionPage";
import MockCardsPage from "./pages/mock/MockCardsPage";
import RequestBooksPage from "./pages/request/RequestBooksPage";
import RequestDetailPage from "./pages/request/RequestDetailPage";
import SearchBooksPage from "./pages/search/SearchBooksPage";

import MainLayout from "@/components/Layout/MainLayout";
import MockAboutPage from "@/pages/mock/MockAboutPage";
import MockGqlPage from "@/pages/mock/MockGqlPage";
import MockHomePage from "@/pages/mock/MockHomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/">
        {/* 作成した本番用Pageコンポーネントを配置 */}
        <Route index element={<SearchBooksPage />} />
        <Route path="donation">
          {/* 寄付機能 PATH */}
          <Route path="selection" element={<MainSelectionPage />} />
          <Route path="input-book-title" element={<BookTitleInputPage />} />
          <Route path="input-isbn" element={<ISBNInputPage />} />
          <Route path="scan-barcode" element={<BarcodeScannerPage />} />
          <Route
            path="confirm-donation"
            element={<DonationConfirmationPage />}
          />
        </Route>
        <Route path="requests">
          {/* リクエスト一覧 PATH */}
          {/* TODO: 各ページの作成  */}
          <Route index element={<RequestBooksPage />} />
          <Route path="detail" element={<RequestDetailPage />} />
        </Route>
      </Route>
      <Route path="/mock">
        {/* // mock用ページ */}
        <Route index element={<MockHomePage />} />
        <Route path="about" element={<MockAboutPage />} />
        <Route path="cards" element={<MockCardsPage />} />
        <Route path="gql" element={<MockGqlPage />} />
      </Route>
      ,
    </Route>,
  ),
);

export default router;
