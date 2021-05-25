---
layout: engineering-education
status: publish
published: true
url: /npm-vs-yarn-which-one-to-choose/
title: Choosing Between NPM and Yarn
description: This article explains the key features and differences of NPM and Yarn. It will also act as a guideline when it comes to working with different package managers.
author: joseph-chege
date: 2021-03-09T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/npm-vs-yarn-which-one-to-choose/hero.png
    alt: NPM vs Yarn which one to choose
---
[Node.js](https://nodejs.dev/learn) provides an open-source and cross-platform runtime environment for executing JavaScript code outside a browser. Node.js is ideal for building highly scalable data-intensive and real-time back-end services (APIs) that power our client applications. 
<!--more-->
It allows you to create dynamic web pages written in JavaScript. These include video streaming sites, single-page applications, online chatting applications, etc. These pages are executed on the server before being sent to a browser. Node.js has gained tremendous growth among the JavaScript community. 

Popular enterprise companies like Netflix, Uber, and eBay use Node.js to develop their applications. One of the reasons for Node.js popularity is the availability of diverse and open source packages and libraries. 

The popular ones include Express.js, Lodash, AsyncJS, Meteor, Sails, and others. These frameworks are built for Node.js. They help ease the entire web development pipeline. However, to use them in your Node.js projects, you need a `package manager`.

A package manager enables you to install, uninstall, manage packages' dependencies and binaries, as well as update package versioning. There are two major players here, a [Node package manager](https://docs.npmjs.com/) (NPM) and [Yarn](https://yarnpkg.com/). 

They automate the process of installing, upgrading, configuring or removing Node.js packages. This guide will help you learn the difference between NPM and Yarn.

### Use of the Package manager
- It is used to download code packages for your apps. These packages are standalone tools that you can use right away within your projects.
- You can manage multiple versions of packages and dependencies.
- You can update your applications easily when the underlying package is updated.

### An overview
Yarn was developed in [October 2016](https://engineering.fb.com/2016/10/11/web/yarn-a-new-package-manager-for-javascript/). Initially, Yarn was termed as the NPM replacement utility for projects using Node.js packages. Yarn was made to cover NPM cons and misfalls as it's faster, more stable, and more secure. 

It also provided a lock file (`yarn.lock`) that ensured package versioning stability on the same project across different computers. Since then, NPM has coped well with `Yarn` competition and maintained its top package manager position. It has made many progressive updates to fasten the package's installation and stabilize package dependencies. 

NPM has improved its security. It has tools that help you to audit your dependency trees. Before the updates, in order to generate a lock file for your dependency, you had to run `npm shrinkwrap`. 

With the latest updates, NPM automatically creates a lock file (`package-lock.json`), as you would when using Yarn. Basically, Yarn didn't stand to replace NPM fully. Nevertheless, what you can do with NPM can be achieved with Yarn as well.

As a developer, you need to choose which package manager suits you. Let's briefly discuss some of the features and functionalities between the two.

### What is NPM?
NPM stands for the Node Package Manager. 

NPM does two things:
1. It serves as an [online platform](/npm-packages/). An NPM registry where people, including you, can create, upload, publish, and share tools (Node.js packages). These packages are open source. Everyone can search and use the tools published on this online platform (NPM registry).

2. It is the [command-line tool](/beginner-guide-to-npm/). It helps you interact with the online platform I just mentioned. A few things you can do with the command-line tool include installing and uninstalling packages.

### What is Yarn?
Yarn is a JavaScript package manager created by Facebook. Yarn stands for Yet Another Resource Negotiator. It provides similar functionalities as NPM. It is an alternative to NPM when installing, uninstalling, and managing package dependencies from the NPM registry or GitHub repositories.

### Installation
NPM is bundled with [Node.js Runtime](https://nodejs.org/en/). It is Node.js Default Package Manager. In other words, when you install [Node.js](https://nodejs.org/en/download/), NPM gets installed.

To install a package using NPM, you use the syntax below.

`npm install <package name>`. 

The `package name` can be any package you want to use in your project. For example, to install Express run `npm install express`.

Some more distinct NPM package installation include:

- `npm installs <package name> -- global`. These are packages you install into your computer system's local path and not your project location. Such packages can be used or accessed by any project you create.

- `npm install <package name> -dev`. The flag `-dev` allows you to install any package not required by your work to run. They are mainly used for development purposes such as testing, size bundling, transpiring code, etc.

Check this [beginner guide to NPM](/beginner-guide-to-npm/) to learn more about NPM and how to use it to manage your project NPM registries.

On the other hand, to use Yarn, you have to [install it separately](https://yarnpkg.com/getting-started/install) by yourself. You should install [Node.js](https://nodejs.org/en/download/) to use Yarn. 

To install Yarn run this command, `npm install yarn -- global`. This will install Yarn globally so that you can run it from any directory you'd like.

Yarn syntax is a little different. To install a package with Yarn, use the following command.

`yarn add <package name>`. 

For example, you would use `yarn add Express` to install express into your project.

Below is a summary of some of the commonly used NPM vs Yarn Commands.

![NPM and Yarn commands](/engineering-education/npm-vs-yarn-which-one-to-choose/npm-vs-yarn-commands.jpg)

[***Image Source***](https://www.digitalocean.com/community/tutorials/nodejs-npm-yarn-cheatsheet)

Some identical commands include:

![similar NPM commands](/engineering-education/npm-vs-yarn-which-one-to-choose/similar-npm-vs-yarn-commands.jpg)

[***Image Source***](https://www.digitalocean.com/community/tutorials/nodejs-npm-yarn-cheatsheet)

> Make sure you run the package installation command directly from your project directory.

### The speed
One of the main difference between NPM and Yarn is how they handle the package installation process. Yarn installs packages in parallel. Yarn is optimized to fetch and install multiple packages simultaneously. If you are installing five packages, and two are taking a long time to install, Yarn will go over and install the packages side by side. 

On the other hand, NPM would install each package one at a time. It fetches every package independently. This means that if you install a list of five packages, NPM will perform a serial installation process. Parallel installation is one of the reasons why Yarn beats NPM in a speed race.

When you install a package, these two package managers save [offline cache](https://yarnpkg.com/features/offline-cache). You can then install a package you installed before from the memory cache even when you are offline.

Yarn has a well-managed offline cache. You install an offline package with Zero times, a concept called [`Zero installs`](https://yarnpkg.com/features/zero-installs). 

`Zero installs` stores the cache in your project directory. When you push commands such as `yarn install` or `yarn add <package name>`, Yarn will create a `.pnp.cjs` file. This file consists of a dependency hierarchy used by Node.js to load your project packages. Thus, you can access them almost at `zero time`.

>Note: `Zero install` Workflow is optional. You can still stick on [global cache](https://yarnpkg.com/configuration/yarnrc#enableGlobalCache) for your projects.

### The lock file generation
A lock file is a list that contains all of the dependencies required for your project to function. This file "locks down" your dependency versions. That way whenever someone else runs `yarn install` or `npm install`, they'll receive the exact dependencies versions listed out in the lock file. This ensures that your team has the identical package versions as you do. It also helps prevent bugs that can appear due to the introduction of updated, untested package versions.

### Security
You download stuff from the NPM registry without necessarily knowing what you're downloading. However, these package managers perform a security check on each install.

Yarn checks behind the scenes and make sure that you're not downloading rogue scripts or stuff that can conflict with your project dependencies. Security is one of Yarn's core features.

In the past, NPM was very fragile and didn't provide a secure installation process. This allowed other packages to get included on the fly, resulting in possible security systems vulnerabilities. It has since then greatly improved on the security checks with its recent updates.

### Checksum vs Secure Hash Algorithm (SHA-512)
[Checksum](https://en.wikipedia.org/wiki/Checksum) is a mathematical error detection algorithm. It is a block of data derived from the original data for error detection when transferring data from one computer to another. It checks any error that may have been introduced during the data transmission or storage. This helps ensure data integrity.

Before the data is transferred, the sender will create a message that calculates a checksum. This message (packet) will be attached to the original data. 

The receiver will then calculate a different checksum to validate the data sent. If the two checksum values are equal, then no error is detected, and the data is accepted; otherwise, the data is rejected.

>Check this guide to learn [how the Checksum is computed](https://www.geeksforgeeks.org/calculation-of-tcp-checksum/).

Yarn uses Checksum to ensure data integrity. When a package is being installed, and about to be executed, Yarn will perform a checksum integrity check to detect any malicious information being transferred to your computer.

NPM uses `SHA-512` to check the integrity of the packages you install. NPM stores `SHA-512` strings of every installed package in the `package-lock.json` file, as shown below.

```bash
"lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
}
```

NPM will use this integrity `SHA-512` key to perform an integrity check in each package block in the lock file.

NPM also audits every package during installation and informs you of possible vulnerabilities.

![NPM Package Audit](/engineering-education/npm-vs-yarn-which-one-to-choose/npm-package-audit.jpg)

You can again run `npm audit` to check your entire dependency trees. If any vulnerabilities are found, NPM will give you a security recommendation.

![NPM Audit Report](/engineering-education/npm-vs-yarn-which-one-to-choose/npm-audit-report.jpg)

To fix such package vulnerabilities, run `npm audit fix`, and your dependency trees will be fixed.

![audit fix](/engineering-education/npm-vs-yarn-which-one-to-choose/npm-audit-fix.jpg)

### Ease of use
One thing to consider before choosing a package manager would be the to see which interface is user friendly. This includes how the command line terminal looks after running commands such as `npm install` or `yarn add`.

NPM and Yarn have different command-line interfaces. They are both user-friendly and have a good user experience. This is evident when using a command such as `npm init` and `yarn init`. They both have an interactive guide that helps users to initialize a Node.js project.

### NPM vs Yarn new updates
Yarn and NPM are continually updating to improve on their current features, as well as adding new features such as `NPX` and `PnP`.

### NPX
`NPX` stands for Node Package Executor. It is a new addition to NPM version `5.2.0 or higher`. [NPX](https://www.npmjs.com/package/npx) helps you to execute one-off commands. With NPX, you can execute packages from the NPM registry without installing them to your project dependencies. 

There are more features that you can benefit from using NPX. Check this [guide](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner.html) to learn more about [NPX](https://www.npmjs.com/package/npx).

### Yarn2 (Berry)
Yarn introduced [Yarn2](https://dev.to/arcanis/introducing-yarn-2-4eh1), nicknamed Berry. This new Yarn version has exciting [features](https://yarnpkg.com/features) such as [Plug'n'Play](https://yarnpkg.com/features/pnp/), Constraints, Offline installation, Zero install, Workspaces, and Yarn Dlx (the new Yarn NPX). 

The most significant additions here are:
1. Plug'n'Play - This is an alternative installation strategy. Instead of generating a `node_modules` directory and leaving the resolution to Node.js, Plug'n'Play generates a single `pnp.js` file and lets Yarn tell us where to find our packages.

This means
- No more `node_modules`.
- Reduced package installation time up to 70%.
- Plug'n'Play will warn you when you forget to list your dependency.
- Faster project booting time.

Check this [guide](https://yarnpkg.com/features/pnp/) to learn more about Plug'n'Play.

2. Constraints - [Constraints](https://yarnpkg.com/features/constraints) offer a way to specify generic rules using prologue (a declarative programming language) to manage the dependencies in your project. This allows you to write rules and ensure that there are no conflicting dependencies in your repository.

3. Improved Workspaces - [Workspaces](https://yarnpkg.com/features/workspaces) allows you to create a `mono` repository to manage the dependencies across multiple projects. This allows multiple projects to cross-reference each other. Changes applied to one project repository are applied to the others.

Yarn2 differs a lot from [Yarn1](https://classic.yarnpkg.com/lang/en/). Check this [migration guide](https://next.yarnpkg.com/getting-started/migration) on how to switch from Yarn1 to Yarn2.

### Conclusion
These two package managers are great at managing and maintaining your project dependencies tree. They are reliable, and they have a great and supportive JavaScript community. With the added features, NPM is almost identical to Yarn. 

There are not many comparisons to be drawn between the two. You can use Yarn pretty much in every case that you would NPM. It is meant to be a drop-in replacement. 

The choice between the two may depend on personal preference, performance (package installations speed), community support, or ease of use.

Hope you have found this article helpful when making a choice between Yarn and NPM. 

Happy coding!

### Additional resources
- [An Absolute Beginner Guide to Node Package Manager](/beginner-guide-to-npm/)
- [Create and Deploy NPM Packages](/npm-packages/)
- [Comparing NPM (Node Package Manager) and NPX (Node Package Executor)](/npm-vs-npx/)
- [Open-source packages & Code Security using NPM](/npm-registry-opensource-code-security-with-npm6/)
- [Why is Node.js wildly popular among developers?](/why-node-js-is-popular)

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)
