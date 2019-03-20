var mebtnopenurl = '#'
var thegameurl = "#"
var guanzhuurl = "#"
window.shareData = {
    "imgUrl": "#",
    "timeLineLink": thegameurl,
    "tTitle": "清明时节雨纷飞",
    "tContent": "清明时节雨纷飞"
}
// 返回首页
function goHome() {
    window.location = mebtnopenurl
}
// 点击更多
function clickMore() {
    if ((window.location + "").indexOf("f=zf", 1) > 0) {
        window.location = mebtnopenurl
    } else {
        goHome()
    }
}
// 展示分享
function displayShare() {
    document.getElementById("shareImage").style.display = "block"
}

function displayRanking() {
    window.location = mebtnopenurl
}
// 隐藏分享
function hideShare() {
    document.getElementById('shareImage').style.display = 'none';
}
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, onShareComplete)
    })
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, onShareComplete)
    })
}, false)