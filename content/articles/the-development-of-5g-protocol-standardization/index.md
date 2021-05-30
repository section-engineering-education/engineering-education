---
layout: engineering-education
status: publish
published: true
url: /the-development-of-5g-protocol-standardization/
title: The Development of 5G Protocol Standardization
description: This article will describe the 5G new technologies such as the NextGen core network and NR, defined in Rel-15 and Rel-16, the LTE evolution, 5G network model, and 5G security.
author: ruth-mare
date: 2021-02-24T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/the-development-of-5g-protocol-standardization/hero.jpg
    alt: 5G cover image 
---
[**5G Protocol standardization**](https://www.ericsson.com/en/future-technologies/standardization/5g-standardization) is the process of tailoring the 5G technology to serve the market requirements and even more, by introducing new applications and services besides the traditional services introduced by the initial mobile networks such as 1G, 2G, 3G, and 4G. 
<!--more-->
The 5G standardization process has been a responsibility of OTSA (Open Trial Specification Alliance), which was tasked to accelerate the standardization and commercial deployment process of 5G. The standardization process adopted new 5G technologies such as New Radio (NR) and NextGen Core, while some stemmed from the initial mobile technologies such as Long Term Evolution (LTE).

### Overview
This article will cover:
- [Introduction to 5G protocol standardization](#Introduction-to-5G-protocol-standardization)
- [5G networking mode](#5G-networking-mode)
- [Development of uRLLc and mMTC](#Development-of-uRLLc-and-mMTC)
- [5G Network security](#5G-Network-security)

### 1) Introduction to 5G protocol standardization
#### 3GPP (3rd Generation Partnership Project) Releases
3GPP comprises of several Releases, among which are;
-	R99.
-	Rel-4 to Rel-16.
-	The newly proposed Rel-17 and Rel-18.

Rel-14 and all the initial releases define the previous mobile networks such as 4G, 3G, 2G, and 1G. LTE is defined from Rel-8, LTE-A is from Rel-10, and LTE-A Pro is from Rel-12, to mention just but few recent releases.

#### 3GPP 5G Releases
5G is defined in 3GPP Release 15 (Rel-15) and Release 16 (Rel-16), which constitute the following:
1. NextGen Core (NGC) network.
2. New Radio (NR).
3. LTE Advanced Pro Evolution.
4. EPC Evolution.

Among the 5G, new technologies are New Radio and NextGen Core network.

Other technologies that have been improved from some of the preceding Releases of 3GPP are EPC Evolution and LTE Advanced pro Evolution. 

Below is the description of the Releases of 5G:

#### Rel-15
It is popularly considered the basic version of 5G.

It is phase 1 of the 5G system that implemented the following improvement on NR:

*Construct the NR technical framework*
-	New waveform - the F-OFDM technology is used.
-	Coding modulation and channel.
-	Massive MIMO (Multiple Input Multiple Output) - supports up to 64T64R.
-	Numerology, frame structure - refers to the change of the timeslot length and frame structure caused by different subcarrier spacing.
-	Flexible duplex - the uplink and downlink configurations are flexible. Also, the uplink and downlink can be included in the same timeslot.

*Network architecture ready*
-	Non-standalone/Standalone.
-	Uplink and downlink decoupling.
- CU-DU high-level segmentation.

*Industry basic design*
-	URLLc (Ultra-Reliable Low Latency Communication).

The implementation of the 5G protocol in Rel-15 underwent a transition through stages, which was split into three stages, as outlined below:

**Early Rel-15 drop:** This stage focused on the third architecture option, also known as non-standalone NR (NSA NR). It employed the use of an LTE-A system of LTE base stations (called eNB) added to NR base stations (called gNB) and an Evolved Packet Core network (EPC) without any involvement of 5G core network (NGC). This phase of the Rel-15 standard was frozen in Dec 2017.

**Regular Rel-15 freeze:** This stage focused on the standalone NR architecture option 2, a connection of NR base stations (called gNB) to the 5G core network (called NGC) without involving any LTE. Apart from option 2 architecture, the option 5 architecture was also completed in this phase; this phase of the Rel-15 standard was frozen in June 2018.

**Late Rel-15 drop:** This stage focused on architecture option 4, which employs the deployment of an LTE base station to a Standalone NR network such that the control plane is managed via the NR base station. Also, architecture option 7, which employs the deployment of an LTE base station to a Standalone NR network such that the control plane is managed via the LTE base station together with NR-NR dual connectivity. This phase of the Rel-15 standard was frozen in Dec 2018.

#### Rel-16
Rel-16 is phase 2 of the 5G system, which considered the following New Radio improvement:
*Continuously improve NR competitiveness by implementing;*
-	Self-backhaul and integration with access for NR.
-	EMBB sub6GHz enhancement.
-	New multiple access, such as SCMA.

*Pioneering industry digitalization*
- URLLc enhancement.
-	MMTC (Massive Machine Type Communication).
-	D2D - A device can communicate with another device without a network. 
-	V2X - the vehicle to everything technology with NR side link.
-	Unlicensed.

The freeze of Rel-16 stage 3 took place in June 2020.

### 2) 5G networking mode
*5G Phase 1.1* launched 5G non-standalone networking architecture (NSA), which uses a combination of NR and EPC together with the MSA (Multiple Stream Aggregation) technologies to facilitate collaboration between the two modes.

MSA enables a terminal to use multiple base stations of different or the same standards for data transmission.

In NSA, NR has an independent user plane but not the control plane.

*5G Phase 1.2* launched the 5G independent network architecture, i.e., Stand-Alone (SA), employing NR and NGC networks.

The features of this SA architecture are:
-	Supporting new services such as uRLLc and mMTC.
-	Require the deployment of NGC, and the deployment period is long.
-	Decoupling from the existing 4G network.
-	Requiring continuous coverage for 5G base stations.

### 3) Development of uRLLC and mMTC
The improvement in Rel-15 functions to Rel-16 provides a complete uRLLc low latency and highly reliable capabilities.

URLLC service explores the industry's network requirements and further improves standards, technologies, and deployment specifications. Some major applications of this advantage are the Internet of Things (IoT), virtual reality, Augmented Reality, Mixed Reality, and many more.

In mMTC, 5G will coexist with NB/eMTC, which may be improved in the future NR system.

Other applications, such as NB IoT/eMTC technology, are still evolving.

### 4) 5G network security
The goal of 5G [**network security**](https://www.paloaltonetworks.com/cyberpedia/what-is-5g-security) is to protect user data and enable network resilience and business continuity. To ensure this, 5G has designed security measures that address many of the threats faced in today’s 4G/3G/2G networks and meet network security demands. 

Some of the demands on network security are as follows:
- Availability: The identification of illegal attacks and reduction of their impact.
- Traceability: Recording of operations for security audit and problem identification.
- Integrity and Confidentiality: Protection of user privacy information, user communication data, and operator's principal data.

The security measures try to ensure the above by implementing the following:
-	Enhanced security.
-	Stronger security on the air interface; the user plane has integrity protection by anti-alter, unlike 4G that is prone to user plane attack.
-	User privacy protection such that the users' IMSI is encrypted, unlike 4G, transmits user IMSI in plaintext.
-	Improved interconnection security by implementing end-to-end protection between PLMNs, unlike 4G that is similar to SS7 attacks.
-	Improved cryptographic algorithm using a 256-bit cryptographic algorithm vis-a-vis 4G that uses a 128-bit cryptographic algorithm.

### To wrap up
5G, unlike the preceding mobile networks, provides preventive security measures rather than curative measures to limit the impact to known threats. However, the adoption of new network technologies introduces potential new threats for the industry to manage.

### Relevant resources
- [Securing the 5G era](https://www.gsma.com/security/securing-the-5g-era/)
- [3GPP Releases](https://www.3gpp.org/specifications/releases)
- [5G](https://www.etsi.org/technologies/mobile/5g?jjj=1610802649669)
- [5G Huawei](https://e.huawei.com/en/talent/#/search-page?productName=&type=HALP)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
