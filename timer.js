class Timer {
  constructor(durationInput, button, callbacks) {
    this.durationInput = durationInput;
    this.button = button;
    this.status = "new";
    this.previousTime = this.timeRemaining;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onChange = callbacks.onChange;
      this.onPause = callbacks.onPause;
      this.onTick = callbacks.onTick;
      this.updateText = callbacks.updateText;
      this.onComplete = callbacks.onComplete;
      this.lineStep = callbacks.lineStep;
    }

    this.button.addEventListener("click", this.checkStatus);
    this.durationInput.addEventListener("input", this.change);
    this.durationInput.addEventListener("focus", this.pause);
  }

  checkStatus = () => {
    if (this.status === "paused" || this.status === "new") {
      this.start();
    } else if (this.status === "running") {
      this.pause();
    } else if (this.status === "completed"){
      this.restart();
    }
  };

  start = () => {
    if (this.status === "new") {
      this.onStart();
      this.step = this.durationInput.value / numberOfLines;
    }
    this.updateText("Pause");
    this.tick();
    this.lineStep();
    this.interval = setInterval(this.tick, 10);
    this.lineInterval = setInterval(this.lineStep, this.step * 1000);
    this.status = "running";
  };

  pause = () => {
    clearInterval(this.interval);
    clearInterval(this.lineInterval);

    if(this.status != "new"){
      this.status = "paused";
    }

    this.updateText("Start");
  };

  change = () => {
    if (this.onChange) {
      this.onChange(this.timeRemaining);
    }
    this.status = "new";
    this.previousTime = this.timeRemaining;
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      this.status = "completed";
      if (this.updateText) {
        this.updateText("Again?");
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.01;
    }
  };

  lineStep = () => {
    if (!(this.timeRemaining <= 0)) {
      this.lineStep();
    }
  };


  restart = () => {
    this.timeRemaining = this.previousTime;
    this.updateText("Start");
    this.onChange();
    this.status = "new"
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
    
  }
}
