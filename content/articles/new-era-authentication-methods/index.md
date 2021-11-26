### Introduction
Authentication is a process of showing that something is genuine, true, or valid. It can also be described as a way of recognizing a user's identity. It is a mechanism of association a request which is incoming while identifying credentials. The authentication process runs during the start of every application, this means before any other code has been entered. Different applications and systems require different types of authentication to ascertain the user's identity. There are distinct phases of authentication that are actual authentication and identification. The identification phase gives user identity to a security system. The system will search abstract objects that it knows and choose one which the user is applying currently, that’s how the identification will happen. Actual authentication can be traced by another abstract user object in the security system, and be given permission and right to the user while they are supposed to give evidence that they are the real owners. 
There are traditional and augmented ways of authentication. These traditional ways examples are the use of username/email and one-time password {OTP}. These augmented ways of authentication include Biometrics, U2F Keys, Digital certificate, and proximity.
### Biometrics
Facial recognition, fingerprints scans, and voice recognition all fall under one category of biometrics. The systems use this type of authentication when they need to prove you are who you claim to be. often used in security clearance areas such as government 
### Face Recognition
it is very exciting our face can be used as application password. there is nothing as unique as our face, right? Mobile applications have been using face recognition but even browsers can now use it. With face-api.js we can easily implement a face recognition system on the browser.
### Face-api.js
This is a JavaScript library used to detect faces via browser. It executes various convolutional neural networks (CNNs) such as gender and age detection, face recognition, face detection, and face landmark detection. This JavaScript library is built on top of the tensorflow.js core. It is both compatible with mobile devices and the web.
### Voice recognition
Every individual is associated with exclusive characteristics. Speech recognition is a very efficient security aspect for applications. The azure cognitive services is a great platform that serves that purpose where the speaker Recognition service can be used to identify and verify speakers by the unique individual aspects of their voices. Through Azure speech can be verified in two ways namely Text-dependent and text-independent speaker verification
### Text-dependent speaker verification
In this kind of verification, speakers should usually choose the same phrases to use during the enrollment process and verification passphrase. This can be achieved by the speaker recording their voices by saying a certain passphrase. Speaker verification API identifies voice features in recorded audio and use it to come up with distinct voice signature. The passphrase and signatures will be used to in speaker verification.   
### Text -independent speaker verification
In text-independent speaker verification, the speaker is not bound on what to speak. During the enrollment phase, voice features are extracted from the speaker audio to create a personalized voice signature. The ID associated with a speaker is sent to speaker verification API on which the voice features are checked if they correspond with the voice signature taken during the enrollment phase.  The system may reject or accept based on the similarity of the speaker tone score. The tone score should be above 0.5 to be
### Pros of biometrics
Voice recognition for instance in text-dependent speaker verification, would require one to give the actual statement they gave in enrollment as passphrases
Facial recognition would need someone to do a drastic procedure as plastic surgery to access the system which might be harder too.
Biometrics cannot be hacked easily, even something like a fingerprint would require one to have some closer physical interactions
In facial recognition, it is hugely supported by the presence of cameras in most devices.
Convenience for users anywhere and any time
### Cons of biometrics
Most people are reluctant to give their fingerprints, face, and voice to companies, but even given to companies it would be very hard for them to implement it in everyday services.
The biggest disadvantage is once you compromise biometric is compromised for life. Just like we change our phones you cannot change a face or a fingerprint. 
This authentication method will require a device with a scanner 
Biometrics can be hacked when scanners are tricked by the use of counterfeit fingerprints made on 3D printers
Compared to any other method technology is less reliable, one can pass security even with someone photos
### U2F Key
Universal 2nd Factor is an authentication method that is usually open standard, it is used with smart cards, NFC devices, and USB devices. To authenticate, you have to simply swipe a smart card, bump an NFC device, or plug in a USB key. It helps the users to access internet securely using a single security key.
### PROS OF U2F
A U2F key is a physical factor, that if it is kept in a secure place, it cannot be digitally redirected or intercepted. A U2F key is the most secure two-factor authentication method currently. This is because they can only operate in devices they are registered in.
### CONS OF U2F
It causes inconveniences since different devices use different USB ports.  For instance, if you are using an iPhone, an Android or newer MacBook a U2F key cannot work on USB-A connector without an adapter. https://www.makeuseof.com/tag/understanding-usb-cable-types-one-use/
 U2F keys that are high-end are expensive since they have built-NFC which can be used with mobile devices
U2F being a newer technology compared to other authentication method it has not yet received huge support to make it stand tall in this industry. 
### DIGITAL CERTIFICATE
This method of authentication is a digital document that is released by Certification Authority. It confirms that only the provider owns the public key or its attributes. This is what a digital certificate contains: certificate holder's name, expiration date, serial number, a digital signature of the authority that released it, a copy of the public key which belongs to the certificate holder. The digital signature is mostly used in verifying data consistency. 
### PROXIMITY
This authentication method is set to unlock devices when certain conditions are met.  For example, your house can be equipped with visual beacons of a stipulated geographical area. You are supposed to adjust your device to stay unlocked in a stipulated area. Geofencing is a virtual perimeter in a real geographical area
### Conclusion
 Authentication keep changing everyday. This authentication market has something for everyone, each method has its advantages and drawbacks. It is great to conduct research before settling on a authentication method and come up with the method which suit you best.as a result of advanced ways of authentication, it will be difficult for hackers to breach data or exploit passwords. In the new era businesses will have to operate beyond passwords and advance to augmented authentication methods to enhance user experience








