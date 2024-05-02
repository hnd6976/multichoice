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
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import da from 'date-fns/esm/locale/da/index.js';
import { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
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

const AddMultipleExam = ({}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [total, setTotal] = useState(10);
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState(0);
  const [key, setKey] = useState('');
  const [listGrade, setListGrade] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listQuesCate, setListQuesCate] = useState([]);
  const [listQuestion, setListQuestion] = useState([]);
  const [choosenQuestion, setChoosenQuestion] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [num, setNum] = useState(5);
  const [cate, setCate] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [examData, setExamData] = useState({
    title: '',
    questions: [],
    time: 15,
    subjectId: 0,
  });
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
  const getListGrade = async () => {
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
    if (subject != 0) {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/question/getAll/${cate}/${subject}/${page}/${rowsPerPage}?key=${key}`
      );
      console.log(res.data.content);
      setListQuestion(res.data.content);
      setTotal(res.data.totalElement);
      if (num > res.data.totalElement && res.data.totalElement > 0) {
        setNum(parseInt(res.data.totalElement));
      }
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
    // getListQuestion();
  }, []);
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
  useEffect(() => {
    getListGrade();
  }, []);

  const onGradeChange = (value) => {
    setGrade(value);
    setSubject(0);
    setCate(0);
    setPieData([]);
    resetData();
  };
  const onSubjectChange = (value) => {
    setSubject(value);
    resetData();
    setExamData((preve) => {
      return {
        ...preve,
        subjectId: value,
      };
    });
    setCate(0);
    setPieData([]);
  };
  const onTitleChange = (value) => {
    if (value.length <= 25) {
      setExamData((preve) => {
        return {
          ...preve,
          title: value,
        };
      });
    }
  };
  const onTimeChange = (value) => {
    const regex = /^[1-9][0-9]?$/;
    if (regex.test(value)) {
      setExamData((preve) => {
        return {
          ...preve,
          time: value,
        };
      });
    }
  };

  const onNumberChange = (e) => {
    const regex = /^[1-9][0-9]?$/;
    if (regex.test(e.target.value) && e.target.value <= total) {
      setNum(e.target.value);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    let multiExam = {
      subjectId: examData.subjectId,
      title: examData.title,
      time: examData.time,
      numExam: numExam,
      listQues: [],
    };
    let list = [];
    pieData.map((e) => {
      let item = { id: e.id, num: e.value };
      list.push(item);
    });
    multiExam.listQues = list;
    const formData = new FormData();
    formData.append('exam', JSON.stringify(multiExam));
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/exam/addMulti`,
        formData
      );
      setIsLoading(false);
      console.log(res.data);
      swal(`Tạo đề trắc nghiệm thành công\n Các đề sẽ có tên dạng: ${res.data.data}`, {
        icon: 'success',
      });
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };
  const [isValidTittle, setIsValidTittle] = useState(null);
  const [isValidGrade, setIsValidGrade] = useState(null);
  const [isValidSubject, setIsValidSubject] = useState(null);
  const [isVaLidData, setIsValidData] = useState(false);

  useEffect(() => {
    if (examData.title.length >= 4 && examData.title.length <= 25) {
      setIsValidTittle(true);
    } else {
      setIsValidTittle(false);
    }
    console.log(JSON.stringify(examData));
  }, [examData.title]);
  useEffect(() => {
    if (grade > 0) {
      setIsValidGrade(true);
    } else {
      setIsValidGrade(false);
    }
  }, [grade]);
  useEffect(() => {
    if (subject > 0) {
      setIsValidSubject(true);
    } else {
      setIsValidSubject(false);
    }
  }, [subject]);

  const [ind, setInd] = useState(0);
  const [leftNum, setLeftNum] = useState(5);
  const onLeftNumChange = () => {
    if (pieData.length > 0) {
      let sum = 0;
      pieData.map((e) => {
        sum = sum + e.value;
      });

      setLeftNum(num - sum);
    } else {
      setLeftNum(num);
    }
  };
  useEffect(() => {
    onLeftNumChange();
  });
  const onAddPieData = (id, name, value) => {
    console.log(pieData);
    if (listQuestion.length > 0) {
      let item = { id: id, value: value, label: name };
      setPieData([...pieData, item]);
    }
  };
  const onRemovePieData = (name) => {
    let list = pieData;
    list = list.filter((item) => item.label !== name);
    setPieData(list);
  };
  const onValuePieChange = (name, value) => {
    let list = pieData;
    let item = list.filter((item) => item.label === name)[0];
    let numQues = listQuestion.filter((e) => e.questionCategory.id === item.id).length;
    if (
      value - list.filter((item) => item.label === name)[0].value <= leftNum &&
      value > 0 &&
      value <= numQues
    ) {
      list[list.indexOf(list.filter((item) => item.label === name)[0])].value = parseInt(value);
      setPieData(list);
      setInd(ind + 1);
    }
  };
  const [numExam, setNumExam] = useState(5);
  const onNumExamChange = (e) => {
    const regex = /^[1-9][0-9]?$/;
    if (regex.test(e)) {
      setNumExam(e);
    }
  };
  useEffect(() => {
    console.log(pieData);
  });
  useEffect(() => {
    setIsValidData(
      isValidTittle && isValidGrade && isValidSubject && pieData.length > 0 && leftNum === 0
    );
  }, [isValidTittle, isValidGrade, isValidSubject, pieData, leftNum]);
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
          Trộn đề trắc nghiệm
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
            <AutoComplete
              options={listGrade}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                console.log(newValue);
                onGradeChange(newValue != null ? newValue.id : 0);
              }}
              renderInput={(params) => <TextField {...params} label={'Lớp'} variant="outlined" />}
            />
            {!isValidGrade && isValidGrade != null && (
              <Typography color={'red'}>Vui lòng chọn lớp !</Typography>
            )}
          </Box>
          <Box
            sx={{
              marginRight: 1,
              flex: 3,
            }}
          >
            <AutoComplete
              options={listSubject}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                onSubjectChange(newValue != null ? newValue.id : 0);
              }}
              renderInput={(params) => <TextField {...params} label={'Môn'} variant="outlined" />}
            />
            {!isValidSubject && isValidSubject != null && (
              <Typography color={'red'}>Vui lòng chọn môn học !</Typography>
            )}
          </Box>
          <Box
            sx={{
              marginRight: 1,
              flex: 3,
            }}
          >
            <TextField
              sx={{ width: 250 }}
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
              <Typography color={'red'}>Tiêu đề phải trên 4 và ít hơn 25 ký tự !</Typography>
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
            sx={{ flex: 1, marginRight: '10px' }}
            type="number"
            id="outlined-basic"
            label="Thời gian"
            variant="outlined"
            onChange={(e) => onTimeChange(e.target.value)}
            value={examData.time}
          />
          <TextField
            sx={{ flex: 1 }}
            type="number"
            id="outlined-basic"
            label="Số đề"
            variant="outlined"
            onChange={(e) => onNumExamChange(e.target.value)}
            value={numExam}
          />
        </Filter>
        <Box sx={{ display: 'flex', paddingY: 3 }}>
          <Box sx={{ flex: 2, padding: 3 }}>
            {pieData.length > 0 ? (
              <PieChart
                series={[
                  {
                    data:
                      pieData.length > 0
                        ? pieData
                        : [
                            { id: 0, value: 10, label: 'series A' },
                            { id: 1, value: 15, label: 'series B' },
                            { id: 2, value: 20, label: 'series C' },
                          ],
                  },
                ]}
                width={600}
                height={200}
              />
            ) : null}
          </Box>

          <Box sx={{ flex: 1, padding: 3 }}>
            {listQuesCate.map((e, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  marginY: 2,

                  border: pieData.filter((item) => item.label === e.name).length > 0 ? 2 : null,
                  borderColor: 'green',
                  borderRadius: 5,
                  padding: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ flex: 2, fontWeight: 'bold', fontSize: 18 }}>{e.name}</Typography>
                {pieData.filter((item) => item.label === e.name).length > 0 && (
                  <TextField
                    sx={{ flex: 1, width: 50 }}
                    type="number"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={(event) => onValuePieChange(e.name, event.target.value)}
                    value={pieData.filter((item) => item.label === e.name)[0]?.value}
                  />
                )}
                {pieData.filter((item) => item.label === e.name).length == 0 ? (
                  <IconButton
                    disabled={leftNum == 0}
                    sx={{ flex: 1 }}
                    onClick={() => {
                      onAddPieData(e.id, e.name, 1);
                    }}
                  >
                    <Icon color="primary">add_circle_outline</Icon>
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ flex: 1 }}
                    onClick={() => {
                      onRemovePieData(e.name);
                    }}
                  >
                    <Icon color="error">delete</Icon>
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
        <Button
          sx={{ width: '100%', marginBottom: '10px' }}
          onClick={() => {
            onSubmit();
          }}
          variant="contained"
          color="primary"
          disabled={!isVaLidData}
        >
          Tạo đề
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ width: '10%', position: 'absolute', bottom: '40%', left: '40%' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default AddMultipleExam;
