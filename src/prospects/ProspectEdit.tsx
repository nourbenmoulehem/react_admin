import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  required,
  SaveButton,
  Toolbar,
  DeleteButton,
  TopToolbar,
  ListButton,
  ShowButton,
  RefreshButton
} from "react-admin";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReferenceInput, AutocompleteInput } from 'react-admin';
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useRef } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const EditActions = () => (
  <TopToolbar>
    <ListButton />
    <RefreshButton />
  </TopToolbar>
);

export const ProspectEdit = () => {
  const statusChoices = [
    { id: "PAS_ENCORE_CONTACTE", name: "Pas encore contacté" },
    { id: "INJOIGNABLE", name: "Injoignable" },
    { id: "INTERESSE", name: "Intéressé" },
    { id: "NON_INTERESSE", name: "Non intéressé" }
  ];

  const genreChoices = [
    { id: "HOMME", name: "Homme" },
    { id: "FEMME", name: "Femme" }
  ];

  const besoinChoices = [
    { id: "EQUIPEMENT", name: "Équipement" },
      { id: "STOCK", name: "Stock" },
      { id: "VEHICULE", name: "Véhicule" },
      { id: "FOND_DE_ROULEMENTS", name: "Fonds de roulement" },
      { id: "AMENAGEMENT", name: "Aménagement" },
      { id: "AUTRES", name: "Autres" }
  ];

  const gouvernoratChoices = [
    { id: "BEN_AROUS", name: "Ben Arous" },
    { id: "TUNIS", name: "Tunis" },
    { id: "ARIANA", name: "Ariana" },
    { id: "MANOUBA", name: "Manouba" },
    { id: "BIZERTE", name: "Bizerte" },
    { id: "NABEUL", name: "Nabeul" },
    { id: "ZAGHOUAN", name: "Zaghouan" },
    { id: "BEJA", name: "Béja" },
    { id: "JENDOUBA", name: "Jendouba" },
    { id: "KEF", name: "Kef" },
    { id: "SILIANA", name: "Siliana" },
    { id: "KAIROUAN", name: "Kairouan" },
    { id: "KASSERINE", name: "Kasserine" },
    { id: "SIDI_BOUZID", name: "Sidi Bouzid" },
    { id: "SOUSSE", name: "Sousse" },
    { id: "MONASTIR", name: "Monastir" },
    { id: "MAHDIA", name: "Mahdia" },
    { id: "SFAX", name: "Sfax" },
    { id: "GABES", name: "Gabès" },
    { id: "MEDENINE", name: "Médenine" },
    { id: "TATAOUINE", name: "Tataouine" },
    { id: "GAFSA", name: "Gafsa" },
    { id: "TOZEUR", name: "Tozeur" },
    { id: "KEBILI", name: "Kébili" }
  ];

  const SecteurField = () => (
    <ReferenceInput source="secteurId" reference="secteurs" label="Secteur">
        <AutocompleteInput optionText="nom" />
    </ReferenceInput>
  );

  const ActiviteField = () => {
  const secteurId  = useWatch({ name: "secteurId" });
  const form       = useFormContext();
  const prevSectId = useRef<number | undefined>();   // remember old value

  /* Reset activité ONLY when the user actually changes the secteur */
  // useEffect(() => {
  //   if (prevSectId.current !== undefined && prevSectId.current !== secteurId) {
  //     form.setValue("activiteId", undefined);
  //   }
  //   prevSectId.current = secteurId;
  // }, [secteurId, form]);

  return (
    <ReferenceInput
      source="activiteId"
      reference="activites"
      label="Activité"
      filter={{ secteur: secteurId }}
      disabled={!secteurId}
      allowEmpty                     /* keeps current value while list loads */
    >
      <AutocompleteInput optionText="nom" />
    </ReferenceInput>
  );
};

  const transform = (data) => {
  console.log('Form data before save:', data);
  console.log('Transform - Status field:', data.status);

  const transformedData = {
    ...data,
    status: data.status || 'PAS_ENCORE_CONTACTE'
  };
  
  console.log('Transform - Final data:', transformedData);
  return transformedData;
};

  return (
    <Edit transform={transform} actions={<EditActions />} mutationMode="optimistic">
      <SimpleForm toolbar={<CustomToolbar />}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid  size={{ xs: 15, sm: 6}}>
              <StyledCard>
                <CardContent>
                  <SectionTitle variant="h6">
                    Informations personnelles
                  </SectionTitle>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="nom" 
                        label="Nom" 
                        validate={required()}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="prenom" 
                        label="Prénom" 
                        validate={required()}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="tel" 
                        label="Téléphone" 
                        validate={required()}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="cin" 
                        label="CIN" 
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                      <SelectInput 
                        source="genre" 
                        label="Genre" 
                        choices={genreChoices}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Address Information */}
            <Grid size={{ xs: 15, sm: 6}}>
              <StyledCard>
                <CardContent>
                  <SectionTitle variant="h6">
                    Adresse
                  </SectionTitle>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12}}>
                      <TextInput 
                        source="adresse" 
                        label="Adresse complète" 
                        multiline
                        rows={2}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="rue" 
                        label="Rue" 
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="ville" 
                        label="Ville" 
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <SelectInput 
                        source="gouvernorat" 
                        label="Gouvernorat" 
                        choices={gouvernoratChoices}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="codePostal" 
                        label="Code postal" 
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Business Information */}
            <Grid size={{ xs: 15, sm: 6}}>
              <StyledCard>
                <CardContent>
                  <SectionTitle variant="h6">
                    Informations commerciales
                  </SectionTitle>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12}}>
                      <SelectInput 
                        source="status" 
                        label="Statut"
                        // optionValue="id"          
                        // optionText="name"
                        choices={statusChoices}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <SelectInput 
                        source="besoin" 
                        label="Besoin" 
                        choices={besoinChoices}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="besoinAutre" 
                        label="Autre besoin" 
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      

                      <TextInput 
                        source="activite" 
                        label="Activité" 
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <TextInput 
                        source="secteur" 
                        label="Secteur" 
                        fullWidth
                      />
                    </Grid>

                    <SectionTitle variant="subtitle2">
                      Changez le secteur et l'activité ?
                    </SectionTitle>

                    <Grid size={{ xs: 12 }} >
                      <SecteurField />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                      <ActiviteField />
                    </Grid>

                    


                    
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Additional Information */}
            <Grid size={{ xs: 15, sm: 6}}>
              <StyledCard>
                <CardContent>
                  <SectionTitle variant="h6">
                    Informations supplémentaires
                  </SectionTitle>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <NumberInput 
                        source="latitude" 
                        label="Latitude" 
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}} >
                      <NumberInput 
                        source="longitude" 
                        label="Longitude" 
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                      <NumberInput 
                        source="montant" 
                        label="Montant du projet (TND)" 
                        fullWidth
                      />

                      <Grid size={{ xs: 12}}>
                      <TextInput 
                        source="commentaire" 
                        label="Commentaire" 
                        multiline
                        rows={3}
                        fullWidth
                      />
                    </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

