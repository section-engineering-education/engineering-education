# Deploying Your First NodeJS Web App
Congratulations, you’ve finished developing your first NodeJS web app and now you want to publish it on the web. If you’re still in the development process however, then you may find my *XYZ NodeJS web app* guide helpful. 

There are many hosting platforms you can use to deploy your NodeJS web app such as Heroku, Vultr, Linode, Google Cloud Platform and Amazon Web Services.*Link to the platforms* We will be using DigitalOcean because it’s very popular, simple to use and good value.

## Setting up DigitalOcean

First, create an account on the DigitalOcean platform. There are discount codes available to add free credit to your account such as the code available in the Github Student Developer Pack. Be aware that you can only redeem one code per account.

*Include Images of DigitalOcean and Namecheap*

Second, you need to create a droplet. A droplet is a VPS (Virtual Private Server.) It’s similar to a Linux VM which is hosted on a server farm somewhere. Once you’ve logged into your account, go to Droplets under the Manage heading and click Create and Droplets. 

You can leave most of the settings as the default but change the plan to the basic $5 a month which contains enough resources for your app. You can scale this up later if needed. 

Also, choose the datacenter closest to the target audience of your app and change the authentication to password. While password authentication is less secure (SSH Keys is recommended), it’s much easier to setup so for your first drop we’ll use that. 

All that’s left now is to pick a name (hostname) and click Create Droplet.

## Connecting to your Droplet
Shortly afterwards, you’ll receive an email containing the username and password of your droplet which you’ll use to login. 

Back on the DigitalOcean website, under Droplets, click the name of your newly created droplet and then on Console. This will open a new tab that will let you control your droplet. Alternatively, you can use any SSH client with the IP address and user credentials contained in the email. *Link to an article on SSH (see if Section has any already)*

On your first login, since you used password authentication, it will prompt you to set a new password. A great way to generate secure passwords and store them is a password manager like LastPass. *Link here*  

## Deploying Your NodeJS Web App
First, you’ll need to copy the code for your web app to your Droplet. If you’re using source control such as Git *Link to Section article on Git* then it’s a simple as installing git using `apt-get install git -y`  and then using the git clone command  `git clone (link to your repository)` and then add the link to your repository at the end.

Second, you’ll need to install Node. Type:

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Third, you’ll need to install the node modules (dependencies) for your web app. If you installed all your modules with `-save` at the end which saves them to the package.json file then just type `npm install` and press enter. 

If not, when you run `npm start`  an error will appear with module not found. Type `npm install (module name)`  and press enter and then try running `npm start`  again. Repeat the process until the error disappears. 

If you need to install MongoDB (if you’ve created a MongoDB database), then follow these [instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition).

Finally, type `npm start`  to start your web app. Now that your web app is running, in a new browser tab, type the IP Address of your droplet (found in the email that DigitalOcean sent when you created the droplet) followed by a colon and the port your app runs on. For example, `167.172.54.51:8080`.

If you’re using an Express web server (which if you followed my *Node JS Web App Guide*) you did, you’ll find the port number located in the  `app.listen()`  line inside the server.js file. For example,  `app.listen(8080)`  which is a common port used. 

Congratulations, your first NodeJS web app should be displayed in your web browser which is running on your DigitalOcean droplet.

## Connecting Your Domain Name
You typed in an IP Address and port number to view your web app but wouldn't you prefer a custom domain name like yourapp.com? 

Assuming you’ve already bought a domain, the first step is to connect it to your DigitalOcean droplet. If you’ve not, domain registars like Namecheap *link to Namecheap* sell domain names and often other services such as email and static/CMS hosting (though it’s best to go with a dedicated hosting and email provider.) *Link to article you'll write about domain name basics (deploying static site to Netlify - part of creating your first static website series - intro to designing (Adobe XD) and developing*

Login to your domain registrar and go to the advanced DNS settings of your domain. For example, on Namecheap, it’s the Advanced DNS tab on the Manage Domain screen. 

You want to add a new record as follows: the type should be set to A, the host should be either @ or blank depending on your provider and the value should be the IP Address of the your droplet. Repeat the process for the host www which will do the same for the www version of your domain.

It can take up to  24-48hrs for the changes to process but it’s usually between 15 minutes to an hour. A quick way to check when it’s done is to go to [DNSChecker](dnschecker.org). Type in your domain name and make sure to type is set to A. When the result comes back as the IP Address of your droplet then you’ve connected your domain successfully.

The final test is to type your domain name followed by a colon and then the port number (e.g. `yourdomain.com:8080`.) You should now see your web app loading. 

## Removing the Port Number from your URL
Now you’ve got a cool domain name hooked up to your web app, you’ll probably want to remove that pesky port number. We can do this by setting up what’s called a reverse proxy. A reverse proxy will tell your droplet when a user goes to yourdomain.com, it should serve the site at yourdomain.com:8080. We will use the popular reverse proxy, Nginx *link here* to do so.

The first step is to install Nginx. Type the following to update your package list (so you can get the latest version) and install Nginx:

```bash
sudo apt-get update
sudo apt-get install nginx
```

Since DigitalOcean droplets are created with a firewall enabled, you’ll have to allow Nginx through it so it can work properly.  `sudo ufw allow 'Nginx Full'` will do this. 

To check the installation has gone smoothly, go to the http version of your domain name e.g. http://yourdomain.com. If you see a Welcome to Nginx landing page then it’s been successful. 

The second step is to secure your reverse proxy. Currently going to https://yourdomain.com won’t work. That’s because we haven’t configured SSL yet and we need to install a package called Certbot to do so.

To install Certbot, type the following to ensure you get the latest version:

```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get install python-certbot-nginx
```

Next, you need to add your domain to Nginx so Certbot can generate a certificate to the correct domain. Open the configuration file using `sudo nano /etc/nginx/sites-available/default` and replace the underscores in the server_name line to your domain. For example  `server_name yourdomain.com www.yourdomain.com;`. Save the file and exit by typing CTRL+X, y and then enter.

To test, there’s no errors in the file, type  `sudo nginx -t`  and if there’s none type  `sudo systemctl reload nginx`  to reload Nginx so it will use the updated configuration.

Now we just need to generate the SSL certificate.  `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com` will start the process.  You should choose option 2 for the redirect process because it will forward anyone trying to access the insecure version of your site (http) to the secure (https) version instead.

Continue on to Part 2 to discover how to connect a domain name to the droplet (and thus web app) and how to keep the web app running using a process manager.