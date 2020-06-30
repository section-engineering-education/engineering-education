# "Beginner's Guide to Git: Something that every Software Engineer should at least know of."

Git is an open-source version control system to track changes in computer files. The technology is being used in the industry by almost all the companies. It is something that every Software Engineer should know. It is for synchronized work among programmers but can be used to track changes in any files.

This guide would help you to get started with Git for your personal projects. For this, we will assume that we are working on a project from scratch and wants to manage it with Git. We would also see how we can manage it with GitHub. This article would cover everything a beginner needs to know. 

## Why Git?

Git is an open-source version control distributed system that helps to organize code. It keeps track of every change you make to the files by taking snapshots of your code file. So you have a record of what is been done, and you can revert to specific versions should you ever need to. 

It helps collaboration easier among developers. Allowing the changes by many developers to be all merged into one source. So even though you don't write code, it would be beneficial for you to keep track of it.

Git runs locally, So your files are being stored on your computer. You can also use an online host such as GitHub to keep a copy of your code. Working on an online host like Github would help you manage your code files in a synchronized way. Where the numbers of developers can upload and download changes. So that developers can work on different code files at the same time and merges them at the end without losing each other's work.

## How to Install Git

**Linux**
#apt-get install git

**Mac**
http://git-scm.com/download/mac

**Windows**
http://git-scm.com/download/win

## Basic Commands that we would be using in this tutorial
* $ git clone
* $ git status
* $ git add
* $ git rm
* $ git commit
* $ git push
* $ git pull


## Initial Configuration
The first thing first would be to create a Repository, aka Repo, which means a collection of source code.
The next step would be to clone it, which means download it to our desktop. This would create an empty folder in our directory and we can work on it by adding all the files.

    $ git clone [url]

Here's how to execute **git clone** command:
![clone](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/clone.png)



## Creating files
We can use the git command to make the source code file in the folder. We can create any type of file by stating its type. Here's how to do it.

    $ touch index.html
This command would help us to create an index file of HTML type. Likewise, you can create any type of file.



## Checking the status of your Repository
So now we have some files in our repository. Let's check the current status of our repository. For this, we would use
**git status**. This command tells us about the current state of the working directory. It tells you about what staged changes and files that aren't tracked by the Git. 

    $ git status

Here's how to execute **git status** command:
![status](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/status.png)


## Adding some files to the staging area.
It helps to tell git that you want to add files into the Git to track. Here's how to do it:

    $ git add my_file

Here's the code if you want to add more than one file:

    $ git add my_file2 my_file2

If you want to add all your files at once, we can use the following:

    $ git add .


## Deleting files from the staging area
Let's say you have some files that you no longer need. You can delete those files from the staging area by using the following command.

    $ git rm --cached [file_name]

This command would delete the particular file.



## Commit changes
This command helps you to record the permanent snapshot in history. There are a couple of ways to do it, but the better and the quickest way to do is by using the following command.

    $ git commit -m "Any comment"

Here's how to execute add and commit:

![add & commit](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/add%20%26%20commit.png)



## Pushing your code in the Cloud
This command helps to push all the local branches to Github. After this, you would be able to see your changes in your Github. This way, you would be able to keep track of all your source code by keeping it safe in the cloud.

    $ git push

Here's how to execute push:

![push](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/push.png)


## Getting your files into the working directory
This command lets you update your local branch, with all the new commits from the corresponding remote branch on Github. After using this command, you would be able to see all the changes made by the developers in the repository.

    $ git pull

Here's how to execute pull:

![pull](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/pull.png)


# Conclusion
Congratulation! Now you know all the basics of Git. Now you would be able to work on your projects or in a group in a synchronized way. 
There's are more things as well in Git, such as Branching and Merge. But this tutorial helps you get started with Git and GitHub. Even more.

**Happy coding!**
