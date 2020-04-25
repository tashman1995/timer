const durationInput = document.querySelector("#duration"),
  startButton = document.querySelector("#start"),
  pauseButton = document.querySelector("#pause"),
  lines = document.querySelectorAll(".line");


let duration = durationInput.value;
let numberOfLines = lines.length;
let step = 0;

const t1 = new Timer(durationInput, startButton, pauseButton, {
  onChange(totalDuration) {
    duration = totalDuration;
    circle.setAttribute("stroke-dashoffset", 0);
  },

  onTick() {
    lines[step].style.stroke = getColor(step);
    step++;
    console.log(step)
   
  },
  onComplete() {
    console.log("timer completed");
  },
});


const getColor = (step) => {
    let r;
    let g;
    let b;
    let a = 1;
    if(step < numberOfLines/4){
        r = 110;
        g = 140;
        b = 255;
    } else if(step >= numberOfLines/4 && step <= numberOfLines/4 * 2.5) {
        r = 110 + (step - numberOfLines/4) * (255/(numberOfLines/2));
        g = 140;
        b = 255 - (step - numberOfLines/4) * (255/(numberOfLines/2));
    } else {
        r =255;
        g =140 - (step - numberOfLines/4 * 2.5) * (140/(numberOfLines * 0.375));
        b = 0;
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
