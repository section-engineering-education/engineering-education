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
