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

function waveParams(){
     let params = new WaveParams();
     gameInstance?.SendMessage("WaveLine", "AssignParams", params);

     document.getElementById("type").value = waveParams.Type;
     document.getElementById("eox").value = waveParams.Eox;
     document.getElementById("eoy").value = waveParams.Eoy;
     document.getElementById("w").value = waveParams.W;
     document.getElementById("k").value = waveParams.K;
     document.getElementById("n").value = waveParams.N;
     document.getElementById("theta").value = waveParams.Theta;
     document.getElementById("phi").value = waveParams.Phi;

     // Add event listeners to input fields for user modification
     document.getElementById("eox").addEventListener("input", function() {
          waveParams.Eox = parseFloat(this.value);
     });

     document.getElementById("eoy").addEventListener("input", function() {
          waveParams.Eoy = parseFloat(this.value);
     });

     document.getElementById("w").addEventListener("input", function() {
          waveParams.W = parseFloat(this.value);
     });

     document.getElementById("k").addEventListener("input", function() {
          waveParams.K = parseFloat(this.value);
     });

     document.getElementById("n").addEventListener("input", function() {
          waveParams.N = parseFloat(this.value);
     });
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
     const rangeInputs = document.querySelectorAll('input[type="range"]');
     rangeInputs.forEach(input => {
          const output = document.createElement('output');
          output.textContent = input.value;
          input.addEventListener('input', function () {
               output.textContent = this.value;
          });
          input.parentNode.appendChild(output);
     });
}

genTypeOption();
genSlider();