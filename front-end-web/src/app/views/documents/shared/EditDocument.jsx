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
import { useNavigate, useLocation } from 'react-router-dom';
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

const EditDocument = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { document } = location.state;
  console.log(document);
  const listPrice = [
    { id: 1, value: 0 },
    { id: 2, value: 10000 },
    { id: 3, value: 15000 },
    { id: 4, value: 20000 },
    { id: 5, value: 25000 },
    { id: 6, value: 30000 },
  ];
  const [gra, setGra] = useState({
    id: document.subject.grade.id,
    name: document.subject.grade.name,
  });
  const [sub, setSub] = useState({
    id: document.subject.id,
    name: document.subject.name,
  });
  const [pri, setPri] = useState({
    id: listPrice.filter((e) => e.value == document.price)[0].id
      ? listPrice.filter((e) => e.value == document.price)[0].id
      : 0,
    value: document.price,
  });
  const [grade, setGrade] = useState(document.subject.grade.id);
  const [subject, setSubject] = useState(document.subject.id);
  const [name, setName] = useState(document.name);
  const [price, setPrice] = useState(document.price);
  const [listGrade, setListGrade] = useState([]);
  const [listSubject, setListSubject] = useState([]);

  const [examData, setExamData] = useState({
    title: '',
    questions: [],
    time: 15,
    subjectId: 0,
  });
  const getListGrade = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/grade/getAll`);
    const da = await res.json();
    setListGrade(da);
  };
  const getListSubject = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/subject/getByGradeId/${id}`);
    const da = await res.json();
    setListSubject(da);
    console.log(da);
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
    setName(value);
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
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('subjectId', subject);
    formData.append('file', imageFile);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/document/edit/${document.id}`,
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
    if (name.length >= 4) {
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
    setIsValidData(isValidName && isValidGrade && isValidSubject);
  }, [isValidName, isValidGrade, isValidSubject]);
  const url =
    'https://res.cloudinary.com/dqfyfxb2r/image/upload/v1695729650/B1909901_CT475_c5w0gj.pdf';
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
          Chỉnh sửa tài liệu
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
              value={gra}
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
              value={sub}
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
              <Typography color={'red'}>Tiêu đề phải trên 4 ký tự !</Typography>
            )}
          </Box>
          <Box
            sx={{
              marginRight: 1,
              flex: 3,
            }}
          >
            <AutoComplete
              options={listPrice}
              value={pri}
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
        <Button
          disabled={!isVaLidData}
          sx={{ width: '100%', marginBottom: '10px' }}
          onClick={() => {
            onSubmit();
          }}
          variant="contained"
          color="primary"
        >
          Lưu
        </Button>
      </Box>
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
          {imageFile != '' ? (
            <Document width={794} file={imageFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                width={794}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                //customTextRenderer={false}

                pageNumber={pageNumber}
              />
            </Document>
          ) : (
            <Document
              width={794}
              file={{
                url: `${process.env.REACT_APP_UPLOAD_IMAGES_URL}${document?.url}`,
              }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                width={794}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                //customTextRenderer={false}

                pageNumber={pageNumber}
              />
            </Document>
          )}
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

export default EditDocument;
