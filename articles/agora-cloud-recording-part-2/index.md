To follow along with this tutorial, you need to go through [my previous tutorial](/engineering-education/agora-cloud-recording/)in order to set up cloud recording for your Agora project and develop the express server to acquire resource ID, start and stop the cloud recording.

### Goals

By the end of this tutorial, you’ll know:

- How to query an Agora cloud recording session.

- How to update the recorder's subscriber list.

- How to update the layout of the recording.

### Prerequisites

This tutorial and the previous tutorial is for applications that use [Agora's](https://www.agora.io/) SDKs and want to implement cloud recording. If you are not using Agora's SDKs in your application, then this tutorial is not for you.

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

### Query the recording session

You can query a recording session while it's in progress to get the details of the session. You can only query an ongoing session. If you query a recording session that has ended, the endpoint will respond with a 404.

Now, Let's add a POST request handler for a new endpoint called `'/query'` to query the recording session.

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

If the request is successful, the response will contain the details about the recording status. The details contain:

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

  - **json**: The file list is a JSONArray. In individual mode, fileListMode is always "json".

- **File list**: If the file list mode is "string", the file list is a string that represents the filename of the M3U8 file. If the file list mode is "json", the file list is an array that contains the details of each recorded file. The query method does not return this field if you have set snapshotConfig.

- **Slice Start Time**: The time when the recording starts. It's a UNIX timestamp.

- **Extension Service State**: The status of the extension services.

- **Sub Service Status**: The status of the cloud recording submodules.

Request body:

```json
{
  "mode": "mix",
  "sid": "38f8e3cfdc474cd56fc1ceba380d7e1a",
  "resource": "JyvK8nXHuV1BE64GDkAaBGEscvtHW7v8BrQoRPCHxmeVxwY22-x-kv4GdPcjZeMzoCBUCOr9q-k6wBWMC7SaAkZ_4nO3JLqYwM1bL1n6wKnnD9EC9waxJboci9KUz2WZ4YJrmcJmA7xWkzs_L3AnNwdtcI1kr_u1cWFmi9BWAWAlNd7S7gfoGuH0tGi6CNaOomvr7-ILjPXdCYwgty1hwT6tbAuaW1eqR0kOYTO0Z1SobpBxu1czSFh1GbzGvTZG"
}
```

Response:

```json
{
  "resourceId": "JyvK8nXHuV1BE64GDkAaBGEscvtHW7v8BrQoRPCHxmeVxwY22-x-kv4GdPcjZeMzoCBUCOr9q-k6wBWMC7SaAkZ_4nO3JLqYwM1bL1n6wKnnD9EC9waxJboci9KUz2WZ4YJrmcJmA7xWkzs_L3AnNwdtcI1kr_u1cWFmi9BWAWAlNd7S7gfoGuH0tGi6CNaOomvr7-ILjPXdCYwgty1hwT6tbAuaW1eqR0kOYTO0Z1SobpBxu1czSFh1GbzGvTZG",
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

### Updating the recorder's subscriber list

The recorder can subscribe to audio/video streams from specific users and record them. You can set up this configuration while starting the recording and you can also update the configuration when the recording is in progress. Refer to [this documentation](https://docs.agora.io/en/cloud-recording/cloud_recording_api_rest?platform=RESTful#start) on how to set up subscription lists when you start the recording.

You can update the subscriber list multiple times during a recording session.

Now, Let's add a POST request handler for a new endpoint called `'/updateSubscription'` to update the subscription list of the recorder.

```JavaScript
app.post("/updateSubscription", async (req, res) => {
  // Update Recorder's Subscriber List here
});
```

You need to perform a POST request on this endpoint `https://api.agora.io/v1/apps/{appid}/cloud_recording/resourceid/{resourceid}/sid/{sid}/mode/{mode}/update` to update the subscription list of the recorder.

The endpoint URL must contain the `appID`, the `resourceID`, the `sid` (recording ID), and the `mode` of recording.

In the body of the request, we should specify the UID, the channel ID, the subscription list, and the unsubscription list for video and audio channels separately.

Schema of the request body:

```json
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

To learn more about setting up subscription lists, refer to [the documentation](https://docs.agora.io/en/cloud-recording/cloud_recording_subscription?platform=RESTful).

### Updating the layout of the recording

While you are recording, you can request this endpoint to update the video mixing layout of the recording. You can update the video mixing layout multiple times during a recording session.

Requesting this endpoint will override the existing configurations.

> If you set the background color of the canvas as red when starting a recording and call this method to update the layout without setting the backgroundColor parameter, the background color changes back to the default value (black).

To learn more about setting video layout, refer to [this documentation](https://docs.agora.io/en/cloud-recording/cloud_recording_layout?platform=RESTful).

Now, Let's add a POST request handler for a new endpoint called `'/updateLayout'` to update the mixing layout of the recording.

```JavaScript
app.post("/updateLayout", async (req, res) => {
  // Update Video Mixing Layout Here
});
```

You need to perform a POST request on this endpoint `https://api.agora.io/v1/apps/{appid}/cloud_recording/resourceid/{resourceid}/sid/{sid}/mode/{mode}/updateLayout` to update the video mixing layout.

The endpoint URL must contain the `appID`, the `resourceID`, the `sid` (recording ID), and the `mode` of recording.

In the body of the request, we should specify the UID, the channel ID, and the configuration for the video mixing layout.

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

If the request is successful, the response will contain the recording ID and the resource ID of the recording session and the video mixing layout will be updated.

### Let's Recap

1. We added a POST request handler to query the recording session.

2. We added a POST request handler to update the subscriber list of the recorder.

3. We added a POST request handler to update the video mixing layout of the recording.

Congratulations, :partying_face: You did it.

Thanks for reading!
