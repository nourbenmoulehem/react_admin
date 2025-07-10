import {
  List,
  DatagridConfigurable,
  TextField,
  SelectInput,
  SearchInput,
  DateField,
  useRecordContext,
  FilterButton,
  CreateButton,
  ExportButton,
  TopToolbar,
  BulkDeleteButton,
  BulkActionsToolbar,
  UpdateButton
} from "react-admin";
import { usePermissions } from "react-admin";
import { Chip, Box, Typography, Avatar } from "@mui/material";
import { Person, Phone, LocationOn, Euro } from "@mui/icons-material";

// Enhanced Status Field with better styling
const StatusField = () => {
  const record = useRecordContext();
  if (!record) return null;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PAS_ENCORE_CONTACTE":
        return { label: "Pas encore contacté", color: "default" as const };
      case "INJOIGNABLE":
        return { label: "Injoignable", color: "error" as const };
      case "INTERESSE":
        return { label: "Intéressé", color: "success" as const };
      case "NON_INTERESSE":
        return { label: "Non intéressé", color: "warning" as const };
      default:
        return { label: status, color: "default" as const };
    }
  };

  const config = getStatusConfig(record.status);
  
  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="outlined"
    />
  );
};

// Enhanced Name Field
const NameField = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
        <Person fontSize="small" />
      </Avatar>
      <Box>
        <Typography variant="body2" fontWeight="medium">
          {record.nom} {record.prenom}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {record.genre === 'HOMME' ? 'Homme' : 'Femme'}
        </Typography>
      </Box>
    </Box>
  );
};

// Enhanced Phone Field
const PhoneField = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Phone fontSize="small" color="primary" />
      <Typography variant="body2">{record.tel}</Typography>
    </Box>
  );
};

// Enhanced Location Field
const LocationField = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LocationOn fontSize="small" color="primary" />
      <Box>
        <Typography variant="body2">{record.ville}</Typography>
        <Typography variant="caption" color="text.secondary">
          {record.gouvernorat?.replace('_', ' ')}
        </Typography>
      </Box>
    </Box>
  );
};

// Enhanced Amount Field
const AmountField = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" fontWeight="medium">
        {record.montant} TND
      </Typography>
    </Box>
  );
};

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    {/* <UpdateButton /> */}
    <ExportButton />
  </TopToolbar>
);

const BulkActions = () => (
  <BulkActionsToolbar>
    <BulkDeleteButton />
  </BulkActionsToolbar>
);

export const ProspectListDefault = () => {
  const { identity } = usePermissions();

  const filters = [
    <SearchInput source="q" placeholder="Nom / Prénom / Téléphone" alwaysOn />,
    <SelectInput source="status" choices={[
      { id: "PAS_ENCORE_CONTACTE", name: "Pas encore contacté" },
      { id: "INJOIGNABLE", name: "Injoignable" },
      { id: "INTERESSE", name: "Intéressé" },
      { id: "NON_INTERESSE", name: "Non intéressé" }
    ]} />,
    <SelectInput source="genre" choices={[
      { id: "HOMME", name: "Homme" },
      { id: "FEMME", name: "Femme" }
    ]} />,
    <SelectInput source="besoin" choices={[
      { id: "EQUIPEMENT", name: "Équipement" },
      { id: "STOCK", name: "Stock" },
      { id: "VEHICULE", name: "Véhicule" },
      { id: "FOND_DE_ROULEMENTS", name: "Fonds de roulement" },
      { id: "AMENAGEMENT", name: "Aménagement" },
      { id: "AUTRES", name: "Autres" }
    ]} />
  ];

  const defaultFilter = { gouvernorat: identity?.agence?.gouvernorat };

  return (
    <List 
      filters={filters} 
      perPage={20}
      actions={<ListActions />}
      
    >
      <DatagridConfigurable 
        bulkActionButtons={<BulkActions />}
        rowClick="edit"
        sx={{
          '& .RaDatagrid-table': {
            '& .RaDatagrid-headerCell': {
              backgroundColor: 'background.default',
              fontWeight: 'bold',
            },
            '& .RaDatagrid-row:hover': {
              backgroundColor: 'action.hover',
            },
          },
        }}
      >
        <TextField source="id" label="ID" />
        <NameField />
        <PhoneField  />
        <StatusField  />
        <LocationField  />
        <AmountField  />
        <DateField 
          source="createdAt" 
          label="Créé le" 
          showTime={false}
          locales="fr-FR"
        />
        <TextField source="addedByFullName" label="Ajouté par" />
      </DatagridConfigurable>
    </List>
  );
};

