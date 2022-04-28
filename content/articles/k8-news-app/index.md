![CNews](https://raw.githubusercontent.com/paulodhiambo/engineering-education/k8-enged-hackathon-news-app/content/articles/k8-news-app/outline.png)

### Project Name

CNews

### ✍ Project Description
There are several news sites, but they all have one shortcoming, the news sites are either paid or have tonnes of ads on the news page. The goal of this project was to create a news site that is free and has no ads. With the freely available [News API](https://newsapi.org/), it is possible to retrieve news from several news sites, making it possible to have a variety of news from different news sites.

### Project URLs

[Cnews](https://codemechanic.xyz)

[GitHub Repo](https://github.com/paulodhiambo/django-todolist)


### Project Video

[Project Video]()

### Project Tech Stack

Due to limited time developing and deploying the project, I decided to go with Python and Django frameworks because of their simplicity and ease of use. As much as I have worked with Python and Django before, this came as a challenge since my core experience is mobile application development.

After going through the available APIS, I decided to go with the [News API](https://newsapi.org/docs/endpoints/top-headlines). Although Parsing the JSON response was a challenge, I could parse the data and pass it to the Django template.

### KEI Deployment Process
I used the Section KEI platform to deploy the project. Unfortunately, the deployment process was a bit complicated due to the abstraction of some Kubernetes components such as Ingress and Loadbalancer. On the other hand, the documentation was of great help by not having an in-depth explanation of some of the concepts. The section documentation assumes some of the concepts, making it hard for developers with little Kubernetes knowledge to deploy the applications on the section platform. Furthermore, the documentation does not only mention that Kubernetes Service types like Loadbalancer, Nodeport and Ingress are not supported. Mentioning the supported service types and the unsupported service types would significantly be important. 

Although it was my first time configuring a domain, I could get the domain to work. This was a great learning experience after messing up with the domain DNS records 😊. I later learned that using sections hosted nameservers was the easiest way to get the domain working instead of going the CNAME and A records way.

### Author
**Name:** Paul Odhiambo
**Email:** paulodhiambo962@gmail.com
**Author Profile:** [Odhiambo Paul](https://www.section.io/engineering-education/authors/odhiambo-paul/)
