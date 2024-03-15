const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const loadingBar = document.querySelector("#unity-loading-bar");
const progressBarFull = document.querySelector("#unity-progress-bar-full");
const warningBanner = document.querySelector("#unity-warning");

let baseDir = "";
let loaderUrl = "";
let config = {};

const unityButtons = document.querySelectorAll('.unity-btn');
const gridContainer = document.getElementsByClassName('grid-container');

function dispatch(param, btn) {
    baseDir = "/resources/unity_data/" + param + "/" + param;
    loaderUrl = baseDir + ".loader.js";
    config = {
        frameworkUrl: baseDir + ".framework.js",
        dataUrl: baseDir + ".data",
        codeUrl: baseDir + ".wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Tang-Chan",
        productName: "Optics",
        productVersion: "0.2.1",
        showBanner: unityShowBanner,
    };

    if(btn.className === 'unity-btn unity-btn-close'){
        unityButtons.forEach(function (el){
            el.className = 'unity-btn unity-btn-close';
        });
        btn.className = 'unity-btn unity-btn-open';
        gridContainer[0].className = 'grid-container grid-unity-open';
        loadUnity();
        render();
    }

    else{
        gridContainer[0].className = 'grid-container grid-unity-close';
        btn.className = 'unity-btn unity-btn-close';
    }
}

function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }

    const div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type === 'error') div.style = 'background: red; padding: 10px;';
    else {
        if (type === 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(function() {
            warningBanner.removeChild(div);
            updateBannerVisibility();
        }, 5000);
    }
    updateBannerVisibility();
}

function render(){
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
        container.className = "unity-mobile";
        canvas.className = "unity-mobile";

        unityShowBanner('WebGL builds are not supported on mobile devices.');
    }

    const scriptEls = document.querySelectorAll(`script[src="${loaderUrl}"]`);
    console.log("exists at least " + scriptEls.length)

    // TODO: BUG Each scene could only be loaded once

    let script;
    if(scriptEls.length > 0){
        script = scriptEls[0];
    }else{
        script = document.createElement("script");
        script.src = loaderUrl;
    }

    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
            loadingBar.style.display = "none";
        }).catch((message) => {
            alert(message);
        });
    };

    document.body.appendChild(script);
}

function loadUnity() {
    let loaderUrl = baseDir + ".loader.js";

    const scriptEls = document.querySelectorAll(`script[src="${loaderUrl}"]`);

    let script;
    if(scriptEls.length > 0){
        script = scriptEls[0];
    }else{
        script = document.createElement("script");
        script.src = loaderUrl;
    }

    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {

        }).then((unityInstance) => {
            if(unityInstance) console.log("Game instance is created");
            else console.warn("Game Instance is null");
        })
    }

    document.body.appendChild(script);
}

