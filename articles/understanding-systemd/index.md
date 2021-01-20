## Introduction
From the official website, systemd (intentionally spelt with a small 's') is described as a suite of tools that forms the basic building block for a Linux system.
systemd is primarily responsible for handling the boot process for Linux systems. As an init implementation, it has a PID of 1 just like other init systems e.g System V, Upstart.

### What's init?
Before we delve further, lets talk more on what exactly init is. 
An init program is usually the first to start and the last to stop. It initializes and terminates programs and services crucial to the operation of Linux systems. It's actually a daemon process that runs during the entire life time of all other programs and services in the system. It's acts as the parent process such that when child processes are orphaned or become zombies, the init process takes the responsibility of ensuring that they're properly terminated. 
Now, what happens when the init process doesn't start first (the kernel doesn't boot the init process)? A kernel panic occurs because there isn't an init process to startup things and make way for essential services.

### Implementations of init
There are quite a number of init implementations. They usually differ by the scope of their responsibility. systemd for instance is capable of a wide arrays of things that some might argue on the premise of being outside the scope of what an init system should do and the Unix golden rule of doing one thing. The responsibilities common amongst init includes: starting daemons and services, mounting filesystems, configuring network interfaces etc.

**System V init:** This is the traditional init system (pronounced as "sys five"). It's composed of a multitude of scripts that starts up various services expected to run during a particular runlevel. In System V, the state of a Linux machine at any particular state is referred to as the runlevel denoted from 0-6. Runlevel's are primarily serve as a means to differentiate between startup, shutdown, single-user mode, console mode states. System V init has a lot of deficiencies that made startup time slower. Since shell scripts execute line-by-line (interpreted), system execution isn't parallelized (execution is sequential)  because init scripts would have to execute on after the other. If there was an error with a script's execution, it would have to time-out before the next script in line gets executed. System V init rigidity also limits its ability to manage multiple dependencies quickly since one script waits for the complete execution of the other.

**Upstart:**: This is Ubuntu's implementation of the init system to solve the problems associated with System V. Rather than execute scripts sequentially during a runlevel, upstart manages system state by reacting to events. For example, upstart initializes the required dependencies and services on the event of connecting/removing a hot-plug device to the machine. An event is a change in the system state.

**systemd:** This is the current standard for implementing init systems in modern Linux machines. It's also the focus of this article to deep-dive into it.

---

## Why systemd?
systemd's capable of starting services in parallel which dramatically speeds up the boot process. systemd is also capable of handling hot-plug devices, starting up services on demand at the occurrence of an event (just like upstart). The process of managing service daemons in System V is a little bit involved. This is so because scripts get  detached from the daemons they spawn upon runtime. Some daemons spawn 3rd party processes that get orphaned and re-parented by PID 1. Some processes even re-fork and rename themselves which makes process management difficult. One might use use a ps command to manage these daemons which might also be cumbersome for handling processed re-parented by PID 1.

systemd makes the management of these individual daemons/services easier by hierarchically placing their processes  in a control group (cgroup). The children of spawned processes are made members of the parent cgroup (named after the service). A process wouldn't be able to leave a cgroup until the parent cgroup does. This methods prevents the occurrence of zombie processes and also makes managing  (running kill -9 as an example) all the processes related to the service easily since they belong to a common cgroup.

systemd also provides a tool called "systemctl". man 1 systemctl says systemctl maybe used to introspect and control the state of the "systemd" system and service manager. This tool can be used to start and stop services including other things as we shall soon see.
System V init implementations make use of shell scripts (programmatic) to manage the system state. systemd on the flip-side takes a different and easier approach towards writing configuration files by expressing commands in a  declarative format.
This inevitably makes the lives of Linux user and sysadmin's easier by making uniform all aspects of system administration.

[ULSAH](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554) gives a succint description on systemd's mode of operation:

*Much like a package management system, systemd defines a robust dependency model, not only among services but also among "targets," systemd's term for the operational modes that traditional init calls runlevels. systemd not only manages processes in parallel, but also manages network connections (networkd), kernel log entries (journald), and logins (logind).*

systemd is also compatible with existing init scripts of System V.

---

## systemd deep-dive
During boot time, systemd loads its configuration, determines its boot goal and  dependices then activates them afterwards.
An interesting (probably the most prominent) thing to note about systemd is that it doesn't follow a sequential pattern for starting up services. Rather it follows a much more flexible process by reacting to system events and activating additional components in return.

The systemd Linux manual states that 
systemd provides a dependency system between various entities called "units" of 11 different types. Units encapsulate various objects that are relevant for system boot-up and maintenance.
A unit type can be seen as a type of task performed by systemd that's relevant to the management of a Linux system. A task is called a unit in systemd parlance. These units are a standardized representation of system resources that can be managed by the suite of daemons. 

There are default unit files supplied by the packages of the service that usually reside in **/lib/systemd/system/**. These files are vendor written and can be overwritten by the package maintainer in the event of a package update. User-specific configurations for units  are usually made in **/etc/systemd/system/** because the unit files in this location won't be overwritten on the event of a package upgrade.

**Tip:** You can copy the default unit file into a corresponding unit file in **/etc/systemd/system/** and make appropriate customization's.

There are 11 type of units in systemd. We'd talk about the most common ones. man 1 systemd describes the all of them. So give it a check.

1. Service units: This unit defines how to manage service daemons controlled by systemd. Unit files of this service end with .service.
Socket units: This describes a local inter-process communication or network sockets in a Linux system.
2. Target units: This is used to provide synchronization amongst unit files during boot-up. It can also be used a medium to extend scope by specifying their targets to other targets.
3. Device units: This unit describes devices that require exposure to systemd by udev and sysfs filesystem.
4. Mount units: This simply defines a mount point for attaching filesystems controlled by systemd.
5. Automount units: This provides automount capabilities.
6. Timer units: This unit (synonymous to cron) defines a timer controlled by systemd. It can be used to schedule activation of other units.
7. Swap units: This unit may be used to describes a memory swap partition.
8. Path units: This unit can be used to define a path that activates other services when files within the path is modified. 
9. Slice units:  Now this is a special unit. It's used in conjunction with cgroups to group processes, daemons, services into one hierarchical tree for management of resources.
10. Scope units: This is used for managing externally created processes. See man 5 systemd.scope

Earlier on, we talked about systemd starting up services required to hit a default boot goal during boot time. Imagine this default boot goal to be a node at the top of a tree. So when this target is activated, all other target below it (dependencies) are also activated.

A visual cue could be of help here.

![Figure 1. Dependency tree](/engineering-education/understanding-systemd/)

### How systemd manages dependencies
So it turns out managing dependency is actually difficult in modern system like Linux that have so much services that depend on each other. One service failure can solely freeze the boot process of a Linux machine.

Imagine defining a dependency from an X server to a logging service. That is the logging service would have to start before the X server. In a situation where the logging service doesn't start we'd be unable to get our X server running because one of its dependency/ies isn't running.

System V init implementations didn't have dependency management issues because things were kept simple at the expense of flexibility. The developers of systemd devised a method to easily handle dependencies in such a way that the failure of one dependency doesn't keep the entire system in limbo.

There is a handful of dependency types that gives systemd its flexibility in dependency management. These "dependency types" are regarded as directives in unit files and are found with the Unit section of the unit:

- **Requires**: A unit file with a 'Requires' dependency means unit's within this directive must be successfully activated when an activation signal is else the current unit will fail. Dependencies with this directive are strict.
-**Wants**: This is a less stricter version of Requires. The Wants dependencies is activated upon activation of the containing unit file. This unit will be activated regardless of if the Wants dependencies fail.
- **Conflicts**: Units outlined within this dependency are automatically stopped upon activation of the containing unit file.
- **Requisite**: Units within this dependency must already active before the unit is activated else systemd fails on the activation of the unit with the dependency.
- **Before**: This dependency directive explicity declares ordering. This is important in situations when you'd want to start a unit before another. For this instance the current unit is activated before the the unit under the Before directive
- **After**: This dependecy is also used for ordering dependency activation. It's the opposite of Before. The unit under this directive is/are activated before activation of the current unit.
- **Conditional Dependencies**: This is used to evaluate a truthy or falsy value of units with it. The current unit won't be activated if the conditional directive evaluates to false.

### syntax of unit files
So now, we have an idea of how systemd manages dependencies. But that isn't all of it. We'd talk more about them as we attempt to understand the syntax and structure of unit files.

A unit file is divided into multiple portion know as Sections. These section have their names enclosed in square brackets ([]). Within a section are declarations of variables and their assignments to values.
NB: howlinuxworks notes that unit files are derived from the XDG Desktop Entry Specification (for .desktop files, which are very similar to .ini files on Microsoft systems)

![Figure 2: An example of a unit file (.service) with Sections and Directives](/engineering-education/understanding-systemd/figure-1.png)

The service section contains configurations applicable only to .service unit files. Variables specified within sections are known as Directives.
Figure 2 contains three directives - [Unit], [Service] and [Install] with their respective directives.

Let's talk a bit on the directives of  Service section

### **Service section**
- **Type:** this defines services by their process and daemonizing behaviour.
- **ExecStart**: This directive set the path and arguments of the command to be execute for the unit
-**ExecStartPre:** This specifies additional command that executes before ExecStart
- **ExecStartPost:** This configure the path to commands that will be executed after ExecStart.
- **ExecReload:** This defines a command to reload the service file.
- **Restart:** systemd restarts the service when this point is reached. In the example above, the service is restarted on failure
- **TimeoutSec:** This directive set the value systemd waits when stopping a service before marking it as failed or killing it.

### Unit section
- **Description:** This directive is used to describe the function of the unit. 
- **Documentation:** This provides information on how the unit's documentation can be accessed. The documentation can be accessible via URL's or man pages.

We talked about the remaining directives of the Unit section above. You can also recall that they're used to manage dependencies.

### **Install section**
This section can be used to manage dependencies too. It used to define the behaviour of a unit when enabled or disabled without modifying any configuration file.
There are two directives commonly used within this section.

**WantedBy:** Figure 2 above has a WantedBy dependency in its install section. systemd usually ignores this section during its normal operation. systemd processes this section when it is enabled. The WantedBy dependency establishies a relationship between the current unit and the dependency unit without modifying the dependency unit (just like the Wants dependency of the unit section). Using our example, when systemd parses the WantedBy dependency, a symbolic link of the current unit (ssh.service in our case) is automatically within a folder in ***/etc/systemd/system/***. This folder is named as the WantedBy dependency with .wants appended to the end. Folder name in this case would be multi-user.target.wants.

![Figure 3. symbolic link of ssh.service](/engineering-education/understanding-systemd/figure-3.png)

We can see the ssh.service symbolic link pointing to the target - ***/lib/systemd/system/ssh.service*** (vendor written unit files are kept in ***/lib/systemd/system/***).
ssh.service unit would be enabled before the units grouped in multi-user.target. One doesn't need to write a Wants dependency requiring ssh.service in all the unit files of multi-user.target.

This method keeps multi-user.target clean from any form of edit because they might be overwritten in the future during an upgrade but the WantedBy dependency in ssh.service will keep the relationship.

**RequiredBy:** This directive is similar to WantedBy but will cause the activation to fail is not met.

**Alias:** Units can assume names defined by this directive.

### **Mount section**
systemd uses mount units for mount point management. This section type comes with a number of directives. This functionality is defined using the mount section directive.

**What:** This directive defines the UUID of the device to be mounted.

**Where:** This defines the UUID or absolute path of where the device should be mounted.

**Type:** Type of filesystem to mount
Options: This defines an other mount option as a comma-separated list.

The Linux man page for systemd describe other unit types in detail: ***man 5 systemd.socket, man 5 systemd.automount, man 5 systemd.device***.

---

## systemctl
***man 5 systemctl*** describes systemctl as a tool that
may be used to introspect and control the state of the "systemd" system and service manager.
This is the tool used in interacting with systemd. Things like service activation, deactivation, enabling, disabling, reloading, dependencies listing etc are executed using systemctl. In conjunction with its numerous flags useful and detailed information on the state of systemd services is provided. It's also very helpful when debugging certain services that don't function because of due to dependencies malfunction.

***systemctl status [unit]:*** shows the status of unit.

***sudo systemctl stop [unit]:*** deactivates a unit.

***sudo systemctl start [unit]:*** activates a unit.

***sudo systemctl disable [unit]:"*** removes the symbolic link if it has an install section.

***sudo systemctl enable [unit]:*** creates a symbolic link and it should be run before activating activating a unit else won't run the systemd the install section.

***systemctl list-units:*** lists all active units.

***sudo systemctl reload [unit]:*** reloads a particular unit when there's an edit in its configuration file.

***sudo systemctl restart [unit]:*** restart the unit by stopping and starting the unit. This method causes more disruption of service unlike '*systemctl reload [unit]*' that only reloads the configuration file.

***sudo systemctl daemon-reload:*** reloads all unit configuration files.

Check man 5 systemctl to see more commands systemctl provides.

---

## Editing unit files using Drop-ins
We previous discussed that systemd units can be edited directly from **/lib/systemd/system/** (not advisable) or copy the unit file to /etc/systemd/system/ and make edits there because this location doesn't suffer from an overwrite during a system upgrade (advisable). Also, unit files in **/etc/systemd/system/** have a higher precedence for discovery than other locations.

Unit files in either of these locations can also be overwritten or extended using drop-in files.
In this section we'd write a configuration file to manage a sample application.

Install stress via "**sudo apt install stress**" and create a file service named foo.service using "**sudo vim /etc/systemd/system/foo.service**".

Define the body of this file with the following section and directives like this:

![Figure 4. foo.serviceExecStart directives defines the program for execution](/engineering-education/understanding-systemd/figure-4.png)

This creates a cgroup for foo.service using the ExecStart --cpu,--io,--vm,--vm-bytes flags to specify values for their respective cgroup subsytem.

"**sudo systemctl start foo.service**" starts the service and "**sudo systemctl status foo.service**" to view the status.

![Figure 5. foo.service current status](/engineering-education/understanding-systemd/figure-5.png)

To create a drop in file for foo.service in **/etc/systemd/system/**, create a foo.service.d directory create 00-foo.conf which is the drop-in file.

Edit 00.foo.conf to look like this:

![Figure 6. Drop-in file for foo.service](/engineering-education/understanding-systemd/figure-6.png)

When modifying ExecStart of the actual unit file in a drop-in file, make sure to define ExecStart to nothing and redefine it to a new command just like we have above.
Now, ExecStart has been successfully modified in **/etc/systemd/system/foo.service** without actually writing to it. Restart the service to see the change.

![Figure 7. Drop-in file modifying foo.service](/engineering-education/understanding-systemd/figure-6.png)

**NB: You should actually reload the systemd daemon before restarting.**

We can now see that the drop-in file is active and systemd was able to reflect the change on foo's service.

systemd-delta outputs the different changes made to all unit files. This is the equivalent to a git diff.

Please refer to the systemd manual page for more insight on resource management using systemd and cgroups (which is outside the scope of this article).

"**sudo systemctl edit [unit]**" creates a drop-in file in **/etc/systemd/system/unit.d/override.conf** and automatically reloads the unit after editing. "**sudo systemctl revert [unit]**" reverts back to the vendor-specific version.

---

## Conclusion
systemd standardizes how Linux-based systems should be managed rather than hacks common among System V init implementations.

We've also discussed the Sys V-based issues and how systemd surmounts them. But it is only so little of systemd's capabilities that I can possibly fit in this article.
Archlinux intro paragraph to their wiki on systemd says:

*systemd provides aggressive parallelization capabilities, uses socket and D-Bus activation for starting services, offers on-demand starting of daemons, keeps track of processes using Linux control groups, maintains mount and automount points, and implements an elaborate transactional dependency-based service control logic.*

Like this isn't huge enough, it still goes on to say:

*systemd supports SysV and LSB init scripts and works as a replacement for sysvinit. Other parts include a logging daemon, utilities to control basic system configuration like the hostname, date, locale, maintain a list of logged-in users and running containers and virtual machines, system accounts, runtime directories and settings, and daemons to manage simple network configuration, network time synchronization, log forwarding, and name resolution.*


So to experience and utilize the power of systemd to its full glory, I'd advice you study further. Links to resources and materials referenced in this can be found below.

### Quick Fact
systemd was developed by Lennart Poeterring and Kay Sievers - software engineers working for Red Hat. The migration from traditional init based systems to systemd is probably the most fiercely debated topics in Linux's history. For arguments for and against systemd it would be interesting if you visit biggest myths and without-systemd.

---
## References
[Archlinux systemd wiki](https://wiki.archlinux.org/index.php/Systemd#Editing_provided_units)

[Wikipedia systemd](https://en.wikipedia.org/wiki/Systemd)

[Understanding Systemd Units and Unit Files | DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files#anatomy-of-a-unit-file)

[UNIX and Linux System Administratior Handbook](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554)

[How Linux Works](https://www.amazon.com/How-Linux-Works-2nd-Superuser/dp/1593275676)

[systemd.service(5) - Linux manual page](https://man7.org/linux/man-pages/man5/systemd.service.5.html)

[cgroups(7) - Linux manual page](https://man7.org/linux/man-pages/man7/cgroups.7.html)

[Learn Linux, 101: Runlevels, boot targets, shutdown, and reboot](https://developer.ibm.com/technologies/linux/tutorials/l-lpic1-101-3/)