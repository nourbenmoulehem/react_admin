// App.tsx
import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./auth/authProvider";
import { ProspectList } from "./prospects/ProspectList.js";
// import { ProspectEdit } from "./prospects/ProspectEdit";
import  {Dashboard}  from "./Dashboard";
import PersonIcon from '@mui/icons-material/Person';
import { GpList } from "./gp/GpList.js";
import { VisitList } from "./visits/VisitList.js";
import { VisitCreate } from "./visits/VisitCreate.js";
import { VisitEdit } from "./visits/VisitEdit.js";
import EventIcon from '@mui/icons-material/Event';



export function App() {
  return (

    <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
      {permissions => (
        <>
          {/* Anyone who passes checkAuth gets Prospects */}
          <Resource
            name="prospects"
            list={ProspectList}
            icon={PersonIcon}
            options={{ label: "Prospects" }}
          />

          <Resource
            name="gps"
            list={GpList}
            icon={PersonIcon}
            options={{ label: "gps" }}
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
            <Resource name="users" /* … */ />
          )}
        </>
      )}
    </Admin>
  );
}
