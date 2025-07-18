
import { useEffect, useState } from 'react';
import { useDataProvider, useNotify } from 'react-admin';
import { Box, Typography, Alert, Chip } from '@mui/material';
import dayjs from 'dayjs';

interface AvailabilityCheckerProps {
  gpId: string | number | undefined;
  selectedDate: string | null;
  onTimeSelect: (slot: any) => void;
  selectedSlot: any;
  currentVisitSlot?: any;
  isEditMode?: boolean;
}

export const AvailabilityChecker = ({
  gpId,
  selectedDate,
  onTimeSelect,
  selectedSlot,
  currentVisitSlot,
  isEditMode = false,
}: AvailabilityCheckerProps) => {
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
      notify('Erreur lors de la vérification de disponibilité', { type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAvailability();
  }, [gpId, selectedDate]);

  if (!gpId || !selectedDate) {
    return (
      <Alert severity="info" sx={{ borderRadius: (theme) => theme.shape.borderRadius }}>
        Sélectionnez un GP et une date pour voir les créneaux disponibles
      </Alert>
    );
  }

  if (loading) {
    return (
      <Typography variant="body1" color="text.secondary">
        Vérification des disponibilités...
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        📅 {isEditMode ? 'Modifier le créneau horaire' : 'Sélectionnez un créneau horaire'}
      </Typography>

      {isEditMode && currentVisitSlot && (
        <Box
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: (theme) => theme.palette.grey[100],
            borderRadius: (theme) => theme.shape.borderRadius,
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography variant="subtitle2" color="secondary" gutterBottom>
            📍 Créneau actuel de la visite
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {dayjs(currentVisitSlot.start).format('HH:mm')} -{' '}
            {dayjs(currentVisitSlot.end).format('HH:mm')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {dayjs(currentVisitSlot.start).format('DD/MM/YYYY')}
          </Typography>
        </Box>
      )}

      {availability.length === 0 ? (
        <Alert severity="warning" sx={{ borderRadius: (theme) => theme.shape.borderRadius }}>
          Aucun créneau disponible pour cette date
        </Alert>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Cliquez sur un créneau pour le sélectionner :
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {availability.map((slot: any, index: number) => {
              const startTime = dayjs(slot.start).format('HH:mm');
              const endTime = dayjs(slot.end).format('HH:mm');
              const timeSlot = `${startTime} - ${endTime}`;
              const isSelected =
                selectedSlot &&
                dayjs(selectedSlot.start).isSame(dayjs(slot.start)) &&
                dayjs(selectedSlot.end).isSame(dayjs(slot.end));
              const isCurrentSlot =
                isEditMode &&
                currentVisitSlot &&
                dayjs(currentVisitSlot.start).isSame(dayjs(slot.start)) &&
                dayjs(currentVisitSlot.end).isSame(dayjs(slot.end));

              return (
                <Chip
                  key={index}
                  label={timeSlot}
                  onClick={() => onTimeSelect(slot)}
                  clickable
                  color={isSelected ? 'primary' : isCurrentSlot ? 'secondary' : 'default'}
                  variant={isSelected || isCurrentSlot ? 'filled' : 'outlined'}
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: isSelected || isCurrentSlot ? 'bold' : 'normal',
                    borderRadius: (theme) => theme.shape.borderRadius,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: isSelected
                        ? undefined
                        : isCurrentSlot
                        ? (theme) => theme.palette.secondary.light
                        : (theme) => theme.palette.primary.light,
                    },
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
