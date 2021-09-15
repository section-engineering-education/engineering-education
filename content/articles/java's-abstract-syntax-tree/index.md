### Introduction
Metaphorical Syntax Source code produced in a computer language can be represented as a tree.Each node of the tree represents a source code component.

Compilers employ abstract syntax trees (ASTs) to express program code structure, which has a great deal of value.The syntax analysis phase of a compiler generates an AST. It is commonly used as an intermediate representation of the program during the various phases required by the compiler, and it has a significant impact on the compiler's final output.
### Parse tree
To put it simply, the main difference between parse tree and syntax tree is the fact that parse tree represents the derivation of input strings from grammar, while syntax tree represents programming language syntax in a similar hierarchical structure as well.
Neither our interpreter nor our compiler will make use of parse trees, but a visual representation of the parser's execution trace can help you understand how it understood the input. ASTs and parse trees are compared to determine why ASTs are superior to parse trees in terms of intermediate representation. Then, how does it all work out? As defined by our grammar definition, parse trees (also known as syntax trees) represent the syntactic structure of a language construct. Also, it demonstrates how the start symbol in your grammar creates a specific string in your programming language.

In the **org.eclipse.jdt.core** plug-in, the **org.eclipse.jdt.core.dom** package is the main AST package. To represent each Java source element, the ASTNode class is used. It's important to note that each node in the AST contains information relevant to the object it represents. When creating an AST, the Java Model's ICompilationUnit is often used as the basis.
### The AST Working Process
A syntax tree is a diagram that depicts the grammatical hierarchy. Nodes are the intersection points in a tree diagram. An instantaneous dominance is called a daughter node. There isn't just one way to draw a syntax tree that's right or wrong.
Here is now the process:
- Allow the parsing of a few Java source codes

- **org.eclipse.jdt.core.dom.AST** is used to parse Java code and Parser returns an AST.

- To edit Java source code, the AST must be modified.

- By using the IDocument interface, the AST modifications are written back into the source code via the IDocument.
### AST's Uses
To evaluate the correctness of code, ASTs are mostly employed in compilers. As soon as an issue is detected, an error message is displayed. As a result, the Abstract Syntax Tree (AST) is used to represent grammatical structures such as implicit type, which cannot be represented in context-free grammar. Some researchers are looking towards universal syntax trees, which are extremely specific to computer languages.### Making an AST 
The same java source code as described in this post will be used to create bespoke Java source code, for which we will provide AST.

You will find detailed instructions on generating an AST.
- Your local environment should be able to run the source code.
- Checkstyle Command line should be downloaded.
-Checkstyle in your Terminal can be used to verify the program and therefore verify.
-Run the following command in your terminal to obtain the AST of your favorite Code after auditing it:
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
CLASS_EXAMPLE -> CLASS_EXAMPLE 
|--MODIFIERS -> MODIFIERS 
|   `--LITERAL_PUBLIC -> public 
|--LITERAL_CLASS -> class 
|--IDENT -> EXAMPLE 
`--OBJBLOCK -> OBJBLOCK 
    |--LCURLY -> { 
    |--METHOD_EXAMPL -> METHOD_EXAMPLE 
    |   |--MODIFIERS -> MODIFIERS 
    |   |   |--LITERAL_PUBLIC -> public 
    |   |   `--LITERAL_STATIC -> static 
    |   |--TYPE -> TYPE 
    |   |   `--LITERAL_VOID -> void 
    |   |--IDENT -> main 
    |   |--LPAREN -> ( 
    |   |--PARAMETERS -> PARAMETERS 
    |   |   `--PARAMETER_EXAMPLE -> PARAMETER_EXAMPLE 
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
`3+2`

AST of the above Binary expression
```Java
+ BinaryExpression
 - type: +
 - left_value: 
  LiteralExpr:
   value: 3
 - right_vaue:
  LiteralExpr:
   value: 2
```
### How is ASTs used for
A program's source code is represented as an abstract syntax tree, which the compiler can use. A compiler's syntax analysis phase produces an abstract syntax tree. As an intermediate representation of the program, it has a major influence on the compiler's ultimate output. For example, static code analysis relies on ASTs. To find syntax errors and bad patterns in code without actually running it, automated tools can traverse the AST.
### Obtaining Information from an AST Node
Java element-specific information is contained within each subclass of ASTNode. E.g. A method declaration contains information on the name, return type and parameters. The information contained in a node's structural properties is referred to as such. The three forms of structural characteristics are simple values, single child AST nodes, and many child AST nodes.
### Finding an AST Node
Just one line of code will produce an enormous tree. How do I get the MethodInvocation of that println("Example") callback function? It is possible to scan all levels, but it is not very convenient.
Every ASTNode has a visitor that allows you to search for a child node. Visit ASTVisitor.com. Every subclass of ASTNode has two methods: visit() and endVisit(). In addition, the ASTVisitor identifies the following two methods: preVisit and postVisit (ASTNode node). To any AST node, the ASTVisitor subclass is passed on. Recursively traversing the tree, the AST will call the visitor's methods for each AST node in this order.
### Printing ASTs
A modified AST must be printed once it has been edited, hence printing and modifying ASTs often go hand in hand. When using recast, some libraries will print the AST exactly as it was originally written, but there are a variety of situations when you may want to publish your AST differently.

Examples of AST use include Prettier, which uses ASTs to reformat code according to your setup without affecting the content/meaning of the code. Instead of formatting your code, they transform your code into an unformatted AST and then rewrite it according to your requirements.

Others include printing code in another language or creating your minification tool, both of which can be useful in certain situations.

It is possible to print ASTs using escodegen or string. In addition, you may design your own based on your needs, or create a plugin for Prettier that does the same thing.
### Conclusion
If you're unfamiliar with the term "AST," it's a tree representation of Java source code. A source code API is defined by the AST. It allows you to alter, generate, read, and remove code. When creating an AST from scratch, existing Java code is usually used as a starting point. The ASTParser is used for this. As well as processing entire Java files, it can also process Java code segments.
Parsing and validation logic can be separated from implementation by using an AST. Implemented interpreters are much easier to understand and maintain when they are written in AST.

I hope you found this tutorial helpful!
