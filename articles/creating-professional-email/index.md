---
layout: engineering-education
status: publish
published: true
slug: creating-professional-email
title: How to Create a Professional Email - Setting up GSuite
description: G Suite is a suite of cloud computing, productivity and collaboration tools, software and products developed by Google.
author: louise-findlay
date: 2020-07-06T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-professional-email/hero.png
    alt: header image gsuite emails
---
With the popularity of Office 365 and GSuite it can seem that creating a business email is as simple as signing up for an account and paying the annual or monthly fee.

However because of spam and fraudulent email protection, if you want your emails to appear in your recipient's inbox, then it's a lot more than complicated than that because you have to configure SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail) and DMARC (Domain Message Authentication Reporting.)

<!--more-->

### Choosing Between Office365 and GSuite

The two main email providers that offer custom domains (`yourname@yourbusiness.com`) are Office365 and GSuite. These are the business email plans of Microsoft and Google.

While the choice tends to be which ecosystem you use, do you prefer Google's suite of collaborative software or the desktop apps of Microsoft Office?, each has its own benefits.

The easiest pricing structure to understand is GSuite which can be paid either monthly or annually. They have three plans: basic, business, and enterprise. Basic is £4.60 a month, business is £9.20 a month and the enterprise is £20 a month.

The basic plan is great if you just want a custom email address but if you want more cloud storage then the business is the plan to go for. The business plan offers unlimited cloud storage to over five users (though this restriction has not been enforced) as an upgrade to the 30GB in the basic plan. Enterprise has many security features that would suit a business that needs to restrict access to sensitive documents.

Office365 however, has four business plans, basic, standard, premium, and apps though only three (basic, standard, and premium) include business email. Basic is £3.80 a month, the standard is £9.40 a month, the premium is £15.10 and apps is £7.90 a month. Basic is sufficient for email but if you more desktop Office applications than you'll have to upgrade to one of the higher plans.

Both of these email platforms charge per user (email address) though shared email addresses (`hello@yourdomain.com`) are free.

This guide will use GSuite as an example as it is more popular than Office365 for emails.

### Creating your GSuite Account

The first step is to create your GSuite account. Go to the [account creation](https://gsuite.google.com/signup/basic/welcome?hl=en-GB) page and enter your personal information to set up your account.

If you already have a domain such as  `yourdomain.com`  then you should click yes, I have one I should use otherwise no, I need one. If you need one then you can buy one through Google who will connect the new domain automatically.

Whatever route you take, you’ll have to provide your recovery email and create your account credentials. Remember your username will form part of your email address, `user@yourdomain.com`  so name it accordingly. Click agree and create an account to finish setting up your account.

### Adding Multiple Users

Once you’ve created your account, you’ll start the setup process. The first step of which is to add users. Users are classed as  `name@yourdomain.com`  and are for individuals. Shared mailboxes like  `info@yourdomain.com`  are free and how to set them up will be covered later in this guide.

When you’ve finished setting up users, click the checkbox saying I added all user email addresses currently using  `@yourdomain.com` and click next.

### Connecting your Domain
Now that you’ve set up all your GSuite users, you’ll have to connect your domain name. There are two steps to this. The first is to add a TXT record (similar to adding a site (property) to Google Search Console) **Link to Google Search Console article** to verify you own the domain and the second step is to add MX records which will configure emails.

Google will try to detect the domain registrar you bought your domain from and provide detailed instructions on how to add the records. Follow the step by step instructions and click the checkboxes when you’ve accomplished each step.

When you’ve finished adding the DNS records to your domain, click the Verify Domain and Set Up Email button. DNS records can take up to 24-48hrs to activate (though usually about an hour) so if it doesn’t work, try again later.

### Adding Shared Mailboxes/Group Aliases

An email like `hello@yourdomain.com`  could be used by multiple users but sharing the same account can lead to temporary bans due to high usage. The solution is domain aliases or how Office365 refers to its shared mailboxes. You log in to your existing GSuite or Office365 account and can access and send emails as the hello email.

You can have an unlimited number of aliases and it doesn’t cost you a penny. However, you need a GSuite user for every person that wants to access the shared mailbox.

GSuite has three types of aliases, user, group, and domain. A user alias (setup in Users > username > User information > Email aliases) is an alternate username for one GSuite user can't be used multiple times. An example would be `trent@trent.com` instead of `trentdobbs@trent.com` that was used to create the account. A domain alias (setup in Domains > Manage domains) is for the `@yourdomain.com` part of the email address. It allows you to add another domain so you can send and receive emails from multiple domains.

A group alias is similar to Office 365's shared mailboxes (multiple users sharing the same email) and the one that this tutorial will guide you through. You have to group GSuite users together first and then set an alias for the group.

The first step is to log in to the GSuite admin [page](https://support.google.com/a/answer/182076), and click on Groups. You'll have to create a group and then added the relevant GSuite users to it.

Next, click on the group you've just created and then on Aliases. Click the Edit button and then add the name you want for example: `info` in Group Alias Email and then click Add Alias. Any emails sent to `info@yourdomain.com` will appear in the mailbox of the GSuite users in the group though it can take up to 24 hours for it to start working.

### Configuring Spam Protection (SPF, DKIM, and DMARC)

Email providers now use spam protection features such as SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain Message Authentication Reporting) to authenticate emails and try to prevent fraudulent emails. If you try and use your GSuite account without setting them up then it's highly likely that some of your emails will get rejected.

If you bought your domain from Google then they can automatically setup SPF and partially DKIM for you but since you have to manually configure DMARC and the second part of DKIM to finish the entire process, it makes sense to show the entire process.

### Setting up SPF (Sender Policy Framework)

SPF determines the email server that can send emails from your domain. It prevents malicious email servers (those other than Google's since you're using GSuite) to send emails on your behalf.

To configure SPF, you just need to add a DNS record to your domain. Log into your domain registrar (who you bought your domain from) and add a DNS record with the type: `TXT, host: @ and value: v=spf1 include:_spf.google.com ~all.`

Remember it can take 24-48hrs for DNS changes to be active (though usually only an hour or two.)

You can check SPF has been setup successfully using the [GSuite Toolbox](https://toolbox.googleapps.com/apps/checkmx) but we will do this at the end with a more versatile tool which will check several other factors in ensuring your emails will be received in your recipient's inboxes.

### Setting up DKIM (DomainKeys Identified Mail)

DKIM provides verification that your email hasn't been tampered or altered in any way.

In the GSuite admin [page](https://support.google.com/a/answer/182076), navigate to Apps > GSuite > Gmail, click Authenticate email and then Generate new record.

Set the DKIM key bit length to 2048-bit because it's more secure. Most hosts should support it but if yours doesn't lower it to 1024-bit.

You don't have to modify the prefix selector so just click the Generate button.

Copy and paste the values provided into a new TXT record for your domain. Similar to how you configured SPF but you'll have two values instead. Copy the DNS Hostname into the name/host part of the TXT record and for the last field paste it into the value part of the record.

The last step is to turn on the DKIM signing. Remember it can take up to 48 hours for the DNS changes to take effect so if the signing doesn't work, you may need to wait. Also, Google won't let new accounts enable it so it may take two to three days before you can do so.

Finally, back on the GSuite email authentication page, click start authentication to finish the process.

### Setting up DMARC (Domain Message Authentication Reporting)

DMARC tells the email server how to handle suspect emails heading towards your inbox. You must have configured SPF and DKIM before you do so otherwise every email will fail this authentication step.

To set up, add a new TXT record with the name of `_dmarc.yourdomain.com`. The value depends on what kind of authentication you want to set up. This example `v=DMARC1; p=quarantine; rua=mailto:youremail@yourdomain.com; pct=100; sp=none` would move all suspicious emails to the spam folder and send you daily emails detailing which emails were quarantined.

You can change the p value to none which would do nothing or r which would reject all suspicious emails. The pct parameter determines the percentage of emails that the authentication runs on.

A typical process would be to start with allowing all emails through and then slowly raise the quarantine percentage and eventually reject until you're rejecting all suspicious emails. If you're worried about deleting legitimate emails then just use the example above which quarantines them instead.

### Testing your New Email Account

To test this all works correctly, we can use the [Mail Tester tool](https://www.mail-tester.com). Copy the email address provided and then send an email to it from your GSuite account. Once you've sent it, click the Then check your score button.

If the You're properly authenticated test is checked green then you've set up all three spam protection features successfully. You can click on the heading to find out in more detail whether your email passed DMARC testing, it had a proper DKIM signature and your SPF record works with your email server. Congratulations, your email is now secure.

### Adding your Email to your Devices

Since you using GSuite or Office 365 then adding your new email to your devices is as simple as choosing Gmail or Office 365 and go through the automated setup on your favorite email client.

That's much easier than using another email provider because you have to configure an IMAP account and fill in all sorts of information like port numbers.

Congratulations, you've set up a professional email address, made it secure, and learned how to set up user, group, and domain aliases.
