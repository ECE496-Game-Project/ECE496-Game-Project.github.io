// Function to load the Unity WebGL build
function loadUnity() {
    var myGameInstance = null;
    var loaderUrl = buildUrl + "/JavaScript/unity.loader.js";
    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => { }).then((unityInstance) => {
            console.log('Create My Game Instance');
            myGameInstance = unityInstance;
        })
    }

    document.body.appendChild(script);

    // Add event listeners to the buttons
    document.getElementById('btnX').addEventListener('click', function() {
        console.log('Click Button X');
        myGameInstance.SendMessage('Main Camera', 'RotateToAxisX');
    });
    document.getElementById('btnY').addEventListener('click', function() {
        console.log('Click Button Y');
        myGameInstance.SendMessage('Main Camera', 'RotateToAxisY');
    });
    document.getElementById('btnZ').addEventListener('click', function() {
        console.log('Click Button Z');
        myGameInstance.SendMessage('Main Camera', 'RotateToAxisZ');
    });
}

// Load Unity WebGL after the page loads
window.onload = loadUnity;


