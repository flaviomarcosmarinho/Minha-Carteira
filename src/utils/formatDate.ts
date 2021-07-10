const formatDate = (date: string): string => {
    const dateFormatted = new Date(date);
    const year = dateFormatted.getFullYear();
    
    //O dia começa a contar do 0.
    let day = dateFormatted.getDate() + 1;
    let dayFinal = (day > 9 ? day : `0${day}`);

    //O mês começa a contar do 0, (Janeiro = 0).
    let month = dateFormatted.getMonth() + 1;
    let monthFinal = (month > 9) ? month : `0${month}`;
    

    return `${dayFinal}/${monthFinal}/${year}`;
};

export default formatDate;