---
layout: engineering-education
status: publish
published: true
url: /understanding-systemd/
title: Understanding systemd
description: This article will take a reader through the Sys V-based issues and how systemd surmounts them. systemd standardizes how Linux-based systems should be managed. This is different from hacks common among System V init implementations.
author: emmanuel-bashorun
date: 2021-02-23T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-systemd/hero.jpg
    alt:  example image 
---
The official website describes systemd (spelled with a small s) as a suite of tools that forms the basic building block for a Linux system. systemd handles the boot process for Linux systems. As an init implementation, it has a PID of 1 like other init systems, such as System V, Upstart.
<!--more-->
### Prerequisites
To follow this article along, you will need some:
1. Familiarity with basic Linux commands.
2. Basic understanding of Linux processes, daemons and cgroups.

NB: The reference section contains links to resources referenced in this article

### What's init?
Before we delve further, let's talk more about what exactly init is. An init program is usually the first to start and the last to stop.
It initializes and terminates programs and services crucial to the operation of Linux systems.

It's also a [daemon](https://man7.org/linux/man-pages/man7/daemon.7.html) process that runs during the entire lifetime of all programs in the system. 

It's an ancestor process to all processes. It also adopts orphaned or zombie processes. That is, after a child loses its parent, the init process becomes its new parent.

Now, what happens when the init process doesn't start first (the kernel doesn't boot the init process)? A kernel panic occurs because there isn't an init process to startup things and make way for essential services.

### Implementations of init
There are some init implementations that usually differ by the scope of their responsibility.

systemd for instance is a very functional software. Some might argue that systemd's functionality is outside the scope of what an init system should do. 

SInce it does more than starting daemons and services, mounting filesystems, configuring network interfaces.

**System V init:** This is the traditional init system (also pronounced as "sys five"). It consists of several scripts that start various services expected to run on a runlevel. In System V, the state of a Linux machine at any particular stage points to a [runlevel](https://developer.ibm.com/technologies/linux/tutorials/l-lpic1-101-3/). 

The runlevel stages span from 0 to 6. They help differentiate between startup, shutdown, single-user mode, and console mode states.

System V init has a lot of deficiencies that make startup time slower. Since shell scripts execute line-by-line, system execution isn't parallelized.

If there is an error with a script's execution, it would have to time-out before the next script in line gets executed.

System V init rigidity limits its ability to manage many dependencies. This is because one script waits for the complete execution of the previous one.

**Upstart:** Ubuntu's implementation of the init system. It solves the problems associated with System V. Rather than execute scripts during a runlevel, upstart manages the system state by reacting to events. An event occurs when a hot-plug device is connected/removed from the machine. Upstart initializes the required dependencies and services for this event change.

**systemd:** Current standard for implementing init systems in modern Linux machines. It's also the focus of this article.

### Why systemd?
systemd is capable of starting services in parallel, which speeds up the boot process. It is also capable of handling hot-plug devices; such as starting up services on demand at the occurrence of an event (like upstart). 

The process of managing service daemons in System V  is a little bit involved. This is so because scripts get detached from the daemons they spawn upon runtime. Some daemons spawn 3rd party processes that get orphaned and re-parented by PID 1. Some processes even re-fork and rename themselves which makes process management difficult.

systemd makes daemon/service management easier by placing their processes in a control group (cgroup).

Here, spawned processes are made members of their parent cgroup (named after the service). These processes are not capable of leaving their cgroup until their parent terminates them. This prevents the creation of zombie processes. It also eases the management (running kill -9 as an example) of related processes since they belong to one cgroup.

systemd also provides a tool called "***systemctl***". ***man 1 systemctl*** says ***systemctl*** may be used to introspect and control the state of the "***systemd***" system and service manager.

This tool can be used to start and stop services including other things as we will soon see. System V init implementations manage system state by the use of shell scripts. 
systemd on the flip-side takes a different approach towards writing configuration files. It does this by expressing commands in a declarative format. This makes the job of administering Linux systems easier by making uniform all aspects of system administration.


[ULSAH](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554) gives a succinct description on systemd's mode of operation:

>Much like a package management system, systemd defines a robust dependency model, not only among services but also among "targets," systemd's term for the operational modes that traditional init calls runlevels. systemd not only manages processes in parallel, but also manages network connections (networkd), kernel log entries (journald), and logins (logind).

systemd is also compatible with existing init scripts of System V.

### systemd deep-dive
During boot time systemd loads its configuration, determines its boot goal and dependences. It then activates them afterward.

systemd also doesn't follow a sequential pattern for starting services. Rather, a flexible process by which extra components activate when system events occur.

The systemd Linux manual states that systemd provides a dependency system between various entities called "units". Units encapsulate various objects that are relevant for system boot-up and maintenance.
> A **unit type** is a type of **task that's relevant** to the management of a Linux system. A task is a unit in systemd parlance. These units are a standardized representation of system resources managed by the suite of systemd daemons. 

There are default unit files supplied by the packages of the service that usually reside in **/lib/systemd/system/**.  These files are vendor-written and can be overwritten by the package maintainer in the event of a package update. 

User-specific configurations for units are usually made in **/etc/systemd/system/** because the unit files in this location won't be overwritten in the event of a package upgrade.

**Note:** It's common practice to copy the default unit file into **/etc/systemd/system/** and make appropriate customization.

There are 11 types of units in systemd. We'll talk about the most common ones. 
***man 1 systemd*** describes them. So give it a check.
1. Service units: This unit defines how to manage service daemons controlled by systemd. Unit files of this service end with .service.
2. Socket units: This contains information about local inter-process communication or network sockets in a Linux system.
3. Target units: This is used to provide synchronization amongst unit files during boot-up. It can also be used as a medium to extend scope by specifying their targets to other targets.
4. Device units: This unit describes devices that need exposure to systemd by udev and sysfs filesystem.
5. Mount units: This defines a mount point for attaching filesystems controlled by systemd.
6. Automount units: This provides automount capabilities.
7. Timer units: This unit (synonymous with cron) defines a timer controlled by systemd. It schedules the activation of other units.
8. Swap units: This unit describes a memory swap partition.
9. Path units: This can define a path that activates other services when files within the path are modified. 
10. Slice units: Now this is a special unit. It's used in conjunction with cgroups to group processes, daemons, services into one hierarchical tree for the management of resources.
11. Scope units: This manages externally created processes. See man 5 systemd.scope.

### How systemd manages dependencies
Earlier on, we talked about systemd starting up services required hitting a default boot goal during boot time. Imagine this default boot goal being a node at the top of a tree. So when a target is activated, all other targets below it (dependencies) are also activated.

A visual cue could be of help here.

![Figure 1. Dependency tree](/engineering-education/understanding-systemd/figure-1.png)

So it turns out that dependency management is difficult in modern Linux machines. These machines have many services that depend on each other. One service failure can solely freeze the boot process of a Linux machine.

Imagine defining a dependency from an X server to a logging service. That is, the logging service would have to start before the X server. In a situation where the logging service doesn't start, we'd be unable to get our X server running because one of its dependencies isn't running.

System V init implementations don't have dependency management issues because things are kept simple at the expense of flexibility.
systemd developers devised a method for handling dependencies in such a way that the failure of one dependency doesn't put the entire system in limbo.

There is a handful of dependency types that gives systemd the ability to flexibly manage dependencies. These "dependency types" are regarded as directives in unit files and are found with the Unit section of the unit:

- **Requires**: A unit file with a 'Requires' dependency means units within this directive must be successfully activated when an activation signal is, otherwise the current unit will fail. Dependencies with this directive are strict.

- **Wants**: This is a less strict version of Requires. The Wants dependencies are activated upon activation of the containing unit file. This unit will be activated regardless of if the Wants dependencies fail.

- **Conflicts**: Units outlined within this dependency are automatically stopped upon activation of the containing unit file.

- **Requisite**: Units within this dependency must be already active before the unit is activated, otherwise systemd fails on the activation of the unit with the dependency.

- **Before**: This dependency directive explicitly declares ordering. This is important in situations when you'd want to start a unit before another. For this instance, the current unit is activated before the unit under the Before directive.

- **After**: This dependency is also used for ordering dependency activation. It's the opposite of Before. The unit under this directive is/are activated before activation of the current unit.

- **Conditional dependencies**: This is used to evaluate a truthful or false value of units with it. The current unit won't be activated if the conditional directive evaluates to false.

### syntax of unit files
So now, we have an idea of how systemd manages dependencies. But that isn't all of it. We'd talk more about them as we attempt to understand the syntax and structure of unit files.

A unit file is divided into multiple parts know as Sections. A section has its name enclosed in square brackets ([]). Within a section are declarations of variables and their assignments to values.

Variables specified within sections are known as Directives.

NB: *howlinuxworks* notes that unit files are derived from the XDG Desktop Entry Specification (for .desktop files, which are very similar to .ini files on Microsoft systems)

### Service section
The service section contains configurations applicable only to .service unit files. 

![Figure 2: An example of a unit file (.service) with Sections and Directives](/engineering-education/understanding-systemd/figure-2.png)

Figure 2 contains three directives - [Unit], [Service] and [Install] with their respective directives.

Let's talk a bit about the directives of the Service section:
- **Type:** This defines services by their process and daemonizing behavior.
- **ExecStart**: This directive set the path and arguments of the executable command for the unit.
- **ExecStartPre:** This specifies an additional command that executes before ExecStart.
- **ExecStartPost:** This configures the path to commands that will be executed after ExecStart.
- **ExecReload:** This defines a command to reload the service file.
- **Restart:** systemd restarts the service when this point is reached. In the example above, the service is restarted on failure.
- **TimeoutSec:** This directive sets the value, systemd waits when stopping a service before marking it as failed or killing it.

### Unit section
- **Description:** This directive is used to describe the function of the unit. 
- **Documentation:** This provides information on how the unit's documentation can be accessed. The documentation can be accessed via URLs or man pages.

We talked about the remaining directives of the Unit section above. You can also recall that they're used to managing dependencies.

### Install section
This section can be used to manage dependencies as well. It is used to define the behavior of a unit when enabled or disabled without modifying any configuration file. There are two directives commonly used within this section.

![Figure 3. symbolic link of ssh.service](/engineering-education/understanding-systemd/figure-3.png)

- **WantedBy:** Figure 2 above has a WantedBy dependency in its install section. systemd usually ignores this section during its normal operation. systemd processes this section when it is enabled. The WantedBy dependency establishes a relationship between the current unit and the dependency unit without modifying the dependency unit (just like the Wants dependency of the unit section). 

Using our example, when systemd parses the WantedBy dependency, a symbolic link of the current unit (ssh.service in our case) is automatically within a folder in ***/etc/systemd/system/***. This folder is named as the WantedBy dependency with .wants appended to the end. The folder name, in this case, would be multi-user.target.wants. 

We can see the ssh.service symbolic link pointing to the target - ***/lib/systemd/system/ssh.service*** (vendor written unit files are kept in ***/lib/systemd/system/***).

ssh.service unit would be enabled before the units grouped in multi-user.target. One doesn't need to write a Wants dependency requiring ssh.service in all the unit files of multi-user.target. 

This method keeps multi-user.target clean from any form of edit because they might be overwritten in the future during an upgrade but the WantedBy dependency in ssh.service will keep the relationship.

- **RequiredBy:** This directive is similar to WantedBy but will cause the activation to fail if not met.

- **Alias:** Units can assume names defined by this directive.

### Mount section
systemd uses mount units for mount point management. This section type comes with several directives. This functionality is defined using the mount section directive.

- **What:** This directive defines the UUID of the device to be mounted.

- **Where:** This defines the UUID or absolute path of where the device should be mounted.

- **Type:** Type of filesystem to mount.

- **Options:** This defines another mount option as a comma-separated list.

The Linux man page for systemd describe other unit types in detail: ***man 5 systemd.socket, man 5 systemd.automount, man 5 systemd.device***.

### systemctl
**man 5 systemctl** describes systemctl as a tool that may be used to introspect and control the state of the "systemd" system and service manager. This is the tool used in interacting with systemd. Things like service activation, deactivation, enabling, disabling, reloading, dependencies listing etc are executed using **systemctl**.

In conjunction with its many flags, Linux machines can be flexibly managed. It's also very helpful when debugging certain services that don't function due to dependency malfunctions.

- ***systemctl status [unit]:*** shows the status of unit.

- ***sudo systemctl stop [unit]:*** deactivates a unit.

- ***sudo systemctl start [unit]:*** activates a unit.

- ***sudo systemctl disable [unit]:"*** removes the symbolic link if it has an install section.

- ***sudo systemctl enable [unit]:*** creates a symbolic link and it should be run before activating a unit otherwise it won't run the systemd the install section.

- ***systemctl list-units:*** lists all active units.

- ***sudo systemctl reload [unit]:*** reloads a particular unit when there's an edit in its configuration file.

- ***sudo systemctl restarts [unit]:*** restart the unit by stopping and starting the unit. This method causes more disruption of service unlike '*systemctl reload [unit]*' that only reloads the configuration file.

- ***sudo systemctl daemon-reload:*** reloads all unit configuration files.

Check man 5 systemctl to see more commands systemctl provides.

### Editing unit files using drop-ins
We previously discussed that systemd units can be edited directly from **/lib/systemd/system/** which is not advisable.

Unit files within **/lib/systemd/system/** can be copied to **/etc/systemd/system/**. 

Edits are made in this location because they won't be overwritten during a system upgrade (which is advisable). Also, unit files in **/etc/systemd/system/** have higher precedence for discovery than other locations.

Unit files in either of these locations can also be overwritten and extended through the use of drop-in files.

In this section, we'll write a configuration file to manage a sample application.

Install stress via "**sudo apt install stress**" and create a file service named foo.service using "**sudo vim /etc/systemd/system/foo.service**".

Define the body of this file with the following section and directives like this:

![Figure 4. foo.serviceExecStart directives defines the program for execution](/engineering-education/understanding-systemd/figure-4.png)

This creates a cgroup for foo.service using the ExecStart --CPU,--io,--vm,--vm-bytes flags to specify values for their respective cgroup subsystem.

"**sudo systemctl start foo.service**" starts the service and "**sudo systemctl status foo.service**" to view the status.

![Figure 5. foo.service current status](/engineering-education/understanding-systemd/figure-5.png)

To create a drop in file for foo.service in **/etc/systemd/system/**, create a foo.service.d directory create 00-foo.conf which is the drop-in file.

Edit 00.foo.conf to look like this:

![Figure 6. Drop-in file for foo.service](/engineering-education/understanding-systemd/figure-6.png)

When modifying ExecStart of the actual unit file in a drop-in file, make sure to define ExecStart to nothing and redefine it to a new command just like we have above.

Now, ExecStart has been successfully modified in **/etc/systemd/system/foo.service** without actually writing to it. Restart the service to see the change.

![Figure 7. Drop-in file modifying foo.service](/engineering-education/understanding-systemd/figure-7.png)

**NB: You should reload the systemd daemon before restarting.**

We can now see that the drop-in file is active and systemd was able to reflect the change on foo's service.

systemd-delta outputs the different changes made to all unit files. This is the equivalent of git diff.

Please refer to the systemd manual page for more insight on resource management using systemd and cgroups (which is outside the scope of this article).

"**sudo systemctl edit [unit]**" creates a drop-in file in **/etc/systemd/system/unit.d/override.conf** and automatically reloads the unit after editing. "**sudo systemctl revert [unit]**" reverts back to the vendor-specific version.

### Conclusion
systemd standardizes how Linux-based systems should be managed. This is different from hacks common among System V init implementations.

We've also discussed the Sys V-based issues and how systemd surmounts them. But it is only little of systemd's capabilities that I can fit in this article. Archlinux intro paragraph to their wiki on systemd says:

>systemd provides aggressive parallelization capabilities, uses socket and D-Bus activation for starting services, offers on-demand starting of daemons, keeps track of processes using Linux control groups, maintains mount and automount points, and implements an elaborate transactional dependency-based service control logic.

Like this isn't huge enough, it still goes on to say:

>systemd supports SysV and LSB init scripts and works as a replacement for sysvinit. Other parts include a logging daemon, utilities to control basic system configuration like the hostname, date, locale, maintain a list of logged-in users and running containers and virtual machines, system accounts, runtime directories and settings, and daemons to manage simple network configuration, network time synchronization, log forwarding, and name resolution.

So to experience and use the power of systemd to its full glory, I'd advise you to study further. Links to resources and materials referenced in this can be found below.

### Quick Fact
systemd was developed by Lennart Poeterring and Kay Sievers - software engineers working for Red Hat. 

The migration from traditional init based systems to systemd is probably the most fiercely debated topics in Linux's history. 

For arguments for and against systemd, it would be interesting if you visit the biggest myths and without-systemd.

### References
- [Archlinux systemd wiki](https://wiki.archlinux.org/index.php/Systemd#Editing_provided_units)

- [Wikipedia systemd](https://en.wikipedia.org/wiki/Systemd)

- [Understanding Systemd Units and Unit Files | DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files#anatomy-of-a-unit-file)

- [UNIX and Linux System Administratior Handbook](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554)

- [How Linux Works](https://www.amazon.com/How-Linux-Works-2nd-Superuser/dp/1593275676)

- [systemd.service(5) - Linux manual page](https://man7.org/linux/man-pages/man5/systemd.service.5.html)

- [cgroups(7) - Linux manual page](https://man7.org/linux/man-pages/man7/cgroups.7.html)

- [Learn Linux, 101: Runlevels, boot targets, shutdown, and reboot](https://developer.ibm.com/technologies/linux/tutorials/l-lpic1-101-3/)

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
