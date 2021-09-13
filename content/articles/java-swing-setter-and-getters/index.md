---
layout: engineering-education
status: publish
published: true
url: /java-swing-setter-and-getters/
title: Java Swing Components Set and Get Methods
description: This article will discuss setters and getters methods of Java Swing components used in desktop applications. Java Swing components have getters and setters methods used to get and set values, respectively.
author: ayoma-joseph
date: 2021-09-13T00:00:00-12:02
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/java-swing-setter-and-getters/hero.png
    alt: Java Swing Components Set and Get Methods Hero Image
---
Java Swing components have getters and setters methods used to get and set values, respectively. They are essential because they protect the user's data, mainly when creating classes.
<!--more-->
A getter method usually returns its value (component value) while a setter method sets (updates) its value. 

This makes getters accessors since they allow users to access the values of the Java swing components. At the same time, setters are mutators since they are used to control changes made to the Java Swing components variable. 

This article will discuss the setters and getters methods of Java Swing components used in a desktop application. We will use an application example to show how these methods are used in developing and implementing a desktop application in Java Swing.

### Table of contents
- [Java Swing Graphical User Interface](#java-swing-graphical-user-interface)
- [JLabel](#jlabel)
- [JTextField](#jtextfield)
- [JButton](#jbutton)
- [Output](#output)
- [Conclusion](#conclusion)

### Prerequisites
- Preinstalled Java programming IDE eg. [NetBeans](https://netbeans.apache.org/download/nb122/nb122.html) installed.
- [Java Development Kit](https://www.oracle.com/java/technologies/javase-jdk16-downloads.html) installed.
- Basic knowledge of Java Swing.

### Java swing graphical user interface
We define a class method in our project where we design the user interface. In this class, we add Java Swing components to our project. 

We could use a drag and drop palette in NetBeans IDE as described in the article found [here](/engineering-education/introduction-to-java-swing/) or hard code and declare the swing components.

In this article, we will declare, hard code and add the components to our project. The method below creates our user interface.

```java
 public void sectionCreatingGUI() {//This method creates UI

        swingGetterSetters = new JFrame("Section Java Swing Getters and Setters");
        swingGetterSetters.setLayout(null);
        swingGetterSetters.setSize(700, 450);
        swingGetterSetters.setVisible(true);
        swingGetterSetters.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        title.setBounds(260, 10, 380, 20);
        Fname.setBounds(120, 40, 300, 20);
        fname.setBounds(320, 40, 320, 30);
        Sname.setBounds(120, 70, 300, 20);
        sname.setBounds(320, 70, 320, 30);
        address.setBounds(120, 100, 300, 20);
        adress.setBounds(320, 100, 320, 30);
        PhoneNumber.setBounds(120, 130, 300, 20);
        phoneNumber.setBounds(320, 130, 320, 30);
        id.setBounds(120, 160, 300, 20);
        idnumber.setBounds(320, 160, 320, 30);
        submit.setBounds(540, 200, 100, 30);
        sp.setBounds(120, 240, 520, 150);
        swingGetterSetters.add(title);
        swingGetterSetters.add(Fname);
        swingGetterSetters.add(fname);
        swingGetterSetters.add(Sname);
        swingGetterSetters.add(sname);
        swingGetterSetters.add(address);
        swingGetterSetters.add(adress);
        swingGetterSetters.add(PhoneNumber);
        swingGetterSetters.add(phoneNumber);
        swingGetterSetters.add(id);
        swingGetterSetters.add(idnumber);
        swingGetterSetters.add(submit);
        submit.addActionListener(new ActionListener() {
        swingGetterSetters.add(sp);
    }
```

### JLabel
We start by declaring our JLabel components as shown below:

```java
    JLabel Fname = new JLabel();
    JLabel Sname = new JLabel();
    JLabel address = new JLabel();
    JLabel PhoneNumber = new JLabel();
    JLabel title = new JLabel();
    JLabel id = new JLabel();
```

Setting the JLabel values-Setter method:

```java
 //Setters for the JLabel, Sets the text displayed on the JLabel
        Fname.setText("First Name");
        Sname.setText("Second Name ");
        address.setText("Address");
        PhoneNumber.setText("Phone Number");
        title.setText("CUSTOMER INFORMATION");
        id.setText("ID Number");
```

Getter for the JLabel values- Gets the value of the JLabel variable and assigns the value to the string variable.

```java
     String FnameLabelValue=Fname.getText();
     String SnameLabelValue=Sname.getText();
     String addressLabelValue=address.getText();
     String PhoneNumberLabelValue=PhoneNumber.getText();
     String idLabelValue=id.getText();
     String titleLabelValue=title.getText();
     String submitButtonValue=submit.getText();
```

### JTextField
Declaration of the JTextField components - JTextField components allow the application to interact with the users.

```java
    JTextField fname = new JTextField();
    JTextField sname = new JTextField();
    JTextField adress = new JTextField();
    JTextField phoneNumber = new JTextField();
    JTextField idnumber = new JTextField();
```

The user can input text values to the JTextField. As the user inputs text value, it sets the value of the JTextField variable component. 

We can use a getter method to access this value input by the user, display it on JLabel, store it in a database, or display it in a JTable. In this article, we will display the values in a JTable.

Getter for JTextField component- We get the values of the JTextField and assign them to string variables which we display in a JTable

```java
 //Here we define getters which will get the text entered by the user in the respective JTextField and set/initialize them to our string variables
       String FirstName = fname.getText();
       String SecondName = sname.getText();
       String Address = adress.getText();
       String IdNumber = idnumber.getText();
       String Phonumber = phoneNumber.getText();
```

Displaying the values to a JTable

```java
    //To ensure that we really got the values from the JTextField, we need to display them in the JTable
        DefaultTableModel Table = (DefaultTableModel) customerData.getModel();
        Table.addRow(new Object[]{FirstName + " " + SecondName, Address, Phonumber, IdNumber});
```

### JButton
The JButton swing component has a platform-independent implementation class method. When the button is pushed or clicked with a mouse it results in some action. 

The event fires an action which could be getting the values of other components and displaying them or storing them in a database. 

In this article, we will see the action event method of a JButton. It will display the values of the JTextField components to the JTable.

#### JButton declaration

```java
 JButton submit = new JButton();
```

#### JButton Setter method 
- This sets the text value displayed on the JButton variable.

```java
    	submit.setText("SUBMIT"); //this sets the text value displayed on the JButton as the text in braces
```

JButton getter method - This gets the value of the text set on the JButton.

```java
  String submitButtonValue=submit.getText();
```

#### JButton Action Event 
- The inner class method defines the action event for the JButton. On click, the swingGetter() method is called.

```java
        submit.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                swingGetter();
            }
        });//The action event for the JButton
```

Below is the whole swingGetter() method called in the Jbutton action event.

```java
 public void swingGetter() {
        //Here we define getters which will get the text entered by the user in the respective JTextField and set/initialize them to our string variables
        FirstName = fname.getText();
        SecondName = sname.getText();
        Address = adress.getText();
        IdNumber = idnumber.getText();
        Phonumber = phoneNumber.getText();
        //To ensure that we really got the values from the JTextField, we need to display them in the JTable
        DefaultTableModel Table = (DefaultTableModel) customerData.getModel();
        Table.addRow(new Object[]{FirstName + " " + SecondName, Address, Phonumber, IdNumber});
        //We need to empty the JTextField to allow more entry after the first, second etc. Thus,  values will set the JTextField to null (empty) to allow next entry
        fname.setText(null);
        sname.setText(null);
        adress.setText(null);
        idnumber.setText(null);
        phoneNumber.setText(null);
        //End of swingGetter() method. We will call this method in JButton Action Event method above, the events here happens upon the click of the JButton
    }
```

### Output
When we run our project, the graphical user interface will be displayed. This is to allow the user to enter values into the text field as shown in the figure below:

![GUI](/engineering-education/java-swing-setter-and-getters/guidesign.png)

When the user clicks on the submit button after keying in the values in the text field, the values will be displayed in the table. 

The text field is set to empty for subsequent entry as shown in figure 2 below:

![output](/engineering-education/java-swing-setter-and-getters/output.png)

### Conclusion
From this article, we have learned the following:

1. Java swing components declaration and user interface design.
2. Setter and getter methods for:
   i. JLabel
   ii. JTextField
   iii. JButton
3. JButton action event.
4. How to display values to a JTable from JTextField using the getter method.

The code snippets used in this guide can be accessed at my [GitHub Repo](https://github.com/JosephAyoma/javaswing-Setters-and-Getters).

Happy coding!

---
Peer Review Contributions by: [Dawe-Daniel](/engineering-education/authors/dawe-daniel/)