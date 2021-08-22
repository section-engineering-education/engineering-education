### Introduction
If you've been thinking about setting up your `Git server` for personal projects but haven't had the time, now is the moment. I figured it was about time to put up a local GitLab installation now that Proxmox can host containers/virtual machines for anything.

Ideally, you'd like to push all updates to the local GitLab server, which would then be seamlessly moved to the distant GitLab.com repository. Fortunately, the repository mirroring feature of GitLab's free edition makes this possible! You can either push or pull updates while mirroring a repository. Pulling updates is not free, but pushing updates is. This works nicely because all you have to do now is push updates to achieve your goal.

### Table of contents
- [Installation of Gitlab ](#installationof-gitlab)
- [GitLab configuration](#gitlab-configuration)
- [How to export GitLab project from GitLab.com](#how-to-export-gitlab-project-from-gitlab-com)
- [GitLab project import into your local GitLab server](#gitLab-project-import-into-your-local-gitlab-server)
- [Configuring repository mirroring](#configuring-repository-mirroring)
- [Switching to your local GitLab repository](#Switching-to-your-local-gitlab-repository)
- [Verifying proper mirror configuration](#verifying-proper-mirror-configuration)
- [Conlusion](#conlusion)


### Installation of Gitlab 
We'll set up Ubuntu locale and install Gitlab for Ubuntu running on LXC Container in Proxmox. It's as simple as installing dependencies and creating a new repository, according to GitLab's instructions. Installing programs on Ubuntu using a classic package repository follows a relatively standard procedure. Simply use the commands below to install the required dependencies, package repository, and GitLab : 

> Login as the root user to be able to run the command given in this tutorial. To login to ubuntu as a root user, type the command `sudo su` on the ubuntu terminal and the system will prompt you to enter your password to verify the user.

```bash
apt-get install -y curl openssh-server ca-certificates tzdata perl
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
EXTERNAL_URL="https://gitlab.example.com" apt-get install GitLab-ee
```

> The EXTERNAL URL above must be replaced with the right URL for accessing your GitLab server. Before setting the URL, double-check that your hostname/DNS is configured correctly so that you can visit your GitLab server after installation. Please keep in mind that in order for your GitLab server to install a Let's Encrypt certificate, you'll need to provide external access to it (which is a more difficult process). 

Even though the installation process is straightforward, I received two warnings, one of which appeared to prevent the installation from proceeding.

#### set the locale in Ubuntu.
The first warning was for failing to set a locale. Because I used an LXC template to create a new Ubuntu installation in Proxmox, it does not prompt you to set the locale during the container formation process, as it would with a standard OS installation. As a result of an incomplete installation, I was unable to access GitLab's online interface.

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

To set a locale, use the following command to generate one:

```bash
locale-gen en_US.UTF-8
```

If your system does not support United States English, you should pick a different locale than the one shown below. Once the locale has been created, make the following changes to the system locale:

```bash
update-locale LANG=en_US.UTF-8
```

You'll need to reboot your container for the changes to take effect.
The lack of a root password

#### Not having a Root Password
The second issue was an error message that appeared throughout the installation process, claiming that the root password for GitLab had not been set. After launching the web interface for the first time, you'll be able to set it, but only after you've connected to GitLab, according to the installation instructions. It was necessary to update other programs after entering a password on the website. I used the standard apt update and apt upgrade instructions. Because it had a root password, it completed the entire GitLab installation procedure. That process seemed strange to me at first, but it worked.

### GitLab configuration
Before you set up your repository mirror, you must have a bare minimum configuration set up on your GitLab installation. Rather than assuming you already have things configured, I'll discuss what I believe is the bare minimum of configuration required for everything to work effectively.

#### Configure email in your GitLab installation
Set up your email settings if you haven't previously done so after installing GitLab before moving on. Configuring the email server is required if you wish to get notifications from your GitLab server via e-mail

On GitLab's website, there are various setup samples. For my setup, I just utilized Gmail to send myself emails. Because I don't have to run a local mail server, I sometimes prefer to utilize Gmail. Additionally, because the email sent from your server does not originate from a well-known email service provider, it is less likely to be rejected or labeled as spam when sent to multiple email accounts.

#### Create a GitLab user on your local machine.
Your project may not have a user account on your GitLab server. If this is the case, you can create one by using the root administrator account. Because you don't want to utilize the root user account, you'll need the user account to import your GitLab.com project. It is not required that you use the same user account name as your GitLab.com account. To ensure that all commits to a remote repository are made by the same GitLab.com user, even if your local identity differs from your GitLab.com identity, you can specify the user account in the URL when pushing changes to a remote repository. So that everything looks to be the same user, I made my username the same for both.

### How to export GitLab project from GitLab.com
It's time to export your project from GitLab.com now that your local GitLab server is up and running. Expand the `Advanced` section on the `Settings > General` page.

GitLab.com may take some time to build your exported project file, depending on the size of your project. You can check if the export is complete by refreshing the page. The `Download export` and `Generate new export` buttons should be noted. To obtain a copy of your exported project, click the `Download Export` button.



### GitLab project import into your local GitLab server
You can now import the repository you exported from GitLab.com using the user account you created on your GitLab server. 

**step by step procedure of importing gitlab project**

- Go to the page `Projects > GitLab Import.` You'll need to fill out the `Project name` and `Project slug` fields, which are used to uniquely identify the project within your repository. The **Project URL** is presented dependent on the GitLab installation method you chose. It's displayed so you can see your repository's entire URL. You'll need to select the exported file you want to import by clicking the `Choose File` option.

- When you're ready to import, click the `Import project` button.
You'll notice a notification that says `Import in Progress` while you're importing the project.  

- After the import process, you'll see the imported project in your `Projects` menu once the import has been completed successfully.


### Configuring repository mirroring
Your local GitLab repository should now have the same commit history and data as the remote GitLab repository. 

> Do not make any new changes to your GitLab.com database for all of your future commits to be pushed through your local GitLab repository.

You must go to the `Settings > Repositories` tab to configure mirroring. Then open the `Mirroring repositories` section to view the appropriate mirroring settings.

You'll need to provide the `Git repository URL` for your project on GitLab.com, which you may get using the `Clone` button. In this case, I'm utilizing HTTPS. In addition, I modified the URL to incorporate my GitLab.com login. This may not be necessary if there is only one project user, but I decided to include it nonetheless. For GitLab.com, I entered the user's `Password`. To finish setting up the mirror, click the `Mirror repository` button.

### Switching to your local GitLab repository
After you've imported the project into your local GitLab server and configured mirroring, you'll need to switch to the repository on your GitLab server. This technique will work regardless of which IDE/editor you use to switch to your repository if you utilize the git command line. I'll utilize the command line way instead of showing examples in different user interfaces because it should work for everyone. Even if you dislike command-line tools, the procedure is pretty straightforward. You can copy/paste the repository URL from your GitLab-hosted project's `Clone` button and use it in the following command:

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

Instead of GitLab.com, your repository now uses the URL of your GitLab server. So, that's all there is to mirroring your repository. You may now start submitting commits to your local repository to test if the changes are pushed to GitLab.com.

### Verifying proper mirror configuration
If you want to verify that repository mirroring is working properly, navigate to `Settings > Repository` and open the `Mirroring repositories` section on your GitLab server. You should be able to view the most recent failed update attempt as well as the most recent successful update.

To double-check for a successful push, go to GitLab.com's `Repository > Commits` page and see if your most recent update was pushed to GitLab.com. If everything went well, the last commit will be displayed.

### Conlusion
Mirroring a GitLab repository is rather simple, as illustrated. Even if you already have a repository, you can complete the process by exporting and importing the GitLab project. To transfer your project to the local GitLab server, all you need is a simple git command. Using the mirroring setting will automatically keep the remote repository up-to-date with the latest updates.