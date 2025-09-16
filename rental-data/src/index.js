import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dashboard from './dashboard/dashboard';
import ParsingErrorTable from './page/ParsingErrorTable';
import NoDataFoundTable from './page/NoDataFoundTable';
import NoPropertyDataFoundTable from './page/NoPropertyDataFoundTable';
import NewUrlOnboardedTable from './page/NewUrlOnboardedTable';
import UrlsInDevelopment from './page/UrlsInDevelopmentTable';
import TotalUniqueDataPointsTable from './page/TotalUniqueDataPointsTable';
// import UrlWithExceptionTable from './page/urlwithexceptiontable';
import TotalPropertiesAnalyzedTable from './page/TotalPropertiesAnalyzedTable';
import PropertyDataExceptionsTable from './page/PropertyDataExceptionsTable';
import InvalidPropertyDataTable from './page/InvalidPropertyDataTable';
import MissingUnitDetailsTable from './page/MissingUnitDetailsTable';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "parsing-error-table",
    element: <ParsingErrorTable/>
  },
  {
    path: "no-data-found-table",
    element: <NoDataFoundTable/>
  },
  {
    path: "no-property-data-found-table",
    element: <NoPropertyDataFoundTable/>
  },
  {
    path: "new-url-onboarded-table",
    element: <NewUrlOnboardedTable/>
  },
  {
    path: "urls-in-development-table",
    element: <UrlsInDevelopment/>
  },
  {
    path: "total-unique-data-points-table",
    element: <TotalUniqueDataPointsTable/>
  },
  // {
  //   path: "url-with-exception-table",
  //   element: <UrlWithExceptionTable/>
  // },
  {
    path: "total-properties-analyzed-table",
    element: <TotalPropertiesAnalyzedTable/>
  },
  {
    path: "property-data-exceptions-table",
    element: <PropertyDataExceptionsTable/>
  },
  {
    path: "invalid-property-data-table",
    element: <InvalidPropertyDataTable/>
  },
  {
    path: "missing-unit-details-table",
    element: <MissingUnitDetailsTable/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
