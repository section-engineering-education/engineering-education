---
layout: engineering-education
status: publish
published: true
url: /build-an-outlook-clone-using-react/
title: Building An Outlook Clone with React
description: This article helps developers get started with React by building an Outlook clone using React so that you can learn the fundamentals by getting hands-on with the code.
author: lalithnarayan-c
date: 2020-07-31T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-an-outlook-clone-using-react/hero.jpg
    alt: output image outlook clone example
---
This guide will walk you through how to build an Outlook clone using React so that you can learn the fundamentals of React. This article is suitable for developers of all experience levels. Open your editor, and let's get started.

<!--more-->

### What is React?

React is a front-end JavaScript library used for building single-page and mobile applications. The React library boasts of three main features:

- **Declarative:** UIs are designed using React components. Declarative programming paradigm expresses the logic of computation without describing the control flow. React provides efficient algorithms for updating and rendering the right components upon change.
- **Component-Based:** Build encapsulated components with their own state. These are later composed to make complex UIs.
- **Re-Usability:** The React library enables components to be re-used across many pages. This enables faster and efficient development.

### What are we building today?

The aim of this article is to build a simple interface using React. We initially fetch a list of e-mails from an API, and display the list. On clicking on an email, the respective email body is displayed. We also add various functionalities, such as marking the e-mail as favorite and filtering the e-mail list by read, unread, and favorite categories.

Going one step further, we will also implement session persistence using local storage. This way, when we reload, the state is preserved.

<!-- talk about optimization as well -->

### Lets Begin. Shall We?

#### Prerequisites

- Code Editor: (We use VSCode in this article)
- [npm](https://www.npmjs.com/get-npm)
- [create-react-app](https://www.npmjs.com/package/create-react-app)

We wont be covering the installation for the above files. The links mentioned above are self-explanatory.

### Setting up API on localhost
For the project, we need to make API calls to get the list of emails and email body. To set that up we will be using **json-server** package:

```
npm install -g json-server
```

The single line command above installs the required package. `-g` denotes that the package is installed globally.

Our first JSON file consists of 15 emails. We will use [My JSON Server](https://my-json-server.typicode.com/lalith1403/jsonemaillist/list), a hosted service that provides fake online REST APIs for free.

The other API of interest is fetching the email body given the email id. Online hosting services have various bottlenecks when it comes to content length. Thus, let's use local hosting to get the data.

The email body JSON file is as follows. Paste the following code into a file called `db.json`.

``` json
{
  "emailbody": [
    {
      "id": "1",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie.Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p></div>"
    },
    {
      "id": "2",
      "body": "<div><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "3",
      "body": "<div><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "4",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum.Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "5",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Pellentesque blandit diam in placerat viverra. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci.Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "6",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui.Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim e lementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p></div>"
    },
    {
      "id": "7",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p></div>"
    },
    {
      "id": "8",
      "body": "<div><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "9",
      "body": "<div><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "10",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat.  Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu.  Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "11",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "12",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p></div>"
    },
    {
      "id": "13",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p></div>"
    },
    {
      "id": "14",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Quisque non venenatis dui, nec volutpat magna. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque.  Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p></div>"
    },
    {
      "id": "15",
      "body": "<div><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    }
  ]
}

```

### Initiate JSON Server

```
json-server --watch db.json
```

If you get an error, check if **npm** has been added to environment variables. That should be a quick fix. Add the following to your **PATH** environment variable: `C:\Users\YOUR_NAME\AppData\Roaming\npm`

Once we have the server running, we can check via Postman or just go to http://localhost:3000/emailbody. To get a specific email body, we can send the `id` as a parameter.

To do this, modify the url as follows: http://localhost:3000/emailbody?id=1. This returns the body of the email with the id of 1.

### React Lifecycle Methods

The React lifecycle methods signal the series of events that a component goes through. The various lifecycle methods are:
1. render()
2. componentDidMount()
3. componentDidUpdate()
4. componentWillUnmount()

The above mentioned lifecycle methods are used most often. There are a few more lifecycle methods that are rarely used, including:
1. shouldComponentUpdate()
2. getSnapshotBeforeUpdate()

![Lifecycle Methods](/engineering-education/build-an-outlook-clone-using-react/Lifecycle-Methods.png)<br>
*Source:[programmingwithmosh.com](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)*

### Code

We first begin with creating a React project using the **create-react-app** package. Open a new terminal of your choice and execute the following commands.

```bash
npx create-react-app outlookclonereact
cd outlookclonereact
npm start
```

The folder structure should look like this:

```
outlookclonereact
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

We will be working with class-based components in this article. (My next article will talk about using Hooks for the same.) A study of the two articles is enough to get a working understanding of React. Many examples that we find on GitHub are in class-based components. Having the ability to use React Hooks in place of class-based components is a useful skill to have.

Let's create a folder called components in the root folder. The updated directory looks like this. Add the components **`Email.js`**, **`EmailList.js`**, **`EmailBody.js`**, **`SearchBox.js`**,**`Scroll.js`**.

```
outlookclonereact
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── components
    │   ├── Email.js
    │   ├── EmailBody.js
    │   ├── EmailList.js
    │   ├── SearchBox.js
    │   ├── Scroll.js
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

##### App.js
Let's start with the file `App.js`. The first logical step is to get the emails from the API. We use *fetch* provided by JavaScript for this purpose. *fetch* returns a promise which resolves with an object of built-in Response class as soon as the server responds with headers.

React is modular and powerful to create simple yet elaborate applications. The component that we just created called `EmailList.js` receives the list of emails from the API in `App.js`. It then sends over each email to the `Email.js` component, which displays the contents of the email. We have another API for accessing the body of the email.

On an *onClick* event, the id of the email is saved in the state. This id is used to fetch the email body from the API. We will look into this in depth at a later stage.
```javascript
import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox'
import Scroll from './components/Scroll'
import EmailList from './components/EmailList'

class App extends Component {
  constructor() {
    super()
    // set dualPanel, used to display both the email list and the corresponding email body
    this.state = {
      email: [],
      dualPanel: false
    }
  }

onSearchChange = (event) => {
  this.setState({
    searchField: event.target.value,
  })
}
// make an API call as soon as the component is mounted
componentDidMount() {
  fetch('https://my-json-server.typicode.com/lalith1403/jsonemaillist/db')
    .then(data => data.json())
    .then(email => this.setState({ email: email["list"]}))
    .catch(err => console.log(err))
}
// function to set dualPanel
setDualPanel = () => {
  this.setState({ dualPanel: true })
}

// function to reset dualPanel
resetDualPanel = () => {
  this.setState({ dualPanel: false })
}

render() {
  const { email } = this.state;
  // when no emails are received, display loading message
  if (!email.length) {
    return !this.state.dualPanel &&
      <h1 >
        Loading
      </h1>
  }
  else {
    // when emails list is updated, send the list over to EmailList component
    return (
      <div className='dualpanel'>
        <div>
          <button>FilterBy</button>
          <button>read</button>
          <button>Unread</button>
          <button>Favourite</button>
          {/* SearchBox component defined below */}
          <SearchBox searchChange={this.onSearchChange} />
        </div>
        {/*onclick set the dualPanel to true, and make space for email body.*/}
        <div onClick={this.setDualPanel}>
          {!email.length &&
            <div style={{ marginRight: "10em", fontSize: "2em" }}>
              No Emails Found
            </div>
          }
          {/* Scroll is a component defined to control the visibility.*/}
          <Scroll>
            <EmailList email={email} />
          </Scroll>
        </div>
      </div>
    )
  }
}
}

export default App;
```
##### App.css
```css
.dualpanel{
    /* width: 30vw; */
    margin-left: 1vw;
    margin-right: 1vw;
    margin-bottom: 1vw;
}

```

##### EmailList.js
Let's create the child components, beginning with the `Emaillist.js` component. (Note: It is a convention to start components with a capital letter.)

In `EmailList.js`, we send the component `email` as props. Props are selective pieces of information that are passed on from parent to child.
```javascript
import React from 'react';
import Email from './Email'

const processDate = date => {
    let formattedDate = new Date(date);
    const mnth = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
    const day = ("0" + formattedDate.getDate()).slice(-2)
    const hours = ("0" + formattedDate.getHours()).slice(-2)
    const minutes = ("0" + formattedDate.getMinutes()).slice(-2)
    const displayTime = [hours - 12, minutes].join(":")
    const displayDate = [day, mnth, formattedDate.getFullYear()].join("-")
    return [displayDate, ' ', displayTime, ' ', hours > 12 ? 'pm' : 'am'];
}

const EmailList = ({ email }) => {
    return (<div>
        {
            email.map((__, index) => {
                return (<Email
                    key={index}
                    id={email[index].id}
                    name={email[index].from.name}
                    email={email[index].from.email}
                    subject={email[index].subject}
                    shortDesc={email[index].short_description}
                    date={processDate(email[index].date)}
                />);
            })
        }
    </div>)
}

export default EmailList

```

##### Scroll.js
The map functionality is used to perform the same operation on various emails in the list. Each email in the list is sent to the `Email.js` component, which is resposible for displaying the details related to the email.

The next component of interest is the `Scroll.js` component. This is a very handy and useful component that we will use to control display height.
```javascript
import React from 'react';

const Scroll = (props) => {
    return (
        <div style={{ overflowY: 'auto', height: '89vh' }}>
            {props.children}
        </div>
    )
}

export default Scroll
```

##### SearchBox.js
To get even more comfortable with components, let's create one more for the search box. Though, we could include it in the code itself, this is a case where we are demonstrating separation of concerns between the components. The `SearchBox.js` component is defined as follows. It takes in a function `searchChange` as a parameter which is discussed at a later stage.
```javascript
import React from 'react'

const SearchBox = ({ searchChange }) => {
    return (<div>
        <input type='search'
            placeholder='Search Emails '
            onChange={searchChange} />
    </div>)
}
export default SearchBox;
```

##### EmailBody.js
The final component that we need is an `EmailBody.js` component, which shows us the body of the email. The body that we get from the `db.json` file has html tags in it. We use `dangerouslySetInnerHTML` property of div tag to set the html content as the body.
```javascript
import React from 'react'

const Email = ({ name, email, subject, shortDesc, date, id }) => {

    return (
        <div>
            <div>
                <div>
                    <div className='avatar' style={{ paddingLeft: "0.49em", paddingTop: "0.22em", fontSize: "1.8em", margin: "5px" }}>
                        {name[0]}
                    </div>
                </div>
                <div style={{ marginRight: "1vw" }}>
                    <h4><span>From:</span> {name} &lt;{email}&gt;</h4>
                    <p className='subject'><span>Subject:</span> {subject} </p>
                    <p>{shortDesc}</p>
                    <p>{date}</p>
                </div>
            </div>
        </div>
    );
}

export default Email;
```

##### *EmailBody.js*
```jsx
import React from 'react'

const EmailBody = ({ body }) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>)
}

export default EmailBody
```

### Passing Props and Implementing CallBack Functions
Having defined all the components required, we need to ensure interoperability amongst components.

To do this, we will modify the `App.js` component with the following changes:

1. Obtain and store the current id, and other details related to the email with the corresponding id. Details to be stored in the state are:
   - current id
   - current sender email ID
   - current subject
   - current date
2. Enable operations like mark as favorite and filter operations. We need to maintain lists to store emails after the filter operations are performed. Additional lists are required to store the list of read and favorited emails. We need to store the following in the state:
   - fav
   - read

Let's go through each of the functionalities. The first function is processing the date parameter in the JSON. We can use various packages like [moment.js](https://momentjs.com/) to obtain the processed date in the required format. Since we are using only React, we are going to use vanilla JavaScript to get the same. The function `processDate()` does the same. It returns the date in the format DD-MM-YYYY HH:MM AM/PM.
```javascript

      processDate = date => {
        let formattedDate = new Date(date);
        const mnth = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
        const day = ("0" + formattedDate.getDate()).slice(-2)
        const hours = ("0" + formattedDate.getHours()).slice(-2)
        const minutes = ("0" + formattedDate.getMinutes()).slice(-2)
        const displayTime = [hours - 12, minutes].join(":")
        const displayDate = [day, mnth, formattedDate.getFullYear()].join("-")
        return [displayDate, ' ', displayTime, ' ', hours > 12 ? 'pm' : 'am'];
      }
```

The next function is updating the parameter `searchField` in the state object. `searchField` is updated when the input to the text changes and is used to enable search functionality. Any changes in the DOM are captured through events. The input to the function `onSearchChange()` is the text change event. When it changes, the `searchField` is set to the value of the event. This is an example of a **callback function**.

```javascript
   onSearchChange = (event) => {
        this.setState({
          searchField: event.target.value,
        })
      }
```

Now, let's add the functionalities to add emails to read and favorite lists. To do this, we enable this via two functions, `findEmailId()` and `markAsFav()`.

**`findEmailId()`** is used for the following:

 *Find the current email ID, and fetch the body. Set the parameters currentDate, currentSubject, currentId and currentSender. The email that has been clicked, is by default marked as **read**. Therefore, we add the email to the read list, if it is the first time it is being read.*

**`markAsFav()`** uses the same logic as adding emails to the read list. In this case, we use the fav list to determine if an email is marked as favorite or not.

#### Where are we getting the id in `findEmailId()` and when is the `markAsFav()` function called?

This is an important concept. The communication between parent and child components is straightforward. We can send them as props. But how do we update the props and get the information in the parent component?

There are instances where changes in the children components have to be reflected in the parent component.

For this purpose, we use callback functions. `findEmailId()` is a callback function sent as a prop to the `EmailList.js` component. It is redirected over to `Email.js` component. In the `Email.js` component, we call the `onClick` function when there is an onClick event.

```javascript
      findEmailId = (id) => {
        fetch(`http://localhost:3000/emailbody?id=${id}`)
          .then(data => data.json())
          .then(data => this.setState({ body: data[0]["body"] }))
          .catch(err => console.log(err))

        this.setState({
          currentDate: this.processDate(this.state.email[id - 1].date),
          currentSubject: this.state.email[id - 1].subject,
          currentSender: this.state.email[id - 1].from.name,
          currentId: id - 1
        })

        if (!this.state.read.includes(parseInt(id - 1))) {
          this.setState({
            read: [...this.state.read, parseInt(id - 1)]
          })
        }
      }

      markAsFav = () => {
        if (!this.state.fav.includes(parseInt(this.state.currentId))) {
          this.setState({
            fav: [...this.state.fav, parseInt(this.state.currentId)]
          })
        }
      }

```
The updated files are given below.

##### App.js
```javascript
    import React, { Component } from 'react';
    import './App.css';
    import SearchBox from './components/SearchBox'
    import EmailList from './components/EmailList'
    import EmailBody from './components/EmailBody'
    import Scroll from './components/Scroll'

    class App extends Component {
      constructor() {
        super()
        this.state = {
          email: [],
          body: ' ',
          currentId: 0,
          currentDate: ' ',
          currentSender: ' ',
          currentSubject: ' ',
          dualPanel: false,
          fav: [],
          read: [],
          searchField: ' '
        }
      }

      processDate = date => {
        let formattedDate = new Date(date);
        const mnth = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
        const day = ("0" + formattedDate.getDate()).slice(-2)
        const hours = ("0" + formattedDate.getHours()).slice(-2)
        const minutes = ("0" + formattedDate.getMinutes()).slice(-2)
        const displayTime = [hours - 12, minutes].join(":")
        const displayDate = [day, mnth, formattedDate.getFullYear()].join("-")
        return [displayDate, ' ', displayTime, ' ', hours > 12 ? 'pm' : 'am'];
      }

      onSearchChange = (event) => {
        this.setState({
          searchField: event.target.value,
          })
      }

      setDualPanel = () => {
        this.setState({ dualPanel: true })
      }

      resetDualPanel = () => {
        this.setState({ dualPanel: false })
      }

      findEmailId = (id) => {
        fetch(`http://localhost:3000/emailbody?id=${id}`)
          .then(data => data.json())
          .then(data => this.setState({ body: data[0]["body"] }))
          .catch(err => console.log(err))

        this.setState({
          currentDate: this.processDate(this.state.email[id - 1].date),
          currentSubject: this.state.email[id - 1].subject,
          currentSender: this.state.email[id - 1].from.name,
          currentId: id - 1
        })

        if (!this.state.read.includes(parseInt(id - 1))) {
          this.setState({
            read: [...this.state.read, parseInt(id - 1)]
          })
        }
      }

      markAsFav = () => {
        if (!this.state.fav.includes(parseInt(this.state.currentId))) {
          this.setState({
            fav: [...this.state.fav, parseInt(this.state.currentId)]
          })
        }
      }

      componentDidMount() {
        fetch('https://my-json-server.typicode.com/lalith1403/jsonemaillist/db')
          .then(data => data.json())
          .then(email => this.setState({ email: email["list"] }))
          .catch(err => console.log(err))
      }
      render() {
        const { email, searchField } = this.state;

        if (!email.length) {
          return !this.state.dualPanel &&
            <h1 >
              Loading
          </h1>
        }
        else {
          return (<div className='dualpanel'>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: "50px", marginTop: "15px" }}>
              <button className={'buttons'} style={{ cursor: "default", background: 'transparent', fontWeight: "bold" }}>FilterBy</button>
              <button>read</button>
              <button>Unread</button>
              <button>Favourite</button>

              {this.state.dualPanel &&
                <button style={{ cursor: "pointer", background: "#e54065", border: "1px solid black", width: "80px", outline: "none" }}
                  onClick={this.resetDualPanel}>Back</button>}
              <hr style={{ color: "white", height: '0px', backgroundColor: "transparent" }} />

              <SearchBox searchChange={this.onSearchChange} />
            </div>

            <div onClick={this.setDualPanel} style={this.state.dualPanel ? { display: "flex", flexDirection: "row" } : {}}>
              {!email.length &&
                <div style={{ marginRight: "10em", fontSize: "2em" }}>
                  No Emails Found
                </div>
              }

              {<Scroll>
                <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={email} onClick={this.findEmailId} />
              </Scroll>}

              {this.state.dualPanel
                &&
                <EmailBody
                  markAsFav={this.markAsFav}
                  currentSender={this.state.currentSender}
                  currentSubject={this.state.currentSubject}
                  currentDate={this.state.currentDate}
                  currentId={this.state.currentId}
                  body={this.state.body} />}
            </div>
          </div>)
        }
      }
    }

    export default App;

```

##### EmailList.js
```javascript
import React from 'react';
import Email from './Email'

const processDate = date => {
    let time = date;
    let formattedDate = new Date(time);
    const mnth = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
    const day = ("0" + formattedDate.getDate()).slice(-2)
    const hours = ("0" + formattedDate.getHours()).slice(-2)
    const minutes = ("0" + formattedDate.getMinutes()).slice(-2)
    const displayTime = [hours - 12, minutes].join(":")
    const displayDate = [day, mnth, formattedDate.getFullYear()].join("-")
    return [displayDate, ' ', displayTime, ' ', hours > 12 ? 'pm' : 'am'];
}

const EmailList = ({ email, onClick, read, markfav, currentCard }) => {
    return (<div>
        {
            email.map((__, index) => {
                return (<Email
                    key={index}
                    currentCard={currentCard}
                    id={email[index].id}
                    name={email[index].from.name}
                    email={email[index].from.email}
                    subject={email[index].subject}
                    markfav={markfav}
                    shortDesc={email[index].short_description}
                    date={processDate(email[index].date)}
                    onClick={onClick}
                    read={read}
                />);
            })
        }
    </div>)
}

export default EmailList

```

##### Email.js
To style the emails according to their read/unread status, we pass the read list as a prop from `App.js` to `Email.js`. For styling, we use nested ternary operators to check if the current email is read or not. `Email.css` and `EmailBody.css` are mentioned below. Don't worry if you get an error. Fill in the file with the css properties given below.

```javascript
import React from 'react'
import './css/Email.css'

const Email = ({ name, email, subject, shortDesc, date, id, onClick, read, markfav, currentCard }) => {

    return (
        <div>
            <div className={read.includes(parseInt(id - 1)) ?
                ((currentCard) === parseInt(id - 1) ? 'outline card' : 'nooutline card') : 'noutline card' ? 'noutline cardnocolor' : ''}
                style={{ display: "flex", flexDirection: "row", borderSpacing: "10px" }}
                onClick={() => onClick(id)} >
                <div>
                    <div className='avatar' style={{ paddingLeft: "0.49em", paddingTop: "0.22em", fontSize: "1.8em", margin: "5px" }}>
                        {name[0]}
                    </div>
                </div>
                <div style={{marginRight:"1vw"}}>
                    <h4><span>From:</span> {name} &lt;{email}&gt;</h4>
                    <p className='subject'><span>Subject:</span> {subject} </p>
                    <p>{shortDesc}</p>
                    <p>{date}
                        {markfav.includes(parseInt(id - 1)) ? <button style={{ color: '#e54065' }}> Favourite</button> : <button></button>}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Email;

```

##### EmailBody.js

```javascript
import React from 'react'
import './css/EmailBody.css'

const EmailBody = ({ body, currentSubject, currentDate, currentSender, currentId, markAsFav }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", borderSpacing: "10px" }} className='upperbody' >
            <div className='avatar' style={{ paddingLeft: "0.4em", marginTop: "-2em", fontSize: "2em", margin: "5px" }}>
                {currentSender[0]}
            </div>
            <div className="body">
                <h1>{currentSubject}
                    <button
                        style={{
                            marginLeft: "65vh", background: '#e54065',
                            border: "none", borderRadius: "5%", color: "white", cursor: "pointer", outline: "none"
                        }}
                        onClick={markAsFav}
                        >
                        Favourite</button>
                </h1>
                <p>From {currentSender}</p>
                <p>{currentDate}</p>
                <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
        </div>)
}

export default EmailBody
```
### Styling

Since, this is a React tutorial, we will not be diving deep into the CSS styling. We have used inline styles for the purposes of better readability. But, it's always a good practice to have a separate CSS file, or use the library styled-components, which optimizes the performance of the web page. We will use styled-components in the next tutorial.

##### index.css
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F4F5F9;
  overflow: visible;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```
##### app.css
```css
.dualpanel{
    /* width: 30vw; */
    margin-left: 1vw;
    margin-right: 1vw;
    margin-bottom: 1vw;
}

.buttons{
    margin-right: 10px;
    background: #e1e4ea;
    border: none;
    border-radius: 15%;
    width: 5em;
    outline: none;
    cursor: pointer;
    font-size: 1.15em;
}

.buttons:active{
    background-color: aliceblue;
    border: none;
}
.clicked {
    background-color: rgb(241, 248, 248);
}
```

Create a new folder called css inside the components directory. Include the following two files there.

##### Email.css
```css
span {
  font-weight: lighter;
}
button {
  background: transparent;
  outline: none;
  border: none;
}
.outline {
  border: 2px solid #e54065;
  border-radius: 5%;
  outline: #e54065;
}
.nooutline {
  outline: none;
}
.subject {
  font-weight: bold;
}
.card {
  color: #636363;
  background-color: white;
  border: 0 10px 3px rgba(0, 0, 10, 0.5);
  padding-left: 5em;
  margin-bottom: 10px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 10, 0.1);
  margin-right: 5px;
  border-radius: 1%;
}
.card:active {
  outline: #e54065;
}
.cardnocolor {
  color: #636363;
  background-color: #eeeded;
  border: 0 10px 3px rgba(0, 0, 10, 0.5);
  padding-left: 5em;
  margin-bottom: 10px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 10, 0.1);
  margin-right: 5px;
  border-radius: 1%;
}
.cardnocolor:active {
  outline: #e54065;
}

.avatar {
  background-color: #e54065;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  color: white;
  text-transform: capitalize;
  margin-top: 30px;
}

```

##### EmailBody.css

```css
.upperbody {
  background-color: #ffffff;
  margin-left: 2vw;
  width: 59vw;
  height: fit-content;
  text-align: justify;
  color: #636363;
  border-radius: 1%;
  border: 1px solid black;
}
.body {
  margin-top: 2em;
  background-color: #ffffff;
  margin-left: 1vw;
  width: 59vw;
  height: fit-content;
  text-align: justify;
  margin-right: 2vw;
  color: #636363;
}

.avatar {
  background-color: #e54065;
  border-radius: 50%;
  width: 35px;
  height: 45px;
  /* color:#F4F5F9;  */
  color: white;
  text-transform: capitalize;
  /* padding-left: .1em; */
  margin-right: 15px;
  margin-top: 30px;
}
```

### Adding Filtering Functionality

We filter the emails on the basis of whether it has been read, unread, marked as favorite. Additionally, search is also a filter operation.

Let us maintain a few state variables for identifying the current operation.
The state variables are:
1. filteredBySearch
2. filteredByFav
3. filteredByRead
4. filteredByUnread

Add the following functionality into the codebase:

```javascript
import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox'
import EmailList from './components/EmailList'
import EmailBody from './components/EmailBody'
import Scroll from './components/Scroll'

class App extends Component {
  constructor() {
    super()
    this.state = {
      email: [],
      body: ' ',
      currentId: 0,
      currentDate: ' ',
      currentSender: ' ',
      currentSubject: ' ',
      dualPanel: false,
      fav: [],
      filteredByFav: false,
      filteredByRead: false,
      filteredBySearch: false,
      filteredByUnread: false,
      noFilter: true,
      read: [],
      searchField: ' '
    }
  }

  processDate = date => {
    let formattedDate = new Date(date);
    const mnth = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
    const day = ("0" + formattedDate.getDate()).slice(-2)
    const hours = ("0" + formattedDate.getHours()).slice(-2)
    const minutes = ("0" + formattedDate.getMinutes()).slice(-2)
    const displayTime = [hours - 12, minutes].join(":")
    const displayDate = [day, mnth, formattedDate.getFullYear()].join("-")
    return [displayDate, ' ', displayTime, ' ', hours > 12 ? 'pm' : 'am'];
  }

  onSearchChange = (event) => {
    this.setState({
      searchField: event.target.value,
      filteredBySearch: true,
      filteredByFav: false,
      filteredByRead: false,
      filteredByUnread: false,
      noFilter: true
    })
  }

  setDualPanel = () => {
    this.setState({ dualPanel: true })
  }

  resetDualPanel = () => {
    this.setState({ dualPanel: false })
  }

  findEmailId = (id) => {
    fetch(`http://localhost:3000/emailbody?id=${id}`)
      .then(data => data.json())
      .then(data => this.setState({ body: data[0]["body"] }))
      .catch(err => console.log(err))

    this.setState({
      currentDate: this.processDate(this.state.email[id - 1].date),
      currentSubject: this.state.email[id - 1].subject,
      currentSender: this.state.email[id - 1].from.name,
      currentId: id - 1
    })

    if (!this.state.read.includes(parseInt(id - 1))) {
      this.setState({
        read: [...this.state.read, parseInt(id - 1)]
      })
    }
  }

  markAsFav = () => {
    if (!this.state.fav.includes(parseInt(this.state.currentId))) {
      this.setState({
        fav: [...this.state.fav, parseInt(this.state.currentId)]
      })
    }
  }

  setFilterByRead = () => {
    this.setState({
      filteredByRead: !this.state.filteredByRead,
      filteredByFav: false,
      filteredByUnread: false,
      filteredBySearch: false
    })
  }

  setFilterByUnread = () => {
    this.setState({
      filteredByUnread: !this.state.filteredByUnread,
      filteredByFav: false,
      filteredBySearch: false,
      filteredByRead: false
    })
  }

  setFilterByFav = () => {
    this.setState({
      filteredByFav: !this.state.filteredByFav,
      filteredByRead: false,
      filteredByUnread: false,
      filteredBySearch: false
    })
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/lalith1403/jsonemaillist/db')
      .then(data => data.json())
      .then(email => this.setState({ email: email["list"] }))
      .catch(err => console.log(err))
  }

  render() {
    const { email, searchField } = this.state;
    // filter emails using the short_description.
    const filterEmails = email.filter(emails => {
      return emails.short_description.toLowerCase().includes(searchField.toLowerCase())
    })
    // filter read emails
    const filterByRead = email.filter(item => {
      return this.state.read.includes(parseInt(item.id - 1))
    })
    // filter unread emails
    const filterByUnread = email.filter(item => {
      return !this.state.read.includes(parseInt(item.id - 1))
    })
    // filter favourite emails
    const filterByFav = email.filter(item => {
      return this.state.fav.includes(parseInt(item.id - 1))
    })

    if (!email.length) {
      return !this.state.dualPanel &&
        <h1 >
          Loading
          </h1>
    }

    else {
      return (<div className='dualpanel'>
        <div style={{ display: "flex", flexDirection: "row", marginBottom: "50px", marginTop: "15px" }}>
          <button className={'buttons'} style={{ cursor: "default", background: 'transparent', fontWeight: "bold" }}>FilterBy</button>
          {/* // onclick show the read emails */}
          <button className={!this.state.filteredByRead ? 'buttons clicked' : 'buttons'} onClick={this.setFilterByRead}>read</button>
          {/* // onclick show the unread emails */}
          <button className={!this.state.filteredByUnread ? 'buttons clicked' : 'buttons'} onClick={this.setFilterByUnread}>Unread</button>
          {/* // onclick show the favourite emails */}
          <button className={!this.state.filteredByFav ? 'buttons clicked' : 'buttons'} onClick={this.setFilterByFav}>Favourite</button>

          {this.state.dualPanel &&
            <button style={{ cursor: "pointer", background: "#e54065", border: "1px solid black", width: "80px", outline: "none" }}
              onClick={this.resetDualPanel}>Back</button>}
          <hr style={{ color: "white", height: '0px', backgroundColor: "transparent" }} />

          {/* // onchange show the emails that contain the keyword in their short description. */}
          <SearchBox searchChange={this.onSearchChange} />
        </div>

        <div onClick={this.setDualPanel} style={this.state.dualPanel ? { display: "flex", flexDirection: "row" } : {}}>
          {!filterEmails.length &&
            <div style={{ marginRight: "10em", fontSize: "2em" }}>
              No Emails Found
                </div>
          }
          {/* // if filteredByRead, send filterByRead as email prop */}
          {this.state.filteredByRead && <Scroll>
            <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterByRead} onClick={this.findEmailId} />
          </Scroll>}
          {/* // if filteredByUnread, send filterByUnread as email prop */}
          {this.state.filteredByUnread && <Scroll>
            <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterByUnread} onClick={this.findEmailId} />
          </Scroll>}

          {/* // if filteredByFav, send filterByFav as email prop */}
          {this.state.filteredByFav && <Scroll>
            <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterByFav} onClick={this.findEmailId} />
          </Scroll>}

          {/* // if filteredBySearch, send filterEmails as email prop */}
          {this.state.filteredBySearch && <Scroll>
            <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterEmails} onClick={this.findEmailId} />
          </Scroll>}
          {/* // default option, if no operation is specified */}
          {!this.state.filteredByFav && !this.state.filteredByRead && !this.state.filteredByUnread && !this.state.filteredBySearch && this.state.noFilter && <Scroll>
            <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterEmails} onClick={this.findEmailId} />
          </Scroll>}

          {this.state.dualPanel
            &&
            filterEmails.length !== 0 &&
            <EmailBody
              markAsFav={this.markAsFav}
              currentSender={this.state.currentSender}
              currentSubject={this.state.currentSubject}
              currentDate={this.state.currentDate}
              currentId={this.state.currentId}
              body={this.state.body} />}
        </div>
      </div>)
    }
  }
}

export default App;
```

### Session Persistence

Try reloading the above web page. You will observe that all the read emails and favorited emails are reset. Every email is unread. Therefore, we need to store the state in the local storage. `localstorage` is a finite amount of memory provided by the browser. Therefore, we need to be cautious when using localstorage.

To save the state in the local storage, add the following functions:

```javascript
hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);

            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
            }
          }
        }
      }
```

```javascript
saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
          // save to localStorage
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
      }
```

We need to update the `componentDidMount` lifecycle method and add `componentWillUnmount` to store the state upon exit.

```javascript
      componentDidMount() {
        this.hydrateStateWithLocalStorage();
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );

        fetch('https://my-json-server.typicode.com/lalith1403/jsonemaillist/db')
          .then(data => data.json())
          .then(email => this.setState({ email: email["list"] }))
          .catch(err => console.log(err))
      }
      // when the component is unmounted, try saving
      componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );

     // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
      }
```

##### App.js

The final `App.js` file is given below.

```jsx
    import React, { Component } from 'react';
    import './App.css';
    import SearchBox from './components/SearchBox'
    import EmailList from './components/EmailList'
    import EmailBody from './components/EmailBody'
    import Scroll from './components/Scroll'

    class App extends Component {
      constructor() {
        super()
        this.state = {
          email: [],
          body: ' ',
          currentId: 0,
          currentDate: ' ',
          currentSender: ' ',
          currentSubject: ' ',
          dualPanel: false,
          fav: [],
          filteredByFav: false,
          filteredByRead: false,
          filteredBySearch: false,
          filteredByUnread: false,
          noFilter: true,
          read: [],
          searchField: ' '
        }
      }

      processDate = date => {
        let formattedDate = new Date(date);
        const mnth = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
        const day = ("0" + formattedDate.getDate()).slice(-2)
        const hours = ("0" + formattedDate.getHours()).slice(-2)
        const minutes = ("0" + formattedDate.getMinutes()).slice(-2)
        const displayTime = [hours - 12, minutes].join(":")
        const displayDate = [day, mnth, formattedDate.getFullYear()].join("-")
        return [displayDate, ' ', displayTime, ' ', hours > 12 ? 'pm' : 'am'];
      }

      onSearchChange = (event) => {
        this.setState({
          searchField: event.target.value,
          filteredBySearch: true,
          filteredByFav: false,
          filteredByRead: false,
          filteredByUnread: false,
          noFilter: true
        })
      }

      setDualPanel = () => {
        this.setState({ dualPanel: true })
      }

      resetDualPanel = () => {
        this.setState({ dualPanel: false })
      }

      findEmailId = (id) => {
        fetch(`http://localhost:3000/emailbody?id=${id}`)
          .then(data => data.json())
          .then(data => this.setState({ body: data[0]["body"] }))
          .catch(err => console.log(err))

        this.setState({
          currentDate: this.processDate(this.state.email[id - 1].date),
          currentSubject: this.state.email[id - 1].subject,
          currentSender: this.state.email[id - 1].from.name,
          currentId: id - 1
        })

        if (!this.state.read.includes(parseInt(id - 1))) {
          this.setState({
            read: [...this.state.read, parseInt(id - 1)]
          })
        }
      }

      markAsFav = () => {
        if (!this.state.fav.includes(parseInt(this.state.currentId))) {
          this.setState({
            fav: [...this.state.fav, parseInt(this.state.currentId)]
          })
        }
      }

      hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);

            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
            }
          }
        }
      }

      setFilterByRead = () => {
        this.setState({
          filteredByRead: !this.state.filteredByRead,
          filteredByFav: false,
          filteredByUnread: false,
          filteredBySearch: false
        })
      }

      setFilterByUnread = () => {
        this.setState({
          filteredByUnread: !this.state.filteredByUnread,
          filteredByFav: false,
          filteredBySearch: false,
          filteredByRead: false
        })
      }

      setFilterByFav = () => {
        this.setState({
          filteredByFav: !this.state.filteredByFav,
          filteredByRead: false,
          filteredByUnread: false,
          filteredBySearch: false
        })
      }

      saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
          // save to localStorage
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
      }

      componentDidMount() {
        this.hydrateStateWithLocalStorage();
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );

        fetch('https://my-json-server.typicode.com/lalith1403/jsonemaillist/db')
          .then(data => data.json())
          .then(email => this.setState({ email: email["list"] }))
          .catch(err => console.log(err))
      }

      componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
      }

      render() {
        const { email, searchField } = this.state;

        const filterEmails = email.filter(emails => {
          return emails.short_description.toLowerCase().includes(searchField.toLowerCase())
        })

        const filterByRead = email.filter(item => {
          return this.state.read.includes(parseInt(item.id - 1))
        })

        const filterByUnread = email.filter(item => {
          return !this.state.read.includes(parseInt(item.id - 1))
        })

        const filterByFav = email.filter(item => {
          return this.state.fav.includes(parseInt(item.id - 1))
        })

        if (!email.length) {
          return !this.state.dualPanel &&
            <h1 >
              Loading
          </h1>
        }

        else {
          return (<div className='dualpanel'>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: "50px", marginTop: "15px" }}>
              <button className={'buttons'} style={{ cursor: "default", background: 'transparent', fontWeight: "bold" }}>FilterBy</button>
              <button className={!this.state.filteredByRead ? 'buttons clicked' : 'buttons'} onClick={this.setFilterByRead}>read</button>
              <button className={!this.state.filteredByUnread ? 'buttons clicked' : 'buttons'} onClick={this.setFilterByUnread}>Unread</button>
              <button className={!this.state.filteredByFav ? 'buttons clicked' : 'buttons'} onClick={this.setFilterByFav}>Favourite</button>

              {this.state.dualPanel &&
                <button style={{ cursor: "pointer", background: "#e54065", border: "1px solid black", width: "80px", outline: "none" }}
                  onClick={this.resetDualPanel}>Back</button>}
              <hr style={{ color: "white", height: '0px', backgroundColor: "transparent" }} />

              <SearchBox searchChange={this.onSearchChange} />
            </div>

            <div onClick={this.setDualPanel} style={this.state.dualPanel ? { display: "flex", flexDirection: "row" } : {}}>
              {!filterEmails.length &&
                <div style={{ marginRight: "10em", fontSize: "2em" }}>
                  No Emails Found
                </div>
              }

              {this.state.filteredByRead && <Scroll>
                <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterByRead} onClick={this.findEmailId} />
              </Scroll>}

              {this.state.filteredByUnread && <Scroll>
                <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterByUnread} onClick={this.findEmailId} />
              </Scroll>}

              {this.state.filteredByFav && <Scroll>
                <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterByFav} onClick={this.findEmailId} />
              </Scroll>}

              {this.state.filteredBySearch && <Scroll>
                <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterEmails} onClick={this.findEmailId} />
              </Scroll>}

              {!this.state.filteredByFav && !this.state.filteredByRead && !this.state.filteredByUnread && !this.state.filteredBySearch && this.state.noFilter && <Scroll>
                <EmailList currentCard={this.state.currentId} markfav={this.state.fav} read={this.state.read} email={filterEmails} onClick={this.findEmailId} />
              </Scroll>}

              {this.state.dualPanel
                &&
                filterEmails.length !== 0 &&
                <EmailBody
                  markAsFav={this.markAsFav}
                  currentSender={this.state.currentSender}
                  currentSubject={this.state.currentSubject}
                  currentDate={this.state.currentDate}
                  currentId={this.state.currentId}
                  body={this.state.body} />}
            </div>
          </div>)
        }
      }
    }

    export default App;

```

### Conclusion
This marks the end of the very long article. We have built a beautiful, yet simple interface. In the next article, we will optimize the entire project using React Hooks and will use styled-components for styling.
