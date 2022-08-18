Welcome to the EngEd program,

Let's begin by creating your EngEd profile.

Be sure to include a short Author Biography and Headshot image[add some guides]. Please include the files in the authors folder within the GitHub repo. 

Your EngEd profile will be important to have updated and presentable as this will serve as a valuable reference to share with peers, potential employers, and the broader technology community.

We also want to make sure you receive credit for all your hard work.

### Create author bio folder structure
Within the authors folder (inside the content folder), create a new folder using the intended author name. (Reference existing folders' naming conventions.)

Be sure to:
- **Use all lowercase.**
- **Use dashes in place of spaces.**
- **Do not include any special characters.**
- **Try to keep it under 40 characters.**
- **Avoid using periods (.) or commas (,) or (_ ) underscores**

Within that a folder, upload your prepared .md file containing a short author description using the filename `index.md`. 

Upload any corresponding headshot image of the author using the file name `avatar`(jpg or png format). Please try to keep this image as close to 600X400 pixels (images can be resized using [Pixlr Image Editor](https://pixlr.com/e)). 

Also, keep in mind that these Enged profiles are intended to be shared and referenced among peers, potential employers, and the broader technology community. Lets do our best to keep them professional.

Add these files to the same PR (pull request).

### Example author profile - `index.md`: 
```
title: Student Name // Required
type: authors // Required
github: GITHUB_URL
linkedin: LINKEDIN_URL
twitter: TWITTER_URL
website: WEBSITE_URL
images: 
  - url: /engineering-education/authors/avatar.jpeg // Required
resume: RESUME_URL
skills: ['Skill1', 'Skill2']
projects: 
  - title: Project Title
    role: Role of the project
    date: Jan 2022
    description: Project Description
    url: https://URL_OF_PROJECT.com
```

## File Structure - explained
- title (Name of student - **Required**)
- type (Authors file - **Required**)
- github (GitHub URL - Optional)
- linkedin (LinkedIn URL - Optional)
- twitter (Twitter URL - Optional)
- website (Author website URL - Optional)
- resume (link to a resume - optional)
- images (Author avatar image - **Required**)
- skills (Author skills/languages - an array of strings - Optional)
- projects:
-   - title: Project Title
-     role: (optional)
      date: Date project was created
      description: Project Description
      url: https://URL_OF_PROJECT.com
-   

Congratulations! Your EngEd profile is now ready to be reviewed and created. If you have an article/tutorial ready to be submitted attach it to that pull request (otherwise create a new pull request) & we'll be happy to review it.

### EngEd Badge Info
1. Content Moderator Badge: This badge is awarded to any students who have successfully completed Peer Reviewer training and Content Moderator training.
2. Peer Reviewer Badge: This badge is awarded to any students who have completed Peer Reviewer training (and reviewed articles successfully).
3. CCC Contributor: This badge is awarded to any students who have submitted a CCC (community code contribution) to the EngEd program that was reviewed and merged. 
4. Hackathon Participants: This badge is awarded to any students who have successfully submitted a project to an EngEd hackathon.
5. Hackathon Winner(s) by year: This badge is awarded to any students who have won an EngEd hackathon.
6. Community builder badge: This badge is awarded to any students who have created (or co-created/moderated) a sub-channel community.
