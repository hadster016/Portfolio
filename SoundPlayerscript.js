//Keypress event listener
document.body.style.backgroundImage = ".";

let isPlaying = {}; // Object to track which keys are currently playing

// window.addEventListener('keydown' , function(e)
document.addEventListener('keydown', (event) => {
    // const audio = document.querySelector(`audio[data-key="65"]`);
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"], .keys[data-key="${event.keyCode}"]`);
    
    // logging to help work out the keys needed.
    // console.log(e);
    console.log(event.keyCode);
    console.log(audio);
    console.log(key);
    
    if(!audio) return;

    if (!isPlaying[event.keyCode]) {
        audio.loop = true; // Loop the audio
        audio.play().catch((error) => {
            console.error("Error playing audio:", error);
      });
    isPlaying[event.keyCode] = true; //Mark the key as playing
    key.classList.add('playing'); //key.addclass('playing');
    }
});
        // Event listener for keyup so I can stop the key play immediately, as this timing is needed to play a song properly
        // window.addEventListener('keyup', function(e)
        document.addEventListener('keyup', (event) => {
            const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
            const key = document.querySelector(`.key[data-key="${event.keyCode}"], .keys[data-key="${event.keyCode}"]`);
            if(!audio) return;
            audio.loop = false;
            audio.pause(); // Pause the audio when the key is released
            audio.currentTime = 0; // Reset the audio to the beginning
            isPlaying[event.keyCode] = false;
            key.classList.remove('playing');
                /*  // Stop the audio after 0.7 seconds mainly to limit the piano sustain. REMOVED as prefer the key up method.
                 setTimeout(() => {
                     audio.pause();  
                     audio.currentTime = 0;  
                     key.classList.remove('playing'); // Remove the playing class
                 }, 1300); */
          });



// Select all elements with the class 'key' and 'keys'
const keyDivs = document.querySelectorAll('.key, .keys');

// Loop through each keyDiv and add a CLICK event listener as the event object has to be passed to the function
keyDivs.forEach(keyDiv => { keyDiv.addEventListener('click', function(e) {
    const audio = document.querySelector(`audio[data-key="${keyDiv.dataset.key}"]`);
    const key = document.querySelector(`.key[data-key="${keyDiv.dataset.key}"], .keys[data-key="${keyDiv.dataset.key}"]`);
    console.log(key);
    if (!audio) return; 
    audio.currentTime = 0; // Reset audio to start
    audio.play(); // Play the audio
    key.classList.add('playing'); // Add 'playing' class to the key
        // Stop the audio after 0.7 seconds mainly to limit the piano sustain.
        setTimeout(() => {
            audio.pause();  
            audio.currentTime = 0;  
            key.classList.remove('playing'); // Remove the playing class
        }, 1000);  
        });
});

// Select all elements with the class 'key' and 'keys'
const keys = document.querySelectorAll('.key, .keys');
keys.forEach(key => key.addEventListener('transitionend', function(e){
    console.log(e.propertyName);
    if(e.propertyName !== 'transform') 
    return;
    this.classList.remove('playing');
}));

  // Check if the page is loaded in an iframe
  if (window.self !== window.top) {
    // Hide the "Return to Home" button
    const homeButton = document.querySelector('.footer');
    if (homeButton) {
      homeButton.style.display = 'none';
    }
  }