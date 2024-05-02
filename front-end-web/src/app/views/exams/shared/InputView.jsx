import React, { useRef, useState } from 'react';

import sample from './savefile.json';
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
  TextareaAutosize,
  SvgIcon,
  Grid,
  Radio,
  RadioGroup,
  Alert,
  CircularProgress,
  LinearProgress,
  Modal,
  Typography,
  Paper,
} from '@mui/material';
import EmailEditor from 'react-email-editor';
const InputView = ({
  jsonValue,
  onValueJsonChange,
  onValueHtmlChange,
  onValueChange,
  index,
  onClose,
}) => {
  const emailEditorRef = useRef(null);
  console.log('emailEditorRef 1', emailEditorRef);
  console.log('json vlaue', jsonValue);
  const [rawHTML, setRawHTML] = useState(null);
  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('emailEditorRef 2', emailEditorRef);
      console.log('exportHtml', html);
      setRawHTML(html);
      //alert('Output HTML has been logged in your developer console.');
    });
  };

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log('saveDesign', JSON.stringify(design, null, 4));
      alert('Design JSON has been logged in your developer console.');
    });
  };

  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };
  const onSave = () => {
    let jsonStr;
    let htmlStr;

    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      htmlStr = html;
      console.log(htmlStr);
      onValueHtmlChange(index, html);
    });
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log('saveDesign', JSON.stringify(design, null, 4));
      jsonStr = design;
      console.log('json', jsonStr);
      onValueJsonChange(index, JSON.stringify(design));
      onClose();
    });
  };
  const onLoad = () => {
    emailEditorRef.current.editor.addEventListener('onDesignLoad', onDesignLoad);
    emailEditorRef.current.editor.loadDesign(jsonValue);
  };
  return (
    <div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} minHeight="90vh" />
      <Button
        onClick={() => {
          onSave();
        }}
        variant="contained"
        color="primary"
      >
        Lưu thay đổi
      </Button>
    </div>
  );
};

export default InputView;
