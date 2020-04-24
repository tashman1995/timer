const durationInput = document.querySelector('#duration'),
    startButton = document.querySelector('#start'),
    pauseButton = document.querySelector('#pause'),
    circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter)

let currentOffset = 0;

const t1 = new Timer(durationInput, startButton, pauseButton, {
    onStart() {
        console.log('timer started')
    },
    onTick() {
        currentOffset = currentOffset - 1;
        circle.setAttribute('stroke-dashoffset', currentOffset)
    }, 
    onComplete() {
        console.log('timer completed')
    }
})