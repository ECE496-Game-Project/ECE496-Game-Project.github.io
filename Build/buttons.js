// Specify the path to your Unity WebGL build file
var buildPath = "Build/WebGLBuild.json";

// Define the container element for the Unity WebGL content
var container = document.getElementById("unity-container");

// Define the configuration options for loading Unity
var config = {
    dataUrl: buildPath + "/Build.data.unityweb",
    frameworkUrl: buildPath + "/Build.framework.unityweb",
    codeUrl: buildPath + "/Build.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "YourCompany",
    productName: "YourProduct",
    productVersion: "0.1",
};

// Load Unity using the configuration options
var loader = new UnityLoader(container, config);
loader.load();


document.getElementById('xButton').addEventListener('click', function() {
    Unity.call('RotateScene', 'x');
});

document.getElementById('yButton').addEventListener('click', function() {
    Unity.call('RotateScene', 'y');
});

document.getElementById('zButton').addEventListener('click', function() {
    Unity.call('RotateScene', 'z');
});
