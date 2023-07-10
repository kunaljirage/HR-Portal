import React, { useEffect } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import { Button, IconButton, Typography } from '@mui/material';
import { Print } from '@mui/icons-material';


const DeductionList = () => {
  
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [deductionList, setDeductionList] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  useEffect(()=>{
    try {
      getDeductionList();
    } catch (error) {
      console.log(error)
    }
  },[])

  useEffect(()=>{
    let data=[];
    deductionList.map((deduction)=>{
      data.push(createData(deduction.user_id,deduction.user_name,deduction.total_deduction,deduction.salary))
    })
    setRows([...rows,...data])
    // console.log("add row run >> ")
  },[deductionList])

  const getDeductionList = async () => {
    let date = new Date();
    let month = "0" + (date.getMonth() + 1);
    // setCurrentMonth(date.getFullYear() + "-" + month.slice(-2))
    let currentMonth = date.getFullYear() + "-" + month.slice(-2)
    const deductions=await axios.post("user/getAllDeduction",{"payroll_month":currentMonth});
    const deductionsData=await deductions.data;
    setDeductionList(deductionsData)
    console.log("deductionsList >> ",deductionsData)
  }


  function createData(user_id, user_name, total_deduction, salary) {
    return { user_id, user_name,total_deduction,salary };
  }
  
 

  function handleChangePage(event, newpage) {
      setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
      setrpg(parseInt(event.target.value, 10));
      setpg(0);
  }
  
  const generatePDF = (id) => {
    axios.get(`user/generate_pdf/${id}.pdf`, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    })
    .then((response)=>{
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Report.pdf');
      document.body.appendChild(link);
      link.click();
    }).catch((err)=>{
      console.log("Error", err);
  
    })
  }

  function ListOfUsers (){
    return(
      <Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Basic salary</TableCell>
                            <TableCell>Total Deduction</TableCell>
                            <TableCell>Export</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(pg * rpg, pg * rpg + rpg).map((row,index) => (
                            <TableRow
                                key={index}
                                sx={{ "&:last-child td,&:last-child th": { border: 0 } }}
                            >
                                <TableCell>
                                    {row.user_id}
                                </TableCell>
                                <TableCell>
                                    {row.user_name}
                                </TableCell>
                                <TableCell>
                                    {row.salary}
                                </TableCell>
                                <TableCell>
                                    {row.total_deduction}
                                </TableCell>
                                <TableCell>
                                  <IconButton onClick={()=>generatePDF(row.user_id)} color="primary" aria-label="generate pdf"><Print/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                      }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </Paper>
    )
  }

 
  return (
    <>
     {
      rows.length > 0 ?  <ListOfUsers /> : 
      <Table><TableHead><TableRow><TableCell><Typography>No Data Found</Typography></TableCell></TableRow></TableHead></Table>
     }
    </>
  )
}

export default DeductionList