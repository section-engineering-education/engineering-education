---
layout: engineering-education
status: publish
published: true
url: /build-microprofile-rest-client-with-mutual-tls-authentication/
title: Build a Microprofile Rest Client with Mutual TLS Authentication
description: In this article, you will learn how to build a Microprofile Rest Client application with TLS authentication.
author: francis-kaguongo
date: 2021-10-19T00:00:00-09:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/hero.png
    alt: Microprofile Rest Client with Mutual TLS Authentication
---
In networking, layers are used to understand the complexity of networks. Some network models such as the OSI and TCP/IP have been key in modern-day networks. Security in systems is important considering that Security is not an afterthought of a system, rather an integral part.
<!--more-->
In Microprofile, security is key. It is built side by side as the system is being developed to prevent unwanted integration errors.

One way of improving security is by adding TLS authentication to the application.

In this article, you will learn how to build a Microprofile Rest Client application with TLS authentication.

### Table of contents
- [Key takeaways](#key-takeaways)
- [Prerequisites](#prerequisites)
- [What is TLS authentication?](#what-is-tls-authentication)
- [Getting started](#getting-started)
- [Modify the Client and Server endpoints](#modify-the-client-and-server-endpoints)
- [Add Server configurations](#add-server-configurations)
- [Add Client configurations](#add-client-configurations)
- [Add a Client interface and import configuration properties](#add-a-client-interface-and-import-configuration-properties)
- [Access the Server from Client using a simple Client call](#access-the-server-from-client-using-a-simple-client-call)
- [Generate the KeyStores and TrustStores](#generate-the-keystores-and-truststores)
- [Run the application](#run-the-application)
- [Make a Server call using a ClientBuilder](#make-a-server-call-using-a-clientbuilder)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)
- [References](#references)

### Key takeaways
At the end of this article, you will have gained the following knowledge:
- What TLS authentication is
- How and where it can be implemented
- Setting up Mutual TLS authentication in a Microprofile application such as Quarkus
- Running the application

### Prerequisites
The basics of the article include the following:
- Java language knowledge and use. It will be easy for intermediate Java developers.
- Java installed and set up on the machine. For the article, you need version `11+`.
- A Java IDE is set up in your machine. I recommend using the latest IntelliJ ultimate edition. It is very interactive, and it has all the necessary tools to use for Java frameworks.
- A stable internet connection.

> **NOTE**: The screenshots taken for this article are from the IntelliJ Ultimate Edition version `2021.2.2`. The Java version used is Java Version 17.

### What is TLS authentication?
TLS (Transport Layer Security) is a cryptographic protocol utilizing both Symmetric and Asymmetric cryptography to secure message passing from one machine to another.

It prevents unauthorized people with malicious intends from eavesdropping when the message is passed from the server to the client. It only protects the transportation of the messages but not end device security.

This is because it is implemented at the top of the TCP/IP layer to encrypt Application Layer protocols e.g. HTTP, FTP, IMAP, and SMTP, though it can be implemented also on UDP, DCCP, and SCTP as well (e.g. for VPN and SIP-based application uses).

This implementation is known as DTLS (Datagram Transport Layer Security) and is specified in RFCs 6347, 5238, and 6083.

TLS is an evolved SSL (Secure Socket Layers). It allows the server and client to exchange keys that are used to encrypt the messages.

TLS can be used in websites to enforce security on email services, banking sites, ecommerce sites, among many other sites.

Once enabled, one notices a padlock icon at the left-hand side of the URL in the browser. This shows that the site is secure.

It looks as shown below:

![padlock](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/padlock.png "padlock")

When the padlock icon is clicked, the following pop up is shown:

![Secure website](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/secure-website.png "secure-website")

Always avoid visiting sites without the SSL padlock icon which shows that they are insecure.

![Insecure site](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/in-secure-site.png "Insecure site")

### Getting started
Initialize a new maven project. Set the _name_ and the _artifactId_ to `quarkus-restclient-mutual-tls`.

Click on finish.

![Create a new maven project](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/create-a-new-maven-project.png "Create a new maven project")

![Set up the root folder](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/set-up-the-root-folder.png "Set up the root folder")

In the project generated, delete the _src_ file.

This will reduce confusion so that the focus can be on the new modules to be created.

In it, create a new module by navigating to the `File > New > Module` option as shown below:

![Create new modules](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/create-new-modules.png "Create new modules")

In the newly opened window, select the project type to be Quarkus.

The following will be its configurations:
- `Name`: quarkus-server
- `ArtifactId`: quarkus-server
- `Group`: org.gs

![New server module](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/new-server-module.png "New server module")

As for the dependencies, select the `RESTEasy JAX-RS` and `RESTEasy Jackson` as shown below:

![Server dependencies](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/server-dependencies.png "Server dependencies")

Create a second module and this time set the following:
- `Name`: quarkus-client
- `ArtifactId`: quarkus-client
- `Group`: org.gs

![New client module](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/new-client-module.png "New client module")

Choose the `RESTEasy JAX-RS`, `RESTClient`, and `RESTClient Jackson` as the dependencies, as shown below:

![Client dependencies](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/client-dependencies.png "Client dependencies")

The project structure is as shown below:

![Project structure appearance](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/project-structure-appearance.png "Project structure appearance")

Delete the contents in the test folder, both in the `quarkus-client` and `quarkus-server` modules.

Deletion allows a quick run without the additional unit tests.

Right-click on the `quarkus-client` module and select `Open in > Terminal` option. This opens it in the IntelliJ integrated terminal.

Do the same to the `quarkus-server` module so that they can be opened in two different terminals.

Run them to check if all dependencies are well installed or for any errors by running the following:
- On `quarkus-client` terminal, run `./mvnw quarkus:dev`. Open a new terminal and test the Client by running `curl http://localhost:8080/hello` to get a response from the Client. If the response is "Hello RESTEasy", it works correctly. Stop it to run the server on the other terminal.
- On `quarkus-server` terminal, run `./mvnw quarkus:dev -Ddebug=5006`. This changes the debugging port from the default _5005_ to _5006_ to avoid port conflicts. Run `curl http://localhost:8080/hello` for server response. Stop it.

### Modify the client and server endpoints
Head over to the `ExampleResource.java` file inside the `quarkus-client` module:
- Change the class in it and the name of the file to `ClientResource`.
- Change the output to "Hello from Client" by changing the return of the GET request to `Hello from Client\n`.
- Change the end-point to `/client`.

In the `ExampleResource.java` file inside the `quarkus-server` module, do the following:
- Change the class in it and the name of the file to `ServerResource`.
- Change the output to "Hello from Client" by changing the return of the GET request to `Hello from Server\n`.
- Change the end-point to `/server`.

Rerun the modules separately as done before using the set endpoints to make sure the return is as desired.

### Add server configurations
In the Server, open the `application.properties` file. This file is located under the `quarkus-server/src/main/resources` path.

In the file, do the following:
- Disable _http_ requests and enable using _https_ requests. Https allows for the application to use secure SSL. To disable http, use port number 0.

Use SSL at port number 8443 as in the code below:

```bash
# Enable ssl but disable http to enforce security
quarkus.http.ssl-port=8443
quarkus.http.port=0
```

- Set the application to require SSL client authentication. This will require the SSL keys during the connection. Check it out below:

```bash
# Set the server to require ssl authentication
quarkus.http.ssl.client-auth=required
```

A KeyStore will be generated in the server which will be used as a client's TrustStore. It will be used during server authentication.

The same will be done during client authentication. A client KeyStore will be stored in the server as a TrustStore.

This is shown as in the diagram below:

![ssl authentication process](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/ssl-authentication-process.png "ssl authentication process")

> TrustStore is used to store Certified Authorities (CA) certificates verifying the certificate presented by the server in an SSL connection.<br/>The Keystore on the other hand is used to store private key and identity certificates presented to both parties (server or client) by a program for verification. Read more [here](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/https://www.educative.io/edpresso/keystore-vs-truststore).

Both the KeyStore and TrustStore generated have passwords. These correct passwords are required during the process.

- Add the location of the KeyStore and TrustStore together with their passwords. The code is shown below:

```bash
# Set the location of the server keystore and it's password
quarkus.http.ssl.certificate.key-store-file=META-INF/resources/server.keystore
quarkus.http.ssl.certificate.key-store-password=server_password

# Set the location of the server truststore and it's password
quarkus.http.ssl.certificate.trust-store-file=META-INF/resources/client.truststore
quarkus.http.ssl.certificate.trust-store-password=client_password
```

- Rerun the Server in another window and try accessing the server endpoint using `curl https://localhost:8443/server`. This produces an error immediately since there are no certificates provided.
- Try accessing it further with `curl -k https://localhost:8443/server` which quickly checks for wrong configurations or other fails. That produces an error too as shown below:

![Bad certificate server response](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/bad-certificate-server-response.png "Bad certificate server response")

### Add Client configurations
In the Client, open the `application.properties` file. This file is located under the `quarkus-client/src/main/resources` path.

In the file, do the following:

- Use the `MicroProfile Rest Client (mp-rest)` for invocation of RESTful services over HTTP. The good thing is that it is a type-safe approach. In it, point out to the server url, the trustStore, and the trustStorePassword, and the Keystore together with its password as the Keystore password.

Check it below:

```bash
# Use the mp-rest to pass the keystore and truststore from client to server and back
# Set the url, TrustStore and TrustStore password, KeyStore and KeyStore password to be used during the server call process
org.gs.Client/mp-rest/url=https://localhost:8443
org.gs.Client/mp-rest/trustStore=classpath:/META-INF/resources/server.truststore
org.gs.Client/mp-rest/trustStorePassword=server_password
org.gs.Client/mp-rest/keyStore=classpath:/META-INF/resources/client.keystore
org.gs.Client/mp-rest/keyStorePassword=client_password
```

- Add other configuration properties that can be easily injected into the module for injection in the application and also reuse.

Check its code below:

```bash
# Add some config properties
url=https://localhost:8443
keyStore=META-INF/resources/client.keystore
keyStorePassword=client_password
trustStore=META-INF/resources/server.truststore
trustStorePassword=server_password
```

### Add a client interface and import configuration properties
Inside the client, at the location of the `ClientResource.java` file, add a new file named 'Client.java'. This will be an interface used to access the server API. When all conditions given are met, the server shall be called.

The code for the interface is as shown below:

```java
package org.gs;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@RegisterRestClient
@Path("/")
public interface Client {

    // Access the server when all conditions required are met
    @GET
    @Path("/server")
    @Produces(MediaType.TEXT_PLAIN)
    String call();

}
```

### Access the server from client using a simple Client call
- First, inside the 'ClientResource' class, just above the 'hello()' string, import the application configurations. Import the server url for the call, KeyStore and its password, and the TrustStore and its password.

See it in the code below:

```java
    /*
        Inject configuration properties to the app; they are stored in the application.properties file. These shall be used during the connection between the server and the client
        These include: - URL to be used to contact the server
                       - The KeyStore and Keystore password
                       - The truststore and truststore password
    */

    @ConfigProperty(name = "url")
    URL serverURL;

    @ConfigProperty(name = "keyStore")
    String keyStoreFile;

    @ConfigProperty(name = "keyStorePassword")
    String keyStoreFilePassword;

    @ConfigProperty(name = "trustStore")
    String trustStoreFile;

    @ConfigProperty(name = "trustStorePassword")
    String trustStoreFilePassword;
```

- Add a `RestClient` annotation to show that it is a rest client. Inject the interface initially generated.

```java
    /*
     * Annotate that the application is a REST_CLIENT
     * Inject the client interface into the application. This will be used as an interface between the server and client
     */
    @RestClient
    @Inject
    Client client;
```

- Add an endpoint used to access the server. The endpoint will be accessed via `http://localhost:8080/client/client`.

```java
    /*
     * Create a simple GET request that will use the configurations entered to contact the server
     */
    @GET
    @Path("client")
    @Produces(MediaType.TEXT_PLAIN)
    public String callWithClient() {
        return client.call();
    }
```

It uses the `mp-rest` configuration set initially in the client's `application.properties` file.

### Generate the KeyStores and TrustStores
Inside the Client, in the 'resources/META-INF/resources' folder create a new file with the name 'generate_client_keystore.sh'. As seen, the file holds shell scripts that can be run.

Open the file and copy and paste the code below into it:

```shell
keytool -genkeypair \
        -storepass client_password \
        -keyalg RSA \
        -keysize 2048 \
        -dname "CN=client" \
        -alias client \
        -ext "SAN:c=DNS:localhost,IP:127.0.0.1" \
        -keystore client.keystore \
        &&
cp client.keystore \
   ../../../../../../quarkus-server/src/main/resources/META-INF/resources/client.truststore
```

When run, the code will do the following:
- Generates public and associated private keys
- The password for the key is `client_password`. Remember that this password was set in the server's `application.property` file as the client's TrustStore.
- The underlying key algorithm to `RSA`.
- The size of the key to 2 MB (`2048`).
- A distinguished name of `CN=client`.
- An Alias name of the entry to process to `client`.
- An X.509 extension as follows: `SAN:c=DNS:localhost,IP:127.0.0.1`. Read more of the **X.509 extension** [here](https://www.ibm.com/docs/en/external-auth-server/2.4.3?topic=securing-x509-extensions) or [here](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html#keytool_option_genkeypair).
- The Keystore file name to `client.keystore`
- Once generated, the application will copy it into the server's resource file as `client.truststore`

Run it by navigating to it and pressing down the combination `Ctrl + Shift + F10` or the **_Run_** button as seen in IntelliJ. This is shown below:

![run generate_client_keystore](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/run-generate_client_keystore.png "run generate_client_keystore")

Create a new file inside the server module, under 'resources/META-INF/resources' file, create a file and name it 'generate_server_keystore.sh'.

Copy the code below and paste it into the file:

```shell
keytool -genkeypair \
        -storepass server_password \
         -keyalg RSA \
         -keysize 2048 \
         -dname "CN=server" \
         -alias server \
         -ext "SAN:c=DNS:localhost,IP:127.0.0.1" \
         -keystore server.keystore \
         && \
cp server.keystore \
   ../../../../../../quarkus-client/src/main/resources/META-INF/resources/server.truststore
```

It does as the previous file except with a few modifications to support the server side.

The files created should look as shown below:

```shell
.
├── quarkus-client
│   └── src
│     └── main
│         ├── docker
│         ├── java
│         └── resources
│             └── META-INF
│                 ├── resources
│                     ├── client.keystore
│                     ├── generate_server_keystore.sh
│                     └── server.truststore
│                 └── application.properties
├── quarkus-server
│   └── src
│     └── main
│         ├── docker
│         ├── java
│         └── resources
│             └── META-INF
│                 ├── resources
│                     ├── client.truststore
│                     ├── generate_server_keystore.sh
│                     └── server.keystore
│                 └── application.properties
```

> When creating an online repo, e.g. a GitHub repo, don't store the KeyStore or the TrustStore online.
> When GitGuardian is activated, it immediately shows that this is a dangerous move and can be exploited.
> Rather, store the generators which can be used to generate others securely.

### Run the application
To run the application to make sure that the client and server have exchanged the files and used the passwords to verify them:
- Open both modules in different internal terminals.
- On the client's terminal, run `./mvnw quarkus:dev`.
- On the server's terminal, run `./mvnw quarkus:dev -Ddebug=5006`.
- Access the server via the client by use of `http://localhost:8080/client/client`

The response will be `Hello from Server`.

### Make a server call using a ClientBuilder
In the 'ClientResources.java' file, do the following:
- Add a new endpoint to be used to check if the Builder comes up with the same result as before. Do this by adding the block of code below:

```java
    /*
     * Create a GET request using a builder that will use the configurations entered to contact the server
     */
    @GET
    @Path("clientBuilder")
    @Produces(MediaType.TEXT_PLAIN)
```

- Add the `callWithClientBuilder` function and the errors it throws in case of any. This is shown below:

```java
    /*
    * Create a method to call the server using a Client_Builder
    * Some errors it may give include:      - KeyStoreException error
                                            - CertificateException error
                                            - NoSuchAlgorithmException error
                                            - IOException error
    */
    public String callWithClientBuilder() throws KeyStoreException, CertificateException, NoSuchAlgorithmException, IOException {




    }
```

- In the function above, fetch the KeyStore and its password which was imported as configuration properties before. Check it out below:

```java
        /*
        * Get the KeyStore file as a stream and store it in a Keystore object for use during the server call
        * On load, use the Keystore and Keystore file password
        */
        KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        InputStream inputStreamKeyStore = this.getClass()
                .getClassLoader()
                .getResourceAsStream(keyStoreFile);
        keyStore.load(inputStreamKeyStore, keyStoreFilePassword.toCharArray());

```

- Fetch the trustStore and its password. Check it out below:

```java
        /*
         * Get the TrustStore file as a stream and store it in a Keystore object for use during the server call
         * On load, use the TrustStore and TrustStore file password
         * The TrustStore is of a KeyStore type
         */
        KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
        InputStream inputStreamTrustStore = this.getClass()
                .getClassLoader()
                .getResourceAsStream(trustStoreFile);
        trustStore.load(inputStreamTrustStore, trustStoreFilePassword.toCharArray());
```

- Use the KeyStore objects fetched to build the url up so that the server call can be made:

```java
        /*
         * Set the url, keyStore, and trustStore during the build
         * Make the server call at the end of the build function
         */
        Client clientBuild = RestClientBuilder.newBuilder()
                .baseUrl(serverURL)
                .keyStore(keyStore, keyStoreFilePassword)
                .trustStore(trustStore)
                .build(Client.class);
        return clientBuild.call();
```

Save the application and rerun it as previously done but now using the `http://localhost:8080/client/clientBuilder`.

It gives out the outcome as the initial one, a `Hello from Server` reply. This shows that the client has contacted the server properly and securely.

![testing the endpoint](/engineering-education/build-microprofile-rest-client-with-mutual-tls-authentication/testing-the-endpoint.png "testing the endpoint")

Any challenges in the code? Find the repository containing the code [here](https://github.com/franciskaguongo/Build-Microprofile-Rest-Client-with-Mutual-TLS-Authentication).

### Conclusion
In the article, the following have been accomplished:
- What TLS authentication is.
- Where and how TLS can be implemented.
- Setting up Mutual TLS authentication in a MicroProfile application such as Quarkus.
- Running the application.

### Further reading
Increase understanding of TLS on topics such as: How TLS works, Certificate Authority (CA), X.509 standard for Public Key Infrastructures (PKIs), among others [here](https://www.internetsociety.org/deploy360/tls/basics/).

### References
- [TLS basics](https://www.internetsociety.org/deploy360/tls/basics/)

---
Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
