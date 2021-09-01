### Introduction

Real-time applications are now essential for all web applications and most of us have already done a lot with tools like ajax real-time data simulation. Although ajax is widely used by many developers, it does have some drawbacks to the critical performance that requires the speed and performance of the Socket Program.

#### What exactly is socket programming?

A socket setup is a way of connecting two network nodes so that they can interact. One socket (node) listens for traffic on a specified IP port, while another socket connects to it. While the client connects to the server, the server generates a listener socket.

#### What you will learn

Many computer languages, including Java and PHP, include a technique for dealing with socket systems.
This post will focus on dealing with sockets in PHP, creating a simple clientserver application, and learning how to transmit messages on a server using a client application.

#### Prerequisites

- Networking basics - TCP / IP protocol
- you need to have a few expertise in Hypertext Preprocessor programming language.

### Table of content

- [Introduction](#introduction)
  - [What exactly is socket programming?](#what-exactly-is-socket-programming)
  - [What you will learn](#what-you-will-learn)
  - [Prerequisites](#prerequisites)
- [Table of content](#table-of-content)
- [Types of sockets](#types-of-sockets)
- [PHP SERVER](#php-server)
  - [Set up host and port](#set-up-host-and-port)
  - [Make a socket](#make-a-socket)
  - [Connect the socket to the port and host.](#connect-the-socket-to-the-port-and-host)
  - [Start by listening to the socket.](#start-by-listening-to-the-socket)
  - [Accept incoming connection](#accept-incoming-connection)
  - [Start by looking at the message in the Client socket.](#start-by-looking-at-the-message-in-the-client-socket.)
  - [Message reversal](#message-reversal)
  - [Send the client socket message](#send-the-client-socket-message)
  - [Close the plug](#close-the-plug)
- [PHP CLIENT](#php-client)
  - [Configure the host and port.](#configure-the-host-and-port)
  - [Forming a socket](#forming-a-socket)
  - [connect to the server](#connect-to-the-server)
  - [To the server socket,write](#to-the-server-socketwrite)
  - [Read the response from the server](#read-the-response-from-the-server)
  - [Close out the plug](#close-out-the-plug)
- [Conclusion](#conclusion)

### Types of sockets

Socket types define the user-visible communication properties. The TCP/IP transport protocols are provided with Internet family sockets. For sockets that can communicate both over `IPv6` and `IPv4`, the Internet family is determined by the value `AF_INET6.` The support for `AF_INET` for source compatibility and 'raw' access to `IPv4` is also supported.

`Stream` sockets - enable communication processes using TCP. Stream socket provides reliable, consistent, and unduplicated data flow with no recording restrictions. Following the establishment of the connection, data can be read and written to these feet as a byte socket. `SOCK_STREAM` is the socket type.

`Datagram` sockets - enable UDP communication with processes. The datagram socket allows messages to flow to two bids. The datagram socket process can receive messages in various ways in the sending sequence. Duplicate messages may be received by the process in the data group socket. Data record parameters are saved. `SOCK_DGRAM` is the socket type.

`Raw` sockets - provide access to ICMP. These feet are usually guided by a datagram, although their specific features depend on the visual interface provided by the protocol. Raw bases are not for maximum use. Green socks are offered to support the implementation of new communication policies, or access to many esoteric institutions for existing protocols. Green sockets can only be used by superuser processes. `SOCK_RAW` is the socket type.

### PHP SERVER

- We will be using Xampp as our server

#### Set up host and port

your local IP
`$host = “127.0.0.1”;`
Port number can be a whole number between 1024 -65535.
`$port = 5353;`
No Time to End
set_time_limit(0);

#### Make a socket

**syntax**

`socket_create(int $domain, int $type, int $protocol):`
Creates and returns a socket example, also known as a communication terminal. A typical network link consists of 2 sockets, one playing the customer's role and the other playing the server's role.
**Example**

```php
$sock = socket_create(AF_INET, SOCK_STREAM, 0) or die(“failed to create socket\n”);
```

#### Connect the socket to the port and host.

**syntax**

`socket_bind(Socket $socket, string $address, int $port = 0)`
Binds the name specified in address to the socket specified in socket. This must be done before establishing a connection with `socket_connect()` or `socket_listen()`.
In this case, The newly created socket resource is therefore bound to an `IP address` and a `port` number.

**Example**

```php
$result = socket_bind($sock, $host, $port) or die(“failed to bind to socket\n”);
```

#### Start by listening to the socket.

**syntax**

`socket_listen(Socket $sock, int $backlog = 0)`

After an IP address and port are assigned, the server will wait for the client to connect. It will keep waiting until that time comes.

**Example**

```php
$result = socket_listen($sock, 3) or die(“failed to set up socket listener\n”);
```

#### Accept incoming connection

**syntanx**

`socket_accept(Socket $socket)`

The connection request on a generated socket is accepted by this function. This function returns a socket, which after accepting a connection from the socket is responsible for communication with the appropriate client socket. `$listen` is the socket resource that communicates with the client socket.

**Example**

```php
$listen = socket_accept($sock) or die(“failed to accept incoming connection\n”);
```

The script doesn't do anything yet. To keep to our above objective, we will read a customer's socket message and send it to the customer socket.

#### Start by looking at the message in the client socket.

**syntax**

`socket_read(Socket $sock, int $length, int $mode = PHP_BINARY_READ)`

`Socket_read()` reads data from a Socket instance socket created by the `socket_create()` or `socket_accept()` functions.

**Example**

```php
$input = socket_read($listen, 1024) or die(“Failed to read input\n”);
```

#### Message reversal

The `socket_recv()` function reads data from the socket in length bytes. `Socket_recv()` is used to collect data from connected sockets. Moreover, to change the function's behavior, one or more flags can be specified.

**Example**

```php
$output = strrev($input) . “\n”;
```

#### Send the client socket message

**syntax**

`socket_write(Socket $socket, string $data, ?int $length = null): int|false`

`Socket_write()` writes to the socket using the data passed to it.
**Example**

```php
socket_write($listen, $output, strlen ($output)) or die(“Failed to write output\n”);
```

#### Close the plug

**syntax**

`socket_close(Socket $socket): void`

`Socket_close()` closes the socket instance.

**Example**

```php
socket_close($listen);
socket_close($sock);
```

This is supplemented by the server. We're now learning how to build a PHP client.

### PHP CLIENT

- Here setting up an `IP address, a `port`, and creating a socket is similar to that of a server.

#### Configure the host and port.

your local IP

`$host = “127.0.0.1”;`

your Port number

`$port = 5353;`

No Time to End

`set_time_limit(0);`

**Note:** The `port` and `host` here should be identical to that defined in the server.

#### Forming a socket

```php
$sock = socket_create(AF_INET, SOCK_STREAM, 0) or die(“Failed to generate socket\n”);
```

#### connect to the server

In this case, unlike the server, the client socket is not bound to a port or a host. Instead, it connects to the server socket and awaits the acceptance of the client socket connection. This step establishes the connection between the client and server sockets.

```php
$result = socket_connect($sock, $host, $port) or die(“Failed to establish connection to the server\n”);
```

#### To the server socket,write

Here, the data on the client socket is sent on the server socket.

```php
socket_write($sock, $message, strlen($message)) or die(“Failed to send data to server\n”);
```

#### Take a look at the server's reaction.

```php
$result = socket_read($sock, 1024) or die(“Failed to generate response from the server\n”);
echo “Response from the server :”.$result;
```

#### Close out the plug

```php
socket_close($sock);
```

[View source code at gitHub](https://github.com/fabulousDesigns/socket-programming-in-PHP)

- Create a directory and name it `sockets-programming-in-php`.
- Inside this directory create a new file and name it `server.php`.

```php
<?php
$host = "127.0.0.1";
$port = 25003;
set_time_limit(0);
$sock = socket_create(AF_INET, SOCK_STREAM, 0) or die("failed to create the socket\n");
$result = socket_bind($sock, $host, $port) or die("Failed to bind to socket\n");
$result = socket_listen($sock, 3) or die("Cannot set up socket listener\n");
$listen = socket_accept($sock) or die("Cannot accept incoming connection\n");
$input = socket_read($listen, 1024) or die("Cannot read input\n");
$input = trim($input);
echo "Client Message : ".$input;
$output = strrev($input) . "\n";
socket_write($listen, $output, strlen ($output)) or die("Cannot write output\n");
socket_close($listen);
socket_close($sock);

?>
```

Create a new file and name it `client.php`.

```php
<?php
$host    = "127.0.0.1";
$port    = 25003;
$message = "Hello Server";
echo "Message To server :".$message;
$socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");
$result = socket_connect($socket, $host, $port) or die("Could not connect to server\n");
socket_write($socket, $message, strlen($message)) or die("Could not send data to server\n");
$result = socket_read ($socket, 1024) or die("Could not read server response\n");
echo "Response from the server:".$result;
socket_close($socket);
?>
```

- After creating the above files (`server.php` and `client.php`), do the following:
- Copy these files to the `htdocs` directory (in the case of `XAMPP`), located in `C: \Xampp`.
- In a web browser type `localhost` in the address bar.
- First, check `server.php`, then `client.php`.

### Conclusion

In this article you learned the basics of sockets using PHP, There is much more you can learn more about this topic. Web sockets can be used to create real-time applications such as chat and messaging.

**Further Reading**

- [socket-programming-in-java](https://www.section.io/engineering-education/socket-programming-in-java/)
