import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

const [data, setData] = useState([]);

  useEffect(() => {

 
    axios.get(`${process.env.REACT_APP_API_URL}admin/getDashboardData`)
      .then( (response)=> {
        // handle success
        console.log(response.data);
        setData(response.data)
        console.log("heyheyhey")
        console.log(response.data)
        console.log(data)
      })
      .catch( (error)=> {
        // handle error
        console.log(error);
      })
    },[data])

  return (
    <>
      <Helmet>
        <title> Dashboard | HSTORY </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary count={data.totalAcceptedDoctors} title="Total Doctors" total={714000} icon={'mdi:doctor'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary count={data.totalPendingDoctors} title="Pending Requests" total={1352831} color="info" icon={'material-symbols:notification-add'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary count={data.totalUsers} title="Total Patients" total={1723315} color="warning" icon={'material-symbols:inpatient'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary count={data.totalBlockedDoctors} title="Blocked Doctors" total={234} color="error" icon={'fluent:presence-blocked-24-regular'} />
          </Grid>

        
        </Grid>
      </Container>
    </>
  );
}
