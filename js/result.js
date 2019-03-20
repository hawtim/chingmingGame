var myData = {
    gameid: 'zfj'
}

function dp_submitScore(score) {
    myData.score = parseInt(score * 10)
    myData.scoreName = '行走了' + score + '米'
    document.title = '在寻根的路上，我行走了' + score + '米，小伙伴们快来挑战我吧！'
    window.shareData.tTitle = document.title
}

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