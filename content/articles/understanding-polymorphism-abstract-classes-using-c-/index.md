According to [Microsoft](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/polymorphism), **Polymorphism** is often referred to as the third pillar of object-oriented programming after encapsulation and inheritance. *Polymorphism* is a Greek word that means "many-shaped". At run time, objects of a derived class may be treated as objects of a base class in places such as method parameters and collections or arrays. When this polymorphism occurs, the object's declared type is no longer identical to its run-time type.

**Polymorphism** is a very helpful concept when it comes to a single abstract idea used in different ways and shapes. With polymorphism, you can define a single abstract class and reshape it in different ways to suit your methods & ideas. 

### Table of contents

- Understand the concept of polymorphism.
- Understand abstract classes.
- Multiple examples of polymorphism.

### Prerequisites

To follow this article along, you'll need the following:

- A basic understanding of C# programming language.
- A basic understanding of Inheritance in C# programming language.

If you're new to Inheritance, you should check this tutorial that would help you understand the concept of it [here](https://www.section.io/engineering-education/getting-started-with-inheritance-using-c/).

### Abstract classes

Abstract classes are too generic to be instantiated and are used as base classes. The definitions for abstract classes are not complete. The derived classes must be defined as the missing pieces and should contain abstract methods or abstract properties.

The following example will explain how we can define an abstract class in order to make a Payroll System Using Polymorphism.

### Employee class

Employee an abstract generic class that will be used later on for the other inherited classes. First, we will define the Constructor, `set()` & `get()` methods of the class.

```C#
public abstract class Employee
{
  private string firstname;
  private string lastname;

  // constructor of class
  public Employee(string firstnamevalue, string lastnamevalue)
  {
    firstname = firstnamevalue;
    lastname = lastnamevalue;
  }
  // Set & Get for FirstName
  public string FirstName
  {
      get
      {
        return firstname;
      }
      set
      {
        firstname = value;
      }
  }
  // Setter & Getter for LastName
  public string Lastname
  {
     get
     {
      return lastname;
     }
     set
     {
      lastname = value;
     }
  }
  // return a string of the Employee information
  public override string ToString()
  {
     return FirstName + " " + Lastname;
  }
  
  // calculating the earnings of an employee. This is an abstract property that must be defined by the inherited classes.
  public abstract decimal Earnings();
  // End of class 
}
```

### Boss class

This class will use the previous class and use its properties & methods for the definition of a boss payroll.

```c#
public class Boss : Employee
{
  private decimal salary; 

  // constructor of Boss class
  public Boss(string firstNameValue, string lastNameValue, decimal salaryValue) : base(firstNameValue, lastNameValue)
  {
     WeeklySalary = salaryValue;
  }
  // Get & Set for the WeeklySalary
  public decimal WeeklySalary
  {
     get
     {
      return salary;
     }
     set
     {
      // only positive salary value
      if (value > 0 )
         salary = value;
     }
  }
```

The following piece of code will override the `ToString()` & `Earnings()` methods.

```c#
  // override Employee method to calculate Boss's earnings
  public override decimal Earnings()
  {
    return WeeklySalary;
  }

  // return a string of the Boss information
  public override string ToString()
  {
  return "Boss: " + base.ToString();
  }
}
```
### Commission worker class

This class will use the main abstract class and use its properties & methods for the definition of a Commission worker payroll. The following piece of code will define the Constructor of the class, set & get for the `WeeklySalary`, `commissionValue` & the `quantityValue`.

```C#
public class CommissionWorker : Employee
  {
     private decimal salary;     
     private decimal commission; 
     private int quantity;       

      // constructor of CommissionWorker class
      public CommissionWorker(string firstNameValue,
       string lastNameValue, decimal salaryValue,
       decimal commissionValue, int quantityValue)
       : base(firstNameValue, lastNameValue)
    {WeeklySalary = salaryValue;
     Commission = commissionValue;
     Quantity = quantityValue;}

    // set & get for WeeklySalary
    public decimal WeeklySalary
    {get
       {return salary;}
        set
     {// ensure non-negative salary value
          if (value > 0 )
             salary = value;}}
        // set & get for Commission
    public decimal Commission
    {get
     {return commission;}
         set
     {// ensure non-negative commission value
          if (value > 0 )
           commission = value;}}
        // set & get for Quantity
    public int Quantity
    {get
       {return quantity;}
         set
       {// ensure non-negative quantity value
           if (value > 0 )
           quantity = value;}}
```

The following piece of code will override the `ToString()` & `Earnings()` methods from the main class to store the output.

```c#
      // CommissionWorker's earnings
      public override decimal Earnings()
      { return WeeklySalary + Commission* Quantity;}  
      // return a string of CommissionWorker information
      public override string ToString()
      {return "CommissionWorker: " + base.ToString();} 
   } // end of class 
```
### PieceWorker class

This class will use the main abstract class and use its properties & methods for the definition of a PieceWorker payroll. The following piece of code will define the Constructor of the class, set & get for the `wagePerPiece` & `quantity`.
```c#
 public class PieceWorker : Employee 
    {
       private decimal wagePerPiece; 
       private int quantity;         

        // constructor of PieceWorker class
        public PieceWorker(string firstNameValue,
         string lastNameValue, decimal wagePerPieceValue,
         int quantityValue)
         : base(firstNameValue, lastNameValue)
      {WagePerPiece = wagePerPieceValue;
         Quantity = quantityValue;}
   
      // Set & Get for WagePerPiece
      public decimal WagePerPiece
      {get
         {return wagePerPiece;}  
       set
         {if (value > 0 )
               wagePerPiece = value;}}
        // Set & Get for Quantity
        public int Quantity
      {get
         {return quantity;}  
       set
         {if (value > 0 )
               quantity = value;}}
```

The following piece of code will override the `ToString()` & `Earnings()` methods to store the output.
```C#
  // Earnings of PieceWorker
        public override decimal Earnings()
      {return Quantity* WagePerPiece;}
   
      // return string representation of PieceWorker
      public override string ToString()
      {return "PieceWorker: " + base.ToString();}
   }
```

### Polymorphism testing

In main, we will create objects of each employee class we have and output the information of each object to test out each one of them.

```c#
static void Main(string[] args)
        {
            Boss boss = new Boss("Khaled", "Sans", 800);
            
            CommissionWorker commissionWorker =
            new CommissionWorker("Susan", "Jons", 300, 2, 120);

            PieceWorker pieceWorker = new PieceWorker("Samir", "Muan",
               Convert.ToDecimal(2.8), 150);
            Employee employee = boss;

            string output = GetString(employee) + boss + " earned " +
            boss.Earnings().ToString("C") + "\n\n";

            employee = commissionWorker;
            output += GetString(employee) + commissionWorker +
            " earned "+commissionWorker.Earnings().ToString("C") + "\n\n";

            employee = pieceWorker;
            output += GetString(employee) + pieceWorker +
            " earned " + pieceWorker.Earnings().ToString("C") +"\n\n";

            Console.WriteLine(output,"Polymorphism in use");} 
```

This piece of code will return a string of each employee class.

```c#
 // Employee informations 
    public static string GetString(Employee worker)
    {
        return worker.ToString() + " earned " +
           worker.Earnings().ToString("C") + "\n";
    }} 
```
### Polymorphism output
```c#
Boss: Khaled Sans earned $800.00
Boss: Khaled Sans earned $800.00

CommissionWorker: Susan Jons earned $540.00
CommissionWorker: Susan Jons earned $540.00

PieceWorker: samir Muan earned $420.00
PieceWorker: samir Muan earned $420.00
```
### Conclusion
In this tutorial, we have learned about polymorphism and how useful it is when defining a generic abstract idea with different examples & classes, we have also learned how to use an abstract class to define other inherited classes from it. Dont forget to testout the code to fully understand how it works.

### Further reading
1. https://www.section.io/engineering-education/getting-started-with-inheritance-using-c/.
2. https://www.section.io/engineering-education/getting-started-with-windows-forms-using-c-sharp/.
3. https://www.section.io/engineering-education/getting-started-with-game-development-windows-forms/.

