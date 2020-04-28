const durationInput = document.querySelector("#duration"),
  button = document.querySelector("#button"),
  lines = document.querySelectorAll(".line"),
  innerLines = document.querySelectorAll('.line2');

let duration = durationInput.value;
let numberOfLines = lines.length - 1;
let step = 0;
let innerStep = 0;

const t1 = new Timer(durationInput, button, {
  onStart() {
    clearLines();
    step = 0;
    innerStep = 0;
  },
  onPause(){
    button.innerText = 'Start'
  },
  innerLineStep(){
   
    for (let i=0; i<innerLines.length; i++) {
      setTimeout( function timer(){
          innerLines[i].style.opacity = "100%";
          innerLines[i].style.stroke = getColor(i);
      }, i*(500 / numberOfLines));
    }
    
      setTimeout(() => {
          for (let i=0; i<innerLines.length; i++) {
            setTimeout( function timer(){
                innerLines[i].style.opacity = "0%";
            }, i*(500 / numberOfLines));
          }
      }, 500);
    
   
    // let innerInterval = setInterval(1000 / numberOfLines, fillInnerLines)
  },
  onChange(totalDuration) {
    duration = totalDuration;
    clearLines();
  },
  onComplete() {
    button.innerText = 'Again?'
  },
  updateText(message){
    button.innerText = message;
  },
  lineStep() {
    lines[step].style.stroke = getColor(step);
    let currentLine = lines[step].firstElementChild;
    
    console.log(currentLine.getAttribute.y2)
    currentLine.setAttribute('y2', "-55");
    if(step - 1 >= 0){
      let previousLine = lines[step - 1].firstElementChild;
      previousLine.setAttribute('y2', "-50");
    }

    console.log(currentLine)
    step++;
  },
});

const fillInnerLines = () => {
  innerStep++;
  console.log("innerstap")
  innerLines[innerStep].style.opacity = "100%";
  clearInterval(innerInterval)
}

const clearLines = () => {
  for (line of lines) {
    line.style.stroke = "rgba(255,255,255,.7)";
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

function timer (){
  
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
