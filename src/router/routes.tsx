import {
  Auth,
  ChatSupport,
  Final,
  Learn,
  Loader,
  NewRequestStart,
  Notifications,
  PageContainer,
  SelectProfile,
  Settings,
  Support,
  WalkThrough,
  Welcome,
} from "pages";
import CreateProfile from "pages/CreateProfile/CreateProfile";
import Login from "pages/Login/Login";
import AddOns from "pages/NewRequest/AddOns/AddOns";
import Logistics from "pages/NewRequest/Logistics/Logistics";
import Narration from "pages/NewRequest/Narration/Narration";
import ProjectInfo from "pages/NewRequest/ProjectInfo/ProjectInfo";
import Submit from "pages/NewRequest/Submit/Submit";
import VideoEdit from "pages/NewRequest/VideoEdit/VideoEdit";
import PasswordNew from "pages/PasswordNew/PasswordNew";
import PasswordReset from "pages/PasswordReset/PasswordReset";
import ProjectsPage from "pages/Projects/Projects";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./PrivateRouter";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <PrivateRoute component={PageContainer} redirectTo="/auth" />,
        children: [
          {
            path: "/",
            element: <PrivateRoute component={Welcome} redirectTo="/auth" />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/password-reset",
            element: <PasswordReset />,
          },
          {
            path: "/password-new",
            element: <PasswordNew />,
          },
          {
            path: "/new-request/start",
            element: (
              <PrivateRoute component={NewRequestStart} redirectTo="/auth" />
            ),
          },

          {
            path: "/new-request/project",
            element: (
              <PrivateRoute component={ProjectInfo} redirectTo="/auth" />
            ),
          },
          {
            path: "/new-request/logistics",
            element: (
              <PrivateRoute component={Logistics} redirectTo="/auth" />
            ),
          },
          {
            path: "new-request/narration",
            element: (
              <PrivateRoute component={Narration} redirectTo="/auth" />
            ),
          },
          {
            path: "new-request/video-edit",
            element: (
              <PrivateRoute component={VideoEdit} redirectTo="/auth" />
            ),
          },
          {
            path: "new-request/add-ons",
            element: (
              <PrivateRoute component={AddOns} redirectTo="/auth" />
            ),
          },
          {
            path: "new-request/submit",
            element: (
              <PrivateRoute component={Submit} redirectTo="/auth" />
            ),
          },
          {
            path: "new-request/final",
            element: (
              <PrivateRoute component={Final} redirectTo="/auth" />
            ),
          },
          {
            path: "/welcome",
            element: <PrivateRoute component={Welcome} redirectTo="/auth" />,
          },
          {
            path: "/projects",
            element: <PrivateRoute component={ProjectsPage} redirectTo="/auth" />,
          },
          {
            path: "/support",
            element: <PrivateRoute component={Support} redirectTo="/auth" />,
          },
          {
            path: "/learn/*",
            element: <PrivateRoute component={Learn} redirectTo="/auth" />,
          },
          {
            path: "/chatSupport",
            element: (
              <PrivateRoute component={ChatSupport} redirectTo="/auth" />
            ),
          },
          {
            path: "/settings",
            element: (
              <PrivateRoute component={Settings} redirectTo="/auth" />
            ),
          },
          {
            path: "/notifications",
            element: (
              <PrivateRoute component={Notifications} redirectTo="/auth" />
            ),
          },
          {
            path: "/profile-create",
            element: <PrivateRoute component={CreateProfile} redirectTo="/auth" />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/loader",
        element: <PrivateRoute component={Loader} redirectTo="/auth" />,
      },
      {
        path: "/walkThrough",
        element: <PrivateRoute component={WalkThrough} redirectTo="/auth" />,
      },
      {
        path: "/selectProfile",
        element: <PrivateRoute component={SelectProfile} redirectTo="/auth" />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouter;

// if we will need to make buble smaller
// не забути про wepack chuck name
// import React, { Suspense } from "react";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";

// const Demo = React.lazy(() => import("pages/DemoPage/Demo"));
// const Loader = React.lazy(() => import("pages/Loader/Loader"));
// const WalkThrough = React.lazy(() => import("pages/WalkThrough/WalkThrough"));
// const SelectProfile = React.lazy(() => import("pages/SelectProfile/SelectProfile"));
// const Welcome = React.lazy(() => import("pages/Welcome/Welcome"));
// const Support = React.lazy(() => import("pages/Support/Support"));
// const Learn = React.lazy(() => import("pages/Learn/Learn"));
// const ChatSupport = React.lazy(() => import("pages/ChatSupport/ChatSupport"));
// const Notifications = React.lazy(() => import("pages/Notifications/Notifications"));

// const Loading = () => <div>Loading...</div>;

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     children: [
//       {
//         path: "/demo",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Demo />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/loader",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Loader />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/walkThrough",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <WalkThrough />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/selectProfile",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <SelectProfile />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/welcome",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Welcome />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/support",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Support />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/learn/*",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Learn />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/chatSupport",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <ChatSupport />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/notifications",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Notifications />
//           </Suspense>
//         ),
//       },
//     ],
//   },
// ]);

// const App: React.FC = () => <RouterProvider router={routes} />;

// export default App;
