[According to seedscientific.com](https://seedscientific.com/how-much-data-is-created-every-day), we generate 2.5 quintillion bytes of data every day. A significant part of this data is generated through our interactions with the internet. Big organizations worldwide extract and analyze these data for business research purposes to further grow their businesses while maximizing profits.

How do these organizations traverse the web to explore these existing data for their desired purposes? That’s where web crawlers come in. 

This tutorial will guide you on how you can build a basic web crawler of your own and introduce you to one of the fundamental algorithms underlying a web crawler that you’ll implement for this tutorial. It will also cover some of the use cases of a web crawler and the challenges involved when building one, and some existing Java APIs built for web crawling.


### What is a web crawler?

A web crawler is [one of the tools](https://hevodata.com/learn/8-best-web-scraping-tools/) for traversing the internet for data-gathering and web indexing. It is an automated tool, usually a script written in any suitable programming language, that navigates the web through a series of web pages contained in one another. 

Web crawling is sometimes used interchangeably with web scraping - a tool that does the actual job of pulling the data from web pages. A web scraper extracts data from the web, organizes these data in a defined structure and performs specified operations with these data. A web scraper is inherently different from a web crawler such that the former is a data-mining tool that navigates web pages and extracts specified data across the pages. You can learn more about a web scraper [here](https://www.section.io/engineering-education/getting-started-with-web-scraping-using-python/).

#### How a web crawler works.

You can liken a web crawler to an inventory clerk that creates a catalogue of items in a store. The catalogue will contain the names of the items, their respective descriptions, where they are located in the store for ease of search, the quantity of each item and any other relevant information. With the use of this catalogue, anyone who walks into the store can easily find the desired item. 

This experience is similar to how naming an aisle in a shopping mall makes it easy for you to locate items of the same category. For instance, you can be sure to find tissues in an aisle named “Toilleteries”.

Using web crawlers, this process of cataloguing is referred to as [search indexing](https://www.deepcrawl.com/knowledge/technical-seo-library/search-engine-indexing/). In this case, the internet serves as the store and the URLs, the items in the store. 

A web crawler crawls the internet by starting from a root web page. It searches for hyperlinks or URLs within the content of the root web page, then saves each found URL in a list of web pages it is going to crawl subsequently.

After completely crawling the root web page, it picks another URL and repeats the crawling process all over. This can continue indefinitely as the internet contains a vast collection of websites. 

### Use cases and applications of Web crawlers

- Fetch product data: Organizations could use web crawlers to navigate their competitors’ web pages to gather important information like their prices and any other necessary information, depending on the context of their domain. Some examples of tools that perform this are [Octoparse](https://www.octoparse.com/) and [Puppeteer](https://www.section.io/engineering-education/introduction-to-web-scraping-with-javascript-and-puppeteer/).

- Lead generation for Sales and Marketing teams: You can obtain the contact details of prospective leads for your products and services using web crawlers.

- SEO and Keyword search purposes: You can use a web crawler to fetch your company’s rankings and those of your competitors on search engines over a certain period. This can help your team develop the best strategies to increase your company’s performance on search engine rankings. [Here](https://backlinko.com/best-free-seo-tools) is a link to some tools you can use to perform this operation.

- Feedback monitoring: You can also use web crawlers to traverse the web in search of where users may have mentioned the name of your company for reviews. You can find some examples of such tools [here](https://www.techradar.com/best/best-customer-feedback-tools).

### Challenges of building a Web crawler.

As much as web crawlers come with many benefits, they tend to pose some challenges when building them. Some of the issues faced include:

- Server overload: This commonly occurs when the crawler traverses irrelevant web pages. When the crawler navigates a vast number of web pages, it impacts the server's performance.

- Presence of anti-scraping tools: Anti scraping tools distinguish bots from humans and restrict access to the bots from carrying out malicious activities on their web pages. Organizations are beginning to integrate anti-scraping tools into their website to prevent unauthorized visits to their web pages. 

These tools can distinguish bots from humans and restrict access to the bots from carrying out malicious activities on their web pages. An example of such tools is the [Google Captcha](https://support.google.com/a/answer/1217728?hl=en#:~:text=CAPTCHA%20(Completely%20Automated%20Public%20Turing,known%20as%20challenge%2Dresponse%20authentication.&text=A%20CAPTCHA%20test%20is%20made,image%2C%20and%20a%20text%20box.)

- Inconsistent webpage structures: The structures of websites are different from one another. Due to this dynamism, a web crawler that performs well on one website may fail on another. 

### Java libraries for building web crawlers

Although this tutorial will only cover the concept of web crawling at the fundamental level without the use of any external libraries, here are some Java API’s you can integrate with your application to perform web crawling:

- [Heritrix](https://github.com/internetarchive/heritrix3)
- [JSoup](https://jsoup.org/)
- [Apache nutch](https://nutch.apache.org/)
- [Stormcrawler](http://stormcrawler.net/)
- [Gecco](https://github.com/xtuhcy/gecco)

### Breadth-First Search - The underlying algorithm of the Web crawler

Before proceeding further with this tutorial, you must have a fundamental knowledge of the breadth-first search (BFS) algorithm that we’ll implement in building the web crawler in the subsequent sections. It’s okay to skip this section if you are familiar with how BFS operates.

BFS is a traversal algorithm you implement when you want to visit every node of a tree or graph data structure in a layerwise format. This implies that given a source node, BFS visits all the children of the source node horizontal (either left to right or right to left, depending on how you choose to implement it), then it goes on to visit the next layer of children, that is, the “grandchildren” of the source node. 

![breadth-first search](engineering-education/how-to-build-a-web-crawler-with-java/bfs.png)

In the diagram above, the traversal begins from Node 1, the parent or source node. Then it proceeds to its children - Nodes 2, 3, 4 in the second layer. From Node 4, the traversal continues to the leftmost part of the third layer and travels horizontally to the end of the layer. This continues until all nodes are visited.

BFS has a time complexity of O(V+E), where V denotes the number of vertices and E, the number of edges. 

You can learn more about BFS [in this tutorial](https://www.section.io/engineering-education/breadth-first-search/) that implements BFS to solve a maze.


### Building the Web crawler

Now to the tutorial’s core, you’ll build a web crawler that uses the BFS algorithm to traverse web pages. The crawler will begin from a source URL then visit every URL contained. Once every URL in this source URL has been visited, the algorithm will then visit each of the URLs in the children URLs and down the chain until it reaches a breakpoint that you will specify. The breakpoint here will represent how many URLs you want your web crawler to visit so that it doesn’t continue endlessly. 

The algorithm will visit only URLs that have not been previously visited to ensure we don’t go in cycles. These URLs represent the vertices, and the connections between the URLs are the edges.

#### Prerequisites

- Fundamental knowledge of the Java programming language.

- A suitable development environment such as [IntelliJ](https://www.jetbrains.com/idea/download/) or any other text editor of your choice.

- Basic knowledge of regular expressions. If you’re new to regex, [here](https://www.section.io/engineering-education/regex-implementation-with-java/) is a tutorial I created that will get you started on implementing regex with Java.



#### The Pseudocode

1. Start by adding the root URL to a queue and a list of visited URLs.
2. While the queue is not empty, remove the URL from the queue and read its raw HTML content.
3. While reading the HTML content of the URL, search for any other URL contained in the parent HTML.
4. When a new URL is found, verify that it has not been previously visited by checking the list of visited URLs.
5. Add the newly found unvisited URL to the queue and the list of visited URLs.
6. Repeat steps 4 and 5 for every new URL found within the HTML content.
7. When all the URLs in the HTML have been found, repeat from step two until the program reaches your specified breakpoint.  For this demo, I’ll use a breakpoint of 100.


####  Implementation

Create a Java class with the name `WebCrawler and add the following code to the file:

```java



public class WebCrawler {

    private Queue<String> urlQueue;
    private List<String> visitedURLs;

    public WebCrawler() {
        urlQueue = new LinkedList<>();
        visitedURLs = new ArrayList<>();
    }

    public void crawl(String rootURL, int breakpoint){
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
            }catch (Exception e){
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

In the `crawl` method of the above code snippet, the `rootURL` is the starting point of the crawler and the `breakpoint` represents how many URLs you want your crawler to discover. The steps involved in the algorithm are:

- The algorithm starts by adding the root URL to the queue and the list of visited URLs.
- It reads each line of the HTML content of the URL using the `BufferedReader` API.
- Then it concatenates each HTML line it reads to the `rawHTML` variable.
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

The above `main` method uses the URL to one of my tutorials as the start URL and a breakpoint of 100.

Below is a snapshot of the output of running the program:

![web crawl sample output](engineering-education/how-to-build-a-web-crawler-with-java/crawl-result.png)

The URLs in the snapshot above are some of the URLs contained in all the web pages the web crawler crawled starting from the root URL through the embedded URLs until it reached the breakpoint.


### Conclusion

This tutorial taught you what web crawlers are all about and their real-life use cases. You built a web crawler that discovers the URLs contained in the HTML content of the parent URL and terminates after a specified number of URLs have been found. You were also briefly introduced to breadth-first search, an algorithm you implemented in building your web crawler.

I hope this was a good starting point for you. You can add more features to your web crawler to give it more capabilities. [Here](https://github.com/olu-damilare/WebCrawler) is a link to the project on my GitHub repo.

Cheers.



### Further reading 

- [What is a web crawler? | How web spiders work](https://www.cloudflare.com/learning/bots/what-is-a-web-crawler/).

- [Getting Started with Web Scraping using Python](https://www.section.io/engineering-education/getting-started-with-web-scraping-using-python/).

- [Solving a maze with breadth-first search](https://www.section.io/engineering-education/breadth-first-search/).

- [How A Web Crawler Works – Back To The Basics](https://www.woorank.com/en/blog/how-a-crawler-works-back-to-the-basics).
