# Developer's Guide to Search Engine Optimization

Search engine optimization (SEO) is an incredibly important aspect of designing websites. SEO is usually tackled by the marketing department in a given company. But, developers have an equal role to play in ensuring the website is easily found on the search engines. When a URL is shared, how can we ensure that the experience with the URL is enhanced? For example, YouTube or Facebook links can be opened within the app with the help of the picture-in-picture feature. When we place an order on Amazon, the order details and delivery estimate is available to our Google assistant. Some links provide a vanilla experience with nice imagery and graphics, smooth transitions between apps, for example, LinkedIn URLs.

Search engine optimization is the art of standing out amongst other websites. This art is pioneered by creating an experience that the user seeks repetitively, thereby increasing the presence on the internet. We will look at some of the key considerations a developer should keep in mind while designing the website. The techniques aim at simplifying the job of the millions of crawlers that search and index the internet regularly. We will look at the various aspects of SEO, and consider the important concepts of Metadata. Towards the end of the article, you will have a solid grasp of some good SEO techniques. 

## Traditional SEO

Let us look at some of the ways that are used to improve SEO. These are factors responsible for ensuring crawlers can do their job easily. Earlier, the HTML meta tag was used to fill in a set of important keywords. Severe exploitation of the same has resulted in search engines disregarding the keywords. Crawlers are bots that go through pages and find the content present there and list the various links the website directs to. By doing so, crawlers map the internet and enhance the performance of search engines. 

At the same time, the content plays a major role. The amount of time a user spends and the monetization capacity are tracked regularly by the crawlers. Finally, target the niche audience matters. Providing unique content that is designed, delivered, and branded has a higher chance of being ranked higher. The investment on User Interface and User Experience(UI/UX) returns a larger time spent on the site and more number of clicks resulting in better SEO. 

## PageRank
The PageRank algorithm, named after Larry Page, is the algorithm used to measure and rank the importance of websites. The underlying assumption that ranking algorithms make is as follows: the quality of a site is directly proportional to the number of links to it. Quality links are links to pages that are ranked better. 

Now that we have sufficient background about the topic, let us look at some pro-SEO dev techniques to boost the rankings higher and higher.

### Metadata

1. **Adding meta tag**: Adding meta tags is the oldest way of implementing SEO. These meta tags are placed inside the head tag along with other link tags. Let us look at examples for the same.
   ```html    
   <meta name="description" content="Welcome to the blog on SEO on Section.io "/>    <meta name="keywords" content="SEO, Web dev, pagerank, node.js "/>
    ```
    The description and keywords are two such options that crawlers look for. Keywords are not used much today, but it's a good practice to include them. 

2. **Adding title tag**: The title tag displays the current title of the webpage. A common mistake that developers make is having the same title tag for most of the pages on a website. The ranking algorithms penalize such behavior of websites for lack of information. The title tag must be modified according to the content at hand. For example, look at the current tab. Is the title " Developer's Guide to Search Engine Optimization| Section"? Such optimization is required for getting better results at search engines.   

3. **Adding favicons:** Favicons are the tiny icons that appear on the tabs. They don't directly affect SEO. They play a vital role in optimizing the user experience. The favicons represent the brand and therefore have huge importance. Looking at the f icon on top of the Facebook page helps us easily identify the tab amidst other tabs. The favicon also helps to identify the webpage in bookmark lists as well as search history. Better and easier identification of websites enables larger time spent on the site thereby optimizing it.

### Social Metadata
As discussed earlier, controlling the experience of the user upon the clicking of an URL is very important. Various technologies and protocols are built to enhance the same. 

#### Facebook Open Group Protocol

Facebook's Open Graph Protocol decides how URLs are shown in Facebook posts. There are various meta tags that one can add. It is the same as before, except a property tag is added.

```html
<meta property="og:proprty_name" content="canonicalURL">
```
og stands for Open Graph. The ```property_name``` mentioned in meta tag after og takes several values. They are as follows:
1. title
2. type
3. URL
4. image
5. admins
6. site_name
7. description 

Let us look at how these property names help enhance the user experience in a Facebook post.
![open graph protocol](opengraph.jpg)

*Source: https://2.bp.blogspot.com/-kzdcNpZkkK0/VBHOHfDjlkI/AAAAAAAAALs/Ud6T0JfaB4A/s1600/SharedLink.png*

The ```canonicalURL``` mentioned in the meta tag is an alias for human-readable URLs. Let's understand it in detail. When we go to a link on amazon's website, we find that the page URL has the book's name in it and some other details as well. On the other hand, links that are shared are usually numeric. The numeric data is the non-changeable URL, which is called the canonical URL. The URL with descriptive words in it is called the Fetched URL. The name of the book may change which may lead to a change in the fetched URL. The canonical URL remains the same for a given product. It is a unique value derived using the primary key from the database. 

#### Twitter Cards
Twitter Cards allow users to attach media and deliver a rich experience, thereby increasing traffic for websites. Twitter cards also have similar meta tags that need to be inserted within the head tag. 

```html
<meta property="twitter:proprty_name" content="canonicalURL">
```
![twitter cards](twittercards.jpg)

*Source: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup*

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

Server-side rendering enables the crawlers to get all the content including the images, videos, links, etc. Therefore, crawlers get more data to build knowledge graphs. This increases the chances of being found on a web search, as the number of phrases that the website shows up for is significantly higher. In the article on [Node.js vs Next.js](https://www.section.io/engineering-education/node-versus-next-react-approach/), we looked at how Next.js enables efficient SEO.


### Conclusion
We have looked at various methods for optimizing the websites. Accessing this information gives power to the developer to create search engine optimized sites. We hope you build optimized sites and drive more traffic towards your sites with the above information. 
