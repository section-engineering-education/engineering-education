### A look at C-Sharp coding conventions
### Introduction
Below are what may be termed as some of the benefits of coding conventions.
1. They make code copying, changing, and maintaining a lot easier.

2. They help readers understand the code faster by allowing them to make assumptions based on prior knowledge.

3. They give the code a unified design so readers may concentrate on the content rather than the layout.

4. They show how to use C# in the best possible way.

There are therefore several coding conventions that are used in c-Sharp programming language
1. Naming conventions
2. Layout conventions
3. Commenting conventions
4. Naming conventions

When writing C# code, there are a few naming standards to keep in mind.

In the following scenarios, all of the information about public elements applies equally well to protected and protected internal elements, which are all meant to be visible to external callers.

**Pascal's Case**

In Pascal Case, every first letter of every word is capitalized as displayed in the example below. 

You can use the Pascal case for identifiers with three or more characters.

When naming a class, record, or struct, use pascal casing ("PascalCasing"). Take a look at the example below
```
PublicSchool
```
```c#
public class PascalCase
{

}
public record PublicIntitution(
    string Country,
    string County,
    string Village,
    );
public struct ValueCoordinate
{
}
```
In addition to prefixing the name with an I, utilize pascal casing when naming an interface. This makes it evident to customers that it's a user interface.
```c#
public interface IPublicInstitution
{
}
```
Pascal Case may also be used in naming public members of types eg events, methods, local functions, and also properties.
```c#
public class PracticeExample
{
    // This is a public field that should be used with caution
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
Because parameters are public properties of the record, utilize pascal casing when writing positional records.
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
Camel casing is also utilized when naming internal or private fields.
```
camelCasing
```
```c#
public class DataService
{
    private IWorkerQueue _workerQueue;
}
```
Use the s_ prefix for private or internal static fields, and the t_ prefix for thread static fields.
```c#
public class DataService
{
    private static IWorkerQueue s_workerQueue;

    [ThreadStatic]
    private static TimeSpan t_timeSpan;
}
```
In implementing method parameters, camel casing is used.
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

In a decent layout, formatting is utilized to emphasize the structure of your code and make it easier to read. 

Below conventions apply to Microsoft examples and samples:

- Use the Code Editor's default settings that is smart indenting, four-character indents, tabs that are saved as spaces 
- Each line should take hold of just one statement.
- Each line should only contain one declaration.
- Indent continuation lines one tab stop if they are not indented automatically (four spaces).
- At least a single blank line is supposed to be added in between the property definitions and the method.

As illustrated in the code below, utilize parenthesis to make clauses in an expression visible.
```c#
if ((valk > valm) && (valk > valx))
{
    // Take appropriate action.
}
```
**Conventions for commenting**

Instead of being placed at the end of a line of code, the comment should be on its line.
Start your remark with an uppercase letter.
A period should be used to end the remark text.
You are supposed to place a single space between the comment delimiter (//) and the comment content, as displayed below.
```c#
// This is a comment used in C-Sharp programming language.
// This is a single line comment.
```
- Do not use formatted blocks of asterisks to surround comments.
- Ascertain that all public members have the relevant XML comments in place to describe their actions.
### A look at some language guidelines
**String data types**

To concatenate small strings, use string interpolation, as seen in the code below.
```c#
string displayDetails = $"{detailsList[n].FullName}, {detailsList[n].JobId}";
```
You can therefore use a StringBuilder object to attach strings in loops when dealing with a large volume of text.
```c#
var phrase = "Goaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal";
var manyPhrases = new StringBuilder();
for (var k = 0; k < 1000; k++)
{
    manyPhrases.Append(phrase);
}
```
**Event Handlers with Relaxed Delegates**

Event handler arguments (Object and EventArgs) should not be qualified explicitly. Use relaxed delegates instead of event arguments if you're not utilizing event parameters (for example, sender as Object, e As EventArgs).

**Unsigned data types**

Use int instead of unsigned types in general. In C#, int is widely utilized, making communication with other libraries easy.
**Arrays**

When initializing arrays on the declaration line, use the succinct syntax. Let's use string[] in the following example.
```c#
string[] alphabets1 = { "a", "b", "c", "d", "e", "f" };
You can use var if you utilize explicit instantiation.
var aplphabets2 = new string[] { "a", "b", "c", "d", "e", "f" };
```
You must initialize the elements one by one if you give an array size.
```c#
var alphabet3 = new string[5];
alphabet3[0] = "a";
alphabet3[1] = "b";
// And the process continues.
```
### Conclusion
You may benefit from the following if you utilize the same coding conventions.
1. Users will be able to focus on the content rather than the layout because your code will have a consistent appearance.
2. Readers learn your code more quickly because they can make assumptions based on prior experience.
3. The code is easier to copy, update, and maintain.
4. You contribute to ensuring that your code follows Visual Basic's "best practices.

**Follow the conventions and become a perfect programmer**
