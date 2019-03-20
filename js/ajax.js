function ajax(params) {
    params = params || {}
    params.data = params.data || {}
    // 判断 ajax 请求是 json 还是 jsonp
    var json = params.jsonp ? jsonp(params) : json(params)
    // ajax 请求
    function json(params) {
        // 默认 GET
        params.type = (params.type || 'GET').toUpperCase()
        // encodeURIComponent
        params.data = formatParams(params.data)
        var xhr = null
        // 实例化 XMLHttpRequest 对象
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        // 监听 readyState 的变化
        xhr.onreadystatechange = function () {
            // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
            if (xhr.readyState == 4) {
                var status = xhr.status
                if (status >= 200 && status < 300) {
                    var response = ''
                    // 判断接收数据的内容类型
                    var type = xhr.getResponseHeader('Content-type')
                    if (type.indexOf('xml') !== -1 && xhr.responseXML) {
                        // Document 对象响应
                        response = xhr.responseXML
                    } else if (type.indexOf('application/json') !== -1) {
                        //JSON 响应
                        response = JSON.parse(xhr.responseText)
                    } else {
                        response = xhr.responseText
                    }
                    // 成功回调函数
                    params.success && params.success(response)
                } else if (status == 304) {
                    // 命中缓存
                    return true
                } else {
                    params.error && params.error(status)
                }
            }
        }
        // 连接和传输数据
        if (params.type == 'GET') {
            // 请求方式，url，是否异步
            xhr.open(params.type, params.url + '?' + params.data, true)
            xhr.send(null)
        } else {
            // 非 GET 请求
            xhr.open(params.type, params.url, true)
            // 设置请求头
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            // 发送数据
            xhr.send(params.data)
        }
    }
    // jsonp 请求
    function jsonp(params) {
        //创建script标签并加入到页面中
        var callbackName = params.jsonp
        var head = document.getElementsByTagName('head')[0]
        // 设置传递给后台的回调参数名
        params.data['callback'] = callbackName
        var data = formatParams(params.data)
        var script = document.createElement('script')
        head.appendChild(script)
        //创建 jsonp 回调函数
        window[callbackName] = function (json) {
            head.removeChild(script)
            clearTimeout(script.timer)
            window[callbackName] = null
            params.success && params.success(json)
        }
        //发送请求
        script.src = params.url + '?' + data
        //为了得知此次请求是否成功，设置超时处理
        if (params.time) {
            script.timer = setTimeout(function () {
                window[callbackName] = null
                head.removeChild(script)
                params.error && params.error({
                    message: 'timeout'
                })
            }, time)
        }
    }
    //格式化参数
    function formatParams(data) {
        var arr = []
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
        }
        arr.push('v=' + random())
        return arr.join('&')
    }
    // 获取随机数
    function random() {
        return Math.floor(Math.random() * 10000 + 500)
    }
}