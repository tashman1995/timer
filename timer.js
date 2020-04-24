class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onChange = callbacks.onChange;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.durationInput.addEventListener("input", this.change);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.timerLength = this.timeRemaining;
    let numberOfLines = 360/5;
    this.step = this.timerLength / numberOfLines;
    this.tick();
    this.interval = setInterval(this.tick, (this.step * 1000));
  };

  pause = () => {
    clearInterval(this.interval);
  };

  change =() => {
      if (this.onChange) {
        this.onChange(this.timeRemaining)
      }
  }

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      // this.timeRemaining when we're assigning a value to it is get timeRemaining(), this.timeRemaining when were setting it to a vause is the same as set timeRemaining
      this.timeRemaining = this.timeRemaining - this.step;
      if (this.onTick) {
        this.onTick(this.timeRemaining, this.timerLength);
      }
    }
  };

  lineStep = () => {
      
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
