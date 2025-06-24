import React from 'react';
import { Card, CardContent, Grid, CardHeader, Typography, Box } from '@mui/material';
import { useGetList } from 'react-admin';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard = () => {
  const { data: prospects } = useGetList('prospects');
  const { data: visits } = useGetList('visits');

  const statusStats = prospects ? [
    { name: 'Pas encore contacté', value: prospects.filter(p => p.status === 'PAS_ENCORE_CONTACTE').length },
    { name: 'Intéressé', value: prospects.filter(p => p.status === 'INTERESSE').length },
    { name: 'Injoignable', value: prospects.filter(p => p.status === 'INJOIGNABLE').length },
    { name: 'Non intéressé', value: prospects.filter(p => p.status === 'NON_INTERESSE').length },
  ] : [];

  const todayVisits = visits ? visits.filter(v => v.date === new Date().toISOString().split('T')[0]).length : 0;
  const pendingVisits = visits ? visits.filter(v => v.status === 'PLANIFIEE').length : 0;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord - Chargée d'Opération
      </Typography>
      
      <Grid container spacing={3}>
        {/* Quick Stats */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Prospects
              </Typography>
              <Typography variant="h4">
                {prospects?.length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Visites Aujourd'hui
              </Typography>
              <Typography variant="h4" color="primary">
                {todayVisits}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Visites Planifiées
              </Typography>
              <Typography variant="h4" color="secondary">
                {pendingVisits}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Prospects Intéressés
              </Typography>
              <Typography variant="h4" color="success.main">
                {prospects?.filter(p => p.status === 'INTERESSE').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Répartition des Statuts" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Activité Récente" />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                • 5 nouveaux prospects ajoutés aujourd'hui
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • 3 visites confirmées pour demain
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • 2 prospects marqués comme intéressés
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};