import {
  Box,
  Icon,
  IconButton,
  styled,
  Autocomplete,
  TextField,
  TextareaAutosize,
  Radio,
  Paper,
  Modal,
  CircularProgress,
  LinearProgress,
  Typography,
  Button,
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import da from 'date-fns/esm/locale/da/index.js';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios.js';
import { useLocation } from 'react-router-dom';
import InputView from './InputView';
import sample from './savefile.json';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const AutoComplete = styled(Autocomplete)(() => ({
  width: 400,
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
const ChoosenImage = styled('img')({
  borderRadius: 10,
  width: '45%',
  height: 200,
});
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
const ImageButton = styled(Button)(({ theme }) => ({
  height: 40,
  width: '45%',
  marginTop: 10,
}));
const SubmitButton = styled(Button)(({ theme }) => ({
  height: 40,
  width: '50%',
}));
const AnswerInput = styled(TextField)(() => ({
  width: '100%',
  marginBottom: 10,
  height: 50,
}));
const RadioAnswer = styled(Radio)(() => ({
  width: '100%',
  height: 50,
  marginBottom: 10,
}));
const AddQuestionLittle = ({ cateId, addQuestion, selectedIndex, close, getList }) => {
  const [listAnswer, setListAnswer] = useState(['', '', '', '']);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState('');
  const [dataQuestion, setDataQuestion] = useState({
    json: '',
    html: '',
    answers: [
      { id: 0, json: '', html: '' },
      { id: 0, json: '', html: '' },
      { id: 0, json: '', html: '' },
      { id: 0, json: '', html: '' },
    ],
    questionCateId: cateId,
    trueIndex: 0,
  });
  const onTrueIndexChange = (value) => {
    setDataQuestion((preve) => {
      return {
        ...preve,
        trueIndex: value,
      };
    });
  };
  const onContentChange = (value) => {
    setDataQuestion((preve) => {
      return {
        ...preve,
        content: value,
      };
    });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageFile(event.target.files[0]);
    }
  };
  const [isVaLidData, setIsValidData] = useState(false);
  const [isValidContent, setIsValidContent] = useState(null);
  const [isValidAnswers, setIsValidAnswers] = useState(null);
  useEffect(() => {
    if (dataQuestion.html != '') {
      setIsValidContent(true);
    } else {
      setIsValidContent(false);
    }
  }, [dataQuestion.html]);
  useEffect(() => {
    let flag = true;
    for (let i = 0; i < dataQuestion.answers.length - 1; i++) {
      for (let j = i + 1; j < dataQuestion.answers.length; j++) {
        if (dataQuestion.answers[i].html == dataQuestion.answers[j].html) {
          flag = false;
        }
      }
    }
    console.log(flag);
    setIsValidAnswers(dataQuestion.answers.filter((e) => e.html !== '').length == 4 && flag);
  });
  useEffect(() => {
    setIsValidData(isValidContent && isValidAnswers);
  }, [isValidContent, isValidAnswers]);
  const onSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('question', JSON.stringify(dataQuestion));
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/question/add`, formData);
      setIsLoading(false);
      swal('Câu hỏi đã được tạo', {
        icon: 'success',
      });
      addQuestion(selectedIndex, res.data);
      getList();
      close();
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };

  const onContentJsonChange = (index, json) => {
    setDataQuestion((preve) => {
      return {
        ...preve,
        json: json,
      };
    });
  };
  const onContentHtmlChange = (index, html) => {
    setDataQuestion((preve) => {
      return {
        ...preve,
        html: html,
      };
    });
  };

  const onAnswerJsonChange = (index, json) => {
    let list = dataQuestion.answers;
    console.log(json);
    list[index].json = json;
    setDataQuestion((datas) => ({
      ...datas,
      answers: list,
    }));
  };
  const onAnswerHtmlChange = (index, html) => {
    let list = dataQuestion.answers;
    //console.log(json);
    list[index].html = html;
    setDataQuestion((datas) => ({
      ...datas,
      answers: list,
    }));
  };
  useEffect(() => {
    console.log(dataQuestion);
  });
  const [selectedIndexModal, setSelectedIndexModal] = useState(null);
  const onModalShow = (index) => {
    setSelectedIndexModal(index);
  };
  const onModalClose = () => {
    setSelectedIndexModal(null);
  };
  const ModalInput = ({ show, onValueJsonChange, onValueHtmlChange, index, jsonValue }) => {
    return (
      <Modal
        open={show}
        onClose={onModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1200,
            height: 1000,
            bgcolor: 'white',
            border: '1px solid #000',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
          }}
        >
          <InputView
            index={index}
            jsonValue={jsonValue}
            onClose={onModalClose}
            onValueHtmlChange={onValueHtmlChange}
            onValueJsonChange={onValueJsonChange}
          />
        </Box>
      </Modal>
    );
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Container sx={{ position: 'relative' }}>
      <Box width="100%">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '40%',
          }}
        >
          <Paper
            onClick={(e) => {
              onModalShow(-1);
            }}
            sx={{
              cursor: 'pointer',
              width: '50%',
              marginRight: '10px',
              wordBreak: 'break-word',
              overflow: 'auto',
            }}
          >
            <div
              style={{
                justifyContent: 'start',
              }}
              dangerouslySetInnerHTML={{
                __html: dataQuestion.html != '' ? dataQuestion.html : null,
              }}
            ></div>
          </Paper>

          <ModalInput
            onClose={onModalClose}
            show={selectedIndexModal == -1}
            index={selectedIndexModal}
            jsonValue={dataQuestion.json != '' ? JSON.parse(dataQuestion.json) : sample}
            onValueJsonChange={onContentJsonChange}
            onValueHtmlChange={onContentHtmlChange}
          />

          <Box sx={{ flexDirection: 'row', display: 'flex', width: '50%' }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper
                  onClick={(e) => {
                    onModalShow(0);
                  }}
                  sx={{
                    flex: 8,
                    cursor: 'pointer',
                    minHeight: '50px',
                    marginBottom: '10px',
                    wordBreak: 'break-word',
                    overflow: 'auto',
                  }}
                >
                  <div
                    style={{
                      justifyContent: 'start',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: dataQuestion.answers[0] != '' ? dataQuestion.answers[0].html : null,
                    }}
                  ></div>
                </Paper>
                <IconButton onClick={() => onTrueIndexChange(0)}>
                  <Icon color="primary">
                    {dataQuestion.trueIndex == 0 ? 'check_box' : 'check_box_outline_blank'}
                  </Icon>
                </IconButton>
                <ModalInput
                  onClose={onModalClose}
                  show={selectedIndexModal == 0}
                  index={selectedIndexModal}
                  jsonValue={
                    dataQuestion.answers[0].json != ''
                      ? JSON.parse(dataQuestion.answers[0].json)
                      : sample
                  }
                  onValueJsonChange={onAnswerJsonChange}
                  onValueHtmlChange={onAnswerHtmlChange}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper
                  onClick={(e) => {
                    onModalShow(1);
                  }}
                  sx={{
                    flex: 8,
                    cursor: 'pointer',
                    minHeight: '50px',
                    marginBottom: '10px',
                    wordBreak: 'break-word',
                    overflow: 'auto',
                  }}
                >
                  <div
                    style={{
                      justifyContent: 'start',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: dataQuestion.answers[1] != '' ? dataQuestion.answers[1].html : null,
                    }}
                  ></div>
                </Paper>
                <IconButton onClick={() => onTrueIndexChange(1)}>
                  <Icon color="primary">
                    {dataQuestion.trueIndex == 1 ? 'check_box' : 'check_box_outline_blank'}
                  </Icon>
                </IconButton>
                <ModalInput
                  onClose={onModalClose}
                  show={selectedIndexModal == 1}
                  index={selectedIndexModal}
                  jsonValue={
                    dataQuestion.answers[1].json != ''
                      ? JSON.parse(dataQuestion.answers[1].json)
                      : sample
                  }
                  onValueJsonChange={onAnswerJsonChange}
                  onValueHtmlChange={onAnswerHtmlChange}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper
                  onClick={(e) => {
                    onModalShow(2);
                  }}
                  sx={{
                    flex: 8,
                    cursor: 'pointer',
                    minHeight: '50px',
                    marginBottom: '10px',
                    wordBreak: 'break-word',
                    overflow: 'auto',
                  }}
                >
                  <div
                    style={{
                      justifyContent: 'start',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: dataQuestion.answers[2] != '' ? dataQuestion.answers[2].html : null,
                    }}
                  ></div>
                </Paper>
                <IconButton onClick={() => onTrueIndexChange(2)}>
                  <Icon color="primary">
                    {dataQuestion.trueIndex == 2 ? 'check_box' : 'check_box_outline_blank'}
                  </Icon>
                </IconButton>
                <ModalInput
                  onClose={onModalClose}
                  show={selectedIndexModal == 2}
                  index={selectedIndexModal}
                  jsonValue={
                    dataQuestion.answers[2].json != ''
                      ? JSON.parse(dataQuestion.answers[2].json)
                      : sample
                  }
                  onValueJsonChange={onAnswerJsonChange}
                  onValueHtmlChange={onAnswerHtmlChange}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper
                  onClick={(e) => {
                    onModalShow(3);
                  }}
                  sx={{
                    flex: 8,
                    cursor: 'pointer',
                    minHeight: '50px',
                    marginBottom: '10px',
                    wordBreak: 'break-word',
                    overflow: 'auto',
                  }}
                >
                  <div
                    style={{
                      justifyContent: 'start',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: dataQuestion.answers[3] != '' ? dataQuestion.answers[3].html : null,
                    }}
                  ></div>
                </Paper>
                <IconButton onClick={() => onTrueIndexChange(3)}>
                  <Icon color="primary">
                    {dataQuestion.trueIndex == 3 ? 'check_box' : 'check_box_outline_blank'}
                  </Icon>
                </IconButton>
                <ModalInput
                  onClose={onModalClose}
                  show={selectedIndexModal == 3}
                  index={selectedIndexModal}
                  jsonValue={
                    dataQuestion.answers[3].json != ''
                      ? JSON.parse(dataQuestion.answers[3].json)
                      : sample
                  }
                  onValueJsonChange={onAnswerJsonChange}
                  onValueHtmlChange={onAnswerHtmlChange}
                />
              </Box>
              {!isValidAnswers && isValidAnswers != null && (
                <Typography color={'red'}>
                  Câu trả lời không được giống nhau và không được trống !
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <ChoosenImage
            alt="preview image"
            sx={{ width: '50%', marginRight: '10px' }}
            src={
              image != null
                ? image
                : 'https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg'
            }
          />
          <SubmitButton
            onClick={() => {
              onSubmit();
            }}
            disabled={!isVaLidData}
            variant="contained"
            color="primary"
          >
            Tạo câu hỏi
          </SubmitButton>
        </Box>
        <input
          accept="image/*"
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
          <ImageButton variant="outlined" component="span">
            Chọn hình ảnh
          </ImageButton>
        </label>
        <Modal
          open={false}
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '50%' }}>
            <LinearProgress />
          </Box>
        </Modal>
        {isLoading && (
          <Box sx={{ width: '10%', position: 'absolute', bottom: '40%', left: '40%' }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AddQuestionLittle;
