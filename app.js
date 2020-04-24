const durationInput = document.querySelector("#duration"),
  startButton = document.querySelector("#start"),
  pauseButton = document.querySelector("#pause"),
  circle = document.querySelector("circle"),
  lines = document.querySelectorAll(".line");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let currentOffset = 0;
let duration = durationInput.value;
let step = 0;

const t1 = new Timer(durationInput, startButton, pauseButton, {
  onChange(totalDuration) {
    duration = totalDuration;
    circle.setAttribute("stroke-dashoffset", 0);
  },
  onTick(timeRemaining) {
    lineCounter();
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    console.log("timer completed");
  },
});

const lineCounter = () => {
    console.log(step)
    lines[step].style.stroke = "red";
    step++;
};

// GENERATING CIRCLE HTML
// const dashedCircle = document.querySelector('.circle');

// const linesNum = 360;
// function populateCircle(){
//     for(i = 0; i <= linesNum; i+=5){

//         const newGEl = document.createElement('g');
//         const newLineEl = document.createElement('line');
//         newGEl.setAttribute('style', 'stroke: orangered');
//         newGEl.classList.add('line')
//         newGEl.setAttribute('transform', `rotate(${i})`);
//         newLineEl.setAttribute('y1',"-60");
//         newLineEl.setAttribute('y2',"-80");
//         newGEl.appendChild(newLineEl)
//         dashedCircle.appendChild(newGEl);
//     }
// }

// populateCircle()
