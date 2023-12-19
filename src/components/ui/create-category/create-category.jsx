import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import SimpleBackdrop from "../backdrop/backdrop";

function CreateCategory({createFn, open, setOpen}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    return (
        <SimpleBackdrop btntitle={"Add category"} opacity={0.9} open={open} setOpen={setOpen} color={'black'}>
            <TextField  fullWidth value={name} onChange={(e) => setName(e.target.value)} id="name" label="Name" variant="outlined" />
            <TextField  fullWidth multiline value={description} onChange={(e) => setDescription(e.target.value)} id="description" label="Discription" variant="outlined" />
            <Button variant="contained" disabled={name.length === 0 || description.length === 0} onClick={() => createFn(name, description)}>Add Category</Button>
        </SimpleBackdrop>
    );
}

export default CreateCategory;