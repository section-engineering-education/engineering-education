#### Introduction

Online privacy and security are vital considerations in our modern era. The high value of information has caused a need to implement better security practices and strategies. The secure shell host protocol (SSH) is one of the important security protocols used to protect data in an insecure network. The cryptographic-based protocol has evolved to a passwordless alternative to increase its resilience.

#### What You will learn

1. What is passwordless SSH?
2. The working of passwordless SSH.
3. Its use cases.
4. Setting up passwordless SSH.
5. Advantages and disadvantages of passwordless SSH.

#### What is Passwordless SSH?

The Secure Shell or Secure Socket Shell protocol(SSH) is a cryptographic-based network protocol that Yatu Ylonen wrote in 1995. The protocol is applied when establishing secure connections between two devices, i.e., a client and a server. SSH can be implemented using several authentication techniques. The two widely used techniques are public/private-key (cryptographic) based authentication and password-based authentication.

The Passwordless SSH follows a process of authenticating to your remote computer (i.e., a server) via SSH without the need of a user keying in a password. The improved alternative eliminates the need for users who use complex passwords that are difficult to recall. Additionally, the passwordless SSH protects its users from password compromises. 

#### The Working of the Passwordless SSH Protocol

The passwordless SSH protocol is based on the submission of a cryptographic key kept on the client device through an SSH client. 
This procedure does not typically necessitate the use of a password as it uses public key cryptography principles.

> A public key is a long string of random string of characters generated from a private key that can be shared with anyone. 

The process of establishing a secure connection using a passwordless ssh follows the below following steps:
1.	A user sends their username and public key to a server. 
2.	The server responds with a message encrypted using the received public key from the user. 
3.	The user decrypts the server’s message with its private key. 
4.	The user sends the decrypted message to the server which ascertains if the message is valid.
5.	If the message matches the one on the server, the server authenticates the user and establishes a secure connection between the two devices. 
6.	Since future connections are automated, users do not repeat the username submission process stated in the first step.

> The lack of passwords is among the main reasons for preferring the passwordless SSH over its password-based alternative.

#### Use Cases of SSH
The SSH protocol is the remote standard method for accessing and managing Linux-based servers. Many corporate organizations utilize the protocol to administer and manage their web servers.

Some of the administration functions performed on servers using the SSH protocol include:

- Sending and receiving files over SSH through the SSH file transfer protocol (SFTP).
- Accessing and performing CRUD (create, read, update and delete) functions on users’ databases.
- Installing or updating software on the servers and other third-party web applications.
- Backing up data on servers.
- Running remote CLI commands.
- Troubleshooting the servers in case of any technical failures.

#### Setting Up Passwordless SSH
It is now time to dive into setting up the passwordless protocol on Linux. Let us get started!
> If you are on a Unix-based OS, like Windows, you can use SSH client software like Putty. 

#### Step 1: Generating your SSH Key Pairs

We earlier mentioned that during the initial setup process, you = enter a password to establish your first connection. Using a password is not mandatory since your authentication key is kept in a directory named `~/.SSH.` after the key is created, it is stored in a file called `/id_rsa.pub.` 
Creating your key pair will require you to use the command below. 
`ssh-keygen -t [algorithm] -b [keysize]`

The above command allows you to specify the keygen algorithm and key size to use. If you choose to use the RSA algorithm, it should follow the below syntax:
`ssh-keygen -t RSA -b 4096.`

You may choose to add your email address to increase security.
`ssh-keygen -t RSA -b 4096 -C "email-address@somepage.com"`

#### Step 2: Uploading the Public Key to a Host Server
This process provides a server with what it needs to recognize your device. Thus, you can access the server remotely using your SSH authentication key. The authentication key takes the place of a password utilized in a password-based system.
When you wish to send your authorized ID and public key to the host, use this command:

`ssh-copy-id [your_username]@[remote_server_ip_address]`
#### STEP 3: Testing to Ensure Everything Works Properly

After the authorization and establishing a connection phase, you should check whether the connection works. If the connection functions as expected, you can log in to your server without the need for a password. 
To establish a connection using SSH use the following command:

`ssh [your_username]@[remote_server_ip_address]`

#### Advantages of Passwordless SSH
#### 1. Improves User Experience 

Passwordless SSH enhances the user experience by allowing users to use the protocol without memorizing complex or lengthy passwords. According to NordPass statistics, the average internet user has at least 70 passwords. When a person has a lot of passwords, it's easy for them to forget or confuse them when logging into a system. Password SSH saves users time by eliminating the need to memorize passwords.
#### 2. Resolves the Issue of Password Theft

Passwordless SSH implies that passwords are no longer required. Thus, users who utilize the protocol do not worry about password theft or breaches. Furthermore, Passwordless SSH minimizes the risk of legal action resulting from data breaches on your website or application. 
#### 3. Protection from Brute-force Hacking Attacks

Passwordless SSH uses a cryptographic key that makes brute-forcing cumbersome, even for the hackers. A brute-force attack involves an attacker guessing characters to form a password. This technique is practically unattainable on cryptographic-based protocols such as passwordless SSH.

#### 4. Helps Reduce Operational Costs in the Long Run.

Passwordless authentication solutions reduce overall security costs. An organization does not need to incur costs from storing passwords on authenticating servers that require maintenance and management. 
The protocol also frees up the IT department as they will no longer be required to redefine password policies. The IT department will also not need to monitor user activity or detect and prevent password leakages.
#### Disadvantages of Passwordless SSH
#### 1. Hard to Protect Users after Device Theft
The authentication keys used to implement passwordless SSH are retained in a device. After a device theft, a person can access and use your connection since they have access to your device. Some systems that implement passwordless SSH authentication use OTPs mostly sent via SMS. Thus, users have to protect their SIM cards and phones.When someone steals your device, they can intercept the OTPs and magic links that authenticate a login session, thus compromising your security.


#### 2. Reluctant Users
Not many users have embraced passwordless authentication due to security concerns. This could be due to ignorance and false assumptions surrounding the technology. To most users, the protocol looks like a method that is easy to bypass since there are no passwords involved.
#### 3. High Cost of Implementation

There are free software companies that offer free implementation of passwordless SSH. But, no one wants to entrust the security of their website or app to free tools. Most suppliers who provide services for safely deploying passwordless SSH charge between $25 and $1000 per month. Many businesses and organizations choose password-based authentication because they feel it is safe. 
#### 4. It does not Protect Against Malware
Some systems that use passwordless SSH authentication require OTPs. Malware such as screen readers and keyloggers can intercept OTPs and magic links, thus compromising the security of a system.

#### Conclusion
In this tutorial, we understood what basic functioning of the passwordless SSH protocol. We also looked at its pros and cons and the reasons why it is better than a password-based authentication system. 
We gained insights on setting up SSH to your local device for logging into a remote host. Finally, the passwordless SSH protocol saves users time and energy spent authenticating a system. This is the main advantage over its password-based alternative.

#### References
1. [A Look at SSH Passwordless Authentication in cyber security by Megha Thakkar](https://sectigostore.com/blog/what-is-passwordless-ssh-a-look-at-ssh-passwordless-authentication/)

2. [The Pros and Cons of Passwordless Authentication in web security by Medha Mehta.](https://sectigostore.com/blog/the-pros-and-cons-of-passwordless-authentication/)

3. [How to Setup Passwordless SSH Login](https://linuxize.com/post/how-to-setup-passwordless-ssh-login/)

