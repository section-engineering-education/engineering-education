---
layout: engineering-education
status: publish
published: true
url: /handle-and-handle-pruning-compiler-design/
title: Introduction to Handles and Handle Pruning in Compiler Design
description: This tutorial will help the reader understand what handles and handle pruning is in compiler design.
author: mackrine-awino
date: 2022-02-07T00:00:00-14:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/handle-and-handle-pruning-compiler-design/hero.jpg
    alt: handles and handle pruning in compiler design Hero Image
---
A handle is a concept used in the bottom-up parsing of compiler design. Bottom-up parsing is the method of syntax analysis in which sentences belonging to certain [context-free grammars](https://www.tutorialspoint.com/automata_theory/context_free_grammar_introduction.htm) are analyzed. 
<!--more-->
This analysis results in the construction of parse trees. This construction begins at the leaf nodes and proceeds to the root non-terminal hence the name bottom up which is sometimes called the shift-reduce parsing.

Each symbol is moved onto the stack until there is a matching right-hand side nonterminal. This is followed with a reduction by the replacement of the production's right-hand side by its left-hand side. This process continues until eventually the string is reduced to the start non-terminal.

The set of strings to be replaced at each reduction step is called a handle. 

### Table of contents
- [Prerequisites](#prerequisites)
- [What is handle pruning?](#what-is-handle-pruning)
- [Implementation of handle pruning](#implementation-of-handle-pruning)
- [Program implementation of handles and handle pruning through bottom-up parsing using C language](#program-implementation-of-handles-and-handle-pruning-through-bottom-up-parsing-using-c-language)
- [Conclusion](#conclusion)

### Prerequisites
To understand this article, you should have a prior understanding of the following concept:
- Lexical analysis in compiler design.
- Syntax analysis in compiler design specifically top-down parsing.
- C programming language.

Although a handle of a string can be described informally as a substring that equals the right side of a production rule, not every substring that is the same as the right side of a production rule is considered a handle.

Example:
```bash
Expression → Expression + Term | Term
Term → Term * Factor | Factor
Factor → (Expression) | id
id → number
```

Right-Most Derivation of 5+6*3 is

Expression ⇒ Expression + Term ⇒ Expression + Term * Factor ⇒ Expression + Term * id ⇒ Expression + Factor * id ⇒ Expression + id * id ⇒ Term + id * id ⇒ Factor + id * id ⇒ id + id * id → number+number*number → 5+6*3. The handles here are "id", "Expression + Term" and "number".

### What is handle pruning?
This describes the process of identifying handles and reducing them to the appropriate left most non-terminals. It is the basis of bottom-up parsing and is responsible for the accomplishment of syntax analysis using bottom-up parsing.

[Right most derivation](https://www.tutorialspoint.com/compiler_design/compiler_design_bottom_up_parser.htm) is achieved using handle pruning in reverse order.

For example, Using the grammar:

```bash
A → kXYz

X → Xwr | w

Y → g
```

Use bottom-up parsing in reverse to parse the string "kwwrgz".

- Find the handle "w" at position 2 and replace it with the non-terminal in the second production as shown below.

- Replace the first "w" with "X" to produce "kXwrgz".

- "w" at position 3 is not a handle: "kXXrgz" hence cannot be replaced.

- Replace "Xwr" with left non-terminal on the second product which is an "X" to come up with "kXdz".

- Replace "g" with a "Y" as per the last production to come up with "kXYz"

- Then, replace "kXYz" with the start nonterminal "S" to fully parse the string "kwwrgz" successfully.

To construct a rightmost derivation the following algorithm comes in handy:

```bash
for j ← n to 1 by -1

Determine handle Aj → βj in γj

Replace βj with Aj  in an attempt to generate γj-1
```

### Implementing handle pruning
Below is an illustration using an example:

#### Example 1
For the grammar:

```bash
1. A → Expression

2. Expression → Expression + Term

3. | Expression → Term

4. | Term

5. Term → Term * Fact

6. | Term / Fact

7. | Fact

8. Fact → number

9. | id
```

The following are the handles for the derivation of the string `a – 2 * b`

| The Sentential Forms |  The handle|
| -----------   | ----------- |
|   | Production number, Position number |
|A |—|
|Expression |1, 1|
|Expression – Term | 3, 3|
|Expression – Term * Fact |5, 5|
|Expression – Term * <id,b>| 9, 5|
|Expression – Fact * <id,b>| 7, 3|
|Expression – <number,2> * <id,b> |8, 3|
|Term – <number,2> * <id,b>| 4, 1|
|Fact – <number,2> * <id,b> |7, 1|
|<id,a> – <number,2> * <id,b>|9, 1|

#### Example 2
Consider the following [CFG](https://www.tutorialspoint.com/automata_theory/context_free_grammar_introduction.htm).

```bash
S → Term Length

Term → integer

Term → float

Term → character

Length → Length, id

Length → id
```

|Input string | Action |Handle|
| -----------   | ----------- | ----------- |
| Integer id,id | Reduce Term→integer| integer|
| Term id,id| Reduce Length→id |id|
| Term length,id| Reduce Length→ Length,id| Length,id|
| Term Length|Reduce S→Term Length| Term Length|
| S|Accept|

### Program implementation of handles and handle pruning through bottom-up parsing using C language.
```c
//Including all the required Libraries

#include<stdio.h>
#include<string.h>
#include<stdlib.h>

//Declaration of Variables

int x = 0; 
int y = 0; 
int k = 0; 
int w = 0; 

//Array declaration
char r[16]; 
char rw[20]; 
char stk[15];
char action[10]; 

//This function Checks if the stack has a Handle
//This means if any on the production rules can be used to reduce whats on top of the stack
void checking()
{
     strcpy(rw,"Reduction to S -> ");
     // c is the length of input string
     for(x = 0; x < w; x++)
     {
          //identifying for production with the rule S->6
          if(stk[x] == '6')
          {
             printf("%s6", rw);
             stk[x] = 'S';
             stk[x + 1] = '\0';
             //output the following
             printf("\n$%s\t%s$\t", stk, r);
          }
         
     }
      //Looks for a production that has a rule where S implies 6
     for(x = 0; x < w - 2; x++)
     {
         //checking for a production with S implies 7S7
         if(stk[x] == '7' && stk[x + 1] == 'S' && stk[x + 2] == '7')
         {
            printf("%s7S7", rw);
            stk[x] = 'S';
            stk[x + 1] = '\0';
            stk[x + 2] = '\0';
            printf(stk, a);
            y = y - 2;
         }
    }
    
    for(x=0; x<w-2; x++)
    {
         //checking for a production with S implies 8S8
         if(stk[x] == '8' && stk[x + 1] == 'S' && stk[x + 2] == '8')
         {
            printf("%s8S8", rw);
            stk[x]='S';
            stk[x + 1]='\0';
            stk[x + 1]='\0';
            printf( stk, a);
            y = y - 2;
         }
    }
return ; //return to the  main program
}

//Main Function
int main()
{
   //Prints the grammar
   printf("GRAMMAR is -\nS->7S7 \nS->8S8 \nS->6\n");
   // r is input string
   strcpy(r,"87678");
   // This will return the lengths of r to w
   c=strlen(r);
   strcpy(action,"Shift");
   // This will print names of columns
   printf("\nstack \t input \t action");
   printf("\n$\t%s$\t", r);
   //If there is a handle you reduce it using the production rules if not you shift

   for(y = 0; k < w; y++, k++)
   {
          // Printing action
          printf("%s", action);
          stk[y] = r[k]; 
          stk[y + 1] = '\0';
          r[k]=' ';
          // Printing action
          printf( stk, r);
          checking();
   }
   
   // Checking for valid productions
   checking();
   
   //Checks if the start symbol is on top of the stack accept
   if(stk[0] == 'S' && stk[1] == '\0')
         printf("Accept");
   else
   // if fthe start sysmbol is not on top of the stack you do not allow
         printf("Rejection");
}
```

This program checks for handles that are matching to what is on top of the stack and uses the production rules to reduce them. This is done until only the start non-terminal is left on top of the stack. If the start symbol is on top of the stack, it accepts and allows for the production of a parse tree. 

Otherwise, it rejects the input alphabet. The program parses the input alphabet `87678` through bottom-up parsing and prints the grammar and then outputs the parsing table as shown below:

```bash
S → 7S7

S → 8S8

S → 6
```

|Stack|Input|Action|Handle|
| -----------   | ----------- |----------- |----------- |
| $ | 87678$ |Shift ||
|$8|7678$|Shift||
|$87|678$|Shift||
|$876|78$|Reduce to S→6|6|
|$87S|78$|Shift||
|$87S7|8$|Reduce to S→7S7|7S7|
|$8S|8$|Shift||
|$8S8|$|Reduce to S→8S8|8S8|
|$S|$|Accept||

### Conclusion
Determining handles in grammar and pruning them is the first step in parsing an input string. It is responsible for the construction of the parsing table and the parsing tree hence a key concept of bottom up parsing in compiler design. 

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
