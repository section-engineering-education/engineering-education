In the older computer generations, running simple codes was much trickier than one might have thought. This challenge is because computers do everything in machine languages written on punch cards. It then went to mnemonics, as used in the Assembly language. These were simpler but still required an understanding of machine language.
Developers needed high-level languages more than ever since computers seemed effective in repetitive tasks.

The invention of a high-level language compiler was a significant breakthrough in the computer growth phase. This breakthrough was because high-level languages are understandable by most people, though much overhead is needed. Hence, for one to be able to appreciate the compilers and their work in code conversion from source to optimized object code, one has to understand how they are designed.

Compiler design involves several phases. Such phases include the following:
- Lexical analysis
- Syntax analysis
- Semantic analysis
- Intermediate code generation
- Code optimization
- Target code generation
- Error handling
- Symbol table generation

![CompilerCompiler Construction Steps Construction Steps](/engineering-education/get-started-with-a-lexical-analyzer/compiler-construction-steps.png "Compiler Construction Steps")

A Lexical analyzer is found in the first phase of compiler construction.

### Table of contents
- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [What is Lexical analysis?](#what-is-lexical-analysis)
- [Fundamental terms](#fundamental-terms)
- [A token count based on a sample code](#a-token-count-based-on-a-sample-code)
- [Lexical analysis tools](#lexical-analysis-tools)
- [Set up the tools](#set-up-the-tools)
  - [Linux Installation](#linux-installation)
  - [Windows Installation](#windows-installation)
- [Architecture of Lex files](#architecture-of-lex-files)
  - [Lex file parts](#lex-file-parts)
- [Create a Lex file and run it](#create-a-lex-file-and-run-it)
- [A Lex analyzer that converts instances of certain characters into a particular pattern](#a-lex-analyzer-that-converts-instances-of-certain-characters-into-a-particular-pattern)
- [A lex analyzer that identifies certain words](#a-lex-analyzer-that-identifies-certain-words)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways
In this article, one will learn the following:
- What is Lexical analysis
- Lexical analysis: core principles
- Importance of Lexical analysis
- Application of the principles in creating a lexical analyzer
- Building a lexical analyzer with code examples

### Pre-requisites
For one to quickly follow up with the article, the following knowledge is required:
- A good internet connection
- Know how to use Regular Expressions
- Knowledge of C programming
- A good IDE or a text editor of one's choice

Let us get into the article now:

### What is Lexical analysis?
Lexical analysis is the first phase of the compiler, also known as a scanner. Lexical analysis is the process of converting high-level source code into a series of tokens that the compiler can easily recognize.
These tokens are then passed through a series of steps to check if they are in the correct format. These steps include checking its syntax and semantics.
As a result, the input to lexical analyzers is a programmer's high-level language source code.
It then splits it into smaller chunks that can be quickly and easily analyzed and worked on.

> **NOTE**: Lexical analyzers do not change code or check for errors.

### Fundamental terms
Some terms that are used include:
- Tokens
- Patterns
- Lexeme

Let us take a look at what they are:

**Tokens** are defined as anything that can be recognized in Context-Free Grammars (CFGs). It represents an information unit. They may be between terminals, non-terminals, production rules, and the `Start` symbol (T, N, P, S). Terminals are characters that represent the final value; non-terminals can be replaced with either terminals or non-terminals.
Production rules are combinations of terminals and non-terminals that can be combined in a format that makes sense and represents certain operations.
The Start symbol, on the other hand, is a special non-terminal symbol that shows the start of an application.

**Patterns**: These can be specific formats used to recognize tokens. Compilers can use them to identify letters, words, and special characters. These can then be classified as terminals or non-terminals, among others.
Patterns can be user-defined or come predefined with the program beforehand.

**Lexemes**: on the other hand, it can be said to be a combination of tokens that convey a greater, more understandable meaning when combined.

### A token count based on a sample code
The Java application prints a 'Hello World' message when running the code below.
```java
/*Print 'Hello World!'*/
/*Comments and whitespaces are not count*/
public class HelloWorld
{
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

The number of tokens recognized by a lexical analyzer is 27.

Check out the image below to see how they are counted:

![Token count](/engineering-education/get-started-with-a-lexical-analyzer/token-count.png "Token count")

The Lexical analyzers recognize tokens such as:
- keywords
- Special characters
- Macros and special directives
- Strings, integers, floats, identifiers, among others.

This kind of token can then be passed to syntax analyzers, generating parse trees based on the Symbol table to see if they are correct.
Non-tokens include spaces, tabs, and comments, among others.

### Lexical analysis tools
Some tools used to create and use lexical analyzers include:
- LEX tool
- YACC
- A C compiler

A **LEX tool**: It is also known as Flex (GNU tool). It creates a _C source core_. It can be made to be integrated into an application or be a stand-alone application.
It first sets some configurations that define the tokens expected from an input and what actions to take before parsing (sending them to a syntactical analyzer).

**YACC**(Yet Another Compiler Compiler): A UNIX standard utility compiles LALR (1) grammar using the Look Ahead Left-to-Right parsing style. It is open-source and generates code for the parser in the C language.

**C compiler**: This is a typical C language compiler. GNU CC will work out perfectly.

### Set up the tools
This section will feature the installation of the lexical analysis tools discussed above.

#### Linux Installation
To do this on Ubuntu, run the following commands:
- Get current software updates for installed apps
```bash
sudo apt-get update
```

- Install Flex GNU tools
```bash
sudo apt-get install flex
```

- Install Bison as follows:
```bash
sudo apt-get install bison
```

> Bison is a general-purpose YACC-compatible parser generator that converts a grammar description for an LALR(1) context-free grammar into a C program to parse that grammar. One may use it to develop a range of language parsers. Bison has upward compatibility with Yacc.

- Install Yacc
```bash
sudo apt-get install byacc
```

- One can also install the Bison package to generate a parser in C or C++ from a BNF notation. One can do it by running the command below:
```bash
sudo apt-get install bison++
```

#### Windows Installation
To install Flex and Bison for Yacc, do the following:
- Head over to this [site](http://gnuwin32.sourceforge.net/packages.html). All GNU utilities such as Bison and Flex are found there. Download Bison Setup found on the same site or by clicking [here](http://gnuwin32.sourceforge.net/packages/bison.htm).
- Install it by running it.
- Download Flex setup by clicking [here](http://gnuwin32.sourceforge.net/packages/flex.htm). Install it after the downloading process is complete.

Add the binaries to the PATH variable by doing the following:
- Open the folder in which the program files for Bison and Flex are installed. It is by default found in the `C:\Program Files (x86)\GnuWin32` file.
- Copy its location path
- Search in the Windows taskbar for `Environment Variables` and select the 'Edit the System Environment Variables' option.
- Select the 'Environment Variables' option.
- In the 'Path' option, paste the location of the bin folder. The folder path to be pasted is `C:\Program Files (x86)\GnuWin32\bin`.

![Path location](/engineering-education/get-started-with-a-lexical-analyzer/path.png "Path location")

- Save it and close the windows.

### Architecture of Lex files
Lex files have a `.l` extension.
However, before creating a Lex file, let us first know the parts of a Lex file.

#### Lex file parts
Lex files have three main parts. These parts are the following:
- Definition
- Rules
- Subroutines

**Definition**: It contains literal blocks, definitions, internal table declarations, start conditions, and translations.
It can contain things like the 'include' section found in the C program. This statement states the things that the program could need.
Definitions can be written inside the `%{` and `%}` signs.

**Rules and actions**: This section carries patterns and _C_ code(actions). These patterns can be in ECMAScript RegEx or wildcard format. It specifies the tokens the program checks, and the C code states what happens when they are found in the Actions section.
Actions can be found inside the curly brackets({ ... }).
The actions or macros can be optional too. Hence, they can be left blank.

**Subroutines**: C codes that state additional user-defined functions executed when the patterns are found or not found.
They can also contain other functions that the program may execute on the run.
These are optional.

The three sections are divided by delimiters (`%%`) as shown below:
```
1. Definitions section:

%{    contains C code, usually consisting of the libraries
        #define external global declarations that one wants to be part of the code for y.tab.c
%}

The file can include optional macro definitions for regular expressions.

%%

2. Rules section:

regular expression        { c code to be executed when this R.E. is matched against the source. }
another regular expression { another c code based on this RegEX }
%%

3. User Sub-routines:

Additional code here
```
### Create a Lex file and run it
Let us create a Lex analyzer that counts the number of words in a file and their total size.

- Create a root folder named 'flex-projects'.

- In it, create a file named `counter.l`

- Open it and do the following: Add lines of code that state the program declarations as follows:
```c
/* Definitions */
%{
int lines=1, words=0, lowercase_letters=0, uppercase_letters=0, numbers=0, special_characters=0, totals=0, size=0;
%}

/* Delimiters: These separate the definitions from the Rules and actions section */
%%
```

- Add the rules and actions. Uppercase and lowercase letters, numbers, special characters, letters, and line instances will all be checked.Check it out in the code below:
```c
\n { lines++; words++;} /* Adds to the lines and words variables a value of 1 when one goes to a new line */
 [\t ' '] words++; /* Adds a value to the words variable when one moves from one word to another (words are separated by a space) */
 [A-Z] uppercase_letters++;
 [a-z] lowercase_letters++;
 [0-9] numbers++;
 [$&+,:;=?@#|'<>.^*()%!-] special_characters++;
 
 /* Separate the Rules and Action Section from the User sub-routines */
 %%
```

- In the User sub-routines section, add the main program that prints the totals. Check it out in the line of code below:
```c
int yywrap()
{

}

int main()
{
yyin= fopen("test.txt", "r"); /* Open the 'test.txt' file in a read only fomart */
yylex();
totals= special_characters + numbers + uppercase_letters + lowercase_letters;
size = (totals * 1); /* The total size in bytes is equal to the total number of characters multiplied by one byte since each is one byte */

/* Prints the output */
printf("This file contains the following:");
printf("\n\t%d lines", lines);
printf("\n\t%d words", words);
printf("\n\t%d Lowercase letters", lowercase_letters);
printf("\n\t%d Uppercase letters", uppercase_letters);
printf("\n\t%d digits", numbers);
printf("\n\t%d special characters", special_characters);
printf("\n\t The total size of the file characters in bytes is: %d bytes.\n", size);
}
```

- Create a new file by the name of 'test.txt' and open it.
- Add the following text to it:
```txt
Hello Mark and Jane! Did you go for launch?
I am coming back tomorrow. Don't go home yet...
I will visit you at 0945hrs on 27th November this year
```

- Open the folder where the file resides in the terminal or command line (in Windows).
- Change the lex file into a C Source Core using the command below:
```bash
flex counter.l
```

- Convert the C Source Core into an executable file by running the code below in the terminal:
```bash
gcc lex.yy.c
```

- Run the executable. This process runs the analyzer created so that it can use the input file as the input and generate the output on the terminals:
```bash
./a.out
```

How the process looks like:

![Lex Analyzer Process](/engineering-education/get-started-with-a-lexical-analyzer/lex-analyzer-process.png "Lex Analyzer Process")

The output on the terminal is as shown below:

![Terminal code run output](/engineering-education/get-started-with-a-lexical-analyzer/terminal-output.png "Terminal code run output")

> YACC comes with predefined language reserved words, also known as keywords. Among these terms are "_yytext_," "_yylex_," and "_yywrap_", to name a few.
> As one can notice, they start with `yy`. This step is because YACC uses that prefix before keywords to recognize them by default. One can also set the program to use another prefix of two characters. The characters can be lowercase, one uppercase, and the other lowercase.
> Both can not be uppercase since all uppercase combinations have been used for other keywords.

`yylex()` is a function that passes tokens found to `yyparse()` each time it is called. It returns 0 or a negative value whenever an EOF (End of File) error is returned. It utilizes a routine called `yygetc()` to fetch these values.
`yyparse()` calls upon `yylex()` to obtain any tokens passed to the program. It then matches it against the patterns used for matches to determine the kind of action to be performed.
`yywrap()` is used to show the end of the execution of the code. It returns a value of 1 if the program's run is over and a value of 0 if it is ongoing.

Yacc also has some predefined variables. These variables include the following:
- **yytext**: It defines the current recognizable input token by the lexical scanner.
- **yylen**: It is a variable that holds the length of the input text.
- **yyout**: It determines the output stream for the output macro that processes input that does not match any rules set.
- **yyin**: It determines the input stream for the input functions and `yylex()`.
- **yylineno**: It specifies the current input line number, which is kept up to date by the input and the `yycomment`.

> `yyin` and `yyout` can be interchanged. This interchanging can be done by assignment.

### A Lex analyzer that converts instances of certain characters into a particular pattern

Let us create a lex analyzer that changes 'abc' occurrences in the input to 'ABC'.

- Accomplish this by creating a file named `strings.l`.

- In it, add the following in the definitions section:

```c
%{
    /* Find instances of 'abc' to 'ABC' */

#include<stdio.h>

#include<string.h>

int i;

%}

%%
```
> As for comments in a lex file, make sure to begin with double-spacing first to avoid errors.

- Add rules to check on words only entered (with either upper or lowercase) containing the characters 'abc' following each other.
  If yes, then replace the specified characters only.

```c
[a-z A-Z]* {

for(i=0;i<=yyleng;i++)

{

if((yytext[i]=='a')&&(yytext[i+1]=='b')&&(yytext[i+2]=='c'))

{

yytext[i]='A';

yytext[i+1]='B';

yytext[i+2]='C';

}

}

printf("%s",yytext);

}

.* {ECHO;}

\n {printf("%s",yytext);}

%%
```

- As for the user subroutines section, copy-paste the following:

```c
int main()

{

yylex();

}

int yywrap()

{

return 1;

}
```

> **ECHO** is a macro that is used as an action to copy the matched input token in the `yytext` variable to the lex output stream found in `yyout`.
> It is a macro just like the `yygetc()` and `BEGIN`, among others.

- Run the following command in the terminal:
```bash
lex strings.l
```

- Then, run the following:
```bash
cc lex.yy.c
```

> `Flex` and `gcc` can be replaced with `lex` and `cc` as seen above.

- Run the following command to run the executable:
```bash
./a.out
```

- It now allows input from the terminal. Key in the following to see if it works:
```bash
We can see abc turn to ABC in javaabcfilewithoutknowingABCDabcd
```

The output is as follows:

![Second program output](/engineering-education/get-started-with-a-lexical-analyzer/second- program-output.png "Second program output")

### A lex analyzer that identifies certain words

This lex analyzer will identify words among a predefined set. It then returns an output if it is among the Set or not. In this case, it shall be checking for verbs.
- Create a new file known as `verbs.l`.
- Begin with the definitions as follows:
```c
%{
    //program to classify a word as a verb or not a verb
%}

%%
```

- In the rules and actions section, copy-paste the following:
```c
[\t]+ //Ignore the white spaces/tabs 

is |
am |
are | 
were |
was |
be |
being |
been |
do |
does |
did |
will |
would |
should |
can |
could |
has |
have |
had |
go   { printf("%s: is a verb\n", yytext);}
[a-zA-Z]+ {printf("%s: is not a verb\n",yytext);}

. |\n {ECHO; /* normal default anyway*/}

%%
```

This code contains a series of verbs that act as the patterns defined. If it finds any of them, it returns and says it is a verb; otherwise, it is not.
For each word passed to it, e.g., in a sentence, it does this.

- In the User subroutine section, create the main application as shown below:
```c
int yywrap(){}

int main(){
    yylex();
    return 0;
}
```

- Run it by executing the following in the terminal:
```bash
lex verbs.l
```

- Convert the C source core created into an executable analyzer using the command below:
```bash
cc lex.yy.c
```

- Run the executable as follows:
```bash
./a.out
```

- Key in some characters on the terminal and check out the results. For example, key in the sentence below:
```bash
Kelly is going home today
```

The results look as shown below:

![Check on verbs in a sentence](/engineering-education/get-started-with-a-lexical-analyzer/verbs.l-run.png "Check on verbs in a sentence")

### Conclusion
Creating high-level compilers was one of the most significant steps in the computer software development process.
High-level language compilers attract more developers to the existing languages due to their ease of understanding.
Lexical analysis is a phase in the compilation process of crucial importance. It identifies tokens and passes them to Syntax analysis before proceeding to other steps.
The knowledge of how the analyzers are created is essential in making one try to understand how compilers work.

At this point, the learner has been able to gain the following knowledge:
- What is lexical analysis
- Importance of lexical analysis and lexical analyzers
- Installation of the YACC lexical analyzer on Windows and Linux
- Creation of Lex Files
- Lex file parts
- Running lex files

### References
- Lexical analysis [definitions](https://en.wikipedia.org/wiki/Lexical_analysis)
- Lexical analysis research [document](https://webcache.googleusercontent.com/search?q=cache:XJzw8xH2YtgJ:https://www.iith.ac.in/~ramakrishna/Compilers-Aug14/doc/flex.pdf+&cd=9&hl=en&ct=clnk&gl=ke)
- Lexical analyzer [IBM documentation](https://www.ibm.com/docs/en/zos/2.2.0?topic=section-lexical-analyzer)
- Lexical analysis [reference material](https://lambda.uta.edu/cse5317/notes/node6.html)
