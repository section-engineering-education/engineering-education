---
layout: engineering-education
status: publish
published: true
url: /minecraft-plugin-development-a-hands-on-crash-course/
title: Minecraft Plugin Development - A Hands-On Crash Course
description: This will be an interactive tutorial on the basics of coding our own Minecraft plugins.
author: john-amiscaray
date: 2020-12-06T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/minecraft-plugin-development-a-hands-on-crash-course/hero.png
    alt: Java Minecraft Plugin image

---
If you have ever watched the popular Minecraft YouTuber Dream, you have noticed that many of his videos feature Minecraft challenges. In these challenges, he and his friends attempt to beat the game under odd circumstances. These may include crazy events like raids or swarms of bees spawning frequently. This is all made possible using Minecraft server plugins.
<!--more-->

### Introduction:
A plugin is extra code you add to your Minecraft server to change the default behavior of the game. In this tutorial, we will go over the basics of coding our own plugins. I am a believer that learning should be enjoyable, so that is the approach I will take. To do this, we will be learning through action, creating plugins you can have fun with.

### Prerequisites:
For this tutorial, I will assume that you have Minecraft Java Edition installed. 

I also expect you to have a local server set up for testing. 

I have decided to skip over setting up a server so we can get straight into coding. 

If you have not set up a server, you can find the instructions [here](https://minecraft.gamepedia.com/Tutorials/Setting_up_a_Spigot_server). 

You should go into this tutorial with some knowledge of Java programming. 

Ideally, you should have a solid practical understanding of object-orientated programming. 

I suspect that some of you may have little to no programming experience and are reading out of curiosity. In which case it is still fine to read this tutorial. 

I intend this to add value for beginners to inspire them to get into recreational coding. Then they can come back to this tutorial after honing their skills enough to follow along. 

For the more experienced developer, you will learn the foundations needed to code your own plugins. 

As a final prerequisite, I recommend you to fork a copy of this [repository](https://github.com/john-amiscaray/Minecraft-Plugin-Development-A-Hands-On-Crash-Course). It contains resources to go along with this article and provides extra information. The resources include the project setup, the final code, and solutions to homework I will give later on.


### Project structure and setup:
Before we begin, it's necessary to learn how to set up our project. For this tutorial, we'll be using a tool for Java projects called Maven. If you have never used Maven before, it is a tool we will use to download some external code we need. 

Our project will contain a file called “pom.xml” that will tell Maven to download this code. 

To install Maven on your computer, you can find the instructions [here](https://www.baeldung.com/install-maven-on-windows-linux-mac). 

To make the project set up easier, I recommend using the Intellij IDE. Intellij has a plugin you can use to generate the project structure with minimal effort. 

To install it, go to file > settings > plugins, and search for “Minecraft Development”. 

Once installed, go to File > New > Project... > Minecraft > Spigot Plugin. 

From there, you have to choose your group ID and artifact ID. In case you don’t know, the artifact ID is the name of your Plugin, whereas the group ID is a unique ID to say you created it. The group ID is also used to identify projects of similar artifact IDs. 

It usually takes the form of a reverse domain (ex. com.google), so if you have your own website use it as the group ID. Otherwise, you can use something like me.firstname.lastname, or me.minecraftusername. 

Make sure to separate words by periods, and that they are all lowercase. 

From here, the rest of the process is straightforward. 

The IDE then asks you for optional settings like a project description. 

Finally, it will ask what to call the root folder and where to put it. In case you wish to use another IDE, refer to the repository linked above to find the basic setup. 

The repository will also contain extra info about the setup you may be interested in. In the end, you should have a project structure like this:

![basic setup](/engineering-education/minecraft-plugin-development-a-hands-on-crash-course/plugin-setup.png)

All this, except for the `.idea` folder and `(project name).iml` file, are the essential elements we need to get started. For this guide, you can disregard any other folders or files. 

Within the main package (in this case: src>main>java>me>john>amiscaray>minecraftplugindevelopmenttutorialfinalcode), you should have a single Java file. 

That Java file, which is named the same as the artifact ID, should have the following basic structure:

![plugin main class](/engineering-education/minecraft-plugin-development-a-hands-on-crash-course/plugin-main-class.png)

That file will be the main entry point of our plugin where all the magic starts. For that reason, I will be referring to it as our plugin's main class.

One other important file to talk about is the `plugin.yml` file. This file has the basic information about our plugin needed for it to run.

### Coding our first minecraft challenge:
Now that we got everything set up, this is where the fun begins. We will begin by trying to code our plugin to make stepping on grass blocks trigger explosions. 

This idea was inspired by [this Minecraft video](https://www.youtube.com/watch?v=zzO50cQgXug). Thinking about this feature, we would need to detect which block a player steps on whenever they move. To pull this off, we need to wait for the player to move and execute code to check which block they are on. 

We can do this using the help of what is called *listeners*, that listen for in-game events. To start, we will create a new Java class called `PlayerMovementListener`.

Next, we need to set up the class to listen for and react to events. To do so, we make the class implement the `Listener` interface from the org.bukkit.event package. 

Maven added this package into our project that contains code we need to build our plugin. Now that we defined our class as a listener, we need to create a method that it will call whenever a player moves. 

This method will be a public void method called `onPlayerMove`. As an argument, it will accept a `PlayerMoveEvent` object. 

Whenever the player moves, our class will receive this object and use it to call our method. To ensure our plugin uses the method as a response to a Player moving, we add the annotation `@EventHandler`. 

Right now, our code should look exactly like this:

```java
package me.john.amiscaray.minecraftplugindevelopmenttutorialfinalcode.eventlisteners;

import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerMoveEvent;

public class PlayerMovementListener implements Listener {

    @EventHandler
    public void onPlayerMove(PlayerMoveEvent event){
    
    }
    
}
```

As easy as that, we set up a simple class to listen to the player’s movement. Now we need to be able to examine the block the player is standing on and act accordingly. Within the event object our method accepts, we can find all the information we need to code the behavior we want:
    
```java
@EventHandler
public void onPlayerMove(PlayerMoveEvent event){
    
    // Get the player that just moved
    Player p = event.getPlayer();
     
    // Get the Block right below the player
    Block b = p.getLocation().getBlock().getRelative(BlockFace.DOWN);
    
}
``` 

From here, we detect the block that the player is standing on. If the block is a grass block, we will trigger an explosion:
   
```java
@EventHandler
public void onPlayerMove(PlayerMoveEvent event){
    
    // Get the player that just moved
    Player p = event.getPlayer();
    
    // Get the Block right below the player
    Block b = p.getLocation().getBlock().getRelative(BlockFace.DOWN);
    
    // Create an explosion of power 5 on the player's location
    if (b.getType() == Material.GRASS_BLOCK){
    
        World w = p.getWorld();
        w.createExplosion(p.getLocation(), 5);
    
    }

}
```

As a final important step, we need to make sure we register this class to listen for events. Just because we created this class as a `Listener`, doesn’t mean the server will know to use it. We achieve this by adding this line of code to the `onEnable` method of our plugin’s main class:

```java
getServer().getPluginManager().registerEvents(new PlayerMovementListener(), this);
```

Each time we create a new `Listener` we have to make sure we add this line to the `onEnable` method.

There we go, we have created a fun challenge you can play for yourself. The fact that we can create something this cool with little code shows the scale of what we can do. 

To try it out, you need to package the plugin into a jar file and place it in the `plugins` folder of your server. 

To package it into a jar file open up your command terminal in the root directory of the project. From here, run the command `mvn package` that will build a few jar files. 

The one we are looking for should be called `(Artifact id)-(version).jar`.

### Amping up our challenge:
As if this wasn’t difficult enough, our players want something more to challenge them. Let’s amp this up by making the mobs pack a bit more punch. 

To do so, we will create and register a `Listener` with the following method:

```java
@EventHandler
public void onMobSpawn(CreatureSpawnEvent event){

    LivingEntity entity = event.getEntity();

    if(entity instanceof Monster){

        // Give the Monster full diamond armor.
        entity.getEquipment().setBoots(new ItemStack(Material.DIAMOND_BOOTS));
        entity.getEquipment().setChestplate(new ItemStack(Material.DIAMOND_CHESTPLATE));
        entity.getEquipment().setHelmet(new ItemStack(Material.DIAMOND_HELMET));
        entity.getEquipment().setLeggings(new ItemStack(Material.DIAMOND_LEGGINGS));
        if(entity.getType() == EntityType.SKELETON){

            // Create an enchanted bow and give it to the skeleton.
            ItemStack bow = new ItemStack(Material.BOW);
            bow.addEnchantment(Enchantment.ARROW_DAMAGE, 4);
            entity.getEquipment().setItemInMainHand(bow);

        }

        if (entity.getType() == EntityType.CREEPER){

            entity.setInvisible(true);

        }


    }
}
```

With that, we gave hostile mobs full diamond armor, made creepers invisible, and gave skeletons power 4 bows. If that isn’t a challenge I don’t know what is.

### Writing our first commands:
As fun as it is, let’s take a break from bullying the users of our plugin. Let’s make them a semi-useful command. If you’ve ever found an interesting location, you may have created a cobblestone tower to mark it. 

Sure you could write down the coordinates, but this presents us an opportunity to learn block manipulation.

First, we need to make sure to define the command we can create. We create the definition of our command in the `plugin.yml` file:

```YAML
# defining our commands.
commands:
  # create a new command called mark-location.
  mark-location:
    description: create a 50 block tall cobblestone tower to mark a location
    # show to the player how they should call the command. You would also show arguments here.
    usage: /<command>
    # create other names we can call the command by.
    aliases: [mark, tower]
```

Next, we need to create a class that will execute the command whenever it’s called. This class must implement the `CommandExecutor` interface of the org.bukkit.command package. This forces us to implement the `onCommand` method of that interface. 

Whenever someone calls the command, our plugin will call this method as a response.

```java
package me.john.amiscaray.minecraftplugindevelopmenttutorialfinalcode.commandexecutors;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

public class TowerCommandExecutor implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

        return false;

    }

}
```

This `onCommand` method returns a boolean indicating whether the execution was successful. If unsuccessful, the game will send the user the value of our usage property. 

Now we need to generate the cobblestone tower next to the player that called the command. One thing to note is that *commands aren't always called by players*. 

The server owner can call commands from their command line while not being in the game. This forces us to check if the command sender is a player. 

To do this, we would do the following command:

```java
@Override
public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

    if(sender instanceof Player){

        Player p = (Player) sender;

        // Get the location 2 blocks in the x-axis next to the player
        Location origin = p.getLocation().add(2,0,0);

        // Set 50 blocks on the y-axis of the location to cobblestone
        for(int i = 0; i < 50; i++){

            origin.getBlock().setType(Material.COBBLESTONE);
            origin.add(0,1,0);

        }

        // Send the player a message about what just occurred
        p.sendMessage("Successfully added marker at your location");

        return true;

    }else{

        // Print to the command line that you need to be a player to execute this command
        System.out.println("Cannot execute this command on the command line");

        return false;

    }

}
```

As a final step, we need to register this CommandExecutor in the `onEnable` method. This ensures the game associates the defined command with our CommandExecutor. 

To do so, add the following line of code:

```java
getServer().getPluginCommand("mark-location").setExecutor(new TowerCommandExecutor());
```

### Our final project:
As a fun final project, let’s create a command to bully people on our server. We will be creating a command called `continuous-wither-spawn`. When called this would spawn withers on a set interval and location. Earlier in this guide, we worked with creating responses to events. 

We will now learn to cause things to happen on our own without it being a response. To make this happen, we will learn how to create and use a class of type `BukkitRunnable`.

Before we begin, we need to give a more detailed description of the feature we are adding. We need our command to spawn withers on a set interval at the world spawn point. 

To do this, we need to be able to get an object representing the world so we may add the withers to it. We can get the world the players are in by using its name. 

For the sake of our code’s maintainability, I will be setting the world name as a *configuration variable*. 

This allows us to access it throughout the code without us hard coding it every time. As an added benefit, the server owner can change the configuration variables anytime. 

If the server owner wants to change the name of their world, our plugin won’t break. The server owner can update the configuration variable to change the world name used in our code. 

Plus, this allows anyone to use our plugin on any Minecraft world. 

To do this, we add the following `config.yml` file in the same directory as our `plugin.yml` file:

```YAML
world-name: (your-world-name)
```

Afterward, add the following to the `onEnable` method of your main class:

```java
saveDefaultConfig();
```

This creates a copy of the `config.yml` file and the server admin can access outside of the plugin’s jar file. This would then allow them to change the properties even when the plugin is packaged in a jar.

Now that we got that out of the way, let’s begin. 

As we did earlier, first we need to define our command in the `plugin.yml` file. 

Next, we have to create our CommandExecutor and register it. 

From here, we have to create a class of type BukkitRunnable that will allow us to have timed events:

```java
package me.john.amiscaray.minecraftplugindevelopmenttutorialfinalcode.runnables;

import org.bukkit.World;
import org.bukkit.entity.EntityType;
import org.bukkit.plugin.Plugin;
import org.bukkit.scheduler.BukkitRunnable;

public class WitherSpawnRunnable extends BukkitRunnable {

    private final Plugin plugin;

    public WitherSpawnRunnable(Plugin plugin) {

        // Get the main class that extends JavaPlugin so we can access config variables.
        this.plugin = plugin;

    }

    @Override
    public void run() {

        // Get the world the players are in.
        String name = plugin.getConfig().getString("world-name");
        World w = plugin.getServer().getWorld(name);

        // Spawn a wither at the world spawn location
        w.spawnEntity(w.getSpawnLocation(), EntityType.WITHER);

    }

}
```

Our CommandExecutor will use an instance of this class and call the run method on a given interval:

```java
@Override
public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

    // If the user gave the correct number of arguments (2 arguments, initial delay, spawn delay)
    if(args.length == 2){

        // Get the initial delay and delay between spawns from the arguments. Must cast them to be Longs.
        Long initialDelay = Long.parseLong(args[0]);
        Long spawnDelay = Long.parseLong(args[1]);

        // Run the BukkitRunnable with the above timing
        new WitherSpawnRunnable(plugin).runTaskTimer(plugin, initialDelay, spawnDelay);
        return true;

    }
    return false;

}
```

First we check if the user gave the right amount of arguments. If they didn't, we will not execute this command. Otherwise, we will start spawning Withers with the given delays. 

Note, *the delays given are in Minecraft ticks*; these are around 0.05 seconds.

As simple as that, we have created our command. You can try it by typing in the chat of your server: `/continuous-wither-spawn 0 100`.This should spawn a wither instantly, then spawn another every 5 seconds.

### Conclusion:
In this tutorial, you have gained a foundational understanding on how of to code Minecraft plugins. I obviously could not cover everything in this tutorial and left some parts out. Some next steps are to research command permissions and to just play around. 

In fact, I have learned most of this by experimenting and having fun. I would encourage you to think of cool things you want to build and try to build them, with some help from the [documentation](https://hub.spigotmc.org/javadocs/spigot/index.html) of course. To help you out I have some homework for you to test your understanding and to keep learning. 

First, I want you to improve the wither spawn command. Make it so that the user has the option to spawn withers at a location they choose. Then make a command that allows them to stop the withers from spawning. 

Lastly, try to make a plugin that will detect if emeralds are in a loaded chunk. If so, add some visual signs of it in the world. You can find my solutions to these challenges in the repository. 

My solutions may not be perfect so if you find a better solution, feel free to send a pull request. Happy coding!

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
