Security is everyone's concern. The safety of the code you use is important regardless of you being a beginner or expert in Node.js app development. It is an even a professional habit that developers acquire are they grow their experience. Makining sure open-source codes are secure is one of the fundermental mission of NPM, with approaches to security at scale to empower NPM users to develop secure code. 

With NPM, you do not need to worry about the safety of your code. NPM provides vulnerability-scanning tools that are built-in in your Node.js workflow. These tools are faster and they automatically review every install request you make, check the Node Security Platform vulnerably database, and warn you if you try to us unsafe codes. It even analyzes your dependencies trees to check specifically what has security issues and recommend a replacement or fix the issues automatically. 

In this article, we will have a look at NPM registry survey statistics, check other developers' responses to Node.js security practices and identify which tools you need to assess your open-source code safely.

## NPM registry download statistics

On September 29th, 2019, NPM marked 10 years of its existence. NPM has been used to develop every kind of application ie Web apps, mobile applications, Servers, Internet of things (IoT)/robotic, desktop applications and native mobile applications. This has greatly contributed to the NPM registry popularity. The number of libraries available in the NPM registry influences most developers to choose JavaScript.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/npm-influnce-statistics.png)

[*Image Source*](https://medium.com/npm-inc/this-year-in-javascript-2018-in-review-and-npms-predictions-for-2019-3a3d7e5298ef#:~:text=npm%20has%20over%2010%20million,packages%20of%20open%20source%20JavaScript.)

In June 2019, MPM crossed a million-libraries mark. With over 1.3 million libraries currently available, NPM registry is now the largest single collection of open source libraries in the world with more than 12 million developers.

On April 23, 2018, NPM users downloaded five billion packages within the last 7 days of that date. On this day 4 years ago, that figure was 50 million, this means 10,000% growth. The average IP downloads were 2200 packages per month.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/weekly-downloads.jpg)

[*Image Source*](https://twitter.com/seldo/status/988477780441481217)

Up to now, NPM has recorded tremendous growth with over 20 billion average weekly downloads. As am writing this article, the NPM registry recorded 88,820,279,735 libraries downloads last month. NPM registry is now serving around 125 billion requests at a whopping 6 Petabytes per month. [Ahmad Nassri](https://blog.npmjs.org/post/615388323067854848/so-long-and-thanks-for-all-the-packages).


This statistical testaments, explain the resilience and commitment of NPM to keep the world's largest community safe by building a chain of fast reliable tools to help you perceive the safety of JavaScript code you write and share as well as the open-source code to ensure it is safe before you go live.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/popular-languages.PNG)

[*Image Source*](https://insights.stackoverflow.com/survey/2018#technology-_-programming-scripting-and-markup-languages)

## Dev statistics response on open-source JavaScript libraries and code security practices

The following survey findings were carried out by NPM in partnership with the Node.js Foundation and the JS Foundation with more than 16,000 Javascript/NPM users getting involved. The main aim of this survey is to find out how Javascript developers understand security in relation to the open-source code they use and code they write. These findings were documented on April 10, 2018. Let us have a quick snippet of this survey report primarily based on on some the questions the respondents were asked. Read on the [Methodology](https://medium.com/npm-inc/javascript-survey-methodology-1f2290ffc3db) behind this survey.

**NOTE :** The following questions were picked directly from this [survey questionnaires](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b).

### 1. Are you concerned with whether the open-source code you use is secure? [survey questionnaire](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b).

In this survey, 97% of the respondents used the open-source code. In addition, it turned out 77% of them were worried about the safety of open-source code.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/overall-concerned.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

We now have a clear image that most developers a greatly concerned about code security. Interestingly, 19% of the respondent have 10+ years of experience in using JavaScript. Moreover, out of this 81% were concerned about open-source code security.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/concerned-experien-based.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

This concludes that, the more time you utilize JavaScript the more you become concerned about ensuring that the code you use is safe. In short, the attitude to security changes with experience.

## 2. Are you satisfied with the available methods to evaluate the safeness and the quality of open source code?

It is interesting to note that more than half of JavaScript developers are not convinced with the existing tools for analyzing the security and quality of open-source code, which is very alarming.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/oss-noncerned.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

What about we separate the response dependent on the concern of open source code or their own code (the code you write).
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/opensource-downcode.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

87% are concerned with the security of their own code while 77% had the same on open source code. These figures conclude that a great number of JavaScript developers are concerned about security, be it open source or the code you write.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/satisfied.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

The respondents entrust open source code over their own written code, this is because open-source codes have available and ready tools for making sure the code is secure. Could that be majority of Javascript developers are more confident with open source code above the code they write?

### 3. Which tools and practices do you use to ensure security in your application?

These survey results were divided into two groups, least experienced (>1 year) and most experienced (10 plus years).
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/least-most-experienced.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

From these results experienced groups were:
-   More likely to use testing frameworks.
-   More likely to use linter.
-   More probably to do code review.
-   More likely to carry out external audits of the code.
-   More probably to participate in automated scans to find security vulnerabilities in the code they are using.

If all answers are combined, a measure of how many developers uses some form of security practices on codes depending on experience will be:
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/level-of-experience.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

### Conclusion
-   The best code security practices are common to experienced developers. These practices include code review, linting and testing. 
-  Practices such as testing, linting, code surveys, and security examines are indicators  of a polished developer.
-   Solid greater part of this developers are more likely concerned with the safety of the code they write as well as the open-source code they use.
-   Developers are more confidence with the safeness of open source code while in doubt with the security of the code they write.
-   Most developers are not contented with the alternatives available/accessible to them to secure code.

## Using `npm@6` for code, NPM registry, and dependency trees security

`npm@6` is a major update to NPM. It includes inbuilt security feature for open source code. `npm@6` allow NPM registry users to automatically receive warnings if you attempt to try to use unsafe code. NPM automatically reviews any install request you make against the Node Security Platform database and returns an alert if the code have a vulnerability. The command `npm audit` allows you to deeply recursively analyze your dependencies trees to identify any unsafe library and
recommend a replacement or upgrade to a new version. With `npm@6`, you can run `npm audit fix`, to automatically fix the recommendations made on your dependencies trees audit. If you are using the older version `npm@5`, just type `npm i -g npm@latest` to update to `npm@6` and take the advantage powerful built-in automation for your workflow, along with other enhancements and features.

### Features of `npm@6`

**1. Speed**

`npm@6` speed range between 4x to 17x faster compared with `npm@4`. What this means is that, as a developer, the speed is not just to make exiting things faster, but allow you to scale your projects beyond what they can do.

**2. CI optimization**

As a developer, you spend much less time between pushing a new build and continuing deployment, iterating, and sharing changes becomes even faster. This means continuous integration (CI) and continuous deployment (CD) within your workflow with an additional 2x to 3x faster.

**3. Automatic resolution and `package-lock.json` lock file conflicts.**

`package-lock.json` is a generated file. It saves information about your node dependencies you use. `package-lock.json` file is committed to your Git repository.

**`package-lock.json` has the following advantages**

-   Increased reproducibility across teams, reduced network overhead during installation.
-   It Make it easier to debug an issue in your app. 
-   With `npm@6`, your lock file is more stable across the teams on similar platforms as well as across operating systems unlike the later which had unexpected changes and platform differences.

Use `npm install --package-lock-only` to create a lock file without having to install into `node_modules/`.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/package-lockfile.png)

[*Image Source*](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you)

`npm@6` go to an extent of automatically resolving `package-lock.json` conflicts if you happen to run npm install during a conflicted state. [Check to get started with `package-lock.json`](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you). To make this even more flexible and clear, `npm@6` have unleashed `npm-merge-drive`, which allows you do all the rebasing and merging and other backflips. To start using `npm-merge-drive` run `$ npx npm-merge-driver install --g` and all your future merge and rebase conflicts in your git repository will be resolved in the background. [Check to get started with `npm-merge-drive`](https://www.npmjs.com/package/npm-merge-driver).

As you may have noticed, we have introduced
[`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
and we need to know what it is and what it does. [npx](https://www.npmjs.com/package/npx) is an NPM package runner and it
helps you to solve specific problems. With npx, it is easier and smooth to work with npm-based CLI tools.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/npx.gif)

[*Image Source*](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you)

### Using [`npx`](https://www.npmjs.com/package/npx) has the following advantages
-   You can run project-local binaries with it. That means you don't need to install things like `grunt-cli`, `gulp`, `bower`, and `tsc globally`---you can install them as `devDependencies` and use `npx` to run the local versions without hassle (for example, `$ npm i -D standard && npx standard`).  [Npm blog post](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you).
-   You can do a one-off, temporary installs of command-line utilities that you run rarely, such as generators: `$ npx create-react-app`. [Npm blog post](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you).
-   You can easily try different versions of these tools with a single install if you need to compare them: `$ npx standard@8 && npx standard@10`. [Npm blog post](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you).
-   You can even install the [shell
    auto-fallback](https://t.umblr.com/redirect?z=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnpx%23shell-auto-fallback&t=MTVkODRiYmJkOWQ0ZTQxMjYwZGU3M2U0OGFiMDAwZTQ3YjAzMjc5YyxSQlc3OFpFUg%3D%3D&b=t%3AnXsLs1P4AptPf1fBr_nFxw&p=https%3A%2F%2Fblog.npmjs.org%2Fpost%2F173240511455%2Fthe-new-npm-cli-a-year-in-review-or-what-you&m=1&ts=1598809717) to
    not even have to write `$ npx...` in many cases. Refer to [Npm blog post](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you) Or [npx](https://www.npmjs.com/package/npx).

npx is a great tool that you should try in your daily workflow.

**4. Real-time notifications**

`npm@6` allows you to configure your CLI to receive [real-time registry and package changes notifications](https://blog.npmjs.org/post/145260155635/introducing-hooks-get-notifications-of-npm)
as they happen. Each time a package has changes an HTTP POST payload is sent to the URL you have configured a hook. Hooks are added to follow a specific package for example if you want to use `Express` you set up a hook for `Express`.

There is a lot of very useful information on `npm@6`, more than what we can discuss in this article. Consider getting started with `npm@6` and you will be excited to have a faster and safer tool to build amazing applications. `npm@6` have amazing overall security of the NPM ecosystem.

## Conclusion

Since security is everyone's responsibility, we all need to step in together to make a huge step forward to ensure the safety of any code we use in our daily workflow, making sure that the world's larges community is even safer. I wish all NPM users the best of luck as they continue to build fast, safe and amazing things.

### NOTE:

1. The main objective of the survey was to learn more about the
    JavaScript community and how they interact with NPM concerning code security ethics practices. You may consider looking at the [survey results](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)
    in deep and the [methodology
    used.](https://medium.com/npm-inc/javascript-survey-methodology-1f2290ffc3db)

2. The NPM downloads statistics are naive by design. They are counts of HTTP 200 responses that are served tarball files ie packages. These numbers include:
   -   Automated build servers
   -   Downloads by mirrors.
   -   Robots packages downloads for analysis.

The counts are much larger than the people who just typed `npm install(package)`. This means there some mitigation factors such as.

   -   If you had installed a package before: the package usually get installed from your local npm cache, so this is not counted.
   -   Build servers usually do not redownload a package they have already used before. Builds that take place in disposable VMs or Docker instances are available in the npm cache of the server.
   -   Mirrors downloads a specified version of a package one time. They are smart and do not redownload a package they have already seen before.

[Check more on how npm download counts works](https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts)
