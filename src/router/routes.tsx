import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Auth,
  ChatSupport,
  Final,
  Learn,
  Loader,
  NewRequestStart,
  NewRequestStep1,
  NewRequestStep2,
  NewRequestStep3,
  NewRequestStep4,
  NewRequestStep5,
  NewRequestStep6,
  NewRequestStep7,
  Notifications,
  PageContainer,
  SelectProfile,
  Support,
  WalkThrough,
  Welcome,
} from "pages";

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
            path: "/newRequest/start",
            element: (
              <PrivateRoute component={NewRequestStart} redirectTo="/auth" />
            ),
          },
          {
            path: "/newRequest/step1",
            element: (
              <PrivateRoute component={NewRequestStep1} redirectTo="/auth" />
            ),
          },
          {
            path: "/newRequest/step2",
            element: (
              <PrivateRoute component={NewRequestStep2} redirectTo="/auth" />
            ),
          },
          {
            path: "/newRequest/step3",
            element: (
              <PrivateRoute component={NewRequestStep3} redirectTo="/auth" />
            ),
          },
          {
            path: "/newRequest/step4",
            element: (
              <PrivateRoute component={NewRequestStep4} redirectTo="/auth" />
            ),
          },
          {
            path: "/newRequest/step5",
            element: (
              <PrivateRoute component={NewRequestStep5} redirectTo="/auth" />
            ),
          },
          {
            path: "/newRequest/step6",
            element: (
              <PrivateRoute component={NewRequestStep6} redirectTo="/auth" />
            ),
          },
          {
            path: "/newRequest/step7",
            element: (
              <PrivateRoute component={NewRequestStep7} redirectTo="/auth" />
            ),
          },
          {
            path: "/newRequest/final",
            element: (
              <PrivateRoute component={Final} redirectTo="/auth" />
            ),
          },
          {
            path: "/welcome",
            element: <PrivateRoute component={Welcome} redirectTo="/auth" />,
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
            path: "/notifications",
            element: (
              <PrivateRoute component={Notifications} redirectTo="/auth" />
            ),
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
