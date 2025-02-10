//Keypress event listener
document.body.style.backgroundImage = ".";
window.addEventListener('keydown' , function(e){
    // const audio = document.querySelector(`audio[data-key="65"]`);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"], .keys[data-key="${e.keyCode}"]`);
   // logging to help work out the keys needed.
    // console.log(e);
    // console.log(e.keyCode);
    // console.log(audio);
    // console.log(key);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing'); //key.addclass('playing');
            // Stop the audio after 0.7 seconds mainly to limit the piano sustain.
            setTimeout(() => {
                audio.pause();  
                audio.currentTime = 0;  
                key.classList.remove('playing'); // Remove the playing class
            }, 700);
});

// Select all elements with the class 'key' and 'keys'
const keyDivs = document.querySelectorAll('.key, .keys');

// Loop through each keyDiv and add a CLICK event listener as the event object has to be passed to the function
keyDivs.forEach(keyDiv => { keyDiv.addEventListener('click', function(e) {
    const audio = document.querySelector(`audio[data-key="${keyDiv.dataset.key}"]`);
    const key = document.querySelector(`.key[data-key="${keyDiv.dataset.key}"], .keys[data-key="${keyDiv.dataset.key}"]`);
    // console.log(key);
    if (!audio) return; 
    audio.currentTime = 0; // Reset audio to start
    audio.play(); // Play the audio
    key.classList.add('playing'); // Add 'playing' class to the key
        // Stop the audio after 0.7 seconds mainly to limit the piano sustain.
        setTimeout(() => {
            audio.pause();  
            audio.currentTime = 0;  
            key.classList.remove('playing'); // Remove the playing class
        }, 700);  
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