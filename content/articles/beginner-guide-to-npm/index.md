---
layout: engineering-education
status: publish
published: true
url: /beginner-guide-to-npm/
title: An Absolute Beginner Guide to Node Package Manager
description: In this guide, we will cover the basics of NPM, see what we can achieve with it, and understand the whole concept of NPM.
author: joseph-chege
date: 2020-10-23T00:00:00-16:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/beginner-guide-to-npm/hero.jpg
    alt: Node.js npm node package manager example image
---
The whole ecosystem of Node.js is based on tools such as NPM. NPM is a Node.js package manager. It provides a bunch of open source packages. This extensive ecosystem of open source libraries makes Node.js a popular technology.
<!--more-->
To use these packages, you will need NPM CLI. It is a Node.js built-in command interface. It allows you to install and interact with packages for your Node.js/JavaScript project. Most developers understand NPM as an installation pathway. But there is a lot more this tool offers than just basic package installations.

In this guide, we will cover the basics of NPM, see what we can achieve with it, and understand the whole concept of NPM. This guide is beginner-friendly. We will show you how to install, uninstall, and update packages, managing dependencies in package.json, and more NPM tooling that you should not take for granted.

### Getting Started with NPM
NPM is entirely written on JavaScript. It is the cornerstone for modern web app development to any developer entirely using Node.js. To get started with NPM CLI, you'll need Node.js installed and running on your computer.

### Node.js Installation and Setup
NPM is bundled with Node.js. If you install Node.js appropriately, you automatically get NPM installed.

- For Windows:

Download [Windows Node.js installer](https://nodejs.org/en/download/).

- For Mac OS:

Download [Mac Node.js installer](https://nodejs.org/en/download/).

- For Linux:

```bash
curl -sL https://deb.nodesource.com/setup_14.x
sudo -E bash -
sudo apt-get install -y nodejs
```

-  Check out more [NPM installation options](https://nodejs.org/en/download/package-manager/)

Once Node.js is installed, verify if the installation was successful. Run `node –v` on your command-line tool to get the Node.js version installed.

```bash
$ node -v
v12.18.3 ## installed node.js version
```

Our primary interest is NPM. Go ahead and check if NPM is installed on your computer. Run `npm –v` in your command line. If NPM is accurately installed, you will see the NPM version present on your computer.

```bash
$ npm -v
6.14.6 ## installed npm version
```

### Updating NPM
NPM is a different package from Node.js. It is updated regularly. Once installed, you need to update to a newer version regularly. Check out the [latest version](https://www.npmjs.com/package/npm) of NPM. If you have an old version, download the Node.js installer. Rerun it. The latest version will automatically replace the older version.

Or, use the following command to update NPM to the newest version.

```bash
npm install -g npm@latest
```

### Initializing your First Project with NPM
NPM triggers the initialization of a project. It prompts you the aspects of your project. These aspects will frame out your project. To initialize your first project with NPM, create a project folder, and change the directory to it.

Once this is done, you are ready to initialize your first project with:

```bash
npm init ## triggers the initialization of a project
```

This will walk you through the following steps:

```bash
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and do exactly what they do.

Use `npm install <pkg>` afterward to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
```

Hit enter to roll out a prompt that will ask for the project aspect in the following order:

```bash
package name: (myapp)
version: (2.1.0)
description: this is my first project
entry point: (index.js)
test command: hello
git repository: my git repo
keywords: my first project with npm cli
author: me
license: (ISC)
```

Once the steps are over, you will be prompted to write this info into your project folder under a package.json file.

```bash
About to write to E:\myapp\package.json:
```

This will give an overview of a JSON that previews the information you provided.

```bash
{
  "name": "myapp",
  "version": "2.1.0",
  "description": "this is my first project",
  "main": "index.js",
  "scripts": {
    "test": "hello"
  },
  "repository": {
    "type": "git",
    "url": "my git repo"
  },
  "keywords": [
    "my",
    "first",
    "project",
    "with",
    "npm",
    "cli"
  ],
  "author": "me",
  "license": "ISC"
}
```

```bash
Is this OK? (yes)
```

A `package.json` file is automatically generated to save aspects of your project.

![Package.json File](/engineering-education/beginner-guide-to-npm/package-json.png)


Alternatively, add a `--yes` flag to `npm init` to generate the `package.json`file with the default NPM value.

Usage:

```bash
npm init --yes ## triggers the initialization of a project default NPM value
```

You can change the file aspect later or rerun `npm init` to overwrite the `package.json` file with newer values.

#### Breaking Down the Package.json Metadata Properties
- Name - the name of your project. Has a maximum of 214 characters all lowercase with a leading period(.) or underscore(-).
- Version - the initial/current version of your project.
- Description - a short description of what your project does. It gives a hint on what your project is about.
- Main - the project main/entry file.
- Scripts - trigger testing, building, and trimming.
- Keywords - related tags to your project.
- Repository - point to the public GitHub repository where your code will be hosted live.
- Author - the owner of the project.
- License - indicates what license module you are using. Open-source NPM recognizes MIT as the default license.
- Dependencies - packages the project needs to run on production.
- DevDependencies - package the project needs to use for development purposes such as testing libraries.

### Installing Packages
Packages installation is one of the basic commands you will continuously use to add your project packages. NPM has two ways to install a package in your system. Local and global mode.

#### Installing Packages Locally
Local packages are installed in the `node_module` folder of your current working project directory. `npm install` is the standard NPM command to install a package of your choice. `npm i` can be used, where `i` replaces install.

Usage:

```bash
npm install <module> ##  <module> in the package to install
npm i <module> ## alias i replaces install
```

Substitute `<module>` with the package's name to install. For instance, to install [lodash](https://lodash.com/) (a modern JavaScript utility library delivering modularity, performance & extras), run the following command:

```bash
npm install lodash ## install our first package (lodash)
```

```bash
$ npm install lodash
npm notice created a lockfile as package-lock.json. You should commit this file.
+ lodash@4.17.20
added 1 package from 2 contributors and audited 1 package in 4.031s
found 0 vulnerabilities
```

This command will install lodash to the `node_module` folder. At first, our project didn’t have a `node_module` folder. The folder will be created once you install the first package.

![Node_module Folder](/engineering-education/beginner-guide-to-npm/node-module.png)

Try another package:

```bash
npm install express
```

Every NPM package will be installed in the `node_module` folder. Running `npm install <module>` installs the latest package version available in the NPM registry. Open the `package.json` file. Apart from the project aspect, we initialize with `init`, the following lines were added.

```bash
  "dependencies": {
    "express": "^4.17.1",
    "lodash": "^4.17.20"
  }
  ```

The packages we installed are saved as an entry in the dependencies field. The dependencies field save any package required by your app to run. It is possible to save a package as devDependencies. In this case, a flag `--save-dev` is added to the `npm install  <module>`.

This will save the package as devDependencies. DevDependencies are the packages that are not required by the app to run. These packages are used for development purposes such as testing, local server speeding for development purposes, transpiring code, etc.

Usage:

```bash
npm install nodemon --save-dev ## install a dev package to our dependencies
```

```bash
$ npm install nodemon --save-dev

> nodemon@2.0.4 postinstall E:\myapp\node_modules\nodemon
> node bin/postinstall || exit 0

+ nodemon@2.0.4
added 119 packages from 53 contributors and audited 121 packages in 41.629s

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

A devDependencies scaffold will be added to the package.json file.

```bash
 },
  "devDependencies": {
    "nodemon": "^2.0.4"
  }
```

#### Package.json Dependencies Management
The main aim of using `package.json` is to define your application's dependencies. For instance, if you have cloned someone else project to your local computer, this project will not execute as intended.

You have not installed the necessary packages to run this app. This project has a `package.json` file with a dependencies scaffold that indicates the packages the project needs.

Thus, you need to go ahead and install these packages. Assuming the project has several packages, it might be tiresome to do that.

NPM solves this hassle. Run `npm i` (alias `i` replace install) inside the cloned project's root directory. `npm i` fetch plus install individual needed packages specified in the project `package.json` dependencies.

For example:

To better understand this, install several packages in the project we created at the beginning of this guide.

Go ahead and install the following packages.

```bash
npm i moment
npm i underscore
npm i mongoose
```

The command below installs multiple packages.

```bash
npm i mongoose  moment underscore ## install multiple packages at a go
```

Now, assume you have cloned this project from another computer, and you want to install the packages of this project. Go ahead and delete the `node_module` folder of your project. This will remove the packages installed on your local system.

If you run `npm list --depth=0` to list down the packages installed for this project, you will get something close to this:

```bash
$ npm list --depth=0
myapp@1.0.0 E:\myapp
+-- UNMET DEPENDENCY lodash@4.17.20
+-- UNMET DEPENDENCY moment@2.29.1
+-- UNMET DEPENDENCY mongoose@5.10.9

npm ERR! missing: lodash@4.17.20, required by myapp@2.1.0
npm ERR! missing: moment@2.29.1, required by myapp@2.1.0
npm ERR! missing: mongoose@5.10.9, required by myapp@2.1.0
```

This indicates that we don't have these packages installed. Yet the project needs them. The packages are saved in the dependencies scaffold, and can be installed any time you need them.

Run the command `npm i`. The `node_module` folder will be recreated. If you rerun `npm list --depth=0`, your project packages will be resolved. It becomes more comfortable to share your code without restructuring project dependencies.

**NOTE:** the packages under the devDependencies scaffold are not listed. As explained earlier, we don't need them to run our app. NPM will not list them as `required`.

#### Installing a Specific Package Version
Assume the lodash version installed earlier has a bug, but an older version is stable. You can append `@` to stress and specify the variant of the package to install.

For example:

```bash
npm install lodash@4.17.19 ## install lodash version 4.17.19
```

```bash
$ npm install lodash@4.17.19
+ lodash@4.17.19
updated 1 package and audited 152 packages in 13.828s
found 0 vulnerabilities
```

Lodash version 4.17.19 will be installed and updated on the package.json file.

```bash
   "lodash": "^4.17.19", ## lodash version recorded in the package.json file
```

#### Updating a Package
Assuming the express bug is now fixed. You can update the package to the latest version available in the NPM registry.

Check if express has an update with `npm outdate`.

```bash
$ npm outdate
Package  Current   Wanted   Latest  Location
lodash   4.17.19  4.17.20  4.17.20  myapp
```

- Current - the version installed locally.
- Latest - the newest available version.
- Wanted - the version compatible with the exiting project.

`npm outdate` check the latest available version compatible with the project. Go ahead and `npm update` that package.

```bash
$ npm update
+ lodash@4.17.20
updated 1 package and audited 152 packages in 14.805s
found 0 vulnerabilities
```

**NOTE:** `npm update` will update to the wanted version. It will update all outdated versions in the entire dependencies tree.

#### Uninstalling a Local Package
Let say you installed a package, and no longer need it, or it has compatibility issues. NPM is a package manager and will help uninstall a package with `npm uninstall <module>`. Assuming you want to uninstall the Moment package from the project dependencies:

Usage:

```bash
npm uninstall moment
```

```bash
$ npm uninstall moment
removed 1 package and audited 151 packages in 7.957s
found 0 vulnerabilities
```

Moment will be removed from the dependencies trees.

#### Installing Global Packages
Packages installed globally are saved on your system and not on your project's local path. A global package can be accessed and used by any project. That means they aren't added to the `package.json` file. Global packages end up in your PATH environment variable. NPM saves global packages in `{prefix}/lib/node_modules` and drops executable files in {prefix}/bin.

Where `{prefix}` is `/usr/local/` or `/usr/`. To install a package globally, add a flag `--global` to the command `npm install`. The flag `--global` can be an changed to `--g`.

Usage:

```bash
npm install --global <module>
npm i --g <module>
```

For example, let's install the [jshint](https://jshint.com/), [uglify](https://www.npmjs.com/package/uglify-js), and [mocha](https://mochajs.org/) packages globally.

Usage:

```bash
npm install uglify-js mocha jshint --global ## installing multiple packages globally
```

These packages are installed to `\Users\kim\.node_modules_global` path and not saved in our project dependencies.

![Node_modules_global Path](/engineering-education/beginner-guide-to-npm/globals-path.png)

Let's list the packages installed globally.

```bash
npm list -g --depth=0
C:\Users\kim\.node_modules_global
+-- jshint@2.12.0
+-- mocha@8.1.3
`-- uglify-js@3.11.1
```

**NOTE:** if you are using a *[nix system](https://en.wikipedia.org/wiki/NixOS), you need user permission to install a package globally in your system, or the installation will fail with `EACCES`. Thus, it would be best to use `sudo` to install packages globally.

Usage:

```bash
sudo npm install -g jshint ## sudo to override permission error for superuser
```

Just like local installation mode, you can uninstall, update, or install a specific version globally.

Usage:

```bash
npm uninstall <module> --global ## uninstall a global package
npm update --global ## update global packages
npm install <module>@1.0.0 --global ## install a specific package version globally
```

**NOTE:** `npm install...` and `npm update` will try to avoid installing a deprecated package version. NPM will try to find a matching version if possible.

For example:

If package `a` with the following module versions.

```bash
2.1.0
2.1.2
2.1.3
2.1.4
2.1.5
2.1.6 (deprecated)
```

Given the above example:

-  `npm install a` will fetch version 2.1.5.
-  `npm install a@2.1.6` will install version 2.1.5.
-  If you've installed `a` version 2.1.4 and you want to update to the latest available major version of `a`, NPM will install `a@2.1.5`.

NPM will always try to avoid the installation of a deprecated version. NPM will only install a deprecated version when there are no other means to provide the inquired version.

### Package-lock.json
Earlier on, we saw a `package-lock.json` file created in our project.

![Package-lock.json File](/engineering-education/beginner-guide-to-npm/packag-lock-json.png)

This file ensures that all packages version remain uniform across computers where the project is cloned. It saves information about the dependencies and package versions you use in your project.

Let's install a specific version of Moment.

```bash
npm i moment@2.20.0
```

Run `npm outdate` to check the versions of these package.

```bash
$ npm outdate
Package  Current  Wanted  Latest  Location
moment    2.20.0  2.29.1  2.29.1  myapp
```

This is how Moment is saved on `package-lock.json`.

```bash
  "moment": {
      "version": "2.20.0",
      "resolved": "https://registry.npmjs.org/moment/-/moment-2.20.0.tgz",
      "integrity": "sha512-r7aEpLB/mhMUiC5ksahDajF/Jr3wS/qLzUnwOJCZyKWF34ibdvW8saujBKfR7aQlov//JgFA38HXOoIt7lXzcA=="
    },
```

I want you to go ahead and erase the `node_module` directory and execute `npm install.` Moment version in the dependencies is 2.20.0. Yet we saw a newer version (2.29.1) of this package. `npm install` always installs the latest updated version in the NPM registry.

Yet this time it didn't. The version was already specified in the `package-lock.json` file. This eliminates the inconsistency of package versions across the project under different computers.

When a package is installed, it is saved with a caret (`^`) before the version number in the dependencies scaffold. The caret tells NPM always install the highest version available for this package that matches the major version available in the project's dependencies.

In our case, it will be anything below 3.0.0 (`Major`.`Minor`.`Minor`). This is called [semantic versioning](https://en.wikipedia.org/wiki/Software_versioning). But if the `package-lock.json` file is available in that project, NPM will match the version specified in the lock file.

**Package-lock.json has the following advantages:**
- Increased reproducibility across teams.
- Reduced network overhead during installation.
- It makes it easier to debug an issue in your app.

### Audit
When installing the NPM packages, you may have noticed `found 0 vulnerabilities` on the CLI output. This is a new tool for NPM with built-in security features.

It automatically reviews any install requests you make and returns a vulnerability alert. The command `npm audit` allows you to analyze your dependencies trees thoroughly and identify any unsafe library. It recommends a replacement or upgrades to a newer version.

To understand how NPM audit works, you may want to install Moment version 2.0.0.

```bash
npm i moment@2.0.0
```

```bash
$ npm i moment@2.0.0
+ moment@2.0.0
updated 1 package and audited 152 packages in 6.912s

12 packages are looking for funding
  run `npm fund` for details

found 2 vulnerabilities (1 low, 1 moderate)
  run `npm audit fix` to fix them, or `npm audit` for details
```

NPM will list down the vulnerabilities available in the version you have installed.

```bash
found 2 vulnerabilities (1 low, 1 moderate)
run `npm audit fix` to fix them, or `npm audit` for details
```

Run:

```bash
npm audit ## check package vulnerabilities
```

To analyze the entire dependencies trees. It will output a security report and recommend what to do.

```bash
$ npm audit

                       === npm audit security report ===

# Run  npm update moment --depth 1  to resolve 2 vulnerabilities

  Moderate        Regular Expression Denial of Service
  Package         moment
  Dependency of   moment
  Path            moment
  More info       https://npmjs.com/advisories/55
----------------------------------------------------------
  Low             Regular Expression Denial of Service
  Package         moment
  Dependency of   moment
  Path            moment
  More info       https://npmjs.com/advisories/532
--------------------------------------------------------
found 2 vulnerabilities (1 low, 1 moderate) in 152 scanned packages
  run `npm audit fix` to fix 2 of them.
```

To fix this, run:

```bash
npm audit fix ## resolve packages vulnerabilities
```

NPM will automatically resolve these vulnerabilities.

```bash
fixed 2 of 2 vulnerabilities in 152 scanned packages
```

### Cache
When you install a package, NPM saves a copy of that package on your local computer. A cache is a memory buffer that stores data so that future requests for that data can be served faster.

When installing a package you have used before, NPM will not hit the network. The package is usually installed from your local NPM cache. With time, you may end up installing many packages.

The NPM cache directory will be cluttered with old packages. It would be useful to clean the NPM cache regularly to avoid storing junk files on your computer.

The following command will purge the cache in your project workflow.

```bash
npm cache clean --force
```

### Using NPM Packages
Now that you have downloaded a package, how do you actually use that package in your project? The following example will guide you on how to apply [Express](http://expressjs.com/en/starter/installing.html) (***a fast, unopinionated, minimalist web framework for Node.js with various HTTP utility methods and middleware at your disposal***) to your project.

You have already downloaded express with `npm i express`. You're ready to explore express. On your project root folder, create a file. Name it `app.js`. The aim is to create a simple Node.js server app.

For you to use any package, use `require()` to refer to the packages you are using in your project, and they will run just as if they were built-in.

For example, to use express, copy the following code to your `app.js` file.

```js
var express = require('express');
```

This way, your app will exploit Express features as if they were built for your project.

Add the following lines.

```js
var app = express();

 app.listen(3000, () => {
  console.log("Application started and Listening on port 3000")
})
```

There you have it. You have created the world simplest Express server that listens to port 3000.

Create an HTTP to get a request that will send a message to the server you have created.

Add the following lines right above `app.listen`.

```js
app.get("/", (req, res) =>{
  res.send("hello world!");
  });
```

On your command line, run `node app.js`. This will give you ***Application started and Listening on port 3000***. If you visit `http://localhost:3000/` on your browser, a message ***hello world!*** will greet you, sent by your server.

This a basic example of applying the installed express to a Node.js project. If you are interested in learning more about Express, we have a guide that will get you [started to express servers and routing](/express/).

### Conclusion
This guide introduced you to NPM. I hope it gave you a good impression on how best to get started using this amazing tool. It bridges Node.js and NPM.

It provides you with packages repositories—as there are many various packages on NPM. Go ahead and choose any useful package to help you scale out your next project workflow.

Suppose you are interested in learning more; below are some links. Do have a look at them to learn more about Node.js and NPM.

### Related Topics and Additional Resources
[The History of Node.js](/history-of-nodejs/)

[Most Useful Node.js Packages](/most-useful-nodejs-packages/)

[Create and Deploy NPM Packages](/npm-packages/)

[Open-source packages & Code Security using NPM](/npm-registry-opensource-code-security-with-npm6/)

[10 Tips for Working with Node.js](/ten-tips-for-working-with-nodejs/)

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
