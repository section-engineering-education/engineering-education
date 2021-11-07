---
layout: engineering-education
status: publish
published: true
url: /recommender-system-explained/
title: Recommender System Explained
description: In this article, we will explore the basics of recommender systems and how they work. This article will also take readers through the benefits, types, components, and applications of recommender systems.   
author: pennina-wanja
date: 2021-05-03T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/recommender-system-explained/hero.jpg
    alt: recommender system example image
---
Recommender systems are used by top online companies such as YouTube, Netflix, and Amazon to suggest online products to buyers based on their interests, preferences, and purchasing behavior. These systems help online businesses optimize user interaction on their websites with the aim of increasing their sales revenue.
<!--more-->
This article takes you through the basics of these systems and explains how they work. It also provides an overview of how they have been applied in online businesses. 

### What is a recommender system?
A recommender system is a system that applies algorithms to suggest items to online users when they visit a website or view an online product. Some of the recommendations made include products to view and purchase, movies to watch, advertisements to view and information to read. 

These systems are used in online advertisement and e-commerce platforms to suggest products to online customers. If you view a certain product on an e-commerce site, the recommender system may suggest other similar products that you may want to buy. 

The suggestions are based on previous user activity, preferences, implicit feedback, and explicit feedback. Implicit feedback involves actions such as purchases, clicks, and searches. The recommender system uses explicit feedback to provide suggestions by analyzing the reaction of users (likes or dislikes) towards a specific product. 

### Benefits of recommender systems
Recommender systems offer the following benefits:
- **Drive traffic:** They provide an effective way of driving traffic to your website, especially through targeted blasts. 
- **Improved user experience:** Recommender systems enable users to locate the desired products through appropriate item suggestions. This improves the user experience, which is an important factor that helps to retain customers.
- **Reduced workload:** These systems automate the process of analyzing the online behavior of all customers. This reduces the workload that would be required if the shopping experience of every customer is analyzed manually by the IT experts. 
- **Increased revenue:** Increased traffic, customer retention, and personalized experiences translate to increased sales revenue. Improved engagement with potential buyers transforms many of them into actual and repeat buyers. 
  
### Components of a recommender system
- **Candidate generations:** This component decomposes the huge pool of candidates (potential recommendations) into smaller subsets. It then recommends these small subsets to the online user. 
- **Scoring systems:** The scoring system allocates a score to all the items or elements in the subsets. 
- **Re-ranking systems:** These systems consider the item scores and other constraints to generate the final rankings.
  
### Types of recommender systems
The following are the main types of recommender systems:

#### Collaborative filtering
This type of recommender system uses the rating profile of users to generate recommendations. It also uses the feedback and reactions of past users to suggest products to other users. 

Collaborative filtering consists of two approaches: the memory-based approach and the model-based approach. The memory-based approach suggests items based on similar user interaction profiles or similar items that the user has interacted with. The model-based approach uses information relating to the user-item interactions to generate a latent model for recommendation.

#### Content-based filtering
This type of recommender system uses the additional details of items and users to generate suggestions for items. For example, a recommender system for a movie may analyze additional information such as the main actors and the duration of the movie. 

This system can also analyze information such as the sex or age of the users that watched the movie. This collective information will be used to suggest movies based on the profile of the user (sex or age).

#### Multi-criteria recommender systems
These systems provide recommendations based on multiple criteria relating to preference information. The system analyzes the preference information of a user for an explored item using various criteria, rather than a single criterion. It then forecasts a rank for unexplored products and provides relevant suggestions to the user. 

#### Mobile recommender systems
These systems use smartphone devices to offer personalized recommendations. The accuracy of these systems depends on the context, privacy, and recommendation approach. A good example of a mobile recommender system is the one used by taxi companies such as Lyft, DiDi, and Uber. 

In such a case, the system uses the GPS information of routes used by drivers to recommend appropriate pick-up points. The GPS information used includes the operational status, location, and time stamps. 

#### Hybrid recommender systems
Hybrid recommender systems combine content-based filtering and collaborative filtering approaches. These systems help in overcoming some of the limitations of pure recommender systems such as sparsity problems and [cold start](https://en.wikipedia.org/wiki/Cold_start_(recommender_systems)). 

Data sparsity makes it difficult for the system to find similar users because the active users rated a few number of products or items. The cold start problem occurs when the system finds it difficult to provide accurate suggestions because there is insufficient information about users. 

Netflix is an example of a company that employs hybrid recommender systems.

### How recommender systems work
Recommender systems work by using users' data to generate suggestions. The following image provides an overview of how recommender systems work. 

![How Recommender Systems Work](/engineering-education/recommender-system-explained/how-recommender-systems-work.jpg)

[Image Source: Imaginet](https://www.imaginet.com/wp/wp-content/uploads/2020/07/process-1.png)

The first step involves data collection to gather the ratings, tastes, preferences, and online behavior of customers. The main sources of data include explicit ratings and implicit ratings. Information relating to product similarity and user similarity is also used to provide the basis for recommendation. 

The collected data is then stored and used in the training phase. This phase involves conducting statistical analysis and applying mathematical algorithms to learn the existing patterns. The last stage involves suggesting items to the online user. 

In this stage, a model is deployed into a container that generates a REST API. The web application uses the customer data to send queries to the recommendation system. The system then provides the recommendation and displays it on the customer’s page. 

The algorithms used and the recommendation approach depend on the type of recommender system. For example, a collaborative filtering system analyzes data and identifies two users that have bought the same product (s). 

If one of the users buys another product, the system will recommend it to the other user because they have similar preferences. The following image shows how this type of system works. 

![How Collaborative Filtering Works](/engineering-education/recommender-system-explained/how-collaborative-filtering-works.png)

[Image Source: Built In](https://builtin.com/sites/default/files/styles/ckeditor_optimize/public/inline-images/recommendation-system-machine-learning-user-similarity.png)

The two users have liked and previously bought two identical products. One of the users buys a drink. This drink is recommended to the other user because the two users have similar preferences.

A content-based filtering system analyzes the online behavior of customers to analyze product similarity. The system analyzes data such as the time spent on a specific product, purchased products, clicks, and product categories to recommend similar products. The image below shows how content-based filtering systems work. 

![Content-Based Filtering](/engineering-education/recommender-system-explained/content-based-filtering.jpg)

[Image Source: Imaginet](https://www.imaginet.com/wp/wp-content/uploads/2020/07/content-based.png)

The system analyzes the categories of movies liked by the customer based on attributes such as genre and actors. It then recommends movies that have similar attributes. 

### Applications of recommender systems
The following are some of the use cases of recommender systems:

#### Amazon
Amazon is an e-commerce giant that sells online products such as computers, apparel, electronics, and books. Recommender systems are used by Amazon as a marketing tool to suggest products to its online customers. When you click on one of the links, the systems will generate recommendations based on user behavior or browsing history. When you click on the suggested links, there will be additional filters based on previous ratings, product types, and subject areas. 

#### YouTube
YouTube is an online platform that enables users to share, upload, view, and rate video content. It consists of personalized recommendations that connect users to relevant links based on their interests. When you open a video, a list of recommended videos will be provided to allow the user to make a choice based on interest. When a video is almost ending, the recommender system will suggest the next video to watch. 

#### Netflix
Netflix is an online streaming company that offers various video products such as movies, TV series, and documentaries. This company encourages its users to provide feedback on previously purchased services to generate product ratings and provide product recommendations. 

### The future of recommender systems
Many online companies are increasingly using recommender systems to improve customer experience and increase their sales revenue. With continuous advancements in digital technologies, the scope of the information collected by recommender systems is likely to increase. In e-commerce platforms, gathering information about customers with abandoned carts will help in matching their needs. 

In the future, recommendation systems will be in a position to provide more accurate predictions because of their ability to gain deeper insights into customers' tastes and preferences. The increasing number of online services implies that recommender systems will be a source of competitive advantage to online businesses in the future.

Happy learning.

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
