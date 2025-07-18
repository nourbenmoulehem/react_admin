// App.tsx
import { Admin, CustomRoutes, Resource } from "react-admin";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Route } from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import { authProvider } from "./auth/authProvider";
import { ProspectList } from "./prospects/ProspectList.js";
import { Dashboard } from "./Dashboard";
import PersonIcon from '@mui/icons-material/Person';
import { GpList } from "./gp/GpList.js";
import { VisitList } from "./visits/VisitList.js";
import { VisitCreate } from "./visits/VisitCreate.js";
import { VisitEdit } from "./visits/VisitEdit.js";
import EventIcon from '@mui/icons-material/Event';
import { ProspectEdit } from "./prospects/ProspectEdit.js";
import { CustomLoginPage } from "./components/CustomLoginPage";
import { CustomSignUpPage } from "./components/CustomSignUpPage";
import { CustomLayout } from "./components/CustomLayout";
import { endaTheme } from "./theme";

export function App() {
  return (
    <ThemeProvider theme={endaTheme}>
      <CssBaseline />
      <Admin 
        dataProvider={dataProvider} 
        authProvider={authProvider} 
        dashboard={Dashboard}
        layout={CustomLayout}
        loginPage={CustomLoginPage}
        theme={endaTheme}
      >
        {/* Custom routes for signup */}
        <CustomRoutes noLayout>
          <Route path="/signup" element={<CustomSignUpPage />} />
        </CustomRoutes>

        {permissions => (
          <>
            {/* Anyone who passes checkAuth gets Prospects */}
            <Resource
              name="prospects"
              list={ProspectList}
              edit={ProspectEdit}
              icon={PersonIcon}
              options={{ label: "Prospects" }}
            />

            <Resource
              name="gps"
              list={GpList}
              icon={PersonIcon}
              options={{ label: "GPS" }}
            />

            <Resource
              name="visits"
              list={VisitList}
              create={VisitCreate}
              edit={VisitEdit}
              icon={EventIcon}
              options={{ label: "Visites" }}
            />

            {/* Example: only ADMIN sees the Users resource */}
            {permissions === "ADMIN" && (
              <Resource name="users" /* Add your user components here */ />
            )}
          </>
        )}
      </Admin>
    </ThemeProvider>
  );
}

// // App.tsx
// import { Admin, CustomRoutes, Resource } from "react-admin";
// import { dataProvider } from "./dataProvider";
// import { authProvider } from "./auth/authProvider";
// import { ProspectList } from "./prospects/ProspectList.js";
// // import { ProspectEdit } from "./prospects/ProspectEdit";
// import  {Dashboard}  from "./Dashboard";
// import PersonIcon from '@mui/icons-material/Person';
// import { GpList } from "./gp/GpList.js";
// import { VisitList } from "./visits/VisitList.js";
// import { VisitCreate } from "./visits/VisitCreate.js";
// import { VisitEdit } from "./visits/VisitEdit.js";
// import EventIcon from '@mui/icons-material/Event';
// import { ProspectEdit } from "./prospects/ProspectEdit.js";
// import { Route } from "react-router-dom"; 
// import SignUpPage from "./auth/SignUpPage.js";



// export function App() {
//   return (

//     <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
//        {/* Public route */}
//       <Route path="/signup" element={<SignUpPage />} />


//       {permissions => (
//         <>
//           {/* Anyone who passes checkAuth gets Prospects */}
//           <Resource
//             name="prospects"
//             list={ProspectList}
//             edit={ProspectEdit}
//             icon={PersonIcon}
//             options={{ label: "Prospects" }}
//           />

//           <Resource
//             name="gps"
//             list={GpList}
//             icon={PersonIcon}
//             options={{ label: "gps" }}
//           />

//           <Resource
//             name="visits"
//             list={VisitList}
//             create={VisitCreate}
//             edit={VisitEdit}
//             icon={EventIcon}
//             options={{ label: "Visites" }}
//           />

//           {/* Example: only ADMIN sees the Users resource */}
//           {permissions === "ADMIN" && (
//             <Resource name="users" /* … */ />
//           )}
//         </>
//       )}
//     </Admin>
//   );
// }
