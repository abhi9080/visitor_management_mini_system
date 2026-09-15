import axios from 'axios';
import React, { useEffect, useState } from 'react';
import visitorsData from "../assets/visitor.js"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { RootState, AppDispatch } from "../app/store.js";
import { fetchVisitors } from "../app/VisitorSlice.js";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const VisitorList = () => {
    const dispatch = useDispatch<AppDispatch>();

  const { visitors, loading, error } = useSelector(
    (state: RootState) => state.visitors
  );

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


    const handleDelete = async()=>{
      try {
        const {data} = await axios.delete(`/visitor/:id`)

        if(data?.success){
          toast.success(data?.msg)
        }
        else{
toast.error(data?.msg)
        }
      } catch (error) {
        console.log("Error in handleDelete",error)
        toast.error("Something went wrong")
      }
    }

  return (
    <>
      <div>
        {/* <table className='table-auto rounded-md
'>
          <thead>
  <tr className="">
    <th className="border px-4 py-2">Name</th>
    <th className="border px-4 py-2">Phone</th>
    <th className="border px-4 py-2">Unit</th>
    <th className="border px-4 py-2">Visitor Date</th>
    <th className="border px-4 py-2">Status</th>
    <th className="border px-4 py-2">Action</th>
  </tr>
</thead>
          <tbody>
            {visitors?.map((val,index)=>{
            return <tr key={val?.id}>
              <td>{val?.name}</td>
              <td>{val?.phone}</td>
              <td>{val?.unitNumber}</td>
              <td>{val?.visitDate}</td>
              <td>{val?.status}</td>
              <td>
                <button type='button' className='rounded rounded-full'>Approve</button>
                <button type='button' className='rounded rounded-full'>Reject</button>
                <button type='button' className='rounded rounded-full'>Delete</button>
              </td>
            </tr>
            })}
          </tbody>
        </table> */}

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>


    
    </>
  );
}

export default VisitorList;
