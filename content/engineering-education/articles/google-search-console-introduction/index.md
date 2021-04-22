---
layout: engineering-education
status: publish
published: true
url: /engineering-education/google-search-console-introduction/
title: Google Search Console - An Introduction
description: This guide to Google Search Console will teach you how to add a site (called a property), submit a sitemap, and find and fix any errors that the Google crawlers may come across.
author: louise-findlay
date: 2020-07-09T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/google-search-console-introduction/hero.png
    alt: google search console header image
---
Google Search Console is a powerful tool provided by Google which lets you understand how their search crawlers see your website. This guide will teach you how to add a site (called a property), submit a sitemap, and find and fix any errors that the crawlers may come across. If you’re new to SEO (search engine optimization), then you can also take advantage of its tools to monitor search traffic.
<!--more-->
### Setting up Google Search Console
![google search console](/engineering-education/google-search-console-introduction/google-search-console.jpg)<br>
Go to [Google Search Console](https://search.google.com/search-console/welcome) and log in using a Google account. The first step is to add your site; Google calls this a property. There are two methods: adding your site domain or URL prefix. In this example, we'll use the domain method. Note that this method counts both the insecure (http) and secure (https) version of your website and any subdomains such as blog.yourdomain.com.

Next, enter your domain name (i.e. yourdomain.com) and click Continue. A popup will appear with details of how to verify that you own this domain so Google will let you access it. Click the Copy button and log into your domain registrar (the company you bought your domain from) and access the advanced DNS settings. Add a TXT record and paste the text you copied into the value field.

It can take up to 24-48hrs for the record you added to be processed (though is usually around an hour). So, when you click Verify, if it doesn’t work at first, then try again later.

### Submitting a Sitemap
![sitemap preview](/engineering-education/google-search-console-introduction/sitemap-preview.png)<br>
A sitemap is an XML file that details the structure of your website (how the different pages relate to each other) in a way that search engines can understand. Creating and submitting one can help Google discover pages that its crawlers have missed.

Depending on your website setup, you may have built-in tools available for dynamically generating a sitemap. As an alternative, you can generate one using the free tool, [XML Sitemaps](https://www.xml-sitemaps.com). Just submit your website URL and download the XML file it provides. Then upload the file to your website.

To submit your sitemap to Google, go to Sitemaps under the Index heading. Enter the URL of the sitemap (such as yourdomain.com/sitemap.xml) and then click Submit.

It can take some time for Google to read (index) your sitemap but you can find all the details under Submitted Sitemaps. You can find the date you added it, the last time Google read it, whether it was scanned successfully and how many pages it found. Tap the bar graph icon to find a more detailed overview of the pages it found.

Remember to update your sitemap when you add or remove any pages on your website or change any URLs.

### Fixing Mobile Usability Errors
![mobile friendly pages](/engineering-education/google-search-console-introduction/mobile-friendly-pages.png)<br>
The mobile usability tool underneath Enhancements assists in creating a more usable mobile-friendly website. Any errors will impact your site’s search rankings.

Common errors are text too small to read, clickable elements too close together, and content wider than screen.

Text size should be a minimum of 16pt no matter what device is being used.  `body {font-size: 16pt;}`  is a basic CSS fix but make sure to target any elements, classes, or ids that you’ve set to smaller text size. Line height can also be increased to improve legibility,  `body {line-height: 140%;}`.

Increase space between clickable elements by increasing the margins. Try  `a {margin: 2.5%}`  to start within your CSS file. You may need to alter the percentage or specify specific classes or ids.

To fix content wider than the screen, add  `* {max-width: 100%}`  which prevents elements from being wider than the maximum width of the screen. You may need to add !important to the end to override any max-widths you’ve previously set. This will also sort out any horizontal scrollbar issues.

### Monitoring Search Traffic to Improve SEO
![search traffic](/engineering-education/google-search-console-introduction/search-traffic.png)<br>
In the Performance tab, you can monitor how people have searched for your website. You can select different date ranges to look at and Google Image and Video searches. Click the signal wave icon to see more parameters.

- **Clicks** are when users have visited the page.
- **Impressions** are how many users saw the page in search results.
- **CTR** is the percentage of users that clicked on your search result.
- **Position** is how high the page is in search results.

These metrics can help in a variety of ways to boost your site’s SEO. Discovering search terms users use to find your website can help you pick keywords to include in your copy. You should create more content similar to your most popular pages. Make sure to provide an optimized experience for the device that the majority of you users use.

### How to Redirect Your Site the Right Way (Without Losing Your Search Rankings)
![change of address tool](/engineering-education/google-search-console-introduction/change-of-address-tool.png)<br>
If you’ve changed domains, such as from yourdomain.com to newdomain.com or yourdomain.co.uk then you’ll want to redirect users that may still navigate to your old domain. You’ll want to point Google to your new domain so it’ll stop showing your old domain in searches and transfer your search ranking to the new domain. That’s where the Change of Address tool comes in.

The [Change of Address Tool](https://search.google.com/search-console/settings/change-address) informs Google that you’ve changed domain names. You need to add both domains to the Search Console and set up a permanent redirect (301) for it to work.

There are two ways of setting up a permanent redirect. You can either do it at the DNS level (through your domain registrar) or through a .htacesss file. Updating your DNS can be faster, but some registrars don’t offer permanent redirects.

Create a DNS record of type URL Redirect Record, host @, and set the destination URL to the new domain. The redirect type should be permanent (301).

As with all DNS changes, it can take up to 24-48hrs to process, but is usually around an hour.

Back in the Google Search Console, select the old domain and go to Settings and click on Change of Address. Click Select New Site and choose the new domain. Finally, click Validate and Update to finish the process.

You should keep the redirect in place for a minimum of six months and you can stop renewing the domain after a year but it may be best to keep so it so no one else can buy it.

Congratulations, you’ve set up Google Search Console and learned how to fix errors, add a sitemap, monitor search traffic, and set up a proper redirect.

Struggling to setup other Google services? Check out my [guide to setting up a professional business email using GSuite](/engineering-education/creating-professional-email).