The Raspberry Pi can be used as a web server on your main local network or on the internet at large. It is a great selection in cases where you want an Intranet for the office or web development server. You can create a local Pi web server to deliver various contents while you are continuously surfing over the internet. To make the web server operational, the Raspberry Pi should be connected to the local network and ensured that it has the latest version of the operating system of Raspbian. These are the defined instructions that you need for any model to work even on the pocket-sized Raspberry Pi Zero W and the very powerful Raspberry Pi 4.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Setting up Apache on Raspberry Pi](#setting-up-apache-on-raspberry-pi)
- [Changing The Host Name of the Server](#changing-the-host-name-of-the-server)
- [Conclusion](#conclusion)
- [Relevant resources](#relevant-resources)

### Pre-requisites
For the reader to follow through and be guided accordingly, they are assumed to have an installed operating system with the Pixel window manager. In summary, you need to have;
1.	A Raspberry Pi Zero W 
2.	Apache web server 
3.	Internet   
4.	Modules such as SSH enabled
 
### Introduction
There are various web servers that can be related to the Raspberry Pi and each has utilization advantages. This tutorial uses the Apache web server application. Apache is an open-source web server that provides content via the internet. It may be installed on a Raspberry Pi and used to deliver web pages. Apache can handle HTML files through HTTP, and with additional modules, it can help with dynamic web pages written in languages like PHP. Apache offers the advantage of being able to handle huge traffic amounts with less configuration. You can configure it to conduct an operation you wish and the approach to use. To increase its efficiency on the raspberry, you can eliminate modules that are not required. 

### Setting up Apache on Raspberry Pi 
*Step one:*

You need to access the command terminal through clicking CLRL+ALT+T from the Raspbian desktop. 

![Raspberry Pi Terminal](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/terminal.png)
 
You can also opt to connect remotely through SSH in case it is enabled on the raspberry Pi. This is possible through a tool such as Putty and then use the raspberry’s username and password to login. 
 
Note: The default credentials for login into a raspberry Pi using SSH are as follows:
Username: pi
Password: raspberry 

![Putty Connection](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/puttylogin.PNG)

*Step two:*

Ensure the available packages are updated by typing the below command into the Terminal. This ensures you have the current versions of any file you download afterwards.
Sudo apt update 

![Sudo apt update](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/sudoaptupdate.PNG)
 
*Step three:*

Install the package of apache2 with the following command
Sudo apt install apache2 –y

![Apache Installation](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/installapache.PNG)
 
*Step four:*

Add php using the command;
sudo apt-get -y install php5-common php5-cgi php5 

![PHP Installation](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/installphp.PNG)
 
*Step five:*

To install mysql database on the raspberry pi, run the following command in the terminal; 
sudo apt-get install mysql-server

![My SQL Download](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/downloaddb.PNG)
 
Note: When prompted to change the root password, please choose a strong password for the mysql and make sure to write it down somewhere you can refer to later on.  

*Step 6:*

When the download is finished, formal installation is required and can be done using the command;
sudo mysql_secure_installation

![My-SQL Installation](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/installdb.png)
 
*Step 7:*

Restart the webserver, apache2, to confirm that the changes take effect and are running. Use the command;
sudo service apache2 restart

![Restarting Apache](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/restartapache.png)
 
*Step 8:*

Put the apache web server to test. Since Apache has a HTML file in the Apache web subdirectory, you can serve it on the raspberry when you browse http://[IP]/.
When you browse to the default page of the web server on the Pi or on the network of another computer the following page will display if the Apache webserver is working. 

![Apache Default Page](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/defaultpage.PNG)
 
You can build your website through locating the PHP files or the html in the /var/www/html directory. To make the folder easily accessible to the default user, that is, the pi, run the command;
Sudo chown –R pi/var/www/html

### Changing The Host Name of the Server
The host name of the Raspberry Pi will be raspberry by default. Since you might have other raspberry pi names on your network you can make changes using the following steps;

1.	Type sudo raspi-config in the command terminal and then select the hostname option.

![Renaming Host using Terminal](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/renaminghost1.png)

  Alternatively, use the start menu to navigate to Preferences->Raspberry configuration to launch the windowed version.  

![Renaming Host using GUI](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/renaminghost2.png)

2.	Choose the Hostname you wish to have, for instance, “myraspserver”

![Renamed Server](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/serverrenamed.png)

3.	Click Ok.
Note: This will assist you in getting over the warning about not using characters other than numbers, hyphens, or letters. The hyphen is only allowed in situations where it is in between a name. 
4.	Choose Yes when prompted to restart. 
 
Once you have allowed your computer to reboot, the Raspberry Pi will now be shown with its changed name. 

![Raspberry Pi Reboot](/engineering-education/hosting-a-webserver-using-a-raspberry-pi/reboot.PNG)

### Conclusion
By following the steps presented above, it is possible to install and host a web server using a Raspberry Pi. The hosted webserver can be used to serve a small office through an intranet. 

### Relevant resources
- [Host Your Website on Raspberry Pi](https://www.instructables.com/Host-your-website-on-Raspberry-pi/)
- [Host a Website on Raspberry Pi](https://fireship.io/lessons/host-website-raspberry-pi/)
- [Host a Raspberry Pi Web Server on the Internet](https://medium.com/swlh/host-a-raspberry-pi-web-server-on-the-internet-89786287db77)
---



