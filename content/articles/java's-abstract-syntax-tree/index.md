### Introduction
Metaphorical Syntax Source code produced in a computer language can be represented as a tree. Each node in the tree represents a source code construct.

Compilers employ abstract syntax trees (ASTs) to express program code structure, which has a great deal of value. In general, an AST is a result of the compiler's syntax analysis phase. It is typically used as an intermediate representation of the program during the several phases that the compiler required, and it has a significant impact on the compiler's ultimate output.
### Parse tree
To put it simply, the main difference between parse tree and syntax tree is the fact that parse tree represents the derivation of input strings from grammar, while syntax tree represents programming language syntax in a similar hierarchical structure as well.
Neither our interpreter nor our compiler will make use of parse trees, but a visual representation of the parser's execution trace can help you understand how it understood the input. ASTs and parse trees are compared to determine why ASTs are superior to parse trees in terms of intermediate representation. How does it work then? Parse trees (also known as syntax trees) depict the syntactic structure of a language construct, according to our grammar definition. Also, it demonstrates how the start symbol in your grammar creates a specific string in your programming language.

In the **org.eclipse.jdt.core** plug-in, the **org.eclipse.jdt.core.dom** package is the main AST package. To represent each Java source element, the ASTNode class is used. It's important to note that each node in the AST contains information relevant to the object it represents. When creating an AST, the Java Model's ICompilationUnit is often used as the basis.
### The AST Working Process
A syntax tree is a diagram that depicts the grammatical hierarchy. Nodes are the intersection points in a tree diagram. An instantaneous dominance is called a daughter node. There isn't just one way to draw a syntax tree that's right or wrong.
Here is now the process:
- Allow the parsing of a few Java source codes

- **org.eclipse.jdt.core.dom.AST** is used to parse Java code and Parser returns an AST.

- To edit Java source code, the AST must be modified.

- By using the IDocument interface, the AST modifications are written back into the source code via the IDocument.
### AST's Uses
ASTs are mostly used in compilers to verify the accuracy of code. If there are any problems in the tree that was generated, an error message is printed. Some grammar structures, such as implicit type, can't be represented in context-free grammar and so the Abstract Syntax Tree (AST) is employed. However, research is being done on universal syntax trees, which are highly particular to computer languages.
### Making an AST 
The same java source code as described in this post will be used to create bespoke Java source code, for which we will provide AST.

You will find detailed instructions on generating an AST.
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
