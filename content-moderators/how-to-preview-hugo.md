### How to preview with Hugo
This section will go over how to download Hugo then use it to render/preview the [Section Engineering Education](https://github.com/section-engineering-education/engineering-education) repo locally using our static site generator, Hugo.

contributed by Ahmad Mardeni

### Step 1: Downloading Hugo
- Go to [Hugo releases](https://github.com/gohugoio/hugo/releases), scroll down and download the extended zip version for your OS.

#### Windows

- Create a folder wherever you want and name it *Hugo*, then inside that folder create *bin* folder.

- Unzip the file inside the *bin* folder you created and install Hugo by using *hugo.exe*.

- Search for "Edit the system environment variables" and open it.

![Environment variables](/static/images/first.PNG)

- Click on "environment variables".

![Environment variables](/static/images/second.PNG)

- Double-click on *Path* then *New*.

- Finally, add the path of the *bin* folder you created. For example, for me, it is `C:\Hugo\bin`.

- To check if it is installed correctly, just go to your *CMD* and type the command `Hugo version`.

#### Linux

**Note:** The Linux instructions will most likely work in a similar way to macOS and other Linux distributions but this has not been tested or confirmed outside Debian Linux.

- Install the .deb file you downloaded using `sudo dpkg -i hugo_extended_**{Latest Version}**.1_Linux-64bit.deb`

- Type `hugo version` to confirm Hugo has been installed.

### Step 3: Using VS Code
You can use VS Code (or any other Text Editor of your choice) and make sure you already connected your GitHub account to it.

**Note**: VS Code is the simplest Text Editor to use for previewing article because you can use the GitHub Pull Requests and Issues extension to checkout PRs rather than having to use the command line.

Now, after cloning [EngEd](https://github.com/section-engineering-education/engineering-education) repo, you have to download the *GitHub Pull Requests and Issues* extension by going to *extensions* then click on *install*:

![GitHub Pull Requests and issues extension](/static/images/third.PNG)

Go to GitHub "Under Extensions" and you will find the Pull Requests for our Repo (for the first time, it will ask you to connect your GitHub account, just click *yes*).

![GitHub](/static/images/fourth.PNG)

Now, search for the PR you are willing to review, double-click on it and click on *checkout*.

After that, click on terminal:

![Terminal](/static/images/fifth.PNG)

And in the "engineering-education" folder run the command `Hugo server -D`.

![Running Hugo](/static/images/sixth.PNG)

Finally, wait until it is finished then go to your browser, enter `http://localhost:1313/` and you will see the rendered Repo locally.
