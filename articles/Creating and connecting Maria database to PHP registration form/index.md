Apart from Backend developers,Database may seem to be a very complicated thing in a other Developers coding live.However,to me this is just a mis-understanding because this article will  prove how easy it is to work with Maria Database with only SQL and PHP knowledge.

### Prerequisites
To use this tutorial you need to ;
- have `HTML` and `CSS` knowledge
- have a working code editor live vscode
- be a use with sudo privilege
- access to terminal/command line

In this article you will learn how to;
- install Xampp
- create  tables in Database using SQL commands
- create a registration form using `BOOTSTRAP`,`CSS`,  and `HTML` and store those details into the database tables
- store data ino the database
- fetch data from database  

### Step 1: Installing Xampp
Xampp comes along with PhpMyAdmin when downloaded into a machine.  PhpMyAdmin is the MariaDatabase that we will be working with in this article.

To install xampp you need to;
### . Download the package to be installed.
Downloading the package is always the first step you need to do when installing xampp.You can download the package `here`. Download Xampp for linux.
### . Give the package permission so that it can be executable
To make this package executable,you need to Open the terminal (Ctrl+alt+T) and follow the following;

1. Move to where your package is located. In my case it is in Downloads folder and so I will navigate to downloads folder using this command:
```bash
 cd /home/[username]/Downloads

```
2. Run chmod command to make the package file executable using this command.

sudo chmod 755 [package name] 

The  xampp version may differ. In my case I have then following;
```bash
sudo chmod 755 xampp-linux-x64-7.4.10-0-installer.run
```
Just navigate to where your package is and  copy and paste the file name like the one we have above and this will make your work easier.

3. When you enter the above command you will not see anything from the terminal that you have performed that step successfully.However,we need to verify that we have executed the permission with the command below:
```bash
 ls -l xampp-linux-x64-7.4.10-0-installer.run
```
Here, this is the output that you will get
```bash
-rwxrwxrwx 1 [username] [username] 157293721 Sep 12 22:23 xampp-linux-x64-7.4.10-0-installer.run
```
The username above is the user who can execute the file.
### . Launch  Setup Wizard
1. Its  now time to run the installer and launch the setup wizard.To do  that use the following command:
```bash
sudo ./xampp-linux-x64-7.4.10-0-installer.run
```
2. When you click enter in the above command, you should have XAMPP Setup Wizard opens as the image below:
![XAMPP Setup Wizard](img1.png)

### . Install Xampp
1. You should click ``Next`` in the above image and Select Components dialogue.You should choose either XAMPP Core Files or Xampp Developer Files and instal.You may keep the default setting and proceed with the ``Next``

2. The Setup will show you  the location where software will be installed after selecting the components. The location should be `/opt/lampp`. Click `Next` to proceed.

3. After clicking next, you should see a dialogue box offering to install some additional application besides Xampp installation. Uncheck  ``Learn more about Bitnami for XAMPP`` to deny and click ``Next``.

4. The Wizard is now ready to install Xampp. Start the installation by clicking ``Next``.

5. The Installation process should start immediately and a progress in a dialogue box should appear on the screen as shown below:
![XAMPP Setup Wizard](img2.png)

### . Launching Xampp
When you click next above, Xampp control panel will be displayed on the screen as in the figure below:
![XAMPP Setup Wizard](img3.png)
In the Manage Serves tab make sure that all available services are learning by selecting ``Start``

### . Verifying that XAMPP is running
Here we are going to verify that we have successfully installed two thing. The `localhost` and the `MariaDB`
1. For localhost enter the following URL in a browser: 
