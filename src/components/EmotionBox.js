import React, { Component } from 'react'
import EmotionInfoBox from './EmotionInfoBox'
import EmotionAnalysis from './EmotionAnalysis';

//For displaying the elements to do with analysing emotions
class EmotionBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 0,
            currentEmotion: 0,
            start: false,
            failed: false
        }
        this.toggleDetection = this.toggleDetection.bind(this);
        this.emotionComplete = this.emotionComplete.bind(this);
        this.failed = this.failed.bind(this);
    }

    //called if unable to detect emotion in time alotted
    failed() {
        this.setState({
            start: false,
            failed: true,
            currentEmotion: 0,
        })
    }

    //When previous emotion detected cycle to next emotion for detection
    emotionComplete(currentEmotion) {
        // to stop multiple calls for same emotion
        this.setState({
            currentEmotion: currentEmotion + 1,
        })
    }

    //Signal that emotion detection is beginning
    toggleDetection() {
        if(this.props.hasImages){
            this.setState({
                result: 0,
                currentEmotion: 0,
                start: true,
                failed: false
            })
        }
    }

    render() {
        return (
            <div className="EmotionBox">
                <EmotionInfoBox
                    start={this.state.start}
                    failed={this.state.failed}
                    currentEmotion={this.state.currentEmotion}
                    success={this.props.success}
                />
                <EmotionAnalysis
                    toggleDetection={this.toggleDetection}
                    start={this.state.start}
                    currentEmotion={this.state.currentEmotion}
                    emotionComplete={this.emotionComplete}
                    failed = {this.failed}
                    hasImages = {this.props.hasImages}
                    compareImages = {this.props.compareImages}
                    convertToByteArray={this.props.convertToByteArray}
                />
            </div>
        )
    }
}

export default EmotionBox