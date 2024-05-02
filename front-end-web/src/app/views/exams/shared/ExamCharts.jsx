import { Card, Grid, styled, useTheme, Typography, Box } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios.js';
import StatCards from '../views/StatCard';
import ViewCharts from '../views/ViewCharts';
import TopView from '../views/TopView';
const ExamCharts = () => {
  const [total, setTotal] = useState(0);
  const [totalEnabled, setTotalEnabled] = useState(0);
  const [totalAllViews, setTotalAllViews] = useState(0);
  const getTotal = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getAllCountExam`
    );
    console.log(response);
    setTotal(response.data);
  };
  const getTotalEnabled = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getAllCountExamEnabled`
    );
    console.log(response);
    setTotalEnabled(response.data);
  };
  const getAllViews = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getAllCountCompleted`
    );
    console.log(response);
    setTotalAllViews(response.data);
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
          Thống kê đề trắc nghiệm
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <StatCards total={total} totalEnabled={totalEnabled} totalAllViews={totalAllViews} />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <ViewCharts />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TopView />
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default ExamCharts;
