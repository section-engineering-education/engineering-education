---
layout: engineering-education
status: publish
published: true
url: /pos-system-using-arduino-and-python/
title: Point Of Sale Transaction System Using Arduino and Python
description: Building a point of sale transaction system using Arduino and python using RFID-enabled ID cards to transact.
author: lalithnarayan-c
date: 2020-08-05T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/pos-system-using-arduino-and-python/hero.jpg
    alt: outlook clone example image
---
We are going to be building something unique and exciting. We will use hardware components and integrate them with our python code. All the components presented can always be updated, modified, and secured. The basic flow of information is of utmost interest. Let's begin.
<!--more-->
### Point Of Sale - POS
A POS or point of sale usually refers to the location where a sale or transaction takes place. For retailers and restauranteurs, POS traditionally means the area surrounding the cashier or counter where payment is accepted during checkout.

#### What is POS?
A point-of-sale (POS) transaction is what takes place between a merchant and a customer when a product or service is purchased, commonly using a point of sale system to complete the transaction. Merchants typically use a POS system to complete a sales transaction. In its most basic definition, a POS system is a combination of POS hardware and POS software to create a POS machine for processing a transaction and payment.

### Project Overview
In the lightning-fast era of technology, carrying multiple cards, and bulky wallets is not fashionable. Hence, we introduce a smart ID in place of the wallets. This reduces the time required to carry out a transaction, especially at supermarkets and local grocery shops. It can also be used for various other purposes like National ID cards, library cards to borrow books and pay fine if any.

In this project, we use RFID-enabled ID cards to transact, which we scan using
an RFID scanner which is interfaced with Arduino. This board later sends the
UID number to the client using Serial communication from Arduino and the client
machine. Then with the help of socket programming, we establish a connection with the server which has a database of all the users. At the server end, we check for the authenticity of the user by the means of UID number and the PIN unique to each
user. After verification, we proceed with the transaction for a valid user, else report the non-availability of the user in the database.

### Hardware
#### RFID Tag and Scanner
”RFID” is an abbreviation for Radio Frequency Identification. RFID uses electromagnetic fields to automatically identify and track tags attached to objects. The tags contain electronically stored information. Passive tags collect energy from a nearby RFID reader’s interrogating radio waves.

The RFID module used is MFRC522. The RFID module is connected to
Arduino. Here we are reading the UID number of a person’s ID card using
RFID scanner. We load the UID value onto the RFID tag.

!["Title"](/engineering-education/pos-system-using-arduino-and-python/arduino.jpg)

### Software
### Socket Programming
In a POS system, there can be many service providers at various locations throughout a building complex. Hence all of these computers will need to establish a connection with the main database server or even an intermediate server. Having a wired connection between all the client machines and the server involves a lot of
unnecessary hardware and wiring. This we take the help of sockets which establish
a wireless connection with the server. The RFID data is received using the RFID module, connected to an Arduino Uno board, which is transmitted via serial communication to the Server Program.

The authentication phase is initiated by the server. Here we use a timed connection between the client and server machine. This means that as soon as a transaction is completed, we break off the connection with the server to prevent load overburdening on the server. We establish a UDP connection with the server because it is faster than TCP and also the data sent over the network is lesser.

As the server is located at a constant IP address, we save a copy of it in the
client machines so that we do not need to find the server machine each time a user
interacts with it. This saves time and makes the overall system more efficient.
The connection between the client and the server is a two-way simplex connection.
Because based on the client input, the server requests much more data, all of which happens in the same connection.


Let's save the database. We create a temporary database called database.csv. You can create the file in the same directory as *client.py* and *server.py*.

### *database.csv*

```CS
,ID,Pin,Name,Current_Balance,Transaction_Amt,Closing_Balance
0,AE9F7569,1234,Akshay,28510,0,28510
1,AEA46C69,4321,Kumar,4563,563,4000
2,AE9F6529,7896,Shah,7896,896,7000
3,AE9F7159,6987,Nikeish,1456,456,1000
4,AE9F7789,1478,Ranbir,8622,1234,8622
```
### *client.py*

```python
# Message Sender
import os
import serial
ser=serial.Serial("COM5")
ser.baudrate = 9600

from socket import *
host = "192.168.43.238" # set to IP address of target computer
port = 13000
addr = (host, port)
UDPSock = socket(AF_INET, SOCK_DGRAM)
Buffer_size = 1023

#send_data is to send data
def send_data(data):
    UDPSock.sendto(data.encode(), addr)
    #UDPSock.close()

#To recieve the acknowledgement from the server
def recieve_data():
    r_data,addr = UDPSock.recvfrom(Buffer_size)
    return r_data.decode()

while True:
    tries=0
    #reading data from port
    # #Serial communication part
    i=0
    user_ID=[]
    while(i<8):
        user_ID.append(ser.read().decode('ascii'))
        i=i+1

    user_ID = (str(user_ID))
    send_data(str(user_ID))

    while tries<4:
        data = recieve_data()
        data = int(data)
        if (data==1):
            #Authentication and verification
            PIN = int(input("Enter PIN:"))
            send_data(str(PIN))

        elif(data==2):
            print("Authentication Successful")
            #Sending the transaction amount if valid user
            amount = int(input("Enter the amount:"))
            send_data(str(amount))
            break

        elif(data==3):
            print("Authentication Failed")
            break

        elif(data==4):
            print("Insufficient funds")
            break

        else:
            print("Server Error")
            print("Rescan ID")
            #UDPSock.close()
            break
        tries+=1

os._exit(0)
```

### *server.py*
```python
# Message Receiver
from os import *
import csv
from socket import *
import pandas as pd

host = ""
port = 13000
buf = 1024
addr = (host, port)
Buffer_size = 1023
UDPSock = socket(AF_INET, SOCK_DGRAM)
UDPSock.bind(addr)

#To recieve the acknowledgement from the server
def recieve_data():
    r_data,addr = UDPSock.recvfrom(Buffer_size)
    return [r_data.decode(),addr]

#send_data is to send data
def send_data(data,addr):
    UDPSock.sendto(data.encode(), addr)
    #UDPSock.close()

# use base_dir if needed
BASE_DIR = ''
# data handling using pandas
df= pd.read_csv(BASE_DIR + 'Dataset.csv')
df = df.drop('Unnamed: 0', 1)
df.set_index('ID')

#The table indexing
id= df.iloc[:,0]
pin=df.iloc[:,1]
name=df.iloc[:,2]
cb=df.iloc[:,3]
ta=df.iloc[:,4]
clb=df.iloc[:,5]

#Starting the program for each user
while True:
    status = 0
    #This block which handles the user authentication and services
    #Recieving the ID of the uder
    user_ID,u_addr = recieve_data()
    count=0
    for count in range(len(id)-1):

        if(id[count]==(user_ID)):
            #Recieving the PIN and verifying it
            print("User ID:",user_ID)
            print("Waiting for PIN")
            send_data("1",u_addr)
            received_pin=recieve_data()[0]

            if(pin[count]==int(received_pin)):
                print("Authentication Successful")
                status=1
                break

            else:
                print("Authentication Failed")
                send_data("3",u_addr)
                print(count)

        count=count+1

    if(status==1):

        print("Welcome ",name[count])
        print("Waiting for amount")
        send_data("2",u_addr)
        ta1=recieve_data()[0]
        ta1 = int(ta1)

        if(ta1>cb[count]):
            send_data("4",u_addr)


        else:
            clb[count]=cb[count]-ta1
            cb[count]=clb[count]
            ta[count]=ta1
            print("Transaction successful\nThank you",name[count])

        df.to_csv("C://Users//Kantesh//Desktop//CN PBL//Dataset.csv")
#os._exit(0)
```
### *arduino_code.c*

The code below has been written in Arduino IDE which is used to extract the
UID of ID cards. Before running the program the user has to include the MFRC522 library to the Arduino IDE.

#### How to Install MFRC522 RFID Library to Arduino IDE
1. Download the library from https://github.com/miguelbalboa/rfid
2. Open Arduino IDE. Then go to and select Sketch->Include Library->Add .ZIP Library.
3. Choose RFID-master.zip file and click to Open.

For more details regarding the RFID library, refer to [steemit.com](https://steemit.com/utopian-io/@drencolha/mfrc522-rfid-reader-arduino-library-setup-and-functions-usage-shown-with-an-example-project-tutorial)
```c
#include <SPI.h>
#include <MFRC522.h>
constexpr uint8_t RST_PIN = 9; // Configurable, see typical pin layout above
constexpr uint8_t SS_PIN = 10; // Configurable, see typical pin layout above
MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
MFRC522::MIFARE_Key key;
// Init array that will store new NUID
int nuidPICC[4];
String UID = "";
void setup() {
    Serial.begin(9600);
    SPI.begin(); // Init SPI bus
    rfid.PCD_Init(); // Init MFRC522
    for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
    }
}
void loop() {
// Look for new cards
    if ( ! rfid.PICC_IsNewCardPresent())
        return;
    // Verify if the NUID has been read
    if ( ! rfid.PICC_ReadCardSerial())
        return;
    //Serial.print(F("PICC type: "));
    MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);

    //Serial.println(rfid.PICC_GetTypeName(piccType));
    // Check is the PICC of Classic MIFARE type
    if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
        piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
        piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
        Serial.println(F("Your tag is not of type MIFARE Classic."));
        return;
    }
    if (rfid.uid.uidByte[0] != nuidPICC[0] ||
        rfid.uid.uidByte[1] != nuidPICC[1] ||
        rfid.uid.uidByte[2] != nuidPICC[2] ||
        rfid.uid.uidByte[3] != nuidPICC[3] ) {
        // Serial.println(F("A new card has been detected."));
        // Store NUID into nuidPICC array
        for (byte i = 0; i < 4; i++) {
            nuidPICC[i] = rfid.uid.uidByte[i];
        }
        for (byte i = 0; i < 4; i++) {
            Serial.print(nuidPICC[i],HEX);
        }
    }
    // Halt PICC
    rfid.PICC_HaltA();
    // Stop encryption on PCD
    rfid.PCD_StopCrypto1();
}

```

### Illustrations and Packet Analysis sent
Wireshark is the go-to software for packet analysis. It can be downloaded from https://www.wireshark.org/. Once downloaded, we use the packet analyzer feature in Wireshark to analyze the packets sent and received.

Let's use the tool Wireshark to capture the packets sent and received. The outputs received are as follows-
1. Data sent from client to server
![wireframe_1](/engineering-education/pos-system-using-arduino-and-python/wireframe_1.jpg)
2. Data sent from server to client
![wireframe_2](/engineering-education/pos-system-using-arduino-and-python/wireframe_2.jpg)
3. A message showing the transaction amount
![wireframe_3](/engineering-education/pos-system-using-arduino-and-python/wireframe_3.jpg)

We have built an entire loop of establishing transactions. We can, therefore, improvise the project by encrypting the storage of the pin, securing the transit data, and creating encrypted ID's. All these suggestions can be built on top of the above-stated project. We encourage you to enhance and build your prototypes using Arduino and various modules available with it.
