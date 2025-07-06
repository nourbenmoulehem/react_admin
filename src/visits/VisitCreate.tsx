import { useEffect, useState } from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
  TextInput,
  required,
  useDataProvider,
  useNotify,
  FormDataConsumer
} from "react-admin";
import { 
  Box, 
  Typography, 
  Alert, 
  Chip
} from "@mui/material";
import dayjs from "dayjs";

const AvailabilityChecker = ({ gpId, selectedDate, onTimeSelect, selectedSlot }: any) => {
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
        📅 Sélectionnez un créneau horaire
      </Typography>
      
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
              const isSelected = selectedSlot && 
                dayjs(selectedSlot.start).isSame(dayjs(slot.start)) && 
                dayjs(selectedSlot.end).isSame(dayjs(slot.end));
              
              return (
                <Chip
                  key={index}
                  label={timeSlot}
                  onClick={() => onTimeSelect(slot)}
                  clickable
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    border: isSelected ? '2px solid' : '1px solid',
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

export const VisitCreate = () => {
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const handleTimeSelect = (slot: any) => {
    setSelectedSlot(slot);
    console.log("🕐 Créneau sélectionné:", {
      start: slot.start,
      end: slot.end,
      formatted: `${dayjs(slot.start).format("HH:mm")} - ${dayjs(slot.end).format("HH:mm")}`
    });
  };

  // Transform the data before submission
  const transform = (data: any) => {
    if (!selectedSlot) {
      throw new Error("Veuillez sélectionner un créneau horaire");
    }

    // Format timestamps in ISO format without seconds/milliseconds for your backend
    const start = dayjs(selectedSlot.start).format("YYYY-MM-DDTHH:mm");
    const end = dayjs(selectedSlot.end).format("YYYY-MM-DDTHH:mm");

    const payload = {
      gpId: parseInt(data.gpId),
      prospectId: parseInt(data.prospectId),
      start,
      end,
      objet: data.objet || "Premier RDV",
      ...(data.commentaires && { commentaires: data.commentaires })
    };

    return payload;
  };

  return (
    <Create transform={transform}>
      <SimpleForm>
        <Typography variant="h5" gutterBottom>
          Planifier une visite
        </Typography>
        
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
            
            return (
              <>
                <AvailabilityChecker 
                  gpId={formData.gpId}
                  selectedDate={formattedDate}
                  onTimeSelect={handleTimeSelect}
                  selectedSlot={selectedSlot}
                />

                {/* Display selected time slot */}
                {selectedSlot && (
                  <Box sx={{ 
                    mt: 2, 
                    mb: 2, 
                    p: 2, 
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    borderRadius: 1,
                    border: '1px solid rgba(25, 118, 210, 0.3)'
                  }}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      ✅ Créneau sélectionné
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

                {/* Hidden input to make react-admin validation happy */}
                <input 
                  type="hidden" 
                  name="heureVisite" 
                  value={selectedSlot ? `${dayjs(selectedSlot.start).format("HH:mm")}-${dayjs(selectedSlot.end).format("HH:mm")}` : ''}
                />
              </>
            );
          }}
        </FormDataConsumer>

        <TextInput 
          source="objet" 
          label="Objet" 
          defaultValue="Premier RDV"
          validate={required()}
        />

        {/* <SelectInput 
          source="status" 
          choices={[
            { id: "PLANIFIEE", name: "Planifiée" },
            { id: "CONFIRMEE", name: "Confirmée" }
          ]}
          defaultValue="PLANIFIEE"
        /> */}

        <TextInput 
          source="commentaires" 
          label="Commentaires" 
          multiline 
          rows={3}
        />
      </SimpleForm>
    </Create>
  );
};