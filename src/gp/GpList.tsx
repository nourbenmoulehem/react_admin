import { List, Datagrid, TextField } from "react-admin";

export const GpList = () => (
  <List pagination={false} title="Gestionnaires Portefeuille">
    <Datagrid rowClick={false}>
      <TextField source="id"        label="ID" />
      <TextField source="fullName"  label="Nom" />
      <TextField source="tel"       label="Téléphone" />
    </Datagrid>
  </List>
);