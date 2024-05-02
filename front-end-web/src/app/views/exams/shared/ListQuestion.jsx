import { Padding } from '@mui/icons-material';
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
  TextareaAutosize,
  Paper,
  Modal,
  Typography,
  Tooltip,
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios.js';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const AutoComplete = styled(Autocomplete)(() => ({
  width: 200,
  marginRight: 50,
}));
const TextareaAutosizeStyled = styled(TextareaAutosize)(() => ({
  width: 440,
  marginRight: 40,
}));
const Filter = styled('div')({
  display: 'flex',
  borderRadius: 10,
  marginBottom: 30,
});
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0 } },
  },
}));
export const DetailQuestion = ({ question, isShow, closeDetailQuestion }) => {
  return (
    <Modal open={isShow} onClose={closeDetailQuestion}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 750,
          bgcolor: '#bbbbbb',
          overflow: 'auto',
          padding: '20px',
        }}
      >
        <Paper>
          <Typography sx={{ padding: '5px', marginBottom: '20px' }}>
            <div
              style={{
                justifyContent: 'start',
              }}
              dangerouslySetInnerHTML={{ __html: question.html }}
            ></div>
          </Typography>
        </Paper>
        {question.image && (
          <img
            style={{ width: '100%', height: 'auto' }}
            src={process.env.REACT_APP_UPLOAD_IMAGES_URL + question.image}
          />
        )}
        {question.answers.map((e, i) => {
          return (
            <Paper
              sx={{
                display: 'flex',
                marginY: '20px',
                border: i == question.trueIndex ? 2 : 0,
                borderColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  padding: '5px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginRight: '30px',
                }}
              >
                {i == 0 ? 'A' : i == 1 ? 'B' : i == 2 ? 'C' : 'D'}
              </Typography>
              <Typography sx={{ padding: '5px' }}>
                <div
                  style={{
                    justifyContent: 'start',
                  }}
                  dangerouslySetInnerHTML={{ __html: e.html }}
                ></div>
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Modal>
  );
};
const ListQuestion = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(10);
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState(0);
  const [cate, setCate] = useState(0);
  const [key, setKey] = useState('');
  const [listGrade, setListGrade] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listQuesCate, setListQuesCate] = useState([]);
  const [listQuestion, setListQuestion] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    grade: 0,
    subject: 0,
    cateId: 0,
    key: '',
  });
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getListGrade = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/grade/getAll`);
    setListGrade(res.data);
  };
  const getListSubject = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/subject/getByGradeId/${id}`);
    setListSubject(res.data);
  };
  const getListQuesCate = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/quesCate/getBySubjectId/${id}`
    );
    setListQuesCate(res.data);
  };
  const getListQuestion = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/question/getAll/${cate}/${subject}/${page}/${rowsPerPage}?key=${key}`
    );
    setListQuestion(res.data.content);
    setTotal(res.data.totalElement);
  };
  const deleteQuestion = async (id) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/question/delete/${id}`);
      swal('Câu hỏi đã được xóa', {
        icon: 'success',
      });
      getListQuestion();
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    if (grade != 0) {
      getListSubject(grade);
    } else {
      setListSubject([]);
      setListQuesCate([]);
    }
  }, [grade]);
  useEffect(() => {
    getListGrade();
    getListQuestion();
  }, []);
  useEffect(() => {
    getListQuestion();
  }, [page, rowsPerPage, cate, grade, subject, key]);
  useEffect(() => {
    if (subject != 0) {
      getListQuesCate(subject);
    } else {
      setListQuesCate([]);
    }
  }, [subject]);
  useEffect(() => {
    getListGrade();
  }, []);

  const onGradeChange = (value) => {
    setGrade(value);
  };
  const onSubjectChange = (value) => {
    setSubject(value);
  };
  const onQuestionCateChange = (value) => {
    setCate(value);
  };
  const onKeyChange = (value) => {
    setKey(value);
  };
  const handleDelete = useCallback((id) => {
    swal({
      title: 'Xác nhận xóa',
      text: 'Bạn có muốn xóa câu hỏi này?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteQuestion(id);
      } else {
        swal('Đã hủy thao tác xóa');
      }
    });
  }, []);
  const [isShowDetailQuestion, setIsShowDetailQuestion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelectedIndexChange = (value) => {
    setSelectedIndex(value);
  };
  const showDetailQuestion = () => {
    setIsShowDetailQuestion(true);
  };
  const closeDetailQuestion = () => {
    setIsShowDetailQuestion(false);
  };
  const Content = ({ content }) => {
    return (
      <div style={{ borderWidth: 1, height: 30, borderColor: 'red' }}>
        <div
          style={{ borderWidth: 1, height: 30, borderColor: 'red' }}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    );
  };
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
          Quản lý câu hỏi
        </Typography>
      </Box>
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
              console.log(dataFilter);
              onSubjectChange(newValue != null ? newValue.id : 0);
            }}
            renderInput={(params) => <TextField {...params} label={'Môn'} variant="outlined" />}
          />

          <AutoComplete
            options={listQuesCate}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              console.log(dataFilter);
              onQuestionCateChange(newValue != null ? newValue.id : 0);
            }}
            renderInput={(params) => <TextField {...params} label={'Loại'} variant="outlined" />}
          />
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              onKeyChange(e.target.value.trim().length !== 0 ? e.target.value : '');
              console.log(e.target.value.trim().length !== 0);
            }}
            label="Nhập từ khóa"
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Tooltip title="Thêm mới">
            <IconButton sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <NavLink
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                to="/exam/addQuestion"
                state={{ gradeId: 9, subjectId: 1, cateId: 1 }}
              >
                <Icon color="primary">add_circle_outline</Icon>
              </NavLink>
            </IconButton>
          </Tooltip>
        </Filter>

        <table style={{}}>
          <thead>
            <tr style={{ display: 'flex' }}>
              <th style={{ flex: 1 }}>ID</th>
              <th style={{ flex: 8 }}>Nội dung</th>
              <th style={{ flex: 1 }}></th>
              <th style={{ flex: 1 }}></th>
              <th style={{ flex: 1 }}></th>
            </tr>
          </thead>
          <tbody style={{ justifyContent: 'center', alignItems: 'center' }}>
            {listQuestion.length > 0 &&
              listQuestion?.map((subscriber, index) => (
                <tr
                  style={{
                    display: 'flex',
                    marginBottom: '10px',
                    padding: '10px',
                    borderWidth: '1px',
                    borderColor: '#aaaaaa',
                    borderStyle: 'solid',
                    borderRadius: 10,
                  }}
                >
                  <td
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Typography
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {subscriber.id}
                    </Typography>
                  </td>
                  <td
                    style={{
                      flex: 8,
                      padding: '4px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        justifyContent: 'start',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: subscriber.html,
                      }}
                    ></div>
                  </td>
                  <td
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        onSelectedIndexChange(index);
                        showDetailQuestion();
                      }}
                    >
                      <Icon color="primary">info_outline</Icon>
                    </IconButton>
                  </td>
                  <td
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <NavLink
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      to="/exam/editQuestion"
                      state={{ question: subscriber }}
                    >
                      <Icon color="primary">edit_mode</Icon>
                    </NavLink>
                  </td>
                  <td
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        handleDelete(subscriber.id);
                      }}
                    >
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <TablePagination
          // sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={total}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          //nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          //backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
      </Box>
      <DetailQuestion
        isShow={isShowDetailQuestion}
        closeDetailQuestion={closeDetailQuestion}
        question={
          listQuestion[selectedIndex]
            ? listQuestion[selectedIndex]
            : { answers: ['', '', '', ''], content: 'aafas', image: 'sdfsdfsdff' }
        }
      />
    </Container>
  );
};

export default ListQuestion;
