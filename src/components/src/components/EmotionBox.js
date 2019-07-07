import React, { Component } from 'react'
import EmotionInfoBox from './EmotionInfoBox'
import EmotionAnalysis from './EmotionAnalysis';

class EmotionBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 0,
            currentEmotion: 0,
            start: false,
            failed: false
        }
        this.executed = false;
        this.toggleDetection = this.toggleDetection.bind(this);
        this.emotionComplete = this.emotionComplete.bind(this);
        this.nextEmotionReady = this.nextEmotionReady.bind(this);
        this.failed = this.failed.bind(this);
    }

    failed() {
        this.setState({
            start: false,
            failed: true,
            currentEmotion: 0,
        })
    }

    nextEmotionReady() {
        this.executed = false;
    }

    emotionComplete(currentEmotion) {
        // to stop multiple calls for same emotion
        this.executed = true;
        this.setState({
            currentEmotion: currentEmotion + 1,
        })
    }

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
                    nextEmotionReady={this.nextEmotionReady}
                    success={this.props.success}
                />
                <EmotionAnalysis
                    toggleDetection={this.toggleDetection}
                    start={this.state.start}
                    currentEmotion={this.state.currentEmotion}
                    emotionComplete={this.emotionComplete}
                    nextEmotionReady={this.nextEmotionReady}
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