# MSA 2019: Cognitive Services Submission by Gemma Lowe

For my 2019 MSA submission for Cognitive Services I created an application written with javascript, html, css and react utilising several different units of Microsoft Cognitive Services.

This apps purpose could be to use in a dating app where you want to have some level of confirmation that images uploaded are of the user. To do this the user first must upload images of themself, at maximum four. Then they must perform a series of emotions to confirm they are a human and then if these emotions are performed successfully the uploaded images will verified to the user and if the images match a verified status will be applied. All this is done with images taken from the users video camera.

I have utilised calls to detect and verify in the Face API and to get thumbnail in the computer vision API. I have used detectt to retrieve Face ID's of images and screenshots and to extract their emotion values. I used get thumbnail so all uploaded images have same aspect ratio and can be displayed in a nicer manner space wise, and focusing on the region of interest of the image. 
