export function getFormattedDate(date) {
    if(!date) return;
    var tempDate = new Date(date);
    var month = (tempDate.getMonth() + 1) || '00';
    var day = tempDate.getDate() || '00';
    var year = tempDate.getFullYear() || '0000';
    return `${add0Prefix(day)} - ${add0Prefix(month)} - ${year}`;
}

function add0Prefix(n){
    return n > 9 ? `${n}` : `0${n}`;
}