# Advantages: Containers vs. VMs

Both Virtual Machines (VMs) and containers are used to increase the productivity of the development life cycle. For containers specifically, 451 Research did a study([https://451research.com/images/Marketing/press_releases/Application-container-market-will-reach-2-7bn-in-2020_final_graphic.pdf](https://451research.com/images/Marketing/press_releases/Application-container-market-will-reach-2-7bn-in-2020_final_graphic.pdf) ) outlining that containers will be at a $2.7 billion market value in 2020. Containers and VMs are software instances that differ in size, resources, and use cases. While everyone loves a classic rivalry, VMs and containers don't offer this dichotomy but rather compliment each other. Rather than explaining the history and specific use cases, I am going to outline their advantages and disadvantages to better help someone find a fit for their purposes. 

### Advantages of VMs over Containers:

- Virtual Machines offer more computing resources
    - While containers use the same operating system kernel for every instance, a virtual machine uses the full bandwidth of the operating system, rather than dividing resources among each instance. This allows for each instance in a virtual machine to have the full armory of the physical resources provided by the hardware.
- Stability and Security
    - With a longer average lifetime compared to a container, a virtual machine can provide more productivity due to its ability to complete multiple tasks during the lifetime of the instance.
    - A virtual machine is adjacently isolated to its neighboring servers, this provides increased security as if one instance is compromised, this doesn't directly effect the integrity of the other neighboring instances.
- Management and Seniority
    - While containers seem to be the new kids on the block, Virtual Machines have roots as early as the 1960's with partitioning. This has allowed for the optimization of VMs over containers in the recent past.
    - The development of VMs has allowed for more automation of load balancing and optimized resource allocation compared to container systems. This has heavily influenced the appeal for movement to virtual machines over container systems. For example, if a VM crashes, the server creates a new instance and migrates resources to this new instance, rather in a container, an operator would have to manually reallocate resources and instances.

### Advantages of Containers over VMs:

- Lightweight and Portability
    - Containers only utilize what is needed to run the environment required, this allows containers to be mobile and quick in regards to different operating use cases.
- Compartmentalization
    - The nature of containers allows the development process the ability to isolate tasks thus increasing modularity. With increased modularity, finding potential crashes or bottlenecks within the operating system or source code is easily found.
- Startup Time
    - Given the lightweight nature of containers, the boot up time for a container is only a fraction of what a VM is. This allows for agile development and allows for distributed applications to be more efficient given the swarm like nature of container systems.

If you are trying to consider which virtual instance is for you, there are two schools of thought to consider, while VMs are a large, bulky, and secure option, containers provide a mobile, agile, and lightweight appeal. While the focus of this article is the advantages, their are many supplemental solutions that compliment the downfalls of each instance.
