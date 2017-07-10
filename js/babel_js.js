"use strict";

window.onload = function () {
    scrollMove(true, online, "你好", dialogBuilder, "我是moonburn~", dialogBuilder, "很高兴在这里和你相遇", dialogBuilder, ["你是谁？", "这是什么？"], answerBodyBuilder);
};
var dialogDomain = Object.create(null);
dialogDomain.loadingText = "<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>";

function goOn(state) {
    if (state === '你是谁？' || state === "能介绍一下你自己吗？") {
        scrollMove("O(∩_∩)O", dialogBuilder, "我是广州中医药大学", dialogBuilder, "计算机专业的大四学生", dialogBuilder, "特别喜欢前端~", dialogBuilder, ["除了前端还有什么兴趣爱好？", "详细一点可以吗？"], answerBodyBuilder);
    } else if (state === '这是什么？') {
        scrollMove("额...", dialogBuilder, "这个是我模仿一款叫做《异次元通讯》的手机文字游戏做的", dialogBuilder, "是不是很特别呀,哈哈", dialogBuilder, ["能介绍一下你自己吗？", "做这个的目的是什么？"], answerBodyBuilder);
    } else if (state === '做这个的目的是什么？') {
        scrollMove("...", dialogBuilder, "不瞒您说，我是想找一份有关前端实习的工作（捂脸）", dialogBuilder, "又不知道做什么", dialogBuilder, "觉得这个挺好玩的，就像试试看", dialogBuilder, ["还有其他东西吗？", "介绍一下你吧"], answerBodyBuilder);
    } else if (state === "能介绍一下你自己吗？" || state === "详细一点可以吗？" || state === "介绍一下你吧") {
        scrollMove("性别男", dialogBuilder, "爱好...前端", dialogBuilder, "广州中医药计算机专业大四学生", dialogBuilder, "<a href='https://github.com/Moonburni'>我的gitHub</a>", dialogBuilder, "<a href='http://www.jianshu.com/u/4ce5e6053736'>我的简书</a>", dialogBuilder, ["不错!怎么联系你？", "再见，对你不感兴趣"], answerBodyBuilder);
    } else if (state === "除了前端还有什么兴趣爱好？") {
        scrollMove("我喜欢唱歌", dialogBuilder, "喜欢音乐", dialogBuilder, "还有看书，各种书~各种类型的书", dialogBuilder, ["介绍一下你吧", "再见，对你不感兴趣"], answerBodyBuilder);
    } else if (state === "再见，对你不感兴趣") {
        scrollMove("好吧，再见....", dialogBuilder, false, online);
    } else if (state === "不错!怎么联系你？" || state === "快到碗里来!") {
        scrollMove("我的电子邮箱是：", dialogBuilder, "2047311885@qq.com", dialogBuilder, "我的手机是：", dialogBuilder, "13535452921", dialogBuilder, "求勾搭，求联系~", dialogBuilder, false, online);
    } else if (state === "还有其他东西吗？") {
        scrollMove("<a href='https://github.com/Moonburni'>我的gitHub</a>", dialogBuilder, "<a href='http://www.jianshu.com/u/4ce5e6053736'>我的简书</a>", dialogBuilder, ["不错!怎么联系你？", "再见，对你不感兴趣"], answerBodyBuilder);
    }
}

function dialogBuilder(text) {
    var content = document.getElementById('content');
    var dialogMain = document.createElement('div');
    dialogMain.className = 'dialog_main turnLeft';
    var DOMText = "<div class=\"dialog_avatar\" onclick=\"avatarTouch()\"></div><p class=\"dialog_body\"><span class=\"loading\">" + dialogDomain.loadingText + "</span></p>";
    dialogMain.innerHTML = DOMText;
    setTimeout(function () {
        var oldHeight = content.scrollHeight;
        DOMText = "<div class=\"dialog_avatar\" onclick=\"avatarTouch()\"></div><p class=\"dialog_body\">" + text + "</p>";
        dialogMain.innerHTML = DOMText;
        var newHeight = content.scrollHeight;
        for (var i = newHeight - oldHeight; i > 0; i--) {
            setTimeout(function () {
                content.scrollTop++;
            }, i * 10);
        }
    }, 1000);
    content.appendChild(dialogMain);
}

function answerBuilder(text) {
    var content = document.getElementById('content');
    var answer = document.createElement('p');
    answer.className = 'dialog_body_right turnRight';
    answer.innerText = text;
    content.appendChild(answer);
}

function answerBodyBuilder(text) {
    var oldHeight = document.body.scrollHeight;
    var answerBody = document.getElementById('answer_body');
    answerBody.style.display = 'flex';
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
        selectAnswer(text[0]);
        answerBody.style.display = 'none';
        answerBody.style.height = '0';
        setTimeout(function () {
            goOn(text[0]);
        }, 1000);
    };
    answerContent2.onclick = function () {
        selectAnswer(text[1]);
        answerBody.style.display = 'none';
        answerBody.style.height = '0';
        setTimeout(function () {
            goOn(text[1]);
        }, 1000);
    };
}

function online(bol) {
    var content = document.getElementById('content');
    var online = document.createElement('p');
    if (bol === true) {
        online.className = 'system green turnIn';
        online.innerText = '已上线';
    } else {
        online.className = 'system red turnIn';
        online.innerText = '已下线';
    }
    content.appendChild(online);
}

function scrollMove(text, fn) {
    for (var _len = arguments.length, callback = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        callback[_key - 2] = arguments[_key];
    }

    var content = document.getElementById('content');
    var oldHeight = content.scrollHeight;
    if (fn) {
        fn(text);
    }
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
}

function selectAnswer(text) {
    scrollMove(text, answerBuilder);
}

function avatarTouch() {
    var main = document.getElementById("main");
    var info = document.getElementById("info_body");
    main.className = "page_turn_up";
    info.className = "info_page_turn_down";
}

function infoBodyTouch() {
    var main = document.getElementById("main");
    var info = document.getElementById("info_body");
    main.className = "page_turn_down";
    info.className = "info_page_turn_up";
}