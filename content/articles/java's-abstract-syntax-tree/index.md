### Introduction
Metaphorical Syntax Source code produced in a computer language can be represented as a tree. Each node in the tree represents a source code construct.

Compilers employ abstract syntax trees (ASTs) to express program code structure, which has a great deal of value. In general, an AST is a result of the compiler's syntax analysis phase. It is typically used as an intermediate representation of the program during the several phases that the compiler required, and it has a significant impact on the compiler's ultimate output.

In the **org.eclipse.jdt.core** plug-in, the **org.eclipse.jdt.core.dom** package is the main AST package. To represent each Java source element, the ASTNode class is used. It's important to note that each node in the AST contains information relevant to the object it represents. When creating an AST, the Java Model's ICompilationUnit is often used as the basis.
### The AST Working Process
- Allow the parsing of a few Java source codes

- **org.eclipse.jdt.core.dom.AST** is used to parse Java code and Parser returns an AST.

- To edit Java source code, the AST must be modified.

- By using the IDocument interface, the AST modifications are written back into the source code via the IDocument.
### AST's Uses
ASTs are mostly used in compilers to verify the accuracy of code. An error message is printed if there are any errors in the tree that was produced. Some grammar structures, such as implicit type, can't be represented in context-free grammar and so the Abstract Syntax Tree (AST) is employed. However, research is being done on universal syntax trees, which are highly particular to computer languages.
### Making an AST 
The same java source code as described in this post will be used to create bespoke Java source code, for which we will provide AST.

Step-by-step instructions for creating an AST are provided.
- Your local environment should be able to run the source code.
- Checkstyle Command line should be downloaded.
-Checkstyle in your Terminal can be used to verify the program and therefore verify.
- You can acquire the AST of your favorite Code after auditing it by running this command in your terminal:
```
 java -jar checkstyle-8.43-all.jar -t YourFile.java
```
> Make sure your AST is updated.



**Example**
```Java
class Example {
    public static void main(String[] args)
    {
        System.out.println("New Examples!");
    }
}
```
Lets now look at the AST of the above example.
```Java
CLASS_DEF -> CLASS_DEF 
|--MODIFIERS -> MODIFIERS 
|   `--LITERAL_PUBLIC -> public 
|--LITERAL_CLASS -> class 
|--IDENT -> GFG 
`--OBJBLOCK -> OBJBLOCK 
    |--LCURLY -> { 
    |--METHOD_DEF -> METHOD_DEF 
    |   |--MODIFIERS -> MODIFIERS 
    |   |   |--LITERAL_PUBLIC -> public 
    |   |   `--LITERAL_STATIC -> static 
    |   |--TYPE -> TYPE 
    |   |   `--LITERAL_VOID -> void 
    |   |--IDENT -> main 
    |   |--LPAREN -> ( 
    |   |--PARAMETERS -> PARAMETERS 
    |   |   `--PARAMETER_DEF -> PARAMETER_DEF 
    |   |       |--MODIFIERS -> MODIFIERS 
    |   |       |--TYPE -> TYPE 
    |   |       |   `--ARRAY_DECLARATOR -> [ 
    |   |       |       |--IDENT -> String 
    |   |       |       `--RBRACK -> ] 
    |   |       `--IDENT -> args 
    |   |--RPAREN -> ) 
    |   `--SLIST -> { 
    |       |--EXPR -> EXPR 
    |       |   `--METHOD_CALL -> ( 
    |       |       |--DOT -> . 
    |       |       |   |--DOT -> . 
    |       |       |   |   |--IDENT -> System 
    |       |       |   |   `--IDENT -> out 
    |       |       |   `--IDENT -> println
    |       |       |--ELIST -> ELIST 
    |       |       |   `--EXPR -> EXPR 
    |       |       |       `--STRING_LITERAL -> "New Example" 
    |       |       `--RPAREN -> ) 
    |       |--SEMI -> ; 
    |       `--RCURLY -> }
    `--RCURLY -> } 
```
### Representing Binary expressions in AST
Using AST we can simply represent Binary expressions. Let's look at an example for this.

**Second Example**

Binary expression
`5+7`

AST of the above Binary expression
```Java
+ BinaryExpression
 - type: +
 - left_value: 
  LiteralExpr:
   value: 5
 - right_vaue:
  LiteralExpr:
   value: 7
```
### Printing ASTs
A modified AST must be printed once it has been edited, hence printing and modifying ASTs often go hand in hand. When using recast, some libraries will print the AST exactly as it was originally written, but there are a variety of situations when you may want to publish your AST differently.

Examples of AST use include Prettier, which uses ASTs to reformat code according to your setup without affecting the content/meaning of the code. Instead of formatting your code, they transform your code into an unformatted AST and then rewrite it according to your requirements.

Others include printing code in another language or creating your minification tool, both of which can be useful in certain situations.

It is possible to print ASTs using escodegen or string. In addition, you may design your own based on your needs, or create a plugin for Prettier that does the same thing.
### Conclusion
If you're unfamiliar with the term "AST," it's a tree representation of Java source code. A source code API is defined by the AST. It allows you to alter, generate, read, and remove code.

I hope you found this tutorial helpful!