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
  Tooltip,
} from '@mui/material';
import { NavLinkimport, useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import da from 'date-fns/esm/locale/da/index.js';
import { useState, useEffect } from 'react';
import axios from 'axios.js';
import swal from 'sweetalert';
import moment from 'moment';
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
const ListExamCompleted = () => {
  const location = useLocation();
  const { examId } = location.state;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(10);
  const [ListExamCompleted, setListExamCompleted] = useState([]);
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getListExamCompleted = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/exam/getExamCompletedByExamId/${examId}/${page}/${rowsPerPage}`
    );
    setListExamCompleted(res.data.content);
    setTotal(res.data.totalElement);
  };
  useEffect(() => {
    getListExamCompleted();
  }, []);
  useEffect(() => {
    getListExamCompleted();
  }, [page, rowsPerPage]);

  return (
    <Container>
      <FormControl></FormControl>
      <Box width="100%">
        <Filter sx={{ display: 'flex' }}></Filter>

        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Số câu đùng</TableCell>
              <TableCell align="center">Thời gian làm bài</TableCell>
              <TableCell align="center">Tài khoản</TableCell>
              <TableCell align="center">Ngày làm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListExamCompleted?.map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="center">{subscriber.id}</TableCell>
                <TableCell align="center">
                  {subscriber.correctAnswers + '/' + subscriber.totalQuestion}
                </TableCell>
                <TableCell align="center">
                  {Math.floor(subscriber.time / 60)
                    .toString()
                    .padStart(2, '0')}{' '}
                  :{(subscriber.time % 60).toString().padStart(2, '0')}
                </TableCell>
                <TableCell align="center">{subscriber.user.username}</TableCell>
                <TableCell align="center" sx={{ width: '30px', height: '40px' }}>
                  {moment(subscriber.day).format('L')}
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

export default ListExamCompleted;
