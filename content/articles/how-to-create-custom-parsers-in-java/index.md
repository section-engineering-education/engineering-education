---
layout: engineering-education
status: publish
published: true
url: /how-to-create-custom-parsers-in-java/
title: How to Create Customer Parsers in Java
description: This article will help the reader understand how to create custom parsers in Java. A parser helps in breaking down and analyzing a block of code.
author: verah-ombui
date: 2021-10-28T00:00:00-17:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-custom-parsers-in-java/hero.png
    alt: How to Create Customer Parsers in Java Cover image
---
Parsers are an essential part of any programming language. Java programming language offers many open-source parsers that developers can choose depending on their requirements.
<!--more-->
However, it's challenging to find the right one that fully meets their needs.

Most of the existing parsers tend not to fulfill developers' needs, and they come with many performance issues. This causes developers to opt to create their custom parsers.

This article will discuss the numerous tools and libraries used when building custom parsers in Java.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Concept of parser and parsing](#concept-of-parser-and-parsing)
- [Rules and grammars](#rules-and-grammars)
- [Parsing in Java](#parsing-in-java)
- [Popular tools and libraries for generating parsers in Java](#popular-tools-and-libraries-for-generating-parsers-in-Java)
- [Pros and cons of parsing tools and libraries](#pros-and-cons-of-parsing-tools-and-libraries)
- [Conclusion](#Conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this article, the learner should have:
- A basic understanding of [how parsers work](https://www.sciencedirect.com/topics/computer-science/parsing-process).
- Good knowledge of application development in [Java programming language](https://www.javatpoint.com/java-tutorial).
- Good understanding of [regular languages](https://ecomputernotes.com/compiler-design/regular-expression) and [context-free grammars](https://brilliant.org/wiki/context-free-grammars/).
- [An overview of Compiler Design](/engineering-education/an-overview-of-compiler-design/).

### Concept of parser and parsing
Parsing involves breaking down and analyzing a block of code into smaller code components using some rules.

These components are then interpreted, modified, or managed according to the developers' needs to derive a more profound meaning or understanding.

The program that performs the actual parsing is called a parser.

A parser is made up of two parts; the scanner (tokenizer/lexer) and the parser.

Lexer and parser perform tasks in an orderly manner. It means that the lexer will first read the input data and generate a list of tokens. Then, the parser reads the tokens generated and outputs the results.

Lexer recognizes plain characters or words in a given alphabet. Regular expression engines can also implement lexers easily.

On the other hand, the parser recognizes the structure of the language, making it complex for regular expressions to recognize.

### Rules and grammars
Rules refer to the instructions that lexers or parsers follow when parsing. A set of these rules forms a grammar.

Therefore, grammar consists of a set of rules that define how each line of code or construct is composed.

For instance, to set the rule for an `IF` statement, the developer has to specify whether the statement should start with the `IF` keyword then the left parenthesis (`(`) should follow. 

Then, an `expression` should be inserted and enclosed with the right parenthesis (`)`).

Something like `IF (expression) statement`.

If the code or text does not follow the rule, the parser will capture and display the syntax error.

### Parsing in Java
There are three ways of parsing in Java:
- Using an existing library.
- Using a tool or library to build a parser.
- By building a custom parser from scratch.

#### Use of existing libraries for parsing
The method is best-known for parsing popular and supported languages such as XML or HTML.

A good library should support APIs that can create and modify documents in a given language.

In most cases, this is an added feature that cannot be found in many existing parsers.

The downside of existing libraries is that they are not very common, and most of them only support specific languages.

#### Building a custom Java parser
When developers have a set of unique requirements, the best option is to create a custom parser.

This is because the language they may be trying to parse cannot be parsed using existing parsers. Also, the parser-generating tools lack certain features.

Developers can also use this method if they wish to achieve the best possible performance or integrate different components. The downside of this method is that it is much complex and time-consuming.

Also, the developer needs to know how to code a parser in Java. Alternatively, one can collaborate with other professionals which may be expensive.

#### Use of existing tools and libraries to build a parser
This is one of the best methods of generating parsers in Java. It is considered a flexible and less time-consuming way to build a parser in Java.

In the following section, we will see how we can use existing tools and libraries to generate a parser.

### Popular tools and libraries for generating parsers in Java
Parser generators are tools designed to code parsers. On the other hand, parser combinators are libraries used to create parsers.

When building a parser in Java, a lexer tool is used to analyze regular languages.

The following are different tools used in writing a Java parser:

#### JFlex
It's a lexer generator that uses [Deterministic Finite Automata](https://www.javatpoint.com/deterministic-finite-automata) (DFA).

It matches the input according to the defined grammar called "specs" and executes the defined action.

[JFlex](https://jflex.de/) can be used as a stand-alone tool or combined with other parser generators such as `CUP` or `ANTLR`.

The grammar or the 'spec' is usually separated with a symbol `%%` and contains the following parts:
- The user code is usually included in the generated class.
- The macros/options.
- The lexer rules.

#### ANTLR
It is a popularly used [context-free parser](https://en.wikipedia.org/wiki/Context-free_grammar) generator in Java. [ANTLR](https://www.antlr.org/) can also generate parsers for other languages.

ANTLR grammar contains two parts - the lexer and the parser rules.

The two rules are implicitly defined. Note that lexer rules start with an uppercase letter while parser rules begin with a lowercase letter.

Lexer and parser rules can also be explicitly defined.

#### APG
It is a [recursive descent parser](https://en.wikipedia.org/wiki/Recursive_descent_parser) that uses [Augmented BNF](https://en.wikipedia.org/wiki/Augmented_Backus%E2%80%93Naur_form) variation.

[APG](https://sabnf.com/) is made up of more operators such as [syntactic predicates](https://en.wikipedia.org/wiki/Syntactic_predicate) and custom-made matching functions.

An APG grammar is simple, clean, and easy to understand. It is popularly known for writing Java, JavaScript, C, and C++ parsers.

#### Coco/R
It uses [attribute grammar](http://melt.cs.umn.edu/silver/tutorial/4_attribute_grammars/) to generate a scanner and parser that is [recursive-decent](https://www.geeksforgeeks.org/recursive-descent-parser/).

In attribute grammar, semantic rules are defined in an [EBNF](https://tomassetti.me/ebnf/) variant and then interpreted to modify the methods of a resulting parser.

It is well documented and provides several grammar samples. It is well known for writing parsers for Java, C++, and C# languages.

#### CUP
It's a form of [LALR](https://www.geeksforgeeks.org/lalr-parser-with-examples/) and is popularly used for generating parsers in Java.

[CUP](http://www2.cs.tum.edu/projects/cup/) can work well with JFlex to generate the right parts of the parser. It also offers an Eclipse plugin for writing grammar.

#### JavaCC
This tool has all actions and custom code necessary for writing parsers in Java.

[JavaCC](https://cs.lmu.edu/~ray/notes/javacc/) grammar file is not as clean as ANTLR.

Nevertheless, it is well documented and has been used significantly in different projects such as JavaParser. It does not have much grammar although it comes with a grammar repository.

#### JavaParser
[JavaParser](https://javaparser.org/) offers lexical preservation and [pretty printing](https://en.wikipedia.org/wiki/Prettyprint). This implies that Java code can be parsed, modified, and printed with an original format or pretty-printed.

It's possible to integrate it with [JavaSymbolSolver](https://github.com/javaparser/javasymbolsolver). It also supports all Java versions.

### Pros and cons of parsing tools and libraries
Most of the parsing tools and libraries started as research papers and thesis. The advantage of these tools and libraries is that they are freely available.

However, most of these tools lack proper documentation and user guides. This is because they have not been developed to be used by a large community. Furthermore, most of these libraries are not actively maintained by their developers.

### Conclusion
Parser development in Java is a complex activity compared to Java application development. Developers experience numerous challenges when building parsers for Java. 

Due to this issue, tools such as JavaParser and JavaCC should be utilized to make the development process easier.

Individuals should research the tools they intend to use and carefully inspect their documentation before beginning development.

### Further reading
- [A guide to parsing algorithms](https://www.javacodegeeks.com/2017/09/guide-parsing-algorithms-terminology.html)
- [Understanding JFlex](https://jflex.de/manual.html)
- [Java with ANTLR](https://www.baeldung.com/java-antlr)
- [Learn APG](https://sabnf.com/documentation-2/)
- [The Compiler Generator COCO/R](https://ssw.jku.at/Research/Projects/Coco/)
- [Overview of CUP](http://monash.edu/science-education/2015/resources/conceptual-understanding-procedure/)
- [Introduction to JavaCC](https://web.cs.wpi.edu/~kal/courses/compilers/JAVACC/JavaccPaser.htm)
- [Parsing with JavaParser](https://www.tabnine.com/code/java/methods/japa.parser.JavaParser/parse)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)