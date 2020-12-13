To follow along with this tutorial, you need to go through [my previous tutorial]() to set up cloud recording for your Agora project and develop the express server to acquire resource ID, start and stop the cloud recording.

### Goals
By the end of this tutorial, you’ll know:

- How to query an Agora cloud recording session.

- How to update the recorder's subscriber list.

- How to update the layout of the recording.

### Prerequisites
This tutorial along with the previous tutorial is for applications that use [Agora's](https://www.agora.io/) SDKs and want to implement cloud recording. If you are not using Agora in your application, then this tutorial is not for you.

If you'd like to learn how to build some applications with React Native and Agora, refer to the articles below.

- [Livestreaming](/engineering-education/react-native-agora-livestreaming-app/).

- [Video Conferencing](/engineering-education/react-native-agora-video-conference-app/).

The fundamentals of Node.js and Express will not be covered in this tutorial. If you are not comfortable with the fundamentals, this is a [helpful tutorial](https://medium.com/@jaeger.rob/introduction-to-nodes-express-js-db5617047150) that you can go through before beginning with this project.

### Overview
We'll be going through these steps in this article:

1. Querying the recording session.
2. Updating the recorder's subscriber list.
3. Update the layout of the recording.

### Query the recording session
You can query a recording session while it's in progress to get the details of the session. You can only query an ongoing session. If you query a recording session that has ended, the endpoint will respond with a 404.

Now, Let's add a POST handler for a new endpoint called `'/query'` to query the recording session.

```JavaScript
app.post("/query", (req, res) => {
  // Query Recording Session Here
});
```

You need to perform a GET request on this endpoint `https://api.agora.io/v1/apps/{appid}/cloud_recording/resourceid/{resourceid}/sid/{sid}/mode/{mode}/query` to start the recording.

The endpoint URL must contain the `appID`, the `resourceID`, the `sid` (recording ID), and the `mode` of recording.

```JavaScript
app.post("/query", (req, res) => {
  const Authorization = `Basic ${Buffer.from(`${process.env.RESTkey}:${process.env.RESTsecret}`).toString('base64')}`

  const acquire = await axios.post(
    `https://api.agora.io/v1/apps/${process.env.appid}/cloud_recording/resourceid/${req.body.resourceid}/sid/${req.body.sid}/mode/${req.body.mode}/query`,
    { headers: { Authorization } }
  );

  res.send(acquire.data)
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
    "sid":"38f8e3cfdc474cd56fc1ceba380d7e1a",
    "resource": "JyvK8nXHuV1BE64GDkAaBGEscvtHW7v8BrQoRPCHxmeVxwY22-x-kv4GdPcjZeMzoCBUCOr9q-k6wBWMC7SaAkZ_4nO3JLqYwM1bL1n6wKnnD9EC9waxJboci9KUz2WZ4YJrmcJmA7xWkzs_L3AnNwdtcI1kr_u1cWFmi9BWAWAlNd7S7gfoGuH0tGi6CNaOomvr7-ILjPXdCYwgty1hwT6tbAuaW1eqR0kOYTO0Z1SobpBxu1czSFh1GbzGvTZG"
}
```

Response:

```json
{
  "resourceId":"JyvK8nXHuV1BE64GDkAaBGEscvtHW7v8BrQoRPCHxmeVxwY22-x-kv4GdPcjZeMzoCBUCOr9q-k6wBWMC7SaAkZ_4nO3JLqYwM1bL1n6wKnnD9EC9waxJboci9KUz2WZ4YJrmcJmA7xWkzs_L3AnNwdtcI1kr_u1cWFmi9BWAWAlNd7S7gfoGuH0tGi6CNaOomvr7-ILjPXdCYwgty1hwT6tbAuaW1eqR0kOYTO0Z1SobpBxu1czSFh1GbzGvTZG",
  "sid":"38f8e3cfdc474cd56fc1ceba380d7e1a",
  "serverResponse":{
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

### Updating the recorder's subscriber list.