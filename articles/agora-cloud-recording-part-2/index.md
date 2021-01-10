---
layout: engineering-education
status: publish
published: true
url: /engineering-education/agora-cloud-recording-part-2/
title: Cloud Recording with Agora - Queries and Updates
description: In this tutorial, we will be building a server using Node.js and Express to implement additional operations of Agora Cloud Recording like querying the recording session, updating subscriber list and updating mixing layout.
author: mohan-raj
date: 2021-01-06T00:00:00-19:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/agora-cloud-recording-part-2/hero.jpg
    alt: agora cloud recording part 2 hero image
---
In this tutorial, we will be building a server using Node.js and Express to implement additional operations of Agora Cloud Recording like querying the recording session, updating subscriber list and updating mixing layout.
<!--more-->

To follow along with this tutorial, you need to go through [my previous tutorial](/engineering-education/agora-cloud-recording/). 

The previous tutorial covers:

- How to set up cloud recording for your Agora project.

- How to develop an express server to acquire resource ID, start and stop the cloud recording.

The client application that's using the Agora SDKs should request this server to perform these actions. Then, the server will request the Agora APIs on behalf of the client application. This will ensure that credentials for the Agora APIs are secure rather than exposing them in the client application.

### Goals
By the end of this tutorial, you should know how to:

- Query an Agora cloud recording session.

- Update the recorder's subscriber list.

- Update the layout of the recording.

### Prerequisites
This tutorial (along with the [previous tutorial](/engineering-education/agora-cloud-recording/)) is for applications that use [Agora's](https://www.agora.io/) SDKs and want to implement cloud recording. If you are not using Agora's SDKs in your application, then this tutorial is not for you.

If you'd like to learn how to build some applications with React Native and Agora, refer to the articles below.

- [Livestreaming](/engineering-education/react-native-agora-livestreaming-app/).

- [Video Conferencing](/engineering-education/react-native-agora-video-conference-app/).

The fundamentals of Node.js and Express will not be covered in this tutorial. If you are not comfortable with the fundamentals, this is a [helpful tutorial](https://medium.com/@jaeger.rob/introduction-to-nodes-express-js-db5617047150) that you can go through before beginning with this project.

### Overview
We'll be going through these steps in this article:

1. Querying the recording session.
2. Updating the recorder's subscriber list.
3. Update the layout of the recording.
4. Recap

> You can refer to the final code in this [GitHub repository](https://github.com/zolomohan/agora-cloud-recording-server).

### Querying the recording session
You can query a recording session while it's in progress to get the details of the session. You can only query an ongoing session. If you query a session that has ended, the endpoint will respond with a 404.

Now, let's add a POST request handler for a new endpoint called `/query` to query the recording session.

```JavaScript
app.post("/query", async (req, res) => {
  // Query Recording Session Here
});
```

You need to perform a GET request on this endpoint `https://api.agora.io/v1/apps/{appid}/cloud_recording/resourceid/{resourceid}/sid/{sid}/mode/{mode}/query` to query the recording session.

The endpoint URL must contain the `appID`, the `resourceID`, the `sid` (recording ID), and the `mode` of recording.

```JavaScript
app.post("/query", async (req, res) => {
  const appID = process.env.appID;
  const resource = req.body.resource;
  const sid = req.body.sid;
  const mode = req.body.mode;

  const query = await axios.get(
    `https://api.agora.io/v1/apps/${appID}/cloud_recording/resourceid/${resource}/sid/${sid}/mode/${mode}/query`,
    { headers: { Authorization } }
  );

  res.send(query.data);
});
```

If the request is successful, the response will contain the details about the recording status. The details are:

- **Status**: The recording status.

  - 0: Recording has not started.

  - 1: Initialization is complete.

  - 2: Recorder is starting.

  - 3: Uploader is ready.

  - 4: Recorder is ready.

  - 5: First recorded file is uploaded. After uploading the first file, the status is always 5 when the recording is running.

  - 6: Recording stops.

  - 7: Agora Cloud Recording service stops.

  - 8: Recording is ready to exit.

  - 20: Recording exits abnormally.

- **File List Mode**: The data type of fileList. The query method does not return this field if you have set snapshotConfig.

  - **string**: The file list is a string. In composite mode, fileListMode is always "string".

  - **JSON**: The file list is a JSONArray. In individual mode, fileListMode is always "json".

- **File List**: If the file list mode is "string", the file list is a string that represents the filename of the M3U8 file. If the file list mode is "json", the file list is an array that contains the details of each recorded file. The query method does not return this field if you have set snapshotConfig.

- **Slice Start Time**: The time when the recording starts. It's a UNIX timestamp.

- **Extension Service State**: The status of the extension services.

- **Sub Service Status**: The status of the cloud recording submodules.

Request body:

```JSON
{
  "mode": "mix",
  "sid": "38f8e3cfdc474cd56fc1ceba380d7e1a",
  "resource": "Etkl6g-zSB7EpP-Da1zN63gS7Jv-butkhmOpECJ68ZYw7z0iOrTlzlXAP4r8gVDYIi9_bR13V6J4Eh8a4DJoKu2_FYpouhmjGOOynn5o8AQRYx3bWiVGyf936LGG-YHvYGhF9Coz_uqO5E0SHRlYQj9WMCAQsxBMMU5RvTS0MMtAO_8UcoQmGMO4pm5b4u6K2ejA8e6-JlV_dCaEadkIa-07RCAhPspjIUEQEcNJsQ_UKP5fVnXIl1OLMfimaDUt7JVDMGJ_z7dnOc01G43FkKFBSJEMzYZ25V2099i0UzewVFzO91j2rx91RGMnTN7g"
}
```

Response:

```JSON
{
  "resourceId": "Etkl6g-zSB7EpP-Da1zN63gS7Jv-butkhmOpECJ68ZYw7z0iOrTlzlXAP4r8gVDYIi9_bR13V6J4Eh8a4DJoKu2_FYpouhmjGOOynn5o8AQRYx3bWiVGyf936LGG-YHvYGhF9Coz_uqO5E0SHRlYQj9WMCAQsxBMMU5RvTS0MMtAO_8UcoQmGMO4pm5b4u6K2ejA8e6-JlV_dCaEadkIa-07RCAhPspjIUEQEcNJsQ_UKP5fVnXIl1OLMfimaDUt7JVDMGJ_z7dnOc01G43FkKFBSJEMzYZ25V2099i0UzewVFzO91j2rx91RGMnTN7g",
  "sid": "38f8e3cfdc474cd56fc1ceba380d7e1a",
  "serverResponse": {
    "status": "5",
    "fileListMode": "json",
    "fileList": [
      {
        "filename": "M6ETnKVtPbAY892ffaj3.m3u8",
        "trackType": "audio_and_video",
        "uid": "123",
        "mixedAllUser": true,
        "isPlayable": true,
        "sliceStartTime": 1562724971626
      },
      {
        "filename": "hlvM26hvtnXjj62fAkMc.m3u8",
        "trackType": "audio_and_video",
        "uid": "456",
        "mixedAllUser": true,
        "isPlayable": true,
        "sliceStartTime": 1562724971626
      }
    ],
    "sliceStartTime": 1562724971626
  }
}
```

If you'd like to learn more about this endpoint, check out the [API reference](https://docs.agora.io/en/cloud-recording/restfulapi/#/Cloud%20Recording/query).

### Updating the recorder's subscriber list
The recorder can subscribe to audio/video streams from specific users and record them. We can use this endpoint to update the configuration when the recording is in progress. You can update the subscriber list multiple times during a recording session.

You can also set up the subscriber list while starting the recording. Refer to [this documentation](https://docs.agora.io/en/cloud-recording/cloud_recording_api_rest?platform=RESTful#start) on how to set up subscriber lists when you start the recording.

Now, Let's add a POST request handler for a new endpoint called `'/updateSubscription'` to update the subscription list of the recorder.

```JavaScript
app.post("/updateSubscription", async (req, res) => {
  // Update Recorder's Subscriber List here
});
```

You need to perform a POST request on this endpoint `https://api.agora.io/v1/apps/{appid}/cloud_recording/resourceid/{resourceid}/sid/{sid}/mode/{mode}/update` to update the subscription list of the recorder.

The endpoint URL must contain the `appID`, the `resourceID`, the `sid` (recording ID), and the `mode` of recording.

In the body of the request, we should specify the recorder's UID, the channel ID, the subscription list, and the unsubscription list for video and audio channels separately.

Schema of the request body:

```JSON
{
  "cname": /* Channel Name */,
  "uid": /* UID of the recorder */,
  "clientRequest": {
    "streamSubscribe": {
      "audioUidList": {
        "subscribeAudioUids": [ /* Comma seperated values of UIDs */ ],
        "unSubscribeAudioUids": [ /* Comma seperated values of UIDs */ ]
      },
      "videoUidList": {
        "subscribeVideoUids": [ /* Comma seperated values of UIDs */ ],
        "unSubscribeVideoUids": [ /* Comma seperated values of UIDs */ ]
      }
    }
  }
}
```

If you want to subscribe/unsubscribe to all the audio/video streams, you need to specify `#allstream#` inside the array like this `[ "#allstream#"]`.

```JavaScript
app.post("/updateSubscription", async (req, res) => {
  const appID = process.env.appID;
  const resource = req.body.resource;
  const sid = req.body.sid;
  const mode = req.body.mode;

  const updateSubscription = await axios.get(
    `https://api.agora.io/v1/apps/${appID}/cloud_recording/resourceid/${resource}/sid/${sid}/mode/${mode}/update`,
    {
      cname: req.body.channel,
      uid: req.body.uid,
      clientRequest: {
        streamSubscribe: {
          audioUidList: req.body.audioSubscription,
          videoUidList: req.body.videoSubscription,
        },
      },
    },
    { headers: { Authorization } }
  );

  res.send(updateSubscription.data);
});
```

If the request is successful, the response will contain the recording ID and the resource ID of the recording session and the subscription list will be updated.

Request body:

```JSON
{
  "resource": "Etkl6g-zSB7EpP-Da1zN63gS7Jv-butkhmOpECJ68ZYw7z0iOrTlzlXAP4r8gVDYIi9_bR13V6J4Eh8a4DJoKu2_FYpouhmjGOOynn5o8AQRYx3bWiVGyf936LGG-YHvYGhF9Coz_uqO5E0SHRlYQj9WMCAQsxBMMU5RvTS0MMtAO_8UcoQmGMO4pm5b4u6K2ejA8e6-JlV_dCaEadkIa-07RCAhPspjIUEQEcNJsQ_UKP5fVnXIl1OLMfimaDUt7JVDMGJ_z7dnOc01G43FkKFBSJEMzYZ25V2099i0UzewVFzO91j2rx91RGMnTN7g",
  "sid": "c87831d3914285db6c102e8a4015d308",
  "mode": "mix",
  "channel": "Jo6m9E20E02m9yE5maNk",
  "uid": "45687",
  "audioSubscription": {
    "subscribeAudioUids": ["#allstream#"]
  },
  "videoSubscription": {
    "subscribeVideoUids": ["111", "222", "333"],
    "unSubscribeVideoUids": ["444", "555", "666"]
  }
}
```

Response:

```JSON
{
  "resourceId": "Etkl6g-zSB7EpP-Da1zN63gS7Jv-butkhmOpECJ68ZYw7z0iOrTlzlXAP4r8gVDYIi9_bR13V6J4Eh8a4DJoKu2_FYpouhmjGOOynn5o8AQRYx3bWiVGyf936LGG-YHvYGhF9Coz_uqO5E0SHRlYQj9WMCAQsxBMMU5RvTS0MMtAO_8UcoQmGMO4pm5b4u6K2ejA8e6-JlV_dCaEadkIa-07RCAhPspjIUEQEcNJsQ_UKP5fVnXIl1OLMfimaDUt7JVDMGJ_z7dnOc01G43FkKFBSJEMzYZ25V2099i0UzewVFzO91j2rx91RGMnTN7g",
  "sid": "c87831d3914285db6c102e8a4015d308",
}
```

To learn more about setting up subscription lists, refer to [the documentation](https://docs.agora.io/en/cloud-recording/cloud_recording_subscription?platform=RESTful).

If you'd like to learn more about this endpoint, check out the [API reference](https://docs.agora.io/en/cloud-recording/restfulapi/#/Cloud%20Recording/update).

### Updating the layout of the recording
While you are recording, you can request this endpoint to update the video mixing layout of the recording. You can update the video mixing layout multiple times during a recording session.

Requesting this endpoint will override the existing configurations.

> If you set the background color of the canvas as red when starting a recording and call this method to update the layout without setting the backgroundColor parameter, the background color will revert back to the default value (black).

To learn more about setting video layout, refer to [this documentation](https://docs.agora.io/en/cloud-recording/cloud_recording_layout?platform=RESTful).

Now, Let's add a POST request handler for a new endpoint called `/updateLayout` to update the mixing layout of the recording.

```JavaScript
app.post("/updateLayout", async (req, res) => {
  // Update Video Mixing Layout Here
});
```

You need to perform a POST request on this endpoint `https://api.agora.io/v1/apps/{appid}/cloud_recording/resourceid/{resourceid}/sid/{sid}/mode/{mode}/updateLayout` to update the video mixing layout.

The endpoint URL must contain the `appID`, the `resourceID`, the `sid` (recording ID), and the `mode` of recording.

In the body of the request, we should specify the recorder's UID, the channel ID, and the configuration for the video mixing layout.

**Layout Config:**

- **Background Color:** The background color of the canvas in RGB Hex value.

- **Max Resolution UID:** When the _mixedVideoLayout_ parameter is set as 2 (vertical layout), you can specify the UID of the large video window.

- **Mixed Video Layout:** The predefined layouts are `0`: Floating Layout, `1`: Best Fit Layout, `2`: Vertical Layout. If you set this parameter as `3`, you need to provide the layout config by the `layoutConfig` parameter.

- **Layout Config:** An array of the configuration of each user. Supports 17 users at most. Each user configuration should have the below parameters:

  - **uid:** The string should contain the UID of the user.

  - **x_axis:** The relative horizontal position of the top-left corner of the region. The value should be between 0.0 (leftmost) and 1.0 (rightmost). It can also be an integer (0 or 1).

  - **y_axis:** The relative vertical position of the top-left corner of the region. The value should be between 0.0 (top) and 1.0 (bottom). It can also be an integer (0 or 1).

  - **height:** The relative height of the region. The value should be between 0.0 and 1.0. _height_ can also be an integer 0 or 1.

  - **width:** The relative width of the region. The value should be between 0.0 and 1.0. _width_ can also be an integer 0 or 1.

  - **alpha:** Transparency of the region. The value should be between 0.0 and 1.0.

  - **render_mode:** The display mode of the region. `0`: Cropped Mode and `1`: Fit Mode

```JavaScript
app.post("/updateLayout", async (req, res) => {
  const appID = process.env.appID;
  const resource = req.body.resource;
  const sid = req.body.sid;
  const mode = req.body.mode;

  const body = {
    cname: req.body.channel,
    uid: req.body.uid,
    clientRequest: {
      mixedVideoLayout: req.body.layout,
      backgroundColor: req.body.backgroundColor,
    },
  };

  if (req.body.layoutConfig === 3) {
    body.clientRequest.layoutConfig = req.body.layoutConfig;
  }

  const updateLayoutConfig = await axios.get(
    `https://api.agora.io/v1/apps/${appID}/cloud_recording/resourceid/${resource}/sid/${sid}/mode/${mode}/updateLayout`,
    body,
    { headers: { Authorization } }
  );

  res.send(updateLayoutConfig.data);
});
```

If the request is successful, the response will contain the recording ID and the resource ID of the recording session. The video mixing layout of the recording will also be updated.

Request body:

```JSON
{
  "resource": "Etkl6g-zSB7EpP-Da1zN63gS7Jv-butkhmOpECJ68ZYw7z0iOrTlzlXAP4r8gVDYIi9_bR13V6J4Eh8a4DJoKu2_FYpouhmjGOOynn5o8AQRYx3bWiVGyf936LGG-YHvYGhF9Coz_uqO5E0SHRlYQj9WMCAQsxBMMU5RvTS0MMtAO_8UcoQmGMO4pm5b4u6K2ejA8e6-JlV_dCaEadkIa-07RCAhPspjIUEQEcNJsQ_UKP5fVnXIl1OLMfimaDUt7JVDMGJ_z7dnOc01G43FkKFBSJEMzYZ25V2099i0UzewVFzO91j2rx91RGMnTN7g",
  "sid": "c87831d3914285db6c102e8a4015d308",
  "mode": "mix",
  "channel": "Jo6m9E20E02m9yE5maNk",
  "uid": "45687",
  "layout": 3,
  "backgroundColor": "#FF0000",
  "layoutConfig": [
    {
      "uid": 1,
      "x_axis": 0,
      "y_axis": 0,
      "width": 0.5,
      "height": 1,
      "alpha": 1,
      "render_mode": 1
    },
    {
      "uid": 2,
      "x_axis": 0.5,
      "y_axis": 0.5,
      "width": 0.5,
      "height": 1,
      "alpha": 1,
      "render_mode": 1
    }
  ]
}
```

Response:

```JSON
{
  "resourceId": "Etkl6g-zSB7EpP-Da1zN63gS7Jv-butkhmOpECJ68ZYw7z0iOrTlzlXAP4r8gVDYIi9_bR13V6J4Eh8a4DJoKu2_FYpouhmjGOOynn5o8AQRYx3bWiVGyf936LGG-YHvYGhF9Coz_uqO5E0SHRlYQj9WMCAQsxBMMU5RvTS0MMtAO_8UcoQmGMO4pm5b4u6K2ejA8e6-JlV_dCaEadkIa-07RCAhPspjIUEQEcNJsQ_UKP5fVnXIl1OLMfimaDUt7JVDMGJ_z7dnOc01G43FkKFBSJEMzYZ25V2099i0UzewVFzO91j2rx91RGMnTN7g",
  "sid": "c87831d3914285db6c102e8a4015d308",
}
```

If you'd like to learn more about this endpoint, check out the [API reference](https://docs.agora.io/en/cloud-recording/restfulapi/#/Cloud%20Recording/updateLayout).

### Let's recap
1. We added a POST request handler to query the recording session.

2. We added a POST request handler to update the subscriber list of the recorder.

3. We added a POST request handler to update the video mixing layout of the recording.

Congratulations, :partying_face: You did it.

Thanks for reading!
