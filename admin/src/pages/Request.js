import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToast } from '@chakra-ui/react'

// components
import { DoctorPopup } from '../components/doctor-modal/DoctorPopup';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'hospital', label: 'Hospital', alignRight: false },
  { id: 'speciality', label: 'Speciality', alignRight: false },
  { id: 'council', label: 'Council', alignRight: false },
  { id: 'regno', label: 'RegNo', alignRight: false },
  { id: 'year', label: 'Year', alignRight: false },
  { id: 'action',label:'action',alignRight:false}, 
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}




function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.Close()
  };

  const handleSubmit = () => {
    // Do something with the reason entered
    console.log(reason);
    props.submit(reason)
  };

  return (
    <div>
     
      <Dialog open={props.Open} onClose={handleClose}>
        <DialogTitle>Confirm Reject</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Reason for Reject
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={reason}
          onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function RequestPage() {
  const toast = useToast()
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');
  
  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pOpen, setPOpen] = useState(false);

  const [dialog,setDialog]= useState()
  
  const [USERLIST, setUserList] = useState([{}])
  const handleOpenMenu = (event,id) => {
    console.log(id)
    sessionStorage.setItem('selectId',id)
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const getPendingReq =  () => {
  
    axios.get(`${process.env.REACT_APP_API_URL}admin/getPendingReq`)

    .then((response) => {
      console.log(response);
      setUserList(response.data);
    }).catch((err) => {
      console.log(err);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    )
  }
  useEffect(() => {
   getPendingReq();
    }, []);

    const acceptReq = ()=>{
      const id = sessionStorage.getItem('selectId')
      try{
        axios.post(`${process.env.REACT_APP_API_URL}admin/getPendingReq`,{id})
        .then((response)=>{
          console.log(response)
          getPendingReq();
          setOpen(null)
        })
      }catch(err){
        console.log(err)
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
       
        setOpen(null)

      }
    }

    const RejectReq = ()=>{
    console.log("hee")
    setfOpen(true)
    }

    const getReason =(reason)=>{
   
      if(reason){
        setfOpen(false);
        const id = sessionStorage.getItem('selectId')
        try{
          axios.post(`${process.env.REACT_APP_API_URL}admin/rejectReq`,{id,reason})
          .then((response)=>{
            console.log(response)
            getPendingReq();
            setOpen(null)
  
          })
        }catch(err){
          toast({
            title: 'Error',
            description: 'Something went wrong',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
  
          console.log(err)
          alert('error')
          setOpen(null)
  
        }
      }else{
        toast({
          title: 'Error',
          description: 'Specify Reason for blocking',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  

    
const handleClose= ()=>{
  setPOpen(false)
  setDialog('')
}
    const setPopup = (e,Id)=>{
      console.log(Id)
      
      setPOpen(true)
     
  setDialog(()=>(
    <DoctorPopup
    Id={Id}
    Open={Boolean(true)}
    Close={handleClose}
    />
  ))

 


    }
    const [fOpen,setfOpen]=useState(false)

    const fClose = () => {
      setfOpen(false);
    }

  return (
    <>
      <Helmet>
        <title> Request |  HSTORY </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Request
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Request
          </Button> */}
        </Stack>
        <FormDialog Open={fOpen} Close={fClose} submit={getReason} />
 {dialog}
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, DocName, Hospital, Speciality, RegistrationCouncil, RegistrationNo, RegYear,action } = row;
                    const selectedUser = selected.indexOf(DocName) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                       
                        <TableCell component="th" scope="row" padding="none" sx={{cursor:'pointer'}} onClick={(e)=>{setPopup(e,_id)}} >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={DocName}  />
                            <Typography variant="subtitle2" noWrap>
                              {DocName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{Hospital}</TableCell>

                        <TableCell align="left">{Speciality}</TableCell>

                        <TableCell align="left">{RegistrationCouncil}</TableCell>

                        <TableCell align="left">{RegistrationNo}</TableCell>

                        <TableCell align="left">{RegYear}</TableCell>
                     

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e)=>handleOpenMenu(e,_id)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={()=>{acceptReq()}}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Accept
        </MenuItem>

        <MenuItem onClick={()=>{RejectReq()}} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Reject
        </MenuItem>
      </Popover>
    </>
  );
}
