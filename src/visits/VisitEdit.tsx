import { Typography, Box, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
  TextInput,
  NumberInput,
  required,
  useRecordContext,
  FunctionField
} from "react-admin";
import { CalendarToday, AccessTime, Person, Assignment } from '@mui/icons-material';

const VisitHeader = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Card sx={{ mb: 2, backgroundColor: '#b5838d' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{  fontWeight: 'bold' }}>
          Modifier la visite #{record.id}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person sx={{ color: 'text.secondary' }} />
              <Typography variant="body1">
                <strong>Prospect:</strong> {record.prospectFullName || 'Prospect inconnu'}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Assignment sx={{ color: 'text.secondary' }} />
              <Typography variant="body1">
                <strong>Objet:</strong> {record.objet}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const VisitEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <VisitHeader />
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2, color: 'text.primary' }}>
        Informations modifiables
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
          <Person sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
          GP Assigné
        </Typography>
        <ReferenceInput source="gpId" reference="gps">
          <SelectInput 
            optionText={(record: any) => `${record.fullName}`}
            sx={{ width: '100%' }}
            helperText="Sélectionnez le GP responsable de cette visite"
            validate={required()}
          />
        </ReferenceInput>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
          <CalendarToday sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
          Date et Heure de la visite
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }} >
            <DateInput 
              source="visitDate" 
              validate={required()} 
              label="Date de visite"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <NumberInput 
              source="startHour" 
              validate={required()} 
              label="Heure de début"
              min={0}
              max={23}
              sx={{ width: '100%' }}
              helperText="Format: 0-23 (ex: 14 pour 14h00)"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <NumberInput 
              source="endHour" 
              validate={required()} 
              label="Heure de fin"
              min={0}
              max={23}
              sx={{ width: '100%' }}
              helperText="Format: 0-23 (ex: 15 pour 15h00)"
            />
          </Grid>
        </Grid>
      </Box>

      {/* <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
          Statut de la visite
        </Typography>
        <SelectInput 
          source="statut" 
          choices={[
            { id: "REPORTEE", name: "Reportée" },
            { id: "CONFIRMEE", name: "Confirmée" },
            { id: "REALISEE", name: "Réalisée" },
            { id: "NO_SHOW", name: "No Show" },
            { id: "ANNULEE", name: "Annulée" }
          ]}
          validate={required()}
          sx={{ width: '100%' }}
        />
      </Box> */}

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
          Commentaires
        </Typography>
        <TextInput 
          source="commentaires" 
          multiline 
          rows={4} 
          sx={{ width: '100%' }}
          placeholder="Ajoutez des commentaires ou notes concernant cette visite..."
          helperText="Notes internes, préparations nécessaires, remarques particulières, etc."
        />
      </Box>

      
    </SimpleForm>
  </Edit>
);