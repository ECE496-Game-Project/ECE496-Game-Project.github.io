// Function to load the Unity WebGL build
function loadUnity() {
    let loaderUrl = baseDir + ".loader.js";
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
let gameInstance = null;
window.onload = loadUnity;
