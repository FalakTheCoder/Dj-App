song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF000");
    stroke("#FF000");
    if(scoreLeftWrist>0.2)
    {
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY)
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementsByClassName("volume").innerHTML = "Volume = " + volume;
    song.setRate(speed);
}

if(scoreRightWrist>0.2)
    {
    circle(rightWristX, rightWristY,20);
    InNumberrightWristY = Number(rightWristY)
    remove_decimals = floor(InNumberrightWristY);
    speed = remove_decimals/500;
    document.getElementsByClassName("speed").innerHTML = "Speed = " + speed;
    song.setVolume(volume);
}
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Righ Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
   }
}