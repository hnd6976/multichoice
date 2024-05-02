import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Autocomplete,
  TextField,
  FormControl,
  Tooltip,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import da from 'date-fns/esm/locale/da/index.js';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios.js';
import swal from 'sweetalert';
import moment from 'moment';
// import AutocompleteCombo from "app/views/material-kit/auto-complete/AutocompleteCombo";
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0 } },
  },
}));

const Filter = styled('div')({
  display: 'flex',
  backgroundColor: 'white',
  padding: 30,
  borderRadius: 10,
});
const AutoComplete = styled(Autocomplete)(() => ({
  width: 200,
  marginRight: 40,
}));
const ListExam = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(10);
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState(0);
  const [key, setKey] = useState('');
  const [listExam, setListExam] = useState([]);
  const [listGrade, setListGrade] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    grade: 0,
    subject: 0,
    key: '',
  });
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getListGrade = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/grade/getAll`);
    setListGrade(res.data);
  };
  const getListSubject = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/subject/getByGradeId/${id}`);
    setListSubject(res.data);
  };
  const getListExam = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/exam/getAll/${grade}/${subject}/${page}/${rowsPerPage}?key=${key}`
    );
    setListExam(res.data.content);
    setTotal(res.data.totalElement);
  };
  useEffect(() => {
    getListExam();
    console.log(process.env.REACT_APP_API_URL);
  }, []);
  useEffect(() => {
    getListExam();
  }, [page, rowsPerPage, grade, subject, key]);
  useEffect(() => {
    if (grade != 0) {
      getListSubject(grade);
    } else {
      setListSubject([]);
    }
  }, [grade]);
  useEffect(() => {
    (async () => {
      getListGrade();
    })();
  }, []);

  const onGradeChange = (value) => {
    setGrade(value);
  };
  const onSubjectChange = (value) => {
    setSubject(value);
  };
  const onKeyChange = (value) => {
    setKey(value);
  };
  const setState = async (id) => {
    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}/admin/exam/setState/${id}`)
        .then((re) => {
          swal(re.data.message, {
            icon: 'success',
          });
          getListExam();
        });
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };
  const deleteExam = async (id) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/exam/delete/${id}`);
      swal('Đề trắc nghiệm đã được xóa', {
        icon: 'success',
      });
      //getListQuestion();
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };
  const handleDelete = useCallback((id) => {
    swal({
      title: 'Xác nhận xóa',
      text: 'Bạn có muốn xóa đề trắc nghiệm này?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteExam(id);
      } else {
        swal('Đã hủy thao tác xóa');
      }
    });
  }, []);
  return (
    <Container>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingY: 2,
        }}
      >
        <Typography sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
          Quản lý đề trắc nghiệm
        </Typography>
      </Box>
      <FormControl></FormControl>
      <Box width="100%">
        <Filter sx={{ display: 'flex' }}>
          <AutoComplete
            options={listGrade}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              console.log(newValue);
              onGradeChange(newValue != null ? newValue.id : 0);
            }}
            renderInput={(params) => <TextField {...params} label={'Lớp'} variant="outlined" />}
          />

          <AutoComplete
            options={listSubject}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              onSubjectChange(newValue != null ? newValue.id : 0);
            }}
            renderInput={(params) => <TextField {...params} label={'Môn'} variant="outlined" />}
          />

          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              onKeyChange(e.target.value);
            }}
            label="Nhập từ khóa"
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Tooltip title="Thêm mới">
            <IconButton sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <NavLink to="/exam/addExam" state={{ gradeId: 9, subjectId: 1, cateId: 1 }}>
                <Icon color="primary">add_circle_outline</Icon>
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Trộn đề">
            <IconButton sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <NavLink to="/exam/addMultipleExam" state={{ gradeId: 9, subjectId: 1, cateId: 1 }}>
                <Icon color="primary">list</Icon>
              </NavLink>
            </IconButton>
          </Tooltip>
        </Filter>

        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Thời gian</TableCell>
              <TableCell align="center">Số câu</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listExam?.map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="center">{subscriber.id}</TableCell>
                <TableCell align="center">{subscriber.title}</TableCell>
                <TableCell align="center">{subscriber.time} phút</TableCell>
                <TableCell align="center">{subscriber.questions.length}</TableCell>
                <TableCell align="center" sx={{ width: '30px', height: '40px' }}>
                  {moment(subscriber.created_at).format('L')}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Cập nhật trạng thái">
                    <IconButton onClick={() => setState(subscriber.id)}>
                      {subscriber.enabled ? (
                        <Icon sx={{ color: 'green' }}>check_circle</Icon>
                      ) : (
                        <Icon sx={{ color: 'red' }}>lock_outline</Icon>
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Chỉnh sửa">
                    <NavLink to="/exam/editExam" state={{ exam: subscriber }}>
                      <Icon color="primary">mode_edit</Icon>
                    </NavLink>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Xem bài làm">
                    <NavLink to="/exam/examCompleted" state={{ examId: subscriber.id }}>
                      <Icon color="primary">menu</Icon>
                    </NavLink>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Xóa">
                    <IconButton
                      onClick={() => {
                        handleDelete(subscriber.id);
                      }}
                    >
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={total}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
      </Box>
    </Container>
  );
};

export default ListExam;
