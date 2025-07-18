import {
  List,
  DatagridConfigurable,
  TextField,
  SelectInput,
  SearchInput,
  FunctionField,
  EditButton,
  CreateButton,
  TopToolbar,
  FilterButton,
  ExportButton,
  useListContext
} from "react-admin";
import { Card, CardContent, Typography, Box, Avatar, Chip } from '@mui/material';
import { CalendarToday, AccessTime, Person, Assignment, LocationPin } from '@mui/icons-material';

const VisitListActions = () => (
  <TopToolbar>
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </TopToolbar>
);

const StatusChip = ({ record }: any) => {
  const statusConfig = {
    REPORTEE: { color: '#2196f3', bgColor: '#e3f2fd', label: ' Reportée ' },
    PLANIFIEE: { color: '#ff9800', bgColor: '#fff3e0', label: 'Planifiée' },
    REALISEE: { color: '#4caf50', bgColor: '#e8f5e8', label: 'Réalisée' },
    NO_SHOW: { color: '#9e9e9e', bgColor: '#f5f5f5', label: 'Terminée' },
    ANNULEE: { color: '#f44336', bgColor: '#ffebee', label: 'Annulée' }
  };
  
  const config = statusConfig[record.statut as keyof typeof statusConfig] || {
    color: '#000',
    bgColor: '#f5f5f5',
    label: record.statut
  };
  
  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        backgroundColor: config.bgColor,
        color: config.color,
        fontWeight: 'bold',
        borderRadius: '12px',
        fontSize: '0.75rem'
      }}
    />
  );
};

const TimeRangeField = ({ record }: any) => {
  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
      <Typography variant="body2">
        {formatHour(record.startHour)} - {formatHour(record.endHour)}
      </Typography>
    </Box>
  );
};

const GPField = ({ record }: any) => {
  if (!record.gpFullName) return <span>-</span>;
  
  const initials = record.gpFullName
    .split(' ')
    .map((name: string) => name.charAt(0))
    .join('')
    .toUpperCase();
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.main' }}>
        {initials}
      </Avatar>
      <Typography variant="body2">{record.gpFullName}</Typography>
    </Box>
  );
};

const ProspectField = ({ record }: any) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
      <Typography variant="body2">
         {record.prospectFullName || 'Prospect inconnu'}
      </Typography>
    </Box>
  );
};

const LocalisationField = ({ record }: any) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <LocationPin sx={{ fontSize: 16, color: 'text.secondary' }} />
      <Typography variant="body2">
         {record.adresse || 'Localisation inconnue'}
      </Typography>
    </Box>
  );
};

const ObjectField = ({ record }: any) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Assignment sx={{ fontSize: 16, color: 'text.secondary' }} />
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {record.objet}
      </Typography>
    </Box>
  );
};

const CommentairesField = ({ record }: any) => {
  if (!record.commentaires) {
    return <Typography variant="body2" color="text.secondary">-</Typography>;
  }
  
  return (
    <Typography 
      variant="body2" 
      sx={{ 
        maxWidth: 200, 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
      title={record.commentaires}
    >
      {record.commentaires}
    </Typography>
  );
};

const VisitDateField = ({ record }: any) => {
  const date = new Date(record.visitDate);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const isPast = date < today;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: isToday ? 'bold' : 'normal',
          color: isToday ? 'primary.main' : isPast ? 'text.secondary' : 'text.primary'
        }}
      >
        {date.toLocaleDateString('fr-FR', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        })}
      </Typography>
    </Box>
  );
};

export const VisitList = () => {
  const filters = [
    <SearchInput 
      source="q" 
      placeholder="Rechercher par GP, prospect, objet..." 
      alwaysOn 
    />,
    <SelectInput 
      source="statut" 
      label="Statut"
      choices={[
        { id: "REPORTEE", name: "Reportée" },
        { id: "CONFIRMEE", name: "Confirmée" },
        { id: "REALISEE", name: "Réalisée" },
        { id: "NO_SHOW", name: "Terminée" },
        { id: "ANNULEE", name: "Annulée" }
      ]} 
    />,
    
  ];

  return (
    <List 
      filters={filters} 
      actions={<VisitListActions />} 
      perPage={25}
      sort={{ field: 'visitDate', order: 'DESC' }}
      // sx={{
      //   '& .RaList-content': {
      //     backgroundColor: '#f8f9fa'
      //   }
      // }}
    >
      <DatagridConfigurable 
        rowClick="edit"
        sx={{
          '& .RaDatagrid-table': {
            // backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          },
          '& .RaDatagrid-headerRow': {
            // backgroundColor: '#f5f5f5',
            borderBottom: '2px solid #e0e0e0'
          },
          '& .RaDatagrid-row:hover': {
            backgroundColor: '#808080',
          }
        }}
      >
        <TextField 
          source="id" 
          label="ID" 
          sx={{ 
            '& .RaDatagrid-cell': { 
              fontWeight: 'bold', 
              color: 'primary.main' 
            } 
          }} 
        />
        
        <FunctionField
          label="GP"
          render={(record: any) => <GPField record={record} />}
        />
        
        <FunctionField
          label="Prospect"
          render={(record: any) => <ProspectField record={record} />}
        />

        <FunctionField
          label="Adresse"
          render={(record: any) => <LocalisationField record={record} />}
        />
        
        <FunctionField
          label="Date"
          render={(record: any) => <VisitDateField record={record} />}
        />
        
        <FunctionField
          label="Horaire"
          render={(record: any) => <TimeRangeField record={record} />}
        />
        
        <FunctionField
          label="Objet"
          render={(record: any) => <ObjectField record={record} />}
        />
        
        <FunctionField
          label="Statut"
          render={(record: any) => <StatusChip record={record} />}
        />
        
        <FunctionField
          label="Commentaires"
          render={(record: any) => <CommentairesField record={record} />}
        />
        
        <EditButton />
      </DatagridConfigurable>
    </List>
  );
};