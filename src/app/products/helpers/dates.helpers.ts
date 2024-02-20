export function getFormattedDate() {
    
    const currentDate = new Date();
    return formatDate(currentDate);
}

export function getNextYearFormattedDate(date: string) {

    var selectedDateTime = new Date(date).getTime();
    var milliseconsInYear = (366 * 24 * 60 * 60 * 1000);
    var nextYearDate = new Date(selectedDateTime + milliseconsInYear);
    
    return formatDate(nextYearDate);
}

function formatDate(date: Date){

    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    
    return `${date.getFullYear()}-${month}-${day}`;
}