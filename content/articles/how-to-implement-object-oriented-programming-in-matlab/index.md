### OBJECT ORIENTED PROGRAMMING
Object-Oriented Programming, unlike procedural programming, is centered
on data as opposed to functions. The object in Object-Oriented Programming consists of one or more data fields similarly to a struct. But unlike
structs, an object also contains functions that operate on the data. A cool feature of an object is that you can control which data fields (and which functions) are accessible outside of the object. Let’s say, for example, that you
need a sorted-vector data type. Using procedural programming, you would
create a regular vector v and write functions to insert a new element into it,
to remove an element from it, and to find and element within it. However,
the vector itself will be accessible from other functions as well, and it can be
inadvertently modified. There is, for example, nothing stopping you or
somebody else who uses and modifies your code from writing:
v(end+1) = 3;
If the variable v is in the current scope, MATLAB will happily increase the
size of v by one and assign 3 to the last element. In all likelihood, v is not
going to be sorted after that. With OOP, on the other hand, you can create
an object with this vector as a data field and make it inaccessible from the
outside. The only functions that can modify the vector are the insert, remove, and find functions that are part of the object. If you try to modify the
vector as we did above, MATLAB will generate an error message instead of
executing the assignment. Hence, once you have made sure that these functions work correctly, you never need to worry about this sorted vector
again.
The OOP feature that we have just highlighted is called encapsulation or
information hiding. You have fine control over how an object can be used
by separating its implementation, which determines how an object works,
from its interface, which specifies how the object can be used. You can hide
(or encapsulate) the implementation details from the user of the object, who
will be utilizing only a limited set of functions that you have provided to
access the object. This hiding of implementation detail has the added advantage that you can freely modify the implementation of the object as long as
the interface, which is the set of functions that users of the object can utilize,
does not change. Many times the designer and the user of the object is one
and the same person, you, but it is still a good idea to use these OOP features when writing large programs. It will make your program less error
prone, easier to debug, and easier to maintain.
It is time to introduce some OOP notation. The definition of an object is
called a class. An object is an instance of a class. You can create as many instances of a class as you want. A data field of a class is analogous to a field
of a struct, and like the struct field, is one of the variables specific to that
class. In OOP, it is called a data member. In MATLAB, it is called a property.
A function within a class is a member function or, using MATLAB notation,
a method. For the rest of the book, we will stick with MATLAB conventions.
You might have noticed that defining a class is equivalent to introducing a
new data type. You specify what data it consists of using properties and
what operations are supported using methods. OOP even allows you to determine which operators and built-in functions can work on the new datatype and how. The general concept of specifying that a function or operator can process a new data type is called overloading, and when an operator is overloaded it is specifically called operator overloading. 
Finally, one of the most useful OOP features is called inheritance. What it
means is that a class can build on another class and extend it to provide
more specialized functionality. For example, consider the problem of writing banking software that manages accounts. There are different kinds of
bank accounts, such as checking, savings, and credit card. Instead of making three unrelated classes for these types of account, it makes sense to capture their common traits and behavior in a single class. Let’s call this class
BankAccount. It has properties for the account number, owner, institution,
balance, etc. Now, we can create a subclass of the BankAccount class that
inherits all the features of BankAccount and in addition implements the
extra functionality associated with the new kind of account. And we can create multiple subclasses. For example, the CreditCardAccount class might
have a credit-limit property, while the CheckingAccount class has a list-ofchecks property. We say that the “subclasses” (CreditCardAccount,
CheckingAccount) “extend” the “base class” or “superclass” (BankAccount). From this example it should be clear that a subclass is a class that
has been defined via the mechanism of inheritance to be an extension of another class., and a base class or superclass (yes, they are seemingly contradictory terms for the same thing!) is a class whose properties have been inherited by another class. A very useful attribute of inheritance is that a subclass can behave like a superclass. For example, CheckingAccount has an
account number automatically. If a function is expecting a BankAccount
instance, we can supply instead a CreditCardAccount instance and the
program will work as expected. This is another form of polymorphism supported by OOP.
Let’s a create a program that manages our contacts, which are people and
their phone numbers. The first thing to do is to define a class for a single
contact. For simplicity, it will have only the name of the person and a single
phone number. Here is our first class definition in MATLAB:
```matlab
classdef contact
 properties
 firstname
 middlename
 lastname
 phonenumber
 end
 methods
 function obj = contact(lname, mname, ...
fname, phone)
 if nargin > 0 obj.lastname = lname; end
 if nargin > 1 obj.middlename = mname; end
 if nargin > 2 obj.firstname = fname; end
 if nargin > 3 obj.phonenumber = phone; end
 end
 function disp(obj)
 if isscalar(obj)
fprintf('Name: %s, %s %s\n',...
obj.lastname,...
obj.firstname,...
obj.middlename);
fprintf('Tel: %s\n\n',...
obj.phonenumber);
 else
fprintf('array of contacts\n');
 end
 end
 end
end
```
### Conclusion
MATLAB is primarily a procedural language. That’s why we have been able
to cover all the material so far without OOP concepts. However, the language designers at MathWorks decided to extend the original language
with OOP features a few years ago. Since they had to work with the existing
language and had to make sure that it remains backward compatible, that
is, that all existing programs remain operational, they had to make some
compromises on which OOP features to support and how to do it. Overall,
they did an excellent job of supporting most OOP concepts in an intuitive
and elegant manner.
