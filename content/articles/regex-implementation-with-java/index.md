### HOW TO IMPLEMENT REGULAR EXPRESSIONS (REGEX) WITH JAVA

The need to validate string inputs is a ubiquitous necessity that projects would require every developer to use at some point in their programming activities. A regular expression, popularly referred to as regex, is a handy tool designed to validate string operations effectively.

The application of regex can be pretty daunting, especially to beginners. This is mainly due to the unusual or strange combinations of the characters applied in the expressions, making the syntax challenging to interpret.

### INTRODUCTION

Regular Expressions are strings used to describe search patterns that match the occurrences and combinations of characters in other strings.

In addition to searching a character or a combination of characters, We can also use regex to:

* extract strings, 
* delete substrings, 
* edit strings,
* replace substrings, 
* split strings, 
* as well as to validate strings to ensure they abide by a predefined scheme and requirements.

In most programming languages, strings are immutable, and the operations mentioned above would require the formation of a new string literal or object.

#### WHY REGULAR EXPRESSION?

Imagine you want to validate that a date input matches the format “MM/DD/YYYY” while ensuring that the values provided for the month, day and year are valid for their respective fields, that is, the values are digits, and the month is between 1 and 12, the value of the day is valid with respect to the month and so on.

Imagine you want to validate that the value provided in an email address field is in a valid email address. An email address could be composed of alphanumeric characters, special characters within the email username, the “@” character separating the username from the domain name, a dot separating the domain name from the domain. One could ordinarily attempt to iterate through the string while performing a combination of `IF` statements to ascertain the validity of the input. Use of `IF` statements is not an effective solution as it would result in your code becoming more complex and could reduce performance.

However, with an accurate combination of the regex characters, you can validate emails with at least a line of code, thereby making your program more readable, cleaner, and more scalable. Regex has a broad range of usages.

### INTERPRETATION OF REGULAR EXPRESSIONS

As mentioned earlier, regex combines simple characters and special characters that perform pattern matching on strings. Every character composed in the regex string, combined with other characters, is responsible for executing the expected match. Most regex characters match themselves. In other words, the character ‘a’ if composed in a regex pattern, would be compared to the character ‘a’ in the input string.


```java

    public static void main(String[] args){

        String word = "hello";
        System.out.println(word.matches("hello"));

 //      output: true  
 
    }
```

In the code above, the predicate method `.matches(“hello”)` which takes a string argument representing a regex pattern, is invoked on the string variable `word` to ascertain that its value “hello” matches the given regex pattern, “hello”. The program outputs the boolean value `true` because the length and order of the characters of the value in the word variable match the regex.

```java

    public static void main(String[] args){

        System.out.println("hello".matches("hello"));

//       output: true

    }

```


The inclusion of special characters redefines the interpretation of the associated character and the overall pattern of the regex. Some of these metacharacters include but are not restricted to `+ * ? \ [ ] ( ) `.

#### METACHARACTERS

These are characters that denote special meanings in the processing of regex patterns. Metacharacters are special characters that can be used independently or with other characters to provide a defined pattern. 

Metacharacters are categorized differently depending on their functionalities as, but not limited to:

* Quantifiers
* Character escapes
* Character classes

#### QUANTIFIERS

A quantifier is used to specify the number of occurrences of a character that it precedes. It is usually placed right after a character or character class (which will be discussed subsequently in this article) to specify how many instances of such preceding instance must be present for the input to be matched.

* Zero or more times matcher (`*`): This is regarded as the “Zero or more” quantifier because it matches the instance of its preceding character occurring any number of times. The following examples illustrate the `*` quantifier:


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

In the code above, the output for each print statement (except the last print statement) is `true` because the character ‘o’, which precedes the `*`  in the regex expression `o*` matches the string literal `o`. Recall that the `*` quantifier matches a zero or more occurrences of its preceding character in the given string. Thus, one instance of the string `o` is a match on the regex pattern. This logic is also synonymous with the match in the second print statement with string literal `oooooo`. The output is `true` because multiple instances of the character `o` forming the given string literal are a match on the regex pattern.

For the third print statement, despite the combination of different characters preceding the quantifier in the regex pattern, the output is `true` because the sequence of the characters ‘h’, ‘e’, ‘l’, ‘l’, ‘o’ which precede the quantifier is an exact match of the string literal invoking the method, and also because the character ‘o’ which immediately precedes the quantifier occurs at least zero number of time. This logic is also synonymous to the match the code in the fourth print statement in which the output is `true` because the occurrence of the character `o` which precedes the quantifier is zero, but the sequence of the other preceding characters is a match.

On the contrary, the code in the last print statement outputs `false` because the regex defines its pattern to match an occurrence of exactly zero or more quantities of string “o” and nothing more, but the string literal “hell” contains other characters which were not accounted for in the regex pattern.

* One or more times matcher  (`+`): This is regarded as the “one or more” quantifier because it matches the instance of its preceding character occurring at least once. The following examples illustrate the `+` quantifier:

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


Using the same set of examples applied in the `*` quantifier above, the outputs of the first three print statements are each of boolean value `true` because the instances of the immediate character (‘o’) preceding the `+` quantifier occur at least once in each example. 

The fourth print statement outputs boolean value `false` because, despite the sequence of the preceding characters ‘h’, ‘e’, ‘l’, ‘l’ matching that of the regex pattern, the `+` quantifier expects at least one occurrence of ‘o’ immediately after the second ‘l’ character which turns out to be absent at the expected index of the string literal. 

The last print statements outputs `false` because the regex defines its pattern to match an occurrence of exactly one or more quantities of string “o” and nothing more, but the string literal “hell” contains other characters which were not accounted for in the regex pattern, as well as no occurrence of the character ‘o’.

It is important to note that regex matching is case-sensitive, and hence both lines of code in the examples given below each output boolean value `false` as a result of case-mismatch.

```java

    System.out.println("hello".matches("hellO+"));
//      output: false

    System.out.println("hello".matches("hellO*"));
//      output: false
```


* Zero or One-time matcher (`?`): This is regarded as the “zero or one” quantifier because it matches the instance of its preceding character occurring at most once. The following example illustrates the `?` quantifier:

```java

    String[] words = {"cat", "care", "cast", "car", "forth", "caree"};
    
    for(String word: words){
        if(word.matches("care?"))
            System.out.print(word + " ");
    }

//      output: care car
```


In the given example above, the string array with the variable name “words” is iterated and elements of the array that match the provided regex pattern are output. The pattern matches strings containing the characters ‘c’, ‘a’, ‘r’, and at most, one occurrence of the character ‘e’ positioned immediately. The results obtained are concatenated side by side with a white space between each word.

* N number of times matcher (`{n}`): This is regarded as the “n” quantifier, where ‘n’ is an integer because it matches the instance of its preceding character occurring exactly n number of times. The following examples illustrate the `{n}` quantifier:

```java

    String words = {"bag", "sheet", "give", "show", "cling", "keep"};

    for(String word: words){
        if(word.matches("ke{2}p"))
            System.out.print(word + " ");
    }

//      output: keep

```


The output of this code is “keep ” because the regex matches any element which has exactly two occurrences of the character ‘e’ right in between the characters ‘k’ and ‘p’.

* At least N number of times matcher (`{n, }`): The `{n,}` quantifier matches the instance of its preceding character occurring at least ‘n’ number of times.


```java

    String words = {"bag", "feed", "give", "show", "cling", "fed"};

    for(String word: words){
        if(word.matches("fe{2,}d"))
            System.out.print(word + " ");
    }

//      output: feed

```


The output of this code is “feed ” because the regex matches any element with at least two occurrences of the character ‘e’ right in between the characters ‘f’ and ‘d’.

* Match between N and M number of times (`{n,m}`): This quantifier matches the instance of its preceding character occurring between ‘n’ and ‘m’ number of times, with the values of ‘n’ and ‘m’ both being integer instances.

In the example below, the regex matches elements in the string array `words` which contain between 2 and 5 instances of the character ‘0’ to form a string.

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


Quantifiers will match as many occurrences as possible, for as long as the match is still successful. Due to this, they are referred to as “Greedy”.  However, in a situation where a quantifier is superseded by a question mark (?) such as in the format `*?`, the quantifier becomes reluctant or lazy. This causes it to match as few occurrences as possible as long as the match is still successful.

#### CHARACTER CLASSES

A character class is used to specify a set of characters, whereby any one of such sets is required to be present in a given string for a match to occur. It is used to distinguish certain categories of characters, sometimes with similar attributes from other characters. For example, distinguishing alphabets from numbers, numbers from punctuation marks, specific alphabets from other alphabets, and so on.


| Characters | Description |
| ---------- | ----------- |
| `.`        | The dot (.) is used to match any single character except the newline character ‘\n’ and the carriage return character ‘\r’. |
|  `\d` | This character matches any single decimal value or number or digit. |
| `\D` | This matches any single character that is not a digit. |
| `\w` | This matches any single alphanumeric character, that is, any alphabetical character, digits as well as the underscore character ‘_’ |
| `\W` | This matches any single character that is not alphanumeric. |
| `\s` | This matches any white space character. |
| `\S` | This matches any non-whitespace character.|

#### CHARACTER GROUPS AND RANGES

* The square bracket `[ ]` is used to contain a range of characters, any of which is required to be present in the string for a match to occur. 

    `[a-z]` matches any lowercase alphabetic character.

    `[A-Z]` matches any uppercase alphabetic character.

    `[0-9]` matches any single instance of a digit.

    `[a-zA-Z0-9]` matches any single occurrence of an alphabetic character or a digit.

    `\\w+|\\d+` matches a string containing either only alphanumeric characters or numeric digits.

* The parenthesis `( )` matches the enclosed characters in the exact order in which they are defined. 

    `(\\w+\\s\\w+)` matches `hello world`

* Vertical line `|` matches characters or groups of characters on either side of the line. This can be interpreted as the “or” operator of regex.

#### ASSERTIONS

Assertions are used to specify boundaries within which a match should occur. They are also referred to as regex anchors.



| Character | Meaning|
| ----------|--------
|  `^`      | This ensures that the match starts at the beginning of the string or line. However, when this is used at the start of character groups or ranges, it ensures that every other character except the specified characters in the group is a match.|
| `$`       | This ensures that the match occurs at the end of the string or before a newline character.|
| `\b`      | This denotes a word boundary and matches the occurrence of characters not preceded or followed by any word character. For example, string “anna” matches the pattern `\\b\\w+` because any other word character does not precede the string. Still, it is not a match for `a\\b` because the first character ‘a’ is immediately preceded by other word characters.|
| `\B`      | This matches a non-word boundary, given a position where the previous and next characters are either both words or both non-words.|

#### CHARACTER ESCAPE (`\`)

The backslash `\` is used to obtain the literal meaning or value of a character, usually a quantifier or any other special character. For example, to obtain the literal backslash character, it is required to be escaped `\\`.

It is also used to indicate that the character that follows it is special as described in the character classes section of this article.

### JAVA PATTERN AND MATCHER APIs

The Java class Pattern represents a compiled regular expression. The regex pattern is created using the `Pattern.compile()` method. This is an overloaded method whose first or only parameter (depending on its method is invoked) is a String. The String argument contains the regex pattern to be matched. 

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


In the code above, the Java class `Pattern` compiles the regex pattern and stores the value in the variable `compiledRegex` - an instance of the `Pattern` class which then creates the Matcher instance, `regexMatcher`, which also holds the returned value of the compiled regex pattern matching the string literal with variable name `statements`.

`Matcher` method `find` matches a portion of the string to the search pattern and outputs the portion of the string that matches the search pattern.

It is important to note that the method `matches` of class String, Pattern, or matcher returns a boolean value `true` if the whole string to be matched matches the regular expression. 

### SOME STRING METHODS THAT APPLY REGEX

Given two instances of string with variable names `s` and `replacement` and regex patterns represented as “regex”, the following operations can be carried out on `s`:

* `s.replaceFirst(“regex”, “replacement”)` : This replaces the first occurrence of `regex` in `s` with `replacement`.

* `s.replaceAll(“regex”, “replacement”)`: This replaces all occurrences of `regex` in `s` with `replacement`.

* `s.matches(“regex”)`: This evaluates the `s` and returns `true` if the entire sequence of characters in `s` matches the regex pattern in the method argument denoted as `regex`.

* `s.split(“regex”)`: This iterates through `s` and at an intersection(s) which match `regex`, it separates the composing character sequence of `s` as substrings which are stored in a String array. `regex` is not included in the resulting string array.

### PASSWORD PATTERN VALIDATION USING REGEX

After all is said and done, let us proceed to practice what we’ve learned so far by building a regex pattern that validates that a given password matches the following requirements:

* The password contains at least one upper case character.
* The password contains at least one lower case character.
* The password contains at least one digit.
* The password contains at least one special character.
* The password is at least 7 characters long.

The pattern should be constructed such that the sequence of the character should not be a determinant of the match, rather, the regex is expected to check that the required characters are present in the given password.

While trying to come up with a solution to this, my first attempt was to match the possible sequence of the characters. This turned out to be a cumbersome solution as the possible combinations are at least 5 factorial. And so I figured that what if we construct a regex for an invalid password, and any password input which doesn’t match this regex is a valid password. To achieve this, we’ll take advantage of the `|` operator.


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

### CONCLUSION

Although regular expression can be understandably difficult to read and implement, I believe that with a thorough understanding of the composing units of regex and proper piecing together of these units, the application is endless, and it gets better with practice.

### REFERENCES

* [Mastering Regular Expressions, 3rd Edition [Book]](https://www.oreilly.com/library/view/mastering-regular-expressions/0596528124/?CMP%3DAFC-ak_book%26ATT%3DMastering%2BRegular%2BExpressions)
* [Java How to Program, 11/e, Early Objects Version](https://deitel.com/java-how-to-program-11-e-early-objects-version/)
* [java.util.regex (Java Platform SE 8 )](https://docs.oracle.com/javase/8/docs/api/index.html?java/util/regex/package-summary.html)
* [Regular expressions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
* [Regular Expressions](https://eloquentjavascript.net/09_regexp.html)
* [Regular expressions in Java - Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)
* [Regular Expression Language - Quick Reference](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference%23character-classes)

