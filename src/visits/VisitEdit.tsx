import { useEffect, useState } from "react";
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
  TextInput,
  required,
  useDataProvider,
  useNotify,
  FormDataConsumer,
  useRecordContext
} from "react-admin";
import { 
  Box, 
  Typography, 
  Alert, 
  Chip,
  Paper,
  Divider
} from "@mui/material";
import dayjs from "dayjs";

const AvailabilityChecker = ({ 
  gpId, 
  selectedDate, 
  onTimeSelect, 
  selectedSlot, 
  currentVisitSlot 
}: any) => {
  const [availability, setAvailability] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const checkAvailability = async () => {
    if (!gpId || !selectedDate) return;
    
    setLoading(true);
    try {
      const result = await dataProvider.getAvailability(gpId, selectedDate);
      setAvailability(result || []);
    } catch (error) {
      notify("Erreur lors de la vérification de disponibilité", { type: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAvailability();
  }, [gpId, selectedDate]);

  if (!gpId || !selectedDate) {
    return (
      <Alert severity="info">
        Sélectionnez un GP et une date pour voir les créneaux disponibles
      </Alert>
    );
  }

  if (loading) {
    return <Typography>Vérification des disponibilités...</Typography>;
  }

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        📅 Modifier le créneau horaire
      </Typography>
      
      {/* Current visit slot display */}
      {currentVisitSlot && (
        <Paper sx={{ 
          p: 2, 
          mb: 2, 
          backgroundColor: 'rgba(156, 39, 176, 0.08)',
          border: '1px solid rgba(156, 39, 176, 0.3)'
        }}>
          <Typography variant="subtitle2" color="secondary" gutterBottom>
            📍 Créneau actuel de la visite
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {dayjs(currentVisitSlot.start).format("HH:mm")} - {dayjs(currentVisitSlot.end).format("HH:mm")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {dayjs(currentVisitSlot.start).format("DD/MM/YYYY")}
          </Typography>
        </Paper>
      )}

      {availability.length === 0 ? (
        <Alert severity="warning">
          Aucun créneau disponible pour cette date
        </Alert>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Cliquez sur un créneau pour le sélectionner :
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {availability.map((slot: any, index: number) => {
              const startTime = dayjs(slot.start).format("HH:mm");
              const endTime = dayjs(slot.end).format("HH:mm");
              const timeSlot = `${startTime} - ${endTime}`;
              
              // Check if this is the selected slot
              const isSelected = selectedSlot && 
                dayjs(selectedSlot.start).isSame(dayjs(slot.start)) && 
                dayjs(selectedSlot.end).isSame(dayjs(slot.end));
              
              // Check if this is the current visit slot
              const isCurrentSlot = currentVisitSlot &&
                dayjs(currentVisitSlot.start).isSame(dayjs(slot.start)) && 
                dayjs(currentVisitSlot.end).isSame(dayjs(slot.end));
              
              return (
                <Chip
                  key={index}
                  label={timeSlot}
                  onClick={() => onTimeSelect(slot)}
                  clickable
                  color={isSelected ? "primary" : (isCurrentSlot ? "secondary" : "default")}
                  variant={isSelected ? "filled" : (isCurrentSlot ? "outlined" : "outlined")}
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: isSelected || isCurrentSlot ? 'bold' : 'normal',
                    border: isSelected ? '2px solid' : (isCurrentSlot ? '2px solid' : '1px solid'),
                    '&:hover': {
                      backgroundColor: isSelected ? undefined : 'rgba(25, 118, 210, 0.08)'
                    }
                  }}
                />
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export const VisitEdit = () => {
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const record = useRecordContext();

  const handleTimeSelect = (slot: any) => {
    setSelectedSlot(slot);
    console.log("🕐 Nouveau créneau sélectionné:", {
      start: slot.start,
      end: slot.end,
      formatted: `${dayjs(slot.start).format("HH:mm")} - ${dayjs(slot.end).format("HH:mm")}`
    });
  };

  // Get current visit slot from record
  const getCurrentVisitSlot = () => {
    if (!record?.start || !record?.end) return null;
    return {
      start: record.start,
      end: record.end
    };
  };

  // Transform the data before submission
  const transform = (data: any) => {
    // If no new slot is selected, keep the original timestamps
    if (!selectedSlot) {
      return {
        ...data,
        gpId: parseInt(data.gpId),
        prospectId: parseInt(data.prospectId),
      };
    }

    // Format timestamps in ISO format without seconds/milliseconds for your backend
    const start = dayjs(selectedSlot.start).format("YYYY-MM-DDTHH:mm");
    const end = dayjs(selectedSlot.end).format("YYYY-MM-DDTHH:mm");

    const payload = {
      ...data,
      gpId: parseInt(data.gpId),
      prospectId: parseInt(data.prospectId),
      start,
      end,
    };

    return payload;
  };

  return (
    <Edit transform={transform}>
      <SimpleForm>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom color="primary">
            ✏️ Modifier la visite
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Modifiez les détails de la visite planifiée
          </Typography>
          
          <Divider sx={{ mb: 3 }} />
          
          <ReferenceInput 
            source="prospectId" 
            reference="prospects"
          >
            <SelectInput 
              optionText={(record: any) => `${record.nom} ${record.prenom}`}
              label="Prospect"
              validate={required()}
            />
          </ReferenceInput>

          <ReferenceInput 
            source="gpId" 
            reference="gps"
          >
            <SelectInput
              optionText={(r: any) => r.fullName}
              label="GP"
              validate={required()}
            />
          </ReferenceInput>

          <DateInput 
            source="dateVisite" 
            label="Date de visite" 
            validate={required()}
          />

          <FormDataConsumer>
            {({ formData }) => {
              const formattedDate = formData.dateVisite ? dayjs(formData.dateVisite).format("YYYY-MM-DD") : null;
              const currentVisitSlot = getCurrentVisitSlot();
              
              return (
                <>
                  <AvailabilityChecker 
                    gpId={formData.gpId}
                    selectedDate={formattedDate}
                    onTimeSelect={handleTimeSelect}
                    selectedSlot={selectedSlot}
                    currentVisitSlot={currentVisitSlot}
                  />

                  {/* Display selected time slot */}
                  {selectedSlot && (
                    <Box sx={{ 
                      mt: 2, 
                      mb: 2, 
                      p: 2, 
                      backgroundColor: 'rgba(76, 175, 80, 0.08)',
                      borderRadius: 1,
                      border: '1px solid rgba(76, 175, 80, 0.3)'
                    }}>
                      <Typography variant="subtitle1" color="success.main" gutterBottom>
                        ✅ Nouveau créneau sélectionné
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {dayjs(selectedSlot.start).format("HH:mm")} - {dayjs(selectedSlot.end).format("HH:mm")}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date: {dayjs(selectedSlot.start).format("DD/MM/YYYY")}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Timestamps: {dayjs(selectedSlot.start).format("YYYY-MM-DDTHH:mm")} → {dayjs(selectedSlot.end).format("YYYY-MM-DDTHH:mm")}
                      </Typography>
                    </Box>
                  )}

                  {/* Show current slot info if no new slot selected */}
                  {!selectedSlot && currentVisitSlot && (
                    <Box sx={{ 
                      mt: 2, 
                      mb: 2, 
                      p: 2, 
                      backgroundColor: 'rgba(158, 158, 158, 0.08)',
                      borderRadius: 1,
                      border: '1px solid rgba(158, 158, 158, 0.3)'
                    }}>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        ℹ️ Créneau actuel (inchangé)
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {dayjs(currentVisitSlot.start).format("HH:mm")} - {dayjs(currentVisitSlot.end).format("HH:mm")}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date: {dayjs(currentVisitSlot.start).format("DD/MM/YYYY")}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Sélectionnez un nouveau créneau pour modifier l'horaire
                      </Typography>
                    </Box>
                  )}

                  {/* Hidden input to make react-admin validation happy */}
                  <input 
                    type="hidden" 
                    name="heureVisite" 
                    value={selectedSlot ? 
                      `${dayjs(selectedSlot.start).format("HH:mm")}-${dayjs(selectedSlot.end).format("HH:mm")}` : 
                      (currentVisitSlot ? `${dayjs(currentVisitSlot.start).format("HH:mm")}-${dayjs(currentVisitSlot.end).format("HH:mm")}` : '')
                    }
                  />
                </>
              );
            }}
          </FormDataConsumer>

          <TextInput 
            source="objet" 
            label="Objet" 
            validate={required()}
          />

          <SelectInput 
            source="status" 
            choices={[
              { id: "PLANIFIEE", name: "Planifiée" },
              { id: "REPORTEE", name: "Reportée " },
              { id: "ANNULEE", name: "Annulée" },
              { id: "NO_SHOW", name: "No Show" },
              { id: "REALISEE", name: "Realisée" }
            ]}
            label="Statut"
          />

          <TextInput 
            source="commentaires" 
            label="Commentaires" 
            multiline 
            rows={3}
          />
        </Paper>
      </SimpleForm>
    </Edit>
  );
};