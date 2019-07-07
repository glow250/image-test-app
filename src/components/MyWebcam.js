import React, { Component } from 'react';
import Webcam from 'react-webcam';

class MyWebcam extends Component {
    constructor(props) {
        super(props);
        this.execute = true;
        this.lengthTimer = null;
        this.timerId = null;
        this.currentImage = null; 
        this.isCapturing = false; //Signifies capturing process still running, so don't display unwanted data to user
        this.state = {
            image: null
        }
    }


    setRef = webcam => {
        //assign webcam component to webcam variable to later reference
        this.webcam = webcam;
    };

    //continuously take photos
    startCapturing = () => {
        if(this.props.hasImages){
            this.startEmotion();
            this.props.toggleDetection();
            this.isCapturing = true;
            //setInterval periodically takes photo
            this.timerId = setInterval(() => {
                const image = this.webcam.getScreenshot();
                //Change to proper format for FaceAPI
                const byteArrayImage = this.props.convertToByteArray(image);
                this.currentImage = image;
                this.fetchData(byteArrayImage);
            }, 100);//happens every 1 seconds
        }else{
            alert("Please upload images of yourself to start images");
        }
    }

    //Start timer for detecting next emotion
    startEmotion() {
        this.lengthTimer = setInterval(() => {
            this.failed();
        }, 5000)
    }

    //If timer clocks over before emotion detected the test is failed but can be restarted after 5 seconds
    failed() {
        if (this.props.currentEmotion < 4) {
            clearInterval(this.lengthTimer);
            clearInterval(this.timerId);
            this.props.onReceivedResult(-1);
            this.isCapturing = false;
            this.props.failed();
        }
    }

    //Sends photo to Face API by taking byte array and makes post request to API Endpoint
    fetchData = (byteArray) => {
        const currentEmotion = this.props.currentEmotion;
        const apiKey = '80d011c4c1ea46d88e97241bc578aec5';
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion'
        //Makes post request with byte array
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                //Convert response to json object
                response.json().then(data => {
                    //from data received we extract the emotion value based on current emotion detecting
                    let emotAmount;
                    if (currentEmotion === 0) {
                        emotAmount = (data[0] != null ? data[0].faceAttributes.emotion.neutral : 0);
                    } else if (currentEmotion === 1) {
                        emotAmount = (data[0] != null ? data[0].faceAttributes.emotion.surprise : 0);
                    } else if (currentEmotion === 2) {
                        emotAmount = (data[0] != null ? data[0].faceAttributes.emotion.sadness : 0);
                    } else {
                        emotAmount = (data[0] != null ? data[0].faceAttributes.emotion.happiness : 0);
                    }
                    //Convert happiness value to an integer then a percentage
                    emotAmount = (Math.round(emotAmount * 100))
                    //Display player with current happiness value if not 100 yet and still capturing
                    //Slightly lower to make easier since on a time constraint
                    if (this.isCapturing && emotAmount < 98) {
                        //onReceivedResult is the update function for displaying to user
                        this.props.onReceivedResult(emotAmount);
                    } else {
                        //Stop capturing
                        this.props.onReceivedResult(100);
                        this.props.emotionComplete(currentEmotion);
                        clearInterval(this.lengthTimer);
                        this.startEmotion();
                        if (currentEmotion === 3) {
                            //Executes when completed final emotion successfully
                            if (this.execute) {
                                this.execute = false;
                                clearInterval(this.lengthTimer);
                                clearInterval(this.timerId);
                                this.isCapturing = false;
                                this.props.compareImages(data[0].faceId);
                                this.setState({
                                    image: this.currentImage
                                })
                            }
                        }
                    }
                })
            }
        });
    }

    render() {
        const videoConstraints = {
            width: 750,
            height: 500,
            facingMode: "user"
        };
        let content = [];
        if (this.state.image === null){
            content = [
                <div>
                    <Webcam
                        audio={false}
                        height={400}
                        //width={750}
                        ref={this.setRef}
                        screenshotFormat='image/jpeg'
                        videoConstraints={videoConstraints}
                    />
                </div>];
        }else{
            content = [<img alt="Validation source" src={this.state.image}></img>]
        }
        if (!this.isCapturing && (this.props.currentEmotion === 0)) {
            content.push(<button onClick={this.startCapturing}>Start</button>);
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default MyWebcam