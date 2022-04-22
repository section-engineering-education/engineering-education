![recTV-web](https://socialify.git.ci/louisefindlay23/recTV-web/image?description=1&language=1&name=1&owner=1&theme=Light)

### 📛 Project Name

recTV

### ✍ Project Description

recTV is a TV Show & Movie recommendation app that not only informs you what you should watch based on what you like but also dislike.

### 🔗 Project URLs

[rectv.spyrath.dev](https://rectv.spyrath.dev)

[GitHub Repo](https://github.com/louisefindlay23/recTV-web)

[PR](https://github.com/section-engineering-education/engineering-education/pull/7611)


### 📽 Project Video

[TBD]

### 👩‍💻 KEI Implementation Process

We used Section's KEI platform to deploy our Node.js web application to the web using our subdomain. I enjoyed using KEI because it made it easy to use K8 because it abstracted a lot of the process so even though I had never used K8 before or really knew what it was except for some sort of containerised load balancer (some amalgamation of Docker and Nginx), I was able to deploy our web app to it in a matter of hours.

It did find the deployment process difficult because the Section documentation seemed a bit light on depth and details and seemed to assume a familarity with these containerised technologies (Kubernetes) and how to use them to deploy containers already. A more basic step-by-step guide for the less experienced would have been nice. 

The first point of confusion was the dummy URL and application as I had assumed that since the application name was the dummy URL I would need to create a new application with the subdomain I wanted to use but instead I could add a new domain in the existing application.

After that, it was extremely easy to deploy the Nginx container to the Section Edge by using the sample YAML files (and setting up an ingress) and then it worked correctly on the chosen subdomain.

However, even though the next steps in the Section Docs said to look at the Apps documentation to deploy other Apps to the Section Edge, it only discussed HTTP extensions. It made no mention of how to containerise web applications to deploy onto the Edge (it again assumed prior knowledge that we would know how to do this). 

I found a helpful [guide](https://www.magalix.com/blog/nodejs-app-sample-from-docker-to-kubernetes-cluster) that helped me to write a Dockerfile for my Node.js web app which worked but ran into the ImagePull: Always issue (which was my fault for not reading the docs throughly) so learned how to push my first Dockerfile to the DockerHub registry through the [quickstart guide](https://docs.docker.com/docker-hub/). 

I then deployed the YAML files again but nothing had changed. I checked on my pods in the console and it had eleven of them. Using [StackOverflow](https://stackoverflow.com/a/33510531/11788062), I found some code to delete the pods and developments which worked as I checked locally but on the Section console, they still showed up. 

Eventually, I discovered it can take a while for these changes to propagate. After removing the NGINX container - and other duplicates, I updated all my config files to use port 80 and then deployed to the Edge again. 

It worked 😊. I had successfully deployed to the edge. I discovered I need to use the HTTPS URL specifically for SSL, it wouldn't redirect non-HTTP traffic to HTTPS but I assume I needed to use a reverse proxy such as Nginx for this. It would be nice if the HTTPS page in the Section API docs mentioned this.

Overall, if I had prior knowledge of containerisation (which the Section Docs advise you to have), I probably would have managed to deploy to the Edge without any issues but would advise the Section Docs to be expanded upon even to briefly link to these guides for beginners rather than the overwhelming Kubernetes docs to provide a more guided understanding of how to proceed with a layman's understanding.

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
**Email**: [TBD]
**Author Profile**: [briana-nzivu](https://www.section.io/engineering-education/authors/briana-nzivu/)
**Implemented**: Documentation & Video
