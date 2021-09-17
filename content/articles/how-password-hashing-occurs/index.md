### How Password hashing occurs
Today, many people carry a lot of sensitive information on their phones, laptops, and gadgets. To ensure that this information is safe, the users often set secret passwords, pins, and even biometric sensors like a fingerprint to limit access to the information.

For this tutorial, we will specifically look at password protection of data. We are going to see how passwords are converted into hash form and stored. We will further see how it is retrieved from hash form to raw format.

#### Introduction
Storing a raw password in a device may be insecure since a third unauthorized party may access it remotely. This calls for password hashing.

`Password Hashing` is the process of converting a raw password into a series of characters that cannot be easily interpreted by a human or decoded any fast by an unauthorized machine. This process can be done using a `hashing algorithm`.

But how does Hashing Algorithm achieve this:
   * The hashing algorithm converts plain text entered by the user `eg. test123` into series of scrambled characters such as ` i7def35tvwu4i7v43dfgb23ieeb4` that can only be decoded by itself during the retrieval process.
   * The strength of the password is determined by the complexity of the plain text entered. The simpler the plain test the easier the password to crack and vise versa.


#### Practical example
We are going to use a practical example to see how password hashing occurs.
For this case will use the `SHA-256 hashing algorithm` and `python`. To make it simpler, we will use [replit.com website](https://replit.com/languages/python3). Just like any IDE,`replit` allows you to write, run and save code. For our case, we will run a code on the platform and see its output. Be Keen to note every line of code since it explains the steps that take place during hashing.


First, navigate to the website [replit.com](https://replit.com/languages/python3). 

Let's import the sha256 constructor from the `hashlib module` by running the command below.

```python
    from hashlib import sha256
```
Now let us instantiate the `sha256` class.
```python
    h = sha256()
```
Using the `update()` method, we will now update the hash object.
```python
    h.update(b'test123')
```
We will now use the `hexdigest()` method to digest the string passed via the `update()` method.
```python
    hash = h.hexdigest()
```
Lastly, print the `hash` variable to output the result which happens to be the hashed form of the input.
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
Run the script and you will get an output as below:
```bash
   f84ad825bc3e5ccc7f5e35b6a5e83cb79a998f106e79410ae382c7d43019b6d6
```
**Summary:** This process allows you to give input of a string that represents the password and you receive a hashed output.

**Input**

`example321`

**Output**

`f84ad825bc3e5ccc7f5e35b6a5e83cb79a998f106e79410ae382c7d43019b6d6`

A visual representation of the code input and output is as shown below:

![Python Script](/engineering-education/how-password-hashing-occurs/script.png)

##### Hashing Algorithms

Hashing can be successfully achieved by the use of different formats also considered as different `Types of Hashing Algorithm`. There are a lot of hashing algorithms and we will discuss some of the commonly used hashing algorithms.
Below is a list of different formats that can be applied during the password hashing process. 
- `SHA(Secure Hashing Algorithm)` - This is the default hashing algorithm that converts plain passwords into hashed passwords of 256-bit size. Different versions are depending on the size of the password hash it produces. For instance, `SHA1` produces a password hash of 160 bits and `SHA2` gives an output of 256 bits.

- `SSHA(Salted Secure Hashing Algorithm)` - This Hashing Algorithm is similar to SHA only that it involves adding random characters into the raw password to generate a different hash from the intended hash. The process mentioned above is known as salting


- `MD5(Message-Digest Algorithm)` - This format is the fifth version of the Message-Digest Algorithm. It is almost the same as SHA only that it produces a string of size 128 bits. In recent times, this was the commonly used Hashing Algorithm until was noted that MD5 generates the same hash for two different passwords. This limitation is known as `collision`. This called for other password hashing algorithms.


#### Storage of Password Hash

Let's now take a look at how password hashes are stored in our machines. We will see how it is stored in both Windows and Kali Linux. 

- `In Windows` 

In the Windows OS, password hashes are stored in a folder in the `C:` drive where it is problematic to open these files on a running machine since they are encrypted using a boot key.

The path to the files is:

`C:/Windows/System32/config/SAM`

`C:/Windows/System32/config/SYSTEM`

- `In Kali Linux`

Kali Linux, on the other hand, stores its password hash in the `etc/shadow` file which is only in a readable form. To access the files, you should have root access. 
The path to the files is shown below:

`etc/shadow`

#### Password Hashing Mechanisms

1. **Salting**

**Salting** is the process where a user adds a series of random characters into their password so that the hash generated is more complex and harder for an unauthorized party to crack. Hackers have noticed that most users use a combination of common names or names of their pets to generate passwords. This hence posed a threat since hackers made a list of commonly used words known as a `dictionary`. They then generated the hashes of these words and use them to match them with password hashes stored by users. If a match is found, the hacker would just decode the hash to a word in the dictionary, and just like that, they have your password.

To solve this, it is advised that you set a strong password that is not common and hard to decode. That is where password salting comes in. You add a series of random characters into your original password and the hash generated will be different from the initial password hash expected. The process of adding salt is known as salting.

2. **Peppering**

For an instance where a hacker has exploited an SQL injection vulnerability, they will have full access to your password hash whether salted or not. To solve this problem, the user adds encryption to the hashed password with a symmetrical encryption key. This Key is now referred to as the `pepper`. The key is not stored in the database as the password hash since we assume in this instance that the attacker has access to the database.


#### Password protecting Yourself
With all this knowledge of password hashing and cracking, lots of accounts have and are in danger of access by unauthorized parties and hackers. This calls for your awareness to protect your data and accounts by using strong passwords.
Let's see how we can achieve this.

1. **Salting your Password**

`Salting` is the process of adding random characters to the string so as the password hash will appear different in every login instance. This process will make it complex for an unauthorized party with access to password hash since they will have to try to decode a different hash after every password hash is saved. 

So every time you set up a password don't forget the salt. 

2. **Use a Strong Password**

Using a strong password means that when you're setting up your password, use an unpredictable pattern. This is including a mixture of `letters`, `numbers`, and `symbols` in your password. This will generate a complex hash that won't be easily decoded and a password that cannot be brute-forced in any case.

Avoid using characters in your name or predictable numbers.

3. **Change your Password Frequently**

Changing your Password frequently will synchronize your password hash and this will be safer for you as it will lower any odds of it being decoded by a hacker or any threat.

If you want to learn how Password Cracking occurs, go through the [Password Cracking with John the Ripper](https://www.section.io/engineering-education/password-cracking-with-john-the-ripper/).

#### Summary
From this tutorial, we have learned the following:
- Introduced Password Hashing.
- Learned using a Practical example of how hashing occurs.
- Different Formats of Hashing Algorithms.
- Password Hashing Mechanisms.
- How Passwords are stored in our Computers in hashed form.
- Protecting our Passwords.
