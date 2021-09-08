---
layout: engineering-education
status: publish
published: true
url: /installing-k8-ubuntu-server/
title: How to Install a Single Node Kubernetes Cluster on Ubuntu
description: Kubernetes is not limited to being installed only on Ubuntu server. It can be installed on Linux, Windows, and even macOS.
author: gregory-manley
date: 2020-04-01T00:00:00-07:00
topics:
 - Edge Computing
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/installing-k8-ubuntu-server/hero.jpg
    alt: installing Kubernetes on ubuntu server
---
Kubernetes, or K8s, is an open-source system that is used to automate deployment, scaling and management of containerized applications. It provides a framework to run distributed systems, taking care of scaling and failover for your applications.
<!--more-->

In a recent article, I explained [what Kubernetes is](/what-is-kubernetes/) and what it can be used for. In continuation, I will show how to install a single node Kubernetes cluster on an Ubuntu server, running Ubuntu 18.04.4. For this tutorial, I am assuming you will be installing K8s on a single node. You will need a separate computer (or a VM) with an Internet browser connected to the same network to access and use the dashboard.

We will be using MicroK8s for this installation. MicroK8s is a CNCF certified upstream Kubernetes deployment that is designed
to run entirely on a workstation or edge device. All K8s services are run natively.

To get started you will need to make sure your server is updated. To do so, run the following commands:
~~~
sudo apt-get update -y

sudo apt-get upgrade -y
~~~
Now that your server is up to date, it is time to install MicroK8s. MicroK8s is a snap package and requires `snapd` to be pre-installed in order to install itself. The latest Ubuntu Desktop release comes with this already; however, other Linux systems may need to install `snapd` before proceeding. To install the latest version of MicroK8s run the following:
~~~
sudo snap install microk8s --classic
~~~
After installing MicroK8s, you need to check the status by running (output displayed below command):
~~~
sudo microk8s.status --wait-ready

microk8s is running
addons:
dashboard: disabled
dns: disabled
cilium: disabled
fluentd: disabled
gpu: disabled
helm: disabled
helm3: disabled
ingress: disabled
istio: disabled
jaeger: disabled
knative: disabled
kubeflow: disabled
linkerd: disabled
metallb: disabled
metrics-server: disabled
prometheus: disabled
rbac: disabled
registry: disabled
storage: disabled
~~~
By default all add-ons should read disabled, leaving us with a barebones upstream Kubernetes.
It is recommended to run the following in order to enable the basic Kubernetes services dashboard and kube-dns.
~~~
sudo microk8s.enable dashboard dns
~~~
Then, to check on the deployment of these add-ons, run (output displayed below command):
~~~
sudo microk8s.kubectl get pods --all-namespaces

NAMESPACE     NAME                                              READY   STATUS    RESTARTS   AGE
kube-system   coredns-588fd544bf-dv9b9                          1/1     Running   2          22h
kube-system   dashboard-metrics-scraper-db65b9c6f-5lvcj         1/1     Running   2          22h
kube-system   heapster-v1.5.2-58fdbb6f4d-2sm76                  4/4     Running   8          22h
kube-system   kubernetes-dashboard-67765b55f5-2knqj             1/1     Running   2          22h
kube-system   monitoring-influxdb-grafana-v4-6dc675bf8c-qsdct   2/2     Running   4          22h
~~~
It should take a few minutes to get all the pods in the "RUNNING" state (hint: if this is taking a while, try using the linux comand `watch` between `sudo` and `microk8s` to have the command repeated every 2 seconds).

Once all the pods show running, we are now ready to access the dashboard. First, we need to find out the internal IP of your server. Run:
~~~
hostname -I
~~~
You will want to save the first IPv4 address somewhere as it will be used later (in my case, that IP is `192.168.1.45`). Before continuing, we need to retrieve our default user information. Run:
~~~
sudo microk8s.config
~~~~
Save the username and password that are outputted at the end. Hint: This is a pretty long password. I'd recommend ssh'ing into the box and copying the password located in `/var/snap/microk8s/current/credentials/basic_auth.csv`.

Once you have the password, start the dashboard by running:
~~~
sudo microk8s.kubectl cluster-info
~~~
Now, on your other computer, open a browser and let's load the Grafana endpoint:

*https://<YOUR_INTERNAL_IP>:16443/api/v1/namespaces/kube-system/services/monitoring-grafana/proxy*

You will be asked for that username and password that we saved previously. Once authenticated, you should see something like this:

![grafana endpoint](/engineering-education/images/education/installing-k8-ubuntu/grafana.png)

Now that we have the dashboard up and running, we'll use an [available image of the microbot app](https://github.com/dontrebootme/docker-microbot) to create an actual deployment on our local cluster. Run:
~~~
sudo microk8s.kubectl create deployment microbot --image=dontrebootme/microbot:v1
~~~

You can see the newly created microbot application in your list of running pods by running (output displayed below command):
~~~
sudo microk8s.kubectl get pods --all-namespaces

NAMESPACE     NAME                                              READY   STATUS    RESTARTS   AGE
default       microbot-6d97548556-g5mcn                         1/1     Running   0          71m
kube-system   coredns-588fd544bf-dv9b9                          1/1     Running   1          118m
kube-system   dashboard-metrics-scraper-db65b9c6f-5lvcj         1/1     Running   1          118m
kube-system   heapster-v1.5.2-58fdbb6f4d-2sm76                  4/4     Running   4          118m
kube-system   kubernetes-dashboard-67765b55f5-2knqj             1/1     Running   1          118m
kube-system   monitoring-influxdb-grafana-v4-6dc675bf8c-qsdct   2/2     Running   2          118m
~~~

Now let's scale out the deployment. Run this command to increase the replica count (output displayed below command):
~~~
sudo microk8s.kubectl scale deployment microbot --replicas=5

deployment.apps/microbot scaled
~~~

Immediately after running this, re-run your `microk8s.kubectl get pods` command from above and you will see the additional instances of the microbot application being created and eventually stabilize in `Running`. Note: you can use the `-n` command to pass the namespace rather than listing all of the pods on the cluster; in this case the namespace is called default. We've successfully scaled the application on our cluster by increasing the replica count (output displayed below command).
~~~
sudo microk8s.kubectl get pods -n default

NAME                        READY   STATUS    RESTARTS   AGE
microbot-6d97548556-4k4tv   1/1     Running   0          31s
microbot-6d97548556-dt2hz   1/1     Running   0          27m
microbot-6d97548556-g5mcn   1/1     Running   0          59m
microbot-6d97548556-krb7v   1/1     Running   0          31s
microbot-6d97548556-rbxnv   1/1     Running   0          32s
~~~

Feel free to play with this value a bit and watch the cluster scale up and down based on the replica count you set. When you're finished, leave the replica set to 2 by running:

~~~
sudo microk8s.kubectl scale deployment microbot --replicas=2
~~~


Now, in order to expose our deployment, we must create it as a service:
~~~
sudo microk8s.kubectl expose deployment microbot --type=NodePort --port=80 --name=microbot-service
~~~
You can confirm that the deployment was successful, by running (output displayed below command):
~~~
sudo microk8s.kubectl get all --all-namespaces

NAMESPACE     NAME                                                  READY   STATUS    RESTARTS   AGE
default       pod/microbot-6d97548556-cprcg                         1/1     Running   0          10m
default       pod/microbot-6d97548556-g5mcn                         1/1     Running   0          17m
kube-system   pod/coredns-588fd544bf-dv9b9                          1/1     Running   1          63m
kube-system   pod/dashboard-metrics-scraper-db65b9c6f-5lvcj         1/1     Running   1          63m
kube-system   pod/heapster-v1.5.2-58fdbb6f4d-2sm76                  4/4     Running   4          63m
kube-system   pod/kubernetes-dashboard-67765b55f5-2knqj             1/1     Running   1          63m
kube-system   pod/monitoring-influxdb-grafana-v4-6dc675bf8c-qsdct   2/2     Running   2          63m

NAMESPACE     NAME                                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                  AGE
default       service/kubernetes                  ClusterIP   10.152.183.1     <none>        443/TCP                  65m
default       service/microbot-service            NodePort    10.152.183.133   <none>        80:31848/TCP             5m44s
kube-system   service/dashboard-metrics-scraper   ClusterIP   10.152.183.29    <none>        8000/TCP                 63m
kube-system   service/heapster                    ClusterIP   10.152.183.52    <none>        80/TCP                   63m
kube-system   service/kube-dns                    ClusterIP   10.152.183.10    <none>        53/UDP,53/TCP,9153/TCP   63m
kube-system   service/kubernetes-dashboard        ClusterIP   10.152.183.67    <none>        443/TCP                  63m
kube-system   service/monitoring-grafana          ClusterIP   10.152.183.194   <none>        80/TCP                   63m
kube-system   service/monitoring-influxdb         ClusterIP   10.152.183.151   <none>        8083/TCP,8086/TCP        63m

NAMESPACE     NAME                                             READY   UP-TO-DATE   AVAILABLE   AGE
default       deployment.apps/microbot                         2/2     2            2           17m
kube-system   deployment.apps/coredns                          1/1     1            1           63m
kube-system   deployment.apps/dashboard-metrics-scraper        1/1     1            1           63m
kube-system   deployment.apps/heapster-v1.5.2                  1/1     1            1           63m
kube-system   deployment.apps/kubernetes-dashboard             1/1     1            1           63m
kube-system   deployment.apps/monitoring-influxdb-grafana-v4   1/1     1            1           63m

NAMESPACE     NAME                                                        DESIRED   CURRENT   READY   AGE
default       replicaset.apps/microbot-6d97548556                         2         2         2       17m
kube-system   replicaset.apps/coredns-588fd544bf                          1         1         1       63m
kube-system   replicaset.apps/dashboard-metrics-scraper-db65b9c6f         1         1         1       63m
kube-system   replicaset.apps/heapster-v1.5.2-58fdbb6f4d                  1         1         1       63m
kube-system   replicaset.apps/kubernetes-dashboard-67765b55f5             1         1         1       63m
kube-system   replicaset.apps/monitoring-influxdb-grafana-v4-6dc675bf8c   1         1         1       63m
~~~
You can see in the output above, the `service/microbot-service` is running. Notice that your service has a ClusterIP where we can access it. Our service is of type NodePort which means that our deployment is also available on a port on the host machine but assigned to a random port. In this case, that port is 31848. From the local machine you're installing the cluster on, you can curl the resource like this:

~~~
curl http://localhost:31848
~~~

Externally, you can go back to the browser where you previously loaded the Grafana dashboard and access this service as well. *http://<YOUR_INTERNAL_IP>:<YOUR_PORT> (in my case: `http://192.168.1.45:31848`). NodePort is what exposes the service externally.

![](/engineering-education/images/education/installing-k8-ubuntu/microbot.png)

MicroK8s will run until it is stopped. If you wish stop MicroK8s at anytime, run:
~~~
microk8s.stop
~~~
and to start it again, run:
~~~
micro8s.start
~~~
Congratulations! You have now setup Kubernetes on an Ubuntu server, deployed, and scaled out your first application on it. Kubernetes is not limited to being installed only on an Ubuntu server. It can be installed on Linux, Windows, and even macOS. Many applications will be and have been developed and deployed on Kubernetes. What will you create?
