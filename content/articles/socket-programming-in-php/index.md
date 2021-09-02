### Introduction

Real-time applications are now essential for all web applications and most of us have already done a lot with tools like ajax real-time data simulation. Although ajax is widely used by many developers, it does have some drawbacks to the critical performance that requires the speed and performance of the Socket Program.

#### What is socket programming, precisely?

A socket configuration joins different network nodes for communication purposes. One socket (node) listens for traffic on a specified IP port, while another socket links to it. While the client links to the server, it generates a listener socket.

#### What you will learn

Many computer languages, including Java and PHP, include a technique for dealing with socket systems.
This post will focus on dealing with sockets in PHP, creating a simple client-server application, as well as gaining knowledge on how to use a client application to send messages to a server.

#### Prerequisites

- TCP/IP protocol - Networking Fundamentals
- you need to have a little expertise in Hypertext Preprocessor programming language.

### Table of content

- [Introduction](#introduction)
  - [What really is socket programming, precisely?](#what-really-is-socket-programming-precisely)
  - [What you will learn](#what-you-will-learn)
  - [Prerequisites](#prerequisites)
- [Table of content](#table-of-content)
- [PHP SERVER](#php-server)
  - [Set up host and port](#set-up-host-and-port)
  - [Make a socket](#make-a-socket)
  - [Connect the socket to the port and host.](#connect-the-socket-to-the-port-and-host)
  - [Start by listening to the socket.](#start-by-listening-to-the-socket)
  - [Accept incoming connection](#accept-incoming-connection)
  - [Start by looking at the message in the Client socket.](#start-by-looking-at-the-message-in-the-client-socket.)
  - [Message reversal](#message-reversal)
  - [Send the client socket message](#send-the-client-socket-message)
  - [Lock the plug](#Lock-the-plug)
- [PHP CLIENT](#php-client)
  - [Configure the host and port.](#configure-the-host-and-port)
  - [Forming a socket](#forming-a-socket)
  - [Linking to the server](#linking-to-the-server)
  - [To the server socket,write](#to-the-server-socketwrite)
  - [Read the server's reaction](#read-the-server's-reaction)
  - [Close out the plug](#close-out-the-plug)
- [Conclusion](#conclusion)
- 
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

The server will wait for the client's link upon assigning an Internet address and a port number. It will keep on waiting till that moment arrives.

**Example**

```php
$result = socket_listen($sock, 3) or die(“failed to set up socket listener\n”);
```

#### Accept incoming connection

**syntax**

`socket_accept(Socket $socket)`

The connection request on a generated socket is accepted by this function. The above function yields a socket, which after accepting a connection from the socket is in charge of communicating with the appropriate client socket. `$listen` is the socket asset responsible for communicating with the client socket.

**Example**

```php
$listen = socket_accept($sock) or die(“failed to accept incoming connection\n”);
```

The script doesn't do anything yet. To achieve the aforementioned goal, we will read a client's socket data and transmit all of that on the client socket.

#### Start by looking at the message in the client socket.

**syntax**

`socket_read(Socket $sock, int $length, int $mode = PHP_BINARY_READ)`

`Socket_read()` retrieves information from a Socket instance socket created by the `socket_create()` or `socket_accept()` functions.

**Example**

```php
$input = socket_read($listen, 1024) or die(“Failed to read input\n”);
```

#### Message reversal

The `socket_recv()` function reads data from the socket in length bytes. `Socket_recv()` is used to collect data from linked sockets. Moreover, to change the function's behavior, one or more flags can be specified.

**Example**

```php
$output = strrev($input) . “\n”;
```

#### Send the client socket message

**syntax**

`socket_write(Socket $socket, string $data, ?int $length = null): int|false`

`Socket_write()` writes to the socket utilizing the information that has been allowed to pass to it.
**Example**

```php
socket_write($listen, $output, strlen ($output)) or die(“The result was not written.\n”);
```

#### Lock the plug

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

#### linking to the server
Unlike the server, the client socket also isn't compelled toward a port or perhaps a host under this scenario. Rather, everything just links to a server socket as well as sit and wait for the client socket link to be accepted. The link between the client and server sockets is established in this step.

```php
$result = socket_connect($sock, $host, $port) or die(“Connection to the server couldn't have been put in place.\n”);
```

#### To the server socket,write

The info from the client socket is sent to the server socket in this case.

```php
socket_write($sock, $message, strlen($message)) or die(“Data transmission to the server was unsuccessful.\n”);
```

#### Read the server's reaction.

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
echo "The server's reply:".$result;
socket_close($socket);
?>
```

- Following creation of the files described above (server.php and client.php): Perform the steps:
- Move these files to the `htdocs` folder (in the case of `XAMPP`), located in `C: \Xampp`.
- In the browser, type `localhost`
- First, run `server.php`, followed by `client.php`.

### Conclusion
By reading this article, you familiarized yourself with how you can implement sockets with PHP, You also learned how you can create a simple client-server application and how to transmit messages on a server using a client application. Web sockets can be used to create real-time apps such as chat and message.

**Further Reading**

- [socket-programming-in-java](https://www.section.io/engineering-education/socket-programming-in-java/)
