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
  Typography,
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
const ListTransaction = () => {
  const location = useLocation();
  const { documentId } = location.state;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(10);
  const [listTransaction, setListTransaction] = useState([]);
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getListTransaction = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/document/getTransactionByDocumentId/${documentId}/${page}/${rowsPerPage}`
    );
    setListTransaction(res.data.content);
    setTotal(res.data.totalElement);
  };
  useEffect(() => {
    getListTransaction();
  }, []);
  useEffect(() => {
    getListTransaction();
  }, [page, rowsPerPage]);

  return (
    <Container>
      <Box width="100%">
        {listTransaction?.length > 0 ? (
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
              {listTransaction.length}
            </Typography>
            <Typography sx={{ fontSize: 18, marginLeft: '8px' }}>lượt tải</Typography>
          </Box>
        ) : (
          <Typography sx={{ fontSize: 18 }}>Chưa có lượt tải nào</Typography>
        )}
      </Box>
      <Box width="100%">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tài liệu</TableCell>
              <TableCell align="center">Tài khoản</TableCell>
              <TableCell align="center">Giá trị</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listTransaction?.map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="center">{subscriber.id}</TableCell>
                <TableCell align="center">{subscriber.document.name}</TableCell>
                <TableCell align="center">{subscriber.user.username}</TableCell>
                <TableCell align="center">{subscriber.amount}</TableCell>
                <TableCell align="center" sx={{ width: '30px', height: '40px' }}>
                  {moment(subscriber.created_at).format('L')}
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

export default ListTransaction;
