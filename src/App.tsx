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
import { endaTheme } from "./theme";
import { VerificationPage } from "./components/VerificationPage.js";
import { CustomLayout } from "./Layout.js";
import { UserList } from "./users/UsersList.js";
import { UserCreate } from "./users/UserCreate.js";
import { UserEdit } from "./users/UserEdit.js";
import DashboardAdmin from "./AdminDashboard.js";

// Default dashboard components (you may need to create these)

export function App() {
  return (
    <ThemeProvider theme={endaTheme}>
      <CssBaseline />
      <Admin 
        dataProvider={dataProvider} 
        authProvider={authProvider} 
        dashboard={({ permissions }) =>
          permissions === 'ADMIN'
            ? <DashboardAdmin />
            : permissions === 'CHARGEE_OP'
              ? <Dashboard />
              : null
        }
        layout={CustomLayout}
        loginPage={CustomLoginPage}
        theme={endaTheme}
      >
        {/* Custom routes for signup */}
        <CustomRoutes noLayout>
          <Route path="/signup" element={<CustomSignUpPage />} />
          <Route path="/verify" element={<VerificationPage />} />
        </CustomRoutes>

        {(permissions) => (
          <>
            {/* Resources for CHARGEE_OP */}
            {permissions === "CHARGEE_OP" && (
              <>
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
              </>
            )}

            {/* Resources for ADMIN */}
            {permissions === "ADMIN" && (
              <>
                <Resource
                  name="users"
                  list={UserList}
                  create={UserCreate}
                  edit={UserEdit}
                />
                
                
              </>
            )}
          </>
        )}
      </Admin>
    </ThemeProvider>
  );
}