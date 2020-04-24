const durationInput = document.querySelector("#duration"),
  startButton = document.querySelector("#start"),
  pauseButton = document.querySelector("#pause"),
  circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let currentOffset = 0;
let duration;

const t1 = new Timer(durationInput, startButton, pauseButton, {
  onChange(totalDuration = 30) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    console.log("timer completed");
  },
});
