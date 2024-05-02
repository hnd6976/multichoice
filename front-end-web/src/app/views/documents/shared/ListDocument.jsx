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
  Image,
  Typography,
  Tooltip,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import da from 'date-fns/esm/locale/da/index.js';
import { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios.js';
import moment from 'moment';
import swal from 'sweetalert';
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
const ListDocument = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(10);
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState(0);
  const [key, setKey] = useState('');
  const [listDocument, setListDocument] = useState([]);
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
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/grade/getAll`);
      setListGrade(res.data);
    } catch (err) {}
  };
  const getListSubject = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/subject/getByGradeId/${id}`);
      //const da = await res.json();
      setListSubject(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const getListDocument = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/document/getAll/${grade}/${subject}/${page}/${rowsPerPage}?key=${key}`
      );
      // const da = await res.json();
      setListDocument(res.data.content);
      setTotal(res.data.totalElement);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getListDocument();
    console.log(process.env.REACT_APP_API_URL);
  }, []);
  useEffect(() => {
    getListDocument();
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
        .post(`${process.env.REACT_APP_API_URL}/admin/document/setState/${id}`)
        .then((re) => {
          swal(re.data.message, {
            icon: 'success',
          });
          getListDocument();
        });
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };
  const deleteDocument = async (id) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/document/delete/${id}`);
      swal('Tài liệu đã được xóa', {
        icon: 'success',
      });
      getListDocument();
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };
  const handleDelete = useCallback((id) => {
    swal({
      title: 'Xác nhận xóa',
      text: 'Bạn có muốn xóa tài liệu này?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDocument(id);
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
          Quản lý tài liệu
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
          <IconButton type="submit" aria-label="search">
            <Icon>search</Icon>
          </IconButton>
          <Tooltip title="Thêm mới">
            <IconButton sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <NavLink to="/document/add" state={{ gradeId: 9, subjectId: 1, cateId: 1 }}>
                <Icon color="primary">add_circle_outline</Icon>
              </NavLink>
            </IconButton>
          </Tooltip>
        </Filter>

        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Phí tải</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listDocument?.map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box
                    sx={{
                      width: 100,
                      marginBottom: '10px',
                    }}
                  >
                    <Document
                      file={{
                        url: `${process.env.REACT_APP_UPLOAD_IMAGES_URL}${subscriber?.url}`,
                      }}
                    >
                      <Page
                        width={100}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        pageNumber={1}
                      />
                    </Document>
                  </Box>
                </TableCell>
                <TableCell align="center">{subscriber.id}</TableCell>
                <TableCell align="center">{subscriber.name}</TableCell>
                <TableCell align="center">
                  {subscriber.price == 0 ? (
                    <Typography sx={{ fontWeight: 'bold', color: 'green' }}>
                      {'Miễn phí'}
                    </Typography>
                  ) : (
                    <Typography sx={{ fontWeight: 'bold', color: '#FF6600' }}>
                      {subscriber.price + ' '}VNĐ
                    </Typography>
                  )}
                </TableCell>
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
                    <NavLink to="/document/edit" state={{ document: subscriber }}>
                      <Icon color="primary">mode_edit</Icon>
                    </NavLink>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Xem lượt tải">
                    <NavLink to="/document/listTransaction" state={{ documentId: subscriber.id }}>
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

export default ListDocument;
