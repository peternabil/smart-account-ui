import moment from "moment-timezone";

export function CreateCols(data, ignoreList, order) {
    let res = [];
    if (data.length === 0){
        return [];
    }
    order.forEach(firstKey => {
        res.push({ id: firstKey, label: firstKey, minWidth: 170, type: typeof data[0][firstKey] })
    })
    Object.keys(data[0]).forEach(key => {
        console.log(ignoreList.find((val) => val.toLowerCase() === key.toLowerCase()))
        
        if (!ignoreList.find((val) => val === key) && !order.find((val) => val === key)){
            let col = { id: key, label: key, minWidth: 170,  }
            if (key === 'CreatedAt') {
                col.type = 'date'
            }else {
                col.type = typeof data[0][key]
            }
            res.push(col)
        }
    });
    return res;
}

export function formatDate(date) {
    const newDate = new Date(date)
    return moment(date)
      .utcOffset(moment().utcOffset())
      .format("DD/MM/YYYY, HH:mm:ss");
}