---
layout: engineering-education
status: publish
published: true
url: /regex-implementation-with-java/
title: Getting started with REGEX with Java
description: In this article, we will discuss regular expressions (REGEX) and how to define REGEX patterns in Java.
author: damilare-jolayemi
date: 2021-08-30T00:00:00-09:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/regex-implementation-with-java/hero.png
   alt: Getting started with REGEX
---
The need to validate string inputs is a ubiquitous necessity that projects require every developer to use at some point in their programming activities. A regular expression, popularly referred to as regex, is a handy tool designed to validate string operations effectively.
<!--more-->
The application of regex can be pretty daunting, especially to beginners. This is mainly due to the unusual or strange combinations of the characters applied in the expressions, making the syntax challenging to interpret.

### Introduction
Regular Expressions are strings used to describe search patterns that match the occurrences and combinations of characters in other strings.

In addition to searching a character or a combination of characters, we can also use regex to:
- extract strings, 
- delete substrings, 
- edit strings,
- replace substrings, 
- split strings, 
- as well as to validate strings to ensure they abide by a predefined scheme and requirements.

In most programming languages, strings are immutable, and the operations mentioned above would require the formation of a new string literal or object.

#### Why regular expression?
Imagine that you want to validate an email address; you could ordinarily attempt to iterate through the email string while validating each character of the email string. Using iterators and IF statements is not a practical solution as it would result in your code being more complex and could reduce performance.

However, with an accurate combination of the regex characters, you can achieve this with at least a line of code, thereby making your program more readable, cleaner, and more scalable. Regex has a broad range of usages. One can use one regular expression to validate a variety of inputs.

Many programming languages support regex; you get to do more with fewer lines of code, thereby keeping your code cleaner. In addition, validations are faster when compared to applying IF and ELSE statements.

### Interpretation of regular expressions
As mentioned earlier, regex combines simple characters and special characters that perform pattern matching on strings. Every character composed in the regex string, combined with other characters, is responsible for executing the expected match. 

Most regex characters match themselves. In other words, the character ‘a’ if composed in a regex pattern, would be compared to the character ‘a’ in the input string.

```java

    public static void main(String[] args){

        String word = "hello";
        System.out.println(word.matches("hello"));

 //      output: true  
 
    }
```

In the code above, the predicate method `.matches("hello")` takes a string argument representing a regex pattern is invoked on the string variable `word` to ascertain that its value `hello` matches the given regex pattern, `hello`. 

The program outputs the boolean value `true` because the length and order of the characters in the variable match the regex. When we perform this match on a literal string, the output would be the same.

```java

    public static void main(String[] args){

        System.out.println("hello".matches("hello"));

//       output: true

    }

```

The inclusion of special characters redefines the interpretation of the associated character and the overall pattern of the regex. Some of these metacharacters include but are not restricted to `+ * ? \ [ ] ( ) `.

#### Metacharacters
These are characters that denote special meanings in the processing of regex patterns. Metacharacters are special characters that can be used independently or with other characters to provide a defined pattern. 

Metacharacters are categorized differently depending on their functionalities as, but not limited to:
- Quantifiers
- Character escapes
- Character classes

#### Quantifiers
A quantifier specifies the number of occurrences of a character that it precedes. It is usually placed right after a character or character class (which will be discussed subsequently in this article) to specify how many instances of such, a preceding instance must be present for the input to match.

- Zero or more times matcher (`*`): This is regarded as the *Zero or more* quantifier because it matches the instance of its preceding character occurring any number of times. 

The following examples illustrate the `*` quantifier:

```java

    public static void main(String[] args){

        System.out.println("o".matches("o*"));
//          output: true

        System.out.println("oooooo".matches("o*"));
//          output: true

        System.out.println("hello".matches("hello*"));
//          output: true

        System.out.println("hell".matches("hello*"));
//          output: true

        System.out.println("hell".matches("o*"));
//          output: false

    }
```

The output for each print statement (except the last print statement) is `true` because the character ‘o’ that precedes the `*` in the regex expression `o*` matches the string literal `o`.

The last print statement outputs `false` because the regex pattern matches an occurrence of zero or more quantities of string `o` and nothing more.

- One or more times matcher  (`+`): This is regarded as the *one or more* quantifier because it matches the instance of its preceding character occurring at least once. 

The following examples illustrate the `+` quantifier:

```java

    public static void main(String[] args){

        System.out.println("o".matches("o+"));
//          output: true

        System.out.println("oooooo".matches("o+"));
//          output: true

        System.out.println("helloo".matches("hello+"));
//          output: true

        System.out.println("hell".matches("hello+"));
//          output: false

        System.out.println("hell".matches("o+"));
//          output: false

    }
```

This scenario is similar to the `*` quantifier except that it requires one or more occurrences of it's immediate character.

It is important to note that regex matching is case-sensitive, and hence both lines of code in the examples given below each output boolean value `false` due to case-mismatch.


```java

    System.out.println("hello".matches("hellO+"));
//      output: false

    System.out.println("hello".matches("hellO*"));
//      output: false
```


- Zero or one-time matcher (`?`): This is regarded as the *zero or one* quantifier because it matches the instance of its preceding character occurring at most once. 

The following example illustrates the `?` quantifier:

```java

    String[] words = {"cat", "care", "cast", "car", "forth", "caree"};
    
    for(String word: words){
        if(word.matches("care?"))
            System.out.print(word + " ");
    }

//      output: care car
```

In the example above, we iterate through the string array with the variable name "words", and the array elements matching the provided regex pattern are output. 

The pattern matches strings containing the characters `c`, `a`, `r`, and at most, one occurrence of the character `e` positioned immediately. Finally, the results obtained are concatenated side by side with a white space between each word.

- N number of times matcher (`{n}`): This is regarded as the `n` quantifier, where `n` is an integer because it matches the instance of its preceding character occurring exactly n number of times. 

The following examples illustrate the `{n}` quantifier:

```java

    String words = {"bag", "sheet", "give", "show", "cling", "keep"};

    for(String word: words){
        if(word.matches("ke{2}p"))
            System.out.print(word + " ");
    }

//      output: keep

```

The output of this code is `keep` because the regex matches any element which has exactly two occurrences of the character `e` right in between the characters `k` and `p`.

- At least N number of times matcher (`{n, }`): The `{n,}` quantifier matches the instance of its preceding character occurring at least `n` number of times.


```java

    String words = {"bag", "feed", "give", "show", "cling", "fed"};

    for(String word: words){
        if(word.matches("fe{2,}d"))
            System.out.print(word + " ");
    }

//      output: feed

```

The output of this code is `feed` because the regex matches any element with at least two occurrences of the character `e` right in between the characters `f` and `d`.

- Match between N and M number of times (`{n,m}`): This quantifier matches the instance of its preceding character occurring between `n` and `m` number of times, with the values of `n` and `m` both being integer instances.

In the example below, the regex matches elements in the string array `words`. The string `words` contains between 2 and 5 instances of the character `0` that form a string.

```java

    String regexPattern = "0{2,5}";
    String values = {"00", "0", "000", "210", "0000", "0000000", "00000"};

    for(int i = 0; i < values.length; i++){
        if(values[i].matches(regexPattern)){
            System.out.println(values[i] + " matches the regex pattern and was found at index " + i);

        }
    }

//      The outputs are:
//        00 matches the regex pattern and was found at index 0
//        000 matches the regex pattern and was found at index 2
//        0000 matches the regex pattern and was found at index 4
//        00000 matches the regex pattern and was found at index 6

```

Quantifiers will match as many occurrences as possible for as long as the match is still successful. Due to this, they are referred to as `Greedy`. When a quantifier is superseded by a question mark (?), i.e. `*?`, the quantifier becomes reluctant or lazy. This causes it to match as few occurrences as possible as long as the match is still successful.

#### Character classes
A character class specifies a set of characters, whereby any one of such character sets should be present in a given string for a match to occur. A character class distinguishes certain categories of characters, sometimes with similar attributes from other characters. 

For example, it distinguishes alphabets from numbers, numbers from punctuation marks, specific alphabets from other alphabets, and so on.

| Characters | Description |
| ---------- | ----------- |
| `.`   | The dot (.) matches any character except the newline character `\n` and the carriage return character `\r`. |
|  `\d` | This character matches any single decimal value or number, or digit. |
| `\D` | This matches any single character that is not a digit. |
| `\w` | This matches any single alphanumeric character, that is, an alphabetical character, numerals as well as the underscore character `_` |
| `\W` | This matches any single character that is not alphanumeric. |
| `\s` | This matches any white space character. |
| `\S` | This matches any non-whitespace character.|

#### Character groups and ranges
- The square bracket `[ ]` is used to contain a range of characters.

`[a-z]` matches any lowercase alphabetic character.

`[A-Z]` matches any uppercase alphabetic character.

`[0-9]` matches any single instance of a digit.

`[a-zA-Z0-9]` matches any single occurrence of an alphabetic character or a digit.

`\\w+|\\d+` matches a string containing either only alphanumeric characters or numeric digits.

- The parenthesis `( )` matches the enclosed characters in the exact order in which they are defined. 

`(\\w+\\s\\w+)` matches `hello world`

- Vertical line `|` matches characters or groups of characters on either side of the line. This can be interpreted as the `or` operator in regex.

#### Assertions
We use assertions to specify the boundaries within which a match should occur. They are also known as regex anchors.

| Character | Meaning|
| ----------|--------|
|  `^`      | This ensures that the match starts at the beginning of the string or line. When we use assertion at the start of character groups or ranges, it ensures that every other character except the specified characters in the group is a match.|
| `$`       | This ensures that the match occurs at the end of the string or before a newline character.|
| `\b`      | This denotes a word boundary and matches the occurrence of characters not preceded or followed by any word character. For example, string `anna` matches the pattern `\\b\\w+` because any other word character does not precede the string. Still, it is not a match for `a\\b` because the first character `a` is immediately preceded by other word characters.|
| `\B`      | This matches a non-word boundary, given a position where the previous and next characters are either both words or both non-words.|

#### Character escape ('\')
The backslash `\` is used to obtain the literal meaning or value, usually a quantifier or any other special character. For example, to obtain the literal backslash character, it is required to be escaped `\\`.

It also indicates that the character that follows it is special, as described in the character classes section of this article.

### Java Pattern and Matcher APIs
The Java class Pattern represents a compiled regular expression. The regex pattern is created using the `Pattern.compile()` method. `Pattern.compile()` is an overloaded method whose first or only parameter (depending on its method is invoked) is a String. The String argument contains the regex pattern to be matched.  

The Java class Matcher performs match operations on Strings or character sequences by interpreting a compiled regex pattern.

```java


    public static void main(String[] args){
        String statements = """
                Paul's wedding was 09/15/2002
                Today's date is 07/16/2015
                Priscilla graduated on 10/25/20
                """;

        Pattern compiledRegex = Pattern.compile("P.*\\d{1,2}/\\d{1,2}/\\d{1,2}");
        Matcher regexMatcher = compiledRegex.matcher(statements);

        while(regexMatcher.find())
            System.out.println(regexMatcher.group());

//          output: Paul's wedding was 09/15/20
//                  Priscilla graduated on 10/25/20  


    }
```


The Java class `Pattern` compiles the regex pattern, then creates the Matcher instance, `regexMatcher`, which also holds the returned value of the compiled regex pattern.

`Matcher` method `find` matches a portion of the string to the search pattern and outputs the portion of the string that matches the search pattern.

It is important to note that the method `matches` of class String, Pattern, or matcher returns a boolean value `true` if the whole string matches the regular expression pattern. 

### Some string methods that apply regex
Given two instances of a string with variable names `s` and `replacement` and regex patterns represented as `regex`, we can carry out the following operations on `s`:

- `s.replaceFirst(“regex”, “replacement”)`: This replaces the first occurrence of `regex` in `s` with `replacement`.

- `s.replaceAll(“regex”, “replacement”)`: This replaces all occurrences of `regex` in `s` with `replacement`.

- `s.matches(“regex”)`: This evaluates the `s` and returns `true` if the entire sequence of characters in `s` matches the regex pattern in the method argument denoted as `regex`.

- `s.split(“regex”)`: This iterates through `s` and at an intersection(s) which match `regex`, it separates the composing character sequence of `s` as substrings stored in a String array. `regex` is not included in the resulting string array.

### Password pattern validation using regex
Let us proceed to practice what we’ve learned so far by building a regex pattern that validates that a given password matches the following requirements:
- The password contains at least one upper case character.
- The password contains at least one lower case character.
- The password contains at least one digit.
- The password contains at least one special character.
- The password is at least seven characters long.

The pattern should be constructed such that the sequence of the character should not be a determinant of the match; rather, the regex is expected to check that the required characters are present in the given password.

```java

    public static void main(String[] args){

        String invalidPasswordRegex = "^([^0-9]*|[^A-Z]*|[^a-z]*|.{0,6}|[a-zA-z0-9]*)";
        String[] passwords = {"_conDitional4", "guerrilA", "Fies8&", "Salutation_007"};

        for(String password: passwords){
            if(!password.matches(invalidPasswordRegex)){
                System.out.println(password + " is a valid password match");
            }else{
                System.out.println(password + " is not a valid password match");
            }
        }

//      output: 
//              _conDitional4 is a valid password match
//              _guerrilA is not a valid password match
//              Fies8& is not a valid password match
//              Salutation_007 is a valid password match


    }
```

The regex assigned to the `invalidPasswordRegex` variable is an invalid password regex that does not match each and all of our requirements. `passwords` is an array of prospective password inputs. We iterate the array, and any password that does not match the invalid password regex is valid; otherwise, the given password is invalid.

### Conclusion
Although regular expression can be understandably difficult to read and implement, I believe that with a thorough understanding of the composing units of regex and proper piecing together of these units, the application is endless, and it gets better with practice.

Happy learning!

### References
- [Mastering Regular Expressions, 3rd Edition [Book]](https://www.oreilly.com/library/view/mastering-regular-expressions/0596528124/?CMP%3DAFC-ak_book%26ATT%3DMastering%2BRegular%2BExpressions)
- [Java How to Program, 11/e, Early Objects Version](https://deitel.com/java-how-to-program-11-e-early-objects-version/)
- [java.util.regex (Java Platform SE 8 )](https://docs.oracle.com/javase/8/docs/api/index.html?java/util/regex/package-summary.html)
- [Regular expressions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Regular Expressions](https://eloquentjavascript.net/09_regexp.html)
- [Regular expressions in Java - Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)
- [Regular Expression Language - Quick Reference](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference%23character-classes)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)
