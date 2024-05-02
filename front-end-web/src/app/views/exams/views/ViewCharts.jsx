import React, { Fragment, useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Box,
  Typography,
  Card,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Autocomplete,
  TextField,
} from '@mui/material';
import axios from 'axios.js';
export default function ViewCharts() {
  const [filter, setFilter] = useState('day');
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(11);
  const [day, setDay] = useState(1);
  const [listYear, setListYear] = useState([]);
  const [listMonth, setListMonth] = useState([]);
  const [listDay, setListDay] = useState([]);
  const onFilterChange = (value) => {
    setFilter(value);
  };
  const onYearChange = (value) => {
    setYear(value);
  };
  const onMonthChange = (value) => {
    setMonth(value);
  };
  const onDayChange = (value) => {
    setDay(value);
  };
  const getListYear = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getListYear`
    );
    console.log(response.data);
    const list = response.data;
    let listTemp = [];
    list.map((item, index) => {
      let it = { id: index, name: item.toString(), value: item };
      listTemp[index] = it;
    });
    setListYear(listTemp);
  };
  const getListMonth = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getListMonth/${year}`
    );
    console.log(response.data);
    const list = response.data;
    let listTemp = [];
    list.map((item, index) => {
      let it = { id: index, name: item.toString(), value: item };
      listTemp[index] = it;
    });
    setListMonth(listTemp);
  };
  const getListDay = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getListDay/${year}/${month}`
    );
    console.log(response.data);
    const list = response.data;
    let listTemp = [];
    list.map((item, index) => {
      let it = { id: index, name: item.toString(), value: item };
      listTemp[index] = it;
    });
    setListDay(listTemp);
  };
  useEffect(() => {
    getListYear();
  }, []);
  useEffect(() => {
    getListMonth();
  }, [year]);
  const [xAxis, setXAxis] = useState([1]);
  const [series, setSeries] = useState([1]);
  const setDefault = () => {
    setXAxis([1]);
    setSeries([1]);
  };
  const getCompletedYear = async () => {
    setDefault();
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getCompletedYear`
    );
    console.log(response.data);
    const list = response.data;
    let xAxisList = [];
    let seriesList = [];
    list.map((item, index) => {
      xAxisList[index] = item[0];
      seriesList[index] = item[1];
    });
    setXAxis(xAxisList);
    setSeries(seriesList);
    console.log(seriesList);
  };
  const getCompletedMonth = async () => {
    setDefault();
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getCompletedMonth/${year}`
    );
    console.log(response.data);
    const list = response.data;
    let xAxisList = [];
    let seriesList = [];
    list.map((item, index) => {
      xAxisList[index] = item[0];
      seriesList[index] = item[1];
    });
    setXAxis(xAxisList);
    setSeries(seriesList);
    console.log(seriesList);
  };
  const getCompletedDay = async () => {
    setDefault();
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/exam/getCompletedDay/${year}/${month}`
    );
    console.log(response.data);
    const list = response.data;
    let xAxisList = [];
    let seriesList = [];
    list.map((item, index) => {
      xAxisList[index] = item[0];
      seriesList[index] = item[1];
    });
    setXAxis(xAxisList);
    setSeries(seriesList);
    console.log(xAxisList);
  };
  useEffect(() => {
    getCompletedMonth();
  }, []);
  useEffect(() => {
    if (filter == 'year') {
      getCompletedYear();
    }
    if (filter == 'month') {
      getCompletedMonth();
    }
    if (filter == 'day') {
      getCompletedDay();
    }
  }, [filter, year, month]);

  const barChartsParams = {
    xAxis: [
      {
        data: xAxis.length > 0 ? xAxis : ['page A', 'page B', 'page C', 'page D', 'page E'],
        scaleType: 'band',
        tickMaxStep: 1,
        tickMinStep: 1,
      },
    ],
    series: [
      {
        data: series.length > 0 ? series : [2, 5, 3, 4, 1],
        tickMaxStep: 1,
        tickMinStep: 1,
        stack: '1',
        label: 'Số lượng',
      },
    ],
    margin: { top: 10, right: 10 },
    height: 300,
    width: 900,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };
  return (
    <Box sx={{ padding: 3, display: 'flex' }}>
      <Box sx={{}}>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>Lượt làm bài</Typography>
        <Box sx={{ display: 'flex', paddingRight: 2 }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <FormControlLabel value="year" control={<Radio />} label="Năm" />
              <FormControlLabel value="month" control={<Radio />} label="Tháng" />
              <FormControlLabel value="day" control={<Radio />} label="Ngày" />
            </RadioGroup>
          </FormControl>
          {(filter == 'month' || filter == 'day') && (
            <Autocomplete
              sx={{ width: 120 }}
              size="small"
              //value={defaultYear}
              options={listYear}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                console.log(newValue);
                onYearChange(newValue != null ? newValue.value : 2023);
              }}
              renderInput={(params) => <TextField {...params} label={'Năm'} variant="outlined" />}
            />
          )}
          {filter == 'day' && (
            <Autocomplete
              sx={{ width: 140, marginLeft: 10 }}
              size="small"
              //value={defaultMonth}
              options={listMonth}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                console.log(newValue);
                onMonthChange(newValue != null ? newValue.value : 8);
              }}
              renderInput={(params) => <TextField {...params} label={'Tháng'} variant="outlined" />}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', marginY: 3 }}>
          {filter == 'day' && (
            <Box sx={{ display: 'flex', marginRight: 2 }}>
              <Typography>Tháng </Typography>
              <Typography sx={{ fontWeight: 'bold', marginLeft: 2 }}>{month}</Typography>
            </Box>
          )}
          {(filter == 'day' || filter == 'month') && (
            <Box sx={{ display: 'flex', marginRight: 2 }}>
              <Typography>Năm </Typography>
              <Typography sx={{ fontWeight: 'bold', marginLeft: 2 }}>{year}</Typography>
            </Box>
          )}
        </Box>
        {false && xAxis.length > 0 && xAxis.length == series.length && (
          <LineChart
            xAxis={[{ tickMinStep: 1, tickMaxStep: 1, data: xAxis }]}
            series={[{ curve: 'step', data: series }]}
            width={900}
            height={300}
          />
        )}
        {series.length > 0 && <BarChart {...barChartsParams} tooltip={{ trigger: 'item' }} />}
      </Box>
    </Box>
  );
}
