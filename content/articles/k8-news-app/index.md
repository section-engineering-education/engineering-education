
![CNews](https://raw.githubusercontent.com/paulodhiambo/engineering-education/k8-enged-hackathon-news-app/content/articles/k8-news-app/outline.png)

### Project Name

CNews

### ✍ Project Description
There are several news sites but they all have a one shortcomming, the news sites are either paid or have tonnes of ads on the news page. The goal of this project was to create a news site that is free and has no ads. With the freely available [News API](https://newsapi.org/), it is possible to retrieve news from several news sites, making it possible to have a variety of news from different news sites.

### Project URLs

[Cnews](https://codemechanic.xyz)

[GitHub Repo](https://github.com/paulodhiambo/django-todolist)


### Project Video

[Project Video]()

### Project Tech Stack

Due to limited time to develop and deploy the project, I decide to go with Python and Django framework because of the simplicity and ease of use. In as much as I have have worked with Python and Dajngo before, this came as a challenge since my core experience is on Mobile application development.

After going through the available APIS, I decided to go with the [News API](https://newsapi.org/docs/endpoints/top-headlines). Although Parsing the JSON response was a bit of challenge, I was able to parse the data and pass it to the Django template.

### KEI Deployment Process
I used the Section KEI platform to deploy the project. The deployment process was a bit complicated due to the abstraction of some Kubernetes components such as Ingress and Loadbalancer. The documentation was of great help though the documentation was not having indepth explanation on some of the concepts.

Although it was my first time configuring a domain, I was able to get the domain to work. This was a great learning experience after messing up with the domain DNS records 😊. I later learned that using sections hosted nameservers was the easiest way to get the domain working instead of going the CNAME and A records way.

### Author
**Name:** Paul Odhiambo
**Email:** paulodhiambo962@gmail.com
**Author Profile:** [Odhiambo Paul](https://www.section.io/engineering-education/authors/odhiambo-paul/)
