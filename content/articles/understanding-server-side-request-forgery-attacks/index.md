Server-side request forgery (SSRF) is among the newest additions to the OWASP Top 10 list released this year (2021). It comes in at Number 10 on the list. 

According to [OWASP data](https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/), the incidence rate is still relatively low.

SSRF attacks are most common to web applications which fetch data from a server to display it to the client. When the application fetches the resources without validating the supplied URL, the application becomes vulnerable to SSRF. An attacker can alter the application’s request and send a malicious request.

### Prerequisites
To follow along with this tutorial, some knowledge about intercepting traffic flow using [Burpsuite](https://portswigger.net/burp/communitydownload), [OWASP Zap](https://www.zaproxy.org/download/), or any other tool is neccesary.

### Overview of SSRF attacks.
Server-Side Request Forgery (SSRF) is a web application vulnerability that occurs when a server-side application is induced to make arbitrary HTTP requests to an arbitrary domain chosen by the attacker. This simply means that the web application fetches remote resources without validating the user-supplied URL.

Normally, when an attacker tries to access resources a server from another source other than the "known" web application, they will mostly get blocked. But in our case (SSRF), the server will receive the request as coming from the web application and hence the request will be accepted.

The limiting power to the attacker's request will be the permission range given to this web application.

SSRF attacks can take place in different ways, such as:
- *Against the hosting server* - In this, the requests are sent to the web server hosting the web application. The attacker can also leverage this attack to perform another kind of attack.
- *Against other back-end systems* - The attacker can leverage the attack above to access other services at the back-end of the same network as that of the web server hosting the application. These other servers might not block requests since they are originating from a known source.

### Types of SSRF attacks.
Some of the common types of SSRF attacks are:
- Regular SSRF
- Blind SSRF

#### 1. Regular SSRF
In this type of attack, the attacker can receive feedback. For example, if the attacker requested files, they can view them once they complete the request.

#### 2. Blind SSRF
In this type of attack, the attacker cannot get a response from the server either via an error message or an HTTP response.

Although the attacker doesn’t get a response, it doesn’t mean that this attack will not be valuable to the attacker.

### Testing for SSRF attacks.
We can test our applications for SSRF vulnerabilities in a couple of ways.

The most recommended one is manual code review to check whether the URL inputs are being validated.

Sometimes, we might find that we don’t have access to the source code of our applications, but this should not hinder us from testing our applications.

To show how we can test for SSRF in cases where you don't have access to the source code, I will use Labs from [Portswigger](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost). We will look at a lab for a local server.

In our lab, to identify the SSRF vulnerability, we are required to delete a user in the web application. The application here requests data from the server to display the amount of stock currently available.

When you intercept the request, you will view the stock request URL.

![Stock request URL](/engineering-education/understanding-server-side-request-forgery-attacks/lab1capture.png)

With this, we try to replace the original request URL with a new URL requesting the server to produce the admin page.

![Replacing the url](/engineering-education/understanding-server-side-request-forgery-attacks/lab1capture2.png)

As shown in the picture above, we encoded our URL, but even without encoding it, the URL will work in this given lab.

Once the request is submitted, we get to see the admin page:

![Admin Page](/engineering-education/understanding-server-side-request-forgery-attacks/lab1capture3.png)

This is the first sign that our lab is vulnerable to SSRF. 

To escalate this, we will try to delete one user displayed in this admin panel.

When we inspect the HTML page, we can see the URL for deleting the users.

![admin inspect](/engineering-education/understanding-server-side-request-forgery-attacks/adminpageinspect.png)

Now that we have the specific URL for performing a delete action, we will request the stock amounts once again and replace the URL with this new one that we have found.

![delete Request](/engineering-education/understanding-server-side-request-forgery-attacks/deleteuserrequest.png)

Once submitted, these are the result:

![Response for the delete request](/engineering-education/understanding-server-side-request-forgery-attacks/redirect.png)

To confirm that our request was indeed successful, we resubmit our request for the admin page. We can now confirm that our action was successful.

![admin page after deletion](/engineering-education/understanding-server-side-request-forgery-attacks/lab1cspture%20.png)

Sometimes, where the organization is using a reserved IP address, we might need to try several addresses to get the internal network pages. Some of these addresses include:

- 10.0.0.0/8
- 127.0.0.0/8
- 192.168.0.0/16

You can visit this [page](https://en.wikipedia.org/wiki/Reserved_IP_addresses) to view other reserved IP addresses.

When testing your applications, you can also try to get more info from the errors you might get. Errors usually contain information about the services running in the application and also if certain ports are closed or open. This kind of information will help you decide which ports or even methods to use when attacking the application.

### Impact of SSRF attacks.
Some of the impacts of SSRF attacks are:
- Applications vulnerable to SSRF risk their confidential data being leaked to the public.
- Code execution - When attackers gain access to your internal systems via SSRF, they can execute malicious code and gain reverse shells to your system with which they can cause further harm.
- Network scans on internal system networks are possible because of the access of these systems via SSRF attacks.

### How to prevent SSRF attacks.
Some of the methods of preventing SSRF attacks are:
- Encrypting data and authenticating all internal connections.
- Segmentation of resource access will help in reducing the impact of SSRF.
- White-listing of server-side input.
- Dissabling HTTP redirections.
- Direct usage of the user input should be blocked.

### Conclusion
With the rise of serverless platforms and microservices, we expect the impact of SSRF attacks to expand with time.

If not prevented or detected, companies might face huge economic and data losses.

In this article we have looked at:
- An Overview of SSRF attacks.
- Types of SSRF attacks.
- Testing for SSRF attacks.
- Impact of SSRF attacks.
- How to prevent SSRF attacks.

Let’s ensure that our Web applications are secure.

Happy hacking!

### Further reading
- [The SSRF Bible - Wallarm](https://docs.google.com/document/d/1v1TkWZtrhzRLy0bYXBcdLUedXGb9njTNIJXa3u9akHM/edit#heading=h.kwcnj7jh5zyy)

