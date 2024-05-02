import { Card, Grid, styled, useTheme, Typography, Box } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios.js';
import StatCards from './views/StatCard';
import ViewCharts from './views/ViewCharts';
import DownloadCharts from './views/DowndloadCharts';
import RevenueCharts from './views/RevenueCharts';
import TopView from './views/TopView';
import TopDownloaded from './views/TopDowndload';
import TopRevenue from './views/TopRevenue';
const DocumentCharts = () => {
  const [total, setTotal] = useState(0);
  const [totalEnabled, setTotalEnabled] = useState(0);
  const [totalAllViews, setTotalAllViews] = useState(0);
  const [totalAllDownloaded, setTotalAllDownloaded] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const getTotal = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getAllCount`
    );
    console.log(response);
    setTotal(response.data);
  };
  const getTotalEnabled = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getAllCountEnabled`
    );
    console.log(response);
    setTotalEnabled(response.data);
  };
  const getAllViews = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getAllViews`
    );
    console.log(response);
    setTotalAllViews(response.data);
  };
  const getAllDownloaded = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/transaction/getAllDownloadeds`
    );
    console.log(response);
    setTotalAllDownloaded(response.data);
  };
  const getAllRevenue = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/transaction/getAllRevenue`
    );
    console.log(response);
    setTotalRevenue(response.data);
  };
  useEffect(() => {
    getTotal();
  }, []);
  useEffect(() => {
    getTotalEnabled();
  }, []);
  useEffect(() => {
    getAllViews();
  }, []);
  useEffect(() => {
    getAllDownloaded();
  }, []);
  useEffect(() => {
    getAllRevenue();
  }, []);
  return (
    <Fragment>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingY: 2,
        }}
      >
        <Typography sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
          Thống kê tài liệu
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <StatCards
            total={total}
            totalEnabled={totalEnabled}
            totalAllViews={totalAllViews}
            totalAllDownloaded={totalAllDownloaded}
            totalRevenue={totalRevenue}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <ViewCharts />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TopView />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <DownloadCharts />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TopDownloaded />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <RevenueCharts />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TopRevenue />
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default DocumentCharts;
