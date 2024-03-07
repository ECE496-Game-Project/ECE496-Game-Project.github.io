const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const loadingBar = document.querySelector("#unity-loading-bar");
const progressBarFull = document.querySelector("#unity-progress-bar-full");
const warningBanner = document.querySelector("#unity-warning");

// Shows a temporary message banner/ribbon for a few seconds, or
// a permanent error message on top of the canvas if type=='error'.
// If type=='warning', a yellow highlight color is used.
// Modify or remove this function to customize the visually presented
// way that non-critical warnings and error messages are presented to the
// user.
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

let baseDir = "";
let loaderUrl = "";
let config = {};

function dispatch(param) {
    baseDir = "/resources/unity_data/" + param + "/" + param;
    loaderUrl = baseDir + ".loader.js";
    config = {
        frameworkUrl: baseDir + ".framework.js",
        dataUrl: baseDir + ".data",
        codeUrl: baseDir + ".wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Optics",
        productVersion: "0.2.0",
        showBanner: unityShowBanner,
    };

    const unityContainer = document.getElementById('unity-container');
    unityContainer.style.display = 'block';
    render();
}

function render(){
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:

        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
        container.className = "unity-mobile";
        canvas.className = "unity-mobile";

        // To lower canvas resolution on mobile devices to gain some
        // performance, uncomment the following line:
        // config.devicePixelRatio = 1;

        unityShowBanner('WebGL builds are not supported on mobile devices.');
    } else {
        // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
    }

    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = loaderUrl;
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

function close(){
    const unityContainer = document.getElementById('unity-container');
    unityContainer.style.display = 'none';
}