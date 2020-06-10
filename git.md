# "Beginner's Guide to Git: Something that every Software Engineer should atleast know of"

Git is a open source version control system to track changes in computer files. The technology is used widely in the industry by almost all the companies. Every Software Engineer is expected to know it.

This guide would help you to get started with it. This would cover everything a begineer needs to know.

## Why Git?

* Open source version control distributed system
* Helps synchronize working between multiple people
* Helps to organize code
* Can track of every changes and who made them
* Can take snapshorts  of your file
* And many more

## How to Install Git

**Linux**
#apt-get install git

**Mac**
http://git-scm.com/download/mac

**Windows**
http://git-scm.com/download/win

## Basic Commands
* $ git clone
* $ git status
* $ git add
* $ git commit
* $ git push
* $ git pull


## How to implement the commands?
* ### $ git clone [url]
This command is used to clone, which means to download a repository including all the files that already exist on Github.

Here's how to implement clone:

![clone](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/clone.png)

* ### $ git status
This command tells us about the current state of the working directory. It tells you about what staged changes and files that aren't tracked by the Git.

Here's how to implement status:

![status](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/status.png)

* ### $ git add
This command adds changes to the staging area of the working directory. It helps to tell git that you want to add updates in a file.

**$ git add .** : this means that you want to add all the files

**$ git add [filename]**: this means that you want to add certain files


* ### $ git commit -m "Any comment"
This command helps you to record the permanent snapshort in the history. There are couple of ways to do it but the better and the quickest way to do is by this command.

Here's how to implement add and commit:

![add & commit](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/add%20%26%20commit.png)

* ### $ git push
This command helps to push all the local branches to Github. After this you would be able to see your changes in your Github

Here's how to implement push:

![push](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/push.png)


* ### $ git pull
This command let you update your local branch with all the new commits from the corresponding remote branch on Github. After using this command you would be able to see all the changes made in the respository by other developers. 

Here's how to implement pull:

![pull](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/pull.png)





