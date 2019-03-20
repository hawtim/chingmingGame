loadImg1 = new Image;
loadImg1.src = "img/load1.png";

function findImage(id) {
    return imgArr.find(function(e) {
        return e.id == id
    })
}

var gameInstance = easyGame({
    canvas: document.getElementById("myCanvas")
});
var imgArr = [{
    id: "bg",
    url: "img/bg.jpg"
},
{
    id: "over_bg",
    url: "img/over_bg.png"
},
{
    id: "startBtn",
    url: "img/startBtn.png",
    width: 313,
    height: 134
},
{
    id: "fj1",
    url: "img/fj1.png"
},
{
    id: "fx_n",
    url: "img/fx_n.png"
},
{
    id: "boo",
    url: "img/boo.png"
},
{
    id: "sg1",
    url: "img/sg1.png"
},
{
    id: "sg2",
    url: "img/sg2.png"
},
{
    id: "sg3",
    url: "img/sg3.png"
},
{
    id: "sg4",
    url: "img/sg4.png"
},
{
    id: "sg5",
    url: "img/sg5.png"
},
{
    id: "sg6",
    url: "img/sg6.png"
},
{
    id: "sd",
    url: "img/sd.png"
},
{
    id: "winBg",
    url: "img/winBg.jpg"
},
{
    id: "zw",
    url: "img/zw.png"
},
{
    id: "xy",
    url: "img/xy.png"
},
{
    id: "fx",
    url: "img/fx.png"
},
{
    id: "rule",
    url: "img/rule.png",
    width: 490,
    height: 83
}]
gameInstance.loading(imgArr, function() {
    gameInstance.gameStart(),
    gameInstance.startReady()
}),
gameInstance.extend({
    createBg: function() {
        this.bglayer = gameInstance.createLayer();
        var a = new Bg({
            x: 180,
            y: 990,
            type: 0,
            img: gameInstance.getImg("bg"),
            width: 360,
            height: 660,
            ctx: gameInstance.ctx
        }),
        b = new Bg({
            x: 180,
            y: 330,
            type: 1,
            img: gameInstance.getImg("bg"),
            width: 360,
            height: 660,
            ctx: gameInstance.ctx
        });
        this.bglayer.push(a, b)
    },
    // 创建按钮
    createrBtn: function(img, left, top, obj) {
        var width = obj.width,
            height = obj.height;
        instance = new easyGame.Bitmap({
            ctx: gameInstance.ctx,
            img: img,
            width: width,
            height: height,
            static: 1,
            x: left,
            y: top,
            ct: 0,
            obb: [0, 0, width, height],
            // 设置比例
            scaleX: .5,
            scaleY: .5
        });
        return instance
    },
    createRule: function(img, left, top, obj) {
        var width = obj.width,
            height = obj.height;
        instance = new easyGame.Bitmap({
            ctx: gameInstance.ctx,
            img: img,
            width: width,
            height: height,
            static: 1,
            x: left,
            y: top,
            ct: 0,
            obb: [0, 0, width, height],
            // 设置比例
            scaleX: .5,
            scaleY: .5
        });
        return instance
    },
    createStart: function() {
        var startBtn = this.createrBtn(gameInstance.getImg("startBtn"), 180, gameInstance.pos_y - 180, findImage('startBtn'));
        startBtn.to({ y: gameInstance.pos_y - 180 }, 400, "Circ", "easeOut", 0, function() {
            startBtn.update = function(a) {
                this.ct += a,
                this.y -= Math.sin(Math.PI / 500 * this.ct)
            }
        });
        startBtn.addEventListener("touchstart", function() {
            gameInstance.overBg.hide(),
            gameInstance.fx1.addEventListener("touchstart", function() {
                gameInstance.fj.fx = "R"
            }),
            gameInstance.fx2.addEventListener("touchstart", function() {
                gameInstance.fj.fx = "L"
            }),
            gameInstance.fx1.addEventListener("touchend", function() {
                gameInstance.fj.fx = "CL"
            }),
            gameInstance.fx2.addEventListener("touchend", function() {
                gameInstance.fj.fx = "CL"
            }),
            rule.to({ x: 580 }, 400, "Back", "easeIn", 0, function() {
                this.remove()
            }),
            this.to({ x: 620 }, 300, "Back", "easeIn", 0, function() {
                this.remove(),
                gameInstance.onstop = 0
            })
        }),
        this.btnlayer.push(startBtn)
        var rule = this.createRule(gameInstance.getImg("rule"), -180, gameInstance.pos_y - 360, findImage('rule'));
        rule.to({ x: 180 }, 500, "Back", "easeOut", 0);
        this.btnlayer.push(rule);
    },
    createBoo: function(a, b, c, d, e) {
        var f = a.width,
        g = a.height,
        h = Math.PI / 18 * eG.Math.random(1, 36),
        i = new Boo({
            ctx: gameInstance.ctx,
            img: a,
            width: f,
            height: g,
            w: b,
            h: c,
            static: 1,
            speed: eG.Math.random(4, 6),
            x: d,
            y: e,
            rotation: h
        });
        this.mainlayer.push(i)
    },
    collide: function() {
        gameInstance.fj.to({ y: gameInstance.pos_y, rotation: 2 * Math.PI }, 500, "Back", "easeIn", 0, function() {
            for (var a = 0; 10 > a; a++) gameInstance.createBoo(gameInstance.getImg("boo"), 32, 32, gameInstance.fj.x, gameInstance.fj.y);
            gameInstance.overBg.show();
            var b = new easyGame.TextField({
                x: 180,
                y: -40,
                text: "寻根路上行走了" + gameInstance.jl.text,
                static: 1,
                color: "#fff",
                weight: "bold",
                ctx: gameInstance.ctx,
                n: 0,
                size: 32,
                textAlign: "center"
            });
            b.to({ y: 180 }, 300, "Back", "easeOut", 200);
            displaySubmitScore(gameInstance.jl.n.toFixed(1));
            var c = new easyGame.TextField({
                x: 180,
                y: gameInstance.pos_y + 60,
                text: "您击败了全村" + gameInstance.sortScore() + "的寻根者",
                static: 1,
                color: "#fff",
                weight: "bold",
                ctx: gameInstance.ctx,
                n: 0,
                size: 22,
                textAlign: "center"
            });
            c.to({y: 240}, 400, "Back", "easeOut", 200),
            gameInstance.overlayer.push(gameInstance.winBg);
            var d = gameInstance.createrBtn(gameInstance.getImg("zw"), -180, 290),
            e = gameInstance.createrBtn(gameInstance.getImg("xy"), 480, 290);
            d.to({
                x: 96,
                rotation: 2 * Math.PI
            },
            300, "Back", "easeOut", 600),
            e.to({
                x: 264,
                rotation: 2 * Math.PI
            },
            300, "Back", "easeOut", 900),
            d.addEventListener("touchstart",
            function() {
                gameInstance.setEmpty(),
                gameInstance.startReady()
            }),
            e.addEventListener("touchstart",
            function() {
                displayShare();
            }),
            gameInstance.btnlayer.push(d, e),
            gameInstance.btnlayer.push(b, c)
        }),
        gameInstance.setviewPort(0, 0),
        gameInstance.onstop = 1
    },
    getItext: function() {
        return "我下了" + gameInstance.jl.text + "m,击败了全国" + gameInstance.sortScore() + "的寻根者，来试试吧！！！"
    },
    startReady: function() {
        this.n = 0,
        this.prize_n = 0,
        this.onstop = 1,
        this.createBg(),
        this.squarelayer = gameInstance.createLayer(),
        this.mainlayer = gameInstance.createLayer(),
        this.overlayer = gameInstance.createLayer(),
        this.btnlayer = gameInstance.createLayer(),
        this.createStart(),
        this.createsquare(500, gameInstance.getImg("sg" + eG.Math.random(1, 6))),
        gameInstance.getLast_y(),
        this.createsquare(this.last_y + 250, gameInstance.getImg("sg" + eG.Math.random(1, 6))),
        this.fj = new Plane({
            x: 180,
            speed: 800,
            y: -40,
            static: 0,
            img: gameInstance.getImg("fj1"),
            width: 48,
            height: 48,
            st: 0,
            fx: "CL",
            ctx: gameInstance.ctx,
            obb: [20, 10, 32, 48]
        }),
        this.fj_yy = new easyGame.Bitmap({
            x: gameInstance.fj.x + 30,
            y: gameInstance.fj.y + 40,
            img: gameInstance.getImg("sd"),
            width: 36,
            height: 38,
            ctx: gameInstance.ctx
        }),
        this.fj_yy.update = function() {
            this.x = gameInstance.fj.x + 40,
            this.y = gameInstance.fj.y + 40,
            this.rotation = gameInstance.fj.rotation
        },
        this.mainlayer.push(this.fj_yy, this.fj),
        this.jl = new easyGame.TextField({
            x: 160,
            y: 30,
            text: "0m",
            static: 1,
            color: "#fff",
            weight: "bold",
            ctx: gameInstance.ctx,
            n: 0,
            size: 28
        }),
        this.mainlayer.push(this.jl),
        this.fx1 = new easyGame.Bitmap({
            x: 75,
            y: gameInstance.pos_y - 75,
            static: 1,
            img: gameInstance.getImg("fx_n"),
            width: 150,
            height: 150,
            visible: 1,
            obb: [0, 0, 150, 150],
            ctx: gameInstance.ctx
        }),
        this.fx2 = new easyGame.Bitmap({
            x: 285,
            y: gameInstance.pos_y - 75,
            static: 1,
            img: gameInstance.getImg("fx_n"),
            width: 150,
            height: 150,
            visible: 1,
            obb: [0, 0, 150, 150],
            ctx: gameInstance.ctx
        }),
        this.mainlayer.push(this.fx1, this.fx2),
        this.overBg = new easyGame.Bitmap({
            x: 180,
            y: 330,
            static: 1,
            img: gameInstance.getImg("over_bg"),
            width: 360,
            height: 660,
            alpha: .5,
            ctx: gameInstance.ctx
        }),
        this.overBg.to({ alpha: 1 }, 300, "Linear", "easeIn", 0),
        this.overBg.show = function() {
            gameInstance.overBg.die = 0,
            gameInstance.overBg.alpha = 1,
            gameInstance.disable = 0,
            gameInstance.overlayer.push(gameInstance.overBg)
        },
        this.overBg.hide = function() {
            gameInstance.disable = 1,
            gameInstance.overBg.remove()
        },
        this.overBg.show(),
        this.fxBox = new easyGame.Bitmap({
            x: 180,
            y: 330,
            static: 1,
            img: gameInstance.getImg("fx"),
            width: 360,
            height: 660,
            alpha: 1,
            ctx: gameInstance.ctx
        }),
        this.fxBox.to({ alpha: 0 }, 300, "Linear", "easeIn", 2000, function() {
            gameInstance.fxBox.remove()
        }),
        this.fxBox.show = function() {
            gameInstance.fxBox.die = 0,
            gameInstance.fxBox.alpha = 1,
            gameInstance.fxBox.to({ alpha: 0 }, 300, "Linear", "easeIn", 2000, function() {
                gameInstance.fxBox.remove()
            }),
            gameInstance.btnlayer.push(gameInstance.fxBox)
        },
        this.fxBox.hide = function() {
            gameInstance.fxBox.remove()
        },
        this.winBg = new easyGame.Bitmap({
            x: 180,
            y: 250,
            globalCompositeOperation: "lighter",
            static: 1,
            img: gameInstance.getImg("winBg"),
            width: 700,
            height: 700,
            ctx: gameInstance.ctx,
            alpha: 0,
            rotation: 0
        }),
        this.winBg.to({ alpha: 1 }, 400, "Linear", "easeIn", 400),
        this.winBg.update = function(a) {
            this.rotation += Math.PI / 3e3 * a
        }
    },
    createBlockList: function(a) {
        var b = eG.Math.random(1, 2);
        switch (b) {
        case 1:
            return this.createlxx(a - 220),
            this.createBlock(50 - 5 * eG.Math.random(1, 20), a, block.getImg("b"), 0);
        case 2:
            return this.createlxx(a - 220),
            this.createBlock(430 + 5 * eG.Math.random(1, 20), a, block.getImg("b"), 0)
        }
    },
    hasGift: function() {
        this.score.update = function() {
            this.y = block.over1.y - 148
        },
        block.score.text = block.sortScore(),
        block.overlayer.push(block.winBg, block.over1, block.over1btn1, block.over1btn2, block.score),
        block.over1btn2.addEventListener("touchstart", function() {
            block.setEmpty(),
            block.startReady(),
            block.canvas.className = ""
        }),
        block.over1btn1.addEventListener("touchstart", function() {})
    },
    sortScore: function() {
        var a = 0;
        return a = gameInstance.jl.n < 110 ? .88 * gameInstance.jl.n: gameInstance.jl.n < 305 ? 95.92 + .1 * Math.round((gameInstance.jl.n - 105) / 5) : 100,
        a.toFixed(2) + "%"
    },
    getLast_y: function() {
        var a = this.squarelayer[this.squarelayer.length - 1];
        this.last_y = a.y + a.height / 2
    },
    createsquare: function(a, b) {
        var c = b.height,
        d = eG.Math.random( - 10, 10),
        e = new square({
            ctx: gameInstance.ctx,
            img: b,
            width: 368,
            height: c,
            x: 10 * d - 50 - 10 * eG.Math.random(0, 4),
            y: a + c / 2,
            type: 1,
            obb: [16, 13, 346, c - 13]
        }),
        f = new square({
            ctx: gameInstance.ctx,
            img: b,
            width: 368,
            height: c,
            x: 360 + 10 * d + 50 + 10 * eG.Math.random(0, 4),
            y: a + c / 2,
            type: 0,
            obb: [16, 13, 346, c - 13]
        });
        this.squarelayer.push(e, f)
    }
}),
gameInstance.addEventListener("touchstart"),
gameInstance.addEventListener("touchend");
var square = eG.createBitmap({ kg: 1 });
square.prototype.update = function() {
    eG.OBBvsOBB(this.testObb(), gameInstance.fj.testObb()) && this.kg && !gameInstance.onstop && (this.kg = 0, gameInstance.collide()),
    this.y <= -this.height / 2 && this.kg && (this.kg = 0, 1 == this.type && (gameInstance.getLast_y(), gameInstance.createsquare(gameInstance.last_y + 250, gameInstance.getImg("sg" + eG.Math.random(1, 6)))), this.remove())
};
var Bg = eG.createBitmap();
Bg.prototype.update = function() {
    this.y <= -this.height / 2 && (this.y += 2 * this.height)
};
var Boo = eG.createBitmap();
Boo.prototype.update = function(a) {
    this.y += this.speed * a / 15 * Math.cos( - this.rotation),
    this.x += this.speed * a / 15 * Math.sin( - this.rotation),
    this.w -= 1,
    this.h -= 1,
    this.alpha -= .002 * a,
    this.w < 2 && this.remove()
};
var Plane = eG.createBitmap();
Plane.prototype.update = function(a) {
    if (!gameInstance.onstop) {
        a > 200 && (a = 20),
        this.move();
        var b = Math.cos(this.rotation);
        Math.sin(this.rotation),
        this.y <= 200 && !this.static ? (this.y += this.speed / 12e3 * a * b * b * b * b * b, this.x -= this.speed / 12e3 * a * Math.sin(this.rotation)) : (this.static = 1, gameInstance.setviewPort(0, -this.speed / 12e3 * b * b * b * b * b), this.x -= this.speed / 12e3 * a * Math.sin(this.rotation)),
        this.speed < 8e3 && this.speed++,
        (this.x < -40 || this.x > 360 || this.y > 660) && gameInstance.collide(),
        gameInstance.jl.n += this.speed / 24e4 * b * b * b * b * b,
        gameInstance.jl.text = gameInstance.jl.n.toFixed(1) + "m"
    }
},
Plane.prototype.move = function() {
    switch (this.fx) {
    case "R":
        this.rotation <= Math.PI / 2 && (this.rotation += Math.PI / 60);
        break;
    case "L":
        this.rotation >= -Math.PI / 2 && (this.rotation -= Math.PI / 60);
        break;
    case "CL":
    }
}