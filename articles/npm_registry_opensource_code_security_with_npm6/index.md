Security is everyone's concern. The safety of the code you use is
important regardless of you being a beginner or expert in Node.js app development. It is an even professional habit that developers acquire are they grow their experience. Security of open-source code is core to NPM's mission with approaches to security at scale to empower NPM users to develop secure code. With NPM, you do not need to worry about the safety of your code. NPM provides vulnerability-scanning tools that are
built-in in your Node.js workflow. These tools are faster and they automatically review every install request you make, check the Node Security Platform vulnerably database, and warn you if you try to us unsafe codes. It even analyzes your dependencies trees to check specifically what has security issues and recommend a replacement or fix the issues automatically. In this article, we will have a look at NPM registry survey statistics, check other developers' responses to Node.js security practices and identify which tools you need to assess your open-source code safely.

**NPM registry download statistics**

On September 29th, 2019, NPM marked 10 years of its existence. NPM has been used to develop every kind of application ie Web apps, mobile applications, Servers, Internet of things (IoT)/robotic, desktop applications and native mobile applications. This has greatly contributed to the NPM registry popularity. The number of libraries available in the NPM registry influences most developers to choose JavaScript.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/npm-influnce-statistics.png)

[*ImageSource*](https://medium.com/npm-inc/this-year-in-javascript-2018-in-review-and-npms-predictions-for-2019-3a3d7e5298ef#:~:text=npm%20has%20over%2010%20million,packages%20of%20open%20source%20JavaScript.)

In June 2019, MPM crossed a million-library mark. With over 1.3 million libraries currently available, NPM registry is now the largest single collection of open source libraries in the world with more than 12 million developers.

On April 23, 2018, NPM users downloaded five billion packages within the last 7 days of that date. On this day 4 years ago, that figure was 50 million, this means 10,000% growth. The average IP downloads were 2200 packages per month.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/weekly-downloads.jpg)

[*Image Source*](https://twitter.com/seldo/status/988477780441481217)

Up to now, NPM has recorded tremendous growth with over 20 billion average weekly downloads. AS am writing this article, the NPM registry recorded 88,820,279,735 libraries downloads last month. NPM registry is now serving around 125 billion requests at a whopping 6 Petabytes per month.

This statistical testaments, explain the resilience and commitment of NPM to keep the world's largest community safe by building a chain of fast reliable tools to help you perceive the safety of JavaScript code
you write and share as well as the open-source code to ensure it is safe before you go live.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/popular-languages.PNG)

[*ImageSource*](https://insights.stackoverflow.com/survey/2018#technology-_-programming-scripting-and-markup-languages)

**Dev statistics response on open-source JavaScript libraries and code security practices**

The following survey results were conducted by NPM in collaboration with the Node.js Foundation and the JS Foundation involving over 16,000 developers. The main aim of this survey is to find out how developers perceive the safety of the code they write and the open-source code they use. Read on the [Methodology](https://medium.com/npm-inc/javascript-survey-methodology-1f2290ffc3db) behind this survey. These results were documented on April 10, 2018. Let us have a quick snippet of this survey report based on some  the questions the respondents were asked.

**1. Are you concerned with whether the open-source code you use is secure?**

In this survey, 97% of the respondents used the open-source code. In addition, it turned out 77% of them are concerned about the security of open-source code.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/overall-concerned.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

We now have a clear image that most developers a greatly concerned about code security. Interestingly, 19% of the respondent have 10+ years of experience in using JavaScript. Moreover, out of this 81% were concerned about open-source code security.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/concerned-experien-based.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

This concludes that the longer you use JavaScript the more you become concerned about making sure the code you use is harmless. In short, the attitude to security changes with experience.

**3. Are you satisfied with the available methods to evaluate the safeness and the quality of open source code?**

It is interesting to note that more than half of JavaScript developers are not satisfied with the tools available to analyze the security and quality of open-source code, which is very alarming.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/oss-noncerned.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

What about we separate the response dependent on the concern of open source code or their own code (the code you write).
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/opensource-downcode.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

87% are concerned with the security of their own code while 77% had the same on open source code. These figures conclude that a great number of JavaScript developers are concerned about security, be it open source or the code you write.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/satisfied.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

The respondents trust open source code more than they do to their own written code, his is because open-source codes have available and ready tools for making sure the code is secure. Could that be that most developers trust open source code more than the code they write?

**3. Which tools and practices do you use to ensure security in your application?**

These survey results were divided into two groups, least experienced (>1 year) and most experienced (10 plus years).
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/least-most-experienced.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

From these results experienced groups were:
-   More likely to use testing frameworks.
-   More likely to use linter.
-   More likely to participate in code review.
-   More likely to have external audits of the code.
-   More likely to use automated scans for security flaws.

If all answers are combined, a measure of how many developers uses some form of security practices on codes depending on experience will be:
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/level-of-experience.png)

[*Image Source*](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)

**Conclusion**
-   Testing, linting .code review and security scans are the best
    practices of experienced developers.
-   Best practices like testing, linting, code surveys, and security examines are an indication of experienced developers.
-   Solid greater parts of JavaScript developers are worried about the security both of the code they write and the open-source code they use.
-   Developers are more trusting of the security of open source code than their own.
-   Developers are not content with the options available/accessible to them for securing their code.

**Using `npm@6` for code, NPM registry, and dependency trees security**

`npm@6` is a major update to NPM. It includes inbuilt security feature for open source code. `npm@6` allow NPM registry users to automatically receive warnings if you attempt to try to use unsafe code. NPM automatically reviews any install request you make against the Node Security Platform database and returns a warning if the code contains a vulnerability. The command `npm audit` allows you to deeply recursively analyze your dependencies trees to identify any insecure library and
recommend a replacement or upgrade to a new version. With `npm@6`, you can run `npm audit fix`, to automatically fix the recommendations made on your dependencies trees audit. If you are using the older version `npm@5`, just type `npm i -g npm@latest` to update to `npm@6` and take the advantage powerful built-in automation for your workflow, along with other enhancements and features.

**Features of `npm@6`.**

**1. Speed**

`npm@6` speed range between 4x to 17x faster compared with `npm@4`. What this means is that, as a developer, the speed is not just to make exiting things faster, but allow you to scale your projects beyond what they can do.

**2. CI optimization**

As a developer, you spend less time waiting between pushing a new build and continuing deployment, iterating, and sharing changes becomes even faster. This means continuous integration (CI) and continuous deployment (CD) within your workflow with an additional 2x to 3x faster.

**3. Automatic resolution and package-lock.json lock file conflicts.**

`package-lock.json` is a generated file that saves information about your node modules/dependencies trees. It is meant to be committed to your git repositories and has several benefits such as increased reproducibility across teams, reduced network overhead when installing, and making it easier to debug issues in your dependencies. With `npm@6`, your lock file is more stable across the teams on similar platforms as well as across operating systems unlike the later which had unexpected changes and platform differences. You can use `npm install --package-lock-only` to generate a lock file without installing into `node_modules/`.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/package-lockfile.png)

[*Image Source*](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you)

`npm@6` go to an extent of automatically resolving `package-lock.json` conflicts if you happen to run npm install during a conflicted state. To make this even smoother, `npm@6` have released `npm-merge-drive`, which lets you do all the rebasing and merging and other backflips. To get started with `npm-merge-drive` just run `$ npx npm-merge-driver install --g` one time and all your future merge and rebase conflicts in your git repo will be resolved in the background.

As you may have noticed, we have introduced
[`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
and we need to know what it is and what it does. [npx](https://www.npmjs.com/package/npx) is an NPM package runner and it
helps you to solve specific problems. It makes working with npm-based CLI tools easy, smooth and seamless.
![](/engineering-education/npm-registry-opensource-code-security-with-npm6/npx.gif)

[*Image Source*](https://blog.npmjs.org/post/173240511455/the-new-npm-cli-a-year-in-review-or-what-you)

[**`npx`**](https://www.npmjs.com/package/npx) 
**has the following benefits**
-   You can run project-local binaries with it. That means you don't need to install things like `grunt-cli`, `gulp`, `bower`, and `tsc globally`---you can install them as `devDependencies` and use `npx` to run the local versions without hassle (for example, `$ npm i -D standard && npx standard`).
-   You can do a one-off, temporary installs of command-line utilities that you run rarely, such as generators: `$ npx create-react-app`.
-   You can easily try different versions of these tools with a single install if you need to compare them: `$ npx standard@8 && npx standard@10`.
-   You can even install the [shell
    auto-fallback](https://t.umblr.com/redirect?z=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnpx%23shell-auto-fallback&t=MTVkODRiYmJkOWQ0ZTQxMjYwZGU3M2U0OGFiMDAwZTQ3YjAzMjc5YyxSQlc3OFpFUg%3D%3D&b=t%3AnXsLs1P4AptPf1fBr_nFxw&p=https%3A%2F%2Fblog.npmjs.org%2Fpost%2F173240511455%2Fthe-new-npm-cli-a-year-in-review-or-what-you&m=1&ts=1598809717) to
    not even have to write `$ npx...` in many cases.

npx is a great tool that you should try in your daily workflow.

**4. Real-time notifications**

`npm@6` allows you to configure your CLI to receive [real-time registry and package changes notifications](https://blog.npmjs.org/post/145260155635/introducing-hooks-get-notifications-of-npm)
as they happen. Each time a package has changes an HTTP POST payload is sent to the URL you have configured a hook. Hooks are added to follow a specific package for example if you want to use `Express` you set up a hook for `Express`.

There is a lot of very useful information on `npm@6`, more than what we can discuss in this article. Consider getting started with `npm@6` and you will be excited to have a faster and safer tool to build amazing applications. `npm@6` have amazing overall security of the NPM ecosystem.

**Conclusion**

Since security is everyone's responsibility, we all need to step in together to make a huge step forward to ensure the safety of any code w use in our daily workflow, making sure that the world's larges community is even safer. I wish all NPM users the best of luck as they continue to build fast, safe and amazing things.

**NOTE:**

1. The main objective of the survey was to learn more about the
    JavaScript community and how they interact with NPM concerning code security ethics practices. You may consider looking at the [survey results](https://medium.com/npm-inc/security-in-the-js-community-4bac032e553b)
    in deep and the [methodology
    used.](https://medium.com/npm-inc/javascript-survey-methodology-1f2290ffc3db)

2. The NPM downloads stats are naïve by design. They are counts of HTTP 200 responses that are served tarball files ie packages. These numbers include:
   -   Automated build servers
   -   Downloads by mirrors.
   -   Robots packages download for analysis.

The counts are much larger than the people who just typed `npm install(package)`. This means there some mitigation factors such as.

   -   You had installed the package before; the package will usually be installed from your local npm cache, so this is not counted.
   -   Build servers usually do not redownload a package they have already used before. Builds that happen in disposable VMs or Docker instances are available in the npm cache of the server.
   -   Any given mirror will only download a given version of a package one time. They are smart and do not redownload a package they have already seen before.
[Check more on how npm download counts works](https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts)
