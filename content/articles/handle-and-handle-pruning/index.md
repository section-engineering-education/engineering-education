### Introduction to handle and handle pruning

#### Introductory Background
A handle is a concept used in the bottom-up parsing of compiler design. Bottom-up parsing is the method of syntax analysis in which sentences belonging to certain [context-free grammars](https://www.tutorialspoint.com/automata_theory/context_free_grammar_introduction.htm) whose role is to afford the construction of parse trees. This construction begins at the leaf nodes and proceeds to the root non-terminal hence the name bottom up which is sometimes called the shift-reduce parsing.

Each symbol is moved onto the stack until there is a matching right-hand side nonterminal. This is followed by a reduction by the replacement of the production's right-hand side by its left-hand side. This process continues until eventually the string is reduced to the start non-terminal.

The set of strings to be replaced at each reduction step is called a handle. 

### Prerequisites
The reader should have a prior understanding of the following concept:
- Lexical analysis in compiler design.
- Syntax analysis in compiler design specifically top-down parsing.

Although a handle of a string can be described informally as a substring that equals the right side of a production rule, not every substring that is the same as the right side of a production rule is considered a handle.

Example:
```
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

```
A → kXYz

X → Xwr | w

Y → g
```

Use bottom-up parsing in reverse to parse the string "kwwrgz"

- Find the handle "w" at position 2 and replace it with the non-terminal in the second production as shown below.

- Replace the first "w" with "X" to produce "kXwrgz".

- "w" at position 3 is not a handle:
"kXXrgz" hence cannot be replaced.

- Replace "Xwr" with left non-terminal on the second product which is an "X" to come up with "kXdz".

- Replace "g" with a "Y" as per the last production to come up with "kXYz"

- Finally, replace  "kXYz" with the start nonterminal "S" to fully parse the string "kwwrgz" successfully.

To construct a rightmost derivation the following algorithm comes in handy:

```
for j ← n to 1 by -1

Determine handle Aj → βj in γj

Replace βj with Aj  in an attempt to generate γj-1
```
### Implementation of handle pruning

Below is an illustration using an example:

#### Example 1

For the grammar:

```
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

Consider the following [CFG](https://www.tutorialspoint.com/automata_theory/context_free_grammar_introduction.htm)

```
S→Term Length

Term→integer

Term→float

Term→character

Length→ Length, id

Length→id
```
|Input string | Action |Handle|
| -----------   | ----------- | ----------- |
| Integer id,id | Reduce Term→integer| integer|
| Term id,id| Reduce Length→id |id|
| Term length,id| Reduce Length→ Length,id| Length,id|
| Term Length|Reduce S→Term Length| Term Length|
| S|Accept|



### Program implementation of handles and handle pruning
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

//Checks if the stack has reducible production rules
void checking()
{
strcpy(rw,"Reduction to S -> ");
// c is the length of input string
for(x = 0; x < w; x++)
{
//identifying for producing the rule S->6
if(stk[x] == '6')
{
printf("%s6", rw);
stk[x] = 'S';
stk[x + 1] = '\0';
//output the following
printf("\n$%s\t%s$\t", stk, r);
}
}
for(x = 0; x < w - 2; x++)
{
//checking for a production
if(stk[x] == '7' && stk[x + 1] == 'S' &&
stk[x + 2] == '7')
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
//checking
if(stk[x] == '8' && stk[x + 1] == 'S' &&
stk[x + 2] == '8')
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
printf("GRAMMAR is -\nS->7S7 \nS->8S8 \nS->6\n");
// r is input string
strcpy(r,"87678");
// This will return the lengths of r to w
c=strlen(r);
strcpy(action,"Shift");
// This will print names of columns
printf("\nstack \t input \t action");
printf("\n$\t%s$\t", r);

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
//Checks if the start symbol is on top of the stack
if(stk[0] == 'S' && stk[1] == '\0')
printf("Accept");
else //do not allow
printf("Rejection");
}
```
### Conclusion
Determining handles and going ahead to prune the handle is the key to bottom-up parsing which is the most commonly used parsing strategy used in compiler design hence a lot of effort should be put into learning the concept of handle and handle pruning.


Blissful reading
