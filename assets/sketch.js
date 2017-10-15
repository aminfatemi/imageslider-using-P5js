var img = [];
var song = [];
var imageText = ['Horses','Teacup','Koffi','Kebab','Book'];
var index = 0;
var button1,button2,clickable,h2,popbox,volslider;

//Load the songs and images first and put them in a global array
function preload() {
  for (var i=0; i<5; i++){ 
    img [i]= loadImage("assets/img/"+i+".jpg");
  }
  for (var i=0; i<3; i++){
  song [i]= loadSound("assets/sound/"+i+".mp3");
  }
}
 
//function setup() runs once, we include the canvas, buttons and an h2 element in it.
function setup() {

  //create the canvas element in P5
  createCanvas(600, 500);

  //function to create the necessary elements, title, buttons, etc.
  createCnvElements();

  //functions to play the music and create the play/pause buttons and volume slider control 
  musicPlay();
  musicControl();
  
  //function to manage behavior of the next and previous buttons
  buttonBehavior();  
}

//In P5 function draw() loops over and over again
function draw(){
  background(220);    //sets background color, a bright gray
  
  //presentation layer of the app, display the images, text, clickable div and the popup box
  display();

  // set volume of the song
  musicVolSet();

}

//function to manage behavior of the next and previous buttons
function buttonBehavior(){
  buttonNext.mousePressed(changeSlideBw);
  buttonNext.mousePressed(playSongBw);
  buttonPrev.mousePressed(changeSlideFw);
  buttonPrev.mousePressed(playSongFw);
}

//play the song 
function musicPlay(){
  song[2].loop();
}

//volume slider callback to set volume of the music
function musicVolSet(){
  song[2].setVolume(volslider.value());
}

//create the control buttons for the song and volume
function musicControl(){
  song[2].setVolume(0.3);
  playButton = createButton('Pause');
  playButton.addClass('songcontrolbuttons');
  stopButton = createButton('Stop');
  stopButton.addClass('songcontrolbuttons');  
  playButton.mousePressed(togglePlaySong);
  stopButton.mousePressed(stopSong);
  volslider = createSlider(0,1,0.5,0.01);
}

function createCnvElements(){
  h2 = createElement('h2', 'Le Quest Assignment by Amin Fatemi, Oct 2017');
  h2.position(48, 5);

  //buttons for the image slider next and previous, the style and event listeners
  buttonNext = createButton('< Previous');
  buttonNext.addClass('buttons');
  buttonPrev = createButton('Next >');
  buttonPrev.addClass('buttons');  
  buttonNext.position(width-500, height-70);
  buttonPrev.position(width-175, height-70);
}

function display(){
  displayImages();
  displayText();  
  displayClickable();
  displayPopup();
}

function displayClickable(){
  //get the element with id #par and save to the global variable clickable
  clickable = select('#clickable');
  clickable.position(width/5,height/2);

  //utilize js closures to change style with mouse over and mouse out events
  var Highlight = changeStyle('37FF00','B85DAC','0.8');
  var Unhighlight = changeStyle('00AAFF','DF7B77','0.2');
  clickable.mouseOver(Highlight); //hover over and style changes
  clickable.mouseOut( Unhighlight); //hover out and style reverts back
}

//function closure to highlight and unhighlight the clickable div upon hover in and out
function changeStyle(borderColor, backgroundColor, opacity) {
  return function() {
  this.style('border', '2px solid #' + borderColor);
  this.style('background-color', '#' + backgroundColor);
  this.style('opacity', opacity);
  };
}

function displayPopup(){
  clickable.mousePressed(popup);  //upon mouseclick a popup box appears  
}

function displayImages(){
  imageMode(CENTER);  // Modifies the coordinates from which images are drawn 
  image(img[index], width/2,height/2,width*0.8,height*0.6);
}

function displayText(){ 
  textSize(25);
  textAlign(CENTER);
  fill(12,100,230);
  noStroke();
  text(imageText[index], width/2 , height*0.85);
}

//function to show a popup box when the clickable div is clicked
function popup(){
  popbox = select('#popup'); //define the local variable
  popbox.position(width/5+90,height/2.5);
  popbox.mousePressed(popupHide); //upon mouse click (on popup box itself) it disappears
  buttonNext.mousePressed(popupHide);
  buttonPrev.mousePressed(popupHide);
  popbox.style('display:inline');
}

//function to hide the popup div, sets the display property to none in css
function popupHide(){
  popbox.style('display:none');
}



//function to show previou image and play a sound
function changeSlideBw() {
  if (index == 0){
    index =  img.length-1;
  } else{
    index = index - 1;
  }
}

//function to show next image upon click
function changeSlideFw(){
  if (index == img.length-1){
    index =  0;
  } else{
    index = index + 1;
  } 
}

//function to play a sound upon click
function playSongBw(){
  song[1].play();
}

function playSongFw(){
  song[0].play();
}

//toggle the song play, if it is playing show pause button, otherwise show play button
function togglePlaySong(){
  if (!song[2].isPlaying()){
    song[2].play();
    playButton.html('Pause');
  } else{
    song[2].pause();
    playButton.html('Play');    
  }  
}

//stop playing the song. if stopped, show play button
function stopSong(){
  song[2].stop();
  playButton.html('Play');
}