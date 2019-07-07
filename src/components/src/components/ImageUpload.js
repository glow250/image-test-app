import React from 'react'

class ImageUpload extends React.Component {
    arrayBufferToBase64(buffer) {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b))

        return window.btoa(binary);
    }

    imageThumb(url, call) {
        const image = this.props.convertToByteArray(url);
        const apiKey = '3971438f266447d7bee3355c5580e99d';
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0/generateThumbnail?width=200&height=200&smartCropping=true'
        fetch(apiEndpoint, {
            body: image,
            headers: {
                'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream', 'Response-Type': 'blob'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.arrayBuffer().then((buffer) => {
                    let base64flag = 'data:image/jpeg;base64,';
                    let imageStr = this.arrayBufferToBase64(buffer);
                    switch (call) {
                        case 1:
                            document.querySelector('.resize1').src = base64flag + imageStr;
                            break;
                        case 2:
                            document.querySelector('.resize2').src = base64flag + imageStr;
                            break;
                        case 3:
                            document.querySelector('.resize3').src = base64flag + imageStr;
                            break;
                        case 4:
                            document.querySelector('.resize4').src = base64flag + imageStr;
                            break;
                        default:
                            break;
                    }
                })
            }
        })
    }

    render() {
        let { imagePreviewUrl} = this.props;
        let $imagePreview = [];
        let loaded = 0;
        for (let i = 0; i < imagePreviewUrl.length; i++) {
            if (imagePreviewUrl) {
                this.imageThumb(imagePreviewUrl[i], i + 1);
                $imagePreview = $imagePreview.concat([<li><img className="resize1" /></li>]);
                $imagePreview = $imagePreview.concat([<li><img className="resize2" /></li>]);
                $imagePreview = $imagePreview.concat([<li><img className="resize3" /></li>]);
                $imagePreview = $imagePreview.concat([<li><img className="resize4" /></li>]);
                //$imagePreview = $imagePreview.concat([<li><img className="resize" src={thumb} /></li>]);
                loaded++;
                if (loaded === 4) break;
            }
        }
        let userInput;
        if (this.props.dontUpload === null) {
            userInput = <form onSubmit={(e) => this._handleSubmit(e)}>
                <input className="fileInput"
                    type="file"
                    onChange={(e) => this.props.handleImageChange(e)} />
                <button className="submitButton" type="submit"
                    onClick={(e) => this.props.handleSubmit(e)}>Clear Images
                </button>
            </form>
        } else {
            userInput = null;
        }
        return (
            <div className="previewComponent">
                {userInput}
                <div className="images">
                    <ul>
                        {$imagePreview}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ImageUpload