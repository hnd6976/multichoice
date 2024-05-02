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
  Typography,
  Autocomplete,
  TextField,
  FormControl,
  Input,
  Modal,
  Paper,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import da from 'date-fns/esm/locale/da/index.js';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios.js';
import AddQuestionLittle from './AddQuestionLittle';
import { DetailQuestion } from './ListQuestion';
const Container = styled('div')(({ theme }) => ({
  margin: '10px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  position: 'relative',
}));
const SubmitButton = styled(Button)(({ theme }) => ({
  height: 40,
  width: '50%',
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
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
const QuestionContainer = styled('div')({
  backgroundColor: '#b3d2d5',
  padding: '5px',
  borderRadius: 0,
  display: 'flex',
});
const Question = ({ index, item, onClick, question, selectedIndex, num, swapQuestion }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: 5,

        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        onClick={() => {
          onClick(index);
        }}
        sx={{
          flex: 11,
          display: 'flex',
          width: 500,
          //y height: 100,
          border: 2,
          padding: '10px',
          borderRadius: 2,
          backgroundColor: 'white',
          borderColor: index == selectedIndex ? 'red' : 'white',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ flex: 1, fontSize: 14, fontWeight: '800', marginRight: '10px' }}>
          {' '}
          Câu {item + 1}
        </Typography>
        <Typography sx={{ flex: 8 }}>
          {question != null ? (
            <div
              style={{
                justifyContent: 'start',
              }}
              dangerouslySetInnerHTML={{ __html: question.html }}
            ></div>
          ) : (
            ''
          )}
        </Typography>
        {question != null && <Icon color={'success'}>check</Icon>}
      </Box>
      <IconButton sx={{ flex: 1 }} onClick={() => swapQuestion(selectedIndex, index)}>
        {selectedIndex != -1 && selectedIndex < num && index != selectedIndex && (
          <Icon color={'success'}>swap_vert</Icon>
        )}
      </IconButton>
    </Box>
  );
};

const EditExam = ({}) => {
  const location = useLocation();
  const { exam } = location.state;
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [total, setTotal] = useState(10);
  const [subject, setSubject] = useState(exam.subject.id);
  const [key, setKey] = useState('');
  const [listQuesCate, setListQuesCate] = useState([]);
  const [listQuestion, setListQuestion] = useState([]);
  const [choosenQuestion, setChoosenQuestion] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [num, setNum] = useState(exam.questions.length);
  const [cate, setCate] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [examData, setExamData] = useState({
    title: exam.title,
    questions: [],
    time: exam.time,
    subjectId: exam.subject.id,
  });
  useEffect(() => {
    exam.questions.map((e, index) => {
      addQuestion(index, e);
    });
  }, []);
  useEffect(() => {
    console.log(examData);
  }, [examData]);
  const resetData = () => {
    setExamData((preve) => {
      return {
        ...preve,
        questions: [],
        subjectId: 0,
      };
    });
    setChoosenQuestion([]);
    setSelectedIndex(0);
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getListQuesCate = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/quesCate/getBySubjectId/${id}`
    );

    setListQuesCate(res.data);
  };
  const getListQuestion = async () => {
    if (subject != 0) {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/question/getAll/${cate}/${subject}/${page}/${rowsPerPage}?key=${key}`
      );
      setListQuestion(res.data.content);
      setTotal(res.data.totalElement);
    }
  };

  useEffect(() => {
    getListQuestion();
  }, [page, rowsPerPage, cate, key, subject]);

  useEffect(() => {
    if (subject != 0) {
      getListQuesCate(subject);
    } else {
      setListQuesCate([]);
    }
  }, [subject]);

  const onTitleChange = (value) => {
    setExamData((preve) => {
      return {
        ...preve,
        title: value,
      };
    });
  };
  const onTimeChange = (value) => {
    const regex = /^[1-9][0-9]?$/;
    if (value === '' || regex.test(value)) {
      setExamData((preve) => {
        return {
          ...preve,
          time: value,
        };
      });
    }
  };
  const onQuestionsChange = (index, value) => {
    let list = examData.questions;
    list[index] = value;
    setExamData((datas) => ({
      ...datas,
      questions: list,
    }));
  };
  const onQuestionCateChange = (value) => {
    setCate(value);
  };
  const onKeyChange = (value) => {
    setKey(value);
  };
  const onNumberChange = (e) => {
    const regex = /^[1-9][0-9]?$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setNum(e.target.value);
    }
  };
  const handleOpenQuestionModal = () => {
    setShowQuestionModal(true);
  };
  const handleCloseQuestionModal = () => {
    setShowQuestionModal(false);
  };
  const onSelect = (value) => {
    setSelectedIndex(value);
  };
  const addQuestion = (index, value) => {
    let list = choosenQuestion;
    list[index] = value;
    console.log(list);
    onQuestionsChange(index, value.id);
    setChoosenQuestion(list);
    onSelect(selectedIndex + 1);
  };
  useEffect(() => {
    console.log(choosenQuestion);
  }, [choosenQuestion]);
  const swapQuestion = (selectedIndex, targetIndex) => {
    console.log(targetIndex);
    let list = choosenQuestion;
    let temp;
    temp = list[selectedIndex];
    list[selectedIndex] = list[targetIndex];
    list[targetIndex] = temp;
    setChoosenQuestion(list);
    setSelectedIndex(targetIndex);
  };
  const for_loop = [];
  for (let i = 0; i < num; i++) {
    for_loop.push(
      <Question
        item={i}
        index={i}
        question={choosenQuestion[i]}
        onClick={onSelect}
        selectedIndex={selectedIndex}
        key={i.toString()}
        num={num}
        swapQuestion={swapQuestion}
      ></Question>
    );
  }
  const isSelected = (id) => {
    let i = false;
    console.log(choosenQuestion);
    if (choosenQuestion.length > 0) {
      choosenQuestion.filter((e) => {
        if (e != null) {
          if (e.id == id) i = true;
        }
      });
      console.log(i);
    }
    return i;
  };
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('exam', JSON.stringify(examData));
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/exam/edit/${exam.id}`,
        formData
      );
      setIsLoading(false);
      swal('Cập nhật thành công', {
        icon: 'success',
      });
      navigate(-1);
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };
  const [isValidTittle, setIsValidTittle] = useState(null);
  const [isVaLidData, setIsValidData] = useState(false);
  const [isVaLidNum, setIsVaLidNum] = useState(null);
  useEffect(() => {
    setIsVaLidNum(choosenQuestion.filter((e) => e != null).length == num);
  });
  useEffect(() => {
    setIsValidData(isValidTittle && isVaLidNum);
  }, [isValidTittle, isVaLidNum]);

  useEffect(() => {
    if (examData.title.length >= 4) {
      setIsValidTittle(true);
    } else {
      setIsValidTittle(false);
    }
    console.log(JSON.stringify(examData));
  }, [examData.title]);
  const fomatList = (index) => {
    let list = choosenQuestion;
    list = list.filter((e, i) => i < index);
    let list1 = examData.questions;
    list1 = list1.filter((e, i) => i < index);
    setExamData((datas) => ({
      ...datas,
      questions: list1,
    }));
    setChoosenQuestion(list);
  };
  useEffect(() => {
    fomatList(num);
  }, [num]);
  const [isShowDetailQuestion, setIsShowDetailQuestion] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(0);
  const onSelectedDetailChange = (value) => {
    setSelectedDetail(value);
  };
  const showDetailQuestion = () => {
    setIsShowDetailQuestion(true);
  };
  const closeDetailQuestion = () => {
    setIsShowDetailQuestion(false);
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
          Chỉnh sửa đề trắc nghiệm
        </Typography>
      </Box>
      <FormControl></FormControl>
      <Box width="100%" sx={{}}>
        <Filter sx={{ display: 'flex' }}>
          <Box
            sx={{
              marginRight: 1,
              flex: 3,
            }}
          >
            <TextField
              id="search-bar"
              className="text"
              label="Tiêu đề"
              variant="outlined"
              placeholder="Tiêu đề"
              size="medium"
              onChange={(e) => onTitleChange(e.target.value)}
              value={examData.title}
            />
            {!isValidTittle && isValidTittle != null && (
              <Typography color={'red'}>Tiêu đề phải trên 4 ký tự !</Typography>
            )}
          </Box>
          <TextField
            sx={{ flex: 1, marginRight: '10px' }}
            type="number"
            id="outlined-basic"
            label="Số câu"
            variant="outlined"
            onChange={(e) => onNumberChange(e)}
            value={num}
          />
          <TextField
            sx={{ flex: 1 }}
            type="number"
            id="outlined-basic"
            label="Thời gian"
            variant="outlined"
            onChange={(e) => onTimeChange(e.target.value)}
            value={examData.time}
          />
        </Filter>
        <LoadingButton
          sx={{ width: '100%', marginBottom: '10px' }}
          onClick={() => {
            onSubmit();
          }}
          variant="contained"
          color="primary"
          disabled={!isVaLidData}
        >
          Lưu
        </LoadingButton>
        <Typography sx={{ fontWeight: '700', fontSize: 24, marginLeft: '10px' }}>
          {choosenQuestion.filter((e) => e != null).length}/{num}
        </Typography>
        <QuestionContainer>
          <Box sx={{ flex: 6, paddingTop: '10px', height: 600, overflow: 'auto' }}>{for_loop}</Box>
          <Box
            sx={{
              flex: 5,
              height: 600,
              // overflow: 'auto',
              paddingTop: '10px',
              //backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                marginBottom: '20px',
                backgroundColor: 'white',
                padding: '10px',
                //borderRadius: 2,
                marginLeft: '10px',
              }}
            >
              <AutoComplete
                options={listQuesCate}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  onQuestionCateChange(newValue != null ? newValue.id : 0);
                }}
                renderInput={(params) => (
                  <TextField {...params} label={'Loại'} variant="outlined" />
                )}
              />
              <TextField
                sx={{ marginRight: 1, marginTop: '10px', marginBottom: '10px', width: 350 }}
                id="search-bar"
                className="text"
                onInput={(e) => {
                  onKeyChange(e.target.value);
                }}
                label="Nhập từ khóa"
                variant="outlined"
                placeholder="Nhập từ khóa"
                size="medium"
              />
              <SubmitButton
                disabled={cate == 0 || selectedIndex >= num}
                onClick={() => {
                  handleOpenQuestionModal();
                }}
                variant="contained"
                color="primary"
              >
                Tạo câu hỏi
              </SubmitButton>
            </Box>
            <Box
              sx={{ height: '60%', paddingRight: '10px', paddingLeft: '10px', overflow: 'auto' }}
            >
              {listQuestion?.map((subscriber, index) => (
                <Paper
                  sx={{
                    width: '100%',
                    display: 'flex',
                    marginBottom: 2,
                    padding: 1,
                    position: 'relative',
                  }}
                >
                  <Paper
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: isSelected(subscriber.id) ? 'gray' : null,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      opacity: 0.5,
                    }}
                  ></Paper>
                  <Typography sx={{ flex: 12, overflow: 'auto' }}>
                    {' '}
                    <div
                      style={{
                        justifyContent: 'start',
                      }}
                      dangerouslySetInnerHTML={{ __html: subscriber.html }}
                    ></div>
                  </Typography>
                  <IconButton
                    disabled={selectedIndex >= num || isSelected(subscriber.id) ? true : false}
                    sx={{ flex: 1 }}
                    onClick={(e) => {
                      onSelectedDetailChange(index);
                      showDetailQuestion();
                    }}
                  >
                    <Icon
                      color={selectedIndex >= num || isSelected(subscriber.id) ? 'gray' : 'success'}
                    >
                      info_outline
                    </Icon>
                  </IconButton>
                  <IconButton
                    disabled={selectedIndex >= num || isSelected(subscriber.id) ? true : false}
                    sx={{ flex: 1 }}
                    onClick={() => {
                      addQuestion(selectedIndex, subscriber);
                      console.log(index);
                    }}
                  >
                    <Icon
                      color={selectedIndex >= num || isSelected(subscriber.id) ? 'gray' : 'primary'}
                    >
                      add_circle_outline
                    </Icon>
                  </IconButton>
                </Paper>
              ))}
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
          </Box>
        </QuestionContainer>
      </Box>
      <Modal
        open={showQuestionModal}
        onClose={handleCloseQuestionModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 600,
            bgcolor: 'white',
            border: '1px solid #000',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
          }}
        >
          <AddQuestionLittle
            cateId={1}
            selectedIndex={selectedIndex}
            addQuestion={addQuestion}
            close={handleCloseQuestionModal}
            getList={getListQuestion}
          />
        </Box>
      </Modal>
      <DetailQuestion
        isShow={isShowDetailQuestion}
        closeDetailQuestion={closeDetailQuestion}
        question={
          listQuestion[selectedDetail]
            ? listQuestion[selectedDetail]
            : { answers: ['', '', '', ''], content: 'aafas', image: 'sdfsdfsdff' }
        }
      />
      {isLoading && (
        <Box sx={{ width: '10%', position: 'absolute', bottom: '40%', left: '40%' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default EditExam;
