---
layout: engineering-education
status: publish
published: true
url: /engineering-education/beginner-guide-to-git/
title: Beginner's Guide to Git
description: This guide is intended to help any beginner get started with Git. Using the examples provided below, we will assume that we are starting a project from scratch and want to manage it with Git.
author: parampreet-singh
date: 2020-07-09T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/beginner-guide-to-git/hero.jpg
    alt: Git image example
---
Git is an open-source version control system to track and manage any changes in computer files. Almost all the major players in the industry use Git, and this technology is something that every software engineer should know. Linus Torvalds created it to help in coordinating work among programmers, but it can also be used to track changes in any type of file. Its goals include speed, data integrity, and support for distributed workflows.
<!--more-->

### What is Git?
Git was created by Linus Torvalds in 2005 for the development of the Linux kernel, with other kernel developers contributing to its [initial development](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git). Since its birth in 2005, Git has evolved and matured to be easy to use while retaining its initial qualities. It is amazingly fast, very efficient with large projects, and it has an incredible branching system for non-linear development.

This article aims to help any beginner get started with Git. Using the examples provided below, we will assume that we are starting a project from scratch and want to manage it with Git. We will also look at how we can manage our project with GitHub, a leading software solution built around Git.

### Why Git?
Git is an open-source version control distributed system that helps to organize code. It helps to keep track of every change you make to any working files by taking snapshots of that file. It keeps a record of what you have done and allows you to revert to specific versions you ever need to.

Git runs locally, meaning your files are simultaneously stored locally on your computer. You can also use an online host such as GitHub to keep a copy of your code.

Git makes collaboration easier for developers by helping to coordinate changes and edits by many people. It then takes those changes and merges them into one source. Regardless of whether you use Git/GitHub to write any code, it's beneficial to keep track of any changes made to files. Working with an online host like GitHub can help teams small and large collaborate more effectively.

### How to Install Git

**Linux**
```
apt-get install git
```

**Mac**
http://git-scm.com/download/mac

**Windows**
http://git-scm.com/download/win

### Basic Commands that we will be using in this tutorial
* git [clone](https://git-scm.com/docs/git-clone) - Clone a repository into a new directory
* git [status](https://git-scm.com/docs/git-status) - Show the working tree status
* git [add](https://git-scm.com/docs/git-add) - Add file contents to the index
* git [rm](https://git-scm.com/docs/git-rm) - Remove files from the working tree and from the index
* git [commit](https://git-scm.com/docs/git-commit) - Record changes to the repository
* git [push](https://git-scm.com/docs/git-push) - Update remote refs along with associated objects
* git [pull](https://git-scm.com/docs/git-pull) - Fetch from and integrate with another repository or a local branch

### Initial Configuration
The first thing to do is create a repository, aka repo, which means a collection of source code. You can create a repo in GitHub.

The next step is to clone it, which means download it to your local machine. That will create an empty folder in your directory where we can begin to add files.

To clone a repo, use the command: 
```bash
$ git clone [url]
```

Here's how to execute **git clone** command:
![clone](/engineering-education/beginner-guide-to-git/clone.png)

### Creating files
You can use the git command to make the source code file in the folder. We can create a file with any extension by stating its type. Here's how to do it:
```bash
$ touch index.html
```

This command will create an index file of HTML type. Likewise, you can create a file with any extension.

### Checking the status of your repository
So now we have some files in your repository. Let's check the current status of your repository. For this, we would use
**git status**. This command tells us about the current state of the working directory. It tells you about what staged changes and files that aren't tracked by the Git.
```
$ git status
```

Here's how to execute **git status** command:
![status](/engineering-education/beginner-guide-to-git/status.png)


### Adding some files to the staging area
It helps to tell git that you want to add files to track. Here's how to do it:
```
$ git add my_file
```

Here's the code if you want to add more than one file:
```
$ git add my_file2 my_file2
```

If you want to add all your files at once, we can use the following:
```
$ git add .
```

### Deleting files from the staging area
Let's say you have some files that you no longer need. You can delete those files from the staging area by using the following command.

```
$ git rm --cached [file_name]
```

This command would delete the particular file.

### Commit changes
This command helps you to record the permanent snapshot in history. There are few ways to do it, but the best and quickest way to do is by using the following command.

```
$ git commit -m "Anything you want to write"
```

Here's how to execute add and commit:

![add & commit](/engineering-education/beginner-guide-to-git/add-commit.png)

### Pushing your code in the cloud
This command helps to push all the local branches to GitHub. After this, you will be able to see your changes in your GitHub repo. This way, you would be able to keep track of all your source code by keeping it safe in the cloud.
```
$ git push
```

Here's how to execute push:

![push](/engineering-education/beginner-guide-to-git/push.png)


### Getting your files into the working directory
This command lets you update your local branch, with all the new commits from the corresponding remote branch on GitHub. After using this command, you will be able to see all the changes made by the developers in the repository.
```
$ git pull
```

Here's how to execute the pull command:

![pull](/engineering-education/beginner-guide-to-git/pull.png)

### Conclusion
Congratulations! Now you have a better understanding of the basics of Git and should be able to work on your projects, or in a group in a much more synchronized way.

There is a lot more to learn when it comes to collaborating better in Git, such as [Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell#ch03-git-branching) and [Merge](https://git-scm.com/docs/git-merge). But this tutorial helps you get started with Git and GitHub. 

**Happy coding!**
