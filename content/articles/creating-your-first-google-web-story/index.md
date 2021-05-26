---
layout: engineering-education
status: publish
published: true
url: /creating-your-first-google-web-story/
title: How to Create your First Google Web Story
description: This article will provide a step by step guide on how to create a Google Web Story. These stories can be created using drag and drop tools or through coding.
author: jethro-magaji
date: 2021-05-19T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/creating-your-first-google-web-story/hero.jpg
    alt: Creating your first Google Web Story
---
In October 2013, Snapchat introduced a new feature on its app called Stories which allowed users to create short consumable content that is displayed for 24 hours. 
<!--more-->
Since then the feature gained popularity amongst Snapchat users and led to its adoption by other social apps like Instagram, Facebook, YouTube, WhatsApp, and Twitter.

Introduced in 2018 as [AMP](https://amp.dev/) (Accelerated Mobile Pages) story, Google Web Story is owned by Google and powered by AMP technology. AMP (Accelerated Mobile Pages) is an open-source HTML platform designed for mobile web browsers to load web pages faster. 

### Table of contents
- [What is a Web Story?](#what-is-a-web-story)
- [Prerequisites](#prerequisites)
- [What differentiates a Web Story?](#what-differentiates-a-web-story)
- [Creating a Web Story](#creating-a-web-story)
- [Using NoCode](#using-nocode)
- [Using Code](#using-code)
- [How to make your Web Story visible on the Web](#how-to-make-your-web-story-visible-on-the-web)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### What is a web story?
> This is a web-based version of the popular "Stories" format that uses images, audio, videos, texts, and animations to create an engaging short consumable experience.

The `web` prefix signifies the content is visible to everyone on the internet and it is also short-lived or everpresent, depending on how the owner wants it to last.

### Prerequisites
To get started with Web Stories you'll need some basic knowledge of HTML, CSS, and JavaScript, a code editor to write the code, and a web browser to preview the code.

### What differentiates a web story?
Compared to conventional social app stories, web stories are similar in terms of the overall consistent user experience of tapping back and forth to view the previous and next stories. But some things that differentiate Web stories from social app stories include:

#### Control
Contrary to social apps, Web stories give you more control of how long the story will be on the web and not having to worry that your beautifully crafted story will expire after 24 hours. 

The publisher hosts web stories, which means the content, the copyright, and rules depend on the publisher's terms of choice.

#### Earn money
In almost all social app stories, creators don't earn when a story has an ad, but this is different for web stories. Creators can earn money for ads on the story pages, as well as brand deals, native advertising, and so on.

#### Accessibility
Since web stories live on the web, they don't just live in a single app but can be accessed anywhere. Technically web stories are web pages under the hood, which makes them get indexed by search engines.

### Creating a web story
Creating a web story is flexible depending on your needs and expertise. To create a story with custom functionalities, developers can use code, while persons with no coding experience can use NoCode drag-and-drop tools to create Web Stories.

### Using NoCode
There are drag-and-drop tools like [MakeStories](https://makestories.io/), [Web Stories for WordPress](https://wordpress.org/plugins/web-stories/), [Newsroom AI](https://www.nws.ai/), and [more](https://amp.dev/documentation/tools/?format=stories) that are used to create a story and can then be embed it into a website. 

For the sake of this article, the `MakeStories editor` is going to be used.

![MakeStories website](engineering-education/creating-your-first-google-web-story/makestories.png)

Login or Sign-up on MakeStories [here](https://makestories.io/).

After logging or signing up, create a story by clicking on `CREATE NEW STORY`.

![MakeStories dashboard](engineering-education/creating-your-first-google-web-story/makestories2.png)

Fill in the details for the story that would be created.

![MakeStories dashboard](engineering-education/creating-your-first-google-web-story/makestories1.png)

The studio should look like this:

![MakeStories dashboard](engineering-education/creating-your-first-google-web-story/makestories3.png)

Pick any of these: Color, Gradient, Texture, Image, Video, GIFs, Overlay, Animation, and add it to the slide.

![MakeStories dashboard](engineering-education/creating-your-first-google-web-story/makestories5.png)

Add text to the slide by clicking on the “T” icon and dragging any typography or font combination.

![MakeStories dashboard](engineering-education/creating-your-first-google-web-story/makestories8.png)

Next, add a new slide by clicking on the plus `+` icon below the slide. Then add a `background image` to fill the slide.

![MakeStories dashboard](engineering-education/creating-your-first-google-web-story/makestories6.png)

After editing the story, then publish it by clicking the `PUBLISH` button and `publish it as a Web Story`.

![MakeStories dashboard](engineering-education/creating-your-first-google-web-story/makestories7.png)

#### Using code
Developers can create customized Web Stories to suit their needs. Creating Web Stories with code requires one to use the AMP HTML library. 

Check out the [documentation](https://amp.dev/documentation/components/?format=stories) on `amp-story` component for a guide on how to create a Web Story using the library.

Let's create a Hello World AMP Story application using the `amp-story` extension.

Open a code editor of your choice and create an `index.html` file

Import the `amp-story` script in the header.

```html
<!-- amp-story script tag --> 
<script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
```

To allow AMP Stories to make use of video the `amp-video` extension needs to be added to the header.

```html
<!-- amp-video script tag --> 
<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
```

With CSS, we can style stories using the `style amp-custom` component.

```css
/* styling for amp-story and amp-story-page component */
<style amp-custom>
  amp-story {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI ", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji ", "Segoe UI Emoji ", "Segoe UI Symbol ";
  }
  amp-story-page * {
    color: white;
    text-align: center;
  }
  [template=thirds] {
    padding: 0;
  }
</style>
```

The `amp-story` tag contains the `amp-story-page` tags, which display stories. The story level also contains important metadata like `title`, `publisher`, `publisher-logo`, `publisher-portrait`, and their `corresponding attributes`.

```html
<!-- amp-story metadata --> 
<amp-story standalone
  title="Stories in AMP - Hello World"
  publisher="AMP Project"
  publisher-logo-src="https://amp.dev/favicons/coast-228x228.png"
  poster-portrait-src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg"
  poster-square-src="https://amp.dev/static/samples/img/story_dog2_square.jpg"
  poster-landscape-src="https://amp.dev/static/samples/img/story_dog2_landscape.jpg">
```

![Web Story](engineering-education/creating-your-first-google-web-story/webstories1.png)

```html
<!-- story first page with an image and text --> 
<amp-story-page id="page-1">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://amp.dev/static/samples/img/story_dog2.jpg"
             width="720" height="1280"
             layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>Hello World</h1>
    <p>This is an AMP Story.</p>
  </amp-story-grid-layer>
</amp-story-page>
```

This code contains the first page of the story with 2 grid layers of an image and text.

![Web Story](engineering-education/creating-your-first-google-web-story/webstories2.png)

```html
<!-- story second page with a video --> 
<amp-story-page id="page-2">
  <amp-story-grid-layer template="fill">
    <amp-video autoplay loop
          width="720"
          height="960"
          poster="https://amp.dev/static/samples/img/story_video_dog_cover.jpg"
          layout="responsive">
          <source src="https://amp.dev/static/samples/video/story_video_dog.mp4" type="video/mp4">
    </amp-video>
  </amp-story-grid-layer>
</amp-story-page>
```

This code contains the second page of the story with a grid layer of a video.

![Web Story](engineering-education/creating-your-first-google-web-story/webstories3.png)

```html
<!-- story third page with an animation --> 
<amp-story-page id="animation-demo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://amp.dev/static/samples/img/story_dog4.jpg"
             animate-in="fly-in-top"
             width="720" height="1280"
             layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <h2 animate-in="fly-in-bottom"
        grid-area="lower-third"
        animate-in-delay="0.4s">
      Best walk ever!
    </h2>
  </amp-story-grid-layer>
</amp-story-page>
```

This is the third page of the story with 2 grid layers of a video and animating text.

![Web Story](engineering-education/creating-your-first-google-web-story/webstories4.png)

```html
<!-- story fourth page with an image grid --> 
<amp-story-page id="layout-demo">
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="upper-third"
             src="https://amp.dev/static/samples/img/story_thirds_1.jpg"
             width="560" height="420"
                         layout="responsive">
    </amp-img>
    <amp-img grid-area="middle-third"
             src="https://amp.dev/static/samples/img/story_thirds_2.jpg"
             width="560" height="420"
                         layout="responsive">
    </amp-img>
    <amp-img grid-area="lower-third"
             src="https://amp.dev/static/samples/img/story_thirds_3.jpg"
             width="560"
             height="420"
             layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

The last story page of the story contains 2 grid areas of images arranged vertically.

```html
<!-- amp-story bookend --> 
<amp-story-bookend src="https://amp.dev/static/samples/json/bookend.json" layout="nodisplay">
</amp-story-bookend>
```

The bookend contains links to other resources for the story such as social media links, news posts, or affiliate links. 

Check out the full code on [GitHub](https://github.com/Jethro-magaji/Web-Story-Hello-World) and [Live story](https://web-story-hello-world.stackblitz.io/)

### How to make your web story visible on the web
When a web story is published, it appears across Google in the following formats; on `Google discover` as a `carousel`, as a `grid view` on `Google Search`, and as an `image card` on `Google images`. 

If you want your stories to be indexed by search engines, you will need to work on your stories' `SEO` (search engine optimization).

However, to improve the quality and quantity of traffic to your story, you will need to consider the following:

#### Metadata
It's very important to ensure that the following metadata; `publisher`, `publisher logo`, `portrait poster`, and `title` are available for your Web stories so that search engines can index them to show the story on `Google Discover`.

#### Linking to stories
It's recommended to integrate stories into your website, by linking them to other pages on your website.

#### URL format
When setting the URL for your story, there's no need to specify that it's a story, for example,
`website.com/stories/story.html`. Rather, consider using the same directory structure of your website and URL format for your stories. 
Like this `website.com/article/new-article.html`.

#### Image and video description
It's best practice and recommended to add meaningful `alt text`, where appropriate, to optimize for accessibility and indexability of your content, and since `videos` don't support `alt text`, it's good to use the `title` attribute to describe the video.

#### Video captions
Using captions in videos is important because they automatically show in web stories, making them usable even when the sound is off. They also make stories accessible to those that can't hear the spoken words in the video and help with search engine indexing.

#### Content
When creating Web Stories, it’s important to provide very good quality content that is important and interesting to your users.Like any web page creating high-quality content is an important part of any SEO strategy.

### Conclusion
In summary, we have learned what a Web Story is and how it differs from social media stories. You also created your first Web Story and learned how to make your Web Story visible on the web.

Happy coding!

### Further reading
- [Web Stories on Google](https://stories.google/)
- [Use AMP to create visual stories on the web](https://amp.dev/about/stories/)
- [Web Stories for WordPress](https://wp.stories.google/)
- [AMP](https://amp.dev/)
- [The AMP Project](https://github.com/ampproject/amp.dev)
- [Accelerated Mobile Pages](https://en.wikipedia.org/wiki/Accelerated_Mobile_Pages)
- [Create your first Web Story](https://amp.dev/documentation/guides-and-tutorials/start/visual_story/?format=stories)
- [Storytime](https://youtube.com/playlist?list=PLfVPq9A6B0RNoQ3HTE9LQzgAdVzcb7tmt)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
