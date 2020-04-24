const durationInput = document.querySelector('#duration'),
    startButton = document.querySelector('#start'),
    pauseButton = document.querySelector('#pause')

class Timer {
    constructor(durationInput, startButton, pauseButton) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    
    start = () => {
        this.tick();
        this.interval = setInterval(this.tick, 1000)
    }

    pause = () => {
        clearInterval(this.interval)
    }

    tick = () => {
        // this.timeRemaining when we're assigning a value to it is get timeRemaining(), this.timeRemaining when were setting it to a vause is the same as set timeRemaining
        this.timeRemaining = timeRemaining - 1;
    }

    get timeRemaining(){
        return parseFloat(this.durationInput.value)
    }

    set timeRemaining(time){
        this.durationInput.value = time;
    }
}

const t1 = new Timer(durationInput, startButton, pauseButton)