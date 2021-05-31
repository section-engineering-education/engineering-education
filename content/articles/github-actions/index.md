---
layout: engineering-education
status: publish
published: true
url: /github-actions/
title: Introduction to GitHub Actions
description: We can use GitHub Actions to perform real-world tasks such as CI/CD, publish to NPM, deploy to the cloud, and so on. This guide will walk you through how to get started with GitHub Actions.
author: rohan-reddy
date: 2020-07-09T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/github-actions/hero.jpg
    alt: github actions
---
[GitHub Actions](https://github.com/features/actions) enables you to create custom and automated software development workflows (including CI/CD) directly in your [GitHub repository](https://github.com/github).
<!--more-->

Suppose we have a GitHub repository, there are different kinds of events that can happen to that repo like *starring*, *pull-request* or *create an issue*; these events can be used to trigger an automated workflow. GitHub can spin up one or more containers for us in the cloud and execute given instructions to do something useful.

GitHub will log the progress of each step and make it very clear if something failed. The good thing about GitHub Actions is that instead of writing these steps on our own, we can use the ones implemented by the community.

You can write individual tasks called actions, and combine them to create a workflow. Workflows are automated processes that you can set up in your repository to build, test, package, release, and deploy any project on GitHub. You can create actions by creating custom code that interacts with your repository in any way you would like. For example, an action can publish npm modules, send updates to Slack, or deploy production-ready code.

We can use GitHub Actions to perform real-world tasks such as CI/CD, publish to NPM, deploy to Azure/AWS, and so on.

### Getting Started with GitHub Actions

1. Go to any repository, where you want to create a workflow, and navigate to the Actions tab.

![repo img](/engineering-education/github-actions/repo.png)

2. Select a workflow from the ones available, or create a new one.

![actions img](/engineering-education/github-actions/actions.png)

3. To create your own workflow create a `.yml` file in the path `.github/workflows/action1.yml`. Commit the file, GitHub will automatically understand that it is a workflow.

![ga img](/engineering-education/github-actions/ga4.png)

4. You can monitor you workflow logs in the same **Actions** tab after you have set it up.

![log img](/engineering-education/github-actions/log.png)

### How to create custom actions for common uses

#### Continuous Integration
The whole idea behind [continuous integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration) is to have developers submit their code to the main codebase in small maintainable chunks, usually on a daily basis. Those changes should be automatically tested against the main codebase.

You can use your own project, but I am using a simple node project.

Create a new file in `.github/workflows/action.yml`.

```yml
name: Node Continuous Integration

on:
    pull_request:
        branches: [ master ]
jobs:
    job_1_name:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v1
              with:
                node-version: 12
            - run: npm ci
            - run: npm test
            - run: npm run build
```

The above action does the following:

1. We set up an action with name *Node Continuous Integration*.
2. This action is triggered when there is a *pull request on the master branch*. The event which triggers the action is mentioned under `on:`.
3. An action has one or more `jobs`. The first does the following:
 * Spins up an ubuntu virtual machine.
 * `actions/checkout@v2` Brings the source code to the current working directory. `checkout@v2` is an existing action from GitHub.
 * Installs `node`.
 * Installs app dependencies, using `npm ci`.
 * Runs the command `npm test` followed by `npm run build`, we can use our preferred libraries like *jest* and *webpack*; it executes the test *script* mentioned in `package.json`.

If there are any errors or build failures, then it shows up in the log in the actions tab of our repository by a green check or a red 'x'.

![greencheck img](/engineering-education/github-actions/greencheck.png)

### Continuous Deployment
Once you have a valid pull request and when we merge that code into the master branch, we also want to deploy the app to production. [Continuous deployment](https://www.atlassian.com/continuous-delivery/continuous-deployment) is about pushing that code out to production.

If your website is hosted on GitHub, then you can use the `github-pages` action. However, if a third-party provider hosts your app, then they provide options like [SFTP](https://www.digitalocean.com/community/tutorials/how-to-use-sftp-to-securely-transfer-files-with-a-remote-server), [FTP](https://github.com/marketplace/actions/ftp-deploy), and [SSH](https://github.com/marketplace/actions/ssh-deploy). This is fine when we are doing it manually, but not so easy when we are using a CD tool. We will have to share a secret token with GitHub for the CD process.

Let's see how to deploy to [firebase](http://firebase.google.com/):
```
    firebase init
    firebase deploy --only-hosting
Authenticate

    firebase login:ci
```

This provides a secret token which we can share with GitHub
Go to the settings tab on the GitHub repository. Create a new `FIREBASE_TOKEN` secret.

![secret img](/engineering-education/github-actions/secret.png)

```yml
name: Firebase CD

on:
    push:
        branches: [ master ]

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@master
            - uses: action/setup-node@master
              with:
              node-version: 12
            - run: npm ci
            - run: npm run build
            - uses: w9jds/firebase-action@master
              with:
                args: deploy --only-hosting
                env:
                  FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}        
```
The above action deploys our app to firebase whenever we push changes to the master branch. Above `w9jds/firebase-action@master` is a third-party action published on GitHub.

### Conclusion
There are several CI tools you can use such as [Jenkins](https://www.jenkins.io/), [Travis CI](https://travis-ci.org/) and [Circle Ci](https://circleci.com/). The main difference between Jenkins and GitHub actions is that Jenkins is a self-hosted automation server whereas GitHub actions is a [software as a service (SaaS)](https://en.wikipedia.org/wiki/Software_as_a_service). GitHub Actions is free for open source repositories and has a free limit for private repositories. GitHub Actions integrates CI into the GitHub ecosystem. Using an external CI tool like Travis is useful when you want to move your repository to another Git platform without rewriting the entire CI process.

* [Guide for migrating from Jenkins to Github Actions](https://docs.github.com/en/actions/migrating-to-github-actions/migrating-from-jenkins-to-github-actions)

There are other cool things you can do with GitHub Actions, like publishing to NPM package; we can automatically publish new *versions* of the code to npm. In GitHub marketplace, we see *Actions* and *Apps*. Actions are reusable chunks of code for your own workflows, whereas Apps are fully-managed integrations that don't require any code. The nice thing about apps is that they can be installed with a few clicks, and they can be used across multiple repositories. So, when you are automating with GitHub Actions, it's a good idea to ask yourself if you want a fully built app or to build your own workflow. **Check out the actions or apps offered in [GitHub Marketplace](https://github.com/marketplace/)**.

## References and Resources
* [GitHub Docs](https://docs.github.com/en/actions)
* [Video Tutorial](https://www.youtube.com/watch?v=eB0nUzAI7M8)
* [https://medium.com/better-programming/github-actions-the-what-why-and-how-3868d5a86292](https://medium.com/better-programming/github-actions-the-what-why-and-how-3868d5a86292)
* [https://docs.github.com/en/actions/getting-started-with-github-actions/about-github-actions](https://docs.github.com/en/actions/getting-started-with-github-actions/about-github-actions)
* [https://dev.to/thbe/ci-cd-with-github-actions-iji](https://dev.to/thbe/ci-cd-with-github-actions-iji)
