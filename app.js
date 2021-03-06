const durationInput = document.querySelector("#duration"),
  button = document.querySelector("#button"),
  lines = document.querySelectorAll(".line");

let duration = durationInput.value;
let numberOfLines = lines.length - 1;
let step = 0;

const t1 = new Timer(durationInput, button, {
  onStart() {
    clearLines();
    step = 0;
  },

  onPause() {
    button.innerText = "Start";
  },

  onChange(totalDuration) {
    duration = totalDuration;
    clearLines();
  },

  onComplete() {
    button.innerText = "Again?";
  },

  updateText(message) {
    button.innerText = message;
  },

  lineStep() {
    lines[step].style.stroke = getColor(step);
    let currentLine = lines[step].firstElementChild;
    currentLine.setAttribute("y2", "-53");
    if (step - 1 >= 0) {
      let previousLine = lines[step - 1].firstElementChild;
      previousLine.setAttribute("y2", "-48");
    }

    step++;
  },
});

const clearLines = () => {
  for (line of lines) {
    line.style.stroke = "rgba(255,255,255,.7)";
    line.firstElementChild.setAttribute("y2", "-48");
  }
};

const getColor = (step) => {
  let r;
  let g;
  let b;
  let a = 1;
  if (step < numberOfLines / 4) {
    r = 110;
    g = 140;
    b = 255;
  } else if (step >= numberOfLines / 4 && step <= (numberOfLines / 4) * 2.5) {
    r = 110 + (step - numberOfLines / 4) * (255 / (numberOfLines / 2));
    g = 140;
    b = 255 - (step - numberOfLines / 4) * (255 / (numberOfLines / 2));
  } else {
    r = 255;
    g =
      140 -
      (step - (numberOfLines / 4) * 2.5) * (140 / (numberOfLines * 0.375));
    b = 0;
  }

  let newColor = `rgba(${r},${g},${b},${a})`;
  return newColor;
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
