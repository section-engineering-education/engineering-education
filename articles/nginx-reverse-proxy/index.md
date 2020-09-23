# Deploying Multiple Applications to VM with NGINX as a Reverse Proxy

## Introduction
Ever wondered how more than one application are being deployed to the same machine, and how traffic is being routed to the corresponding applications?
Keep reading to know all about it!
## Goals
By the end of the article, one would be able to understand
- What a Reverse Proxy is?
- What NGINX is?
- How does it help in managing multiple applications?
- How to leverage NGINX as a Reverse Proxy?

### Reverse Proxy
A reverse proxy is a type of proxy server that retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client, appearing as if they originated from the server itself.   

### NGINX
We will be using NGINX which would be serving the purpose of a Reverse Proxy. NGINX, is a web server that can be used as a reverse proxy, load balancer, mail proxy and HTTP cache. 

### Example
![image](./reverse_proxy_working.png)

This is an example of an architecture, where two apps are running in the background, but clients have no idea about them. Clients only know about NGINX which acts as a reverse proxy that sends the request to the appropriate application.


Now that you have a broad idea of what we are about to build, let us jump right in!

## Aim
1. Deploy two applications and have it managed by NGINX.

## Setup & Pre-Requisites:

1. For this example, I have two sameple NodeJS servers. One can have any kind of application running on different ports. 
**NOTE:** Do not run your application on Port 80 or 443. Will be explained later why this must not be done.
2. I have installed NGINX on my local machine, the same could be done on any Virtual Machine where the applications are expected to be deployed.

## Step 1: Start two apps running in different ports
As I've mentioned earlier, I got two Node Apps running on two different ports as show below.  

**Server app running on Port 3000**

![image](./server1.png)  

**Client app running on Port 3001**  

![image](./client1.png)

Now that we have our apps up and running, we dont want our users to use these applications by typing their PORTS explicitly, so we need to map it with something which is more human readable. In this example, I will be using subdomains to distinguish between them. Again one is free to use whichever distinguishing element suitable as per their requriement.

## Step 2 : Add DNS records
This is the part where one would add the DNS records in their DNS management dashboard. Since I am running it all locally I wouldnt be needing that.  

The general DNS Configurations would be something like
- Server app mapped to server.domain
- Client app mapped to client.domain

My Localhost Config in this case would be
- Server mapped to server.localhost
- Client mapped to client.localhost

There are two standard Protocols HTTP and HTTPS. The default port for HTTP is 80 and HTTPS is 443. This is the reason we must not run our applicaitons on these ports, because our NGINX server would be running on these two ports. All the requests the client makes would either be redirected to Port 80 or 443 from where it would be redirected internally to the corresponding application.

## Step 4 - Configure NGINX at 80 for http and 443 for https
Now that we have our apps running and our DNS records ready. We can start configuring our NGINX to make it all work.
Navigate into the nginx folder and locate  ```nginx.conf``` .

Add these configurations inside the HTTP block.

### Step 4.1 - HTTP

```
server {       
     listen       80;
     server_name  server.domain;
     location / {
          proxy_pass "http://localhost:3000" ;
     }
}
server {       
     listen       80;
     server_name  client.domain;

     location / {
          proxy_pass "http://localhost:3001" ;
     }
}
```

### Step 4.2 - HTTPS

```
server{
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name server.domain;

    location / {    
        proxy_pass "http://localhost:3000/";
    }

    ssl_certificate <location of SSL certificate>
    ssl_certificate_key <location of SSL certificate Key>
}
server{
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name client.domain;

    location / {    
        proxy_pass "http://localhost:3001/";
    }

    ssl_certificate <location of SSL certificate>
    ssl_certificate_key <location of SSL certificate Key>
}
```

**NOTE** 
These are the basic minimum configurations requried to successfully configure NGINX for reverse proxying. Feel free to explore other config parameters as well. 

Change the domain name to your domain.
For SSL Certificate and Key, you can get them from your SSL provider. If you dont have one, Use this free service [LetsEncrypt](https://letsencrypt.org/) . Follow their documentation to get Free SSL instantly!



## Step 5 - Save and Restart

After editing, save your changes. Use ```nginx -t``` command to test your changes before actually reloading NGINX. It is a good practice do that to make sure your server doesnt crash if there were any errors in your config file. Once you get a message that the test is successful, you can go ahead and restart your NGINX.
Open the browser and enter the URLs to find your applications running on the corresponding URLs you configured.

**Important Note**
> It is important to note that the clients see your applications as a whole where the face of it being NGINX running at port 80 or 443 according to the protocol used. Once the request reaches NGINX, it is being internally routed to the corresponding application, There is no need to open all of your PORTS, in this case 3000 & 3001 to the internet. Just enabling 80 and 443 would be sufficient as NGINX routes the traffic internally. This is a highy secure architecture as each individual applications need not be taken care individually rather the single entry point i.e NGINX is the only place which needs to be focussed.

## Conclusion

Here is the end result,

![image](./client2.png)
![image](./server2.png)  

Congratulations! You did it! :tada:

In large systems, the system is highly dependent on the micro-services architecture where each service would be served by an application. In that case managing apps would be an essential skill to know.

 Hope this article covered how to manage those independently deployed applications as a whole with the help of NGINX as a Reverse Proxy.
 Thanks for reading