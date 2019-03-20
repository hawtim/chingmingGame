// 自动播放音乐效果，解决浏览器或者APP自动播放问题
function autoPlayMusic() {
    function musicInBrowserHandler() {
        musicPlay(true)
        document.body.removeEventListener('touchstart', musicInBrowserHandler)
    }
    document.body.addEventListener('touchstart', musicInBrowserHandler)
    // 自动播放音乐效果，解决微信自动播放问题
    function musicInWeixinHandler() {
        musicPlay(true)
        document.addEventListener("WeixinJSBridgeReady", function () {
            musicPlay(true)
        }, false)
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler)
    }
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler)
}

function musicPlay(isPlay) {
    var audio = document.getElementById('audioPlayer')
    if (audio && isPlay && audio.paused) {
        audio.play()
    }
    if (audio && !isPlay && !audio.paused) {
        audio.pause()
    }
}

function togglePlayStatus() {
    console.log('toggle')
    var audio = document.getElementById('audioPlayer')
    var muted = document.getElementById('muted')
    var playing = document.getElementById('playing')
    if (audio && audio.paused) {
        muted.style.display = 'none'
        playing.style.display = 'block'
        musicPlay(true)
    } else {
        muted.style.display = 'block'
        playing.style.display = 'none'
        musicPlay(false)
    }
}

var dom = document.getElementById('togglePlayStatus')
dom.addEventListener('click', togglePlayStatus, false)

autoPlayMusic()