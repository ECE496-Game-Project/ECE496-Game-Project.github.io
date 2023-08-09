// Define the WAVETYPE enum
const WAVETYPE = {
     INVALID: 0,
     PARALLEL: 1,
     POINT: 2,
};

const ParamDict = {
     0: "eox",
     1: "eoy",
     2: "w",
     3: "k",
     4: "n",
     5: "theta",
     6: "phi",
};

function waveParamsPanels(){
     // Get Value from Unity
     genTypeOption();
     genSlider();

     // Set Value to Unity
     document.getElementById("type").addEventListener("input", function() {
          gameInstance.SendMessage("WaveLine", "SetTypeFromWeb", this.value);
     });

     document.getElementById("eox").addEventListener("input", function() {
          gameInstance.SendMessage("WaveLine", "SetEoxFromWeb", this.value);
     });

     document.getElementById("eoy").addEventListener("input", function() {
          gameInstance.SendMessage("WaveLine", "SetEoyFromWeb", this.value);
     });

     document.getElementById("w").addEventListener("input", function() {
          gameInstance.SendMessage("WaveLine", "SetWFromWeb", this.value);
     });

     document.getElementById("k").addEventListener("input", function() {
          gameInstance.SendMessage("WaveLine", "SetKFromWeb", this.value);
     });

     document.getElementById("n").addEventListener("input", function() {
          gameInstance.SendMessage("WaveLine", "SetNFromWeb", this.value);
     });

     document.getElementById("theta").addEventListener("input", function() {
          gameInstance.SendMessage("WaveLine", "SetThetaFromWeb", this.value);
     });

     document.getElementById("phi").addEventListener("input", function() {
          gameInstance.SendMessage("WaveLine", "SetPhiFromWeb", this.value);
     });
}

function checkLoad(){
     window.alert("Working!");
}

// Populate the Type dropdown
function genTypeOption(){
     const typeSelect = document.getElementById('type');
     for (const type in WAVETYPE) {
          if (isNaN(type)) {
               const option = document.createElement('option');
               option.value = type;
               option.text = type;
               typeSelect.appendChild(option);
          }
     }
}

// Attach event listeners to the range inputs to update the displayed value
function genSlider(){
     // Get all range input elements
     const rangeInputs = document.querySelectorAll('input[type="range"]');

     // Create and insert <output> elements after each range input
     rangeInputs.forEach(input => {
          const output = document.createElement('output');
          input.parentNode.insertBefore(output, input);

          // Add an event listener to update the output value when the input value changes
          input.addEventListener('input', function() {
               console.log("Input value changes to " + this.value);
               output.textContent = this.value;
          });
     });
}