# Deploying Multiple Applications to VM with NGINX as a Reverse Proxy

## Introduction
## Goals (Optional)

## Pre-Requisites:

1. For this example, I'll be using GCP you are free to use any service you want. Make sure you have billing enabled on whichever service you are using.
2. A VM with nginx installed to deploy your applications.
3. An SSH key to connect to your deployed VM.
4. A GitHub Account with two sample repos that could be deployed( one could come up with any number of repos/projects to deploy, to keep it simple I am going with just 2 repos)
5. One could go with any Project choice of their own, for this example I will be deploying a React App and Node App, knowledge about building their app of interest is expected.
6. Not necessary but if known would be helpful: 
     Basic Linux Commands
     Basic idea about what Docker.

Step 1 — Start two apps running in different ports
Step 2 — go to cloudflare and add all the records
Step 3 - add each record for each subdomain
step 4 - setup nginx proxy at 80 for http and 443 for https
step 5 - configure the nginx conf file
step 6 - restart and tada!

## Conclusion
