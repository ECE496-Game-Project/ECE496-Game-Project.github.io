// Function to load the Unity WebGL build
function loadUnity() {
    var unityContainer = document.querySelector('.unity-container');
    var unityInstance = UnityLoader.instantiate(unityContainer, 'Build/Unity3D.json');
}

// Add event listeners to the buttons
document.getElementById('btnX').addEventListener('click', function() {
    unityInstance.SendMessage('MainCamera', 'RotateToAxisX');
});
document.getElementById('btnY').addEventListener('click', function() {
    unityInstance.SendMessage('MainCamera', 'RotateToAxisY');
});
document.getElementById('btnZ').addEventListener('click', function() {
    unityInstance.SendMessage('MainCamera', 'RotateToAxisZ');
});

// Load Unity WebGL after the page loads
window.onload = loadUnity;
