## Why You Shouldn't Use WEP Encryption
There are many encryption standards in the world today, many of which have been shown to have fatal flaws. Unfortunately, many standards that are considered insecure are still being used in sensative applications. One such standard is WEP, so what is it and why is it bad to use?

### What is WEP
Wired Equivalent Privacy (WEP) is a security algorithm for wireless networks. It was introduced as a part of the original 802.11 standard that was ratified in 1997. Since this standard was an early-day solution its goal was to prevent Man-in-the-Middle attacks, which it did for a time. 

WEP encrypts all traffic using a 64 or 128 bit key in hexadecimal. This is a static key which means all traffic, no matter the device, is encrypted using the single key. This was good for a while, until the computing power in everyday computers grew with the improvements in IPC and clock speeds of processors. At this point, the standard was considered insecure and deprecated.

The standard was superseded by Wi-Fi Protected Access in 2003, with WPA2 the following year. The IEEE declared in 2004 that both WEP-40 and WEP-104, "have been deprecated as they fail to meet their security goals". Despite this, WEP is still used, even in high end wireless routers such as the ASUS ROG Rapture AX11000 Tri-Band Wi-Fi 6 Router.

### Why Is It Bad to Use
This is reminiscent of high school, when the STEM Lab teacher setup a few computers with Kali Linux installed. He also created a WEP WiFi access point for the students. This was so that the students could learn how to use Fern Wifi Cracker and similar sotware to creack the insecure WEP access point and see how much hard WPA/WPA2-PSK access points were to crack. The WEP attack took maybe 5 minutes and was able to get into the network (ran by high schoolers), however the WPA attacks required the use of a dictionary and never found the password to the network. 

[Guiding Tech](https://www.guidingtech.com/9304/why-you-should-never-use-wep-to-protect-home-wi-fi/) points out that, "The hole in wall lies in the way WEP encrypts the packets with a static encryption key. The key does not change with every packet that is transmitted, so a hacker can listen in and with patience gather enough packets to decipher the encryption key." Remember, WEP actually uses an encryption key of either 64 or 128 bits, using only hexadecimal characters (0-9, A-F). This length of a key is not very secure with the amount of computing power that people have in their pockets. 

WEP is not a good encryption standard, however it is better than no security. It encrypted all traffic to and from the access point using a static key that was its downfall. This downfall can now be exploited by common, everyday computers. It is now recommended to use at least WPA, but how much long until that can be cracked by everyday computers?
