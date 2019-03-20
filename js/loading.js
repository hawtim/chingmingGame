(function (window) {
    var cssObject = {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        'z-index': 999,
        width: '100%',
        height: '100%',
        background: 'url("img/loading.png") top center no-repeat',
        'background-size': 'cover',
        transition: 'opacity .5s',
    }
    var cssText = ''
    Object.keys(cssObject).forEach(function (key) {
        cssText += key + ':' + cssObject[key] + ';'
    })
    var div = document.createElement("div")
    div.style.cssText = cssText
    document.body.appendChild(div)
    window.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            div.style.cssText = cssText + "opacity:0;", setTimeout(function () {
                document.body.removeChild(div)
            }, 600)
        }, 1000)
    }, false)
})(window)