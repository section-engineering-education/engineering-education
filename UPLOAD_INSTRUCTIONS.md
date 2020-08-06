## How to upload an article for Section’s Engineering Education Program:

**Prerequisites:**
- Github account
- Text editor, such as [Visual Studio Code](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), [Atom](https://atom.io/)
- Prepared markdown (.md) file. (Note: All articles must be submitted in properly-formatted markdown.) 

### Fork the repository
In order to upload your prepared .md file to Github, first, click the **Fork** option in the upper right-hand corner (pictured below).

![Fork Image](/images/fork_image.png)

Once you have successfully forked over to your repository:
- You should notice your username in the upper left-hand corner (top red arrow).
- If a Github Action notice pops up, click **Dismiss** (red arrow in the middle).

### Clone the forked repository
Next, you will need to clone the repository to your local computer.

![clone repository](/images/clone-repository.png)

Open the newly cloned repository in your text editor. It should look something like this (shown in Visual Studio Code):

![repository text editor](/images/repository-text-editor.png)

Note: When working with multiple articles simultaneously, it's best to create and work on separate branches for each article. (Here is a [short video](https://www.youtube.com/watch?v=oPpnCh7InLY&t=577s) on how Github Branches work.)

### Create article folder structure
Within the articles folder, create a new folder using the intended url for the article. (Reference existing folders' naming conventions.) Be sure to:
- Use all lowercase.
- Use dashes in place of spaces.
- Do not include any special characters.
- Try to keep it under 40 characters.

![create article folder](/images/create-article-folder.png)

Within that article folder, upload your prepared .md file containing article contents using the filename `index.md`. Upload any corresponding image files referenced in your article. When referencing images, be sure to use the following naming convention with your newly created article directory. For example: 
```
![image title](/engineering-education/new-folder-name/image-name.jpg)
```
If you have a Header image in mind - (for the hero image) -feel free to include it your PR as well - please try to keep images as close to 600X400 pixels (images can be resized in paint) - also please make sure the image is from a site like www.unsplash.com

Any images within the article need to be host on our site - place the image in the proper folder - and have the proper image paths in the article similar to the hero image. 
With proper citation if required.

Your folder should look similar to this:

![folder contents](/images/folder-contents.png)

Once your files are properly uploaded and organized, add, commit, and push your changes to your forked remote Github repository either using the command line or Github tooling within your text editor.

### Create pull request
Open Github. You should see a message indicating your pushed changes with a button to 'Compare & pull request'.

![compare pull request](/images/compare-pull-request.png)

Open a pull request that includes the name of your article and a description of the contents that you are submitting.

![OpenPR_image](/images/openPR_image2_.PNG)

Here is a [link](https://www.youtube.com/watch?v=nT8KGYVurIU&t=47s) to a short video further explaining what a **pull request** is and how to **fork** a Github repository.

Before submitting your article make sure you take advantage of this useful tool that helps with word count, formatting, and grammar/readability.
Helps make any writing BOLD & CLEAR
It highlights lengthy, complex sentences and common errors. If you see a yellow sentence, you may want to shorten or split it.
Please use on all future articles before submitting a PR (pull request)

Include a short Author Biography and Headshot image to be included at the end of your articles.

http://www.hemingwayapp.com/

Congratulations! Your article is now ready to be submitted for review and approval by the Section team.

