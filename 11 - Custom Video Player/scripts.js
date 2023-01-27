//? Get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')
//? Built out functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause()
    // }
}

function duracionVideo() {
    let bufferRestant = video.duration;
    let minutes = 0;

    while (bufferRestant >= 60) {
        minutes++
        bufferRestant -= 60;
        console.log(bufferRestant)
    }

    const secondsRestant = bufferRestant

    console.log(`${minutes} minutos ${secondsRestant} seconds`)
}

function changeSpeed(e) {
    // const currentSpeed = e.target.value;
    // console.log(currentSpeed)
    console.log(`Duracion del Video: ${video.duration}`)
    duracionVideo()
    if (this.value > 1) {
        video.playbackRate = this.value;
        console.log(video)
    } else {
        video.playbackRate = this.value;
    }
}

function changeVolumen(e) {
    // const currentValue = e.target.value;
    // console.log(currentValue)

    video.volume = this.value;
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'

    toggle.textContent = icon;
}

// function restSeconds() {

//     console.log('10 seconds menos')
//     console.log(video.currentTime)
//     video.currentTime -= 10;
// }

// function sumSeconds() {
//     console.log(video.currentTime)
//     video.currentTime += 25;
// }

function skip() {
    console.log('Skipped!')
    console.log(this.dataset.skip)
    const skipSeconds = this.dataset.skip
    video.currentTime += parseFloat(skipSeconds)
    console.log(video.currentTime)
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`;
}

//deslizar barra de video
function scrub(e) {
    console.log(e)
    //width exacto que tiene ese html
    console.log(progress.offsetWidth)
    //al llamar al Event, en offset prop puedo saber en el pixel exacto que se hizo click en ese elemento html.
    console.log(`offsetX: ${e.offsetX}`)
    //? el bar div tiene position relative por eso
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    console.log('scrubTime:' + scrubTime)
    video.currentTime = scrubTime
}

function handleFullScreen() {
    video.requestFullscreen();
}


//? Hook up the event listeners.
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

ranges[1].addEventListener("change", changeSpeed)
ranges[1].addEventListener("mousemove", changeSpeed)

console.log(ranges[1])

video.addEventListener('volumechange', (e) => {
    console.log('volume changed')
})

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

ranges[0].addEventListener('change', changeVolumen);
ranges[0].addEventListener('mousemove', changeVolumen);

let mousedown = false
progress.addEventListener('click', scrub)
//vas a llamar a scrub si y solo si el mouse esta apretado
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

fullscreen.addEventListener('click', handleFullScreen)

// progress.addEventListener('mousemove', scrub)

// skipButtons[0].addEventListener('click', restSeconds)
// skipButtons[1].addEventListener('click', sumSeconds)
skipButtons.forEach(button => {
    button.addEventListener('click', skip)
});