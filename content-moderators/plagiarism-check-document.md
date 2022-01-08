### Plagiarism checker 3rd party solution
We are currently using Copyleaks to run our 3rd party plagiarism checks on incoming PRs. 
(You should recieve an email to be added to the review "team"). Follow the instructions to sign-up and join up.

![CopyLeaks main page](/static/images/screen_capture.JPG)

We conduct a plagiarism check on every single PR that comes in for publishing. 

We try to only approve Pull Requests that have a % of 10 or less. (As long as there is not verbatim content). Anything way over 30% is a candidate for closure - especially if we notice content copied verbatim. 

Every article (pull request) should be considered on a case by case basis. 

Some red flags *may or may not* be actual red flags. 

We can (and should) look through the alerts brought forth and look through the article structure to ensure there is no plagiarism. 

Anything above 10% (but less than 30~%) we want to download the report to share with the contributor to work on refining the content as we do NOT want any future reader to encounter their work while reading our site. 

We share the report and attach it to the PR via GitHub. We let the contributor know that the report had some red flags (see templated responses for more details) and include the link to our docs on what is plagiarism. 

After you are signed up and on the main CopyLeaks page. 

Click on the right hand side button labeled "New Scan". 

Click on "Free Text" this will allow you to copy and paste the content in to conduct the scan. 

![Free text page](/static/images/free-text.JPG)

Over on GitHub using the labels go through (from the oldest to newest) list of PRs to perform our checks. 

![List of PRs to scan](/static/images/listofprs.JPG)

Click under "Files Changed" to better preview the text. Highlight and copy this PR text to past in the CopyLeaks screen. 

![Files changed preview](/static/images/files-changed.png)

Copy and paste the content and click Scan. 

![Scan](/static/images/scan.jpg)

Wait for the scan to complete and to see the results. (Once you are familiar with the process you can run multiple scans at one time - lets just not forget to name them correctly to keep track and future search).

After the scan is complete - go through the report carefully to keep an eye for false positives. 

![Download PDF](/static/images/download-pdf.jpg)

Be sure to rename the SCAN and PDF (when downloading) to match the PR name/number. This will help us for future searchs. 

![Rename](/static/images/rename.jpg)

After downloading the PDF report - upload to the PR via GitHub comments and a typical templated response can be:

>Upon running your article through our 3rd party plagiarism checker it seemed to raise a few flags and the % was higher than we typically accept.
>Please see attached PDF - and revisit the article to ensure we are contributing wholly unique and original content.
>Be sure to see our resources page to see more info on plagiarism and what is considered as such.

![comment](/static/images/comment.JPG)

If the article is subject to closure due to a high plagiarism score or verbatim, you can use the template below and attach the PDF report too.

> Hi @{author}
>
> Your article appears to have many sentences that are taken verbatim from third-party sources. We can't publish any content that is not original or properly cited/referenced. There are many free online tools where you can check this (such as quetext.com, and if you're uncertain about the definitions around plagiarism, this is a [good resource to reference](https://www.scribbr.com/category/plagiarism/).
> We're really looking for unique/original content.

### Closing incoming sub-par quality pull request
Apart for sharing any notes on plagiarism with authors, Content Moderators should be reviewing all in-coming pull request to make sure they are polished and ready to be published. CM will (quickly) check in incoming PRs for content, formatting, and grammar. 

>By quickly we mean going into pull request file cahnged view - ready the intial paragraphs and quickly deducing whether the article is difficult to understand or not. If so - we close the PR - if the intial paragraphs are clean, smooth, and easily understood. We can allow the peer reviewer to continue with a full review (by adding a new label "Ready to be reviewed"). This way, peer-reviewers can focus on quality content only. 

### Closing current pull request that are going overboard
Content moderators should be keeping an eye for peer reviewers that are over extending themselves. Go through the list of pull requests and open and pull request with more than 10 comments. Review the comments to see there is an excessive amount of back-and-forth. If the review looks like it should be better handled outside the queue, we can close the pull request (using a templated response). 

This is to ensure a fair process throughout the queue - it is not fair for contributors who are waiting (when their pull request is ready to be published) with a polished pull request. We can instruct the author to review our docs, and we can ask the peer reviewer to continue the back and forth via Slack.


