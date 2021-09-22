### Handling NullPointer Exception in Java
### Introduction
Any time an application uses an object reference that has no value, NullPointerException is thrown. Null references can be used in methods, for example. Every attempt to use a null value object reference leads to NullPointerException.

 To access and change null object slots, use array-like methods. You can throw the value "null" as a Throwable value. A null object is synchronized with.

After understanding that, one has to handle or even stop the NullPointerException and it can be done in several ways.

1. Use valueOf() instead of toString() ; and both return the same result.
2. Use equals() and equalsIgnoreCase() method with String literal instead of using it on the unknown object that can be null.
3. Use Java annotation @NotNull and @nullable.

In this article, we are going to see how NullPointerException is handled in Java.
### Simple Null Check
Look at the following code line
```Java
public static Main void(string[]args)
{
    Float input=null;
    simpleNullCheck = (inputX);
    private static void simpleNullCheck(Float flt1);
    {
        System.Out.Println("flt1.length");
    }
}
```
On running the above code, an error message as shown below will pop up because what we are trying to output is empty.
`Exception in thread "main" java.lang.NullPointerException`
To correct the error that has occurred, the following can be done.
```Java
private static void simpleNullCheck(Float flt1) {
    if (flt1 != null) 
    {
        System.out.println(flt1.length());
    }
}
```
### Lombok Null Check
Let us take a look at the code below.
```Java
public static void main(String args[])
 {
    String input4 = "programmer";
    List<String> inputList = null;
    lombokNullCheck(input4, inputList, input4);
}

public static void lombokNullCheck(String str3, List<String> strList, String str4)
 {
    System.out.println(str3.length() + strList.size() + str4.length());
}
```
In the above code, we can see that three arguments are being accepted i.e str3 , strList , str4. When any of the three arguments turns out to be null, This function's logic is something we don't want to run at all.

Below is how the code will look like with the inclusion of the Lombok Null Check.
```Java
public static void Main(String [] args)
{
    String input4 = "programmer";
    List<String> inputList = null;
    try
    {
        lombokNullCheck(input4, inputList, input4);
    }
    catch(NullPointerException ex)
    {
        System.Out.Println(ex);
    }
}
public static void lombokNullCheck(@NonNull String str1, @NonNull List<String> strList, @NonNull String str2)
 {
    System.out.println(str3.length() + strList.size() + str4.length());
 }
 ```
In front of every argument, we shall add @NotNull annotation, and also before calling the function, a try-catch block is added for it to catch the NullPointerException.

When any of the arguments turn out to be empty or null, a NullPointerException will be thrown and it will be caught by the try-catch block. If some of the parameters in the function are null, it doesn't work, and we do not know that the function code will be odd.

This is also possible with a large number of null check statements. However, by utilizing Lombok, we can eliminate the need for multiple null check statements, resulting in cleaner code.

Let us have a second example but this time around, we shall be using @NonNull annotation in Lombok.
```Java
public class WorkerService 
{

    public void RequestJobNo(@NonNull String number) 
    {
        System.out.println(number);
    }
}
```
WorkerService has the method of requesting job numbers. Then the parameter name with @NonNull is annotated.

Let us see in our method what Lombok injects.
```Java
public class WorkerService 
{

    public void RequestJobNo(String number) 
    {
        if (number == null)
         {
            throw new NullPointerException("number is marked @NonNull but is null");
        }

        System.out.println(number);
    }
}
```
We see that at the start of the method Lombok puts a null check. When the check fails, the message "number is marked @NonNull, but it is null" will throw a NullPointer exemption.
### Lists and Nulls
For example, you might wish to print every item in a list
```Java
List<String> stringList1 = new ArrayList<>();
stringList1.add("subject1");
stringList1.add("subject2");
if (stringList1 != null)
 {
    for (String element : stringList1)
        System.out.println(subject);
}
```
We must first perform a null check on the list before looping through it. Attempting to loop over a null list without performing a null check will result in a NullPointerException.
### Maps and Nulls
```Java
Map<String, String> testMap1 = new HashMap<>();
testMap1.put("initial_key", "initial_val");
if (testMap1 != null && testMap1.containsKey("initial_key")) {
    System.out.println(testMap1.get("initial_key"));
}
```
To start the map object, we must make a null check. A NullPointerException is triggered if this step is skipped and the map is empty. TestMap1!=null is used to achieve this.

Once that's done, make sure a specific key is present before accessing it. TestMap1.containsKey("initial key") can be used to see if the key is there or not. If this step is skipped and the key is missing, the value will be null.

Null checks don't need to be added if you're confident that a given variable will never be null. This may be useful in private functions where you have more control over the data entering the function.

However, if you are unsure about an object's nullability, you should implement a null check.
### Conclusion
In conclusion, we have seen when a NullException occurs and how it is handled in various ways and as we have seen above that Null checks don't need to be added if one is confident that a certain or a given variable will never be null otherwise, one should implement a null check.