---
layout: engineering-education
status: publish
published: true
url: /introduction-to-sitemaps/
title: Does your website need a sitemap?
description: Sitemapping allows a webmaster to inform search engines about URLs on a website that are available for crawling. A Sitemap is an XML file that lists the URLs for a site.
author: gregory-manley
date: 2020-07-16T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-sitemaps/hero.jpg
    alt:  Sitemapping example image
---
Sitemapping is, by definition, a process for creating a map that describes relations between pages of a website. Most websites have a sitemap, but not many people see, use, or even know about it. This raises the question: what is a sitemap and is it important?
<!--more-->

### What Is A Sitemap?
According to [Google Search Console](https://support.google.com/webmasters/answer/156184?hl=en), a sitemap is a file that provides you with information about the page, videos, and other files on a website and the relationships between such items. Search engines read the sitemap to intelligently crawl a website.

A sitemap can be formatted using many different forms. The most common formats are XML, followed by RSS and then Text. These formats are easily created as outlined on [Google Search Console Help website](https://support.google.com/webmasters/answer/183668?hl=en). Companies that run search engines, like Google, DuckDuckGo, or Bing will use a sitemap to help generate more accurate search results.

You can even view the sitemap for my website iTech News by going to [https://newsitech.weebly.com/sitemap.xml](https://newsitech.weebly.com/sitemap.xml)

### Are Sitemaps Important?
Sitemaps are commonly used by search engines to crawl a website more intelligently. This information can be extremely important in determining the correct search results. By providing a search engine access to a correct and current sitemap, the search engine can crawl more pages of a website to match content to search intent.

Outside of sitemaps, search engines also use backlinks as a method for finding new pages to crawl, but not all webpages have many backlinks. If a page does not have many backlinks and no sitemap, it may never be found by a search engine.

Not only can sitemaps be useful for search engines to index a website, but they can also be very useful for development. For example, when developing a site with a user login system, it may be important to create a sitemap to view how pages are connected and which pages can only be accessed by logging in. Viewing this information may help in development to make sure that links do not accidentally take a visitor to a "protected page" that was not for their viewing.

### How To Generate and Upload to Google Search Console
Thankfully, it is easy to generate a sitemap for your website using free online services. For this example, we will use [Online XML Sitemap Generator](https://www.web-site-map.com/xml_sitemap.php) to generate a sitemap for iTech News and provide Google Search Console access in order to index our site.

![sitemap generator](/engineering-education/introduction-to-sitemaps/sitemap-generator.png)

Simply go to the website and enter your website's address, then click "Create free XML Sitemap". It may take some time to generate a sitemap for your site, especially if you have hundreds of webpages. Once you have this sitemap downloaded (known as `sitemap.xml`), you will need to upload this file to your website.

Once this is uploaded, head over to your Google Search Console and click on sitemap on the sidebar. Once there, enter `sitemap.xml` into the text box.

![google search console sitemap](/engineering-education/introduction-to-sitemaps/google-search-console-sitemap.png)

After that, click submit and Google now knows where your sitemap is and will shortly start indexing it.

According to [NeilPatel](https://neilpatel.com/blog/build-a-sitemap/), "Without a sitemap, you may spend a lot of time creating unnecessary pages, or designing sites that are more complicated than they need to be." Instead of possibly wasting time creating duplicate resources for a website, it is better to create a sitemap and use it as a roadmap.

Planning, designing, and creating a program to achieve a specific goal takes time. Some of the time may be accidentally spent duplicating systems that already exist within the program. Sitemapping can help prevent this duplication when creating a web application. But, always remember to think ahead when planning any type of program, especially a website.
