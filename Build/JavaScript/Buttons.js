// Function to load the Unity WebGL build
function loadUnity() {
    var unityContainer = document.querySelector('#unity-container');
    var unityInstance = UnityLoader.instantiate(unityContainer, 'Build/_Build.json');

    // Add event listeners to the buttons
    document.getElementById('btnX').addEventListener('click', function() {
        unityInstance.SendMessage('Main Camera', 'RotateToAxisX');
    });
    document.getElementById('btnY').addEventListener('click', function() {
        unityInstance.SendMessage('Main Camera', 'RotateToAxisY');
    });
    document.getElementById('btnZ').addEventListener('click', function() {
        unityInstance.SendMessage('Main Camera', 'RotateToAxisZ');
    });
}

// Load Unity WebGL after the page loads
window.onload = loadUnity;


