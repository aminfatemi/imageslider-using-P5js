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
  createCanvas(600, 500);
  h2 = createElement('h2', 'Le Quest Assignment by Amin Fatemi, Oct 2017');
  h2.position(50, 5);
  
  //play the song and its related controls
  song[2].loop();
  song[2].setVolume(0.3);
  playButton = createButton('Pause');
  playButton.addClass('songcontrolbuttons');
  stopButton = createButton('Stop');
  stopButton.addClass('songcontrolbuttons');  
  playButton.mousePressed(togglePlaySong);
  stopButton.mousePressed(stopSong);
  volslider = createSlider(0,1,0.5,0.01);

  //buttons for the image slider next and previous, the style and event listeners
  button1 = createButton('< Previous');
  button1.addClass('buttons');
  button2 = createButton('Next >');
  button2.addClass('buttons');  
  button1.position(width-500, height-70);
  button2.position(width-175, height-70);
  button1.mousePressed(changeSlideBw);
  button2.mousePressed(changeSlideFw);
}

  //In P5 function draw() loops over and over again
function draw(){
  background(220);    //sets background color, a bright white here
  imageMode(CENTER);  // Modifies the coordinates from which images are drawn 
  image(img[index], width/2,height/2,width*0.8,height*0.6);

  //set volume of the song
  song[2].setVolume(volslider.value());

  //display text from the imageText arraye
  textSize(25);
  textAlign(CENTER);
  fill(12,100,230);
  noStroke();
  text(imageText[index], width/2 + random(-2,2), height*0.85);

  //get the element with id #par and save to the global variable clickable
  clickable = select('#par');
  clickable.position(width/5,height/2);  
  var Highlight = changeStyle('37FF00','B85DAC','0.8');
  var Unhighlight = changeStyle('00AAFF','DF7B77','0.2');
  clickable.mouseOver(Highlight); //hover over and style changes
  clickable.mouseOut( Unhighlight); //hover out and style reverts back
  clickable.mousePressed(popup);  //upon mouseclick a popup box appears
}

//function to show a popup box when the clickable div is clicked
function popup(){
  popbox = select('#popup'); //define the local variable
  popbox.position(width/5+90,height/2.5);
  popbox.mousePressed(popupHide); //upon mouse click on popup box it disappears
  button1.mousePressed(popupHide);
  button2.mousePressed(popupHide);
  popbox.style('display:inline');
}

//function to hide the popup div, sets the display property to none in css
function popupHide(){
  popbox.style('display:none');
}

//function closure to highlight and unhighlight the clickable div upon hover in and out
function changeStyle(borderColor, backgroundColor, opacity) {
  return function() {
  clickable.style('border', '2px solid #' + borderColor);
  clickable.style('background-color', '#' + backgroundColor);
  clickable.style('opacity', opacity);
  };
}

//function to show previou image and play a sound
function changeSlideBw() {
  if (index == 0){
    index =  img.length-1;
  } else{
    index = index - 1;
  }
  song[1].play();
}

//function to show next image and play a sound
function changeSlideFw(){
  if (index == img.length-1){
    index =  0;
  } else{
    index = index + 1;
  }
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