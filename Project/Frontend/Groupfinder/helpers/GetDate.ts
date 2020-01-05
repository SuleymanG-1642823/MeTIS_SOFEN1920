export default function () {
    let date: Date = new Date();
    let year: number = date.getFullYear();
    let month: number = date.getMonth() + 1; // Starts at 0
    let monthString: string;
    if (month < 10){
        monthString = '0' + month.toString();
    }
    else {
        monthString = month.toString();
    }
    let day: number = date.getDate();
    let dayString: string;
    if (day < 10){
        dayString = '0' + day.toString();
    }
    else {
        dayString = day.toString();
    }
    let hour: number = date.getHours();
    let hourString: string;
    if (hour < 10){
        hourString = '0' + hour.toString();
    }
    else {
        hourString = hour.toString();
    }
    let minutes: number = date.getMinutes();
    let minutesString: string;
    if (minutes < 10){
        minutesString = '0' + minutes.toString();
    }
    else {
        minutesString = minutes.toString();
    }
    let seconds: number = date.getSeconds();
    let secondsString: string;
    if (seconds < 10){
        secondsString = '0' + seconds.toString();
    }
    else {
        secondsString = seconds.toString();
    }
    let dateString = year.toString() + '-' + monthString + '-' + dayString + ' ' + hourString + ':' + minutesString + ':' + secondsString;
    
    return dateString;
}