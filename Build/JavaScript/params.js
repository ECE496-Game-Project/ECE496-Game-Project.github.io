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

let params = new WaveParams();

function waveParams(){
     // Get Value from Unity
     //gameInstance?.SendMessage("WaveLine", "SendParamsToWeb");
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

          // Add an event listener to update the output value when the input value changes
          input.addEventListener('input', function() {
               console.log("Input value changes to " + this.value);
               output.textContent = this.value;
          });
     });
}