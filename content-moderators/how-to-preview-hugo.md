### How to preview with Hugo
This section will go over how to download Hugo then use it to render/preview the [Section Engineering Education](https://github.com/section-engineering-education/engineering-education) repo locally using Hugo stactic site generator.

contributed by Ahmad Mardeni

### Step 1: Downloading Hugo 
- Go to [Hugo releases](https://github.com/gohugoio/hugo/releases), scroll down and download the extended zip version for your OS.

- Create a folder wherever you want and name it *Hugo*, then inside that folder create *bin* folder.

- Unzip the file inside the *bin* folder you created and install Hugo by using *hugo.exe*.

### Step 2: Add Hugo to the environment variables
- Search for "Edit the system environment variables" and open it.

![Environment variables](/static/images/first.PNG)

- Click on "environment variables".

![Environment variables](/static/images/second.PNG)

- Double-click on *Path* then *New*.

- Finally, add the path of the *bin* folder you created. For example, for me, it is `C:\Hugo\bin`.

- To check if it is installed correctly, just go to your *CMD* and type the command `Hugo version`.

### Step 3: Using VS code
You can use VS Code (you can use any Text Editor of your choice) and make sure you already connected your GitHub account to it.

Now, after cloning [EngEd](https://github.com/section-engineering-education/engineering-education) repo, you have to download the *GitHub Pull Requests and Issues* extension by going to *extensions* then click on *install*:

![GitHub Pull Requests and issues extension](/static/images/third.PNG)

Go to GitHub "Under Extensions" and you will find the Pull Requests for our Repo (for the first time, it will ask you to connect your GitHub account, just click *yes*).

![GitHub](/static/images/fourth.PNG)

Now, search for the PR you are willing to review, double-click on it and click on *checkout*.

After that, click on terminal:

![Terminal](/static/images/fifth.PNG)

And in the "engineering-education" folder run the command `Hugo server -D`.

![Runing Hugo](/static/images/sixth.PNG)

Finally, wait until it is finished then go to your browser, enter `http://localhost:1313/` and you will see the rendered Repo locally.
