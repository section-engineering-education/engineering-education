When developing an android application, you probably going to consume data from external servers. Let's say your application is fetching some data from a database or an API. This will require a user to have an internet connection. Take a comparative example of a user login system. You need to authenticate that user. Thus this process has to hit the internet back and forth to ensure the credential submitted are valid to that specific user. This user will need to have wifi connectivity of mobile data to process all these server requests and responses.

This user may be in a position of not being aware that their phone has no internet connection. As a developer, you need to suit your application in such a scenario. This will alert a user that the internet is required for them to have access to application information.

However, as a developer, the ways you use to handle this case must prove its importance to the user. For example, you need to detect and monitor network connectivity. Then decide what to tell the user.

In this case, developing an application that just detects the internet connection might deceive a user. Your application will still work and show the user when connected to the internet. However, you can not just rely on the detection of network connectivity. A user might be connected to the wifi, but the wifi has no active internet to connect and accces data from a server. This means you have to first detect if the user has connected to the internet then monitor the user's network to to know the internet capabilities. If this connection is active doeat have capabilities to acess an online server/data.

Active internet connection is not a guaruntee of network connection capabilities. Knwing this capailitiesy will help you return the right information to the user. You need to detect networks, detect when you've connected to a network, and then test whether or not if that network has internet connections. This means you need to monitor and check the internet connection in real-time and show the user the connection status and know if there is internet available.

This article aims to explain this concept and implement it in android applications using Kotlin.

### Preliquesites

To follow along this guide;
- Ensure that you're using the latest version of android studio
- Have some basick knowledeg on how to use android studio IDE.
- Undestands how to write code syntaxs using Kotlin.

### Setting up and android project

Head over to you anndroid studio and create new projet and crate it with an Emptu activity. While doing this remeber we are using Kotlin. So make sure Kotlin is seleted when creating this new applicatiol, I.e;

![]()