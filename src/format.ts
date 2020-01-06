const leftPadNumberStr = (num: number, digest = 2): string => {
    let bound = 10;
    let prefix = '';
    for (var i = 1; i < digest; i++) {
        if (num < bound) {
            prefix += '0';
        }
        bound *= 10;
    }
    return prefix + num;
};

/**
 * YYYY-MM-DD hh:mm:ss.sss
 * @param timestamp
 */
export const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return (
        date.getFullYear() +
        '-' +
        leftPadNumberStr(date.getMonth() + 1) +
        '-' +
        leftPadNumberStr(date.getDate()) +
        ' ' +
        leftPadNumberStr(date.getHours()) +
        ':' +
        leftPadNumberStr(date.getMinutes()) +
        ':' +
        leftPadNumberStr(date.getSeconds()) +
        '.' +
        leftPadNumberStr(date.getMilliseconds(), 3)
    );
};
