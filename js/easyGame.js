!function(a) {
    var b = function() {
        var c = {},
        d = arguments[0],
        e = d.canvas,
        f = e.width,
        g = e.height;
        return e.getContext("2d"),
        c = {
            objList: [],
            imgList: {},
            getImg: function(a) {
                return this.imgList[a]
            },
            canvas: e,
            fps: d.fps,
            timeline: 0,
            ctx: e.getContext("2d"),
            canWidth: f,
            canHeight: g,
            loading: function(a, b) {
                this.l_t = 0,
                this.imgList.length = 0;
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    this.imgList[d.id] = new Image,
                    this.imgList[d.id].src = d.url,
                    this.imgList.length++
                }
                this.loadfuc = b;
                var e = this;
                this.loadTimer = setInterval(function() {
                    e.drawLoading()
                },
                30)
            },
            setEmpty: function() {
                this.objList = [],
                this.offtimefuc(),
                b.eventList = {}
            },
            createLayer: function(a) {
                var b = [];
                return ! a || a >= this.objList.length - 1 ? this.objList.push(b) : 0 >= a ? this.objList.unshift(b) : this.objList.splice(a, 0, b),
                b
            },
            drawLoading: function() {
                var a = 0,
                b = this.ctx,
                c = this.canWidth,
                d = this.canHeight,
                e = this.imgList.length;
                for (i in this.imgList)"length" != i && this.imgList[i].complete && a++;
                b.beginPath(),
                b.clearRect(0, 0, c, d),
                b.fillStyle = "#000",
                b.fillRect(0, 0, c, d),
                b.drawImage(loadImg1, 55, d / 2 - 17),
                b.beginPath(),
                b.fillStyle = "#4B9D3C",
                b.fillRect(72, d / 2 - 10, (c - 146) / e * a, 23),
                b.fill(),
                b.beginPath(),
                b.arc(72 + (c - 146) / e * a, d / 2 + 2, 11, Math.PI / 2, 3 * Math.PI / 2, 1),
                b.fillStyle = "#4B9D3C",
                b.fill(),
                b.closePath(),
                b.beginPath(),
                b.arc(72, d / 2 + 2, 11, 3 * Math.PI / 2, Math.PI / 2, 1),
                b.fillStyle = "#4B9D3C",
                b.fill(),
                b.closePath(),
                b.save(),
                b.beginPath(),
                b.fillStyle = "#fff",
                b.font = "bold 18px Arial",
                b.shadowColor = "#000",
                b.shadowOffsetY = 1,
                b.textAlign = "center",
                b.fillText("已加载" + Math.floor(100 * (a / e)) + "%", c / 2, d / 2 + 7),
                b.fill(),
                b.restore(),
                a == e && (clearInterval(this.loadTimer), b.clearRect(0, 0, c, d), this.init(), this.loadfuc())
            },
            gameStart: function() {
                this.stimer = this.requestAnimFrame(function() {
                    this.gameStart()
                }.bind(this)),
                this.timeline && (this.tlinefuc(this.timeline), this.timeline++);
                var a = (new Date).getTime();
                this.__render(a - this.lastAnimationFrameTime),
                this.lastAnimationFrameTime = a
            },
            gameOver: function() {
                this.cancelAFrame(this.stimer)
            },
            ontimefuc: function(a) {
                this.timeline = 1,
                this.tlinefuc = a
            },
            offtimefuc: function() {
                this.timeline = 0
            },
            addEventListener: function(a) {
                function d(d) {
                    if (eG.eventList[a]) {
                        1 == d.targetTouches.length && (d.preventDefault(), d = d.targetTouches[0]),
                        "touchend" == a && (d = d.changedTouches[0]);
                        for (var e = eG.eventList[a], f = 0, g = e.length, h = new b.OBB(new eG.Vector2(d.pageX * c.p_x, d.pageY * c.p_x), 0, 0, 0); g > f; f++) {
                            var i = e[f];
                            if (eG.OBBvsOBB(h, i.testObb())) for (var j = 0,
                            k = i.eventFuc[a].length; k > j; j++) i.eventFuc[a][j](d)
                        }
                    }
                }
                this.canvas.addEventListener(a, d);
                var c = this
            },
            __drawFPS: function(a) {
                var b = 1e3 / (a - this.lastAnimationFrameTime);
                this.lastAnimationFrameTime = a,
                a - this.lastFpsUpdateTime > 2e3 && (this.lastFpsUpdateTime = a, this._fps = b)
            },
            __render: function(a) {
                for (var b = 0,
                c = this.objList.length; c > b; b++) {
                    for (var d = 0,
                    e = 0,
                    f = this.objList[b]; e < f.length; e++) f[e].die && f.splice(e, 1);
                    for (var g = f.length; g > d; d++) {
                        var h = f[d];
                        h.static || (h.x += this.__viewport.speed_x * a, h.y += this.__viewport.speed_y * a),
                        h.update(a),
                        h.render(a)
                    }
                }
            },
            __viewport: {
                speed_x: 0,
                speed_y: 0
            },
            setviewPort: function(a, b) {
                this.__viewport.speed_x = a || 0,
                this.__viewport.speed_y = b || 0
            },
            init: function() {
                this.lastAnimationFrameTime = (new Date).getTime(),
                this.lastFpsUpdateTime = 0,
                this.p_x = this.canWidth / document.documentElement.clientWidth,
                this.p_y = this.canHeight / document.documentElement.clientHeight,
                this.pos_y = document.documentElement.clientHeight * this.p_x,
                this.requestAnimFrame = function() {
                    var b, c = d.fps;
                    return b = c ?
                    function(b) {
                        a.setTimeout(b, 1e3 / c)
                    }: a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame ||
                    function(b) {
                        a.setTimeout(b, 1e3 / 60)
                    }
                }.bind(this)().bind(),
                this.cancelAFrame = function() {
                    return a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.oCancelAnimationFrame ||
                    function(b) {
                        a.clearTimeout(b)
                    }
                } ().bind()
            }
        },
        c.extend = function() {
            var a, b, c, d, e = this;
            if (null != (a = arguments[0])) for (b in a) c = e[b],
            d = a[b],
            e !== d && (e[b] = d);
            return e
        },
        c
    };
    b.versions = function() {
        var a = navigator.userAgent;
        return navigator.appVersion,
        {
            trident: a.indexOf("Trident") > -1,
            presto: a.indexOf("Presto") > -1,
            webKit: a.indexOf("AppleWebKit") > -1,
            gecko: a.indexOf("Gecko") > -1 && -1 == a.indexOf("KHTML"),
            ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1,
            iPhone: a.indexOf("iPhone") > -1,
            iPad: a.indexOf("iPad") > -1,
            webApp: -1 == a.indexOf("Safari")
        }
    } (),
    b.inherit = function(a, b) {
        var c = new Function;
        c.prototype = b.prototype,
        a.prototype = new c,
        a.prototype.constructor = a,
        a.superclass = b.prototype,
        a.prototype.constructor == Object.prototype.constructor && (a.prototype.constructor = b)
    },
    b.extend = function(a, b) {
        var c;
        for (c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    },
    b.createSprite = function(a) {
        var c = function(c) {
            b.extend(this, a),
            b.Sprite.call(this, c)
        };
        return b.inherit(c, b.Sprite),
        c
    },
    b.createBitmap = function(a) {
        var c = function(c) {
            b.extend(this, a),
            b.Bitmap.call(this, c)
        };
        return b.inherit(c, b.Bitmap),
        c
    },
    b.eventList = {},
    b.DisplayObject = function(a) {
        this.x = 0,
        this.y = 0,
        this.width = 0,
        this.height = 0,
        this.alpha = 1,
        this.die = 0,
        this.rotation = 0,
        this.visible = 0,
        this.scaleX = 1,
        this.scaleY = 1,
        this.globalCompositeOperation = "",
        this.ctx = null,
        this.obb = [],
        this.eventFuc = {},
        this.static = 0,
        this.timeline = 0,
        this.ontween = 0,
        b.extend(this, a),
        this.__init()
    },
    b.DisplayObject.prototype = {
        __transform: function(a) {
            a.translate(this.x, this.y),
            this.alpha < 1 && (a.globalAlpha = this.alpha),
            this.rotation && a.rotate(this.rotation),
            (1 != this.scaleX || 1 != this.scaleY) && a.scale(this.scaleX, this.scaleY),
            this.globalCompositeOperation && (a.globalCompositeOperation = this.globalCompositeOperation)
        },
        render: function(a) {
            if (this.__tween(a), this.timeline++, !this.visible) {
                var b = this.ctx;
                b.save(),
                this.__transform(b),
                this.draw(b),
                b.restore()
            }
        },
        addEventListener: function(a, c) {
            b.eventList[a] || (b.eventList[a] = []),
            this.eventFuc[a] || (this.eventFuc[a] = []),
            b.eventList[a].push(this),
            this.eventFuc[a].push(c.bind(this))
        },
        removeEventListener: function(a) {
            b.eventList[a].splice(b.eventList[a].indexOf(this), 1),
            this.eventFuc[a] = []
        },
        testObb: function() {
            return new b.OBB(new b.Vector2(this.x - this.__obb_x, this.y - this.__obb_y), this.__w, this.__h, this.rotation)
        },
        __init: function() {
            this.__w = this.obb[2] - this.obb[0],
            this.__h = this.obb[3] - this.obb[1],
            this.__obb_x = this.width / 2 - this.obb[0] - this.__w / 2,
            this.__obb_y = this.height / 2 - this.obb[1] - this.__h / 2,
            this.w = this.width,
            this.h = this.height
        },
        setObb: function(a) {
            this.obb = a
        },
        checkBorder: function() {
            return b.OBBvsOBB(this.testObb(), new OBB(new b.Vector2(canvas_w / 2, canvas_h / 2), canvas_w, canvas_h, 0))
        },
        remove: function() {
            this.die = 1;
            for (var a in this.eventFuc) this.removeEventListener(a)
        },
        to: function(a, b, c, d, e, f) {
            this.duration = b,
            this.pattern = c || "Linear",
            this.ease = d || "easeIn",
            this.tween_obj = a,
            this.ontween = 1,
            this.current = 0,
            this.delaytime = e || 0,
            this.delaytime_t = 0,
            this.fuc = f || null,
            this.d_obj = {};
            for (i in a) this.d_obj[i] = this[i]
        },
        __tween: function(a) {
            if (this.ontween) if (this.delaytime_t >= this.delaytime) {
                this.current += a;
                for (i in this.tween_obj) this[i] = "Linear" == this.pattern ? b.Tween.Linear(this.current, this.d_obj[i], this.tween_obj[i] - this.d_obj[i], this.duration) : b.Tween[this.pattern][this.ease](this.current, this.d_obj[i], this.tween_obj[i] - this.d_obj[i], this.duration);
                if (this.current >= this.duration) {
                    for (i in this.tween_obj) this[i] = this.tween_obj[i];
                    this.ontween = 0,
                    this.delaytime_t = 0,
                    this.fuc && this.fuc()
                }
            } else this.delaytime_t += a
        }
    },
    b.Tween = {
        Linear: function(a, b, c, d) {
            return c * a / d + b
        },
        Quad: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a + b
            },
            easeOut: function(a, b, c, d) {
                return - c * (a /= d) * (a - 2) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a + b: -c / 2 * (--a * (a - 2) - 1) + b
            }
        },
        Cubic: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a * a + b
            },
            easeOut: function(a, b, c, d) {
                return c * ((a = a / d - 1) * a * a + 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a + b: c / 2 * ((a -= 2) * a * a + 2) + b
            }
        },
        Quart: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a * a * a + b
            },
            easeOut: function(a, b, c, d) {
                return - c * ((a = a / d - 1) * a * a * a - 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a * a + b: -c / 2 * ((a -= 2) * a * a * a - 2) + b
            }
        },
        Quint: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a * a * a * a + b
            },
            easeOut: function(a, b, c, d) {
                return c * ((a = a / d - 1) * a * a * a * a + 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a * a * a + b: c / 2 * ((a -= 2) * a * a * a * a + 2) + b
            }
        },
        Sine: {
            easeIn: function(a, b, c, d) {
                return - c * Math.cos(a / d * (Math.PI / 2)) + c + b
            },
            easeOut: function(a, b, c, d) {
                return c * Math.sin(a / d * (Math.PI / 2)) + b
            },
            easeInOut: function(a, b, c, d) {
                return - c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
            }
        },
        Expo: {
            easeIn: function(a, b, c, d) {
                return 0 == a ? b: c * Math.pow(2, 10 * (a / d - 1)) + b
            },
            easeOut: function(a, b, c, d) {
                return a == d ? b + c: c * ( - Math.pow(2, -10 * a / d) + 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return 0 == a ? b: a == d ? b + c: (a /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (a - 1)) + b: c / 2 * ( - Math.pow(2, -10 * --a) + 2) + b
            }
        },
        Circ: {
            easeIn: function(a, b, c, d) {
                return - c * (Math.sqrt(1 - (a /= d) * a) - 1) + b
            },
            easeOut: function(a, b, c, d) {
                return c * Math.sqrt(1 - (a = a / d - 1) * a) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b: c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
            }
        },
        Elastic: {
            easeIn: function(a, b, c, d, e, f) {
                if (0 == a) return b;
                if (1 == (a /= d)) return b + c;
                if (f || (f = .3 * d), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return - (e * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - g) * 2 * Math.PI / f)) + b
            },
            easeOut: function(a, b, c, d, e, f) {
                if (0 == a) return b;
                if (1 == (a /= d)) return b + c;
                if (f || (f = .3 * d), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return e * Math.pow(2, -10 * a) * Math.sin((a * d - g) * 2 * Math.PI / f) + c + b
            },
            easeInOut: function(a, b, c, d, e, f) {
                if (0 == a) return b;
                if (2 == (a /= d / 2)) return b + c;
                if (f || (f = d * .3 * 1.5), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return 1 > a ? -.5 * e * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - g) * 2 * Math.PI / f) + b: .5 * e * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * d - g) * 2 * Math.PI / f) + c + b
            }
        },
        Back: {
            easeIn: function(a, b, c, d, e) {
                return void 0 == e && (e = 1.70158),
                c * (a /= d) * a * ((e + 1) * a - e) + b
            },
            easeOut: function(a, b, c, d, e) {
                return void 0 == e && (e = 1.70158),
                c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
            },
            easeInOut: function(a, b, c, d, e) {
                return void 0 == e && (e = 1.70158),
                (a /= d / 2) < 1 ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b: c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
            }
        },
        Bounce: {
            easeIn: function(a, b, c, d) {
                return c - this.easeOut(d - a, 0, c, d) + b
            },
            easeOut: function(a, b, c, d) {
                return (a /= d) < 1 / 2.75 ? c * 7.5625 * a * a + b: 2 / 2.75 > a ? c * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + b: 2.5 / 2.75 > a ? c * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + b: c * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + b
            },
            easeInOut: function(a, b, c, d) {
                return d / 2 > a ? .5 * this.easeIn(2 * a, 0, c, d) + b: .5 * this.easeOut(2 * a - d, 0, c, d) + .5 * c + b
            }
        }
    },
    b.Bitmap = function(a) {
        b.DisplayObject.call(this, a)
    },
    b.inherit(b.Bitmap, b.DisplayObject),
    b.Bitmap.prototype.draw = function(a) {
        a.drawImage(this.img, 0, 0, this.width, this.height, -this.w / 2, -this.h / 2, this.w, this.h)
    },
    b.Bitmap.prototype.update = function() {},
    b.Sprite = function(a) {
        this.anim = null,
        b.DisplayObject.call(this, a)
    },
    b.inherit(b.Sprite, b.DisplayObject),
    b.Sprite.prototype.draw = function(a) {
        a.drawImage(this.anim.img, this.anim.x, this.anim.y, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height)
    },
    b.Sprite.prototype.setAnim = function(a) {
        this.anim = a
    },
    b.Animdata = function(a, b, c) {
        for (var d = [], e = a.height / b, f = a.width / c, g = 0; b > g; g++) for (var h = 0; c > h; h++) d.push([h * f, e * g]);
        return d
    },
    b.Animation = function(a) {
        this.ctx = null,
        this.img = null,
        this.frames = [],
        this.loop = 0,
        this.speed = 1,
        this.__speed_t = 0,
        this.duration = 0,
        this.frameIndex = 0,
        this.onplay = 1,
        b.extend(this, a),
        this.len = this.frames.length
    },
    b.Animation.prototype = {
        update: function(a) {
            this.onplay && (this.__speed_t += a * this.speed, this.__speed_t >= this.duration && this.__nextFrame(Math.floor(this.__speed_t / this.duration)), this.x = this.frames[this.frameIndex][0], this.y = this.frames[this.frameIndex][1])
        },
        setEndfuc: function(a) {
            this.endfuc = a
        },
        setSpeed: function(a) {
            this.speed = a,
            this.__speed_t = 0
        },
        stop: function() {
            this.onplay = 0
        },
        play: function() {
            this.onplay = 1
        },
        __nextFrame: function(a) {
            this.frameIndex < this.len - a ? this.goframe(this.frameIndex + a) : this.loop ? this.goframe(0) : (this.endfuc && this.endfuc(), this.stop())
        },
        goframe: function(a) {
            this.frameIndex = a,
            this.__speed_t = 0
        }
    },
    b.TextField = function(a) {
        this.type = "text",
        this.color = "#000",
        this.size = "12px",
        this.family = "Arial",
        this.text = "",
        this.weight = "normal",
        this.textAlign = "left",
        b.DisplayObject.call(this, a)
    },
    b.inherit(b.TextField, b.DisplayObject),
    b.TextField.prototype.draw = function(a) {
        a.fillStyle = this.color,
        a.textAlign = this.textAlign,
        a.font = this.weight + " " + this.size + "px " + this.family,
        a.fillText(this.text, 0, 0),
        a.fill()
    },
    b.TextField.prototype.update = function() {},
    b.Math = {
        random: function(a, b) {
            return Math.floor(Math.random() * (b - a + 1) + a)
        },
        coordinate: function(a, b, c, d, e) {
            var f = (a - c) * Math.cos(e),
            g = (b - d) * Math.sin(e);
            return [Math.round(f - g + c), Math.round(f + g + c)]
        }
    },
    b.OBB = function(a, c, d, e) {
        this.centerPoint = a,
        this.extents = [c / 2, d / 2],
        this.axes = [new b.Vector2(Math.cos(e), Math.sin(e)), new b.Vector2( - Math.sin(e), Math.cos(e))],
        this._width = c,
        this._height = d,
        this._rotation = e
    },
    b.OBB.prototype.getRadius = function(a) {
        return this.extents[0] * Math.abs(a.dot(this.axes[0])) + this.extents[1] * Math.abs(a.dot(this.axes[1]))
    },
    b.Vector2 = function(a, b) {
        this.x = a || 0,
        this.y = b || 0
    },
    b.Vector2.prototype = {
        sub: function(a) {
            return new b.Vector2(this.x - a.x, this.y - a.y)
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y
        }
    },
    b.OBBvsOBB = function(a, b) {
        var c = a.centerPoint.sub(b.centerPoint),
        d = a.axes[0],
        e = a.axes[1],
        f = b.axes[0],
        g = b.axes[1];
        return a.getRadius(g) + b.getRadius(g) <= Math.abs(c.dot(g)) || a.getRadius(f) + b.getRadius(f) <= Math.abs(c.dot(f)) || a.getRadius(e) + b.getRadius(e) <= Math.abs(c.dot(e)) || a.getRadius(d) + b.getRadius(d) <= Math.abs(c.dot(d)) ? 0 : 1
    },
    a.eG = a.easyGame = b
} (window);