## How to upload an article for Section’s Engineering Education Program:

**Prerequisites:**
- Github account
- Text editor, such as [Visual Studio Code](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), [Atom](https://atom.io/)
- Prepared markdown (.md) file. (Note: All articles must be submitted in properly-formatted markdown). See [Github Markdown guide](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

### Fork the repository
In order to upload your prepared .md file to Github, first, click the **Fork** option in the upper right-hand corner (pictured below).

![Fork Image](/static/images/fork_image.png)

Once you have successfully forked over to your repository:
- You should notice your username in the upper left-hand corner (top red arrow).
- If a Github Action notice pops up, click **Dismiss** (red arrow in the middle).

General rules:
Students should always be branching from their master

Students should always keep their fork up to date with section-io/engineering-education

### Clone the forked repository
Next, you will need to clone the repository to your local computer.

![clone repository](/static/images/clone-repository.png)

Open the newly cloned repository in your text editor. It should look something like this (shown in Visual Studio Code):

![repository text editor](/static/images/new-vs-code-shot.JPG)

Note: When working with multiple articles simultaneously, it's best to create and work on separate branches for each article. (Here is a [short video](https://www.youtube.com/watch?v=oPpnCh7InLY&t=577s) on how Github Branches work.)

### Create article folder structure
Within the articles folder (inside the content folder), create a new folder using the intended url for the article. (Reference existing folders' naming conventions.) 

Be sure to:
- **Use all lowercase.**
- **Use dashes in place of spaces.**
- **Do not include any special characters.**
- **Try to keep it under 40 characters.**
- -**Avoid using periods (.) or commas (,)**

![create article folder](/static/images/create-article-folder.png)

Within that article folder, upload your prepared .md file containing article contents using the filename `index.md`. Upload any corresponding image files referenced in your article. When referencing images, be sure to use the following naming convention with your newly created article directory. 

For example:
```
![image title](/new-folder-name/image-name.jpg)
```
If you have a header (hero) image in mind, feel free to include it your PR as well. Please try to keep images as close to 600X400 pixels (images can be resized using [Pixlr Image Editor](https://pixlr.com/e)) and make sure you have the appropriate copyright to use it. Sites like [Unsplash](https://unsplash.com) have Creative Commons images which you can use for free.

Any images within the article need to be hosted on our site - place the image in the proper folder) - and have the proper image paths in the article similar to the hero image and have citations (attribution) if required.

Your folder should look similar to this:

![folder contents](/static/images/folder-contents.png)

Once your files are properly uploaded and organized, add, commit, and push your changes to your forked remote Github repository either using the command line or the Github tools within your text editor.

### Create pull request
Open Github. You should see a message indicating your pushed changes with a button to 'Compare & pull request'.

![compare pull request](/static/images/compare-pull-request.png)

Open a pull request that includes the name of your article and a description of the contents that you are submitting.

![OpenPR_image](/static/images/openPR_image2_.PNG)

***Note***: Make sure your repository is up to date with the EngEd repository before contributing new articles.

### do this once
git remote add section http://github.com/section-io/engineering-education

### then use this every time before contributing a new article to keep it up to date
git fetch section

git pull --rebase section master

git push origin

Here is a [link](https://www.youtube.com/watch?v=nT8KGYVurIU&t=47s) to a short video further explaining what a **pull request** is and how to **fork** a Github repository.

Before submitting your article make sure you take advantage of this useful tool, [Hemingway](http://www.hemingwayapp.com) that helps with word count, formatting, and grammar/readability.

By highlighting lengthy, complex sentences and common errors, it helps make any writing BOLD & CLEAR. If you see a yellow sentence, you may want to shorten or split it. Please use on all future articles before submitting a PR (pull request).

To review your Code Snippets or examples before submitting, take full advantage of the free online tool, [repl.it](https://repl.it). Use it to run and compile any code snippets to be included in your article.

### Including videos in your articles
If you would like to include a (step-by-step) video to one of your How To Guide or Tutorial videos feel free to do so as a YouTube iframe. Below is a step by step example on how to include a YT iframe to your .md files.

Upload the [video to YouTube](https://www.wix.com/blog/2019/02/how-to-upload-video-youtube-guide/) (if it isn't already).

![Copy YouTube Embed Code](/static/images/yt-video-embed.png)

Take that copied embed code and paste it into your .md (markdown) file where you would like it to be placed. The code should look something like this:

`<iframe width="956" height="538" src="https://www.youtube.com/embed/npnp--SSx_8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

*NOTE:* If the width and height are not `width="478" height="269"` be sure to change the sizes to fit our web page format.

Finally, if you're a first time contributor, be sure to include a short Author Biography and Headshot image. Please include the files in the authors folder within the GitHub repo. We want to credit you for your hard work.

Congratulations! Your article is now ready to be submitted for review and approval by the Section team. Open a PR and we'll be happy to review it.
