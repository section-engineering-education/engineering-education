---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-client-server-application-using-rust/
title: How to Build a Client Server Application using Rust
description: In this tutorial, you will understand the concept of client-server communication, and learn how to achieve this using Rust.
author: carol-wanjiru
date: 2021-12-29T00:00:00-01:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-client-server-application-using-rust/hero.png
    alt: How to Build a Client Server Application using Rust Hero Image
---
A web app is a service built on top of the Internet to allow computers to share and exchange data easily and reliably. In this case, the web services will be referred to as a client-server model. Communications are established between the two to exchange data. Clients will ask for data, and the computer that serves this data is called a server.

In this tutorial. we will discuss the concept of the client-server model as we implement the whole scenario using Rust.

### Set up Rust
Rust is a very low-level/systems-level programming language like C++ or C. It focuses on safety, speed, and concurrency, ensuring you have a design that lets you create high-performance programs. To start using Rust, you need to get a Rust C, which is the Rust compiler.

If you are using Visual Studio 2013 or older, then you have to [install](https://visualstudio.microsoft.com/visual-cpp-build-tools/) the Microsoft C++ build tools.
Please ensure the Windows 10 SDK and the English language pack components are included when installing the Visual C++ Build Tools.

Alternately, you can [install](https://visualstudio.microsoft.com/downloads/) a new version of Visual Studio, and during installation, select the "C++ tools".

![setup](/engineering-education/how-to-build-a-client-server-application-using-rust/setup.png)

Wait for the installation to finish. Then go ahead and [Download Rust C](https://www.rust-lang.org/tools/install) and install it on your computer. Check the Rust doc and select the Rust installation that fits the environment you are using.

This will install along with the Rust cargo. Cargo is a Rust package manager that allows you to access remote Rust packages. Cargo is closely related to NPM for Node.js, composer for PHP, or PyPI for Python.

Once Rust is installed, you can run the following to verify if the toolchain for the Rust development environment is correctly installed.

- To check the installed Rust version manager run;

```bash
rustup --version
```

- To check if Rust compiler is installed, run;

```bash
rustc --version
```

- To check if Rust Cargo package manager is installed, run;

```bash
cargo --version
```

![rust-installation](/engineering-education/how-to-build-a-client-server-application-using-rust/rust-installation.png)

Let's see how you can set up a basic Rust project. To create a Rust project, you use `cargo` to initialize your application.

To initialize your project with `cargo`, head over to your project folder and run `cargo init`. 

You can also use `cargo new my_app`. This will create a new project in a folder called `my_app`.

A Rust application structure will be created in any of the above methods. This has a `Cargo.toml` file that has your basic application configurations and Rust packages/dependencies that you will install. This looks similar to the `package.json` file for Node.js. It also creates an `src` folder where your Rust code goes. This folder has a `main.rs` with a basic Rust `Hello, world!` application. 

To test this, you can run `cargo run` inside the folder you initialized the Rust project. This command will compile, run the application for you and print the result on your terminal.

![cargo-run](/engineering-education/how-to-build-a-client-server-application-using-rust/cargo-run.png)

If you have a problem setting up Rust, check [this tutorial](https://www.youtube.com/watch?v=enk0o7eWNsc) and learn how to install the rust utilities and tools to compile and create your rust programs.

### The Rust modules
We need a couple of Rust modules to set up this server and client. These include:

- `time::Duration` - This will help us set a time duration that the server needs for a connection timeout.
- `io` - Since we are sending data between the server and client, we need to access the input and output using the read and write traits.
- `net` - The server and client need to communicate. Thus we need networking functionality to use `TcpStream` so that the local server can accept connections from clients to read and write to it. We also need the `TcpListener` so that the server can listen to incoming connections and bind them to a server socket address.
- `thread` - For adding the native Rust threads.

### Create a server with Rust
Create a project folder and name it `client_server_app`. To start setting up a Rust server, initialize a Rust project. To do this, run `cargo new server`. This will create a `server` folder with the Rust program configurations. Let's dive and start writing some Rust code for a Rust server. Head over to the `server`'s `src` folder and start working on your `main.rs` file.

#### Step one: Add Rust packages
Add these modules to your `main.rs` file, as shown below.

```rust
use std::io;
use std::time;
use std ::net::{TcpListener,TcpStream};
use std::io::{Read,Write};
use std::thread;
```

#### Step two - Handle the sender message
Before setting up a server, the server needs to handle the client's messages. The server must first access these messages then decide what operation to perform.

```rust
// Handle access stream
//create a struct to hold the stream’s state
// Perform I/O operations
fn handle_sender(mut stream: TcpStream) -> io::Result<()>{
    // Handle multiple access stream
    let mut buf = [0;512];
    for _ in 0..1000{
        // let the receiver get a message from a sender
        let bytes_read = stream.read(&mut buf)?;
        // sender stream in a mutable variable
        if bytes_read == 0{
            return Ok(());
        }
        stream.write(&buf[..bytes_read])?;
        // Print acceptance message
        //read, print the message sent
        println!("from the sender:{}",String::from_utf8_lossy(&buf));
        // And you can sleep this connection with the connected sender
        thread::sleep(time::Duration::from_secs(1));  
    }
    // success value
    Ok(())
}
```

First, the server will access the streams/client messages and hold them in the stream’s state. The server will accept any message with a range of 0 to 512-bit in size. These messages are mutable and can be sent by different clients. This will allow multiple clients to connect to this server at once. `TcpStream` will allow accepting new clients' connections to this server. If the connection is valid, `Ok(())` will be executed to verify that this connection to the stream address actually worked.

Once these connections are established, the server will read messages into our set buffer. This will take the message that we're receiving, handle all the characters that are not whitespace inside this buffer as a `String`. Then, to complete the read-write operation, the server will convert this `String` into an actual `utf8` string and then print the message to the server's terminal.

The server will constantly loop around the connected clients. This can create permanence overhead. Therefore, we need to set a `time::Duration` that allows the server to `sleep` for a moment when looping through the sent messages.

#### Step three - Set up the actual server
For this connection to work right, we need to set localhost with a port in it. In this case, we will have localhost with port `7878`.

```rust
fn main() -> io::Result<()>{
    // Enable port 7878 binding
    let receiver_listener = TcpListener::bind("127.0.0.1:7878").expect("Failed and bind with the sender");
    // Getting a handle of the underlying thread.
    let mut thread_vec: Vec<thread::JoinHandle<()>> = Vec::new();
    // listen to incoming connections messages and bind them to a sever socket address.
    for stream in receiver_listener.incoming() {
        let stream = stream.expect("failed");
        // let the receiver connect with the sender
        let handle = thread::spawn(move || {
            //receiver failed to read from the stream
            handle_sender(stream).unwrap_or_else(|error| eprintln!("{:?}",error))
        });
        
        // Push messages in the order they are sent
        thread_vec.push(handle);
    }

    for handle in thread_vec {
        // return each single value Output contained in the heap
        handle.join().unwrap();
    }
    // success value
    Ok(())
}
```

Here we are instantiating our server using the `TcpListener`. This way, the server may listen for new connections and assign them to a server socket address. If it fails to bind with the new connection, then we're going to return an error message.

Once the connection is made, we want to basically set what should happen when our server receives a message. We will collect all the incoming messages to our stream and bind them to a server socket address. We then put these messages into a heap in the order they were sent. The server will then read and write each message from the set heap stack.

You can now run the server and test if it is working. Navigate to the `server` directory and run `cargo run`.

![server](/engineering-education/how-to-build-a-client-server-application-using-rust/server.png)

### Create a client with Rust
Let's now create a client to send some messages to the server. To start setting up a Rust client, initialize a Rust project. To do this, navigate to the `client_server_app` folder and run `cargo new client`. This creates a `client` folder containing the Rust application settings. Let's get started on some Rust code for a Rust client. Go to the `client`'s `src` folder and begin working on your `main.rs` file.

#### Step one: Add Rust client packages
Add these modules to your `main.rs` file, as shown below.

```rust
use std::str;
use std::net::TcpStream;
use std::io::{self,prelude::*,BufReader,Write};
```

#### Step two: Set up the Rust client
The client needs permission to write messages and send them to the server. Therefore, we need a local host and a port number to be able to communicate with the server.

```rust
fn main() -> io::Result<( )>{
    // connect
    // Struct used to start requests to the server.
    // Check TcpStream Connection to the server
    let mut stream = TcpStream::connect("127.0.0.1:7878")?;
    for _ in 0..1000 {
        // Allow sender to enter message input 
        let mut input = String::new();
        // First access the input message and read it
        io::stdin().read_line(&mut input).expect("Failed to read");
        // Write the message so that the receiver can access it 
        stream.write(input.as_bytes()).expect("failed to write");
        // Add buffering so that the receiver can read messages from the stream
        let mut reader =BufReader::new(&stream);
        // Check if this input message values are u8
        let mut buffer: Vec<u8> = Vec::new();
        // Read input information
        reader.read_until(b'\n',&mut buffer)?;
       
        println!("read from server:{}",str::from_utf8(&buffer).unwrap());
        println!("");
    }
    Ok(())
}
```

First, we will create a mutable client with `TcpStream` and then connect it to a localhost IP with a port number. Here we can have different clients connecting to the same server. Therefore, we need to create a mutable `TcpStream` to allow different localhost IP address to connect to the server.

Once the client connects to the server, it needs permission that allows the sender to enter a mutable message input. The server is now supposed to print this message. These messages are read as a string, which is then converted to a `utf8` buffer.

Now you just need to add buffering so that the server can read messages from the client stream.

Let's test this out. Open a new terminal and run the client using `cargo run`.

![client](/engineering-education/how-to-build-a-client-server-application-using-rust/client.png)

Ensure your server is still up and running in a different terminal. Head over to the client terminal, start typing some messages, and click enter to send.

![client-messages](/engineering-education/how-to-build-a-client-server-application-using-rust/client-messages.png)

Head over to the server terminal, and you can see the server received the exact messages you sent.

![server-messages](/engineering-education/how-to-build-a-client-server-application-using-rust/server-messages.png)

### Conclusion
When you connect to the network, your computer sends data to a server. The server then checks this data to make sure that it is valid. If the data is invalid, this will throw an error. In this tutorial, we have built a handy application that allows the server and client to exchange data between them using Rust programming language. I hope you found this helpful!

---
Peer Review Contributions by: [Eric Kahuha](/engineering-education/authors/eric-kahuha/)
