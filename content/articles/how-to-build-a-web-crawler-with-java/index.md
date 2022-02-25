---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-web-crawler-with-java/
title: How To Build Web Crawler With Java
description: In this article, we will discuss what web crawlers are, where we use them, and how it works. We will also implement it using Java.
author: damilare-jolayemi
date: 2022-02-25T00:00:00-02:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/how-to-build-a-web-crawler-with-java/hero.jpg
   alt: How To Build Web Crawler With Java Example Image
---
This tutorial will introduce you to building a basic web crawler and will help you understand the fundamental algorithm that makes web crawlers work. It will also cover some use cases and the challenges involved with building one.
<!--more-->
[According to seedscientific.com](https://seedscientific.com/how-much-data-is-created-every-day), we generate 2.5 quintillion bytes of data every day. A significant part of this data is generated through our interactions with the internet.

Big organizations worldwide extract and analyze these data for business and research purposes to further grow their businesses while maximizing profits.

How do these organizations traverse the web to explore these existing data for their desired purposes? That's where web crawlers come in.

### Pre-requisites
As a pre-requisite, the reader must have the following:
- Fundamental knowledge of the Java programming language.
- A suitable development environment such as [IntelliJ](https://www.jetbrains.com/idea/download/) or any other text editor of your choice.
- Basic knowledge of regular expressions. If you're new to regex, you can read more about it [here](/engineering-education/regex-implementation-with-java/).

### What is a web crawler?
A web crawler is [one of the web scraping tools](https://hevodata.com/learn/8-best-web-scraping-tools/) that is used to traverse the internet to gather data and index the web. It can be described as an automated tool that navigates through a series of web pages to gather the required information.

Web crawling is sometimes used interchangeably with web scraping - a tool that does the actual job of pulling the data from web pages.

A web scraper extracts data from the web, organizes them in a defined structure, and performs specified operations with these data.

A web scraper is inherently different from a web crawler such that the former is used as a data-mining tool that navigates web pages and extracts specified data across the pages, while the latter is to find or discover URLs or links on the web.

You can learn more about web scraping [here](/engineering-education/getting-started-with-web-scraping-using-python/).

#### How does a web crawler work?
You can relate a web crawler to an inventory clerk that creates a catalog of items for a store. The catalog will contain the names of the items, their respective descriptions, where they are located in the store (for the ease of search), the quantity of each item, and any other relevant information.

Using this catalog, anyone who walks into the store can easily find out their desired item.

This experience is similar to naming an aisle in a shopping mall which makes it easy for customers to locate items of the same category. For instance, you can be sure to find tissues in an aisle named "Toiletries".

Using web crawlers, this process of cataloging is referred to as [search indexing](https://www.deepcrawl.com/knowledge/technical-seo-library/search-engine-indexing/). In this case, the internet serves as the store and the URLs serve as the items in the store.

A web crawler crawls the internet - starting from a root web page. It searches for hyperlinks or URLs within the content of the root web page, then saves each found URL into a list of web pages - which are subsequently going to be crawled into.

After completely crawling the root web page, it picks another URL and repeats the crawling process all over. This can continue indefinitely as the internet contains a vast collection of websites.

### Use cases and applications of web crawlers
#### Fetch product data
Organizations use web crawlers to navigate to their competitors' web pages to gather important information like their prices and any other necessary information, depending on the context of their domain.

Some examples of tools that perform this are [Octoparse](https://www.octoparse.com/) and [Puppeteer](/engineering-education/introduction-to-web-scraping-with-javascript-and-puppeteer/).

#### Lead generation for sales and marketing teams
You can obtain the contact details of prospective leads for your products and services using web crawlers.

#### SEO and keyword search purposes
You can use a web crawler to fetch your company's rankings and those of your competitors on search engines over a certain period. This can help your team develop the best strategies to increase your company's performance on search engine rankings.

You can find some tools for SEO [here](https://backlinko.com/best-free-seo-tools).

#### Feedback monitoring
You can also use web crawlers to traverse the web in search of where users may have mentioned the name of your company for reviews. You can find some examples of such tools [here](https://www.techradar.com/best/best-customer-feedback-tools).

### Challenges to building a web crawler
As much as web crawlers come with many benefits, they tend to pose some challenges when building them. Some of the issues faced include:

#### Server overload
This commonly occurs when the crawler traverses irrelevant web pages or when it navigates a vast number of web pages. This might impact the performance of the server.

#### Presence of anti-scraping tools
Anti-scraping tools distinguish bots from humans and restrict access to the bots from carrying out malicious activities on their web pages.

Organizations have started integrating anti-scraping tools into their website to prevent unauthorized visits to their web pages.

These tools can distinguish bots from humans and restrict access to the bots from carrying out malicious activities on their web pages.

An example of such a tool is the [Google Captcha](https://support.google.com/a/answer/1217728?hl=en)

#### Inconsistent webpage structures
The structures of websites are different from one another. Due to this dynamism, a web crawler that performs well on one website may fail on another.

### Java libraries to build web crawlers
Although this tutorial will only cover the concept of web crawling at the fundamental level, without the use of any external libraries, here are some Java API's you can integrate with your application to perform web crawling:

- [Heritrix](https://github.com/internetarchive/heritrix3)
- [JSoup](https://jsoup.org/)
- [Apache nutch](https://nutch.apache.org/)
- [Stormcrawler](http://stormcrawler.net/)
- [Gecco](https://github.com/xtuhcy/gecco)

### Breadth-First Search (BFS)
Before proceeding further with this tutorial, you must have a fundamental knowledge of the breadth-first search (BFS) algorithm to help you understand subsequent sections.

It's okay to skip this section if you are familiar with how BFS operates.

BFS is a tree traversal algorithm that you implement when you want to visit every node of a tree or graph data structure in a layerwise format.

This implies that, given a source node, BFS visits all the children of the source node horizontally (either left to right or right to left, depending on how you choose to implement it), then it goes on to visit the next layer of children, that is, the "grandchildren" of the source node.

![breadth-first search](/engineering-education/how-to-build-a-web-crawler-with-java/bfs.png)

In the diagram above, the traversal begins from `Node 1` (the parent or source node). Then, it proceeds to its children - Nodes `2`, `3`, `4` in the second layer. From `Node 4`, the traversal continues to the leftmost part of the third layer and travels horizontally to the end of the layer. This process continues until all the nodes are visited.

BFS has a time complexity of `O(V+E)`, where `V` denotes the number of vertices and `E` denotes the number of edges.

It is highly recommended to read [this tutorial on BFS](/engineering-education/breadth-first-search/).

### Building the web crawler
Now, to the tutorial's core, we will build a web crawler that uses the BFS algorithm to traverse web pages.

The crawler will begin from a source URL that visits every URL contained. Once every URL in this source URL has been visited, the algorithm will then visit each of the URLs in the children URLs and down the chain until it reaches a breakpoint that you will specify.

> Note: The breakpoint will represent how many URLs you want your web crawler to visit. So that, it doesn't continue endlessly.

The algorithm will visit only URLs that have not been previously visited to ensure we don't go in cycles. These URLs represent the vertices, and the connections between the URLs are the edges.

#### Pseudocode
1. Start by adding the root URL to a queue and a list of visited URLs.
2. While the queue is not empty, remove the URL from the queue and read its raw HTML content.
3. While reading the HTML content of the URL, search for any other URL contained in the parent HTML.
4. When a new URL is found, verify that it has not been previously visited by checking the list of visited URLs.
5. Add the newly found unvisited URL to the queue and the list of visited URLs.
6. Repeat steps 4 and 5 for every new URL found within the HTML content.
7. When all the URLs in the HTML have been found, repeat from step 2 until the program reaches your specified breakpoint.

> For this demo, we will use a breakpoint of 100.

#### Implementation
Create a Java class with the name `WebCrawler` and add the following code to the file:

```java
public class WebCrawler {

    private Queue<String> urlQueue;
    private List<String> visitedURLs;

    public WebCrawler() {
        urlQueue = new LinkedList<>();
        visitedURLs = new ArrayList<>();
    }
}
```

In the code above, we have initialized the classes, datastructures, and the constructors that we would be using subsequently.

```java

public void crawl(String rootURL, int breakpoint) {
    urlQueue.add(rootURL);
    visitedURLs.add(rootURL);

    while(!urlQueue.isEmpty()){

        // remove the next url string from the queue to begin traverse.
        String s = urlQueue.remove();
        String rawHTML = "";
        try{
            // create url with the string.
            URL url = new URL(s);
            BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
            String inputLine = in.readLine();

            // read every line of the HTML content in the URL
            // and concat each line to the rawHTML string until every line is read.
            while(inputLine  != null){
                rawHTML += inputLine;

                inputLine = in.readLine();
            }
            in.close();
        } catch (Exception e){
            e.printStackTrace();
        }

        // create a regex pattern matching a URL
        // that will validate the content of HTML in search of a URL.
        String urlPattern = "(www|http:|https:)+[^\s]+[\\w]";
        Pattern pattern = Pattern.compile(urlPattern);
        Matcher matcher = pattern.matcher(rawHTML);

        // Each time the regex matches a URL in the HTML,
        // add it to the queue for the next traverse and the list of visited URLs.
        breakpoint = getBreakpoint(breakpoint, matcher);

        // exit the outermost loop if it reaches the breakpoint.
        if(breakpoint == 0){
            break;
        }
    }
}
```

In the `crawl()` method, the `rootURL` is the starting point of the crawler and the `breakpoint` represents how many URLs you want your crawler to discover.

The steps involved in the algorithm are:
- The algorithm starts by adding the root URL to the queue and the list of visited URLs.
- It reads each line of the HTML content of the URL using the `BufferedReader` API.
- Then, it concatenates each HTML line as it reads to the `rawHTML` variable.

```java
private int getBreakpoint(int breakpoint, Matcher matcher) {
    while(matcher.find()){
        String actualURL = matcher.group();

        if(!visitedURLs.contains(actualURL)){
            visitedURLs.add(actualURL);
            System.out.println("Website found with URL " + actualURL);
            urlQueue.add(actualURL);
        }

        // exit the loop if it reaches the breakpoint.
        if(breakpoint == 0){
            break;
        }
        breakpoint--;
    }
    return breakpoint;
}
```

The code above does the following:
- The `getBreakPoint` method uses the specified regex pattern to discover URLs in `rawHTML`.
- The operations iterate until the crawler has discovered the number of URLs specified in your `breakpoint`.

Here is a snippet of the main method for the application:

```java
public static void main(String[] args) {
    WebCrawler crawler = new WebCrawler();
    String rootURL = "https://www.section.io/engineering-education/springboot-antmatchers/";
    crawler.crawl(rootURL, 100);
}
```

The above `main` method sets the `rootURL` to [one of my tutorials](https://www.section.io/engineering-education/springboot-antmatchers/) `https://www.section.io/engineering-education/springboot-antmatchers/` and sets the breakpoint to be `100`.

Below is a snapshot of the output of running the program:

![web crawl sample output](/engineering-education/how-to-build-a-web-crawler-with-java/crawl-result.png)

The URLs in the snapshot above are some of the URLs contained in all the web pages the web crawler crawled starting from the root URL through the embedded URLs until it reached the breakpoint.

### Conclusion
This tutorial has helped you learn what web crawlers are all about and their real-life use cases. We built a web crawler that discovers the URLs contained in the HTML content of the parent URL and terminates after a specified number of URLs have been found.

We also briefly introduced to breadth-first search, an algorithm that you use for building the web crawler.

I hope this was a good starting point for you. You can add more features to your web crawler to give it more capabilities.

You can find the full source code [here](https://github.com/olu-damilare/WebCrawler).

Happy coding!

### Further reading
- [What is a web crawler? | How web spiders work](https://www.cloudflare.com/learning/bots/what-is-a-web-crawler/).
- [Getting Started with Web Scraping using Python](https://www.section.io/engineering-education/getting-started-with-web-scraping-using-python/).
- [Solving a maze with breadth-first search](https://www.section.io/engineering-education/breadth-first-search/).
- [How A Web Crawler Works – Back To The Basics](https://www.woorank.com/en/blog/how-a-crawler-works-back-to-the-basics).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s)
