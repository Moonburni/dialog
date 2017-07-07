window.onload = function () {
  dialogBuilder('你好');
  var loadingArr = document.querySelectorAll(".loading");
    if(loadingArr.length>0){
        loadingArr.forEach(function (item) {
            var text ="<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>"
            item.innerHTML = text;
        })
    }
};

function dialogBuilder(text) {
    var content = document.getElementById('content');
    var dialogMain = document.createElement('div');
    dialogMain.className = 'dialog_main';
    var DOMText = `<div class="dialog_avatar"></div><p class="dialog_body"><span class="loading"></span></p>`;
    dialogMain.innerHTML = DOMText;
    setTimeout(()=> {
        DOMText = `<div class="dialog_avatar"></div><p class="dialog_body">${text}</p>`;
        dialogMain.innerHTML = DOMText;
    },text.length*100);
    content.appendChild(dialogMain);
}

function answerBuilder(text){
    var content = document.getElementById('content');
    var answer = document.createElement('p');
    answer.className = 'dialog_body_right';
    answer.innerText = text;
    content.appendChild(answer);
}
