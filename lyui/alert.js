var alertQueue = new Array;
var isShow = false;

function alertInsert(e) {
    alertQueue.push(e);
    if (isShow == false) {
        document.body.appendChild(alertQueue[0]);
        alertQueue.shift();
        isShow = true;
    }
}

async function alertDestory() {
    isShow = false;
    var e = document.getElementsByClassName("alert")[0];
    if (alertQueue.length) isShow = true;
    e.classList.add("alert-destorying");
    await sleep(100);
    document.body.removeChild(e);
    if (alertQueue.length) {
        document.body.appendChild(alertQueue[0]);
        alertQueue.shift();
    }
}

async function alert(title, context, button_context) {
    let e = document.createElement("div");
    e.classList.add("alert");
    
    // 标题的构造
    let e_title = document.createElement("div");
    e_title.classList.add("alert-title");
    let e_title_inner = document.createElement("TextView");
    e_title_inner.innerHTML = title;
    e_title_inner.style.fontSize = "16px";
    e_title.appendChild(e_title_inner);
    e.appendChild(e_title);

    // 分隔符的构造
    let hr = document.createElement("div");
    hr.classList.add("hr");
    e.appendChild(hr);

    // 内容的构造
    let e_context = document.createElement("div");
    e_context.classList.add("alert-context");
    let e_context_inner = document.createElement("div");
    e_context_inner.style.width = "100%";
    context = context.split("\n");
    for (i = 0; i < context.length; i++) {
        let center = document.createElement("center");
        let textview = document.createElement("TextView");
        textview.innerHTML = context[i];
        center.appendChild(textview);
        center.style.height = "20px";
        e_context_inner.appendChild(center);
    }
    e_context.appendChild(e_context_inner);
    e.appendChild(e_context);

    // 分隔符的构造
    hr = document.createElement("div");
    hr.classList.add("hr");
    e.appendChild(hr);

    // 按钮的构造
    let e_footer = document.createElement("div");
    e_footer.classList.add("alert-footer");
    let e_footer_inner = document.createElement("div");
    e_footer_inner.style.width = "100%";
    let center = document.createElement("center");
    let button = document.createElement("Button");
    button.innerHTML = button_context;
    var destoryed = false;
    button.addEventListener("click", function(){
        alertDestory(); 
        destoryed = true;
    });
    if (isAndroid || isIos) {
        button.addEventListener("touchstart", function(){
            button.style.borderColor = "rgb(254, 253, 253)";
            button.style.boxShadow = "0px 0px 5px 1px rgb(254, 253, 253)";
        });
        button.addEventListener("touchend", function(){
            button.style.borderColor = "rgb(245, 201, 241)";
            button.style.boxShadow = "0px 0px 5px 1px rgba(212, 0, 255, 0.33)";
        });    
    } else {
        button.addEventListener("mousedown", function(){
            button.style.borderColor = "rgb(254, 253, 253)";
            button.style.boxShadow = "0px 0px 5px 1px rgb(254, 253, 253)";
        });
        button.addEventListener("mouseup", function(){
            button.style.borderColor = "rgb(245, 201, 241)";
            button.style.boxShadow = "0px 0px 5px 1px rgba(212, 0, 255, 0.33)";
        });   
    }
    center.appendChild(button);
    e_footer_inner.appendChild(center);
    e_footer.appendChild(e_footer_inner);
    e.appendChild(e_footer);

    // 调整 e 的方位 
    e.style.marginLeft = "calc(50% - 220px)";
    e.style.marginTop = "calc(50vh - 150px)";

    // 输出内容
    alertInsert(e);

    // 阻塞执行
    while(!destoryed) await sleep(100);
}