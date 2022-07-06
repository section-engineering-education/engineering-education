# Getting Started with V programming

Languages now are being developed not only to solve problems but to also create fast softwares. V programming is a programming language that is used to create interactive software in the visual programming environment. it was released in July 2019 by ALexander Medvednikov as an open source language. It has been recognized by many software developers especially backend developers. It has been labeled as Vlang and goes with an abbreviation of V. It is one of the statically typed programming languages which extra features. It has an added advantage of no global state and also a hot reloading feature. Moreover, one of the added feature which most developers have been anticipating finally is here. V has been the only language which is in a position to load even the no dependencies. It is able to load with any libraries attached like other languages do. Despite its simplicity, V gives the developer a lot of power and may be utilized in a wide range of fields. These fields includes systems programming, web development, game development, GUI development, mobile (wip), science, embedded programming, tooling, and many fields. 


### Table of contents

- [Introduction](#what-is-v-programming)
- [Getting Started with V programming](#no-null)
- [Tableofcontents](#table-of-contents)
- [Prerequisite](#Prerequisite)
- [Installation](#Installation)
- [V Syntax](V-Syntax)
- [Data types](#v-programming-data-types)
- [Variables](#Variables)
- [Fundamentals of V programming](#Fundamentals-of-V-programming)
- [No undefined behaviour](#no-undefined-behavior)
- [Package manager](#Package-manager)
- [Memory Managemnt](#memory-management)
- [Conclusion](#conclusion)

## Prerequisite
V programming is a language which can be used for all purposes. It is good for large programs which require compilations. It helps to overcome the crunchy library loading memory.Vlang is one of the languages which do utilise memory. This is the major reason to why it is reffered to as a fast compiling language when it comes to speed and efficiency. 

## Installation
To install V in your machine visit [vlang.io](https://vlang.io/) then download the vlang zip file. Depending on the operating system you're using extract and install. run on the terminal to confirm the version. Alternatively, you can clone the github repo and install from there. click [here](https://github.com/vlang/v) to clone it. 
here is the entire steps if you're cloning into your machine.
first ensure you have github installed. 
```
git clone https://github.com/vlang/v
cd v
make
```
For Windows users here is the instruction

```
git clone https://github.com/vlang/v
cd v
make.bat -tcc

```

on MacOS to add the path

```bash
sudo ./v symlink

```

to confirm the version of V installed run this on the shell or terminal. 
```v
v --version
```
This will give an output on the version of the v installed. Let get started with our first program in V programming.
To get started with V programming you can use any editor of your choice but i would prefer using Vscode for this tutorial. Alongside i will install a Vlang extension [here](https://marketplace.visualstudio.com/items?itemName=vlanguage.vscode-vlang).


## Getting Started
### V syntax
Fire up your visual studio and lets write our first program. 

```v
fn main() {
	println('hello world this is my first V program')
}

```
save this code snippet as helloworld.v and open your time. Run the program 
```bash
v run helloworld.v
``` 
###  V Output
it should generate the output below 

```bash
Hello world this is my first v program
```
Hurray!!! you just wrote your first article in v programming. in the above program 
- fn is a function declaration. main form the entry point of the code while the output is printed using print. println is an inbuilt funtion which prints the value requested. if you're having a rough time to use the editor mybe you can use an online editor. use [this playground](https://vlang.io/play) to run your codes and test.
 
 ## comments
comments are used to help understand code. However, they are not printed but remain part of the code. 
there are two ways to write comments.
```comment
// I am a single line comment.
/*
I am a multiline comment.
   /* It can be nested. */
*/
```
this is the difference between a single comment and multiline comment. 

### Variables
data values in programming are store in containers called variables. variables are determined by the data types. 
### Declaring variables

```
type variableName := value;
```
example
```
int myNum := 15
```
assigning existing variable is not easy unless when using a mut keyword.
## V programming data types.
Just like other languages Vlang supports almost all data types. Among the data types supported by V programming includes; strings, boolean, integers, arrays,numbers, float and double. V is statically typed. below is a list of primitive types in v.

```v
bool

string

i8    i16  int  i64      i128 (soon)
byte  u16  u32  u64      u128 (soon)

rune // represents a Unicode code point

f32 f64

any_int, any_float // internal intermediate types of number literals

byteptr, voidptr, charptr, size_t // these are mostly used for C interoperability

any // similar to C's void* and Go's interface{}

```
Interpolation
V programming also supports interpolation
```
name := 'RoyWanyoike'
println('Hello, $name!') // Hello, RoyWanyoike

```
### V constants
constants in v are declared with the keyword const. However, this is only possible outside the function. Constants also cannot be changed. 
```
const vlang = 3
```
It is also possible to assign more complex values unlike in other languages. 
```
struct Color {
   r int
   g int
   b int
}
fn rgb(r int, g int, b int){
   Color {
      return Color {
         r: r
         g: g
         b: b
      }
      blue = rgb(0,0,255)
   }
   println(numbers)
   println(red)
   println(blue)
}

```
### Operators 
V supports almost all the operators in programming. these include:

```
+    sum                    integers, floats, strings
-    difference             integers, floats
*    product                integers, floats
/    quotient               integers, floats
%    remainder              integers

~    bitwise NOT            integers
&    bitwise AND            integers
|    bitwise OR             integers
^    bitwise XOR            integers

!    logical NOT            bools
&&   logical AND            bools
||   logical OR             bools
!=   logical XOR            bools

<<   left shift             integer << unsigned integer
>>   right shift            integer >> unsigned integer
>>>  unsigned right shift   integer >> unsigned integer


Precedence    Operator
    5            *  /  %  <<  >> >>> &
    4            +  -  |  ^
    3            ==  !=  <  <=  >  >=
    2            &&
    1            ||


Assignment Operators
+=   -=   *=   /=   %=
&=   |=   ^=
>>=  <<=  >>>=
```
### String in V
strings are only read-only array of bytes. the characters are encoded in UTF-8 format. However, they are mutable.
```
name := 'joy'
assert name.len == 3       // will print 3
assert name[0] == u8(66) // indexing gives a byte, u8(66) == `B`
assert name[1..3] == 'ob'  // slicing gives a string 'ob'

// escape codes
windows_newline := '\r\n'      // escape special characters like in C
assert windows_newline.len == 2

// arbitrary bytes can be directly specified using `\x##` notation where `#` is
// a hex digit aardvark_str := '\x61ardvark' assert aardvark_str == 'aardvark'
assert '\xc0'[0] == u8(0xc0)

// or using octal escape `\###` notation where `#` is an octal digit
aardvark_str2 := '\141ardvark'
assert aardvark_str2 == 'aardvark'

// Unicode can be specified directly as `\u####` where # is a hex digit
// and will be converted internally to its UTF-8 representation
star_str := '\u2605' // ★
assert star_str == '★'
assert star_str == '\xe2\x98\x85' // UTF-8 can be specified this way too.

```
## Fundamentals of V programming

### Safety
V allows one to write good and clean code. It is one of the easier programming languages for developers to learn and understand easy. However, it is very strict when it comes to writing secure code structure. It is also fast and good for memory handling. variables are immutable by default in Vlang. example, 
```v
name := 'Roy'
println(name) //Roy
```
to mutate the varibale one can only use the mut keyword.
```
mut name := 'Roy'
name = 'Wanyoike'
println('name')
```

## No global variables
Languages  are always expected to come up with a program which will aid be extended later. v eliminates global variables to help come up with a clear program. global variables makes programs less clear while they increases the software size. when one has no goo
## Error Handling
as usual in almost all programming languages one has to write the trial and error catch block. this exception is used to handle errors in the code. when having a large code base it ends up having a long list of trial and error catch block. This is different in V since it combines the entire error into one block and displays as output. 
```
fn (r Repo) find_user_by_id(id int) ?User {
	for user in r.users {
		if user.id == id {
			// error is displayed as an option type
			return user
		}
	}

	return error('User $id not found')
}
```

## No undefined behavior
v comes with no defined behaviours and thus you're the master to drive your own steering wheel. You have no limitation on what to do. 
Other strict behaviours in v include;
- Undefined Values
- State Behaviors
- Variable Shadowing in Vlang
- Bound Checking
## Package manager
v supports package management just like other languanges does. it has its own package manager vpm. you can install this package manager using the above lines in terminal.
```bash
v install [package]
```
## Memory management

Memory management has been the big language in the mouth of programmers. writing a big packaged software gives a lot of headache. to overcome this vlang has come up with a method to overcome this issue. it uses value types and string butters to handle memory management. its possible to edit this to manual memory freeing.




### Conclusion
Vlang is still growing and we can not classify it as it in in alpha stage. some organizations have started implementing it to develop their products. in a span of less than a year it has managed to collect almost 50k stars and forks on people who are working on to make it better daily. having learnt above on how it has been contributing and possesing all the basics of programming it is easy to learn and use it. this [documentation](https://github.com/vlang/v/blob/master/doc/docs.md) offers a good simpler and task to orient new users on grasping what is all about v programming. 
V is also open source and gives the alternative for anyone to contribute. it also gives the advantage to write it in almost all the programming dynamics ranging from android to web development.
