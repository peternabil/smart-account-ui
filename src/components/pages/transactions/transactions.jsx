import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/table/table";
import { createTransaction, getTransactions } from "../../../apis/transaction";
import { Autocomplete, Box, Button, Checkbox, Fab, FormControlLabel, TextField, Typography } from "@mui/material";
import { CreateCols } from "../../../helpers/utils";
import SimpleBackdrop from "../../ui/backdrop/backdrop";
import { createCategory, getCategories } from "../../../apis/category";
import { createPriority, getPriorities } from "../../../apis/priority";
import CreateCategory from "../../ui/create-category/create-category";
import CreatePriority from "../../ui/create-priority/create-priority";

function Transactions(){
    const IgnoreList = ['DeletedAt', 'UpdatedAt', 'CategoryID', 'PriorityID', 'UserID', 'ID']
    const TableOrder = ['Title', 'Description']

    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [priorities, setPriorities] = useState([])
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false);
    const [openprio, setOpenprio] = useState(false);
    const [opencat, setOpencat] = useState(false);

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)
    const [negative, setNegative] = useState(false)

    const [pageSize, setPageSize] = useState(10)
    const nextPage = (p) => {
        getTransactionsCall(p+1, pageSize)
    }
    const changePageSx = (ps) => {
        setPageSize(ps)
        getTransactionsCall(1, ps)
    }
    const getTransactionsCall = (p, ps) => {
        getTransactions(p,ps).then((res)=> {
            const mappedTransactions = res.data.transactions.map((t) => {
                return {
                    ...t,
                    Category: t.Category.Name,
                    Priority: t.Priority.Name,
                }
            });
            setColumns(CreateCols(mappedTransactions, IgnoreList, TableOrder));
            setRows(mappedTransactions);
        })
    }
    const getCategoriesCall = () => {
        getCategories().then((res)=> {
            setCategories(res.data.categories);
        })
    }
    const getPrioritiesCall = () => {
        getPriorities().then((res)=> {
            setPriorities(res.data.priorities);
        })
    }
    useEffect(() => {
        getTransactionsCall(0,10);
        getCategoriesCall()
        getPrioritiesCall()
    }, [])
    const createNewCategory = (name, description) => {
        createCategory(name, description).then((res)=> {
            getCategoriesCall();
            setOpencat(false)
        })
    }
    const createNewPriority = (name, description, level) => {
        createPriority(name, description, level).then((res)=> {
            getPrioritiesCall();
            setOpenprio(false);
        })
    }
    const isValid = () => {
        return title.length !== 0 || description.length !== 0 || category.length !== 0 || priority.length != 0 || amount.length !== 0 
    }
    const createTrans = () => {
        if (isValid()){
            console.log({title, category, amount, negative, description, priority})
            createTransaction(title, category.ID, parseInt(amount), negative, description, priority.ID).then((res) => {
                console.log(res)
                getTransactionsCall(1,10)
                setOpen(false)
            })
        }
    }
    return (
        <> 
            <Box p={1}>
                <Box display={'flex'} justifyContent={'space-between'} marginTop={2} marginBottom={4}>
                    <Typography variant={"h4"}>
                        Transactions
                    </Typography>
                    <SimpleBackdrop open={open} setOpen={setOpen}>
                        <Box padding={2} display={'flex'} flexWrap={'wrap'} gap={3} alignItems={'center'} justifyContent={'space-between'}>
                            <TextField fullWidth id="title" label="Title" variant="outlined" value={title} onChange={(e, newValue) => setTitle(e.target.value)} />
                            <TextField fullWidth multiline id="description" label="Description" variant="outlined" value={description} onChange={(e, newValue) => setDescription(e.target.value)} />
                            <TextField id="amount" type={'number'} label="Amount" variant="outlined" value={amount} onChange={(e, newValue) => setAmount(e.target.value)} />
                            <FormControlLabel required control={<Checkbox />} label="Negative" value={negative} onChange={(e, newValue) => setNegative(newValue)} />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={categories.map((obj) => {
                                    return {...obj, label: obj.Name}
                                })}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                                value={category}
                                onChange={(event, newValue) => {
                                    setCategory(newValue);
                                }}
                            />
                            <CreateCategory open={opencat} setOpen={setOpencat} createFn={createNewCategory} />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={priorities.map((obj) => {
                                    return {...obj, label: obj.Name}
                                })}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
                                value={priority}
                                onChange={(event, newValue) => {
                                    setPriority(newValue);
                                }}
                            />
                            <CreatePriority open={openprio} setOpen={setOpenprio} createFn={createNewPriority} />
                            <Button variant="contained" onClick={() => createTrans()}>Add Transaction</Button>
                        </Box>
                    </SimpleBackdrop>
                </Box>
                <Box>
                    <StyledTable columns={columns} rows={rows} changePage={nextPage} changeRowsPerPage={changePageSx} />
                </Box>
            </Box>
        </>
    );
}

export default Transactions;