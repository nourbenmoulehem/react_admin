import { List, Datagrid, TextField, BooleanField, DateField, DeleteButton, FilterButton,
  CreateButton,
  ExportButton,
  TopToolbar,
  BulkDeleteButton,
  BulkActionsToolbar,
  SearchInput,
  SelectInput, } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { BlockButton } from './BlockButton';


const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    {/* <UpdateButton /> */}
    <ExportButton />
  </TopToolbar>
);
const filters = [
  <SearchInput source="q" placeholder="Nom / Prénom / Téléphone" alwaysOn />,
  <SelectInput source="role" choices={[
      { id: "ADMIN",                name: "Admin" },
      { id: "CHARGEE_OP",           name: "Chargée d'opération" },
      { id: "GESTIONNAIRE_PORTFEUIL", name: "Gestionnaire de Portefeuille" },
      { id: "PROSPECTEUR",          name: "Prospecteur" },
  ]} />,
];

export const UserList = () => (
  <List
      filters={filters} 
      perPage={20}
      actions={<ListActions />}
    >
    
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="email" label="Email" />
        <TextField source="nom" label="Nom" />
        <TextField source="prenom" label="Prénom" />
        <TextField source="tel" label="Téléphone" />
        <TextField source="role" label="Rôle" />
        <BooleanField source="isEnabled" label="Activé" />
        <BooleanField source="isVerified" label="Vérifié" />
        <TextField source="matricule" label="Matricule" />
        <DateField source="createdAt" label="Créé le" locales="fr-FR" showTime />
         <BlockButton />
      </Datagrid>
  </List>
);