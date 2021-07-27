### HOW TO IMPLEMENT REGULAR EXPRESSIONS (REGEX) WITH JAVA

The need to validate string inputs is a ubiquitous necessity that projects would require every developer to use at some point in their programming activities. Regular Expression, popularly referred to as regex, is a handy tool designed to validate string operations very effectively.

The application of regex can be pretty daunting, especially to beginners. This is mainly due to the unusual or strange combinations of the characters applied in the expressions, making the syntax challenging to interpret.

Hence, I’ll attempt to simplify this article as much as possible, thereby making it beginner-friendly. I’ll guide us (hopefully in an effective way) by interpreting patterns in Regular Expressions using Java. 

### INTRODUCTION

Regular Expressions can be regarded as strings used to describe search patterns that match the occurrences and combinations of characters in other strings.

In addition to searching a character or a combination of characters, regex is also used to:

* extract strings, 
* delete substrings, 
* edit strings,
* replace substrings, 
* split strings, 
* as well as to validate strings to ensure they abide by a predefined scheme and requirements.

In most programming languages, strings are immutable, and the operations mentioned above would require the formation of a new string literal or object.

#### WHY REGULAR EXPRESSION?

Imagine you want to validate that a date input matches the format “MM/DD/YYYY”, while ensuring that the values provided for the month, day and year are valid for their respective fields, that is, the values are digits, and the month is between 1 and 12, the value of the day is valid with respect to the month and so on.

Also, imagine you want to ensure that the value provided in an email address field is in a valid email address format while recognizing that an email address could be composed of alphanumeric characters, special characters within the email username, the “@” character separating the username from the domain name, a dot separating the domain name from the domain. One could ordinarily attempt to iterate through the string while performing a combination of IF statements to ascertain the validity of the input. This is not an effective solution as it would result in your code becoming more complex and could reduce performance.

However, with an accurate combination of the regex characters, you can achieve this with at least a line of code, thereby making your program more readable, cleaner, and more scalable. Regex has a broad range of usages. One can use one regular expression to validate a variety of inputs.

Many programming languages support regex; you get to do more with fewer lines of code, thereby keeping your code cleaner. Validations are faster when compared to applying IF and ELSE statements.

In the following sections, we shall look at how these expressions can be applied using the Java programming language.

### INTERPRETATION OF REGULAR EXPRESSIONS

As mentioned earlier, regex combines simple characters and special characters that perform pattern matching on strings. This implies that each character composed in the regex string, combined with other characters, is responsible for executing the expected match. Most regex characters are matched to themselves. In other words, the character ‘a’ if composed in a regex pattern would be matched to the character ‘a’ in the input string. 

![matching string variable with regex](/regex-implementation-with-java/4xvou6_ibborrpudrcn_.png)

In the code above, the predicate method `.matches(“hello”)` which takes a string argument representing a regex pattern is invoked on the string variable “word” to ascertain that its value “hello” matches the given regex pattern, “hello”. The program outputs the boolean value `true` because the length and order of the characters of the value in the word variable is an exact match with the regex. This can also be performed on a string literal, and the output would be the same.

![matching string literal with regex](/regex-implementation-with-java/w3uyuy2tsxkh9ovc9qdg.png)

Sometimes, this is not always the case. The inclusion of special characters referred to as metacharacters redefines the interpretation of the associated character and the overall pattern of the regex. Some of these metacharacters include but are not restricted to `+ * ? \ [ ] ( ) `.

#### METACHARACTERS

These are characters that denote special meanings in the processing of regex patterns. They are usually represented by special characters that you can sometimes use independently or in association with other characters to provide a defined pattern. 

Metacharacters are categorized differently depending on their functionalities as, but not limited to:

* Quantifiers
* Character escapes
* Character classes

#### QUANTIFIERS

A quantifier is used to specify the number of occurrences of a character that it precedes. It is usually placed right after a character or character class (which will be discussed subsequently in this article) to specify how many instances of such preceding instance must be present for the input to be matched.

* Zero or more times matcher (`*`): This is regarded as the “Zero or more” quantifier because it matches the instance of its preceding character occurring any number of times. The following examples illustrate the `*` quantifier:

![Zero or more times quantifier](/regex-implementation-with-java/bvj1t4ysuzgbamt03rmm.png)

In line 4 of the code above, the output is `true` because the character ‘o’ which precedes the `*`  in the regex expression `o*` matches the string literal `o`. Recall that the `*` quantifier matches a zero or more occurrences of its preceding character in the given string. An occurrence of 1 instance of the string `o` is a match on the regex pattern. This logic is also synonymous with the match in line 7. The output is `true` because multiple instances of the character `o` forming the given string literal are a match on the regex pattern.

In line 10, despite the combination of different characters preceding the quantifier in the regex pattern, the output is `true` because the sequence of the characters ‘h’, ‘e’, ‘l’, ‘l’, ‘o’ which precede the quantifier is an exact match of the string literal invoking the method, and also because the character ‘o’ which immediately precedes the quantifier occurs at least zero number of time. This logic is also synonymous to the match the code in line 13 in which the output is `true` because the occurrence of the character `o` which precedes the quantifier is zero, but the sequence of the other preceding characters is a match.

On the contrary, the code in line 16 outputs `false` because the regex defines its pattern to match an occurrence of exactly zero or more quantities of string “o” and nothing more, but the string literal “hell” contains other characters which were not accounted for in the regex pattern.

* One or more times matcher  (`+`): This is regarded as the “one or more” quantifier because it matches the instance of its preceding character occurring at least once. The following examples illustrate the `+` quantifier:

![One or more times quantifier](/regex-implementation-with-java/k91o_delu-5anhl6nnlh.png)

Using the same set of examples applied in the `*` quantifier above, the outputs of lines 4, 7, 10 are each of boolean value `true` because the instances of the immediate character (‘o’) preceding the `+` quantifier occur at least once in each example. 

Line 13 outputs boolean value `false` because despite the sequence of the preceding characters ‘h’, ‘e’, ‘l’, ‘l’ matching that of the regex pattern, the `+` quantifier expects at least one occurrence of ‘o’ immediately after the second ‘l’ character which turns out to be absent at the expected index of the string literal. 

Line 16 outputs `false` because the regex defines its pattern to match an occurrence of exactly one or more quantities of string “o” and nothing more, but the string literal “hell” contains other characters which were not accounted for in the regex pattern, as well as no occurrence of the character ‘o’.

It is important to note that the regex matching is case-sensitive, and hence both lines of code in the examples given below each output boolean value `false` as a result of case-mismatch.

![case mismatch effect on regex](/regex-implementation-with-java/y-0m7paj7-xrjqmergdf.png)

* Zero or One time matcher (`?`): This is regarded as the “zero or one” quantifier because it matches the instance of its preceding character occurring at most once. The following example illustrates the `?` quantifier:

![zero or one time matcher](/regex-implementation-with-java/xgm9bwyjfut1j_aqbznu.png)

In the given example above, the string array with the variable name “words” is iterated and elements of the array that match the provided regex pattern are output. The pattern matches strings containing the characters ‘c’, ‘a’, ‘r’, and at most, one occurrence of the character ‘e’ positioned immediately. The results obtained are concatenated side by side with a white space between each word.

* N number of times matcher (`{n}`): This is regarded as the “n” quantifier, where ‘n’ is an integer because it matches the instance of its preceding character occurring exactly n number of times. The following examples illustrate the `{n}` quantifier:

![N number of times matcher](/regex-implementation-with-java/n5qrb_vnkr-whmcv5f8w.png)

The output of this code is “keep ” because the regex matches any element which has exactly two occurrences of the character ‘e’ right in between the characters ‘k’ and ‘p’.

* At least N number of times matcher (`{n, }`): The `{n,}` quantifier matches the instance of its preceding character occurring at least ‘n’ number of times.

![At least N number of times matcher](/regex-implementation-with-java/uvpord3vwvmip9hj9xur.png)

The output of this code is “feed ” because the regex matches any element with at least two occurrences of the character ‘e’ right in between the characters ‘f’ and ‘d’.

* Match between N and M number of times (`{n,m}`): This quantifier matches the instance of its preceding character occurring between ‘n’ and ‘m’ number of times, with the values of ‘n’ and ‘m’ both being integer instances.

In the example below, the regex matches elements in the string array `words` which contain between 2 and 5 instances of the character ‘0’ to form a string.

![match between N and M number of times](/regex-implementation-with-java/f5weoqb_mle0sp8udoyk.png)

Quantifiers will match as many occurrences as possible, for as long as the match is still successful. Due to this, they are referred to as “Greedy”.  However, in a situation where a quantifier is superseded by a question mark (?) such as in the format `*?`, the quantifier becomes reluctant or lazy. This causes it to match as few occurrences as possible as long as the match is still successful.

#### CHARACTER CLASSES

A character class is used to specify a set of characters, whereby any one of such sets is required to be present in a given string for a match to occur. It is used to distinguish certain categories of characters, sometimes with similar attributes from other characters. For example, distinguishing alphabets from numbers, numbers from punctuation marks, specific alphabets from other alphabets, and so on.


| Characters | Description |
| ---------- | ----------- |
| `.`        | The dot (.) is used to match any single character except the newline character ‘\n’ and the carriage return character ‘\r’. |
|  `\d` | This character matches any single decimal value or number or digit. |
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
|  `^`      | This ensures that the match starts at the beginning of the string or line. However, when this is used at the start of character groups or ranges, it ensures that every other character except the specified characters in the group is a match.|
| `$`       | This ensures that the match occurs at the end of the string or before a newline character.|
| `\b`      | This denotes a word boundary and matches the occurrence of characters not preceded or followed by any word character. For example, string “anna” matches the pattern `\\b\\w+` because any other word character does not precede the string. Still, it is not a match for `a\\b` because the first character ‘a’ is immediately preceded by other word characters.|
| `\B`      | This matches a non-word boundary, given a position where the previous and next characters are either both words or both non-words.|

#### CHARACTER ESCAPE (`\`)

The backslash `\` is used to obtain the literal meaning or value of a character, usually a quantifier or any other special character. For example, to obtain the literal backslash character, it is required to be escaped `\\`.

It is also used to indicate that the character that follows it is a special character as described in the character classes section of this article.

### JAVA PATTERN AND MATCHER APIs

The Java class Pattern represents a compiled regular expression. The regex pattern is created using the `Pattern.compile()` method. This is an overloaded method whose first or only parameter (depending on its method is invoked) is a String. The String argument contains the regex pattern to be matched. 

The Java class Matcher performs match operations on Strings or character sequences by interpreting a compiled regex pattern. 

![Java Pattern and Matcher example](/regex-implementation-with-java/xeyp8nanon6o8aadgfua.png)

Line 12 compiles the regex pattern and stores the value in the variable `compiledRegex` which is an instance of the `Pattern` class. Line 13 creates the Matcher instance, `regexMatcher`, which holds the return value of the compiled regex pattern matching the String literal with variable name `statements`.

In line 14, `Matcher` method `find` matches a portion of the String to the search pattern. Line 15 outputs the portion of the String that matches the search pattern.

It is important to note that the method `matches` of class String, Pattern, or Matcher returns a boolean value `true` if the whole String to be matched matches the regular expression. 

### SOME STRING METHODS THAT APPLY REGEX

Given two instances of String with variable names `s` and `replacement` and regex patterns represented as “regex”, the following operations can be carried out on `s`:

* `s.replaceFirst(“regex”, “replacement”)` : This replaces the first occurrence of `regex` in `s` with `replacement`.

* `s.replaceAll(“regex”, “replacement”)`: This replaces all occurrences of `regex` in `s` with `replacement`.

* `s.matches(“regex”)` : This evaluates the `s` and returns `true` if the entire sequence of characters in `s` matches the regex pattern in the method argument denoted as `regex`.

* `s.split(“regex”)` : This iterates through `s` and at an intersection(s) which match `regex`, it separates the composing character sequence of `s` as substrings which are stored in a String array. `regex` is not included in the resulting string array.

### PASSWORD PATTERN VALIDATION USING REGEX

After all is said and done, let us proceed to practice what we’ve learned so far by building a regex pattern that validates that a given password matches the following requirements:

* The password contains at least one upper case character.
* The password contains at least one lower case character.
* The password contains at least one digit.
* The password contains at least one special character.
* The password is at least 7 characters long.

The pattern should be constructed such that the sequence of the character should not be a determinant of the match, rather, the regex is expected to check that the required characters are present in the given password.

While trying to come up with a solution to this, my first attempt was to match the possible sequence of the characters. This turned out to be a cumbersome solution as the possible combinations are at least 5 factorial. And so I figured that what if we construct a regex for an invalid password, and any password input which doesn’t match this regex is a valid password. In order to achieve this, we’ll take advantage of the `|` operator.

![password regex pattern implementation](/regex-implementation-with-java/oz6ycgbik5qjwldeu_8t.png)

The regex provided in line 4 is an invalid password regex that does not match each and all of our requirements. Line 5 is an array of prospective password inputs. The array is iterated through, and in line 8, any password which does not match the invalid password regex is a valid password; else, the given password is invalid.

### CONCLUSION

The usefulness of regular expression cannot be overemphasized. Although it could be understandably difficult to read and implement, I believe that with a thorough understanding of the composing units of regex and proper piecing together of these units, the application is endless, and it gets better with practice.

### REFERENCES

* [Mastering Regular Expressions, 3rd Edition [Book]](https://www.oreilly.com/library/view/mastering-regular-expressions/0596528124/?CMP%3DAFC-ak_book%26ATT%3DMastering%2BRegular%2BExpressions)
* [Java How to Program, 11/e, Early Objects Version](https://deitel.com/java-how-to-program-11-e-early-objects-version/)
* [java.util.regex (Java Platform SE 8 )](https://docs.oracle.com/javase/8/docs/api/index.html?java/util/regex/package-summary.html)
* [Regular expressions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
* [Regular Expressions](https://eloquentjavascript.net/09_regexp.html)
* [Regular expressions in Java - Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)
* [Regular Expression Language - Quick Reference](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference%23character-classes)
