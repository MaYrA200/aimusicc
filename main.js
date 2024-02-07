song1 = "";
song2 = "";
leftWristX = 0;
leftWristY= 0;
rightWristX = 0;
rightWristY= 0;
scoreRightWrist = 0;
scoreLeftWrist= 0;
song1_status = "";
song2_status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses); 
}

function gotPoses(results)
{
   if(results.legnth > 0)
   {
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist x = " + leftWristX + "  left wrist y = " + leftWristY);
   
    righttWristX = results[0].pose.righttWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist x = " + rightWristX + "  right wrist y = " + rightWristY);
   }  
}

function modelLoaded()
{
    console.log("poseNet is initialized")
}

function draw()
{
    image(video , 0 , 0 , 600 , 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    
    fill("#FF0000");
    stroke("FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX , rightWristY , 20);
        song2.stop();

        if(song1_status == false)
        {
            song1.play()
        }
    }
}