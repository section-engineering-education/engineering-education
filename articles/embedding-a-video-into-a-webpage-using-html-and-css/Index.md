Video embedding has become a popular aspect of web development. With recent advancements in the tech industry, developers can embed videos into various web pages. HTML and CSS have emerged as some of the popular tools for embedding videos. These languages go hand in hand as a package (alongside JavaScript) to support various aspects of web development.

This article provides a guide on how to embed a video into a webpage using HTML and CSS. It also highlights the benefits of video embedding and provides useful tips relating to this phenomenon. 

### Table of Contents
- What is embedding?
- What are HTML and CSS?
- Why use HTML and why not HTML5?
- Benefits of Embedding a Video into your Webpage?
- Prerequisites
- Side Notes on Embedding Using Iframe and URL
- Steps to Embed a YouTube Video into your Website.
- Important Tips
- Conclusion

### What is embedding?
Embedding has various terminologies depending on the context being used. Embedding means to attach or insert an object. In the fields of computing and software, embedding refers to attaching a computer hardware component into a computer software component to execute a highly tailored task.

Embedding can also be referred to as incorporating videos, images, GIFs, links or other social media contents into web pages or other social media posts. Embedding allows you to lend a video from a different platform into another without worrying about compatibility issues like dissimilar software versions or formats.

Video embedding is an action of coding that allows you to borrow and display a video on your website without pulling it from its original source.

### What are HTML and CSS? 
HTML is an abbreviation for Hypertext Markup Language. It is a language used for structuring a web page. It supports various aspects of a web page structure such as the header and body. 

CSS is an abbreviation for Cascading Styling Sheets. It is used for styling a HTML web page. CSS makes a web page look presentable through various functionalities such as colors, fonts and spacing.

Both HTML and CSS work hand in hand when creating a web page. One does not need to acquire a lot of skills to know the way around them. Technically, they are both not regarded as programming languages like JavaScript, Python, and the rest, but are found in the front-end coding.

### Why use HTML and why not HTML5?
HTML is an older version of HTML5. It can support almost all the browsers and it is easier to embed a YouTube by using the iframe tag.

HTML5 uses ``` <video>```  tag and it does not support all the browsers and this can cause a lot of hassle in adding multiple sources to support different formats. 

Iframe is an inline frame and permits items to be embedded in one webpage into another webpage and in this case, it is a YouTube page. By using iframe, you do not have to worry about the file format compatibility issues.

### Benefits of embedding a video into your webpage
- It fastens the load time on your website.
- It allows you to choose from various services for video hosting.
- It increases engagement with social media posts.
- The user can play the video without having to leave their website.

### Embedding a video into a webpage using HTML and CSS

#### Prerequisites
You will need the following prerequisites to embed a video:
- Computer
- Internet
- Google account (To access YouTube)
- Install a Notebook that supports HTML (The one used here is called Sublime Text) 
- Coding skills (Basic knowledge about HTML and CSS)
- Browser 

#### Side Notes on Embedding Using Iframe and URL
- When embedding videos from a website, you can either use the video URL, Iframe or Embed the code itself. In this tutorial, we are going to use the Iframe and URL.
- We are going to use YouTube, the famous video platform. It is not only limited    to videos on YouTube, but you can also basically use any social media platform that supports videos like Animoto, Facebook, Flickr, TED, Vimeo, Vine
- Choose the video that you would like to embed. Copy, and paste its URL.
- URL stands for Uniform Resource Locator. It specifies the exact location of a content on a computer network.

#### Steps to Embed a YouTube Video into your Website.
**Step 1:** Open the YouTube page and search for the video that you would want to embed. 

**Step 2:** Click on the video to play it.

**Step 3:** Click on the share button. While the video plays, you will see a 'share' button below the video. When you click on it, you will find a few sharing options, including various social media platforms.

![step 3](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-3.jpg)

**Step 4:** Click on the icon “Embed” as shown in the image below.

 ![step 4](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-4.jpg)

After clicking on 'Embed', YouTube will automatically generate a code for you to use. The iframe tag will have the URL of the video source, width, and height of the video, and other attributes.

**Step 5:** Click on 'copy'. 
As shown in the image below, click on 'copy' and paste the code in your HTML page. 

 ![step5](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-5.jpg)                         

In our case, the code/iframe tag looks like this:

```html
<!DOCTYPE html>
<html>
<head>
<title>Put your preferred title</title>
<style>

body{ background-color: purple;
background-text: white;}

</style>
</head>
<body>

<h1>EMBEDDING A VIDEO</h1>

<iframe width="560" height="315" src="https://www.youtube.com/embed/t4vKPhjcMZg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</body>
</html>
```

**Step 6:** Open your HTML page.

Locate your HTML page, where you want to paste the iframe tag. 

**Step 7:** Type or paste the iframe tag you copied from YouTube into your HTML page.

![step 7](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-7.jpg)

**Step 8:** Save the changes you made on your HTML page. 
After saving, while you are still on your HTML page, right click and select “Open in Browser”. Your HMTL code will run in your browser.

![step 8](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-8.jpg)

**Step 9:** Your Browser’s output.

Depending on your HTML code (or how you have styled it), you can place the iframe tag anywhere you want within your HTML page. After you have successfully embedded a video in your webpage, you can actively interact with it. This means you can forward, rewind, play, pause, and adjust the volume of the video. You can also click on the YouTube icon in the embedded page to play the video directly on YouTube. All these activities are called **video controls**.

![step 9](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-9.jpg)

**Step 10:** Enjoy your view.
As mentioned earlier, CSS is used for styling your webpage. The above screenshot contains a brownish red background while the screenshot below contains a purple background. You can play with the HTML and CSS skills to suit your preferences.

 ![step 10](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-10.jpg)

### Important Tips
- Avoid hyperlinked video: The Video's URL should be on its own without any characters or spaces otherwise it will not embed.
- A hyperlink is a highlight done to a link such that when it is clicked or hovered, the browser automatically displays another page or changes the current page to show the referenced content. 
- You can also embed images and other contents into a post or page as long as the item you want to embed has its own URL.
- If the video you want to embed is not your own creation, it is prudent to ask permission from the owner to avoid copyright infringement.

### Conclusion 
Along with knowing how to embed a video using HTML and CSS, we have learned the reasons behind using iframe tag and URL rather than ``` <video>```  tag in HTML5.

To summarize:

- We have understood the concept of video embedding.
- We have gained an overview of HTML, CSS, and Iframe.
- We have known things we should avoid when embedding videos.
- We have learned how to embed videos.
- We have learned important tips that we should know or consider before embedding videos.



Happy coding!
