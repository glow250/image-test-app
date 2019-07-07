import React, { Component } from 'react'

class EmotionInfoBox extends Component {
    render() {
        const emotions = ["Neutral", "Surprise", "Sadness", "Happy"];
        const currentEmotion = this.props.currentEmotion;
        let emotionDisplay = [];
        if(this.props.success !== null){
            console.log(this.props.success)
            if(this.props.success === false){
                emotionDisplay.push([<h1>Identity Failed to Verify</h1>])
            }
            else if(this.props.success === true){
                emotionDisplay.push([<h1>Identity Verified!</h1>])
            }
        }
        else if (this.props.failed) {
            emotionDisplay.push([<h1>Failed to Match</h1>])
        }
        else if (this.props.start && currentEmotion < 4) {
            emotionDisplay = [<h1>Display Emotion: {emotions[currentEmotion]}</h1>];
            if (currentEmotion > 0) {
                emotionDisplay.push([<p>{emotions[0]} : Success!</p>])
            } if (currentEmotion > 1) {
                emotionDisplay.push([<p>{emotions[1]} : Success!</p>])
            } if (currentEmotion > 2) {
                emotionDisplay.push([<p>{emotions[2]} : Success!</p>])
            } if (currentEmotion > 3) {
                emotionDisplay.push([<p>{emotions[3]} : Success!</p>])
            }
        } else {
            //game hasn't started yet so display instructions
            emotionDisplay.push([<h2>How to Play:</h2>])
            emotionDisplay.push([<p>1. Upload 1 to 4 images of yourself</p>])
            emotionDisplay.push([<p>2. Begin the game by clicking start</p>])
            emotionDisplay.push([<p>3. Perform the emtion you are told to display</p>])
            emotionDisplay.push([<p>4. You only have 5 seconds to display each emotion so be fast</p>])
            emotionDisplay.push([<p>5. We then confirm if you are the person in the images or not</p>])
        }
        return (
            <div className="EmotionInfoBox">
                {emotionDisplay}
            </div>
        )
    }
}

export default EmotionInfoBox