---
layout: engineering-education
status: publish
published: true
url: /http3-vs-http2/
title: Comparison between the HTTP/3 and HTTP/2 Protocols
description: This tutorial will go over the basics of HTTP/1, HTTP/2, and HTTP/3. We will go over how each are different, by understanding their limitations and advantages.
author: bradley-biketi
date: 2021-07-05T00:00:00-15:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/http3-vs-http2/hero.jpg
    alt: Comparison between the HTTP/3 and HTTP/2 Protocols example image
---
HTTP stands for HyperText Transfer Protocol. It has been the de facto way of information transfer on the World Wide Web. While version 1.1 is still the most widely implemented protocol, it has its limitations. Therefore, newer versions had to be implemented to address this. 
<!--more-->
As of now, the two major releases have been HTTP/2 and HTTP/3 (most recent version). In this article, we will briefly describe how these two HTTP protocols are implemented, the features, similarities, and differences between them.

### Prerequisites
This article discusses a high-level implementation of the recently released HTTP versions. Therefore, an understanding of the [history of HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) and its concepts is highly valuable.

### The HTTP/2 Protocol
HTTP/2 is based on Google's [SPDY protocol](https://en.wikipedia.org/wiki/SPDY) which came out in 2015. It was introduced to resolve the rising performance-related issues of the HTTP/1.1.

The HTTP/1.1 was known to have a slow response time and therefore, as the expectations and usage of the internet grew, a need to decrease latency and improve page load speeds were essential.

HTTP/2 modifies the data formatting, binary frame layer, and how the data is transported in the client-server architecture, while still abstracting the modification complexity for the existing applications.

It is worth mentioning that the versions of HTTP/1.x do not efficiently utilize traffic by compressing the request and response headers. Furthermore, the HTTP/1.1 protocol is known to be ineffective in resource prioritization, hence the underlying [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) connection is poorly utilized.

This is what HTTP/2 protocol was designed to address by introducing the following features:

#### Header compression
The HTTP/1.1 is a textual protocol which means that the requests and responses were transmitted as a plain text.

To reduce the amount of data, HTTP/2 introduced header compression that uses a binary framing layer to create a stream for communication. During the time of interaction, the TCP connection remains open and the binary format for request and response headers enhances the overall performance.

#### Multiplexing
Unlike HTTP/1.1 which happens in an ordered and blocking manner, the multiplexing capability in HTTP/2 enables multiple network requests over a single TCP connection. This is made in an asynchronous and resource-efficient manner which reduces the network latency manifold.

#### Resource and stream prioritization
Resource prioritization is the HTTP/2 feature that allows essential resources to load first. The developers need to associate dependency levels which allows the clients to consume only the code to that specific web page.

#### Server Push
This feature will let servers send resources to clients before they request them. Instead of letting the browser load some HTML to determine all the assets to download, we can push assets ahead of time and cache them to enhance performance.

From a technical point of view, check [this article](/engineering-education/http2-in-nodejs/) that uses Node.js to implement server push.

> Note: HTTP/2 protocol uses a new binary framing layer that is not backward compatible with any of the previous HTTP/1.x versions for clients and servers.

### Limitations of HTTP/2
- The HTTP/2 server push feature is also known to be tricky for developers to implement and integrate into the existing applications.
- While the HTTP/2 addressed the [head-of-line blocking](https://en.wikipedia.org/wiki/Head-of-line_blocking) in HTTP/1.1 protocol, TCP-level blocking still causes issues. This will be quite improved by the HTTP/3 protocol.
- Using concurrent requests increases server load thus leading to request timeouts.
- For clients on a slow network connection, packets will gradually drop, and the quality of the network is degraded to a single HTTP/2 connection. This slows the entire process hence blocking loads of data transfer.
- The progressive flexibility reduction in the protocol (known as [ossification(https://http3-explained.haxx.se/en/why-quic/why-ossification)]) becomes an issue to devices that are configured to accept the TCP or UDP.

### The HTTP/3 protocol
The movers and shakers of the web have recently spun an update on HTTP/3 protocol. While HTTP/1.1 and HTTP/2 are mainly 'HTTP-over-TCP', HTTP/3 is done over [QUIC](https://en.wikipedia.org/wiki/QUIC) (Quick UDP Internet Connections).

The main issue with TCP is that before establishing a session between a client and the server, a TLS handshake is needed to verify for a secure session.

The image below shows how QUIC is different from TCP and TLS in the HTTP/3 protocol:

![http2-http3](/engineering-education/http3-vs-http2/http2-http3.png)

*HTTP/2-HTTP/3 Handshake protocols*

To reduce the time for these processes, QUIC needs a single handshake to establish a secure session. The QUIC layer still runs on an encrypted transport protocol. 

#### Benefits of QUIC include
HTTP/2 was unable to solve the issue of latency in lossy and slow connections. To address this, QUIC provides a native multiplexing and the lost packets mainly impact the streams where data has been dropped rather than stalling the entire system.

QUIC uses a built-in encrypted and security issues where for example [manipulator-in-the-middle](/engineering-education/man-in-the-middle-attack/) attacks are reduced.

### Similarities between HTTP/2 and HTTP/3
The similarities between HTTP/2 and HTTP/3 include:
- Both protocols make use of the server push mechanisms.
- They offer multiplexing which is made over a single connection via streams.
- Resource prioritization is also done based on streams over the two protocols.
- Both versions utilize header compression as HPACK and QPACK which are tied to packet order.

### Differences between HTTP/2 and HTTP/3
- The major difference is that HTTP/3 is based on QUIC as a transport layer to handle streams while HTTP/2 uses TCP to handles streams in the HTTP layer.
- HTTP/3 has a much quicker handshake to establish a secure session compared to HTTP/2 which achieves this using TCP and TLS.

Here is a TCP/TLS vs QUIC latency comparison:

![TCP-QUIC-latency-comparison](/engineering-education/http3-vs-http2/TCP-QUIC-latency.png)

*TCP-QUIC Latency comparison*

- Lastly, HTTP/3 can only be done in a secure and encrypted manner, while the HTTP/2 version can be implemented without HTTPS.

### Conclusion
Across these HTTP version protocols, the request methods, status codes, and message fields are consistently applied. The implementation differences lie in the mapping of the underlying transport layers.

For HTTP/1.1 and HTTP/2, the TCP is the transport in the architecture. However, HTTP/3 uses QUIC as its network transport layer which implements the userspace congestion control over the User Datagram Protocol (UDP).

HTTP/3 will soon become the standard protocol and the version has already seen a huge roll into browsers. For support and compatibility, check the website [caniuse](https://caniuse.com/http3) for reference.

Happy learning!

### Further resources
- [Man in the middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)