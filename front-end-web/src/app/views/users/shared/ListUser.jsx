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
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Typography,
  Avatar,
  Modal,
  Switch,
  Tooltip,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import da from 'date-fns/esm/locale/da/index.js';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios.js';
import swal from 'sweetalert';
import useAuth from 'app/hooks/useAuth';
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
const ModalSetState = ({ show, user, onModalClose, getListUser }) => {
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [roles, setRoles] = useState([]);
  const onRoleChange = (role, event) => {
    if (event.target.checked) {
      let list = roles;
      list.push(role);
      setRoles([...roles, role]);
    } else {
      let list = roles;
      list.splice(list.indexOf(role), 1);
      setRoles(roles.filter((e) => e !== role));
    }
  };
  useEffect(() => {
    let list = [];
    user?.roles.map((e, i) => {
      switch (e.name) {
        case 'ROLE_ADMIN':
          list.push('admin');
          break;
        case 'ROLE_MODERATOR':
          list.push('mod');
          break;
        default:
          list.push('user');
      }
    });
    setRoles(list);
    console.log(list);
  }, [user]);
  useEffect(() => {
    console.log(roles);
    console.log(roles.indexOf('user'));
  }, [roles]);
  const onSubmit = async () => {
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_API_URL}/admin/user/editUser/${user.id}`, roles)
        .then((re) => {
          swal('Cập nhật thành công', {
            icon: 'success',
          });
          getListUser();
        });
      getListUser();
      onModalClose();
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };
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
          width: 500,
          height: 500,
          bgcolor: 'white',
          // border: '1px solid #000',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ flex: 2 }}>ID: </Typography>
          <Typography sx={{ flex: 6, fontWeight: 'bold' }}>{user?.id}</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ flex: 2 }}>Tên: </Typography>
          <Typography sx={{ flex: 6, fontWeight: 'bold' }}>{user?.username}</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ flex: 2 }}>Email: </Typography>
          <Typography sx={{ flex: 6, fontWeight: 'bold' }}>{user?.email}</Typography>
        </Box>
        {user?.enabled ? (
          <Box
            sx={{
              display: 'flex',
              //marginLeft: 2,
              //padding: 1,
              // border: 1,
              borderRadius: 5,
              borderColor: 'green',
            }}
          >
            <Typography sx={{ flex: 2 }}>Đã kích hoạt</Typography>
            <Box sx={{ flex: 6 }}>
              <Icon sx={{ color: 'green' }}>check_circle</Icon>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              //marginLeft: 2,
              // padding: 1,
              //border: 1,
              borderRadius: 5,
              borderColor: 'red',
            }}
          >
            <Typography sx={{ flex: 2 }}>Chưa kích hoạt</Typography>
            <Box sx={{ flex: 6 }}>
              <Icon sx={{ color: 'red' }}>cancel</Icon>
            </Box>
          </Box>
        )}
        <Box sx={{ width: '100%', height: '1px', background: 'gray', marginY: 2 }}></Box>

        <Box sx={{ marginTop: 3 }}>
          <Typography sx={{ fontWeight: 'bold' }}> Phân quyền</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => onRoleChange('user', e)}
                  checked={roles.indexOf('user') >= 0}
                />
              }
              label="User"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => onRoleChange('admin', e)}
                  checked={roles.indexOf('admin') >= 0}
                />
              }
              label="Admin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => onRoleChange('mod', e)}
                  checked={roles.indexOf('mod') >= 0}
                />
              }
              label="Moderator"
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            // width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button onClick={() => onSubmit()} variant="contained" color="primary">
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
const ListUser = () => {
  const { user } = useAuth();
  console.log(user);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(10);
  const [listUser, setListUser] = useState([]);
  const [key, setKey] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(listUser[0]);
  const onModalClose = () => {
    setIsShowModal(false);
  };
  const onModalShow = (item) => {
    setSelectedItem(item);
    setIsShowModal(true);
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const onKeyChange = (value) => {
    setKey(value);
  };
  const getListUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/user/getListUser/${page}/${rowsPerPage}?key=${key}`
      );
      //const da = await res.json();
      setListUser(res.data.content);
      setTotal(res.data.totalElement);
      console.log(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getListUser();
  }, []);
  useEffect(() => {
    getListUser();
  }, [page, rowsPerPage, key]);
  const setState = async (id) => {
    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}/admin/user/setState/${id}`)
        .then((re) => {
          //console.log(re.data.message);
          swal(re.data.message, {
            icon: 'success',
          });
          getListUser();
        });
    } catch (err) {
      swal(err.message, {
        icon: 'error',
      });
    }
  };
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      //children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

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
          Quản lý tài khoản
        </Typography>
      </Box>
      <Box width="100%">
        <Filter sx={{ display: 'flex' }}>
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
        </Filter>

        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell width={80} align="center"></TableCell>
              <TableCell width={50} align="center">
                ID
              </TableCell>
              <TableCell width={180} align="center">
                Tên
              </TableCell>
              <TableCell width={300} align="center">
                Email
              </TableCell>
              <TableCell width={100} align="center">
                Trạng thái
              </TableCell>
              <TableCell width={400} align="center">
                Quyền
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUser?.map((subscriber, index) => (
              <TableRow
                key={index}
                style={{
                  cursor: user.username != subscriber.username ? 'default' : 'not-allowed',
                }}
              >
                <TableCell align="center">
                  <Avatar {...stringAvatar(subscriber.username.toUpperCase())}>
                    {subscriber.username[0].toUpperCase()}
                  </Avatar>
                </TableCell>
                <TableCell align="center">{subscriber.id}</TableCell>
                <TableCell align="center">{subscriber.username}</TableCell>
                <TableCell align="center">{subscriber.email}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Cập nhật trạng thái">
                    {subscriber.enabled ? (
                      <IconButton
                        disabled={user.username == subscriber.username}
                        onClick={() => setState(subscriber.id)}
                      >
                        {subscriber.sta ? (
                          <Icon sx={{ color: 'green' }}>check_circle</Icon>
                        ) : (
                          <Icon sx={{ color: 'red' }}>lock_outline</Icon>
                        )}
                      </IconButton>
                    ) : (
                      <Icon sx={{ color: 'gray' }}>power_settings_new</Icon>
                    )}
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {subscriber.roles
                      .sort((a, b) => a.id - b.id)
                      .map((e, i) => (
                        <Box
                          sx={{
                            padding: 1,
                            // border: 2,
                            borderRadius: 2,
                            marginX: 2,
                            backgroundColor:
                              e.name.substring(5) == 'USER'
                                ? '#1978c7'
                                : e.name.substring(5) == 'ADMIN'
                                ? '#ff9009'
                                : e.name.substring(5) == 'MODERATOR'
                                ? 'red'
                                : 'green',
                          }}
                        >
                          <Typography key={i} sx={{ fontWeight: 'bold', color: 'white' }}>
                            {e.name.substring(5)}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  {user.authorities.filter((e) => e.authority == 'ROLE_ROOT').length > 0 && (
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        disabled={user.username == subscriber.username}
                        onClick={() => onModalShow(subscriber)}
                      >
                        <Icon color="primary">mode_edit</Icon>
                      </IconButton>
                    </Tooltip>
                  )}
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
      <ModalSetState
        show={isShowModal}
        user={selectedItem}
        onModalClose={onModalClose}
        getListUser={getListUser}
      />
    </Container>
  );
};

export default ListUser;
