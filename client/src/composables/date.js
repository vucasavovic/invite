const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };


export function useHumanDate(dateObj){
    const dateString = "Day name, Month name MM. YYYY."
    
    const date = new Date(dateObj.year,dateObj.month-1,dateObj.day);
 
    return  date.toLocaleDateString("en-US", options);
}

export function toMysqlDate(dateObj){
  return dateObj.year + '-' + dateObj.month + '-' + dateObj.day 
}

export function fromMysqlDate(mysqlDate){
  const dateChunks = mysqlDate.split('-');
  return {day:dateChunks[2],month:dateChunks[1],year:dateChunks[0]}
}