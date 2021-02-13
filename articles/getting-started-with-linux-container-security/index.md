# Getting Started With Linux Containers Security

### Overview of containers
Linux containers, commonly referred to as LXC, are operating systems used to run multiple containers together using a single Linux kernel through a control host. A powerful API and simple tools enable users to create and manage application containers and systems easily.

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

Unprivileged containers occur in the LXC 1.0 and require a kernel version 3.13 or higher. They are considered safe as the container uid 0 is mapped to an unprivileged user outside of the container with extra rights only on resources that it owns itself. The containers also use SELinux, AppArmor, Seccomp, and capabilities for an extra layer of security to cation occurrence of a kernel security problem.
For unprivileged containers to work, LXC interacts with three pieces of setuid code:
lxc-user-nic (setuid helper to create a veth pair and bridge it on the host)
newuidmap (from the shadow package, sets up a uid map)
newgidmap (from the shadow package, sets up a gid map)
Everything else runs as a uid, which your user owns or as your own user.

Consequently, most security concerns in those containers apply to any random unprivileged user, and hence they are regarded as a generic kernel security bug rather than an LXC issue.
LXC does not stop DoS attacks by default. Hence one needs to follow certain security protocols when running several untrusted containers or using untrusted users to operate the containers. Some of the security measures to take include;

Cgroup limits
The limits in LXC come from its parent. In cases where limits have not been made regarding what resources, memory, and time one container can use, it can easily lead to a DoS attack on the host. To resolve the problem, appropriate lxc.cgroup configurations entries (memory, CPU, and pids)settings are made. It is also necessary to ensure that the parent user is allocated the appropriate configured cgroups at login time.
User limits
Cgroups inherit the limits given to the individual parents. This means that unprivileged containers cannot have higher ulimits than the parent. However, ulimits are tangled with a uid at the kernel level, a global kernel uid, and not a uid for a specific user namespace. The link of ulimits to kernel uid implies that if two containers share one kernel uid, they share the same limits, and hence a user of one container can DoS, the same user from another container. To prevent DoS attacks, different untrusted users and containers should have separate id maps.

Shared network bridges
In LXC, users have access to level 2 connectivity and one default bridge for the containers. The containers can transmit any level 2 traffic and can perform MAC or IP spoofing on the bridge. Hence in case one is operating untrusted containers, or when untrusted containers are operating containers, each user/container should have an individual bridge, and they should only have access to the given bridge.

Securing IPv6 Router Advertisements acceptance
The default LXC bridge is configured with IPv4 addresses only. This gives rise to the likelihood of containers changing the LXC host's IPv6 routing table through IPv6 router advertisements. 
The value of */proc/sys/net/ipv6/conf/default/accept_ra* is applied to the *lxcbr0* interface. If the value is greater than 0, the LXC host accepts router advertisements from the containers connected to the bridge, which can be potentially malicious.
To prevent the host from accepting advertisements, one can;
	*Configure IPv6 addresses on the default bridge by setting the *LXC_IPV6_** variables in */etc/default/lxc-net* (this will enable */proc/sys/net/ipv6/conf/lxcbr0/*forwarding which causes */proc/sys/net/ipv6/conf/lxcbr0/accept_ra* to be effectively disabled if the value is 1). 
	*Set the */proc/sys/net/ipv6/conf/default/accept_ra* setting to 0 so that when lxcbr0 is created its *accept_ra* is disabled. However, in cases where one relies on router advertisements from the external network and uses IPv6 on the LXC host, you should ensure that *accept_ra* is enabled for the external interface to avoid losing connectivity.

Reporting security issues
In the event of security issues, one can report them through;
	*Email to serge.hallyn@ubuntu.com / stgraber@ubuntu.com / christian.brauner@ubuntu.com
	*Opening a private security bug at https://launchpad.net/ubuntu/+source/lxc/+filebug - automatic!


References 
For full documentation on Linux containers, visit; https://linuxcontainers.org/ - automatic!



