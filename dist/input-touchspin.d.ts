declare class InputTouchspin {
    private input;
    private btnUp;
    private btnDown;
    private styleId;
    private timeout;
    private interval;
    constructor(target: Element);
    private style;
    private events;
    private clearTimers;
    private step;
    private spin;
}
export default InputTouchspin;
