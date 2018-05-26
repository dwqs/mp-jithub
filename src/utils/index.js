function addZero (val) {
    return val > 9 ? val : `0${val}`;
};

export const formatDateToString = (date, formatStr) => {
    formatStr = formatStr || 'yyyy/MM/dd';
    date = date || new Date();
    let str = formatStr;

    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/MM/, addZero(date.getMonth() + 1));
    str = str.replace(/dd|DD/, addZero(date.getDate()));
    return str;
};

export const formatSize = size => {
    if (!size) {
        return '';
    }
    if (size < 1024) {
        return `${size} B`;
    }

    if (size < Math.pow(1024, 2)) {
        return `${(size / 1024).toFixed(1)} KB`;
    }

    if (size < Math.pow(1024, 3)) {
        return `${(size / Math.pow(1024, 2)).toFixed(1)} MB`;
    }

    if (size < Math.pow(1024, 4)) {
        return `${(size / Math.pow(1024, 3)).toFixed(1)} GB`;
    }

    return 'Too Large';
};
