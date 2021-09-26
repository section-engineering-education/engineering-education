---
layout: engineering-education
status: publish
published: true
url: /local-gitlab-repository-mirroring-to-an-external-gitlab-repository/
title: Local GitLab Repository Mirroring to an External GitLab Repository
description: In this tutorial, we will learn how to install Gitlab and how you can import Gitlab projects to a local Gitlab repository.
author: kelvin-munene
date: 2021-09-08T00:00:00-11:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/local-gitlab-repository-mirroring-to-an-external-gitlab-repository/hero.png
    alt: Local Gitlab Repository Mirroring to an External Gitlab Repository Image Example
---
If you have been thinking about setting up your `Git server` for personal projects but have not had the time, now is the moment. I figured it was about time to put up a local GitLab installation now that Proxmox can host containers/virtual machines for anything.
<!--more-->
Ideally, you'd like to push all updates to the local GitLab server, which would then be seamlessly moved to the remote `GitLab.com` repository.

Fortunately, the repository mirroring feature of GitLab's free edition makes this possible! You can push and pull updates while mirroring a repository.

Pulling updates is not free, but pushing updates is. This works nicely because all you have to do is push updates to achieve your goal.

#### Table of contents
- [Installation of Gitlab ](#installation-of-gitlab)
- [GitLab configuration](#gitlab-configuration)
- [How to export GitLab project from GitLab site](#how-to-export-gitlab-project-from-gitlab-site)
- [GitLab project import into your local GitLab server](#gitLab-project-import-into-your-local-gitlab-server)
- [Configuring repository mirroring](#configuring-repository-mirroring)
- [Switching to your local GitLab repository](#Switching-to-your-local-gitlab-repository)
- [Verifying proper mirror configuration](#verifying-proper-mirror-configuration)
- [Conclusion](#conclusion)

### Installation of Gitlab 
We'll set up the Ubuntu locale and install Gitlab for Ubuntu running on LXC Container in Proxmox. It is as simple as installing dependencies and creating a new repository; according to GitLab's instructions.

Installing programs on Ubuntu using a classic package repository follows a relatively standard procedure.

Simply use the commands below to install the required dependencies, package repository, and GitLab: 

> Login as the root user to be able to run the command given in this tutorial. To login to ubuntu as a root user, type the command `sudo su` on the ubuntu terminal, the system will prompt you to enter your password to verify the user.

```bash
apt-get install -y curl openssh-server ca-certificates tzdata perl
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
EXTERNAL_URL="https://gitlab.example.com" apt-get install GitLab-ee
```

> The EXTERNAL URL above must be replaced with the right URL for accessing your GitLab server. Before setting the URL, double-check that your hostname/DNS is configured correctly so that you can visit your GitLab server after installation. Please keep in mind that for your GitLab server to install a Let's Encrypt certificate, you'll need to provide external access to it (which is a difficult process). 

Even though the installation process is straightforward, I received two warnings, one of which appeared to prevent the installation from proceeding.

#### Setting the locale in Ubuntu
The first warning was for failing to set a locale. During the container formation procedure, it does not prompt you to specify the locale because you used an LXC template to make a fresh Ubuntu installation in Proxmox, as it would with a traditional OS installation.

As a result of an incomplete installation, I was unable to access GitLab's online interface.

If you use the locale command in the console and your locale isn't set, you'll get the following output:

```bash
LANG=C
LANGUAGE=
LC_CTYPE="C"
LC_COLLATE="C"
LC_NUMERIC="C"
LC_MONETARY="C"
LC_TIME="C"
LC_PAPER="C"
LC_NAME="C"
LC_MESSAGES="C"
LC_MEASUREMENT="C"
LC_IDENTIFICATION="C"
LC_ADDRESS="C"
LC_TELEPHONE="C"
LC_ALL=
```

The following command can be used to create a locale:

```bash
locale-gen en_US.UTF-8
```

If your system does not support United States English, you should pick a different locale than the one shown below.

Once the locale has been created, make the following changes to the system locale:

```bash
update-locale LANG=en_US.UTF-8
```

For the modifications to take effect, you'll need to restart your container. It's not possible to log in because there is no root password.

#### Fixing the lack of a root password
The second problem was an error notice that arrived throughout the installation process. It claimed that the GitLab root password had not been established.

After launching the web interface for the first time, you'll be able to set it, but only after you've connected to GitLab; according to the installation instructions.

It was necessary to update other programs after entering a password on the website. I used the regular apt update and upgrade procedures.

Since it had a root password, it completed the entire GitLab installation procedure. The process seemed strange to me at first, but it worked.

### GitLab configuration
For a repository mirror to work, GitLab needs to be configured to the absolute minimum.

Instead of presuming that you already have everything configured, I'll go over what I believe is the absolute minimum configuration required for everything to work properly.

#### Configure email in your GitLab installation
After installing GitLab, if you haven't already, set up your email settings. Configuring the email server is required if you wish to get notifications from your GitLab server via e-mail.

On GitLab's website, there are various setup samples. For my setup, I utilized Gmail to send me emails.

I sometimes prefer to use Gmail because I don't have to run a local mail server.

Furthermore, since your server's email does not originate from a well-known email service provider, it is likely to be rejected or branded as spam when sent to many email accounts.

#### Create a GitLab user on your local machine
Your project may not have a user account on your GitLab server. If this is the case, you can create one by using the root administrator account.

Considering you don't want to utilize the root user account, you'll need the user account to import your GitLab.com project.

It is not necessary to use the same username as your `GitLab.com` account.

Changes made locally can be published to a remote repository using the `GitLab.com` user account, even if your `GitLab.com` identity differs from your local identity.

As a result, I made sure that everything appeared to be from the same individual by using the same username for both accounts.

### How to export GitLab project from GitLab site
`GitLab.com` is ready to export your project now that your local server is up and running. On the `Settings` > `General tab`, expand the Advanced section.

As a result, `GitLab.com` may take a while to export your project. The export status can be checked by refreshing the page.

In addition, there are buttons for "Download export" and "Generate new export". A copy of your exported project can be obtained by clicking **Download Exported Project**.

#### GitLab project import into your local GitLab server
After creating a user account on your server, you can import the `GitLab.com` repository using the user account you created on your server.

**Step by step procedure of importing GitLab project**

- Go to the `Projects > GitLab Import` page. The Project name and Project slug fields, which are used to uniquely identify the project within your repository, must be filled out.

You'll see the **project URL** depending on which GitLab installation method you've chosen. It is displayed so that you could see the entire URL of your repository.

As soon as you're ready to import, click the `Import project` button on the toolbar to get started.

> There will be a notification that says import in progress while the project is being imported. 

- After the import process, you'll see the imported project in your `Projects` menu.

### Configuring repository mirroring
Your local GitLab repository should now have the same commit history and data as the remote GitLab repository.

> For all future commits to be pushed through your local GitLab repository, do not make any modifications to your GitLab.com database.

To configure mirroring, click on the `Settings > Repositories tab`. Then go to the section named **Mirroring repositories** to see the appropriate mirroring settings.

You'll need to input your project's `GitLab.com` repository URL, which you can acquire by clicking the Clone button. I will be using HTTPS in this scenario.

In addition, I changed the URL to include my `GitLab.com` username and password. If there is only one project, this may not be essential.

For `GitLab.com`, enter the user `Password`. When you are done, click on Mirror repository to complete the setup.

### Switching to your local GitLab repository
Your GitLab server must be switched to the repository after you've imported the project and configured mirroring.

This technique will work regardless of which IDE/editor you use to switch to your repository if you utilize the git command line.

I'll utilize the command line way instead of showing examples in different user interfaces because it should work for everyone. Even if you dislike command-line tools, the procedure is pretty straightforward.

You can copy the repository URL from your GitLab-hosted project's `Clone` button and use it in the following command:

```bash
git remote set-url origin http://git.carteblanchemunene.com/carteblanhemunene/carte-blanche-munene-website.git
```

You can check if your remote location has changed with the following command:

```bash
git remote -v
```

The following output should appear:

```bash
origin  http://git.carteblanchemunene.com/carteblanchemunene/carte-blanche-munene-website.git (fetch)
origin  http://git.carteblanchemunene.com/carteblanchemunene/carte-blanche-munene-website.git (push)
```

Instead of `GitLab.com`, your repository now uses the URL of your GitLab server.

It is that simple to mirror your repository. Test out your local repository by committing code and checking `GitLab.com` for changes made.

### Verifying proper mirror configuration
You can check if repository mirroring is working properly by going to `Settings > Repository` on your GitLab server and looking at the Mirroring repositories section.

If you look at the most recent successful update, you should also be able to see the most recent unsuccessful update attempt.

To double-check for a successful push, go to GitLab.com's `Repository > Commits` page and see if your most recent update was pushed to `GitLab.com`.

If everything went well, the last commit will be displayed.

### Conclusion
There is no need to be intimidated by mirroring GitLab repositories, as you can see. To complete the procedure, you can either export or import your GitLab repository.

The git command is all you need to migrate your project to the GitLab server.

This will automatically maintain the remote repository up-to-date with the latest updates when you use the mirroring setting.

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
