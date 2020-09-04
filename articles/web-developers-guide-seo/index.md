---
layout: engineering-education
status: publish
published: true
url: /engineering-education/web-developers-guide-seo/
title: Developer's Guide to Search Engine Optimization
description: A developers guide on implementing various techniques to improve a website's ranking on search engines such as Google.
author: lalithnarayan-c
date: 2020-09-03T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/web-developers-guide-seo/hero.jpg
    alt: web developers guide to SEO
---
Search engine optimization (SEO) is an incredibly important aspect of designing websites. SEO is usually tackled by the marketing department in a given company. But, developers have an equal role to play in ensuring the website is easily found on the search engines.
<!--more-->
When a URL is shared, how can we ensure that the experience with the URL is enhanced? For example, YouTube or Facebook links can be opened within the app with the help of the [picture-in-picture](https://support.google.com/youtube/answer/7552722?co=GENIE.Platform%3DAndroid&hl=en) feature.

When we place an order on Amazon, the order details and delivery estimate is available to our Google Assistant. Some links provide nice imagery and smooth transitions between apps such as LinkedIn URLs for example.

Search engine optimization is the art of standing out amongst other websites. This art is pioneered by creating an experience that the user seeks repetitively, thereby increasing the website's presence on the internet. We will look at some of the key considerations a developer should keep in mind while designing a website. The techniques aim at simplifying the job of the millions of crawlers that search and [index the internet regularly](https://www.sciencedaily.com/terms/web_crawler.htm).

We will look at the various aspects of SEO, and consider the important concepts of metadata. Towards the end of the article, you will have a solid grasp of some good SEO techniques.

### Traditional SEO
Let’s look at some of the methods that can be used to improve SEO. These are factors responsible for ensuring crawlers can easily do their job. Traditional SEO, had an earlier emphasis on HTML meta tags that were used to fill in a set of important keywords. Severe exploitation of this has resulted in search engines disregarding the keywords.

Crawlers are bots that go through pages and find the content present there. They then list the various links the website directs to. By doing so, crawlers map the internet and enhance the performance of search engines.

At the same time, the content plays a major role. The amount of time a user spends and the monetization capacity are tracked regularly by the crawlers. Finally, the target niche matters.

Providing unique content that is designed, delivered, and branded has a higher chance of being ranked higher. The investment on User Interface and User Experience [(UI/UX)](https://neilpatel.com/blog/googlebot-optimization/) returns a larger time spent on the site and a larger number of clicks which results in better SEO.

### PageRank
The [PageRank](https://en.wikipedia.org/wiki/PageRank) algorithm, named after Larry Page, is the algorithm used to measure and rank the importance of websites. The underlying assumption that ranking algorithms make is as follows: the quality of a site is directly proportional to the number of links to it. Quality links are links those pages that are ranked better.

Now that we have a better understanding of the topic, let us look at some pro-SEO dev techniques to boost your page ranking higher and higher.

### Metadata

#### 1. Adding the Meta Tag
Adding meta tags is the oldest way of implementing SEO. These meta tags are placed inside the head tag along with other link tags. Let us look at the example below.

```html    
   <meta name="description" content="Welcome to the blog on SEO on Section.io "/>    
   <meta name="keywords" content="SEO, Web dev, pagerank, node.js "/>
```

The description and keywords are two options that crawlers look for. Keywords are not used much today, but it's a good practice to include them.

#### 2. Adding the Title Tag
The title tag displays the current title of the webpage. A common mistake that developers make is having the same title tag for most of the pages on a website. The ranking algorithms penalize such behavior of websites for lack of information. The title tag must be modified according to the content at hand.

For example, look at the current tab. Is the title "Developer's Guide to Search Engine Optimization| Section"?

Such optimization is required for getting better results from search engines.   

#### 3. Adding Favicons
Favicons are the tiny icons that appear on the tabs. They don't directly affect SEO. They play a vital role in optimizing the user experience. The favicons represent the brand and therefore have huge importance. Looking at the favicon on top of the Facebook page helps us (as the audience) easily identify the tab amidst other tabs.

The favicon also helps in identifying the webpage in bookmark lists as well as the search history. Better and easier identification of websites enables larger time spent on the site thereby optimizing it.

The [RealFaviconGenerator](https://realfavicongenerator.net) is a good tool to design and generate custom favicons.

### Social Metadata
As discussed earlier, controlling the experience of the user upon the clicking of an URL is very important. Various technologies and protocols are built to enhance this experience.

#### Facebook Open Group Protocol
Facebook's [Open Graph Protocol](https://developers.facebook.com/docs/sharing/overview/) decides how URLs are shown in Facebook posts. There are various meta tags that one can add. It is the same as before, except a property tag is added.

```html
<meta property="og:property_name" content="canonicalURL">
```
og stands for Open Graph. The `property_name` mentioned in meta tag after og takes several values.

They are as follows:
1. title
2. type
3. URL
4. image
5. admins
6. site_name
7. description

These meta tags can be validated using [Facebook's tool](https://developers.facebook.com/tools/debug/). Let us look at how these property names help enhance the user experience in a Facebook post.

![open graph protocol](/engineering-education/web-developers-guide-seo/opengraph.jpg)
*[Image Source](https://2.bp.blogspot.com/-kzdcNpZkkK0/VBHOHfDjlkI/AAAAAAAAALs/Ud6T0JfaB4A/s1600/SharedLink.png)*

The `canonicalURL` mentioned in the meta tag is an alias for human-readable URLs. Let's understand it in detail. When we go to a link on Amazon's website, we find that the page URL has the book's name in it and some other details as well.

On the other hand, links that are shared are usually numeric. The numeric data is the non-changeable URL, which is called the canonical URL. The URL with descriptive words in it is called the fetched URL.

The name of the book may change which may lead to a change in the fetched URL. The canonical URL remains the same for a given product. It is a unique value derived using the primary key from the database.

#### Twitter Cards
[Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) allow users to attach media and deliver a rich experience, thereby increasing traffic for their websites. Twitter cards also have similar meta tags that need to be inserted within the head tag.

```html
<meta property="twitter:property_name" content="canonicalURL">
```

![twitter cards](/engineering-education/web-developers-guide-seo/twittercards.jpg)

*[Image Source](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)*

Some of the property names that twitter cards use are as follows:

1. site
2. creator
3. image
4. image: alt
5. player
6. player: width
7. player: height

The player denotes the source URL of the media. Player height and width denote the size of the player.

### Server-Side Rendering
Server-side rendering enables the crawlers to get all the content including the images, videos, links, etc. Therefore, crawlers get more data to build knowledge graphs. This increases the chances of being found on a web search, as the number of phrases that the website shows up for is significantly higher.

In this article, [Node.js vs Next.js](/engineering-education/node-versus-next-react-approach/), we looked at in depth how Next.js enables efficient SEO.

### Conclusion
We have looked at various methods for optimizing websites. Accessing this information gives power to the developer to create search engine optimized sites. We hope this helps you build optimized sites and drive more traffic to your sites. Be legendary.

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
