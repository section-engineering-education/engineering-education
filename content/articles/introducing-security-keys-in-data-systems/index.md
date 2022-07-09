---
layout: engineering-education
status: publish
published: true
url: /introducing-security-keys-in-data-systems/
title: Introducing Security Keys in Data Systems.
description: This tutorial discusses data security and how to implement it by introducing security keys in the systems.
author: royford-wanyoike
date: 2022-03-24T00:00:00-11:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introducing-security-keys-in-data-systems/hero.png
    alt: Introducing Security Keys in Data Systems Hero Image
---
In an organization, data is always fed in the system. This does not matter whether the company or organization is using the file management system or database to store their data.
<!--more-->
The essence matters on the security of the data. It is with due reasons that a company has to ensure that the employees are trusting in relation to the data they handle. Moreover, they need to use secured systems and devices which could hardly leak the information.

Currently, technology has introduced several blockchain methods to encrypt data. All these are for security purpose to ensure more layers of security are implemented.

This article will be guiding on how an organization can create their own keys to come up with a secure mechanism to store data. When the keys are kept safe and only accessible to authorized personnel, the risk for data leakage is low.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Introduction to data security](#introduction-to-data-security)
  - [Types of keys for securing data](#types-of-keys-for-securing-data)
    - [Hold Your Own Keys (HYOK)](#hold-your-own-keys-hyok)
    - [Bring Your Own Keys](#bring-your-own-keys)
  - [Pros and Cons of the different Keys](#pros-and-cons-of-the-different-keys)
- [Causes of data leakage](#causes-of-data-leakage)
- [Building your own key](#building-your-own-key)
- [Importance of introducing BYOKs](#importance-of-introducing-byoks)
- [Application and implementation.](#application-and-implementation)
- [Troubleshooting BYOKs](#troubleshooting-byoks)
- [Conclusion](#conclusion)

### Prerequisites
1. A clear understanding of cloud computing.
2. An editor installed. [Visual Studio Code](https://visualstudio.microsoft.com/downloads/) is recommended.
3. A Microsoft account which can be created [here](https://account.microsoft.com/account/).

### Introduction to data security
Data security is a virtue which should be embraced in all organizations. It begins from the highest level to the lowest level of the organization. Data breach - which mostly occurs when there is a vulnerability ruins a company standards hence a degrade in services.

Data leakages has been the news of the town with every day reports of company exposing millions of crucial data. This happens due to poor data encryption techniques. Using your own security which is more of Two-factor authentication (2FA) will help a lot to improve security.

Security in most organizations has been getting weaker by the day as technology advances. There are many cyber security experts, both ethical and unethical today that are working hard to try to break the codes. Thus the need resulted in bringing your own key mechanism.

The keys used to secure data are stored in the cloud. This is because cloud services are easy to access remotely from any place.

#### Types of keys for securing data
Data storage has shifted 90% if not wholly to cloud storage. With remote access and network infrastructure, people now don't have to drop by the office to access data.

In the cloud previously, there were two keys used to secure data online. These are Hold Your Own Key( HYOK) and the recent one Build Your Own Key (BYOK). Below is an explanation for the both.

##### Hold Your Own Keys (HYOK)
This key uses a concept which is based on a trusted model. The flow of the data is based on the fact that it has to pass via a trusted model.

Here, the data providers chose to have the key remain with the cloud service provider or they can keep it. Therefore, the third party have the access to the data.

##### Bring Your Own Keys
This key is totally different from the other as it does not rely on any third party for storage. The key is hosted inside the cloud provider unlike the other one which is stored with the enterprise holding the cloud service.

#### Pros and Cons of the different Keys
1. In BYOK, the keys are safe and there is no chance of access to the data by any third party unless there is a vulnerability. On the contrary, HYOK keys remain with the enterprise and access security is not guaranteed.
2. In BYOK, the keys are secure when with the managerial department while in HYOK there is no guarantee.
3. In BYOK, management is easy as compared to HYOK where third parties can intrude without the knowledge of the owners. This makes the tracking of audits more complicated.

### Causes of data leakage
Data leakage in an organization takes place when there is poor managerial of services. Most of them is due to ignorance and shared ownership.

BYOK attempts to overcome these issues which are now to be laid on one hand. It is the cloud security team which would be reliable in case of any tamper.

### Building your own key
Coming up with your own key is essential to ensure that the crypto libraries required are installed. In this tutorial we will be working with Azure. It is the most common hosting platform and the one used by most parties.

This library plays a crucial role in generating the keys. The generated keys are then shuffled in a way that guessing the pattern cannot be easy. The generated keys concern the compatible certificate. The generated certificate, once compatible, has a unique secret key.

Moreover, HSMs aids in ensuring availability through the use of tough key management. They need to have efficient storage and avoid redundancy features. This is what generates the asymmetric keys for use.

To grant rights to the user, the following commands are used on the shell or terminal. These are in line when working with azure keys:

```shell
azure keyvault role assignment
create
--hsm-name "Royford-Wanyoike" -
-role "Managed HSM Crypto User"
--assignee 00000019-0000-0000-c000-000000000000 --scope /keys/royfordwanyoikekey
```

The next step is to configure the generated azure data. This will require keys which will be generated below after connecting with the API. The following commands are run on the shell terminal:

```bash
 Connect-Api Service
```

The next step is to specify the URL which will be used. The following command applies:

```bash
 Use-AipServiceKeyVaultKey -KeyVaultKeyUrl "
 /url goes in here <key-version> "
```

### Importance of introducing BYOKs
1.  Data security and integrity are critical in an organization. This is because it will show the authenticity of the data held.
2.  Data breaches can result in a loss of revenue and the loss of clients owing to a lack of confidence.
3.  Bring Your Own Key is a topology controlled at the individual level. It does not rely on a third party outside the organization to keep data.

### Application and implementation.
In the tutorial above, we have generated keys using some few commands. The keys generated can now be used to configure and ensure that data is safe. The cloud engineers now have the role to ensure they practice integrity.

### Troubleshooting BYOKs
There are only two reasons why these keys might end up conflicting. These are due to validation and tampering. For instance, working with azure keys it is simple to troubleshoot.

It is also easy to check where the errors are and in case of invalid dueness then a renew is the only solution. In the link, the part enters the licensing URL:

```bash
 LicensingIntranetDistributionPointUrl:
```

Many companies are still unveiling the best BYOKS. Recently, Google, too, has come up with its system. They recently released it in beta mode and named it Cloud External Key Manager. The mission of their system is to help enterprises leverage Google cloud services.

Secondly, to follow the complex regulations and policies. These regulations will be giving them the mandate to control their keys. Additionally, they will encrypt and maintain ownership.​

### Conclusion
According to data analysis and mining BYOKS is all about how data is established and handled. This helps to maintain trust while working with data especially where hosting has been done remotely. This is because data handling in remote has several handling which makes it vulnerable since it is being transmitted via the Internet.

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
