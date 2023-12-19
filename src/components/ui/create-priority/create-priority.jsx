import { Box, Button, FormControl, InputLabel, Slider, TextField } from "@mui/material";
import React, { useState } from "react";
import SimpleBackdrop from "../backdrop/backdrop";

function CreatePriority({createFn, open, setOpen}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(1);
    
    return (
        <SimpleBackdrop btntitle={"Add priority type"} open={open} setOpen={setOpen} opacity={0.9} color={'black'}>
            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} id="name" label="Name" variant="outlined" />
            <TextField multiline fullWidth value={description} onChange={(e) => setDescription(e.target.value)} id="description" label="Discription" variant="outlined" />
                <InputLabel htmlFor="my-input">Level</InputLabel>
                <Slider
                    aria-label="level"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    value={level}
                    size={'small'}
                    onChange={(e, value) =>{
                        setLevel(value)
                        console.log(value)
                    }}
                />
            <Button variant="contained" bg={'primary'} disabled={name.length === 0 || description.length === 0} onClick={() => createFn(name, description, level)}>Add Priority</Button>
        </SimpleBackdrop>
    );
}

export default CreatePriority;