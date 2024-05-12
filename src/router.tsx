import {
  withAuthenticator,
  // WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import BarcodeScannerPage from "./pages/donation/BarcodeScannerPage";
import DonationConfirmationPage from "./pages/donation/DonationConfirmationPage";
import ImageUploadPage from "./pages/donation/ImageUploadPage";
import ISBNInputPage from "./pages/donation/ISBNInputPage";
import MainSelectionPage from "./pages/donation/MainSelectionPage";
import MockCardsPage from "./pages/mock/MockCardsPage";
import RequestBooksPage from "./pages/request/RequestBooksPage";

import MainLayout from "@/components/Layout/MainLayout";
import MockAboutPage from "@/pages/mock/MockAboutPage";
import MockGqlPage from "@/pages/mock/MockGqlPage";
import MockHomePage from "@/pages/mock/MockHomePage";

import "@aws-amplify/ui-react/styles.css";

// const AuthWrapper: React.FC<WithAuthenticatorProps> = ({ signOut, user }) => (
//   <ThemeProvider theme={theme}>
//     <div>
//       {user ? (
//         <>
//           <p>Welcome, {user.username}</p>
//           <Button variant="contained" color="secondary" onClick={signOut}>
//             Sign Out
//           </Button>
//         </>
//       ) : (
//         <>
//           <Button variant="contained" color="primary" href="/login">
//             Sign In
//           </Button>
//           <Button variant="contained" color="secondary" href="/signup">
//             Sign Up
//           </Button>
//         </>
//       )}
//     </div>
//   </ThemeProvider>
// );

const AuthenticatedHomePage = withAuthenticator(MockHomePage);
// const AuthenticatedAuthWrapper = withAuthenticator(AuthWrapper);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<AuthenticatedHomePage />}>
        {/* 作成した本番用Pageコンポーネントを配置 */}
        <Route path="donation">
          {/* 寄付機能 PATH */}
          {/* TODO: 各ページの作成  */}
          <Route path="selection" element={<MainSelectionPage />} />
          <Route path="upload-image" element={<ImageUploadPage />} />
          <Route path="input-isbn" element={<ISBNInputPage />} />
          <Route path="scan-barcode" element={<BarcodeScannerPage />} />
          {/* <Route path="confirm-book" element={<BookConfirmationPage /> } /> */}
          <Route
            path="confirm-donation"
            element={<DonationConfirmationPage />}
          />
        </Route>
        <Route path="requests">
          {/* リクエスト一覧 PATH */}
          {/* TODO: 各ページの作成  */}
          <Route index element={<RequestBooksPage />} />
          {/* <Route path="selection" element={<MainSelectionPage />} /> */}
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
