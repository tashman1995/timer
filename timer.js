class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.status = "completed";

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onChange = callbacks.onChange;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.lineStep = callbacks.lineStep;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.durationInput.addEventListener("input", this.change);
    this.durationInput.addEventListener("focus", this.pause);
  }

  start = () => {
    //Stop start doing anything if timer is already running
    if (this.status != "running" && this.timeRemaining > 0) {
      if (this.status === "completed") {
        this.onStart();
        this.step = this.durationInput.value / numberOfLines;
      }
      console.log('start')
      //Initial Tick and line step, interval waits for on increment before running
      this.tick();
      this.lineStep();
      //Set tick to run every .02 seconds
      this.interval = setInterval(this.tick, 20);
      // Set line colour change to happen every step amount of time
      this.lineInterval = setInterval(this.lineStep, this.step * 1000);

      console.log("step" + this.step, "number of line" + numberOfLines);

      
      this.status = "running";
    }
  };

  pause = () => {
    clearInterval(this.interval);
    clearInterval(this.lineInterval);
    this.status = "paused";
  };

  change = () => {
    if (this.onChange) {
      this.onChange(this.timeRemaining);
    }
    this.status = "completed"
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      this.status = "completed";
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
    }
  };

  lineStep = () => {
    if (!(this.timeRemaining <= 0)) {
      this.lineStep();
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
