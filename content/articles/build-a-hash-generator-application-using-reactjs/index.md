---
layout: engineering-education
status: publish
published: true
url: /build-a-hash-generator-application-using-reactjs/
title: React.js Hash Application Generator
description: This guide will walk the reader through Hash functions and illustrates how to build a Hash generator application using React.js. We will create a simple app that calculates hashes from text strings, hash them, and send back the hashed text to the user.
author: moses-maina
date: 2021-11-26T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/build-a-hash-generator-application-using-reactjs/hero.png
   alt: Reactjs Hash Application Generator Image
---
Hashing is converting an input of any length into a fixed-sized string of text using a mathematical function. This means that we can convert any text into an array of numbers and letters through an algorithm, no matter how long it is. The text being converted/hashed is referred to as an input. The algorithm used to covert this string is called a hash function. 
<!--more-->
The generated value is called a Hash value. A hashed text is also referred to as digest. Hashing converts the original information, i.e., plain text, to an alternative form where only the authorized parties can understand it.

This guide will walk the reader about the Hash functions and illustrates how to build a Hash generator application using React.js. We will create a simple app that calculates hashes from text strings, hash them, and sends back the hashed text to the user.

### Prerequisites
To follow along with this article, ensure you have the following basic requirements:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Some basic knowledge of working JavaScript and React.js framework.
- Understand the concept of cryptography.

### Overview
- [Prerequisites](#prerequisites)
- [Overview](#overview)
- [Different types of Hash functions](#different-types-of-hash-functions)
- [Characteristic of a Good Hash function](#characteristic-of-a-good-hash-function)
- [Encryption vs. Hashing](#encryption-vs-hashing)
- [Setting up a Hash Generator using React.js](#setting-up-a-hash-generator-using-reactjs)
- [Setting up Crypto](#setting-up-crypto)
- [Generating hashed text from user input](#generating-hashed-text-from-user-input)
- [Conclusion](#conclusion)

### Different types of Hash functions
Hash functions, also known as hash algorithms, create digital fingerprints and signatures. A hash function maps arbitrary strings. It breaks it up. Then these arbitrary strings of data will get mapped to a fixed-length output. 

Even if the size of the input strings is changed, the output strings or the hash remains of the same length for a particular hash function. You can use different types of hash functions to hash any input values. Some of the popular hash functions include:

- Message Digest (MD)

It's a hash function that produces a 128-bit hash value. It accepts an input of any length, and it returns as output a fixed-length digest value used for authenticating the original messages. Digest size is always 128 bits, irrespective of the input. MD5 was designed as an improvement to a prior MD4 message-digest algorithm.

- Secure Hash Function (SHA)

Secure Hash Algorithms, also known as SHA, are a family of cryptographic hash functions designed to keep secure data developed by the National Security Agency (NSA). It does so by converting the data into a hash. It uses a modular algorithm that accepts various bitwise operations and compression functions. There are different SHA family hash functions. 

These include:

1. SHA-0 - This algorithm generates a 160-bits string value as the hash. It developed weaknesses, and its algorithm didn't become very popular, and SHA-1 was designed to correct its weaknesses.

2. SHA-1 - SHA-1 is the most widely used type of hash function. It is used in various applications and protocols such as Secure Socket Layer (SSL). In 2005, a method was discovered to detect collisions with SHA-1 algorithms within a reasonable time frame.

3. SHA-2 - The SHA-2 family has four variants, namely, SHA-224, SHA-25, SHA-256, and SHA-512. There have been no successful attacks reported in this family. Although SHA-2 is a strong hashing function, its basic design is still based on SHA-1. This prompted the National Institute of Standards and Technology to call for new competitive hash functions.

4. SHA-3 - In October 2012, the National Institute of Standards adopted the Keccak algorithm for the SHA-3 cryptographic standard. This algorithm features many advantages, such as better performance and better resistance against attacks.

### Characteristic of a Good Hash function
- It should be easy to convert the input to its digest but not vice versa.

- The hashes should always look random. This means that if you change one value anywhere in the input string, the whole digest should change, the hash digest should change. There should be no pattern between changes in text and changes in the hash. It changes to another utterly random value.

- Free collisions - finding a duplicate of another generated hash value should be practically impossible.

- It should not be expensive. A good hash function should be computationally efficient because it should be practical when applied in an application.

- It should have the capacity to hash different kinds of data. For example, although this guide hashes text, a good hash function should hash other data inputs such as files. With this, we can track if a file has been changed. With such properties, you can notice if a file has been changed, given that changes to a single bit of that file will generate a whole different hash value.

### Encryption vs. Hashing
Although the process of hash function uses the hashing algorithms to generate the hash value, they are primarily used for comparison, not for encryption purposes. One thing to note is that hashed outputs are generated in a public fashion. So everything is public. There's no secrecy.

Encryption is a particular type of encoding used to transfer private data. In encryption, the data to be encrypted is transformed using encryption algorithms like Rivest-Shamir-Adleman (RSA) using a cipher method. Thus, the encrypted data is also called the ciphertext. 

Unlike the hash, ciphertext and be decoded and converted to the actual original input. Thus, ciphertext facilitates a private/secret sharing of data. In this case, the sender encoded the original data and sent it as ciphertext. The recipient will decode the sent ciphertext and convert it to plaintext to understand the shared message.

Hashed data is non-reversible. For example, when hashing is being used for logging system purposes. Once the user logins, the partial password is hashed using a hashing algorithm that checks against the database. 

If the hash keys are the same, the user is given login permission, achieving integrity. These processes are all non-reversible. If you hash a word, a password, or file, you can't take that hash value and then find out what the original input was.

Ciphertext length varies. A ciphertext length depends on the length of the messages being shared. So if the messages are long, the ciphertext will be generated based on the input text. However, a hash will always have the same length based on the used hash function. 

For example, if you were to hash a single word and an entire book with a hash function, you would still get the same length of the different hash values.

### Setting up a Hash Generator using React.js
We will use the [create-react-app](https://github.com/facebook/create-react-app) tool to set up a React app. It does the heavy lifting of configuring Webpack and Babel so that you can focus on the code to scale up the application.

First, create your desired project folder on your computer, then run the following command to bootstrap a React boilerplate application.

```bash
npx create-react-app hash-generator-app
```

Give it a few minutes for the application to be fully set up once the process completes. Proceed to the created project folder using the following command:

```bash
cd hash-generator-app
```

Then, start the development server by running:

```bash
npm run start
```

The above command will start the development server on port `3000`. A default page will also be loaded from your default browser that loads a simple React Hello world page.

### Setting up Crypto
As mentioned earlier, to convert the text that the user will input to an encoded text, we need to use a hashing algorithm.

In JavaScript, the hashing algorithm is used from the Crypto module. Therefore, we need to have the Crypto module installed in our application. To do this, run the following command.

```bash
npm install crypto-js
```

### Generating hashed text from user input
We will start by setting up a form where the user will add some text. But, first, replace the boilerplate code in your `src/App.js` file with the below code block.

```js
import { useState } from "react";
import './App.css';

function App() {

    // user input text
    const [plain_text, setPlainText] = useState("");

    // submit handler
    const onSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="App">

            <form className="form" onSubmit={onSubmit}>

                <div className="form-content">

                    <div className="form-group">
                        <label>
                            Sample text
                        </label>
                        <input type="text" placeholder="Enter any text" value={plain_text} onChange={
                            (e) => setPlainText(e.target.value)
                        } />
                    </div>


                    <div className="form-group">
                        <button className="submit-btn" type="submit">
                            Generate hashed
                        </button>
                    </div>

                </div>

            </form>

        </div>
    );
}
export default App;
```

We show the form with a field for the user's text input. The form is submitted when a user hits the `Generate hashed` button. Then edit `src/App.css` as such to give the form some styles.

```css
.App {
    text-align: center;
}

.form{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-content{
    padding: 15px;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    width: 45%;
    margin: 0px auto;
    text-align: left;
}

.form-group{
    display: block;
    width: 100%;
    margin: 10px 0px;
}

.form-group label{
    display: block;
    width: 100%;
    margin: 5px 0px;
}

.form-group input[type="text"]{
    width: 99%;
    padding: 7px 5px;
}
```

After saving the changes, your page should have the following form.

![generate-hash-form](/engineering-education/build-a-hash-generator-application-using-reactjs/generate-hash-form.png)

The next step will involve working on the `onSubmit` function to hash the text that the user is sending, store it in the state, and display it.

In the `src/App.js` file, import the Crypto module and set states for different hash functions, as shown below.

```js
import crypto from "crypto-js";

const [aes_hashed_text,setAesHashedText] = useState("");
const [md5_hashed_text,setMd5HashedText] = useState("");
const [sha512_hashed_text,setSha512HashedText] = useState("");
const [sha256_hashed_text,setSha256HashedText] = useState("");
const [sha3_hashed_text,setSha3HashedText] = useState("");
```

In the `onSubmit` function, set a key, hash the text using different algorithms and set each record to `state`.

```js
const onSubmit = e => {
    e.preventDefaul

    // md5
    setMd5HashedText(
        crypto.MD5(plain_text).toString()
    );

    // sha512
    setSha512HashedText(
        crypto.SHA512(plain_text).toString()
    );

    // sha256
    setSha256HashedText(
        crypto.SHA256(plain_text).toString()
    );

    //sha3
    setSha3HashedText(
        crypto.SHA3(plain_text).toString()
    );

}
```

Here we are using [MD5](https://www.sciencedirect.com/topics/computer-science/message-digest-algorithm-5), [SHA512](https://medium.com/@zaid960928/cryptography-explaining-sha-512-ad896365a0c1). [SHA256](https://qvault.io/cryptography/how-sha-2-works-step-by-step-sha-256/) and [SHA3](https://www.movable-type.co.uk/scripts/sha3.html). Feel free to change the hash function to any string you want to generate.

All the algorithms above use asymmetric encryption, meaning they do not use any key during hashing. In all cases, we are converting to string to view the output.

Add the following to the form inside the `form-content` `div` so that you can view the generated hashed values.

```js
{
    md5_hashed_text ? (
        <div className="form-group">
            <label>md5</label>
            <div className="hashed-data-content">
                <input type='text' readOnly value={md5_hashed_text} />
                <button type="button" onClick={() => copyToClipboard(md5_hashed_text)}>copy</button>
            </div>
        </div>
    ) : null
}

{
    sha512_hashed_text ? (
        <div className="form-group">
            <label>SHA512</label>
            <div className="hashed-data-content">
                <input type='text' readOnly value={sha512_hashed_text} />
                <button type="button" onClick={() => copyToClipboard(sha512_hashed_text)}>copy</button>
            </div>
        </div>
    ) : null
}

{
    sha256_hashed_text ? (
        <div className="form-group">
            <label>SHA256</label>
            <div className="hashed-data-content">
                <input type='text' readOnly value={sha256_hashed_text} />
                <button type="button" onClick={() => copyToClipboard(sha256_hashed_text)}>copy</button>
            </div>
        </div>
    ) : null
}

{
    sha3_hashed_text ? (
        <div className="form-group">
            <label>SHA3</label>
            <div className="hashed-data-content">
                <input type='text' readOnly value={sha3_hashed_text} />
                <button type="button" onClick={() => copyToClipboard(sha3_hashed_text)}>copy</button>
            </div>
        </div>
    ) : null
}
```

Add the following style in `src/App.css` to format the displayed hashed values.

```css
.hashed-data-content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
```

Ensure that the development server is still running and refresh your browser's tab. If the server is not running, start using `npm run dev` and open `http://localhost:3000/` in your browser. Fill in a sample text and hit the `Generate hash` button. You should be able to view the hashed text as shown below.

![generated-hash-form-with-output](/engineering-education/build-a-hash-generator-application-using-reactjs/generated-hash-form-with-output.png)

### Conclusion
To be considered cryptographically secure, the hash functions should be impossible for an attacker to generate a message that matches a specific hash value. A slight change in the plaintext should trigger a drastic difference in the two digests. 

This way, it is impossible for an attacker to create two messages that produce the same hash value. So there is no way to regenerate the plain text.

In this article we learned how to create a hashed text generator application based on the user's input using React and the Crypto module.

To learn more about these algorithms and Crypto, check the following resources:
- [Understanding Hashing in Cryptography](/engineering-education/understand-hashing-in-cryptography/)
- [How Password Hashing Occurs](/engineering-education/how-password-hashing-occurs/)
- [What Is MD5 and Why Is It Considered Insecure?](/engineering-education/what-is-md5/)
- [Hapi Validation, Bcrypt Hashing, and JWT in Action](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/)
- [Symmetric/Secret key encryption](/engineering-education/secret-key-cryptography-in-js/)
- [Asymmetric/Public key encryption](/engineering-education/implementing-public-key-cryptography-in-javascript/)
- [Crypto Node.js module](https://nodejs.org/api/crypto.html)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
