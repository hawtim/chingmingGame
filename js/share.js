var myData = {
    gameid: 'zfj'
}
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
// 隐藏分享
function hideShare() {
    document.getElementById('shareImage').style.display = 'none';
}
// 展示排行榜
function displayRanking() {
    window.location = mebtnopenurl
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

// 展示提交分数
function displaySubmitScore(score) {
    myData.score = parseInt(score * 10)
    myData.scoreName = '行走了' + score + '米'
    document.title = '在寻根的路上，我行走了' + score + '米，小伙伴们快来挑战我吧！'
    window.shareData.tTitle = document.title
}
// 分享完成回调
function onShareComplete(res) {
    if (localStorage.myuid && myData.score != undefined) {
        setTimeout(function () {
            if (confirm('？')) {
                window.location = mebtnopenurl
            } else {
                document.location.href = mebtnopenurl
            }
        }, 500)
    } else {
        document.location.href = guanzhuurl
    }
}