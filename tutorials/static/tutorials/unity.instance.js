// Function to load the Unity WebGL build
function loadUnity() {
    const loaderUrl = buildUrl + "/unity.loader.js";
    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => { }).then((unityInstance) => {
            gameInstance = unityInstance;
            if(gameInstance) console.log("Game instance is created");
            else console.warn("Game Instance is null");
        })
    }
    document.body.appendChild(script);
}

// Load Unity WebGL after the page loads
var gameInstance = null;
window.onload = loadUnity;
