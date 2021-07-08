One reason Docker is superb is the ability to containerize an application without installing additional dependencies on your local computer. Nevertheless, Docker runs on a virtualization architecture. This creates an isolated environment for running your application away from the host machine. Docker engine takes the role of assigning resources from the host to the virtualized isolated application. Once such application is containerized, the application virtualized data are isolated from the host. This means when you virtualize an application, all its data will be hosted within the dockerize containers. In this case, the host and the application are running on different infrastructures.

At times you may want your virtually containerized application to share data and files directly from the host computer. This blog will teach you how to share data between a Docker containerized application and the host computer. We will also go over how to copy files of an existing application and containerize them within the virtual Docker containers.

- Docker installed on your computer. Check that by running:

```bash
docker --version
```

- Nginx image. Head over to your terminal and pull the Nginx image from the Docker hub using the command below.

```bash
docker pull nginx
```

You can check if the image was downloaded using `docker image ls`, and the images will be listed in your terminal.

![nginx-docker-image](/engineering-education/how-to-share-data-between-a-docker-container-and-the-host-computer/nginx-docker-image.png)

This shows that Nginx with the latest tag has been successfully downloaded from the Docker hub. With it, we can use it to create a Docker container that will be used to run this image.

### Using bind mounts

By default, Docker runs applications as stateless. It sends a writable layer to give an application write access, but whatever you've written there is gone as soon as you stop the container. This means writable layer access is not always reliable. Therefore, Docker used different methods such as bind mount, volumes, and in-memory options to temporarily manage the application file system.

Bind mount works by mounting a file or a directory that resides on the host inside of the container. This is an effective mechanism that allows you to access files from the host inside of your container. Once the container stops, the data remains because it lives on the host. And since this data lives in the host, you need to know the exact path on the host that you want to mount in the container. This will work well on your development since you won't be required to rebuild the image to access the new source code. You make changes to your source, and it reflects immediately.

To use bind mount, we will follow the following steps:

#### Step 1: Make a directory where we will mount with the container

Run the command below to create a directory.

```bash
mkdir -p /tmp/nginx/html
```

#### Step 2: Build and run the container using the Nginx image

Using the Nginx image that we have pulled, we will create a Docker container as shown below.

- Run a container in the background using `-t -d`.
- Set for port mapping using `-P`.
- Set the volume for mounting using `-v` which is the volume we have created in the previous step to the location of Nginx files.
- Set the name of the container using `--name`.
- Set the Nginx image using `nginx:latest`.

```bash
docker run -t -d -P -v /tmp/nginx/html:/usr/share/nginx/html --name nginxcont nginx:latest
```

After running the above command, check the running containers:

```bash
docker container ls
```

![bind-mount-containers](/engineering-education/how-to-share-data-between-a-docker-container-and-the-host-computer/bind-mount-containers.png)

#### Step 3: Get your IP address

```bash
ifconfig
```

Get your port number from the container we have created in the previous process under column `PORTS` or just `run docker container ls`. Then get the port number assigned to the container we are using. Proceed to your browser and key in the following in a tab: `http://<your_ip_address>:<your_port>`. Since we do not have any HTML file in the directory, your content should be similar to:

![bind-mount-default](/engineering-education/how-to-share-data-between-a-docker-container-and-the-host-computer/bind-mount-default.png)

#### Step 4: Testing

In your current directory, create an `index.html` file and add the following lines of code.

```html
<!DOCTYPE html>
<html>

<head>
   <title>Welcome to nginx!</title>
   <style>
     body {
       width: 35em;
       margin: 0 auto;
       font-family: Tahoma, Verdana, Arial, sans-serif;
     }
   </style>
</head>

<body>
   <h1>Welcome to nginx! Edited</h1>
   <p>
     If you see this page, the Nginx web server is successfully installed and working. Further configuration is required.
   </p>

   <p>
     For online documentation and support please refer to
     <a href="http://nginx.org/">nginx.org</a>.<br />
     Commercial support is available at
     <a href="http://nginx.com/">nginx.com</a>.
   </p>

   <p><em>This file is edited</em></p>
</body>

</html>
```

We will copy this file from the host computer to the Docker container to the mounting folder we created earlier. Use this command;

```bash
cp index.html /tmp/nginx/html
```

After running the above command, refresh your browser tab, and you will see the new content.

Now let's update the file. First, go to the directory this file is located using the command below.

```bash
cd /tmp/nginx/html
```

Now edit the file using your code editor and then save it. Refresh the browser tab, and you should be able to see the changes you have applied. You now have explored how to share files from the host computer to a Docker container using a bind mount.

### Using Volume mounting

To use volume mounting to share data between the host and the container, follow the following steps;

#### Step 1: Create a volume

Start by creating a volume using this command.

```bash
docker volume create simplevol
```

to confirm if the volume was created, run;

```bash
docker volume ls
```

![volumes](/engineering-education/how-to-share-data-between-a-docker-container-and-the-host-computer/volumes.png)

#### Step 2: Container mapping

Run a Docker container mapping the volume you created above. We will use the following instructions.

- Run a container in the background with `-t -d`.
- Set a port mapping with `-P`.
- Set the name of the container with `--name`.
- Set the volume with `-v`. With the volume, we are setting it to the location where Nginx files are stored so that we can be able to edit them and see them in action.
- Use the Nginx image with `nginx:latest` to create a container.

Now run this command to execute the above parameters.

```bash
docker run -t -d -P --name nginxcont1 -v simplevol:/usr/share/nginx/html nginx:latest
```

The container is set, and it should be running. To check the status of the container run;

```bash
docker container ls
```

![containers](/engineering-education/how-to-share-data-between-a-docker-container-and-the-host-computer/containers.png)

#### Step 3: Get the IP Address of your host computer

Get the IP Address of your host computer by running the ipconfig command.

```bash
ifconfig
```

Your IP Address will be the `inet`. You will find it in your response as below:

![ip-address](/engineering-education/how-to-share-data-between-a-docker-container-and-the-host-computer/ip-address.png)

- Get the port where the container is mapped on from the previous step of checking container status in the `PORTS` column.

- With the IP address and the port, head over to your browser, open a tab, and key in the following: `http://<your_ip_address>:<your_port>`. Your page should resemble the following:

![default-nginx-page](/engineering-education/how-to-share-data-between-a-docker-container-and-the-host-computer/default-nginx-page.png)

#### Step 4: Testing

First, copy the Nginx `index.html` from the container to your host computer.

```bash
docker cp nginxcont1:/usr/share/nginx/html/index.html index.html
```

Open the file using your code editor, update it as follows and save it.

```html
<!DOCTYPE html>
<html>
   <head>
     <title>Welcome to nginx!</title>
     <style>
       body {
         width: 35em;
         margin: 0 auto;
         font-family: Tahoma, Verdana, Arial, sans-serif;
       }
     </style>
   </head>
   <body>
     <h1>Welcome to nginx! Edited</h1>
     <p>
       If you see this page, the Nginx web server is successfully installed and working. Further configuration is required.
     </p>

     <p>
       For online documentation and support please refer to
       <a href="http://nginx.org/">nginx.org</a>.<br />
       Commercial support is available at
       <a href="http://nginx.com/">nginx.com</a>.
     </p>

     <p><em>This file is edited</em></p>
   </body>
</html>
```

Push the edited file from your computer to the Docker container by running;

```bash
docker cp index.html nginxcont1:/usr/share/nginx/html
```

If you refresh the previously opened tab, the content should have updated to reflect the changes you have added.

![updated-nginx-page](/engineering-education/how-to-share-data-between-a-docker-container-and-the-host-computer/updated-nginx-page.png)

So far, you have been able to run a container with volume mounting, copy the files from the host computer to the Docker container, and vice versa. With Volume mounting, the files will remain updated even if we delete the current container. To verify this, we will:

- Stop the current container;

```bash
docker stop nginxcont1
```

- Start a different container mounting to the same volume:

```bash
docker run -t -d -P --name nginxcont2 -v simplevol:/usr/share/nginx/html nginx:latest
```

- With your IP address and the port of the newly created container, access it from the browser. You will see that the content is the updated one. This is because we have mounted it to a volume.

You have now learned about volume mounting and its data persistence.
