const durationInput = document.querySelector("#duration"),
  startButton = document.querySelector("#start"),
  pauseButton = document.querySelector("#pause"),
  circle = document.querySelector("circle"),
  lines = document.querySelectorAll(".line");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let currentOffset = 0;
let duration = durationInput.value;
let numberOfLines = lines.length;
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
    lines[step].style.stroke = getColor(step);
    step++;
    console.log(step)
};

const getColor = (step) => {
    let r;
    let g;
    let b;
    let a = 1;
    if(step < numberOfLines/4){
        r = 100;
        g = 100;
        b = 255;
    } else {
        r = 0 + step * (255/numberOfLines);
        g = 0;
        b = 255 - step * (255/numberOfLines);
    }
    
    let newColor = `rgba(${r},${g},${b},${a})`;
    return newColor;
}

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
