---
layout: engineering-education
status: publish
published: true
url: /engineering-education/npm-registry-opensource-code-security-with-npm6/
title: Open-source packages & Code Security using NPM
description: This article covers the NPM registry, open-source packages, and code security using npm6. NPM provides vulnerability-scanning tools that are built-in your Node.js workflow.
author: joseph-chege
date: 2020-09-14T00:00:00-13:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/npm-registry-opensource-code-security-with-npm6/hero.jpg
    alt: npm6 Node.js code Security
---
Security is a huge concern for everyone. The safety of the code you use is important regardless of you being a beginner or expert in Node.js app development. It is even a professional habit that developers acquire as they grow with experience. Making sure open-source codes are secure is one of the fundamental mission of NPM, with approaches to security at scale to empower NPM users to develop secure code.
<!--more-->

With NPM(short for Node Package Manager), you do not need to worry about the safety of your code. NPM provides vulnerability-scanning tools that are built-in your Node.js workflow. These tools are faster and they automatically review every install request you make, and warns you if you try to use unsafe codes. It even analyzes your dependencies trees to check specifically what has security issues and recommend a replacement or fix the issues automatically.

In this article, we will have a look at NPM registry survey statistics, check other developers' responses to Node.js security practices and identify which tools you need to assess your open-source code safely.

### NPM registry download statistics
On [September 29th, 2019](https://blog.npmjs.org/post/615388323067854848/so-long-and-thanks-for-all-the-packages), NPM marked its 10 years of existence. NPM has been used to develop every kind of application i.e. web apps, mobile applications, servers, Internet of things (IoT)/robotic, desktop applications and native mobile applications. This has greatly contributed to the NPM registry popularity. The number of libraries available in the NPM registry influences most developers to choose JavaScript.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/npm-influnce-statistics.png)

[*Image Source*](https://medium.com/npm-inc/this-year-in-javascript-2018-in-review-and-npms-predictions-for-2019-3a3d7e5298ef#:~:text=npm%20has%20over%2010%20million,packages%20of%20open%20source%20JavaScript.)

On [June 2019](https://twitter.com/npmjs/status/1135968692062130176), NPM crossed a million-libraries mark. With over 1.3 million libraries currently available, NPM registry is now the largest single collection of open source libraries in the world with more than 12 million developers.

On [April 23, 2018](https://twitter.com/seldo/status/988477780441481217), NPM users downloaded five billion packages within the last 7 days of that date. On this day 4 years ago, that figure was 50 million, this means 10,000% growth. The average IP downloads were 2200 packages per month.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/weekly-downloads.jpg)

[*Image Source*](https://twitter.com/seldo/status/988477780441481217)

Up to now, NPM has recorded tremendous growth with over 20 billion average weekly downloads. As am writing this article, the NPM registry recorded 88,820,279,735 libraries downloads last month. NPM registry is now serving around 125 billion requests at a whopping [6 Petabytes per month](https://blog.npmjs.org/post/615388323067854848/so-long-and-thanks-for-all-the-packages).

These statistical testimonies explains the resilience and commitment of NPM to keep the world's largest community safe by building a chain of fast reliable tools to ensure every JavaScript line of code you write as well as the open-source code you use is safe before you go live.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/popular-languages.PNG)

[*Image Source*](https://insights.stackoverflow.com/survey/2018#technology-_-programming-scripting-and-markup-languages)

### Dev statistics response on open-source JavaScript
The following survey findings were carried out by NPM in partnership with the Node.js Foundation and the JS Foundation with more than 16,000 JavaScript/NPM users getting involved. The main aim of this survey was to find out how JavaScript developers understand security in relation to the open-source code they use and code they write. These findings were documented on [April 10, 2018](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b). Let us have a quick snippet of this survey report primarily based on some the questions the respondents were asked. Read on the [methodology](https://medium.com/npm-inc/javascript-survey-methodology-1f2290ffc3db) behind this survey.

**NOTE:** The following questions were picked directly from this [survey questionnaires](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b).

#### 1. Are you concerned with whether the open-source code you use is [secure?](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b).

In this survey, 97% of the respondents used the open-source code. In addition, it turned out 77% of them were worried about the safety of open-source code.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/overall-concerned.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

We now have a clear image that most developers are greatly concerned about code security. Interestingly, 19% of the respondent have 10+ years of experience in using JavaScript. Moreover, out of this 81% were concerned about open-source code security.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/concerned-experien-based.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

This concludes that, the more time you utilize JavaScript the more you become concerned about ensuring that the code you use is safe. In short, the attitude to security changes with experience.

#### 2. Are you satisfied with the available methods to evaluate the safeness and the quality of open source code?

It is interesting to note that more than half of the JavaScript developers are not convinced with the existing tools for analyzing the security and quality of open-source code, which is very alarming.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/oss-noncerned.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

Let's separate this responses and compare the security concern between open source code and the code you write.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/opensource-downcode.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

87% are concerned with the security of their own code while 77% had the same on open source code. These figures conclude that a great number of JavaScript developers are concerned about security, be it open source or the code they write themselves.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/satisfied.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

The respondents entrust open source code over their own written code, this is because open-source codes have available and ready tools to make sure the code is secure. Could it be that the majority of JavaScript developers are more confident with open source code over the code they write?

#### 3. Which tools and practices do you use to ensure security in your application?
These survey results were divided into two groups, least experienced (>1 year) and most experienced (10 plus years).

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/least-most-experienced.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

From these results experienced groups were:
-   More likely to use testing frameworks.
-   More likely to use linter.
-   More probable to do code review.
-   More likely to carry out external audits of the code.
-   More probable to participate in automated scans to find security vulnerabilities in the code they are using.

If all answers are combined, a measure of how many developers uses some form of security practices on codes depending on experience will be:

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/level-of-experience.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

-   The best code security practices are common to experienced developers. These practices include code review, linting, and testing.
-  Practices such as testing, linting, code surveys, and security exams are indicators of a polished developer.
-   Most developers are concerned with the safeness of the code they write as well as the open-source code they use.
-   Developers are more confident with the safeness of open source code while having doubt with the security of the code they write themselves.
-   Most developers are not content with the alternatives available/accessible for them to secure their code.

### Using `npm@6` for code, NPM registry, and dependency trees security
`npm@6` is a major update to NPM. It includes built-in security features for open source code. `npm@6` allows NPM registry users to automatically receive warnings if they attempt to try to use unsafe code. NPM automatically reviews any install requests you make against the Node.js Security Platform database and returns an alert if the code has a vulnerability.

The command `npm audit` allows you to deeply recursively analyze your dependencies trees to identify any unsafe library and recommend a replacement or upgrade to a newer version. With `npm@6`, you can run `npm audit fix`, to automatically fix the recommendations made on your dependencies trees audit. If you are using the older version `npm@5`, just type `npm i -g npm@latest` to update to `npm@6` and take full advantage of this powerful built-in automation tool for your workflow, along with other enhancements and features.

### Features of `npm@6`
**1. Speed**

`npm@6` speed range between 4x to 17x faster compared with `npm@4`. What this means is that, as a developer, the speed is not just to make exciting things faster, but it allows you to scale your projects beyond what they can do.

**2. CI optimization**

As a developer, you will spend much less time between pushing a new build, continuing deployment, iterating, and sharing changes. This means continuous integration (CI) and continuous deployment (CD) within your workflow with an additional 2x to 3x faster speed.

**3. Automatic resolution and `package-lock.json` lock file conflicts.**

`package-lock.json` is a generated file. It saves information about your Node.js dependencies you use. `package-lock.json` file is committed to your Git repository.

**`package-lock.json` has the following advantages**
-   Increased reproducibility across teams.
-   Reduced network overhead during installation.
-   It makes it easier to debug an issue in your app.
-   With `npm@6`, your lock file is more stable across the teams on similar platforms as well as across operating systems unlike the former which had unexpected changes and platform differences.

Use `npm install --package-lock-only` to create a lock file without having to install into `node_modules/`.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/package-lockfile.png)

[*Image Source*](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you)

`npm@6` goes to an extent of automatically resolving `package-lock.json` conflicts if you happen to run npm install during a conflicted state. [Check to get started with `package-lock.json`](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you). To make this even more flexible and clear, `npm@6` has unleashed `npm-merge-drive`, which allows you do all the rebasing and merging and other backflips.

To start using `npm-merge-drive` run `$ npx npm-merge-driver install --g` and all your future merge and rebase conflicts in your git repository will be resolved in the background. [Check to get started with `npm-merge-drive`](https://www.npmjs.com/package/npm-merge-driver).

As you may have noticed, we have introduced [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) and we need to know what it is and what it does. [Npx](https://www.npmjs.com/package/npx) is an NPM package runner and it helps you to solve specific problems. With npx, it is easier and smoother to work with npm-based CLI tools.

![](/engineering-education/npm-registry-opensource-code-security-with-npm6/npx.gif)

[*Image Source*](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you)

### Using [`npx`](https://www.npmjs.com/package/npx) has the following advantages
-   You can run project-local binaries with it. This means you don't need to install things like `grunt-cli`, `gulp`, `bower`, and `tsc globally`---you can install them as `devDependencies` and use `npx` to run the local versions [without hassle](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you) (for example, `$ npm i -D standard && npx standard`).

For more information go to this [npm blog post](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you).

-   You can do a one-off, temporary installs of command-line utilities that are rarely ran, [such as generators](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you):

 `$ npx create-react-app`.

-   You can easily try different versions of these tools with a single install if you need to [compare them](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you): 

`$ npx standard@8 && npx standard@10`.

-   You can even install the [shell auto-fallback](https://www.npmjs.com/package/npx#shell-auto-fallback) to not even have to write `$ npx...` in many cases.

Refer to [Npm blog post](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you) or [npx](https://www.npmjs.com/package/npx).

Npx is a great tool that you should try in your daily workflow.

**4. Real-time notifications**
`npm@6` allows you to configure your CLI to receive [real-time registry and package changes notifications](https://blog.npmjs.org/post/145260155635/introducing-hooks-get-notifications-of-npm)
as they happen. Each time a package has changes an HTTP POST payload is sent to the URL you have configured with a hook. Hooks are added to follow a specific package for example if you want to use `Express` you set up a hook for `Express`.

There is a lot of very useful information on `npm@6`, more than what we have discussed in this article. Consider getting started with `npm@6` and you will be excited to have a faster and safer tool to build amazing applications with.

`npm@6` has an amazing overall security of the NPM ecosystem.

### Conclusion
1. The main objective of the survey was to learn more about the JavaScript community and how they interact with NPM concerning code security ethics practices. You may consider looking at the [survey results](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b) deeper and the [methodologies used](https://medium.com/npm-inc/javascript-survey-methodology-1f2290ffc3db).

2. The NPM downloads statistics are native by design. They are counts of HTTP 200 responses that are served tarball files i.e. packages. These numbers include:
   -   Automated build servers
   -   Downloads by mirrors.
   -   Robots packages downloads for analysis.

3. The NPM registry counts are much larger than the people who just typed `npm install(package)`. This means there some mitigation factors such as.
   -   If you had installed a package before: the package usually get installed from your local npm cache, so this is not counted.
   -   Build servers usually do not redownload a package they have already used before. Builds that take place in disposable VMs or Docker instances are available in the npm cache of the server.
   -   Mirror downloads a specified version of a package one time. They are smart and do not redownload a package they have already seen before.

Since security is everyone's responsibility, we all need to work together to make a huge step forward to ensure the safety of any code we use in our daily workflow, making sure that the world's largest community is even safer. I wish all NPM users the best of luck as they continue to build fast, safe, and amazing things.

### Additional Resources
Check more on how [Npm download counts work](https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts)
