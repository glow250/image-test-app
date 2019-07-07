import React, { Component } from 'react';
import './components/stylesheet.css';
import Title from './components/Title'
import EmotionBox from './components/EmotionBox'
import ImageUpload from './components/ImageUpload'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      imagePreviewUrl: [],
      hasImages: false,
      success: null
    };
    this.faceIds = [];
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.compareImages = this.compareImages.bind(this)
    this.convertToByteArray = this.convertToByteArray.bind(this)
  }

  convertToByteArray = (image) => {
    //Load module
    const base64 = require('base64-js');
    //take encoded string and remove header
    const base64string = image.split(',')[1];
    //returning binary format
    return base64.toByteArray(base64string)
  };

  //reset state 
  handleSubmit(e) {
    e.preventDefault();
    this.faceIds = [];
    this.setState({
      file: [],
      imagePreviewUrl: [],
      hasImages: false,
    })
  }

  handleImageChange(e) {
    e.preventDefault();

    if (this.state.file.length === 4) {
      return;
    }

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: this.state.file.concat([file]),
        imagePreviewUrl: this.state.imagePreviewUrl.concat([reader.result]),
        hasImages: true
      });
    }
    this.getFaceId(file)
    reader.readAsDataURL(file)
  }

  compareImages(faceId) {
    this.faceIds.unshift(faceId);
    this.compareFace();
  }

  compareFace() {
    //using sync API request
    let success = true;
    const apiKey = '80d011c4c1ea46d88e97241bc578aec5';
    const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/verify';
    const main = this.faceIds[0];
    this.faceIds.forEach(function (current) {
      let bod = '{"faceId1":"' + main + '", "faceId2":"' + current + '"}';
      var request = require('sync-request');
      var res = request('POST', apiEndpoint, {
        body: bod,
        headers: { 'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/json' },
      });
      let data = JSON.parse(res.getBody('uft8'));
      if (data.confidence < 0.45) {
        success = false;
      }
    })
    this.setState({
      success: success,
    });
  }

  getFaceId(url) {
    const apiKey = '80d011c4c1ea46d88e97241bc578aec5';
    const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId="true"'
    fetch(apiEndpoint, {
      body: url,
      headers: {
        'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
      },
      method: 'POST'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.faceIds.push(data[0].faceId)
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Title title={'Are You Who You Say You Are?'} />
        <ImageUpload
          file={this.state.file}
          imagePreviewUrl={this.state.imagePreviewUrl}
          handleSubmit={this.handleSubmit}
          handleImageChange={this.handleImageChange}
          dontUpload={this.state.success}
          convertToByteArray={this.convertToByteArray}
        />
        <EmotionBox
          hasImages={this.state.hasImages}
          compareImages={this.compareImages}
          success={this.state.success}
          convertToByteArray={this.convertToByteArray}
        />
      </div>
    )
  }
}

export default App;
