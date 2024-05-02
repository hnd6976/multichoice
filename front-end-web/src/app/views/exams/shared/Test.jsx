import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Box,
  Icon,
  IconButton,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Alert,
  Popover,
  Typography,
  Button,
  Paper,
  Modal,
  Collapse,
} from '@mui/material';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { MathComponent } from 'mathjax-react';
import { SketchPicker, CompactPicker } from 'react-color';
const SectionView = ({
  item,
  selectedIndex,
  index,
  deleteSection,
  handleClick,
  handleClose,
  addSection,
  onSelectedChange,
}) => {
  const [val, setVal] = useState('txt');

  const handleChange = (event) => {
    setVal(event.target.value);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        onMouseEnter={() => console.log('hover')}
        onClick={() => onSelectedChange(index)}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          margin: '5px',
          borderBottom: selectedIndex == index ? 1 : 0,
          borderColor: 'green',
          paddingTop: '18px',
          paddingX: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {item.type == 'equ' ? (
          <Typography sx={[item.style, { overflow: 'hidden' }]}>
            <MathComponent tex={item.value} fontSize={50} />
          </Typography>
        ) : (
          <Typography sx={[item.style, { wordBreak: 'break-word' }]} color={item.style.color}>
            {item.value}
          </Typography>
        )}

        {selectedIndex == index && (
          <IconButton
            onClick={() => deleteSection(index)}
            sx={{
              padding: '3px',
              position: 'absolute',
              backgroundColor: 'white',
              top: -15,
              right: -15,
            }}
          >
            <Icon style={{ fontSize: 16 }} color="error">
              cancel
            </Icon>
          </IconButton>
        )}
      </Box>
      {selectedIndex == index && (
        <IconButton onClick={(e) => handleClick(e, index)}>
          <Icon color="primary">add_circle</Icon>
        </IconButton>
      )}
      <Popover
        open={Boolean(item.add)}
        anchorEl={item.add}
        onClose={() => handleClose(index)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FormControl sx={{ padding: '5px' }}>
          <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="txt"
            name="radio-buttons-group"
            value={val}
            onChange={(e) => handleChange(e)}
          >
            <FormControlLabel value="txt" control={<Radio />} label="Văn bản" />
            <FormControlLabel value="equ" control={<Radio />} label="Công thức" />
          </RadioGroup>
          <Button
            onClick={() => {
              addSection(val, index + 1, '');
              handleClose(index);
            }}
            variant="contained"
            color="primary"
          >
            Thêm
          </Button>
        </FormControl>
      </Popover>
    </Box>
  );
};
const MathInput = ({ listSection, value, onValueChange, index }) => {
  const val = value;
  return (
    <Box>
      <math-field
        key={['recipient', index].join('_')}
        //onChange={(e) => console.log(e.target.value)}

        onInput={(e) => onValueChange(e.target.value, index)}
        value={value}
      ></math-field>
    </Box>
  );
};
const InputView = ({ listSection, selectedIndex, onValueChange }) => {
  console.log(listSection);
  return listSection[selectedIndex].type == 'txt' ? (
    <TextField
      size="small"
      sx={{
        width: '100%',
        //  listSection[index].value.length * 9 > 80
        //</Box>? listSection[index].value.length * 9
        // : 80,
      }}
      onChange={(e) => onValueChange(e.target.value, selectedIndex)}
      value={listSection[selectedIndex].value}
    ></TextField>
  ) : (
    <MathInput
      value={listSection[selectedIndex].value}
      onValueChange={onValueChange}
      index={selectedIndex}
    />
  );
};
const ListSection = ({
  listSection,
  handleClose,
  handleClick,
  addSection,
  onSelectedChange,
  deleteSection,
  selectedIndex,
  handleChange,
}) => {
  console.log(listSection);
  return (
    <Paper sx={{ display: 'flex', flex: 11, padding: 2, flexWrap: 'wrap' }}>
      {listSection.map((e, index) => (
        <SectionView
          key={index}
          deleteSection={deleteSection}
          item={e}
          index={index}
          onSelectedChange={onSelectedChange}
          selectedIndex={selectedIndex}
          handleClick={handleClick}
          handleClose={handleClose}
          addSection={addSection}
          handleChange={handleChange}
        />
      ))}
    </Paper>
  );
};

const Test = ({ content, onSectionChange }) => {
  const [style, setStyle] = useState({
    textDecoration: 'underline',
    fontStyle: 'italic',
    fontWeight: null,
  });
  const onStyleTextDecorationChange = (index) => {
    const list = listSection;
    if (list[index].style.textDecoration == null) {
      list[index].style.textDecoration = 'underline';
      setListSection(list);
      setIndex(inx + 1);
    } else {
      list[index].style.textDecoration = null;
      setListSection(list);
      setIndex(inx + 1);
    }
  };
  const onStyleFontChange = (index) => {
    const list = listSection;
    if (list[index].style.fontStyle == null) {
      list[index].style.fontStyle = 'italic';
      setListSection(list);
      setIndex(inx + 1);
    } else {
      list[index].style.fontStyle = null;
      setListSection(list);
      setIndex(inx + 1);
    }
  };
  const onStyleFontWeightChange = (index) => {
    const list = listSection;
    if (list[index].style.fontWeight == null) {
      list[index].style.fontWeight = 'bold';
      setListSection(list);
      setIndex(inx + 1);
    } else {
      list[index].style.fontWeight = null;
      setListSection(list);
      setIndex(inx + 1);
    }
  };
  const onStyleTextColorChange = (index, value) => {
    const list = listSection;
    list[index].style.color = value;
    setListSection(list);
    setIndex(inx + 1);
  };
  const [value, setValue] = useState('');
  const [inx, setIndex] = useState(0);
  const [listSection, setListSection] = useState(content);
  useEffect(() => {
    console.log('ok');
    const list = listSection;
    onSectionChange(list);
  }, [listSection]);
  const onValueChange = (value, index) => {
    let item = listSection[index];

    item.value = value;
    let list = listSection;
    list[index].value = value;
    //setListSection([...listSection, item]);
    setListSection(list);
    onSectionChange(list);
    setIndex(inx + 1);
  };
  const addSection = (type, index, value) => {
    let item = {
      type: type,
      value: value,
      add: null,
      style: {
        textDecoration: null,
        fontStyle: null,
        fontWeight: null,
      },
    };
    let list = listSection;
    list.splice(index, 0, item);
    setListSection(list);

    setIndex(inx + 1);
  };
  const deleteSection = (index) => {
    let list = listSection;
    list.splice(index, 1);
    setListSection(list);
    onSectionChange(list);
    setIndex(inx + 1);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, index) => {
    let list = listSection;
    list[index].add = event.currentTarget;
    setListSection(list);
    setIndex(inx + 1);
  };

  const handleClose = (index) => {
    let list = listSection;
    list[index].add = null;
    setListSection(list);
    setIndex(inx + 1);
  };

  const [val, setVal] = useState('txt');

  const handleChange = (event) => {
    setVal(event.target.value);
  };
  useEffect(() => {
    console.log(listSection);
  }, [inx]);

  //////

  /*const mf = useRef();

  // Customize the mathfield when it is created
  useEffect(() => {
    mf.current.mathVirtualKeyboardPolicy = 'auto';
    mf.current.addEventListener('focusin', (evt) => window.mathVirtualKeyboard.show());
    mf.current.addEventListener('focusout', (evt) => window.mathVirtualKeyboard.hide());
  }, []);
*/
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const onSelectedChange = (value) => {
    setSelectedIndex(value);
  };
  const isShowColorPickerChange = () => {
    setIsShowColorPicker(!isShowColorPicker);
  };
  const [show, setShow] = useState(false);
  return (
    <Box sx={{ width: '45%' }}>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <ListSection
          listSection={listSection}
          deleteSection={deleteSection}
          handleClick={handleClick}
          selectedIndex={selectedIndex}
          onSelectedChange={onSelectedChange}
          handleClose={handleClose}
          addSection={addSection}
          handleChange={handleChange}
        />
        <IconButton
          sx={{ flex: 1 }}
          onClick={() => {
            setShow(!show);
          }}
        >
          <Icon color="primary">edit_mode</Icon>
        </IconButton>
      </Box>
      {show && (
        <Box>
          <Box sx={{ display: 'flex' }}>
            <IconButton
              onClick={() => {
                onStyleFontWeightChange(selectedIndex);
              }}
              name="bold"
              sx={{}}
            >
              <Icon
                style={{
                  fontSize: 20,
                  color: listSection[selectedIndex].style.fontWeight != null ? 'black' : null,
                }}
              >
                format_bold
              </Icon>
            </IconButton>
            <IconButton
              onClick={() => {
                onStyleFontChange(selectedIndex);
              }}
              sx={{}}
            >
              <Icon
                style={{
                  fontSize: 20,
                  color: listSection[selectedIndex].style.fontStyle != null ? 'black' : null,
                }}
              >
                format_italic
              </Icon>
            </IconButton>
            <IconButton
              onClick={() => {
                onStyleTextDecorationChange(selectedIndex);
              }}
              sx={{}}
            >
              <Icon
                style={{
                  fontSize: 20,
                  color: listSection[selectedIndex].style.textDecoration != null ? 'black' : null,
                }}
              >
                format_underline
              </Icon>
            </IconButton>
            <IconButton onClick={() => isShowColorPickerChange()}>
              <Icon style={{ fontSize: 20, color: listSection[selectedIndex].style.color }}>
                format_color_text
              </Icon>
            </IconButton>
          </Box>
          <Collapse in={isShowColorPicker}>
            <CompactPicker
              value={listSection[selectedIndex].style.color}
              onChangeComplete={(e) => onStyleTextColorChange(selectedIndex, e.hex)}
            />
          </Collapse>
          <InputView
            listSection={listSection}
            selectedIndex={selectedIndex}
            onValueChange={onValueChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Test;
