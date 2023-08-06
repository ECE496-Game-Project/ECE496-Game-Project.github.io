// Type: Invalid, Parallel, Point
// Magnitude Settings
// Eox, Eoy

// Frequency Setting
// W
// K
// N

// Angle Settings in degree
// Theta
// Phi

// Dispersion Distance
// Effect Distance

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

}

// Populate the Type dropdown
const typeSelect = document.getElementById('type');
for (const type in WAVETYPE) {
    if (isNaN(type)) {
        const option = document.createElement('option');
        option.value = type;
        option.text = type;
        typeSelect.appendChild(option);
    }
}

// Attach event listeners to the range inputs to update the displayed value
const rangeInputs = document.querySelectorAll('input[type="range"]');
rangeInputs.forEach(input => {
    const output = document.createElement('output');
    output.textContent = input.value;
    input.addEventListener('input', function () {
        output.textContent = this.value;
    });
    input.parentNode.appendChild(output);
});


// Load Unity WebGL after the page loads
window.onload = loadUnity;