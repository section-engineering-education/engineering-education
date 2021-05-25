---
layout: engineering-education
status: publish
published: true
url: /web-application-firewall-bot-mitigation-comparison/
title: Web Application Firewall vs Bot Mitigation Solutions
description: Web application firewalls and bot mitigation solutions both provide tooling to help prevent malicious activity from affecting web applications, but what exactly does each do and how do they differ?
author: ivan-santos
date: 2019-10-21T00:00:00-07:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/web-application-firewall-bot-mitigation-comparison/hero.png
    alt: WAF vs Bot Mitigation
---
Web applications today face an expansive and diverse makeup of increasingly sophisticated security threats. Web application firewalls and bot mitigation solutions both provide tooling to help prevent malicious activity from affecting web applications, but what exactly are these solutions and how do they differ?

<!--more-->
### What is a Web Application Firewall?
A Web Application Firewall, or a [WAF](/blog/web-application-firewall-definition-website-security/), is a traffic management tool that sits between the web application and the user. The WAF takes charge in filtering HTTP requests to and from the web application. However, the main focus is on the requests coming into the web application, protecting it from any external attacks. These external attacks can include cross-site scripting(XSS), SQL Injection, DDoS-ing (Distributed Denial of Service), and many more. Unlike regular firewalls that serve as a general shield between servers, a WAF is able to [filter](/web-application-firewall/) the content of specific web applications.

But how exactly does a WAF know what to filter? The answer is in the way the WAF is configured. The WAF filters traffic based on a set of rules called policies. These policies are settings which are implemented into the WAF to function as an inspection tool for every HTTP request coming in. Policies are like individual LEGOs put together to make a strong barrier. Depending on how those pieces are configured, the WAF can be very efficient at its job.

A visual of how a Web Application Firewall works can be seen below. The WAF stands between the user and the web application server to ensure valid requests are allowed to reach the web application.

<div style="text-align: center; padding-bottom: 5%;">
<img style="padding: 0; margin:0;" src="/engineering-education/web-application-firewall-bot-mitigation-comparison/hero.png" alt="web application firewall diagram"><br>
<span style="font-size: 11px;">Figure 1: WAF visual from I. Bulatov, D. Rybin, and A. Romanov, habr. <a href="https://habr.com/en/company/dsec/blog/454592/">Digital Security</a>, 2019.<span>
</div>


### What is a Bot Mitigation Solution?
[Bot mitigation](https://www.section.io/modules/shieldsquare-bot-management/) is the act of detecting malicious automated requests going to a web application, and denying further action to those requests.

When traffic goes in and out of a web application, it can be either human traffic or bot traffic. Bot traffic can be further broken down into good bots and bad bots. Bad bot traffic is the core focus of bot mitigation, and protection is implemented through a bot mitigation solution. These technology solutions distinguish traffic intended for malicious acts from valid traffic trying to make use of the web application’s services.

Two examples of such bot attacks in the e-commerce landscape are price-scraping bots and bots that hold up inventory in shopping carts. To prevent this type of activity, bot mitigation solutions attempt to identify hostile requests from incoming traffic, and block them from reaching the web application. The module then learns from this experience and can strengthen its recognition ability for future traffic.

But how exactly does a bot mitigation module distinguish the bad bots from the good bots? Similar to a WAF, the solution functions based on a set of configurations and further operates with various components such as a database containing previous bad bot encounters, CAPTCHAs that ensure a user is valid, traffic pattern recognition, and many more. All of these elements constitute a solution that serve to protect the web application from being penetrated.

### What's the Difference Between a WAF and Bot Blocking Solution?
The main difference between a WAF and a bot mitigation solution is that the focal point of a bot mitigation solution is to only target bots. A WAF is capable of targeting them as well, but is more focused on protecting against a combined threat profile to prevent app exploitations and safeguard sensitive data.

So which is better? It depends. If a company’s security goal is to minimize the probability of account takeover, content scraping, or denial of service attacks, to name a few examples, a bot mitigation solution would be best. If the goal is to safeguard against internal app exploitations, such as SQL injections or session hijacking, a Web Application Firewall serves best. It all depends on the security objective a company has for their web application, and in many cases, both solutions are leveraged to build a stronger security perimeter.
