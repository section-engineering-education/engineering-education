

Accessing systems remotely from your home computer is crucial for software developers and system administrators. Users might need to configure, install, and run applications on servers and computers that might not be physically accessible to them. Nowadays, cloud computing is one of the most popular platforms for hosting and running applications on the internet. In the cloud ecosystem, users create virtual computers called [virtual machines](https://www.vmware.com/topics/glossary/content/virtual-machine) that run in data centers somewhere in the world. Users require access to these virtual machines so that they can host their code, transfer files, manage, and run applications. SSH is one such tool that allows users to securely connect to and control remote computers in the comfort of their homes. In this article, we are going to explore the basics of SSH and build an application in NodeJs to connect to a virtual machine and monitor system health. 

### What is SSH?
[SSH](https://www.ssh.com/ssh/) stands for **Secure Shell** (also called **Secure Socket Shell**) and is a protocol that allows users to access a remote system or a virtual machine using the command line or the terminal. SSH establishes a shell session with the remote host, and the user will be able to manage the remote host by executing commands on their local computer via a terminal or command-line interface. In other words, users can "log in" to a  virtual machine and manipulate it based on their requirements. SSH is a very powerful tool for IT professionals and system administrators who deal with configuring and managing servers on a daily basis. Without SSH, users would have to physically go to remote data centers and connect to the computers, which is not feasible or efficient. 

SSH is based on the [client-server](https://www.britannica.com/technology/client-server-architecture) model, where a client is an application on the local system, and the server is the host you wish to connect to. The client application takes the remote host information, such as username, password, etc., as input and establishes an encrypted SSH session with the remote host. In the server, a [daemon](https://www.ssh.com/ssh/sshd/) process constantly listens to a port for any incoming SSH requests and checks to see if the credentials sent by the client are correct. If not, the request is rejected, and an SSH connection is not established. 

#### Using SSH
Most UNIX based operating systems such as Ubuntu, MAC OS, etc. come with an SSH client pre-installed. To establish a connection, open the terminal and execute the following command:

`ssh <username>@<hostname or host ip>`

The username field specifies the user id of the machine you are connecting to. The hostname is the name of the remote system and can be found by typing `hostname` in the terminal. Users can also specify the host IP instead of the hostname. for example:

`ssh adith@219.123.101.201`

This establishes a connection with the host whose IP is: 219.123.101.201 and the user is adith. 

### SSH in NodeJs
We are going to build an application that connects to a virtual machine and extracts information on the filesystem health of the VM. The application monitors the disk utilization in the VM and flags the partitions that have a disk utilization greater than 90%. This is useful for system administrators as it tells which partitions need to be monitored and increased in size before an actual failure of the system due to low space. 

Node has an array of libraries for establishing an SSH connection. In this article, we are going to use [simple-ssh](https://www.npmjs.com/package/simple-ssh). Simple-ssh is a robust and easy to use library that allows us to connect to a VM and execute Linux commands using Node.

Install the library by running the following command:

`npm install simple-ssh`

### Code
```node
// required to take input from user
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
```

The `readline` library allows users to provide input using the command line. We are going to take the VM host details such as hostname, username, and password as input from the user. This is required to establish a secure connection with the remote host. 

```node
// function to get input from user
function get_input() {

	rl.question("What is the host? ", function(host) {
	    rl.question("What is the user? ", function(user) {
	    	rl.question("What is the password? ", function(password) {	
	    		
	    		ssh(host, user ,password);
	   			rl.close();
	    	
	    	});
		});
	});
}
```

the `get_input()` function takes input from the user. The hostname, username, and password of the VM are stored in the `host`, `user`, and `password` variables and are passed to the ssh() function as parameters.

```node
// function to ssh into a remote host.
function ssh(host, user ,password){

	console.log('inside the system')
	var SSH = require('simple-ssh');
	var ssh = new SSH({
	    host: host,
	    user: user,
	    pass: password
	});
	// execute the df -h command to find out disk utilization
	ssh.exec('df -h', {
	    out: function(stdout) {
	    	// console.log(stdout);
	        parse(stdout);
	    }
	}).start();
}
```

The `ssh()` function takes the hostname, username, and password as the input and establishes an SSH connection with the VM using simple-ssh. The `exec()` function executes a Linux command on the remote host. In this case, we execute the `df -h` command that shows us the amount of disk space that is free on the host. 

Once we get the output of the `df -h` command in the stdout variable, we pass it to the `parse()` function that parses the output and displays it in a presentable format. 

![df command](/engineering-education/ssh-in-node/df.png)

The output of the df command is hard to read and understand. Therefore, we need to parse it and extract the relevant data.

```node
// Threshold value to see if disk utilization is below or above the desired limit.
const threshold = 90;
// function to parse the raw data from the df -h command.
function parse(data){
	// parser to parse the data(separated by tabs and spaces)
	var parser = require('node-csv-parse');
	
	var parsed = parser(data, {
		delimiter: ' ',
		trim: true
	}).asRows();

	var finalData = [];

	// go through every row in the data and add another column for threshold.
	// Also, check to see if CPU utilization percentage has exceeded threshhold or not.
	for(var i = 0; i < parsed.length; i++){
		var temp = parsed[i][0].split(' ');
		
		// remove all the empty spaces in the array
		temp = temp.filter(function(str) {
    		return /\S/.test(str);
		});
		
		if(i == 0){
			temp.pop();
			temp.push('Threshhold exceeded?');
		}
		else{
			if(parseInt(temp[4]) >= threshhold){
				temp.push('YES');
			}
			else{
				temp.push('NO');
			}
		}
		// console.log(temp);
		finalData.push(temp);
	}
	//console.log(parser(data).asRows());

	console.table(finalData);
}

```

In the `parse()` function, we go through every row in the data and see if the CPU utilization percentage has exceeded the threshold or not. For this, we add another column to the data called `Threshold exceeded?`. This column has two values, "yes" or "no" and tells the user whether the threshold has exceeded or not. 

```node

function main(){
	get_input();
}

main();
```
### Further reading
1. **df command**: (https://www.geeksforgeeks.org/df-command-linux-examples/)
2. **readline library**: (https://www.geeksforgeeks.org/node-js-readline-module/)
