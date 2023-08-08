// Define the WAVETYPE enum
const WAVETYPE = {
     INVALID: 0,
     PARALLEL: 1,
     POINT: 2
};

// Define the WaveParams class
class WaveParams {
     constructor() {
          // Initialize properties with default values
          this.Type = WAVETYPE.INVALID;
          this.Eox = 0;
          this.Eoy = 0;
          this.W = 0;
          this.K = 0;
          this.N = 0;
          this.Theta = 0;
          this.Phi = 0;
     }
}

let params = new WaveParams();

function waveParams(){
     // Get Value from Unity
     document.getElementById("type").value = params.Type;
     document.getElementById("eox").value = params.Eox;
     document.getElementById("eoy").value = params.Eoy;
     document.getElementById("w").value = params.W;
     document.getElementById("k").value = params.K;
     document.getElementById("n").value = params.N;
     document.getElementById("theta").value = params.Theta;
     document.getElementById("phi").value = params.Phi;
     //gameInstance?.SendMessage("WaveLine", "SendParamsToWeb");

     // Set Value to Unity
     // Add event listeners to input fields for user modification
     document.getElementById("eox").addEventListener("input", function() {
          params.Eox = parseFloat(this.value);
     });

     document.getElementById("eoy").addEventListener("input", function() {
          params.Eoy = parseFloat(this.value);
     });

     document.getElementById("w").addEventListener("input", function() {
          params.W = parseFloat(this.value);
     });

     document.getElementById("k").addEventListener("input", function() {
          params.K = parseFloat(this.value);
     });

     document.getElementById("n").addEventListener("input", function() {
          params.N = parseFloat(this.value);
     });

     genTypeOption();
     genSlider();
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

          // Initialize the output value with the initial input value
          output.textContent = input.value;

          // Add an event listener to update the output value when the input value changes
          input.addEventListener('input', function() {
               output.textContent = this.value;
          });
     });
}