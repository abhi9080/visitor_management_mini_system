import React, { useState } from 'react';
import axios from "axios"
import {toast} from "react-toastify"
import {TextField,Button} from "@mui/material"

type VisitorType={
    name:string,phone:string,unitNumber:string,visitDate:string
}

const AddVisitor = () => {
    const [visitorData,setVisitorData] = useState<VisitorType>({
        name:"",phone:"",unitNumber:"",visitDate:""
    })

    const handleChange = async(event:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = event.target

        setVisitorData({...visitorData,[name]:value})
    }

    const handleSubmit = async()=>{
        try {
            const {data} = await axios.post(`visitors`,visitorData)

            if(data?.success){
                toast.success(data?.msg)
            }
            else{
                toast.error(data?.msg)
            }
        } catch (error) {
            console.error("Error in handleSubmit",error)
            toast.error("Something Went Wrong")

        }
    }

    return (
    <>
      <TextField id="outlined-basic" label="Outlined" variant="outlined"  value={visitorData?.name} onChange={handleChange}/>
          
    <TextField id="outlined-basic" label="Outlined" variant="outlined"  value={visitorData?.phone} onChange={handleChange}/>
   
    <TextField id="outlined-basic" label="Outlined" variant="outlined"  value={visitorData?.unitNumber} onChange={handleChange}/>
   
    <TextField id="outlined-basic" label="Outlined" variant="outlined"  value={visitorData?.visitDate} onChange={handleChange}/>
      
    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      
    </>
  );
}

export default AddVisitor;
