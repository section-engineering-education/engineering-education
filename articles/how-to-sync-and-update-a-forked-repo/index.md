---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-sync-and-update-a-forked-repo/
title: How to Sync and Update a Forked Repository
description: This article demonstrates how to sync and update a forked repo using GitHub desktop and Git bash with examples.
author: joseph-chege
date: 2020-09-18T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:		
  - url: /engineering-education/how-to-sync-and-update-a-forked-repo/hero.jpg
    alt: How to sync to forked repo
---
In this article, we shall briefly look at how we can submit work and contributions to a GitHub team project. This article assumes that you have a GitHub account. [Check these instructions](https://docs.github.com/en/github/getting-started-with-github/signing-up-for-a-new-github-account) on how to create a GitHub user account. Before we get started, you need to understand the following terms, as you will constantly come across them in daily GitHub workflow.
<!--more-->

### Getting started
-   **Fork** is a copy of a repository of someone's else project. Forks allows you have to have a repository of a project that you do not own on your GitHub account so that you can make some changes without affecting the original repository. Once the changes on your forked repository are validated, you can submit these changes as contributions to the original project. Forks allows you to make your contributions to a team project.
-   **Remote** a repository on GitHub account exists as a remote repository.
-   **Clone** is downloading a copy of the remote repository to local computer.
-   **Commits** are changes made to a repository. Committing saves edits/changes to our GitHub repository. With GitHub, every commit you make has a specific signature/ID the keeps the record of the changes you have made. If you happen to make a wrong change, you can revert the commit and your remote repository will be as it was before you made the changes. A commit has a commit message that allows you to have a brief description of the changes you are making.
-   **Push** is used to transfer commits made on a local repository to a GitHub remote repository. To push to GitHub you make a push request to update your local commits to your remote repository.
-   **Branch** a feature branch or base branch. A feature branch typically helps you to isolate your changes from the other team as you make and test these changes. The base branch consists of merged feature branches.
-   **Pull request** is to notify the project team of the changes you have made from a pushed branch in your GitHub repository or basically requesting the owner of the repository to pull changes you made, thus called a pull request. A collaborator can be assigned to review your pull and propose any potential changes you need to make. Review changes are done with commits. Once changes and reviews are complete a team contributor or you (with access), can merge your branch to the base branch of the original repository.
-   **Merge** is merging two branches and integrating them into a single branch. A merge conflict can happen if the two branches you are attempting to merge have both modified the same part of the same file. In such a case, Git will not be able to automatically choose which version to use.

### How to fork
Now that you know, what a fork is, let's see how you can fork a repository to start working on your changes and contribute to a team project. Forking a project on GitHub is really easy, you just need to hit the fork button. On your GitHub account, go to the repository you want to fork. In this example, we are referring to https://github.com/section-io/engineering-education. To the upper left corner, click on the fork button and you will have successfully forked the repository.

![forking repo](/engineering-education/how-to-sync-and-update-a-forked-repo/forking.png)

Now you have a copy of the original repository on your GitHub account.

![forked repo](/engineering-education/how-to-sync-and-update-a-forked-repo/forked.png)

To start pushing, committing, and pulling, you need clone the repository you have forked (on your GitHub account) and a have copy on your computer to start working on your contributions.

### How to clone

#### Cloning using GitHub desktop
If you are using the [GitHub desktop app,](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/installing-github-desktop) cloning a repository is as easy as pie. To get started, download [GitHub desktop](https://desktop.github.com/) and install it into your computer and [authenticate and configure](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/authenticating-to-github) it with your GitHub account.

![After sign in](/engineering-education/how-to-sync-and-update-a-forked-repo/after-github-signin.png)

To make GitHub desktop work easier, make sure you configure [GitHub desktop with a text editor](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/configuring-a-default-editor) such as [Visual Studio Code](https://code.visualstudio.com/).

Once that is done, your GitHub account will load on the GitHub desktop. To start cloning, navigate to File then clone repository.

![start cloning](/engineering-education/how-to-sync-and-update-a-forked-repo/start-github-clone.png)

A clone window will pop up, you will be able to see the repositories in your account, and choose the repository you want to clone.

![cloning window](/engineering-education/how-to-sync-and-update-a-forked-repo/cloning-github-window.png)

Alternatively, you may use the URL from GitHub remote repository, paste on the clone box of GitHub desktop, and initiate cloning, select your preferred location of the cloned repository to your local computer and you are done.

![cloning progress](/engineering-education/how-to-sync-and-update-a-forked-repo/cloning-progress.png)

#### Cloning using Git Bash
Git uses [protocols](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols) to transfer data from a remote server to your local machine. The main used URL protocols include:

-   [SSH](https://docs.github.com/en/github/authenticating-to-github/about-ssh)
(Secure Shell) is an authenticated network protocol that needs credentials (a password) before making a connection to the hosting server. This is how a SSH link looks like:

```bash
git://host.xz[:port]/path/to/repository.git
```
Example

```bash
git@github.com:section-io/engineering-education.git
```
![SSH](/engineering-education/how-to-sync-and-update-a-forked-repo/ssh.png)

-   HTTP/HTTPS (Hyper text transfer protocol). The protocol of the web, most commonly used for transferring web page HTML data over the Internet. Git can be configured to communicate over HTTPS with encoded data [transmission](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone).

```bash
http[s]://host.xz[:port]/path/to/repository.git/
```
![HTTPS](/engineering-education/how-to-sync-and-update-a-forked-repo/https.png)

In this article, we shall use SSH URL protocol using [Git Bash](https://docs.github.com/en/github/using-git) to execute git commands. However, to get started with Git Bash, you need to do the following authentication.

First, [download and install git](https://git-scm.com/downloads), launch Git Bash and sign in to your GitHub account using the following commands.

**NOTE**: remember to press enter after any of the following

```bash
git config --global user.name "your github account username"
```

```bash
git config --global user.email "your github account email"
```

Run

```bash
git config --global user.name
```

to confirm username and

```bash
git config --global user.email
```

to confirm email. To connect to your GitHub account you need to generate an SSH key. Run

```bash
ssh-keygen -t rsa -C "your github email"
```
Use the same email as your GitHub account email. After pressing enter on this command, you will be required to enter a password twice (this is not your GitHub password), enter any password of your choice, and when asked for confirmation renter the password again. An SSH code will be generated and you need it to authenticate the protocol. To open the file created, run

```bash
notepad ~/.ssh/id_rsa.pub
```

The file contains the SSH code, copy the key, and follow these instructions.
-   On your GitHub account, [go to settings](https://github.com/settings/profile)
-   Go to [SSH and GPG keys](https://github.com/settings/keys)
-   Then new [SSH key](https://github.com/settings/ssh/new)
-   Enter the title "your key"
-   Paste the copied SSH key in the big box
-   Run command `ssh -T git@github.com` to check if the configuration is ok

This should give you the following message ***Hi username! You've successfully authenticated, but GitHub does not provide shell access.*** Now you are good to go with SSH protocol

To start our clone run `git clone (SSH URL)`

Example

```bash
git clone git@github.com:kimkimani/engineering-education.git
```

Output

```bash
Cloning into 'engineering-education'...
Enter passphrase for key '/c/Users/kim/.ssh/id_rsa':
remote: Enumerating objects: 20, done.
remote: Counting objects: 100% (20/20), done.
remote: Compressing objects: 100% (16/16), done.
remote: Total 9676 (delta 8), reused 14 (delta 4), pack-reused 9656
Receiving objects: 100% (9676/9676), 108.32 MiB | 116.00 KiB/s, done.
Resolving deltas: 100% (5361/5361), done.
Updating files: 100% (785/785), done.
```
**NOTE:** make sure the link you copy is SSH. And remember to use the password you used when generating the SSH key to make authentication for `passphrase for key '/c/Users/you/.ssh/id_rsa\':` If you do not enter the SSH password, you will run into the following output ***Please make sure you have the correct access rights and the repository exists.***

A copy of the remote is now available on your local computer on the location you entered on the Git Bash command with the folder name the same as the name of the repository in the remote repository. In case you want to have a different project folder use the clone command followed by the name of your preferred folder.

```bash
git clone git@github.com:section-io/engineering-education.git folder-name
```

When using a forked repo, the original repository will regularly be updated with commits. These commits are not directly updated to your repository, thus you need to regularly update your fork to keep it up to date with the original repository.

### Updating a fork using GitHub web UI
The process is simple and clear. Go to your forked repository in your GitHub account, you will see the number of commits that the original repository has, and have and not been updated to your forked repository.

![commit to upate](/engineering-education/how-to-sync-and-update-a-forked-repo/commits-to-update.png)

Click compare.

![compare](/engineering-education/how-to-sync-and-update-a-forked-repo/compare.png)

Use switch to base link.

![switch to base](/engineering-education/how-to-sync-and-update-a-forked-repo/switch-to-base.png)

If the switch to base is not available, use the dropdown to manually select the repositories to compare. When the comparing selections are correctly selected, you will be able to see the commits that are not updated to your fork.

![repo comparison](/engineering-education/how-to-sync-and-update-a-forked-repo/repo-comparison.png)

Continue to the green button and create a pull request.

![create pull request](/engineering-education/how-to-sync-and-update-a-forked-repo/create-pull-request.png)

Enter a title "updating my fork", comment as well, and proceed to
create a pull request.

![creating pull request](/engineering-education/how-to-sync-and-update-a-forked-repo/start-creating-pull-request.png)

Scroll to merge request.

![merge pull request](/engineering-education/how-to-sync-and-update-a-forked-repo/merge-pull-request.png)

Confirm merge.

![confirm merge](/engineering-education/how-to-sync-and-update-a-forked-repo/confirm-merge.png)

And you are done, your fork is now updated successfully. The fork is updated on the remote and you now need to update the changes to your local repository. Go to your GitHub desktop and make sure your current repository you are working with is selected.

![current repo](/engineering-education/how-to-sync-and-update-a-forked-repo/current-repo.png)

You will able to see a "pull origin". What this does is it pulls the remote changes to your local repository.

![update to local repo](/engineering-education/how-to-sync-and-update-a-forked-repo/update-to-local-repo.png)

Click "pull origin" and your local repository will be updated and the same as the remote repository.

### Summary
### Updating a fork using Git Bash.
You have successfully forked your interested repository. However, you occasionally need to keep it up to date with the original repository. The original repository is commonly referred to upstream by Git Bash command.

To update your fork with the upstream, you need to get the remote to your local repository so that you can fetch available changes made in the original repository and push the changes to your local repository.

To get started navigate to your cloned repository (already on your local computer) and open the project folder with Git Bash or open Git Bash and change the directory to point the cloned repository on your local storage. i.e.

```bash
cd ~/Documents/GitHub/engineering-education
```

By default, your local repository is not directly linked to the original repository. Configure the remote upstream to be available locally.

```bash
git remote -v
```

OUTPUT

```bash
origin  git@github.com:kimkimani/engineering-education.git (fetch)
origin  git@github.com:kimkimani/engineering-education.git (push)
```

At this point, only the original repository is linked (The remote repository that you forked from the original). Link your repository with the remote or the original repository.

```bash
git remote add upstream <ssh url from the original repository>
git remote add upstream git@github.com:section-io/engineering-education.git
```

Run

```bash
git remote -v
```

To confirm if your remote upstream is available on your local repository origin.  
Output

```bash
git@github.com:kimkimani/engineering-education.git (fetch)
origin  git@github.com:kimkimani/engineering-education.git (push)
upstream        git@github.com:section-io/engineering-education.git (fetch)
upstream        git@github.com:section-io/engineering-education.git (push)
```

What you need now is to fetch the changes/commits from the upstream  

```bash
git fetch upstream
```
Output

```bash
Enter passphrase for key '/c/Users/kim/.ssh/id_rsa':
remote: Enumerating objects: 139, done.
remote: Counting objects: 100% (139/139), done.
remote: Compressing objects: 100% (66/66), done.
remote: Total 131 (delta 88), reused 105 (delta 65), pack-reused 0
Receiving objects: 100% (131/131), 696.24 KiB | 11.00 KiB/s, done.
Resolving deltas: 100% (88/88), completed with 8 local objects.
 * [new branch]      EngEd-template-idea-form -> upstream/EngEd-template-idea-form
 * [new branch]      add-section-home       -> upstream/add-section-home
 * [new branch]      address-resolution-protocol -> upstream/address-resolution-protocol
 * [new branch]      authors-link           -> upstream/authors-link
 * [new branch]      clustering-algorithms  -> upstream/clustering-algorithms
 * [new branch]      documentation          -> upstream/documentation
 * [new branch]      fix-topic-capitalization -> upstream/fix-topic-capitalization
 * [new branch]      fixing-blank-author-pages -> upstream/fixing-blank-author-pages
 * [new branch]      fourth                 -> upstream/fourth
 * [new branch]      introduction-web-assembly -> upstream/introduction-web-assembly
 * [new branch]      knapsack               -> upstream/knapsack
 * [new branch]      make-author-pages-work -> upstream/make-author-pages-work
 * [new branch]      man-in-the-middle-attack -> upstream/man-in-the-middle-attack
 * [new branch]      master                 -> upstream/master
 * [new branch]      matplotlib-visualization-python -> upstream/matplotlib-visualization-python
 * [new branch]      nodejs-backend-frontend -> upstream/nodejs-backend-frontend
 * [new branch]      nodejs-cta-blocks      -> upstream/nodejs-cta-blocks
 * [new branch]      pr/54                  -> upstream/pr/54
 * [new branch]      private-block-chain    -> upstream/private-block-chain
 * [new branch]      quality-checker-action -> upstream/quality-checker-action
 * [new branch]      remove-articles        -> upstream/remove-articles
 * [new branch]      remove-unused-topic-pages -> upstream/remove-unused-topic-pages
 * [new branch]      site-mapping           -> upstream/site-mapping
 * [new branch]      supervised-machine-learning -> upstream/supervised-machine-learning
 * [new branch]      testing-author-page-blank -> upstream/testing-author-page-blank
 * [new branch]      vlan-trunking          -> upstream/vlan-trunking
 * [new branch]      vm-vs-containers       -> upstream/vm-vs-containers
```

You have fetched the changes, commits, and branches that you need to merge to the head branch.
Before doing the merge, make sure you are updating this changes on your master.

```bash
git checkout upstream/master

```

Output

```bash
Note: switching to 'upstream/master'.
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.
If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command.

Example:
  git switch -c <new-branch-name>

Or undo this operation with:
  git switch -

Turn off this advice by setting config variable advice.detachedHead to false
HEAD is now at 1335657 Merge pull request #272 from kimkimani/most-useful-NodeJs-packages

```

```bash
git checkout master
```

OUTPUT
`bash
Previous HEAD position was 1335657 Merge pull request #272 from kimkimani/most-useful-NodeJs-packages
Switched to branch 'master'
Your branch is up to date with 'origin/master
`

This points to the branch you are already on, once on the master branch, merge it with the upstream.

```bash
git merge upstream/
```

Output

```bash
Updating d9acac5..646cb27
Fast-forward
 articles/huffman-coding-in-python/hero.jpg         | Bin 0 -> 27160 bytes
 articles/huffman-coding-in-python/Code_Output.jpg  | Bin 0 -> 16932 bytes
 articles/huffman-coding-in-python/index.md         | 185 ++++++++++++++
 articles/huffman-coding-in-python/optimaltree.jpg  | Bin 0 -> 48468 bytes
 .../stripe-integration-react/api_test_keys.jpg     | Bin 0 -> 160402 bytes
 articles/stripe-integration-react/dashboard.jpg    | Bin 0 -> 147132 bytes
 articles/stripe-integration-react/final_output.jpg | Bin 0 -> 90318 bytes
 articles/stripe-integration-react/hero.jpg         | Bin 0 -> 30446 bytes
 articles/stripe-integration-react/index.md         | 281 +++++++++++++++++++++
 articles/stripe-integration-react/paymentflow.jpg  | Bin 0 -> 71723 bytes
 articles/stripe-integration-react/paywithcard.jpg  | Bin 0 -> 65169 bytes
 11 files changed, 466 insertions(+)
 create mode 100644 articles/huffman-coding-in-python/Code_Output.jpg
 create mode 100644 articles/huffman-coding-in-python/hero.jpg
 create mode 100644 articles/huffman-coding-in-python/index.md
 create mode 100644 articles/huffman-coding-in-python/optimaltree.jpg
 create mode 100644 articles/stripe-integration-react/api_test_keys.jpg
 create mode 100644 articles/stripe-integration-react/dashboard.jpg
 create mode 100644 articles/stripe-integration-react/final_output.jpg
 create mode 100644 articles/stripe-integration-react/hero.jpg
 create mode 100644 articles/stripe-integration-react/index.md
 create mode 100644 articles/stripe-integration-react/paymentflow.jpg
 create mode 100644 articles/stripe-integration-react/paywithcard.jpg
```

If the upstream and master have no changes to merge , ***Already up to date.*** message will be printed on your Git Bash. These changes are committed to your local repository,

```bash
git checkout master
```

Output

```bash
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 25 commits.
(use "git push" to publish your local commits)
```

Push these commits to publish them to your remote repository.

```bash
git push
```

And you are done. Refresh your remote repository, it will be up to date with the upstream.

We have forked, cloned, our repository is up to date, plus we are ready to work on our contributions. Before you submit your contributions, make sure you work on your changes and your content is well formatted ready to make a pull request.

### Submit contributions using GitHub desktop
For convenience, open GitHub and open the repository with your preferred text editor.

![open text editor](/engineering-education/how-to-sync-and-update-a-forked-repo/open-editor.png)

If you are using Visual Studio Code, your cloned folder should look similar to this

![editor opened](/engineering-education/how-to-sync-and-update-a-forked-repo/editor-opened.png)

Since we are trying to make our contributions to [Section](https://github.com/section-io/engineering-education), navigate to the articles folder.

![articles folder](/engineering-education/how-to-sync-and-update-a-forked-repo/articles-folder.png)

Create a folder to work with.

![create folder](/engineering-education/how-to-sync-and-update-a-forked-repo/create-folder.png)

Add your contributions (i.e. [index.md](https://guides.github.com/features/mastering-markdown/), hero image, and other media where necessary).

![folder content](/engineering-education/how-to-sync-and-update-a-forked-repo/folder-contents.png)

When you are done adding all your content, you now need to commit the changes to your remote GitHub repository. Launch your GitHub desktop and you will be able to see the changes you have added.

![changes](/engineering-education/how-to-sync-and-update-a-forked-repo/changes.png)

It is now simple from here, create a branch that will have your changes.

![to create branch](/engineering-education/how-to-sync-and-update-a-forked-repo/to-create-branch.png)

![creating branch](/engineering-education/how-to-sync-and-update-a-forked-repo/creating-branch.png)

Since we have our changes ready, we need to merge these changes to the branch we have created. i.e. "the changes on your folder and your work in progress will follow to the new branch" and click switch to branch.

![switch to branch](/engineering-education/how-to-sync-and-update-a-forked-repo/switch-to-branch.png)

Publish the branch to your remote GitHub account and make sure you add a commit message as the summary.

![commit to branch](/engineering-education/how-to-sync-and-update-a-forked-repo/commit-to-branch.png)

Your branch content is on your remote GitHub repository, and you need to create a pull request to the origin repository to contribute your changes.

![branch pull request](/engineering-education/how-to-sync-and-update-a-forked-repo/branch-pull-request.png)

The create a pull request button will redirect you to your GitHub account where you now need to create a pull request. Make sure your title is relevant to the content you want to publish. Write a comment in the comment box with brief details of your content.

![pull request redirect](/engineering-education/how-to-sync-and-update-a-forked-repo/pull-redirect.png)

Once the pull request button is hit, you are done, you have submitted your contributions successfully.

![done](/engineering-education/how-to-sync-and-update-a-forked-repo/done.png)

Wait for your content to be reviewed and if any further changes are needed, a comment will be left by the reviewer suggesting possible changes you should make under your pull. Make your edits on your text editor and make a commit to update the changes and remember to have a summary of the commit you are making for better referencing.

### Submit contributions using Git bash.
Since you have a clone available on your local computer, start working on you contributions using a text editor. Format your content according to the guidelines of the original repository.

Once you are done and ready to publish the content, it is advisable to push your changes under a branch and not to the master repository. This will help you to work and contribute changes under different topics without branch or merge conflicts.

When the content (topic) is ready, create a branch and make sure you checkout on the branch as it will hold all your changes you are working on. Open GitHub local directory on Git Bash.  

If you run

```bash
git branch
```

OUTPUT

```bash
* master
```

All the branches you have created will be printed, in this case we have master branch, which is the current checkout. Create a new branch, with the name relevant to the topic or the content you want to push.

```bash
git branch <branch name>
git branch my-first-contributions
```

The new branch has been created.
To confirm if the new branch was really created, run

```bash
git branch
```

OUTPUT

```bash
* master
  my-first-contributions
```

Checkout the new branch you have created

```bash
git checkout <branch name>
git checkout my-first-contributions
```

OUTPUT

```bash
Switched to branch 'my-first-contributions'
```

All the available changes that you have made will be directed to the branch on the checkout. To check the changes you have created/modified run

```bash
git status
```

OUTPUT

```bash
On branch my-first-contributions
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        articles/new-folder-name/
nothing added to commit but untracked files present (use "git add" to track)
```

These changes are available on the local repository, and you need to make them ready to be pushed to your remote. To do this, run

```bash
git add . (make sure the fullstop after git add is included)
```

Run to confirm the changes are ready.

git status
```bash
On branch my-first-contributions
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   articles/new-folder-name/hero.jpg
        new file:   articles/new-folder-name/index.md
```

Your file changes will be highlighted green, meaning ready to be published to remote. These changes are ready to be committed

```bash
git commit -m "my first contribution"
```
```bash
[my-first-contributions 6b5e391] my first contribution
 2 files changed, 1 insertion(+)
 create mode 100644 articles/new-folder-name/hero.jpg
 create mode 100644 articles/new-folder-name/index.
```

Push to the branch

```bash
git push origin my-first-contributions
```

Your content is now on your remote forked repository. To share your contributions to the team, you need to make a pull request. Go to your GitHub account, under your forked repository.

![compare and pull request](/engineering-education/how-to-sync-and-update-a-forked-repo/compare-and-pull-request.png)

Click the compare and pull request button.

![pull request redirect](/engineering-education/how-to-sync-and-update-a-forked-repo/pull-redirect.png)

And you are done. Wait for your content to be reviewed, make changes where necessary and your pull request will be merged to the team project.

![done](/engineering-education/how-to-sync-and-update-a-forked-repo/done.png)

**Note:** every time you are making new contributions, ensure your remote fork and the local repository are up to date.

### Conclusion
The outputs highlighted on this article may not directly match to what will be printed to your Git Bash as that depend on the commits already published when making a clone or updating a clone as well as the file changes you have made.

### References
[GitHub with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)

[GitHub authentifications](https://docs.github.com/en/github/authenticating-to-github)

[How to clone GitHub repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositorysitories/cloning-a-repository)

[Using Git ](https://docs.github.com/en/github/using-git)

[Issues and pull requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests)

[Troubleshoot SSH](https://docs.github.com/en/github/authenticating-to-github/troubleshooting-ssh)

[GitHub workflow management](https://docs.github.com/en/github/managing-your-work-on-github)

[GitHub desktop](https://docs.github.com/en/github/getting-started-with-github/github-desktop#about-github-desktop)

[Best Text Editors](https://www.techradar.com/best/best-text-editors)

---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)
