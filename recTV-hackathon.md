![recTV-web](https://socialify.git.ci/louisefindlay23/recTV-web/image?description=1&language=1&name=1&owner=1&theme=Light)

### 📛 Project Name

recTV

### ✍ Project Description

There are many TV Shows & Movie recommendation apps but most only show you content similar to those you already like. But what about those you dislike? If you're tired of the same old recommendations apps showing you shows and movies you've already dismissed as not to your taste, check out recTV. 

As well as showing you similar shows (and allowing you to drill down into specific seasons and episode to get a detailed idea about what your new perspective show/movie could be), we'll showcase altnerative media that people who didn't like it, preferred instead. No longer will you have to suffer through the same set of recommendations displayed all the time.

We've made the first recommendation app of its type without requiring mandatory accounts so it's as frictionless a user experience as possible.

### 🔗 Project URLs

[rectv.spyrath.dev](https://rectv.spyrath.dev)

[GitHub Repo](https://github.com/louisefindlay23/recTV-web)

[PR](https://github.com/section-engineering-education/engineering-education/pull/7611)


### 📽 Project Video

[Demo Video](https://vimeo.com/702255906)

### 👨‍💻 Project Tech Stack

Since we started the hackathon two days before the deadline, time was of the essence so I chose a vanilla JS Node.js stack with Express and EJS as it was simple, I had a lot of experience with it and it would be easy for others with JS knowledge to grasp. 

After research TV & Movie APIs, I settled on TMDB since it was free and would be able to accomplish everything we needed (obtain movie and TV metadata and recommendations). I experimented with an API wrapper library - node-themoviedb but encountered some issues with certain API calls so changed to Axios to call the API directly which was flawless. 

We used livereload and connect-livereload to hotreload the static parts of our web app and Beautify, eslint and ejslint to lint and format our code consistently and to industry-standards.

### 🐳 KEI Implementation Process

We used Section's KEI platform to deploy our Node.js web application to the web using our subdomain. I enjoyed using KEI because it made it easy to use K8 because it abstracted a lot of the process so even though I had never used K8 before or really knew what it was except for some sort of containerised load balancer (some amalgamation of Docker and Nginx), I was able to deploy our web app to it in a matter of hours.

It did find the deployment process difficult because the Section documentation seemed a bit light on depth and details and seemed to assume a familarity with these containerised technologies (Kubernetes) and how to use them to deploy containers already. A more basic step-by-step guide for the less experienced would have been nice. 

The first point of confusion was the dummy URL and application as I had assumed that since the application name was the dummy URL I would need to create a new application with the subdomain I wanted to use but instead I could add a new domain in the existing application.

After that, it was extremely easy to deploy the Nginx container to the Section Edge by using the sample YAML files (and setting up an ingress) and then it worked correctly on the chosen subdomain.

However, even though the next steps in the Section Docs said to look at the Apps documentation to deploy other Apps to the Section Edge, it only discussed HTTP extensions. It made no mention of how to containerise web applications to deploy onto the Edge (it again assumed prior knowledge that we would know how to do this). 

I found a helpful [guide](https://www.magalix.com/blog/nodejs-app-sample-from-docker-to-kubernetes-cluster) that helped me to write a Dockerfile for my Node.js web app which worked but ran into the ImagePull: Always issue (which was my fault for not reading the docs throughly) so learned how to push my first Dockerfile to the DockerHub registry through the [quickstart guide](https://docs.docker.com/docker-hub/). 

I then deployed the YAML files again but nothing had changed. I checked on my pods in the console and it had eleven of them. Using [StackOverflow](https://stackoverflow.com/a/33510531/11788062), I found some code to delete the pods and developments which worked as I checked locally but on the Section console, they still showed up. 

Eventually, I discovered it can take a while for these changes to propagate. After removing the NGINX container - and other duplicates, I updated all my config files to use port 80 and then deployed to the Edge again. 

It worked 😊. I had successfully deployed to the edge. I discovered I need to use the HTTPS URL specifically for SSL, it wouldn't redirect non-HTTP traffic to HTTPS but I assume I needed to use a reverse proxy such as Nginx for this. It would be nice if the HTTPS page in the Section API docs mentioned this.

Overall, if I had prior knowledge of containerisation (which the Section Docs advise you to have), I probably would have managed to deploy to the Edge without any issues (since the sample tutorial is excellent for those with prior knowledge but could do with guidance for how to deploy web apps) but would advise the Section Docs to be expanded upon even to briefly link to these guides for beginners rather than the overwhelming Kubernetes docs to provide a more guided understanding of how to proceed with a layman's understanding.

### 🤼 Team Members

**Name:** Louise Findlay
**Email:** louise@louisefindlay.com
**Author Profile:** [louise-findlay](https://www.section.io/engineering-education/authors/louise-findlay/)
**Implemented:** Back-end, Deployment & Documentation

**Name**: Michael Barasa
**Email**: [TBD]
**Author Profile:** [michael-barasa](section.io/engineering-education/authors/michael-barasa)
**Implemented**: Front-end & Documentation

**Name**: Briana Nzivu
**Email**: briananzivu@gmail.com
**Author Profile**: [briana-nzivu](https://www.section.io/engineering-education/authors/briana-nzivu/)
**Implemented**: Documentation & Video
