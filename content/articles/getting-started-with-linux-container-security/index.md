---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-linux-container-security/
title: Basics of Linux Container Security
description: This article informs you of the different processes and features involved in promoting Linux container security. It also guides you on how to enhance LXC container security.
author: mauline-mwaniki
date: 2021-03-15T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/getting-started-with-linux-container-security/hero.png
    alt: Linux container security
---
Linux containers, commonly referred to as LXC, are virtualization methods used to run multiple containers using a single Linux kernel through a control host. Linux containers allow users to create or manage applications and systems as well. This is because of the containers’ use of simple tools and having a well-built API.
<!--more-->
### Features of the Linux kernel
- Kernel namespaces allow different resources to use the same name. The common namespace enables resources from multiple sources to exit at the same time. Examples of namespaces include; `user`, `pid`, `network`, and `mount`.

- Chroots acts as a virtual machine in LXC. It is a better option than installing a virtual box since it does not need an additional kernel installed. It also does not require a hypervisor for installation and configuration of Apparmor that limits resources that a program can access.

- SELinux/AppArmor profiles allow administrators to control who accesses the system.

- Seccomp policies limit access to one's application. The container—Seccomp's functions restrict which syscalls a process can call to decrease the attack surface on the kernel.

- CGroups allow prioritization and restriction of resources.

- Kernel capabilities prevent untrusted users from running any processes in the root container. 

### Guide on how to deploy container security
LXC containers occur in two entities; privileged containers and unprivileged containers.

- Privileged containers are old-style containers used only when unprivileged containers aren't accessible and when one trusts the container user with the root access to the host. Privileged containers are not safe. In these containers, the container's `uid 0` is mapped to the host `uid 0`. Therefore, the host might experience accidental damages such as; reconfiguration of host hardware, reconfiguration of the host kernel, or accessibility of the host filesystem. Mandatory Access Control (AppArmor, SELinux), dropping of capabilities, namespaces, and seccomp filters are employed to protect the host.

- Unprivileged containers occur in the `LXC 1.0` and require a kernel version `3.13` or higher. They are considered safe as the container `uid 0`is mapped to an unprivileged user outside of the container with extra rights only on resources that it owns itself. Unpriviledged containers only use different capabilities, such as - AppArmor, SELinux, and Seccomp to boost security.

Unprivileged containers only work when `LXC` communicates with three parts of `setuid` codes: 
1. lxc-user-nic: This is a setuid root command; unprivileged containers use this command to create network interfaces used by lxc containers.

2. newuidmap: It sets the `uid` mapping for a user namespace by verifying that the caller owns the process set by `pid`, `uid`, `lower uid`, and `count`. `newuidmap` is only invoked once per process.

3. newgidmap: This sets the `gid` mapping for a user `namespace` by verifying if a caller is allowed to use the process provided by `PID`, `gid`, `lowergid`, and `count`. newgidmap is only used once per process. Other processes depend on a `uid` which is owned by the user.

Consequently, most security concerns in those containers apply to any random unprivileged user, and these issues are regarded as a generic kernel security bug rather than an LXC issue.

> Note that LXC does not stop [denial of service attacks](/denial-of-service/) automatically. Hence one needs to follow specific security protocols when running several untrusted containers or using untrusted users when operating the containers. 

Some of the security measures to consider may include:
- Cgroup limits - The limits in LXC come from its parent. In cases where limits have not been made regarding what resources, memory, and time one container can use, it can easily lead to a DoS attack on the host. To resolve the problem, appropriate lxc.cgroup configurations entries (memory, CPU, and pids) or settings are made. During authentication, parent users should be assigned the correct configured cgroups. 

- User limits - Cgroups inherit the limits given to the individual parents. This means that unprivileged containers cannot have higher ulimits than the parent. However, ulimits are tangled with a uid at the kernel level, a global kernel uid, and not a uid for a specific user namespace. The link of ulimits to kernel uid implies that if two containers share one kernel uid, then they have the same limits. Therefore, a user of one container can launch denial of service attacks against other clients. To prevent DoS attacks, different untrusted users and containers should have separate id maps.

- Shared network bridges - In LXC, users have access to `level 2` connectivity and one default bridge for the containers. The containers perform both `IP` and `MAC` spoofing on the bridge. LXC containers also transmit level 2 traffic. Hence, if one is operating untrusted containers or untrusted users are using the containers, each user/container should have an individual bridge. Users should, therefore, only have access to a specific bridge.

- Securing IPv6 Router Advertisements acceptance - IPv6 router advertisements are used for routing and auto-configurations. As LXC containers only use IPv4 addresses, there is a likelihood of containers changing the LXC host's IPv6 routing table through IPv6 router advertisements. For security purposes, it is necessary to configure the networking device manually instead of relying on automatic configuration, which might expose the system to different threats.

Follow the following procedure for configuration:
- Run the # grep [01]
/proc/sys/net/ipv6/conf/*/accept_ra|egrep "default|all" This command ensures that no router advertisements are accepted by the host unless crucial.

- Configuring the host system to deny IPv6 router advertisements.

Open the /etc/sysctl.conf file.

If values are not set to 0; set the value to 0. By configuring and adding the following entries.

`
net.ipv6.conf.all.accept_ra=0 
net.ipv6.conf.default.accept_ra=0 
`

Save the changes and close the file.

Run # sysctl -p to apply the configuration.


In the event of security issues, one can report them through:

- Email at serge.hallyn@ubuntu.com / stgraber@ubuntu.com / christian.brauner@ubuntu.com

- https://launchpad.net/ubuntu/+source/lxc/+filebug - automatic!


### Conclusion
Linux Containers can help improve system security. The two types of LXC containers are privileged containers and unprivileged containers. Privileged containers are insecure and require kernel features for security. 

On the other hand, unprivileged containers are safer and use kernel features for an extra layer of security. I would highly recommend the use of LXC unprivileged containers.

### References
- [Linux containers](https://linuxcontainers.org/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)