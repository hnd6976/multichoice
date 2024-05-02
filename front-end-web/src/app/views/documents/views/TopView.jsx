import React, { Fragment, useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  Box,
  Typography,
  Card,
  Radio,
  Paper,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios.js';
export default function TopView() {
  const [filter, setFilter] = useState('all');
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(9);
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
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getListYear`
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
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getListMonth/${year}`
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
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getListDay/${year}/${month}`
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
  useEffect(() => {
    getListDay();
  }, [month]);
  const [defaultYear, setDefaultYear] = useState({ id: 2, name: '2023', value: 2023 });
  const defaultMonth = { id: 0, name: '1', value: 1 };
  const [topViewList, setTopViewList] = useState([]);
  const getTopViewsAll = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getTopViewAll`
    );
    const list = response.data;
    let listTopView = [];
    list.map((item, index) => {
      let it = { name: '', value: 0 };
      it.name = item[0];
      it.value = item[1];
      listTopView[index] = it;
    });
    setTopViewList(listTopView);
  };
  useEffect(() => {
    getTopViewsAll();
  }, []);
  const getTopViewYear = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getTopViewYear/${year}`
    );
    const list = response.data;
    let listTopView = [];
    list.map((item, index) => {
      let it = { name: '', value: 0 };
      it.name = item[0];
      it.value = item[1];
      listTopView[index] = it;
    });
    setTopViewList(listTopView);
  };
  const getTopViewMonth = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getTopViewMonth/${year}/${month}`
    );
    const list = response.data;
    let listTopView = [];
    list.map((item, index) => {
      let it = { name: '', value: 0 };
      it.name = item[0];
      it.value = item[1];
      listTopView[index] = it;
    });
    setTopViewList(listTopView);
  };
  const getTopViewDay = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/dashboard/document/getTopViewDay/${year}/${month}/${day}`
    );
    const list = response.data;
    let listTopView = [];
    list.map((item, index) => {
      let it = { name: '', value: 0 };
      it.name = item[0];
      it.value = item[1];
      listTopView[index] = it;
    });
    setTopViewList(listTopView);
  };
  useEffect(() => {
    if (filter == 'all') {
      getTopViewsAll();
    }
    if (filter == 'year') {
      getTopViewYear();
    }
    if (filter == 'month') {
      getTopViewMonth();
    }
    if (filter == 'day') {
      getTopViewDay();
    }
  }, [filter, year, month, day]);
  return (
    <Box sx={{ padding: 2, display: 'flex' }}>
      <Box sx={{}}>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>Top 5 lượt xem</Typography>
        <Box sx={{ display: 'flex', paddingRight: 2 }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
              <FormControlLabel value="year" control={<Radio />} label="Năm" />
              <FormControlLabel value="month" control={<Radio />} label="Tháng" />
              <FormControlLabel value="day" control={<Radio />} label="Ngày" />
            </RadioGroup>
          </FormControl>
          {(filter == 'year' || filter == 'month' || filter == 'day') && (
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
          {(filter == 'month' || filter == 'day') && (
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
          {filter == 'day' && (
            <Autocomplete
              sx={{ width: 140, marginLeft: 10 }}
              size="small"
              // value={defaultMonth}
              options={listDay}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                console.log(newValue);
                onDayChange(newValue != null ? newValue.value : 8);
              }}
              renderInput={(params) => <TextField {...params} label={'Ngày'} variant="outlined" />}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', marginY: 3 }}>
          {filter == 'day' && (
            <Box sx={{ display: 'flex', marginRight: 2 }}>
              <Typography>Ngày </Typography>
              <Typography sx={{ fontWeight: 'bold', marginLeft: 2 }}>{day}</Typography>
            </Box>
          )}
          {(filter == 'day' || filter == 'month') && (
            <Box sx={{ display: 'flex', marginRight: 2 }}>
              <Typography>Tháng </Typography>
              <Typography sx={{ fontWeight: 'bold', marginLeft: 2 }}>{month}</Typography>
            </Box>
          )}
          {(filter == 'year' || filter == 'day' || filter == 'month') && (
            <Box sx={{ display: 'flex', marginRight: 2 }}>
              <Typography>Năm </Typography>
              <Typography sx={{ fontWeight: 'bold', marginLeft: 2 }}>{year}</Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ width: 450 }}>
          <TableContainer component={Paper}>
            <Table sx={{ width: 450 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Tên</TableCell>
                  <TableCell align="center">Lượt xem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topViewList.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Typography sx={{ fontWeight: 'bold' }}>{row.name}</Typography>
                    </TableCell>
                    <TableCell align="center">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
