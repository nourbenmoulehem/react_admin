// src/prospects/ProspectList.tsx
import {
  List,
  DatagridConfigurable,
  TextField,
  SelectInput,
  SearchInput
} from "react-admin";
import { usePermissions } from "react-admin";

export const ProspectListDefault = () => {
  const { identity } = usePermissions();       // contains agence + gouvernorat
  console.log("🚀 ~ ProspectList ~ identity:", identity)

  const filters = [
    <SearchInput  source="q"      placeholder="Nom / Prénom" alwaysOn />,
    <SelectInput  source="status" choices={[
        { id: "PAS_ENCORE_CONTACTE", name: "Pas encore contacté" },
        { id: "INJOIGNABLE",         name: "Injoignable" },
        { id: "INTERESSE",           name: "Intéressé" },
        { id: "NON_INTERESSE",       name: "Non intéressé" }
    ]}/>
  ];

  const defaultFilter = { gouvernorat: identity?.agence?.gouvernorat };

  return (
    <List filters={filters} filterDefaultValues={defaultFilter} perPage={20}>
      <DatagridConfigurable rowClick="edit">
        <TextField source="id"           label="ID" />
        <TextField source="nom"          />
        <TextField source="prenom"       />
        <TextField source="status"       />
        <TextField source="ville"        />
        <TextField source="gouvernorat"  />
      </DatagridConfigurable>
    </List>
  );
};
