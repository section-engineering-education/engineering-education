

### Build Your Own Keys

Security is one of the most crucial things in the organizations. This starts with how the entire organizations handle their data. This article will be handling Building Your Own Keys for use in organization without third parties involvement. It will demonstrate using Azure. However, there are other services which are offering BYOK like Google. 

​                 



### Introduction

Information honesty shapes something essential in a venture and in the event of giving and taking an association feels like it back to begin line once more. Information break has turned into an imperative and every day talk in the current world with programmers releasing a great deal of information. This is all in light of the fact that feeble encryption or even unstable information which winds up on risky hands. From the dispatch of Bring Your Own Key strategy the associations and different premises will be in a situation to create and have authority over the whole key and sharing cycle. utilizing gadgets which are wealthy and alter safe will be the best way to reinforce the security. These gadgets will deal with a standard of equipment security module which will assist keep with following of the safe commodity of all keys produced. For a more secure information store consider carrying out Bring Your Own Key where you will be the pilot.

[toc]

### Getting Started

Using devices which are well off and tamper resistant will be the only way to strengthen the security. These devices will work on a principle of hardware security module which will help keep track of the secure export of all keys generated. For a safer data store consider implementing Bring Your Own Key where you will be the pilot. Security in most organizations has been getting loose day by day as technology advances. According to research there are many cybersecurity experts both ethical and unethical who are working hard to try to break the codes. This has resulted in the introduction of bring your own key mechanism to help fight this problem.

### How is BYOK different from HYOK?

In BYOK the organizations have the full mandate to secure and keep the keys to their own. This is what has been helping them to ensure they have privacy and hence able to track and monitor all the ongoing activities. Despite the upheavals where some companies are forced to upload the encryption keys to the cloud service there is an advantage. BYOK has reduced the introduction of third partties which increases the risk of data access. Moreover, it is now the role of organizations to monitor their hardware devices on how they communicate with others. 

### Importance of Introducing BYOKs

1. Data security and integrity are critical in an organization because they demonstrate the authenticity of data held.

2. Data breaches can result in a loss of revenue as well as the loss of clients owing to a lack of confidence.

3. Bring Your Own Key is a topology that is controlled at the individual level and does not rely on a third party outside the organization to keep data.

   



### Pre-requisites

1. Knowledge about cloud computing
2. An editor installed. I woudl recommend [visual studio](https://visualstudio.microsoft.com/downloads/)
3. Basic understanding of programming. 
4. A microsoft account which can be created [here](https://account.microsoft.com/account/ )

###  Data Encryption in the Cloud

To come up with BYOK there are crypto libraries which have been designed for the  solely purpose of generating the keys. These keys are randomized in a way that they are encrypted. The generated keys are in relation to the compatible certificate which are already generated. The generated certificate once compatible has a unique secret key. 

Moreover, HSMs, aids to ensure availability through the use of tough key management which has efficient storage and avoids redundancy features. This is what generates the asymmetric keys for use. 

To grant rights to the user the following commands are used on the shell or terminal. These are in line when working with azure keys



```shell
az keyvault role assignment create --hsm-name "ContosoMHSM" --role "Managed HSM Crypto User" --assignee 00000019-0000-0000-c000-000000000000 --scope /keys/contosomhsmkey
```



To configure the azure information protection to use with the key run the following commands on the terminal:

```bash
Connect-Api Service 
```

 To specify the URL run the following commands in the terminal or shell

```bash
Use-AipServiceKeyVaultKey -KeyVaultKeyUrl "/url goes in here <key-version> "
```

### Trouble shooting BYOKS

There are only two reasons why these keys might end up conflicting which is due to validitation and tampering. For instance, working with azure keys it is possible to trouble shoot and check where the errors are and in case of invalid dueness then a renew is the only solution. in the link part enter the licensing url.

```bash
LicensingIntranetDistributionPointUrl : 
```

Many companies are still unveiling the best BYOKS. Recently, Google too has come up with its system. They recently released it in beta mode and named it Cloud External Key Manager. The mission of their system is to help enterprises to leverage Google cloud services and comply with the complex regulations and policies.  These regulations will be giving them mandate to control their keys and encryptions and more over maintaining ownership.





### Conclusion

According to data analysis and mining BYOKS is all about how data is established and handled. This helps to maintain trust while working with data especially where hosting has been done remotely. this is because data handling in remote has several handling which makes it vulnerable since it is being transmitted via the Internet. 



 ### Abbreviations

- API -  Application Interface

- HSM - Hardware Security Modules(HSMs)

- BYOK - Bring Your Own Keys
