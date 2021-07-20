### The Front Matter Final Review Process:

#### Final Review Notes

#### KEY Notes for the front matter
The URL line is very important as it relates to SEO - here we should try to use descriptive words - cut out any fluff words like "and", "or", "but". 
Same to note with the Title of the Article - this is important for SEO - and we should cut it down to be viewed better live.

For example: 
Title: How to containerize a MySQL based server and PHPMyAdmin/Adminer with docker and run SQL 

We could cut that down to: How to containerize a MySQL based server and PHPMyAdmin

url: /how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/

Cut it down to: /containerizing-mysql-server-phpmyadmin-with-docker/

1. The front matter should already be added by our peer review team - but sometimes they may forget (and most of the time we need to fix some minor things) we ALWAYS want to check the DATE/TIME - the EngEd site (entire Section site) is running on MST - so please be aware of this time difference and use a world clock or check Hector's Slack Profile's local time to see the appropriate time. This is to ensure your published article comes after the most recently published article.

2. Another thing to watch out for are image previews. Images that show up on localhost may not show up on the production version and vice versa. Make sure to check the live version after publishing since the URL front-matter and image URL have a different structure. The file extenstion needs to match the image e.g. JPEG, jpg, PNG, png. Capitalized file extensions should be renamed to lowercase.

3. Finally, ensure the excerpt seperator `<!--more-->` is included. Remove any headings like Introduction from the excerpt. They can be moved underneath the excerpt or ommitted entirely. Make sure the excerpt makes sense to introduce the article to potential readers. The excerpt is most likely the first couple of sentences from the article but that may not always be the case and some initial reordering could provide a more suitable one.

#### Article Front Matter Example

```md
---
layout: engineering-education
status: publish
published: true
url: /greedy-algorithms/
title: Optimizing Stock Price Profit using Greedy Algorithms
description: In this article we will explore the greedy algorithm approach to obtain the maximum profit given a list of indices when optimizing a stock price profit program.
author: lalithnarayan-c
date: 2020-12-15T00:00:00-18:00
topics: [**Insert Topic Name Here**]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/greedy-algorithms/hero.jpg
  alt: Stock Price Greedy Algorithm example image
---
```
Stock markets are where buyers and sellers connect to buy and sell stocks, which are shares of ownership in a public company. Many people have become millionaires by trading.
<!--more-->

#### Front Matter Breakdown

- Line 14: Start of the front matter
- Line 15  Leave as is - this is the section of the website
- Line 16: Leave as is - this will publish the article
- Line 17: Leave as is - needs to be true to publish
- Line 18: First part should always be /engineering-education/ followed by the name of the .md file (should be name of article) - This will be the URL on the site. Best to extend acornyms for better search results.
- Line 19: Title should be the tile of PR - use best judgement - Capitalize word longer that four letters. The tile can not have a semi-colon `:`.
- Line 20: Description - should be between 150 characters long
- Line 21: Author name - should already be the same if front matter was copied. If new contributor - make sure the name is the name of author .md file name.
- Line 22: Should be todays date & time to the closest hour. It should be a matter of only changing the Month (if needed) - Day - and Time (using 24 hour format)
- Line 23: Leave blank - unless article fits into an already existing topic.
- Line 24: Leave as is - this makes the intro text a bit bigger in font.
- Line 25: Leave as is.
- Line 26: Blank
- Line 27: URL should match the URL from line 6 plus the hero.jpg or .png depending on hero image.
- Line 28: Should be descriptive of the article and image
- Line 29: The three lines start the article.
- Line 31: Copy a sentence or two from the introduction to place here - this text will show up on the main page with hero images. (Note: can not contain ' Eg: Can't = can not)
- Line 32: This closes the large font for the intro text at the beginning of the article. Be sure the <!--more--> is after the intro sentence(s).
