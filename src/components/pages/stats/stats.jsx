import React from "react";
import { getDialySpending, getHighestCategory, getHighestPriority } from "../../../apis/analatics";
import CustomLineChart from "../../ui/chart/line-chart";
import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import BasicPie from "../../ui/chart/pie-chart";

function Stats({yearly}) {
    const [thisMonthDataSpending, setThisMonthDataSpending] = React.useState([])
    const [thisMonthDataEarning, setThisMonthDataEarning] = React.useState([])
    const [prioritiesSpending, setPrioritiesSpending] = React.useState([])
    const [categoriesSpending, setCategoriesSpending] = React.useState([])
    const [totalSpendingMonth, setTotalSpendingMonth] = React.useState(0);
    const [totalEarningMonth, setTotalEarningMonth] = React.useState(0);
    const [lowPrioritySpending, setLowPrioritySpending] = React.useState(0);
    const [highestCategoryName, setHighestCategoryName] = React.useState('');
    React.useEffect(() => {
        let startDate = new Date()
        if (yearly == true) {
            startDate.setFullYear(startDate.getFullYear() - 1)
        }else {
            startDate.setMonth(startDate.getMonth() - 1)
        }
        let endDate = new Date()
        getDialySpending(startDate.toISOString(), endDate.toISOString(), true).then((res) => {
            console.log(res.data.spending)
            setThisMonthDataSpending(res.data.spending)
            let spendings = 0;
            res.data.spending.forEach(element => {
                spendings = spendings + element.Total
            });
            setTotalSpendingMonth(spendings)
        })
        getDialySpending(startDate.toISOString(), endDate.toISOString(), false).then((res) => {
            console.log(res.data.spending)
            setThisMonthDataEarning(res.data.spending)
            let spendings = 0;
            res.data.spending.forEach(element => {
                spendings = spendings + element.Total
            });
            setTotalEarningMonth(spendings)
        })
        getHighestCategory(startDate.toISOString(), endDate.toISOString(), true).then((res) => {
            console.log(res.data.spending)
            setCategoriesSpending(res.data.spending)
            setHighestCategoryName(res.data.spending.length > 0 ? res.data.spending[0].Cname : '')
        })
        getHighestPriority(startDate.toISOString(), endDate.toISOString(), true).then((res) => {
            console.log(res.data.spending)
            setPrioritiesSpending(res.data.spending)
            let lowPrioritySpend = 0;
            res.data.spending.forEach((ele) => {
                if (ele.Level < 5) {
                    lowPrioritySpend = lowPrioritySpend + ele.Total
                }
            })
            setLowPrioritySpending(lowPrioritySpend)
        })
    }, [yearly])
    const today = new Date()
    const lastMonth = new Date()
    const lastYear = new Date()
    lastMonth.setMonth(today.getMonth() - 1)
    lastYear.setFullYear(today.getFullYear() - 1)
    return (
        <Box display={'flex'} flexWrap={'wrap'} gap={5}>
            <Box width={'100%'} display={'flex'} flexWrap={'wrap'} gap={4} justifyContent={'start'}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Tooltip title={`total spending from ${yearly? lastYear.getMonth() : lastMonth.getDate()}/${yearly? lastYear.getFullYear() : lastMonth.getMonth()} till ${yearly? today.getMonth() : today.getDate()}/${yearly? today.getFullYear() : today.getMonth()}`} placement="bottom">
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Total spending this {yearly? 'year' : 'month'}
                            </Typography>
                        </Tooltip>
                        <Typography variant="h5" component="div">
                            {totalSpendingMonth}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Tooltip title={`total earnings from ${yearly? lastYear.getMonth() : lastMonth.getDate()}/${yearly? lastYear.getFullYear() : lastMonth.getMonth()} till ${yearly? today.getMonth() : today.getDate()}/${yearly? today.getFullYear() : today.getMonth()}`} placement="bottom">
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Total earnings this {yearly? 'year' : 'month'}
                            </Typography>
                        </Tooltip>
                        <Typography variant="h5" component="div">
                            {totalEarningMonth}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Tooltip title={`highest category of spending from ${yearly? lastYear.getMonth() : lastMonth.getDate()}/${yearly? lastYear.getFullYear() : lastMonth.getMonth()} till ${yearly? today.getMonth() : today.getDate()}/${yearly? today.getFullYear() : today.getMonth()}`} placement="bottom">
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Highest Spending Category
                            </Typography>
                        </Tooltip>
                        <Typography variant="h5" component="div">
                            {highestCategoryName}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Tooltip title={`total spendings from ${yearly? lastYear.getMonth() : lastMonth.getDate()}/${yearly? lastYear.getFullYear() : lastMonth.getMonth()} with priority less than 5`} placement="bottom">
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Low Priority Spending
                            </Typography>
                        </Tooltip>
                        <Typography variant="h5" component="div">
                            {lowPrioritySpending}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box display={'flex'} flexWrap={'wrap'} gap={4} justifyContent={'start'} height={'400px'}>
                <CustomLineChart color={"#e15759"} title={`Your spending this ${yearly? 'year' : 'month'}`} data={thisMonthDataSpending.map((datum) => datum.Total)} xaxis={thisMonthDataSpending.map((datum) => new Date(datum.Date))} />
            </Box>
            <Box display={'flex'} flexWrap={'wrap'} gap={4} justifyContent={'start'} height={'400px'}>
                <CustomLineChart color={"#59a14f"} title={`Your earnings this ${yearly? 'year' : 'month'}`} data={thisMonthDataEarning.map((datum) => datum.Total)} xaxis={thisMonthDataEarning.map((datum) => new Date(datum.Date))} />
            </Box>
            <Box width={'100%'}>
                <Box flexGrow={1}>
                    <BasicPie title={`This ${yearly? 'year' : 'month'}\'s spendings by category`} data={categoriesSpending.map((datum) => {
                        return {
                            ...datum,
                            label: datum.Cname,
                            value: datum.Total
                        }
                    })} />
                </Box>
                <Box flexGrow={1}>
                    <BasicPie title={`This ${yearly? 'year' : 'month'}\'s spendings by priority`} data={prioritiesSpending.map((datum) => {
                        return {
                            ...datum,
                            label: datum.Pname,
                            value: datum.Total
                        }
                    })} />
                </Box>
            </Box>
        </Box>
    );
}

export default Stats;