// App.tsx
import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./auth/authProvider";
import { ProspectList } from "./prospects/ProspectList.js";
// import { ProspectEdit } from "./prospects/ProspectEdit";
import  {Dashboard}  from "./Dashboard";
import PersonIcon from '@mui/icons-material/Person';


export function App() {
  return (

    <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
      {permissions => (
        <>
          {/* Anyone who passes checkAuth gets Prospects */}
          <Resource
            name="prospects"
            list={ProspectList}
            // edit={ProspectEdit}
            icon={PersonIcon}
            options={{ label: "Prospects" }}
          />

          {/* Example: only ADMIN sees the Users resource */}
          {permissions === "ADMIN" && (
            <Resource name="users" /* … */ />
          )}
        </>
      )}
    </Admin>
  );
}
