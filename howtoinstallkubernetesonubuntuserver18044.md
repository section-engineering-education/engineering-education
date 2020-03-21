## How to Install Kubernetes on Ubuntu Server 18.04.4

In a recent article, I explained what Kubernetes is and what it can be used for. In continuation, I will show how to install Kubernetes on an Ubuntu Server, running Ubuntu 18.04.4. For this tutorial, I am assuming you will be installing K8 on a single node. You will need a separate computer with an internet browser connected to the same network to access and use the dashboard.

To get started you need to make sure your server is updated. To do such, run the following commands:

<code>sudo apt-get update -y</code>

<code>sudo apt-get upgrade -y</code>

Now that your server is up to date, it is time to install MicroK8s. MicroK8s is a snap package and required snapd to be installed in order to install itself. The latest Ubuntu release comes with this already and other Linux systems may need to install snapd before proceeding. To install the latest version of MicroK8s run the following:

<code>sudo snap install microk8s --classic</code>

After installing MicroK8s you need to check the status, run:

<code>sudo microk8s.status --wait-ready</code>

By default all addons should read disabled, leaving us with a barebones upstream Kuernetes. It is recommended to run the following in order to enable basic Kubernetes services dashboard and kube-dns.

<code>sudo microk8s.enable dashboard dns</code>

Then, to check on the deployment of these addons run:

<code>sudo microk8s.kubectl get all --all-namespaces</code>

It should take a few minutes to get all pods in the "Running" state.

Once all the pods are running we are now ready to access the dashboard. First, we need to found out the internal IP of your server. Run:

<code>hostname -I</code>

You will want to save the first IPv4 address somewhere as it will be used later. 

Before continuing, we need to retrieve our default user information. Run:

<code>sudo microk8s.config</code>

Save the username and password that are outputed at the end. Then to start the dashboard run:

<code>sudo microk8s.kubectl cluster-info</code>

Now on that other computer open a browser and go to the following address:

https://yourInternalIP:16443/api/v1/namespaces/kube-system/services/monitoring-grafana/proxy

You will be asked for that username and password that we saved previously. Now that we have the dashboard up and running we can create a microbot deployment using two pods. Run:

<code>sudo microk8s.kubectl create deployment microbot --image=dontrebootme/microbot:v1</code>

<code>sudo microk8s.kubectl scale deployment microbot --replicas=2</code>

Now in order to expose our deployment we must create it into a service.

<code>sudo microk8s.kubectl expose deployment microbot --type=NodePort --port=80 --name=microbot-service</code>

Run <code>sudo microk8s.kubectl get all --all-namespaces</code> to check on the deployment and you should see the microbot-service is running at a random port, having the form 80:port. You can view the deployment by going to http://yourInteralIP:port on the other computer.

![](https://newsitech.weebly.com/uploads/2/0/5/4/20542424/microbot_orig.png)

MicroK8s will run until it is stopped. If you wish at anytime to stop MicroK8s run:

<code>microk8s.stop</code>

and to start it again run:

<code>micro8s.start</code>

Congratulations you have now setup Kubernetes on an Ubuntu Server and deployed your first application on it. Kubernetes is not limited to being installed only on Ubuntu Server. It can be installed on Linux, Windows, and even macOS. Many application will be and have been developed and deployed on Kubernetes, what will you create?
