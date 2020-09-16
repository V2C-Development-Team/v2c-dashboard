export const simulateNetwork = (duration, callback) => {
    setTimeout(() => {
        callback();
    }, duration);
};

export const scrollToTop = () => {
    // scroll to top
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};

/**
 *
 *
 * @param {*} str
 * @returns true(if null or undefined) or false
 */
export const checkIsNullOrUndefinedOrEmpty = str => {
    if (
        str.trim() === null ||
        str.trim() === undefined ||
        str.trim().length <= 0
    ) {
        return true;
    }
    return false;
};

export const millisToMinutesAndSeconds = millis => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);

    let time = {
        minutes: parseInt(minutes),
        seconds: parseInt((seconds < 10 ? '0' : '') + seconds)
    };
    return time;
};

export const fileInputToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
