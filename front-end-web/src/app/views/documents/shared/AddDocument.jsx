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
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import da from 'date-fns/esm/locale/da/index.js';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios.js';
import { Document, Page, pdfjs } from 'react-pdf';

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

const AddDocument = ({}) => {
  const navigate = useNavigate();

  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [listGrade, setListGrade] = useState([]);
  const [listSubject, setListSubject] = useState([]);

  const [examData, setExamData] = useState({
    title: '',
    questions: [],
    time: 15,
    subjectId: 0,
  });
  const getListGrade = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/grade/getAll`);
    setListGrade(res.data);
  };
  const getListSubject = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/subject/getByGradeId/${id}`);
    setListSubject(res.data);
  };

  useEffect(() => {
    if (grade != 0) {
      getListSubject(grade);
    } else {
      setListSubject([]);
    }
  }, [grade]);
  useEffect(() => {
    getListGrade();
    // getListQuestion();
  }, []);
  useEffect(() => {
    getListGrade();
  }, []);

  const onGradeChange = (value) => {
    setGrade(value);
    setSubject(0);
  };
  const onNameChange = (value) => {
    if (value.length <= 25) {
      setName(value);
    }
  };
  const onPriceChange = (value) => {
    setPrice(value);
  };
  const onSubjectChange = (value) => {
    setSubject(value);
    setExamData((preve) => {
      return {
        ...preve,
        subjectId: value,
      };
    });
  };
  const listPrice = [
    { id: 1, value: 0 },
    { id: 2, value: 10000 },
    { id: 3, value: 15000 },
    { id: 4, value: 20000 },
    { id: 5, value: 25000 },
    { id: 6, value: 30000 },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('subjectId', subject);
    formData.append('price', price);
    formData.append('file', imageFile);
    try {
      setIsLoading(true);
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}/admin/document/add`, formData)
        .then((re) => {
          setIsLoading(false);
          swal('Thêm thành công', {
            icon: 'success',
          });
        });
    } catch (err) {
      console.log(err);
      swal(err.message, {
        icon: 'error',
      });
    }
  };
  const [isValidGrade, setIsValidGrade] = useState(null);
  const [isValidSubject, setIsValidSubject] = useState(null);
  const [isValidName, setIsValidName] = useState(null);
  const [isValidFile, setIsValidFile] = useState(null);
  const [isVaLidData, setIsValidData] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState('');
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageFile(event.target.files[0]);
    }
  };
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
  useEffect(() => {
    if (name.length >= 4 && name.length <= 50) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }, [name]);
  useEffect(() => {
    if (image !== null) {
      setIsValidFile(true);
    } else {
      setIsValidFile(false);
    }
  }, [image]);
  useEffect(() => {
    setIsValidData(isValidName && isValidGrade && isValidSubject && isValidFile);
  }, [isValidName, isValidGrade, isValidSubject, isValidFile]);
  const url =
    'https://res.cloudinary.com/dqfyfxb2r/image/upload/v1695729650/B1909901_CT475_c5w0gj.pdf';
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  //const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const ControlPanel = (props) => {
    const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === numPages;

    const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
    const lastPageClass = isLastPage ? 'disabled' : 'clickable';

    const goToFirstPage = () => {
      if (!isFirstPage) setPageNumber(1);
    };
    const goToPreviousPage = () => {
      if (!isFirstPage) setPageNumber(pageNumber - 1);
    };
    const goToNextPage = () => {
      if (!isLastPage) setPageNumber(pageNumber + 1);
    };
    const goToLastPage = () => {
      if (!isLastPage) setPageNumber(numPages);
    };

    const onPageChange = (e) => {
      if (Number(e) > 0 && Number(e) <= numPages) setPageNumber(Number(e));
    };

    const isMinZoom = scale < 0.6;
    const isMaxZoom = scale >= 2.0;

    const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
    const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

    const zoomOut = () => {
      if (!isMinZoom) setScale(scale - 0.1);
    };

    const zoomIn = () => {
      if (!isMaxZoom) setScale(scale + 0.1);
    };
    return (
      <Paper
        sx={{
          display: 'flex',
          padding: '15px',
          marginBottom: '20px',
          marginTop: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '794px',
        }}
      >
        <IconButton onClick={() => goToFirstPage()}>
          <Icon>first_page</Icon>
        </IconButton>
        <IconButton onClick={() => goToPreviousPage()}>
          <Icon>navigate_before</Icon>
        </IconButton>
        <Typography>Trang</Typography>
        <TextField
          sx={{ marginRight: '10px', marginLeft: '10px', width: '80px' }}
          type="number"
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={pageNumber}
          onChange={(e) => onPageChange(e.target.value)}
        />
        <Typography sx={{ marginRight: '10px' }}>Trên</Typography>
        <Typography sx={{ fontWeight: 'bold' }}>{numPages}</Typography>
        <IconButton onClick={() => goToNextPage()}>
          <Icon>navigate_next</Icon>
        </IconButton>
        <IconButton onClick={() => goToLastPage()}>
          <Icon>last_page</Icon>
        </IconButton>
      </Paper>
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
          Thêm tài liệu
        </Typography>
      </Box>
      <FormControl></FormControl>
      <Box width="100%" sx={{ alignItems: 'center', justifyContent: 'center' }}>
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
              flex: 6,
            }}
          >
            <TextField
              sx={{ width: 250 }}
              id="search-bar"
              className="text"
              label="Tên"
              variant="outlined"
              placeholder="Tên"
              size="medium"
              onChange={(e) => onNameChange(e.target.value)}
              value={name}
            />
            {!isValidName && isValidName != null && (
              <Typography color={'red'}>Tên phải trên 4 và ít hơn 50 ký tự !</Typography>
            )}
          </Box>
          <Box
            sx={{
              marginRight: 1,
              flex: 3,
            }}
          >
            <AutoComplete
              sx={{ width: 180 }}
              options={listPrice}
              getOptionLabel={(option) => option.value}
              onChange={(event, newValue) => {
                onPriceChange(newValue != null ? newValue.value : 0);
              }}
              renderInput={(params) => (
                <TextField {...params} label={'Phí tải'} variant="outlined" />
              )}
            />
          </Box>
        </Filter>
        <LoadingButton
          disabled={!isVaLidData}
          sx={{ width: '100%', marginBottom: '10px' }}
          onClick={() => {
            onSubmit();
          }}
          variant="contained"
          color="primary"
        >
          Tạo tài liệu
        </LoadingButton>
      </Box>
      <Box>
        <input
          accept="application/pdf"
          onChange={(e) => {
            onImageChange(e);
          }}
          className="input"
          id="outlined-button-file"
          multiple
          type="file"
          hidden={true}
        />
        <label htmlFor="outlined-button-file">
          <Button variant="outlined" component="span">
            Chọn tài liệu
          </Button>
        </label>
        {(!isValidFile || isValidFile == null) && (
          <Typography color={'red'}>Vui lòng chọn tài liệu !</Typography>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'gray',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10px',
        }}
      >
        <ControlPanel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
        <Box
          sx={{
            width: '794px',
            marginBottom: '10px',
          }}
        >
          <Document width={794} file={image} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              width={794}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              //customTextRenderer={false}

              pageNumber={pageNumber}
            />
          </Document>
        </Box>
      </Box>
      {isLoading && (
        <Box sx={{ width: '10%', position: 'absolute', bottom: '40%', left: '40%' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default AddDocument;
