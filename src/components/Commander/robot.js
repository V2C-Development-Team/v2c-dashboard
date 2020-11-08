class Robot {
    eventFire(el, eType) {
        if (el.fireEvent) {
            el.fireEvent('on' + eType);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(eType, true, false);
            el.dispatchEvent(evObj);
        }
    }
}

export default new Robot();
