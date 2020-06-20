# "Beginner's Guide to Git: Something that every Software Engineer should at least know of"

Git is an open source version control system to track changes in computer files. The technology is used widely in the industry by almost all the companies. Every Software Engineer is expected to know it. It is designed for coordinating work among programmers., but can be used to track changes in any files.

This guide would help you to get started with Git for your personal projects. For this we will assume that we are working on a project from scratch and wants to manage it with Git. We would also see how can we manage it with GitHub. This would cover everything a beginner needs to know. 

## Why Git?

* Open source version control distributed system
* Helps synchronize working between multiple people
* Helps to organize code
* Can track of every changes and who made them
* Can take snapshots of your file
* And many more

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
First thing first would be to create a Repository aka Repo, which basically means collection of source code. This would the Repo you want to work on.
The next step would be to clone it, means download it to our desktop. This would create an empty folder in our directory and we can work on it by adding all the files.
                              
    $ git clone [url]
   
Here's how to implement **git clone** command:
![clone](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/clone.png)



## Creating files
We can just use git command to make source code file in the folder . We can create any type of file by just stating its type. Here's how to do it.

    $ touch index.html
This would create an index file of HTML type. likewise, you can any type of file.



## Checking the status of your Repository
So now we have some files in our repository, let's check the current status of our repository, For this we would use
**git status**. This command tells us about the current state of the working directory. It tells you about what staged changes and files that aren't tracked by the Git. 

    $ git status

Here's how to implement **git status** command:
![status](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/status.png)


## Adding some files to the staging area.
It helps to tell git that you want to add files into the Git to track. Here's how to do it:

    $ git add my_file

In order to add multiple files you can do it the following way:

    $ git add my_file2 my_file2
    
If you want to add all of your files at once, we can use the following:

    $ git add .
    
    
## Deleting files from the staging area
Let's say you have some files that you no longer need. in this particular situation, you can just delete from the staging area by using the following command.

    $ git rm --cached [file_name]

This would delete the particular file

    

## Commit changes
This command helps you to record the permanent snapshot in the history. There are couple of ways to do it but the better and the quickest way to do is by using the following command.

    $ git commit -m "Any comment"

Here's how to implement add and commit:

![add & commit](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/add%20%26%20commit.png)



## Pushing your code in the Cloud
This command helps to push all the local branches to Github. After this you would be able to see your changes in your Github. This way you would be able to keep track of all your source code by keeping it safe in the cloud by using the following command.

    $ git push

Here's how to implement push:

![push](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/push.png)


## Getting your files into the working directory
This command let you update your local branch with all the new commits from the corresponding remote branch on Github. After using this command you would be able to see all the changes made in the repository by other developers by using the following command.

    $ git pull

Here's how to implement pull:

![pull](https://github.com/param31/Beginner-s-guide-to-git/blob/master/Images/pull.png)


# Conclusion
Congratulation! Now you know all the basics of Git. Now you would be able to work on your personal projects individually or in a group in a synchronize way.
There's are more things as well in Git such as Branching and Merge. But this tutorial helps you get started with Git and GitHub. Maybe even more.
Happy coding!


