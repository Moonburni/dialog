"use strict";

function Dialog(content, type, className) {
    this.loadingText = "<span></span><span></span><span></span><span></span>" + "<span></span><span></span><span></span><span></span>";
    this.content = content;
    this.type = type;
    this.className = className;
};

Dialog.prototype.init = function (text) {
    var content = document.getElementById(this.content);
    var dialogMain = document.createElement(this.type);
    dialogMain.className = this.className;
    dialogMain.innerText = text;
    content.appendChild(dialogMain);
};

function DialogLeft() {
    Dialog.apply(this, arguments);
};
DialogLeft.prototype = new Dialog();
DialogLeft.prototype.init = function (text) {
    var content = document.getElementById(this.content);
    var dialogMain = document.createElement(this.type);
    dialogMain.className = this.className;
    var DOMText = "<div class=\"dialog_avatar\" onclick=\"action.avatarTouch()\"></div><p class=\"dialog_body\"><span class=\"loading\">" + this.loadingText + "</span></p>";
    dialogMain.innerHTML = DOMText;
    setTimeout(function () {
        var oldHeight = content.scrollHeight;
        DOMText = "<div class=\"dialog_avatar\" onclick=\"action.avatarTouch()\"></div><p class=\"dialog_body\">" + text + "</p>";
        dialogMain.innerHTML = DOMText;
        var newHeight = content.scrollHeight;
        for (var i = newHeight - oldHeight; i > 0; i--) {
            setTimeout(function () {
                content.scrollTop++;
            }, i * 10);
        }
    }, 1000);
    content.appendChild(dialogMain);
};
var dialogLeft = new DialogLeft('content', 'div', 'dialog_main turnLeft');

var dialogRight = new Dialog('content', 'p', 'dialog_body_right turnRight');

function DialogDown() {};
DialogDown.prototype = new Dialog();
DialogDown.prototype.init = function (text) {
    var oldHeight = document.body.scrollHeight;
    var answerBody = document.getElementById('answer_body');
    answerBody.style.height = '2rem';
    setTimeout(function () {
        var newHeight = document.body.scrollHeight;
        for (var i = newHeight - oldHeight; i > 0; i--) {
            setTimeout(function () {
                document.body.scrollTop++;
            }, i);
        }
    }, 500);
    var answerContent1 = document.getElementById('answer_content_1');
    var answerContent2 = document.getElementById('answer_content_2');
    answerContent1.innerHTML = text[0];
    answerContent2.innerHTML = text[1];
    answerContent1.onclick = function () {
        action.selectAnswer(text[0]);
        answerBody.style.height = '0';
        setTimeout(function () {
            goOn(selectState(text[0]));
        }, 1000);
    };
    answerContent2.onclick = function () {
        action.selectAnswer(text[1]);
        answerBody.style.height = '0';
        setTimeout(function () {
            goOn(selectState(text[1]));
        }, 1000);
    };
};
var dialogDown = new DialogDown();
function Online(content, type, className, color) {
    this.color = color;
    Dialog.apply(this, arguments);
};
Online.prototype = new Dialog();
Online.prototype.init = function () {
    var content = document.getElementById(this.content);
    var dialogMain = document.createElement(this.type);
    dialogMain.className = this.className + " " + this.color + " turnIn";
    if (this.color === 'red') {
        dialogMain.innerText = '已下线';
    } else {
        dialogMain.innerText = '已上线';
    }
    content.appendChild(dialogMain);
};
var online_green = new Online('content', 'p', 'system', 'green');
var online_red = new Online('content', 'p', 'system', 'red');
var scrollMove = function scrollMove(text, obj) {
    for (var _len = arguments.length, callback = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        callback[_key - 2] = arguments[_key];
    }

    var content = document.getElementById('content');
    var oldHeight = content.scrollHeight;
    obj && obj.init && obj.init(text);
    var newHeight = content.scrollHeight;
    for (var i = newHeight - oldHeight; i > 0; i--) {
        setTimeout(function () {
            content.scrollTop++;
        }, i);
    }
    if (callback.length > 0) {
        setTimeout(function () {
            return scrollMove.apply(undefined, callback);
        }, 1500);
    }
};
var action = {
    selectAnswer: function selectAnswer(text) {
        scrollMove(text, dialogRight);
    },
    avatarTouch: function avatarTouch() {
        var main = document.getElementById("main");
        var info = document.getElementById("info_body");
        main.className = "page_turn_up";
        info.className = "info_page_turn_down";
    },
    infoBodyTouch: function infoBodyTouch() {
        var main = document.getElementById("main");
        var info = document.getElementById("info_body");
        main.className = "page_turn_down";
        info.className = "info_page_turn_up";
    }
};

function goOn(state) {
    if (state === 1) {
        scrollMove("O(∩_∩)O", dialogLeft, "我是广州中医药大学", dialogLeft, "计算机专业的大四学生", dialogLeft, "特别喜欢前端~", dialogLeft, ["除了前端还有什么兴趣爱好？", "详细一点可以吗？"], dialogDown);
    } else if (state === 2) {
        scrollMove("额...", dialogLeft, "这个是我模仿一款叫做《异次元通讯》的手机文字游戏做的", dialogLeft, "是不是很特别呀,哈哈", dialogLeft, ["能介绍一下你自己吗？", "做这个的目的是什么？"], dialogDown);
    } else if (state === 3) {
        scrollMove("...", dialogLeft, "不瞒您说，我是想找一份有关前端实习的工作（捂脸）", dialogLeft, "又不知道做什么", dialogLeft, "觉得这个挺好玩的，就像试试看", dialogLeft, ["还有其他东西吗？", "介绍一下你吧"], dialogDown);
    } else if (state === 4) {
        scrollMove("性别男", dialogLeft, "爱好...前端", dialogLeft, "广州中医药计算机专业大四学生", dialogLeft, "<a href='https://github.com/Moonburni'>我的gitHub</a>", dialogLeft, "<a href='http://www.jianshu.com/u/4ce5e6053736'>我的简书</a>", dialogLeft, ["不错!怎么联系你？", "再见，对你不感兴趣"], dialogDown);
    } else if (state === 5) {
        scrollMove("我喜欢唱歌", dialogLeft, "喜欢音乐", dialogLeft, "还有看书，各种书~各种类型的书", dialogLeft, ["介绍一下你吧", "再见，对你不感兴趣"], dialogDown);
    } else if (state === 6) {
        scrollMove("好吧，再见....", dialogLeft, '', online_red);
    } else if (state === 7) {
        scrollMove("我的电子邮箱是：", dialogLeft, "2047311885@qq.com", dialogLeft, "我的手机是：", dialogLeft, "13535452921", dialogLeft, "求勾搭，求联系~", dialogLeft, '', online_red);
    } else if (state === 8) {
        scrollMove("<a href='https://github.com/Moonburni'>我的gitHub</a>", dialogLeft, "<a href='http://www.jianshu.com/u/4ce5e6053736'>我的简书</a>", dialogLeft, ["不错!怎么联系你？", "再见，对你不感兴趣"], dialogDown);
    }
}

function selectState(state) {
    if (state === '你是谁？' || state === "能介绍一下你自己吗？") {
        return 1;
    } else if (state === '这是什么？') {
        return 2;
    } else if (state === '做这个的目的是什么？') {
        return 3;
    } else if (state === "能介绍一下你自己吗？" || state === "详细一点可以吗？" || state === "介绍一下你吧") {
        return 4;
    } else if (state === "除了前端还有什么兴趣爱好？") {
        return 5;
    } else if (state === "再见，对你不感兴趣") {
        return 6;
    } else if (state === "不错!怎么联系你？" || state === "快到碗里来!") {
        return 7;
    } else if (state === "还有其他东西吗？") {
        return 8;
    }
}

window.onload = function () {
    scrollMove('', online_green, "你好", dialogLeft, "我是moonburn~", dialogLeft, "很高兴在这里和你相遇", dialogLeft, ["你是谁？", "这是什么？"], dialogDown);
};
