### Introduction
Nowadays, many people store a lot of sensitive information on their phones, laptops, and other gadgets. To ensure that this information is safe, the users often set secret passwords, pins, and even biometric sensors like a fingerprint to limit access to the information.

In this tutorial, we will specifically look at password protection of data. We are going to see how passwords are converted into hash form and stored. We will further see how passwords are retrieved from hash form to raw format.

### What is password hashing?
Storing a raw password in a device may be insecure since a third unauthorized party may access it remotely. This calls for password hashing.

`Password Hashing` is the process of converting a raw password into a series of characters that cannot be easily interpreted by a human or decoded any fast by an unauthorized machine.

### Hashing Algorithms
Hashing can be successfully achieved by the use of different formats also considered as different types of `Hashing Algorithm`. 

#### How does Hashing Algorithm achieve this?
- The hashing algorithm converts plain text entered by the user eg. `test123` into series of scrambled characters such as `i7def35tvwu4i7v43dfgb23ieeb4` that can only be decoded by itself during the retrieval process.

- The strength of the password is determined by the complexity of the plain text entered. The simpler the plain text the easier the password to crack and vise versa.

There are several hashing algorithms, however, we will discuss some of the commonly used algorithms.

Below is a list of different formats that can be applied during the password hashing process.

- `SHA (Secure Hashing Algorithm)` - This is the default hashing algorithm that converts plain passwords into hashed passwords of 256-bit size. Different versions depend on the size of the password hash it produces. For instance, `SHA1` produces a password hash of 160 bits whereas `SHA2` gives an output of 256 bits.

- `SSHA (Salted Secure Hashing Algorithm)` - This Hashing Algorithm is similar to SHA only that it involves adding random characters into the raw password to generate a different hash from the intended hash. This process is known as salting.

- `MD5 (Message-Digest Algorithm)` - This format is the fifth version of the Message-Digest Algorithm. It is similar to SHA only that it produces a string of size 128 bits. This was the commonly used Hashing Algorithm until it was noted that MD5 generates the same hash for two different passwords. This limitation is known as `collision`. This called for other password hashing algorithms.

### Practical example
We are going to use a practical example to see how password hashing occurs.

In this case, we will use the `SHA-256 hashing algorithm` and `Python`. To make it simpler, we will use [replit.com website](https://replit.com/languages/python3).

Just like any IDE, `replit` allows you to write, run and save code. For our case, we will run a code on the platform and see its output. Be Keen to note every line of code since it explains the steps that take place during hashing.

First, navigate to the website [replit.com](https://replit.com/languages/python3). 

Let's import the `sha256` constructor from the `hashlib module` by running the command below.

```python
    from hashlib import sha256
```

Now, let's instantiate the `sha256` class.

```python
    h = sha256()
```

Using the `update()` method, we will then update the hash object.

```python
    h.update(b'test123')
```

Then use the `hexdigest()` method to digest the string passed via the `update()` method.

```python
    hash = h.hexdigest()
```

Lastly, print the `hash` variable to output the result that happens to be the hashed form of the input text.

```python
    print(hash)
```

You can run the complete script once as shown below:

```python
    from hashlib import sha256
    h = sha256()
    h.update(b'python1990K00L')
    hash = h.hexdigest()
    print(hash)
```

Run the script and you will get an output as shown below:

```bash
   f84ad825bc3e5ccc7f5e35b6a5e83cb79a998f106e79410ae382c7d43019b6d6
```

**Summary**

This process allows you to give input of a string that represents the password and you receive a hashed output.

**Input**

```bash
example321
```

**Output**

```bash
f84ad825bc3e5ccc7f5e35b6a5e83cb79a998f106e79410ae382c7d43019b6d6
```

A visual representation of the code input and output is as shown below:

![Python Script](/engineering-education/how-password-hashing-occurs/script.png)

### Storing password hash
Let's now take a look at how password hashes are stored in our machines - both on Windows and Kali Linux. 

#### On Windows 

On the Windows OS, password hashes are stored in a folder in the `C:` drive. It is problematic to open these files on a running machine since they are encrypted using a boot key.

The path to the files is:

`C:/Windows/System32/config/SAM`

`C:/Windows/System32/config/SYSTEM`

#### On Kali Linux

Kali Linux, on the other hand, stores its password hash in the `etc/shadow` file which is only in a readable form. To access the files, you should have the root access.

### Password Hashing Mechanisms

- **Salting**

Salting is the process where random characters are added into passwords so that the hash generated is more complex and harder for an unauthorized party to crack.

Hackers have noticed that most users use a combination of common names or names of their pets to generate passwords. This posed a threat since hackers made a list of commonly used words known as a `dictionary`. They then generated the hashes of these words and use them to match the password hashes stored by users. If a match is found, the hacker would just decode the hash to a word in the dictionary to get the plain text password.

To solve this, it is recommended that you set a strong password that is not common and hard to decode. That is where password salting comes in. You add a series of random characters into your original password and the hash generated will be different from the initial password hash expected.

- **Peppering**

For an instance where a hacker has exploited an SQL injection vulnerability, they will have full access to your password hash whether salted or not. To solve this problem, the user adds encryption to the hashed password with a symmetrical encryption key. This Key is referred to as the `pepper`.

The key is not stored in the database as the password hash since we assume in this case that the attacker has access to the database.

### Password protecting yourself
With the knowledge of password hashing and cracking, lots of accounts have and are in danger of access by unauthorized parties. This calls for your awareness to protect your data and accounts by using strong passwords.

Let's see how we can achieve this.

- **Use a multi-character password**

A strong password means that when you're setting up your password, use an unpredictable pattern. This includes a mixture of `letters`, `numbers`, and `symbols` in your password. This will generate a complex hash that won't be easily decoded and a password that cannot be brute-forced in any case.

> Tip: Avoid using characters in your name or predictable numbers.

- **Change your password frequently**

Changing your Password frequently will synchronize your password hash and this will be safer for you as it will lower any odds of it being decoded by a hacker or any threat.

If you want to learn how password cracking occurs, go through the [Password cracking with John the Ripper](https://www.section.io/engineering-education/password-cracking-with-john-the-ripper/) tutorial.

### Conclusion
In this tutorial, we have learned the following:
- Introduced password hashing.
- Using a practical example of how hashing occurs.
- Different formats of hashing Algorithms.
- Password hashing mechanisms.
- How Passwords are stored in our computers in hashed form.
- Protecting our passwords.
