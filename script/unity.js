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
        productVersion: "0.3.0",
        showBanner: unityShowBanner,
    };

    if(btn.className === 'unity-btn unity-btn-close'){
        unityButtons.forEach(function (el){
            el.className = 'unity-btn unity-btn-close';
        });
        btn.className = 'unity-btn unity-btn-open';
        gridContainer[0].className = 'grid-container grid-unity-open';
        cleanScripts();
        loadUnity();
        render();
        // cleanDupScripts(config["frameworkUrl"]);
    }

    else{
        gridContainer[0].className = 'grid-container grid-unity-close';
        btn.className = 'unity-btn unity-btn-close';
    }
}

function loadUnity() {
    const loadEls = document.querySelectorAll(`script[src="${loaderUrl}"]`);

    if(loadEls.length > 0){
        loadUnityInstance();
    }else{
        const script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = loadUnityInstance;
        document.body.appendChild(script);
    }
}

function loadUnityInstance(){
    console.log("load script with unity instance");
    createUnityInstance(canvas, config, () => {}).then((unityInstance) => {
        if(unityInstance) console.log("Game instance is created");
        else console.warn("Game Instance is null");
    })
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

    if(scriptEls.length > 0){
        loadUnityProgressBar();
    }else{
        const script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = loadUnityProgressBar;
        document.body.appendChild(script);
    }
}

function loadUnityProgressBar(){
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    }).then(() => {
        loadingBar.style.display = "none";
    }).catch((message) => {
        alert(message);
    });
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

function cleanScripts(){
    const frameEls = document.querySelectorAll(`script`);
    for (let i = 1; i < frameEls.length; i++) {
        frameEls[i].parentNode.removeChild(frameEls[i]);
    }
}

function cleanDupScripts(src){
    console.warn("src " + src);
    const frameEls = document.querySelectorAll(`script[src="${src}"]`);
    console.warn("find dups " + frameEls.length);
    for (let i = 1; i < frameEls.length; i++) {
        frameEls[i].parentNode.removeChild(frameEls[i]);
    }
}