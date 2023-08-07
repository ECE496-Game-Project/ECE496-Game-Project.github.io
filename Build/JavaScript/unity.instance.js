// import React from "react";
// import { Unity, useUnityContext } from "react-unity-webgl";
//
// function App() {
//     const { unityProvider } = useUnityContext({
//         loaderUrl: "Build/JavaScript/unity.loader.js",
//         dataUrl: "Build/UnityData/unity.data",
//         frameworkUrl: "Build/JavaScript/unity.framework.js",
//         codeUrl: "Build/UnityData/unity.wasm",
//     });
//
//     return <Unity unityProvider={unityProvider} />;
// }

// Function to load the Unity WebGL build
function loadUnity() {
    var loaderUrl = buildUrl + "/JavaScript/unity.loader.js";
    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => { }).then((unityInstance) => {
            gameInstance = unityInstance;
            if(gameInstance) console.log("Game instance is created");
            else console.warn("Game Instance is null");
        })
    }
    document.body.appendChild(script);

    waveParams();
    cameraButtons();
}

// Load Unity WebGL after the page loads
var gameInstance = null;
window.onload = loadUnity;
// window.onload = App;
