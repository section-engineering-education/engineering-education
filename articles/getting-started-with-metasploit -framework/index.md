### Getting started with Metasploit Framework
Due to numerous cases of cyber insecurity, companies have now adopted to hiring hackers and security specialists to test their systems for **vulnerabilities**. Hackers therefore perform a penetration testing on the systems by use of various tools, one of which is commonly used is Metasploit Framework.

**Metasploit Framework** is a powerful penetration-testing tool used by ethical hackers and cyber criminals to examine a system's vulnerability to network.

It is considered the most useful security auditing tool since it contains information gathering tools, web vulnerability plugins, modules and exploit development environment.

### Installing Metasploit Framework
In most cases, Metasploit Framework is pre-installed in Kali Linux(most recommended OS for penetration-testing). For cases where it is missing, follow through for a successful installation.

* First, start the terminal and run the command below. Enter your password when prompted:

```bash
$ sudo apt install metasploit-framework -y
```

* After successfully running the command, you should have Metasploit Framework on your machine.

### Starting Metasploit Framework
To run Metasploit faster, you should first start the Postgresql database by running the command below. The command returns nothing.

```bash
$ sudo service postgresql start
```

> **Note**: For the latest version of Kali Linux (2020), you should precede commands that require root privileges with the keyword **sudo**.

If you are running Metasploit Framework for the first time, you have to initialize the database by running the command below:

```bash
$ sudo mfsdb init
```

You are now ready to start your Metasploit Framework.

Start Metasploit by running the command below:

```
$ msfconsole
```

Starting Metasploit may take a while, since it loads everything in RAM. So, be patient.

![Metasploit started](metasploit1.png)

Hurrah! You have successfully started your Metasploit-Framework.

Don't worry if it doesn't look the same.

### Major Keywords
Metasploit Framework contains a piece of software known as a **module** that performs tasks such as scanning and exploiting targets.

Modules are the main components of Metasploit Framework and are broken down into 7 types below:

1. Exploits
2. Payloads
3. Auxiliaries
4. Encoders
5. Evasions
6. Nops
7. Post

**Exploits** in modules take advantage of a system vulnerability by often using simple scripts known as **payloads**

Any other modules that aren't exploits are **auxiliary** modules. They have fascinating features that allow them to do more than just exploiting.

### Major commands
#### 1. help
For a start, type in the `help` command to see the various commands you are most likely to interact with.

```bash
msf5 > help
```

#### 2. search

For beginners, the `search` command may be the most useful. With thousands of modules available, finding a specific module could be problematic and therefore the search command comes to the rescue.

To narrow down your search, use specific keyword as guided below:

* *Type* - State the type of module you are searching for. It could be an exploit, payload, encoder, or a post.
* *Platform* - This is the Operating System for which the module was made for. You are allowed to search for a module depending on the platform you are about to exploit.
* *Name* - You can also type in the module name itself to find it.

#### Search syntax

Type in the `search` keyword followed by a colon and then specify the keyword stated as shown below.

```bash
msf5 > search type: module
```

example:

```bash
msf5 > search type:exploit platform:windows multi/handler
```

As you can see from the example below, metasploit returns modules fitting the search parameters.

![Search Result](search.png)

#### 3. use

The `use` command stages an exploit and makes it available when an exploit is run.

Exploits can be staged as shown in the example below:

```bash
msf5 > use exploit/multi/handler
```

If the module is successfully staged, Metasploit will respond by showing the type of exploit and abbreviates it in red as shown below.

![Use Result](use.png)

#### 4. Info

After staging an exploit, you can run the `info` command to retrieve information like the name, author, and platform about the exploit.

Run the command as shown below:

```bash
msf5 > info
```

![Info result](info.png)

#### 5. show

After successfully staging an exploit, use the `show` command to see the available payloads, targets, or options corresponding with the staged exploit.

The three most used `show` commands are:
1. `show payloads`
2. `show targets`
3. `show options`

Let's take a look at the three 'show' commands.

#### 1. Show payloads

This command will give a list of all the payloads compatible with the staged exploit. If the command is run before staging the exploit, it will give a list of all the payloads - which is usually a long list.

The command can be run as shown below:

```bash
msf5 > show payloads
```

![Show payload result](showpayload.png)

#### 2. show targets

The command `show targets`, lists all the targets vulnerable to the staged exploit. A target's vulnerability can vary depending on the Operating system, update, language among others.

Run the command as shown below:

```bash
msf5 > show targets
```

![Show target result](showTarget.png)

As you can see from the example above, we have a target vulnerable to the exploit we used.

#### 3. show options

This command is often useful as it shows the options yet to be set before running the exploit. Options to be set may include RHOST, LHOST, PATH, LPORT etc.

The command is run as shown below:

```bash
msf5 > show options
```

![Show options result](showOptions.png)

### 6. Set

This command sets an option or overwrites an undesired option. The options to be `set` depends on the staged module. Options to be set may include RHOST, LHOST, PATH etc.

Options can be set as shown below:

```bash
msf5 > set LHOST 192.168.234.122
```

![set result](set.png)

As you can now see from the show options, the LHOST has been set successfully.

### 7. Exploit

Once the exploit is staged and all the options have been set, you are now ready to run the attack.

You can run the attack by using the `exploit` or `run` keyword as shown below:

```bash
msf5 > exploit
```

### 8. Back

This command takes us one step back. It is applicable in cases when you want to make changes on the options set. Run the command as shown below:

```bash
msf5 > back
```

![back result](back.png)

### 9. Exit

This command exits the `msfconsole` and takes us back to the terminal. The `exit` command is run as shown below.

```bash
msf5 > exit
```
![Exit Result](exit.png)

### Conclusion
In this article, we have learned the following:
- Introduced Metasploit Framework.
- Installing Metasploit Framework.
- Major Keywords in Metasploit.
- Staging and running exploits.