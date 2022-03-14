### Introduction
In this article we will be talking about the IComparable and IComparer interfaces. The two interfaces may sound similar but they all perform different activities. You can use the interfaces together or separately  but they work best when they are combined together for sorting and also comparison purposes.

We will briefly talk about sorting then dive into the comparison interfaces 

### Table of contents
- [An overview of sorting](#an-overview-of-sorting)
- [Getting started with the IComparer interface  and IComparable Interface](#getting-started-with-the-icomparer-and-icomparable-interface)
- [Implementing IComparable and IComparer Interfaces](#implementing-icomparable-and-icomparer-interfaces)
- [Difference between the IComparable and IComparer Interfaces](#difference-between-the-icomparable-and-icomparer-interfaces)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)
### An overview of sorting
Let's start with the basics of sorting. Let's assume that we wish to sort a list of integers ascendingly. The Sort function offered by Microsoft can be used because we are utilizing Int and the built-in List.

In List <T>.sort, the method of sorting parameter is a comparator, with a couple of overloads.

1. Sort() which uses the default comparer to sort the elements in the entire [List<T>](https://www.tutorialsteacher.com/csharp/csharp-list). It sorts only elements of common type like INT and STRING as shown below.
```C#
    class Program
    {
        static void Main(string[] args)
        {
            List<int> list = new List<int>();
            list.Add(6);
            list.Add(12);
            list.Add(18);
            list.Add(24);
            list.Sort();
            foreach(var item in list)
            {
                Console.WriteLine("Number;" + item);
            }
        }
    }


```
OUTPUT
```bash
6
12
18
24
```
Since the Sort method is aware that it is sorting an Integer, it can do so successfully.

2. [Sort(Comparison<T>)](https://docs.microsoft.com/en-us/dotnet/api/system.comparison-1?view=net-6.0) which uses the specified System.Comparison<T> to sort the given elements.
3. Sort(IComparer<T>)  which uses the specified comparer to sort all the elements in the given [List<T>](https://www.tutorialsteacher.com/csharp/csharp-list). 
4. [Sort(Int32, Int32, IComparer<T>)](https://developer.rhino3d.com/api/RhinoCommon/html/M_Rhino_Collections_RhinoList_1_Sort_4.htm) which uses the specified comparer to sort the specified range of the elements in the given List<T> . 
### Getting started with the IComparer and IComparable Interface
#### Icomparable
Icomparable is used when you want to compare and sort objects of the same type like an integer and an integer or a string and a string. It can make the comparison while its doing sorting. CompareTo must be implemented to implement the IComparable interface, as follows:
```C
int IComparable.CompareTo(object obj)
{
   Phone p=(Phone)obj;
   return String.Compare(this.model,p.model);
}
```
In the example above the array contains a string therefore we will use the method for string comparison which is String.Compare()

#### IComparer
Icomparer gives you more options for comparison. For example you can order you sorted array in either ascending or descending order

When using ICompare.Compare() a tertiary comparison is usually required. We use logic operators 1, -1, and 0. We use 1 when a value is more than the value for comparison. We use 0 when a value equals the value for comparison and -1 when a value is less than the value for comparison. 

Using IComparer involves two steps.The first step is Implement the Compare method after creating an IComparer-implementing class as shown below
```C#
private class SortPriceAscendingHelper : IComparer
{
   int IComparer.Compare(object a, object b)
   {
      Phone p1=(Phone)a;
      Phone p2=(Phone)b;
      if (p1.price < p2.price)
         return -1;
      if (p1.price > p2.price)
         return 1;
      else
         return 0;
   }
}
```
The second step involves creating a method that returns an instance of the IComparer object as shown below
```C#
public static IComparer SortPriceAscending()
{
   return (IComparer) new SortPriceAscendingHelper();
}
```
From the above example, we can see that objects are passed into overloaded Array functions as the second argument. IComparer-compatible sort method. If you want to use IComparer, you don't have to use an array. 

### Implementing IComparable and IComparer Interfaces
The following example shows how these comparison interfaces can be put to use together. A class called Phone is created to demonstrate how to use IComparer and IComparable interface. When creating a Phone object, model and price are two of the properties it has. The IComparable interface provides an ascending sort of the model field, while the IComparer interface provides a descending sort of the model field. IComparer provides both ascending and descending sorting of the price property.

We are first going to create the array of objects that will be undergoing sorting then proceed from there as shown below
```C#

    class Program
    {
       [STAThread]
       static void Main(string[] args)
       {
          Phone[] arrayOfPhones= new Phone[6]
          {
             new Phone("Samsung Galaxy A03",11450),
             new Phone("Samsung Galaxy A12",16799),
             new Phone("Samsung Galaxy A22",22199),
             new Phone("Samsung Galaxy M31",30000),
             new Phone("Samsung Galaxy S21 Ultra",126999),
             };
            Console.WriteLine("Output Unsorted Array\n");

          foreach(Phone p in arrayOfPhones)
             Console.WriteLine(p.Model + "\t\t" + p.Price);

          Array.Sort(arrayOfPhones);
          Console.WriteLine("\n Output Array sorted by Model (Ascending - IComparable)\n");

          foreach(Phone p in arrayOfPhones)
             Console.WriteLine(p.Model + "\t\t" + p.Price);
         //Use of Icomparer on an integer
          Array.Sort(arrayOfPhones,Phone.SortPriceAscending());
          Console.WriteLine("\nOutput Array sorted by Price (Ascending - IComparer)\n");

          foreach(Phone p in arrayOfPhones)
             Console.WriteLine(p.Model + "\t\t" + p.Price);
         // Use of Icomparer in a string
         Array.Sort(arrayOfPhones,Phone.SortModelDescending());
          Console.WriteLine("\nOutput Array sorted by Model (Descending - IComparer)\n");

          foreach(Phone p in arrayOfPhones)
             Console.WriteLine(p.Model + "\t\t" + p.Price);

          Array.Sort(arrayOfPhones,Phone.SortPriceDescending());
          Console.WriteLine("\nOutput Array sorted by Price (Descending - IComparer)\n");

          foreach(Phone p in arrayOfPhones)
             Console.WriteLine(p.Model + "\t\t" + p.Price);

          Console.ReadLine();
       }
   }

```
After writing the above code add another class to the project and call it Phone. Here we are going to create nested classes that will be used to do the ascending and descending sort on the price property and also the model property.
We are also going to create methods that will return the Icomparer objects for the sort helper
```C#

   public class Phone : IComparable
   {
      private class SortPriceAscendingHelper: IComparer
      {
         int IComparer.Compare(object a, object b)
         {
            Phone p1=(Phone)a;
            Phone p2=(Phone)b;

            if (p1.price > p2.price)
               return 1;

            if (p1.price < p2.price)
               return -1;

            else
               return 0;
         }
      }
      private class SortPriceDescendingHelper: IComparer
      {
         int IComparer.Compare(object a, object b)
         {
            Phone p1=(Phone)a;
            Phone p2=(Phone)b;

            if (p1.price < p2.price)
               return 1;

            if (p1.price > p2.price)
               return -1;

            else
               return 0;
         }
      }
      private class SortModelDescendingHelper: IComparer
      {
         int IComparer.Compare(object a, object b)
         {
            Phone p1=(Phone)a;
            Phone p2=(Phone)b;
             return String.Compare(p2.model,p1.model);
         }
      }
      private string model;
      private int price;
      public Phone(string Model,int Price)
      {
         model=Model;
         price=Price;
      }
      public int Price
      {
         get  {return price;}
         set {price=value;}
      }
      public string Model
      {
         get {return model;}
         set {model=value;}
      }
      //
      int IComparable.CompareTo(object obj)
      {
         Phone p=(Phone)obj;
         return String.Compare(this.model,p.model);
      }
      
      public static IComparer SortPriceAscending()
      {
         return (IComparer) new SortPriceAscendingHelper();
      }
      public static IComparer SortPriceDescending()
      {
         return (IComparer) new SortPriceDescendingHelper();
      }
      public static IComparer SortModelDescending()
      {
        return (IComparer) new SortModelDescendingHelper();
      }

   }

```
OUTPUT
```bash
Output: Unsorted Array

Samsung Galaxy A03              11450
Samsung Galaxy A12              16799
Samsung Galaxy A22              22199
Samsung Galaxy M31              30000
Samsung Galaxy S21 Ultra                126999

 Output: Array sorted by Model (Ascending - IComparable)

Samsung Galaxy A03              11450
Samsung Galaxy A12              16799
Samsung Galaxy A22              22199
Samsung Galaxy M31              30000
Samsung Galaxy S21 Ultra                126999

Output: Array sorted by Price (Ascending - IComparer)

Samsung Galaxy A03              11450
Samsung Galaxy A12              16799
Samsung Galaxy A22              22199
Samsung Galaxy M31              30000
Samsung Galaxy S21 Ultra                126999

Output: Array sorted by Model (Descending - IComparer)

Samsung Galaxy S21 Ultra                126999
Samsung Galaxy M31              30000
Samsung Galaxy A22              22199
Samsung Galaxy A12              16799
Samsung Galaxy A03              11450

Output: Array sorted by Price (Descending - IComparer)

Samsung Galaxy S21 Ultra                126999
Samsung Galaxy M31              30000
Samsung Galaxy A22              22199
Samsung Galaxy A12              16799
Samsung Galaxy A03              11450
```

### Difference between the IComparable and IComparer Interfaces
There is only one parameter accepted by the CompareTo method of IComparable. For the reason that it makes a comparison between the current object and a parameterized next object. As a result, the current object CompareTo the following object. IComparer has two parameters, which is necessary because we'll be passing both objects as arguments. Consequently, the method is known as "Compare," which translates as "to compare."

### Conclusion
In this article, we have discussed a couple of overloads in List <T>.sort. We have also discussed the Icomparable and Icomparer interfaces and their difference. I hope this article helps you understand how to implement the two interfaces.


### Further Reading
1. [ICOMPARABLE and ICOMPARER interface in C #, implement object comparisons and sort in the list](https://www.programmerall.com/article/14561452606/)
2. [IComparable vs IComparer](https://dev.to/digionix/icomparable-vs-icomparer-274f)