const synth = window.speechSynthesis;
        let voices = [];
        let selectedVoice = null;
        function populateVoiceList() {
            voices = synth.getVoices();
            const voiceSelect = document.getElementById('voiceSelect');

            // Clear previous options
            voiceSelect.innerHTML = '';

            // Populate the dropdown with available voices
            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;

                if (voice.default) {
                    option.textContent += ' [default]';
                }

                option.setAttribute('data-lang', voice.lang);
                option.setAttribute('data-name', voice.name);
                voiceSelect.appendChild(option);
            });
        }




// Function to stop speech
function stopSpeech() {
    synth.cancel();
}




        // Populate the voice list when voices are loaded
        populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }


        // Function to speak the text
        function speakText() {
            const textInput = document.getElementById('textInput').value;
            const utterThis = new SpeechSynthesisUtterance(textInput);
            const selectedOption = document.getElementById('voiceSelect').selectedOptions[0].getAttribute('data-name');
           
           
            // Set the voice for the utterance
            voices.forEach((voice) => {
                if (voice.name === selectedOption) {
                    utterThis.voice = voice;
                }
            });

            utterThis.rate = document.getElementById('rate').value;
            utterThis.pitch = document.getElementById('pitch').value;
            utterThis.volume = document.getElementById('volume').value;

            // Speak the text
            synth.speak(utterThis);
        }

        function pauseText() {
            if (synth.speaking && !synth.paused) {
                synth.pause();
            }
        }

        // Function to resume the speech
        function resumeText() {
            if (synth.paused) {
                synth.resume();
            }
        }
        const clearBtn = document.getElementById('clear-btn');
        function clearText() {
            textInput.value = '';
            if (utterance) {
                window.speechSynthesis.cancel(); // Cancel any ongoing speech synthesis
            }
        }
        clearBtn.addEventListener('click', clearText);



        document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const text = e.target.result;
                    document.getElementById('textInput').value = text;
                };
                reader.readAsText(file);
            }
        });



        document.getElementById('rate').addEventListener('input', function() {
            document.getElementById('rateValue').textContent = this.value;
        });

        document.getElementById('pitch').addEventListener('input', function() {
            document.getElementById('pitchValue').textContent = this.value;
        });

        document.getElementById('volume').addEventListener('input', function() {
            document.getElementById('volumeValue').textContent = this.value;
        });
