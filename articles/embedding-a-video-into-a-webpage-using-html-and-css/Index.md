Embedding is the term that is going to be used to mean attach/insert/implant etc. Embedding a video using HTML and CSS is one out of an enormous ways HTML and CSS can be utilized in a web design/development. HTML and CSS goes hand in hand as a package for frontend web development and along with JavaScript(although JavaScript will not be discussed in this tutorial), they are used for backend web development. 

This article will show and explain how to attach videos from one web page to another. 

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
Embedding has various terminologies depending on a context is being used. In plain English, embedding is to implant, attach or insert an object. In computing and in software, embedding is to attach a computer hardware component into a computer software component to execute a highly tailored task. 

In this tutorial, Embedding will be referred to as incorporating videos, images, GIFs, links, or other social media contents like Electronic books (pdf or html files), tweets, Scribd etc. into web pages or any other social media posts. Embedding allows you to lend a video from a different platform into another without to worry about any compatibility issues like dissimilar software versions or formats. 

Video embedding is an action of coding that allows you to borrow and display a video on your website without pulling it from its original source or to host it on your website.

### What are HTML and CSS? 
HTML is an abbreviation for Hypertext Markup Language that is used for structuring a web page like putting headers, titles, creating body etc. CSS is an abbreviation for Cascading Styling Sheets that is utilized for styling a HTML web page. CSS is basically used to make a web page look presentable like putting colors, fonts, spacing etc.

Both HTML and CSS work hand in hand when creating a web page, it does not require one to acquire a lot of skills to know the way around it. Technically, they are both not regarded as a programming language like JavaScript, python, and the rest but it is found in the front-end coding.

### Why use HTML and why not HTML5?
HTML is an older version of HTML5 and can support almost all user’s browser and unlike HTML5 there can be a lot of hassle in adding multiple sources to support different formats. Additionally, it is easier to embed YouTube videos in HTML by using iframe instead of ``` <video>```  tags in HTML5.

Iframe is an inline frame and permits items to be embedded in one webpage into another webpage and in this case, it is a YouTube page. By using iframe, you do not have to worry about the file format compatibility issues.

### Benefits of embedding a video into your webpage
- It fastens the load time on your website, and it allows you to choose from various services for video hosting.
- It increases the engagement with social media posts.
- Under one click/page, the videos can be played without the users/you having to leave your website/newsfeed.

### Embedding a video into a webpage using HTML and CSS

#### Prerequisites
You will need the following prerequisites to embed a video:
- Computer
- Internet
- Google account (To access YouTube)
- Install a Notebook that supports HTML (The one used here is called SUBLIME TEXT) 
- Coding skills (Basic knowledge about HTML and CSS)
- Browser 

#### Side Notes on Embedding Using Iframe and URL
- When embedding videos from any sharing websites, you can either use the video URL, Iframe or Embed the code itself. For this tutorial, we are going to use the Iframe and URL.
- We are going to use YouTube, the famous video platform. It is not only limited to videos on YouTube, but you can also basically use any social media platform that supports videos like Animoto, Facebook, Flickr, TED, Vimeo, Vine
- Choose the video that you would like to embed, copy, and paste its URL.
- URL stands for Uniform Resource Locator; it specifies the exact location of a content on a computer network.

#### Steps to Embed a YouTube Video into your Website.
**Step 1:** Open the YouTube page, search for the video that you would want to embed. 

**Step 2:** Click on the video to play it.

**Step 3:** Click on the share button. While the video plays, below the video you will see a share button. As you click it, you will find a few sharing options, including various social media platforms. 

![step 3](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-3.jpg)

**Step 4:** Click on the Embed on the very first icon “Embed” as shown in the image below.

 ![step 4](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-4.jpg)

After clicking on Embed, YouTube will generate a code for you to use, automatically. The iframe tag will have the URL of the video source, width, and height of the video and a few more attributes.

**Step 5:** Click on the copy. 
As shown in the figure below, click on the copy and paste the code in your HTML page(assuming you have the HTML page/code already but if not, do not worry, the steps will be shown afterwards 😊).

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

**Step 7:** Type or paste the iframe tag into your HTML page that you copied from YouTube. Below is a sample of a simple HTML page used for demonstration. 

![step 7](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-7.jpg)

**Step 8:** Save the changes you made on your HTML page. 
After saving, while you are still on your HTML page, right click and select “Open in Browser”. By clicking on Open in Browser, your HMTL code will run in your browser.

![step 8](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-8.jpg)

**Step 9:** Your Browser’s output.
Depending on your HTML code(on how you have styled it), you can place the iframe tag anywhere you want within your HTML page. After you have successfully embedded a video in your webpage, you can actively interact with it meaning, you can fast forward and rewind it, play and pause, increase, and decrease the volume or even mute, click on YouTube icon in the embedded page to play the video directly on YouTube etc. All those activities are called video controls.

![step 9](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-9.jpg)

**Step 10:** Enjoy your view.
As mentioned earlier, CSS is basically for styling your webpage. Like the above screenshot contains a brown-ish/red-ish background and the screenshot below contains a purple background. You can play with the HTML and CSS skills to suit your preferences.
 
 ![step 10](/engineering-education/embedding-a-video-into-a-webpage-using-html-and-css/step-10.jpg)

### Important Tips
- Avoid hyperlinked videos: The URL’s Video should be on its own without any characters or spaces before or after the URL and should not be a hyperlinked or it will not be embedded. What is hyperlink? is a highlight done to a link such that when it is clicked or hovered, the browser automatically displays another page or changes the current page to show the referenced content. 
- You can embed images and other contents as well into a post or page as long as the item you want to embed has its own URL.
- Due to copyrights, if the video you want to embed is not your own creation, it is prudent to ask permission from the owner.

### Conclusion 
Along with knowing how to embed a video using HTML and CSS, we have learned the reasons behind using iframe tag and URL rather than ``` <video>```  tag in HTML5.

To summarize:
- We have gained the knowledge on how to embed videos.
- we have gained the knowledge on how to also embed other items like images using the same steps.
- We have learned the benefits of embedding a video into a web page.
- We now know what HTML, CSS, URL, IFRAME are.
- We have learnt the things we should avoid while embedding, such as hyperlinks.
- We have learned that there are other social media platforms that supports videos apart from YouTube.
- We have learnt the important tips that we should know or take before embedding other creator’s content into a different webpage.
- We have learnt the tools to bag for a successful embedding.

Happy coding!
