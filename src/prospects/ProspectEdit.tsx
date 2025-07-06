// // src/prospects/ProspectEdit.tsx
// import React, { useState } from 'react';
// import {
//   Edit,
//   SimpleForm,
//   TextInput,
//   SelectInput,
//   DateTimeInput,
//   required,
//   useRecordContext,
//   SaveButton,
//   Toolbar,
//   useNotify,
//   useRedirect,
//   useUpdate,
//   ReferenceInput,
//   AutocompleteInput,
//   BooleanInput
// } from 'react-admin';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Chip,
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton
// } from '@mui/material';
// import {
//   Phone,
//   Email,
//   LocationOn,
//   Person,
//   Schedule,
//   CheckCircle,
//   Cancel,
//   Assignment,
//   CalendarToday,
//   AccessTime,
//   Notes
// } from '@mui/icons-material';
// import { Prospect, ProspectStatus, GP } from '../types/prospect';

// // Status configuration
// const statusConfig: Record<ProspectStatus, {
//   label: string;
//   color: string;
//   icon: React.ReactElement;
//   description: string;
// }> = {
//   'PAS_ENCORE_CONTACTE': {
//     label: 'Pas encore contacté',
//     color: '#f57c00',
//     icon: <Schedule />,
//     description: 'Ce prospect n\'a pas encore été contacté'
//   },
//   'INJOIGNABLE': {
//     label: 'Injoignable',
//     color: '#d32f2f',
//     icon: <Cancel />,
//     description: 'Impossible de joindre ce prospect'
//   },
//   'INTERESSE': {
//     label: 'Intéressé',
//     color: '#388e3c',
//     icon: <CheckCircle />,
//     description: 'Prospect intéressé - prêt pour assignation GP'
//   },
//   'NON_INTERESSE': {
//     label: 'Non intéressé',
//     color: '#757575',
//     icon: <Cancel />,
//     description: 'Prospect non intéressé par l\'offre'
//   }
// };

// // Mock GP data - replace with actual data fetching
// const mockGPs: GP[] = [
//   {
//     id: '1',
//     nom: 'Ben Ahmed',
//     prenom: 'Mohamed',
//     telephone: '+216 20 123 456',
//     email: 'mohamed.benahmed@prospecti.tn',
//     gouvernorat: 'Tunis',
//     availability: [
//       {
//         date: '2025-06-25',
//         timeSlots: ['09:00', '10:30', '14:00', '16:00']
//       },
//       {
//         date: '2025-06-26',
//         timeSlots: ['08:30', '11:00', '15:30']
//       }
//     ]
//   },
//   {
//     id: '2',
//     nom: 'Trabelsi',
//     prenom: 'Fatma',
//     telephone: '+216 22 987 654',
//     email: 'fatma.trabelsi@prospecti.tn',
//     gouvernorat: 'Tunis',
//     availability: [
//       {
//         date: '2025-06-25',
//         timeSlots: ['10:00', '13:00', '17:00']
//       },
//       {
//         date: '2025-06-27',
//         timeSlots: ['09:30', '14:30', '16:30']
//       }
//     ]
//   }
// ];

// const ProspectHeader: React.FC = () => {
//   const record = useRecordContext<Prospect>();
  
//   if (!record) return null;
  
//   const status = statusConfig[record.status];
  
//   return (
//     <Card sx={{ mb: 3 }}>
//       <CardContent>
//         <Grid container spacing={3} alignItems="center">
//           <Grid item>
//             <Avatar 
//               sx={{ 
//                 width: 64, 
//                 height: 64, 
//                 bgcolor: status.color,
//                 fontSize: '1.5rem'
//               }}
//             >
//               {record.nom.charAt(0)}{record.prenom.charAt(0)}
//             </Avatar>
//           </Grid>
//           <Grid item xs>
//             <Typography variant="h4" component="h1" gutterBottom>
//               {record.nom} {record.prenom}
//             </Typography>
//             <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
//               <Chip
//                 icon={status.icon}
//                 label={status.label}
//                 sx={{
//                   backgroundColor: status.color,
//                   color: 'white',
//                   fontWeight: 'bold',
//                   '& .MuiChip-icon': { color: 'white' }
//                 }}
//               />
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Phone fontSize="small" color="action" />
//                 <Typography variant="body1">{record.telephone}</Typography>
//               </Box>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <LocationOn fontSize="small" color="action" />
//                 <Typography variant="body1">{record.ville}, {record.gouvernorat}</Typography>
//               </Box>
//             </Box>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               {status.description}
//             </Typography>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// const GPAssignmentDialog: React.FC<{
//   open: boolean;
//   onClose: () => void;
//   onAssign: (gpId: string, visitDate: string, visitTime: string) => void;
//   prospectId: string;
// }> = ({ open, onClose, onAssign, prospectId }) => {
//   const [selectedGP, setSelectedGP] = useState<GP | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [selectedTime, setSelectedTime] = useState<string>('');

//   const handleAssign = () => {
//     if (selectedGP && selectedDate && selectedTime) {
//       onAssign(selectedGP.id, selectedDate, selectedTime);
//       onClose();
//       setSelectedGP(null);
//       setSelectedDate('');
//       setSelectedTime('');
//     }
//   };

//   const availableTimeSlots = selectedGP?.availability
//     .find(avail => avail.date === selectedDate)?.timeSlots || [];

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>
//         <Typography variant="h6" component="div">
//           Assigner un GP et planifier une visite
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="subtitle1" gutterBottom>
//             Sélectionner un GP disponible
//           </Typography>
//           <Grid container spacing={2}>
//             {mockGPs.map((gp) => (
//               <Grid item xs={12} sm={6} key={gp.id}>
//                 <Card
//                   sx={{
//                     cursor: 'pointer',
//                     border: selectedGP?.id === gp.id ? 2 : 1,
//                     borderColor: selectedGP?.id === gp.id ? 'primary.main' : 'grey.300',
//                     '&:hover': { borderColor: 'primary.main' }
//                   }}
//                   onClick={() => setSelectedGP(gp)}
//                 >
//                   <CardContent>
//                     <Box display="flex" alignItems="center" gap={2}>
//                       <Avatar>
//                         <Person />
//                       </Avatar>
//                       <Box>
//                         <Typography variant="h6">
//                           {gp.nom} {gp.prenom}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {gp.telephone}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {gp.email}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {selectedGP && (
//             <>
//               <Divider sx={{ my: 3 }} />
//               <Typography variant="subtitle1" gutterBottom>
//                 Disponibilités de {selectedGP.nom} {selectedGP.prenom}
//               </Typography>
//               <Grid container spacing={2}>
//                 {selectedGP.availability.map((avail) => (
//                   <Grid item xs={12} sm={6} md={4} key={avail.date}>
//                     <Card
//                       sx={{
//                         cursor: 'pointer',
//                         border: selectedDate === avail.date ? 2 : 1,
//                         borderColor: selectedDate === avail.date ? 'primary.main' : 'grey.300',
//                         '&:hover': { borderColor: 'primary.main' }
//                       }}
//                       onClick={() => {
//                         setSelectedDate(avail.date);
//                         setSelectedTime('');
//                       }}
//                     >
//                       <CardContent sx={{ textAlign: 'center' }}>
//                         <CalendarToday color="primary" sx={{ mb: 1 }} />
//                         <Typography variant="h6">
//                           {new Date(avail.date).toLocaleDateString('fr-FR', {
//                             weekday: 'short',
//                             day: 'numeric',
//                             month: 'short'
//                           })}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {avail.timeSlots.length} créneaux
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>

//               {selectedDate && availableTimeSlots.length > 0 && (
//                 <>
//                   <Divider sx={{ my: 3 }} />
//                   <Typography variant="subtitle1" gutterBottom>
//                     Créneaux horaires disponibles
//                   </Typography>
//                   <Box display="flex" gap={2} flexWrap="wrap">
//                     {availableTimeSlots.map((time) => (
//                       <Button
//                         key={time}
//                         variant={selectedTime === time ? 'contained' : 'outlined'}
//                         onClick={() => setSelectedTime(time)}
//                         startIcon={<AccessTime />}
//                       >
//                         {time}
//                       </Button>
//                     ))}
//                   </Box>
//                 </>
//               )}
//             </>
//           )}
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Annuler</Button>
//         <Button
//           onClick={handleAssign}
//           variant="contained"
//           disabled={!selectedGP || !selectedDate || !selectedTime}
//         >
//           Assigner et Planifier
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const ProspectEditToolbar: React.FC<{ showAssignGP?: boolean }> = ({ showAssignGP = false }) => {
//   const [assignDialogOpen, setAssignDialogOpen] = useState(false);
//   const record = useRecordContext<Prospect>();
//   const notify = useNotify();
//   const [update] = useUpdate();
  
//   const handleGPAssignment = async (gpId: string, visitDate: string, visitTime: string) => {
//     try {
//       await update('prospects', {
//         id: record?.id,
//         data: {
//           assignedGpId: gpId,
//           visitDate: `${visitDate}T${visitTime}:00`,
//           status: 'INTERESSE'
//         },
//         previousData: record
//       });
//       notify('GP assigné et visite planifiée avec succès', { type: 'success' });
//     } catch (error) {
//       notify('Erreur lors de l\'assignation du GP', { type: 'error' });
//     }
//   };

//   return (
//     <Toolbar>
//       <SaveButton />
//       {showAssignGP && record && (
//         <>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<Assignment />}
//             onClick={() => setAssignDialogOpen(true)}
//             sx={{ ml: 2 }}
//           >
//             Assigner GP & Planifier Visite
//           </Button>
//           <GPAssignmentDialog
//             open={assignDialogOpen}
//             onClose={() => setAssignDialogOpen(false)}
//             onAssign={handleGPAssignment}
//             prospectId={record.id}
//           />
//         </>
//       )}
//     </Toolbar>
//   );
// };

// export const ProspectEdit: React.FC = () => {
//   const record = useRecordContext<Prospect>();
//   const showAssignGP = record?.status === 'INTERESSE' && !record?.assignedGpId;

//   return (
//     <Edit>
//       <ProspectHeader />
//       <SimpleForm toolbar={<ProspectEditToolbar showAssignGP={showAssignGP} />}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               Informations personnelles
//             </Typography>
//             <TextInput source="nom" label="Nom" validate={required()} fullWidth />
//             <TextInput source="prenom" label="Prénom" validate={required()} fullWidth />
//             <TextInput source="telephone" label="Téléphone" validate={required()} fullWidth />
//             <TextInput source="email" label="Email" type="email" fullWidth />
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               Localisation
//             </Typography>
//             <TextInput source="adresse" label="Adresse" fullWidth multiline />
//             <TextInput source="ville" label="Ville" validate={required()} fullWidth />
//             <TextInput source="gouvernorat" label="Gouvernorat" validate={required()} fullWidth />
//           </Grid>
          
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               Statut et suivi
//             </Typography>
//             <SelectInput
//               source="status"
//               label="Statut"
//               choices={[
//                 { id: "PAS_ENCORE_CONTACTE", name: "Pas encore contacté" },
//                 { id: "INJOIGNABLE", name: "Injoignable" },
//                 { id: "INTERESSE", name: "Intéressé" },
//                 { id: "NON_INTERESSE", name: "Non intéressé" }
//               ]}
//               validate={required()}
//               fullWidth
//             />
//             <DateTimeInput source="lastContactDate" label="Dernier contact" fullWidth />
//             <TextInput 
//               source="notes" 
//               label="Notes" 
//               fullWidth 
//               multiline 
//               rows={4}
//               helperText="Notes privées sur le prospect"
//             />
//           </Grid>

//           {record?.assignedGpId && (
//             <Grid item xs={12}>
//               <Alert severity="info" sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2">GP Assigné</Typography>
//                 <Typography variant="body2">
//                   Ce prospect a été assigné à un GP.
//                   {record.visitDate && (
//                     <> Visite prévue le {new Date(record.visitDate).toLocaleString('fr-FR')}</>
//                   )}
//                 </Typography>
//               </Alert>
//               <ReferenceInput source="assignedGpId" reference="gps" label="GP Assigné">
//                 <AutocompleteInput 
//                   optionText={(choice: GP) => `${choice.nom} ${choice.prenom}`}
//                   disabled
//                 />
//               </ReferenceInput>
//               {record.visitDate && (
//                 <DateTimeInput 
//                   source="visitDate" 
//                   label="Date de visite" 
//                   fullWidth 
//                 />
//               )}
//             </Grid>
//           )}
//         </Grid>
//       </SimpleForm>
//     </Edit>
//   );
// };