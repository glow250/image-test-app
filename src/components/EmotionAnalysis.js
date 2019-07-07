import React, {useState} from 'react'
import MyWebcam from './MyWebcam'

//Reflects value of emotion

function EmotionAnalysis(props){
    //Displays values returned from API with state
    //Result is happiness value and function to update state
    //initial state set to 0
    const [result, updateResult] = useState(0);
    return(
        <div className="EmotionAnalysis">
            {/* Pass in function for updating state so can be updated by webcam */}
            <MyWebcam 
                onReceivedResult={updateResult}
                toggleDetection = {props.toggleDetection}
                emotionComplete = {props.emotionComplete}
                nextEmotionReady = {props.nextEmotionReady}
                currentEmotion = {props.currentEmotion}
                compareImages = {props.compareImages}
                failed = {props.failed}
                hasImages = {props.hasImages}
                convertToByteArray={props.convertToByteArray}
            />
            {/* Give result state object as prop */}
            <Result 
                result={result}
                start={props.start}
            />
        </div>
    );
}

function Result(props) {
    if(props.start){
        if(props.result === -1){
            return(
                <div></div>
            )
        }
        return(
            <div>
                {/* If result state object<100 then display result otherwise return game over string */}
                <h1>{props.result < 100 ? props.result + '%' : ""}</h1>
            </div>
        );
    }
    else{
        return(<div><h2>press start to begin</h2></div>)
    }
}

export default EmotionAnalysis