/**
 * Objects of this class represent timestamps of the form YYYY-MM-DD HH:MM:SS (the same as
 * the mysql timestamps).
 */

export default class TimeStamp{
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;

    private static standardFormat: string = 'YYYY-MM-DD HH:MM:SS';

    constructor(y: number, mon: number, d: number, h: number, min: number, s: number) {
        this.year = y;
        this.month = mon;
        this.day = d;
        this.hour = h;
        this.minute = min;
        this.second = s;
    }

    /**
     * Converts current object to json in string format and returns the string json
     */
    public toStringJson(): string{
        return JSON.stringify(this);
    }

    /**
     * Converts the current object into string standardFormat: 'YYYY-MM-DD HH:MM:SS'
     */
    public toString(): string{
        function format(n: number, size: number): string{
            return ('0'.repeat(size) + n).slice(-1*size);
        }

        return format(this.year, 4)
            + '-' + format(this.month, 2)
            + '-' + format(this.day, 2)
            + ' ' + format(this.hour, 2)
            + '-' + format(this.minute, 2)
            + '-' + format(this.second, 2);
    }


    /**
     * Creates and returns a new TimeStamp object from given string timestamp.
     * @pre: format of strTimeStamp must be YYYY-MM-DD HH:MM:SS.
     * @pre: the values for the time units must be within a valid range, Error is thrown otherwise.
     * @throws Error
     */
    public static fromString(strTimeStamp: string): TimeStamp{
        let newTimeStamp: TimeStamp = new TimeStamp(0, 0, 0, 0, 0, 0);

        if (!this.isValid(strTimeStamp)){
            throw Error;
        }

        // split the timestamp in date and time
        let strDate: string = strTimeStamp.split(' ')[0];
        let strTime: string = strTimeStamp.split(' ')[1];

        // split further into year, month, day, hr, min, sec
        // date = [year, month, day]
        let date: string[] = strDate.split('-');

        // time = [hr, min, sec]
        let time: string[] = strTime.split(':');

        newTimeStamp.year = parseInt(date[0]);
        newTimeStamp.month = parseInt(date[1]);
        newTimeStamp.day = parseInt(date[2]);
        newTimeStamp.hour = parseInt(time[0]);
        newTimeStamp.minute = parseInt(time[1]);
        newTimeStamp.second = parseInt(time[2]);

        return newTimeStamp;
    }

    /**
     * Checks if given time stamp has a valid format and valid time values
     */
    private static isValid(strTimeStamp: string): boolean{
        // check length
        if (strTimeStamp.length !== this.standardFormat.length) {
            return false;
        }

        // check the signs, the characters '-', ' ' and ':' must be at the same places as in the standard format
        // YYYY-MM-DD HH:MM:SS
        //     4  7  10 11 12
        // check the '-' sign
        if (strTimeStamp[4] !== '-' || strTimeStamp[7] !== '-') {
            return false;
        }

        // check the ':' sign
        if (strTimeStamp[13] !== ':' || strTimeStamp[16] !== ':') {
            return false;
        }

        // check space
        if (strTimeStamp[10] !== ' ') {
            return false;
        }

        // The signs are at the right places
        // split the timestamp in date and time
        let strDate: string = strTimeStamp.split(' ')[0];
        let strTime: string = strTimeStamp.split(' ')[1];

        // split further into year, month, day, hr, min, sec
        // date = [year, month, day]
        let date: string[] = strDate.split('-');

        // time = [hr, min, sec]
        let time: string[] = strTime.split(':'); 

        // check if the date and time values are positive integers
        for (let dateTimeValue of date.concat(time)) {
            if (!this.isPositiveInt(dateTimeValue)) {
                return false;
            }
        }

        // check if date/time values are valid
        let dateTime: number[] = [];
        for (let dateTimeValue of date.concat(time)) {
            dateTime.push(parseInt(dateTimeValue));
        }
        if (!this.validDateTimeValues(dateTime)) {
            return false;
        }

        // format is valid check values
        return true;
    }

    /**
     * Checks if given date time values are valid.
     */
    private static validDateTimeValues(dateTimeValues: number[]): boolean {
        // check if year, month, day, hour, minute and second values are included
        if (dateTimeValues.length !== 6)
            return false;

        // year: must be positive
        if (dateTimeValues[0] < 0)
            return false;

        // 1 <= month <= 12
        let month = dateTimeValues[1];
        if (month < 1 || month > 12)
            return false;

        // 1 <= day <= 31
        let day = dateTimeValues[2];
        if (day < 1 || day > 31)
            return false;

        // 0 <= hour <= 23
        let hour = dateTimeValues[3];
        if (hour < 0 || hour > 23)
            return false;

        // 0 <= minute <= 59
        let minute = dateTimeValues[4];
        if (minute < 0 || minute > 59)
            return false;

        // 0 <= second <= 59
        let second = dateTimeValues[5];
        if (second < 0 || second > 59)
            return false;

        return true;
    }

    /**
     * Checks if given string consists only of digits.
     */
    private static isPositiveInt(s: string): boolean{
        let charCode0: number = "0".charCodeAt(0);
        let charCode9: number = "9".charCodeAt(0);

        // Check if characters are digits
        for (let c of s) {
            if (!(charCode0 <= c.charCodeAt(0) && c.charCodeAt(0) <= charCode9)) {
                // A character is not a digit, return false
                return false;
            }
        }

        // All characters are digits, there cannot be a - sign, s is a positive int
        return true;
    }
}

/*
TESTS

console.log(t.isValid('')); // false
console.log(t.isValid('1970-12-01 12:25:03')); // true
console.log(t.isValid('1970-99-01 12:25:03')); // false
console.log(t.isValid('1970-00-01 12:25:03')); // false
console.log(t.isValid('1970-13-01 12:25:03')); // false
console.log(t.isValid('1970-01-31 12:25:03')); // true
console.log(t.isValid('1970-01-32 12:25:03')); // false
console.log(t.isValid('1970-01-30 00:00:00')); // true
console.log(t.isValid('1970-01-30 24:00:00')); // false
console.log(t.isValid('1970-01-30 00:60:00')); // false
console.log(t.isValid('1970-01-30 00:00:60')); // false

*/