const progressContainer = document.querySelector('.progress-container')
const musicContainer = document.querySelector('.music-container')
const progress = document.querySelector('.progress')
const currTime = document.querySelector('#currTime')
const durTime = document.querySelector('#durTime')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')


// Song titles
const songs = [
    'Thats What It Takes instrumental NEFFEX',
    'Break Your Lock and Key - Mini Vandals',
    'Never Surrender - Anno Domini Beats',
    'Sinister - Anno Domini Beats',
    'Skylines - Anno Domini Beats',
    'The Itch Instrumental NEFFEX',
    'March On - Ethan Meixsell',
    'Pray - Anno Domini Beats',
    'Intellect - Yung Logos'
]


let songIndex = 2

// Initially load song info 
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    cover.src = `images/${song}.jpg`
    audio.src = `music/${song}.mp3`
    title.innerText = song
}

// Play song
function playSong() {
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    musicContainer.classList.add('play')
    audio.play()
}

// Pause song
function pauseSong() {
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    musicContainer.classList.remove('play')
    audio.pause()
}

// Previous song
function prevSong() {
    songIndex = songIndex - 1

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

// Next song
function nextSong() {
    songIndex = songIndex + 1

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100

    progress.style.width = `${progressPercent}%`
}

// Set progress bar
function setProgress(e) {
    const duration = audio.duration
    const width = this.clientWidth
    const clickX = e.offsetX

    audio.currentTime = (clickX / width) * duration
}

// Set duration time
function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    var sec_d;
    var sec;
    let min;

    if (currentTime == null) {
        min = 0
    } else {
        min = Math.floor(currentTime / 60);
    }

    min = min < 10 ? '0' + min : min;


    function get_sec(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }

    get_sec(currentTime, sec);

    currTime.innerHTML = min + ':' + sec;

    let min_d;

    if (isNaN(duration) === true) {
        min_d = '0'
    } else {
        Math.floor(duration / 60);
    }

    min_d = min_d < 10 ? '0' + min_d : min_d;


    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }

    get_sec_d(duration);

    durTime.innerHTML = min_d + ':' + sec_d;
}


playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})


progressContainer.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('timeupdate', DurTime);
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('ended', nextSong);
