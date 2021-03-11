# Getting Started With Linux Containers Security

### Overview of containers
Linux containers, commonly referred to as LXC, are operating systems used to run multiple containers together using a single Linux kernel through a control host. In containers, users can create and manage application containers and systems easily as the API that is sturdy and uses tools that are easy to use.

### Features offered by the Linux kernel;
Kernel namespaces that allow different resources to use the same name. The use of a common namespace allows resources from multiple sources to exit at the same time examples of namespaces include; user ID, names, network, mount.
Chroots acts as a virtual machine in LXC. It is a better option than installing a virtual box as it does not need an additional kernel installed. It uses the existing one and does not require a hypervisor for installation and configuration Apparmor that limits resources that a program can access.
SELinux/ AppArmor profiles that allow administrators to control who accesses the system.
Seccomp policies limit access to one's application and the functions to be carried out by the container—Seccomp restricts which syscalls a process can call to decrease the attack surface on the kernel.
CGroups which allow prioritization and restriction of resources
Kernel capabilities that work to prevent untrusted users from running any process in the root container. 

### Guide on how to deploy container security
LXC containers occur in two entities; privileged containers and unprivileged containers.
Privileged containers are old-style containers used only when unprivileged containers aren't accessible and when one trusts the container user with the root access to the host. Privileged containers are not safe. In these containers, the container uid 0 is mapped to the host uid 0. The host might experience accidental damages such as; reconfiguration of host hardware, reconfiguration of the host kernel, or accessibility of the host filesystem. Namespaces, Mandatory Access Control (AppArmor, SELinux), dropping of capabilities, and seccomp filters technologies are employed to protect the host.

Unprivileged containers occur in the LXC 1.0 and require a kernel version 3.13 or higher. They are considered safe as the container uid 0 is mapped to an unprivileged user outside of the container with extra rights only on resources that it owns itself. To prevent kernel security problems, containers deploy capabilities, AppArmor, SELinux, and Seccomp, making the containers more secure.

Unprivileged containers work only when LXC communicates with three-set user ID "setuid codes: 
lxc-user-nic; this is a setuid root command; unprivileged containers use the command to create network interfaces used by lxc containers.
newuidmap: it sets the uid mapping for a user namespace by verifying that the caller owns the process set by pid, uid, lower uid, and count. newuidmap is only used once per process.
newgidmap; it sets the gid mapping for a user namespace by verifying if a caller is allowed to use the process provided by PID, gid, lowergid, and count. newgidmap is only used once per process.
The rest processes run as uid owned by the user.

Consequently, most security concerns in those containers apply to any random unprivileged user, and hence they are regarded as a generic kernel security bug rather than an LXC issue.
LXC does not stop denial of service attacks automatically. Hence one needs to follow specific security protocols when running several untrusted containers or using untrusted users to operate the containers. Some of the security measures to take include;


Cgroup limits
The limits in LXC come from its parent. In cases where limits have not been made regarding what resources, memory, and time one container can use, it can easily lead to a DoS attack on the host. To resolve the problem, appropriate lxc.cgroup configurations entries (memory, CPU, and pids)settings are made. During login time, parent users should be assigned the correct configured cgroups. 
User limits
Cgroups inherit the limits given to the individual parents. This means that unprivileged containers cannot have higher ulimits than the parent. However, ulimits are tangled with a uid at the kernel level, a global kernel uid, and not a uid for a specific user namespace. The link of ulimits to kernel uid implies that if two containers share one kernel uid, they share the same limits, and hence a user of one container can DoS, the same user from another container. To prevent DoS attacks, different untrusted users and containers should have separate id maps.

Shared network bridges
In LXC, users have access to level 2 connectivity and one default bridge for the containers. The containers perform both IP spoofing or MAC spoofing on the bridge. Also, LXC containers transmit level 2 traffic. Hence, if one is operating untrusted containers or untrusted users are using containers, each user/container should have an individual bridge. They should only have access to the given bridge.

Securing IPv6 Router Advertisements acceptance
IPv6 router advertisements are used for routing and auto-configurations. As LXC containers only use IPv4 addresses, there is a likelihood of containers changing the LXC host's IPv6 routing table through IPv6 router advertisements. For security purpose, it is necessary to configure the networking device manually instead of relying on automatic configuration, which might cause unauthenticity threats.
Follow the following procedure for configuration:
1. Run the # grep [01]
/proc/sys/net/ipv6/conf/*/accept_ra|egrep "default|all" This command ensures that no router advertisements are accepted by the host unless crucial.
2. Configuring the host system to deny IPv6 router advertisements.
Open the /etc/sysctl.conf file.
If values are not set to 0;  Set the value to 0. By configuring and adding the following entries.
 net.ipv6.conf.all.accept_ra=0 
net.ipv6.conf.default.accept_ra=0 
Save the changes and close the file.
Run # sysctl -p to apply the configuration.


Reporting security issues
In the event of security issues, one can report them through;
	*Email to serge.hallyn@ubuntu.com / stgraber@ubuntu.com / christian.brauner@ubuntu.com
	*https://launchpad.net/ubuntu/+source/lxc/+filebug - automatic!


References 
For full documentation on Linux containers, visit; https://linuxcontainers.org/ - automatic!



