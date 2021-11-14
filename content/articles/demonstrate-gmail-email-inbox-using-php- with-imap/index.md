### Introduction
Gmail is the premier email service, and nothing can compare to it. Its unlimited storage and great user interface made it popular. We'd prefer to design our own Gmail interface instead of using the default.
PHP supports IMAP for remote web server email access. IMAP Accessing email servers over the Internet. This creates a web-based email client that multiple clients can access. PHP provides over 70 different imap_* functions.
How to create an inbox in PHP using Gmail's email as a source demonstrated in the following post. This code could be improved into a full-featured PHP email web client.
Connect to a mail server using IMAP or POP. In addition to displaying emails in a mailbox, the mail server messages data will be used to send notifications when new messages arrive.

![Settings](/engineering-education/to-demonstrate-gmail-email-inbox-using-php-with-imap/image1.png) 

### Prerequisites 
For the functionality to be developed, the following are required.
- Newer PHP version or a PHP5.
- While installing PHP, enable the IMAP Extension.
- Imap should be enabled in your Gmail email account.

### Table of content 
- [Enable IMAP in PHP](#enable-imap-in-php)
- [IMAP in PHP and Gmail](#imap-in-php-and-gmail)
- [PHP to List Gmail Emails](#php-to-list-gmail-emails)
- [PHP Gmail Inbox Output](#php-gmail-inbox-output)
- [An email evaluation ](#an-email-evaluation)
- [Open IMAP Email Servers with PHP](#open-imap-email-servers-with-php)
- [Conclusion](#conclusion)

### Enable IMAP in PHP.
Steps to enable IMAP in PHP:
- Step 1: You have to turn on your computer and navigate to the following location on your drive:\xampp\php Settings of a configuration type.
- Step 2: Open the file in your favorite editor and look for extension=imap.
- Step 3: Save and close the file once you remove the;(Comment) tag from the beginning of the file.
- Step 4: Restart Apache and MySQL using the xampp command-line interface.
- Step 5: Now that Laravel-IMAP Library is installed, you can use it. Run this command from your project directory's cmd (Command Prompt) window.

#### Follow these steps to make your Gmail account compatible with IMAP.

- Go to your Gmail inbox and check your messages.
- To change the settings, go to the Settings menu and select Edit
- Choose the POP/IMAP blue tabs from the drop-down menu that appears.
- Activate the radio button for "IMAP Access:" in the section and select "Enable IMAP".
- Save your changes by clicking the Save button.
- Don't forget to let less secure apps access your Gmail account.

### IMAP in PHP and Gmail
Access external mail servers using PHP's imap_* methods.. Preferably,The PHP configuration file has IMAP enabled.
phpinfo() provides information about the installed libraries and extensions. Follow these steps to install PHP and configure IMAP.How to configure Gmail's IMAP settings.
- Install the PHP IMAP library from the official PHP package. Ignore if it's already been done.
- The semicolon(;) in PHP configuration.
- Increase the maximum execution duration in php.ini
- After that, restart Apache. 
- Then Gmail -> Settings -> Forwarding and POP/IMAP.

### PHP to List Gmail Emails
To compile a list of emails from a Gmail account, programmers employed HTML and PHP. Username and password are required in order to establish a connection with Gmail. Once linked, we can use the IMAP search() function to look for specific emails or all emails that match a specified set of criteria.

The emails are sorted using PHP's resort() function, with the most recent at the top. Sort an array from top to bottom in PHP. The subject, sender, some content, and time stamp are all recorded for each email that is returned. The IMAP fetch body() method can retrieve a specific segment of an email's body. As a result, the "1.1" parameter can be used to retrieve the email's plain text content.

Go to Gmail and Enter the PHP code below to retrieve email data from Gmail. The IMAP open() method in PHP builds the connection object by passing it the host, username, and password.
Connection objects can query a database for email addresses. Using an email reference object array to iterate over email content and message. The retrieved Gmail messages are tabulated in an inbox. Settings -> Forwarding and POP/IMAP.

### PHP gmail inbox output
This screenshot demonstrates the Gmail inbox output using PHP.

![gmail email output](/engineering-education/to-demonstrate-gmail-email-inbox-using-php-with-imap/image2.png)

### An email evaluation 
Every time your computer or mobile device connects to the Internet, google checks for new emails.To manually refresh your inbox, open it and click Refresh above the message list.
Then select the appropriate tab from the navigation sidebar. You can use the other tabs for more social messaging. In nonbold writing on a shady backdrop, messages you've read are presented. Every mail in your inbox has four parts: sender, subject, content, and date.

#### How to read a message:
- Click the message type tab in your Gmail inbox. Mail should go on the Primary tab.
- You can read a message by clicking anywhere on it.
- There are sections showing how to reply, forward, and delete the mail.
- When you're done reading a message, click the Back to Inbox button to go back to the inbox where you left off.

### Open IMAP Email Servers with PHP
PHP IMAP open requires the procedures listed below to establish an email connection:
- To connect to your Gmail Inbox through IMAP, use the code.

```PHP
 $gmail_inbox = imap_open('{imap.gmail.com:993/imap/ssl}INBOX','example@gmail.com','password') or die('Cannot connect to gmail');
```

- Connect to your Yahoo Inbox using IMAP.

```PHP
$yahoo_inbox = imap_open('{imap.mail.yahoo.com:993/imap/ssl}INBOX','example@yahoo.com','password') or die('Cannot access yahoo');
```

- To connect to AOL Inbox through IMAP, use the following code.

```PHP
$aol_inbox = imap_open('{imap.aol.com:993/imap/ssl}INBOX','example@aol.com','password') or die('No AOL connection');
```

- Connect to localhost IMAP Settings. Use the code below.

```PHP
    
$local_inbox = imap_open('{localhost:993/imap/ssl}INBOX','example@exampledomain.com','password') or die('No access to example domain');
```

- To use Custom Mail Server with IMAP Settings, you may need to connect to your company's mail server first. Both SSL and TLS must be configured for the IMAP server and port. Even if you supply all essential information on the server, you may obtain a certificate failure message. To access the email server, use the no validate-cert option. To connect to a custom IMAP server, use the code below.

```PHP
$local_inbox = imap_open('{imap.example.com:993/imap/ssl/novalidate-cert} INBOX','example@exampledomain.com','password') or die('No access to example domain');
```

### Conclusion
The PHP mail function can send small amounts of simple text messages. However, PHP Mailer is better for mass emailing or creating a contact form.