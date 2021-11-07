### A look at C-Sharp coding conventions
### Introduction
Below are what may be termed as some of the benefits of coding conventions.
1. They make code copying, changing, and maintaining a lot easier.

2. They help readers understand the code faster by allowing them to make assumptions based on prior knowledge.

3. They give the code a unified design so readers may concentrate on the content rather than the layout.

4. They tell the best way to utilize C# in the most ideal manner.

There are therefore several coding conventions that are used in c-Sharp programming language
1. Naming conventions
2. Layout conventions
3. Commenting conventions
4. Naming conventions

There are a few naming conventions that should be followed while writing C# code.

All information about public elements applies as well to protected and protected internal elements in the following scenarios, which are all supposed to be visible to external callers.

**Pascal's Case**

In Pascal Case, every first letter of every word is capitalized as displayed in the example below. 

You can use the Pascal case for identifiers with three or more characters.

When naming a class, record, or struct, use pascal casing ("PascalCasing"). Take a look at the example below
```
PublicSchool1
```
```c#
public class PascalCase1
{
}
public record PublicIntitution1(
    string Country,
    string County,
    string Village,
    );
public struct ValueCoordinate1
{
}
```
In addition to prefixing the name with an I, When naming an interface, use pascal casing. Customers can tell it's a user interface because of this.
```c#
public interface IPublicInstitution
{
}
```
In addition to what we already have, public members of types can be named using pascal case.
```c#
public class PracticeExample1
{
    // public field
    public bool IsValid;

    // An init-only property is a property that allows you to do something only once.
    public IBuilding Building { get; init; }

    // An example of an event
    public event Action EventProcessing;

    // Implementation of a method
    public void StartEventProcessing()
    {
        // Use of a local function
        static int CountQueueItems() => WorkerQueue.Count;
        
    }
}
```
Since parameters are public properties of the record, use pascal casing when putting down positional accounts.
```c#
public record PublicIntitution
(
    string Country,
    string County,
    string Village,
);
```
**Camel case**

The camelCasing convention, which is solely used for parameter names, capitalizes the first letter of each word except the first, as demonstrated in the examples below.
```
voidMain
```
Another implementation of camel case is when naming private or internal fields
```
camelCasing
```
```c#
public class DataService
{
    private IWorkerQueue _workerQueue;
}
```
It is also highly advisable that when dealing with thread and internal fields it is good to use the s_prefix and the t_prefix for the static fields respectively.
```c#
public class DataService
{
    private static IWorkerQueue s_workerQueue;

    [ThreadStatic]
    private static TimeSpan t_timeSpan;
}
```
Camel casing is additionally utilized while executing most of the method parameters.
```c#
public T SomeMethod<T>(int someNumber, bool isValid)
{
}
```
Apart from the above conventions, there are other several conventions that a programmer needs to consider and apply while in their daily routine of programming.
1. The choice of word
Use identifiers names that are easily readable.
Underscores, hyphens, and other non-alphanumeric characters should not be used.
2. Hungarian notation is not acceptable or is not encouragable to use it.
3. The utilization of Abbreviations and Acronyms. 
Do not utilize acronyms that aren't generally recognized, and even if they are, only use them when essential.
4. Abbreviations and contractions should not be used in identifier names.
5. Use GetWindow instead of GetWin.

**Layout Conventions**

For a clear understanding of the code and it's structure, formatting is exercised as a coding convention.

Some of the layout coding conventions are:

- Use the Code Editor's default settings that uses smart indenting, four-character indents and tabs that are saved as spaces. 
- Each line should take should accomodate just one statement.
- Each line should only accomodate just one declaration.
- In the event that the continuation lines are not indented consequently, indent them one tab stop.
- At least a single blank line is supposed to be added in between the property definitions and the method.

Use enclosure or parenthesis to make provisions in an articulation clear, as displayed in the code beneath.
```c#
if ((valxyz > valxyz) && (valabc > valabc))
{
    // Here is what you will do.
}
```
**Coding conventions for commenting**

It is advisable to wrire a comment on its own separate line for better understandability.
Start your comment with an uppercase letter.
A period should be used to end the remark text.
It is also advisable to place a single space between the comment delimiter (//) and the comment content, as displayed in the example below.
```c#
// This is a comment used in C-Sharp programming language.
// This is a single line comment.
```
- It is not advisable to use formatted blocks of asterisks to surround comments.
- Unearth that all public members are using the appropriate XML comments to describe their actions.
### A look at some language guidelines
**String data types**

To join small strings end to end, string interpolation is used as explained in the example below.
```c#
string displayDetails2 = $"{detailsList2[n].FullName}, {detailsList2[n].JobId}";
```
When working with a huge volume of text, you can utilize a StringBuilder object to attach strings in loops.
```c#
var phrase = "programmmmmmmmmmmmming";
var manyPhrases = new StringBuilder();
for (var j = 0; j < 1000; j++)
{
    manyPhrases.Append(phrase);
}
```
**Event Handlers with Relaxed Delegates**

Event handler arguments (Object and EventArgs) should not be qualified explicitly. Use relaxed delegates instead of event arguments if you're not utilizing the event parameters Take the following as an example
(sender as Object, e As EventArgs).

**The Unsigned data type**

Use int instead of unsigned types in general. In C#, int is widely utilized, making communication with other libraries easy.
**Arrays**

When initializing arrays on the declaration line, use the succinct syntax. Let's use string[] in the following example.
```c#
string[] alphabets1 = { "u", "v", "w", "x", "y", "z" };
You can use var if you utilize explicit instantiation.
var aplphabets2 = new string[] { "u", "v", "w", "x", "y", "z" };
```
If you specify an array size, you must initialize the elements one by one.
```c#
var alphabet3 = new string[5];
alphabet3[0] = "a";
alphabet3[1] = "b";
// And the process continues.
```
### Conclusion
What gain do a programmer get for using the coding conventions?
1. Users will put their focus on the content rather than the layout because your code will have a consistent appearance.
2. Based on earlier experience, readers may understand your code more easily
3. The code becomes easier to copy, update, and maintain.
4. You contribute to ensuring that your code follows Visual Basic's "best practices.

**Follow the conventions and become a perfect programmer**
