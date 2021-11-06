Hashing is the process of converting an input of any length into a fixed-sized string of text using a mathematical function. This means that any text can be converted into an array of numbers and letters through an algorithm, no matter how long it is. The text being converted/hashed is referred to as an input. The algorithm used to covert this string is called a hash function. The generated value is called a Hash value. A hashed text also referred to as ciphertext, is encrypted plain text. Encryption converts the original information, i.e., plain text, to an alternative form where only the authorized parties can understand it, i.e., ciphertext using an algorithm.

This guide will teach the reader about the Hash functions and illustrates how to build a Hash generator application using React.js. We will create a simple app that calculates hashes from text strings, encrypts them, and sends back the hashed text to the user.

### Pre-requisites
To follow along with this article, ensure you have the following basic requirements:

- [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge of JavaScript and React.js framework.
- Basic knowledge of cryptography, i.e., encryption.

### Overview
- [Pre-requisites](#pre-requisites)
- [Overview](#overview)
- [Setting up a React.js application](#setting-up-a-reactjs-application)
- [Setting up crypto](#setting-up-crypto)
- [Generating hashed text from user input](#generating-hashed-text-from-user-input)
- [Conclusion](#conclusion)

### Setting up a React.js application
To set up a React app, we will use the [create-react-app](https://github.com/facebook/create-react-app) tool. It does the heavy lifting of configuring webpack and babel so that you can focus on the code.

To set it up, follow the below steps:

First, create your desired project folder on your computer, then run the following command to bootstrap a React boilerplate application.

```bash
npx create-react-app hash-generator-app
```

Give it a few minutes for the application to be fully set up once the process completes. Proceed to the created project folder using the following command:

```bash
cd hash-generator-app
```

Finally, start the development server by running:

```bash
npm run start
```

The above command will start the development server on port *3000*. A default page will also be loaded from your default browser that loads a simple React Hello world page.

### Setting up crypto
As mentioned earlier, to convert the text that the user will input to an encoded text, we will need to use an encryption algorithm.

In JavaScript, the encryption algorithm is used from the crypto module. Therefore, we will need to have the crypto module installed in our application. To do this, open a separate tab from your terminal and run the following command:

```bash
npm install crypto-js
```

After the installation is complete, we are now ready to get to the fun part in the next step.

### Generating hashed text from user input
We will start by working on the form with which the user will interact. Replace the boilerplate code from the *src/App.js* file with the following:

```js
import {useState} from "react";
import './App.css';

function App() {

// user input text
const [plain_text,setPlainText] = useState("");

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

From above, we are showing the form with a field for user's input. The form is submitted when a user hits the *Generate hashed* button. Then edit *src/App.css* as such to give the form some styles:

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

After saving the changes, your page should have the following form:

![generate-hash-form](/engineering-education/build-a-hash-generator-application-using-reactjs/generate-hash-form.png)

The next step will involve working on the *onSubmit* function so that we can hash the text that the user is sending, store it in the state, and then display it.

In *src/App.js* file, import *crypto*:

```js
import crypto from "crypto-js";
```

Set a state for different *hashed_texts* we will have as below:

```js
const [aes_hashed_text,setAesHashedText] = useState("");
const [md5_hashed_text,setMd5HashedText] = useState("");
const [sha256_hashed_text,setSha256HashedText] = useState("");
```

In the *onSubmit* function, set a key, hash the text using different algorithms and set each record to state:

```js
const onSubmit = e => {
    e.preventDefault();

    // key
    let key = "my_super_secret_key";

    // aes encryption
    setAesHashedText(
    crypto.AES.encrypt(plain_text,key).toString()
    );
    
    // md5
    setMd5HashedText(
    crypto.MD5(plain_text).toString()
    );

    // sha256
    setSha256HashedText(
    crypto.SHA256(plain_text).toString()
    );

}
```

Feel free to change the key to any string you want.

For the encryption, we are using [AES](https://www.tutorialspoint.com/cryptography/advanced_encryption_standard.htm), [MD5](https://www.sciencedirect.com/topics/computer-science/message-digest-algorithm-5), and [SHA256](https://qvault.io/cryptography/how-sha-2-works-step-by-step-sha-256/) algorithms.

While using *AES*, we are encrypting utilizing the user's input and the key, whereas *MD5* and *SHA256* do not have a key. *AES* follows symmetric encryption, whereas *MD5* and *SHA256* follow asymmetric encryption.

In all cases, we are converting to string so that we can view the output.

Add the following to the form inside the *form-content* div so that you can view the generated hashed texts:

```js
    {
        aes_hashed_text ? (
        <div className="form-group">
            <label>AES</label>
            <div className="hashed-data-content">
            <input type='text' readOnly value={aes_hashed_text} />
            <button type="button" onClick={ () => copyToClipboard(aes_hashed_text)}>copy</button>
            </div>              
        </div>
        ) : null
    }


    {
        md5_hashed_text ? (
        <div className="form-group">
            <label>md5</label>
            <div className="hashed-data-content">
            <input type='text' readOnly value={md5_hashed_text} />
            <button type="button" onClick={ () => copyToClipboard(md5_hashed_text)}>copy</button>
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
            <button type="button" onClick={ () => copyToClipboard(sha256_hashed_text)}>copy</button>
            </div>              
        </div>
        ) : null
    }
```

Add the following style in *src/App.css* to cater to the hashed data display:

```css
.hashed-data-content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
```

Ensure that the development server is still running and refresh your browser's tab. Fill in a sample text and hit the *Generate hash* button. You should be able to view the hashed text as below:

![generated-hash-form-with-output](/engineering-education/build-a-hash-generator-application-using-reactjs/generated-hash-form-with-output.png)

### Conclusion
In this article, we have been able to create a hashed text generator application based on the user's input using React Js and *crypto* module.

To gain more insights about encryption algorithms and crypto, reference the following resources:

- [Symmetric/Secret key encryption](/engineering-education/secret-key-cryptography-in-js/)
- [Asymmetric/Public key encryption](/engineering-education/implementing-public-key-cryptography-in-javascript/)
- [Crypto Node.js module](https://nodejs.org/api/crypto.html)