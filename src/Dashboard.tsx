  import React from 'react';
  import { 
    Card, 
    CardContent, 
    Grid, 
    CardHeader, 
    Typography, 
    Box, 
    LinearProgress,
    Chip,
    Avatar,
    Stack,
    Divider,
    IconButton,
    Tooltip
  } from '@mui/material';
  import { useGetList } from 'react-admin';
  import { 
    PieChart, 
    Pie, 
    Cell, 
    ResponsiveContainer, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip as RechartsTooltip,
    LineChart,
    Line,
    Legend,
    Area,
    AreaChart
  } from 'recharts';
  import {
    TrendingUp,
    TrendingDown,
    People,
    CalendarToday,
    Assignment,
    Phone,
    CheckCircle,
    Cancel,
    Schedule,
    PersonAdd,
    Analytics,
    Refresh
  } from '@mui/icons-material';

  const COLORS = ['#3f51b5', '#4caf50', '#ff9800', '#f44336', '#9c27b0', '#00bcd4'];

  const STATUS_CONFIG = {
    PAS_ENCORE_CONTACTE: { 
      color: '#3f51b5', 
      label: 'Pas encore contacté', 
      icon: <Schedule />,
      bgColor: '#e8eaf6' 
    },
    INTERESSE: { 
      color: '#4caf50', 
      label: 'Intéressé', 
      icon: <CheckCircle />,
      bgColor: '#e8f5e0' 
    },
    INJOIGNABLE: { 
      color: '#ff9800', 
      label: 'Injoignable', 
      icon: <Phone />,
      bgColor: '#fff3e0' 
    },
    NON_INTERESSE: { 
      color: '#f44336', 
      label: 'Non intéressé', 
      icon: <Cancel />,
      bgColor: '#ffebee' 
    },
  };

  const VISIT_STATUS_CONFIG = {
    REPORTEE: { color: '#2196f3', label: 'Reportée' },
    PLANIFIEE: { color: '#ff9800', label: 'Planifiée' },
    REALISEE: { color: '#4caf50', label: 'Réalisée' },
    NO_SHOW: { color: '#9e9e9e', label: 'Terminée' },
    ANNULEE: { color: '#f44336', label: 'Annulée' }
  };

  interface StatCardProps {
    title: string;
    value: number;
    change?: number;
    color?: string;
    icon?: React.ReactNode;
    subtitle?: string;
  }

  const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    change, 
    color = 'primary', 
    icon, 
    subtitle 
  }) => (
    <Card sx={{ 
      height: '100%', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        position: 'absolute',
        top: -20,
        right: -20,
        opacity: 0.1,
        fontSize: 80
      }}>
        {icon}
      </Box>
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={1}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {title}
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {value.toLocaleString()}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {subtitle}
            </Typography>
          )}
          {change !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {change > 0 ? (
                <TrendingUp fontSize="small" sx={{ color: '#4caf50' }} />
              ) : (
                <TrendingDown fontSize="small" sx={{ color: '#f44336' }} />
              )}
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {change > 0 ? '+' : ''}{change}% vs hier
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  const CustomPieChart = ({ data, title }: { data: any[], title: string }) => (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title={title} 
        sx={{ 
          pb: 1,
          '& .MuiCardHeader-title': { 
            fontSize: '1.1rem', 
            fontWeight: 600 
          }
        }}
        action={
          <Tooltip title="Actualiser">
            <IconButton size="small">
              <Refresh />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <RechartsTooltip 
              formatter={(value: any, name: string) => [
                `${value} prospects`,
                name
              ]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry.color, fontWeight: 500 }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend with percentages */}
        <Box sx={{ mt: 2 }}>
          <Stack spacing={1}>
            {data.map((item, index) => {
              const total = data.reduce((sum, d) => sum + d.value, 0);
              const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
              return (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: COLORS[index % COLORS.length],
                      borderRadius: '50%'
                    }}
                  />
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {percentage}%
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );

  const ActivityChart = ({ visits }: { visits: any[] }) => {
    // Process visits data for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const chartData = last7Days.map(date => {
      const dayVisits = visits?.filter(v => v.visitDate === date) || [];
      return {
        date: new Date(date).toLocaleDateString('fr-FR', { 
          weekday: 'short', 
          day: 'numeric' 
        }),
        visites: dayVisits.length,
        realisees: dayVisits.filter(v => v.statut === 'REALISEE').length,
        planifiees: dayVisits.filter(v => v.statut === 'PLANIFIEE').length
      };
    });

    return (
      <Card sx={{ height: '100%' }}>
        <CardHeader 
          title="Activité des 7 derniers jours" 
          sx={{ 
            pb: 1,
            '& .MuiCardHeader-title': { 
              fontSize: '1.1rem', 
              fontWeight: 600 
            }
          }}
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
              />
              <RechartsTooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="visites" 
                stackId="1"
                stroke="#3f51b5" 
                fill="#3f51b5"
                fillOpacity={0.6}
                name="Total visites"
              />
              <Area 
                type="monotone" 
                dataKey="realisees" 
                stackId="2"
                stroke="#4caf50" 
                fill="#4caf50"
                fillOpacity={0.8}
                name="Réalisées"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  const QuickActions = () => (
    <Card>
      <CardHeader title="Actions rapides" />
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              icon={<PersonAdd />} 
              label="Nouveau prospect" 
              onClick={() => {}}
              color="primary"
              variant="outlined"
            />
            <Chip 
              icon={<CalendarToday />} 
              label="Planifier visite" 
              onClick={() => {}}
              color="secondary"
              variant="outlined"
            />
            <Chip 
              icon={<Analytics />} 
              label="Rapport mensuel" 
              onClick={() => {}}
              color="success"
              variant="outlined"
            />
          </Box>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            Prochaines tâches planifiées
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Relance prospects</Typography>
              <Chip label="Demain" size="small" color="warning" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Rapport hebdomadaire</Typography>
              <Chip label="Vendredi" size="small" color="info" />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  export const Dashboard = () => {
    const { data: prospects } = useGetList('prospects');
    const { data: visits } = useGetList('visits');

    // Calculate statistics
    const totalProspects = prospects?.length || 0;
    const interestedProspects = prospects?.filter(p => p.status === 'INTERESSE').length || 0;
    const conversionRate = totalProspects > 0 ? (interestedProspects / totalProspects * 100).toFixed(1) : "0";

    const today = new Date().toISOString().split('T')[0];
    const todayVisits = visits?.filter(v => v.visitDate === today).length || 0;
    const pendingVisits = visits?.filter(v => v.statut === 'PLANIFIEE').length || 0;
    const completedVisits = visits?.filter(v => v.statut === 'REALISEE').length || 0;

    const statusStats = prospects ? [
      { 
        name: 'Pas encore contacté', 
        value: prospects.filter(p => p.status === 'PAS_ENCORE_CONTACTE').length 
      },
      { 
        name: 'Intéressé', 
        value: prospects.filter(p => p.status === 'INTERESSE').length 
      },
      { 
        name: 'Injoignable', 
        value: prospects.filter(p => p.status === 'INJOIGNABLE').length 
      },
      { 
        name: 'Non intéressé', 
        value: prospects.filter(p => p.status === 'NON_INTERESSE').length 
      },
    ].filter(stat => stat.value > 0) : [];

    const visitStatusStats = visits ? [
      { name: 'Planifiées', value: visits.filter(v => v.statut === 'PLANIFIEE').length },
      { name: 'Réalisées', value: visits.filter(v => v.statut === 'REALISEE').length },
      { name: 'Reportées', value: visits.filter(v => v.statut === 'REPORTEE').length },
      { name: 'Annulées', value: visits.filter(v => v.statut === 'ANNULEE').length },
    ].filter(stat => stat.value > 0) : [];

    return (
      <Box sx={{ p: 3, minHeight: '100vh' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Tableau de Bord - Chargée d'Opération
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Vue d'ensemble de vos activités et performances
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {/* Key Statistics */}
          <Grid size = {{xs: 12, sm: 6, md: 3}} >
            <StatCard
              title="Total Prospects"
              value={totalProspects}
              change={12}
              icon={<People />}
              subtitle="Prospects actifs"
            />
          </Grid>
          
          <Grid size = {{xs: 12, sm: 6, md: 3}} >
            <StatCard
              title="Visites Aujourd'hui"
              value={todayVisits}
              change={-5}
              icon={<CalendarToday />}
              subtitle="Planifiées pour aujourd'hui"
            />
          </Grid>
          
          <Grid size = {{xs: 12, sm: 6, md: 3}} >
            <StatCard
              title="Visites Planifiées"
              value={pendingVisits}
              change={8}
              icon={<Schedule />}
              subtitle="À venir"
            />
          </Grid>
          
          <Grid size = {{xs: 12, sm: 6, md: 3}} >
            <StatCard
              title="Taux de Conversion"
              value={parseFloat(conversionRate)}
              icon={<TrendingUp />}
              subtitle="% prospects intéressés"
            />
          </Grid>

          {/* Performance Metrics */}
          <Grid size = {{xs: 12, md: 4}}>
            <Card>
              <CardHeader title="Performance du mois" />
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Prospects contactés</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {totalProspects - (prospects?.filter(p => p.status === 'PAS_ENCORE_CONTACTE').length || 0)}/
                        {totalProspects}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={totalProspects > 0 ? ((totalProspects - (prospects?.filter(p => p.status === 'PAS_ENCORE_CONTACTE').length || 0)) / totalProspects) * 100 : 0}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Visites réalisées</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {completedVisits}/{visits?.length || 0}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={visits?.length ? (completedVisits / visits.length) * 100 : 0}
                      sx={{ height: 8, borderRadius: 4 }}
                      color="success"
                    />
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Objectif mensuel</Typography>
                      <Typography variant="body2" fontWeight="bold">75%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={75}
                      sx={{ height: 8, borderRadius: 4 }}
                      color="warning"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid size = {{xs: 12, md: 4}}>
            <QuickActions />
          </Grid>

          {/* Recent Activity */}
          <Grid size = {{xs: 12, md: 4}}>
            <Card>
              <CardHeader title="Activité récente" />
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.main' }}>
                      <CheckCircle fontSize="small" />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">Visite réalisée</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Il y a 2 heures
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <PersonAdd fontSize="small" />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">Nouveau prospect ajouté</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Il y a 5 heures
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'warning.main' }}>
                      <Schedule fontSize="small" />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">Visite planifiée</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Hier
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid size = {{xs: 12, md: 6}}>
            <CustomPieChart data={statusStats} title="Répartition des Statuts Prospects" />
          </Grid>
          
          <Grid size = {{xs: 12, md: 6}}>
            <CustomPieChart data={visitStatusStats} title="Statuts des Visites" />
          </Grid>
          
          <Grid size={{xs: 12}}>
            <ActivityChart visits={visits ?? []} />
          </Grid>
        </Grid>
      </Box>
    );
  };