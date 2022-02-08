### Build data-driven and type-driven algorithms using pattern matching
### Pattern matching scenarios
Integrating data from numerous sources and displaying facts in a single place, in a single unified application, and your perception concerning the data is a characteristic of modern development.

None of the types that reflect the incoming data will be within your control or accessible to you or your team. In a conventional object-oriented approach, you would define types in your program to represent each data type from the various data sources.
### Table of contents
- Pattern-appropriate designs
- Basic Toll calculations
- Add in the cost of occupancy
- Add peak pricing
- Conclusion
### Prerequisite
In order to carry on with this article, you will be required to download Visual Studio and have it installed on your machine. You can click [here](https://www.geeksforgeeks.org/setting-environment-c-sharp/) and follow the guidelines on installation.

One should also have some knowledge about C# programming language.

Your application would deal with the new types, creating inheritance hierarchies, virtual methods, and abstractions. Those strategies work, and they are sometimes the most effective ones. You can write less code in other situations.
```c#
namespace ConsumerBikeReg1
{
    public class Bk
    {
        public int Customers { get; set; }
    }
}

namespace CommercialReg
{
    public class TB
    {
        public int GrossWeightClassx { get; set; }
    }
}

namespace LiveryReg
{
    public class Tuktuk
    {
        public int TransportFee { get; set; }
    }

    public class Bk
    {
        public int Size { get; set; }
        public int Customer { get; set; }
    }
}
```
### Pattern-appropriate designs
Solving the following is easier using pattern matching.
- The stuff you will have to deal with is not organized logically for your objectives. You can work with classes from a variety of different systems.
- The functionality you're giving is not part of the underlying abstraction of these classes. The amount of toll a vehicle must pay varies depending on the vehicle, although it is not a primary function of the vehicle.

C# pattern matching features make it easier to deal with when the structure of the data and the actions on that data are not defined together.
### Basic Toll calculations
Based on the type of vehicle, the toll calculation is therefore identified.
- $1.10 for a Car.
- $1.99 for a tuk-tuk.
- $3,57 for a minibus.
- $7.89 for a lorry.
To calculate the toll amount, create a new TollCalculator class and apply pattern matching to the vehicle type.

Consider the example below.
```c#
using System;
using CommercialRegistration1;
using ConsumerVehicleRegistration1;
using LiveryRegistration1;

namespace toll_calculator_example1
{
    class Program
    {
        public decimal CalculateToll1(object vehicle) =>
            vehicle switch
        {
            Car a          => 1.10m,
            Tuktuk t          => 1.99m,
            MiniBus m           => 3.57m,
            Lorry l => 7.89m,
            { }             => throw new ArgumentException(message: "The type is unkwown", paraName: nameof(vehicle)),
            null            => throw new ArgumentNullException(nameof(vehicle))
        };
    }
}
```
A switch expression (which is not the same as a switch statement) is used to examine the declaration pattern in the given code. A switch expression in the above code starts with the variable vehicle and finishes with the switch keyword. The switch arms are next, which are encased by curly braces.
### Add in the cost of occupancy.
An extra charge is instilled occupancy of the vehicle changes.
- A $0.35 surcharge is added to cars and tuk-tuks with no passengers.
- Taxis and two-passenger autos get a $0.22 discount.
- A $1.00 discount is given to cars and tuk-tuks carrying three or more people.
- Minibusses that are less than half-full are charged an additional $1.00.
- Minibusses that are more than 80% filled are eligible for a $0.99 discount.

One switch is more than enough in implementing these rules.
```c#
vehicle switch
{
    Car {Passengers: 4} => 1.95m + 0.3m,
    Car {Passengers: 5} => 2.0m,
    Car {Passengers: 6} => 2.0m - 0.22m,
    Car                 => 2.00m - 0.99m,
};
```
Expound the cases for minibusses to utilize the occupancy restrictions.
```c#
vehicle switch
{
    MiniBus m when ((double)m.Riders / (double)m.Capacity) < 0.50 => 5.00m + 1.00m,
    MiniBus m when ((double)m.Riders / (double)m.Capacity) > 0.90 => 5.00m - 0.99m,
    MiniBus => 5.00m,
};
```
Any number of passengers in the delivery vehicles is unimportant to the toll authority. Instead, they change the toll fee by considering the vehicle's weight class.
- Lorries weighing more than 4500 pounds will be charged an additional $4.35.
- Light lorries weighing less than 2500 pounds receive a $1.85 discount.
The following code is used to implement that rule.
```c#
vehicle switch
{
    // ...

    Lorry l when (l.GrossWeightClass > 4500) => 10.00m + 4.35m,
    Lorry l when (l.GrossWeightClass < 2500) => 10.00m - 1.85m,
    Lorry => 10.00m,
};
```
The when a clause is used to evaluate circumstances other than equality on a property. After the completion, something similar to this below should be your result.
```c#
vehicle switch
{
    Car {Passengers: 4} => 1.95m + 0.34m,
    Car {Passengers: 5} => 2.0m,
    Car {Passengers: 6} => 2.0m - 0.22m,
    Car                 => 2.00m - 0.99m,

    Tuktuk {TransportFee: 4}  => 3.50m + 1.00m,
    Tuktuk {TransportFee: 5}  => 3.50m,
    Tuktuk {TransportFee: 6}  => 3.50m - 0.50m,
    Tuktuk             => 3.50m - 1.00m,

    MiniBus m when ((double)m.Riders / (double)m.Capacity) < 0.50 => 5.00m + 1.00m,
    MiniBus m when ((double)m.Riders / (double)m.Capacity) > 0.90 => 5.00m - 0.99m,
    MiniBus => 5.00m,


    Lorry l when (t.GrossWeightClass > 5000) => 10.00m + 5.00m,
    Lorry l when (t.GrossWeightClass < 3000) => 10.00m - 2.00m,
    Lorry => 10.00m,

    { }     => throw new ArgumentException(message: "a sort of vehicle that is well-known..", paramName: nameof(vehicle)),
    null    => throw new ArgumentNullException(nameof(vehicle))
};
```
Car Passengers: 1 is an example of a consistent pattern within a property pattern.

 Use nested switches to make this code less repetitious. In the previous cases, both the Car and the Tuktuk had four independent arms.
 ```c#
public float CalculateTollX(object vehicle) =>
    vehicle switch
    {
        Car c => c.Passengers switch
        {
            0 => 2.00m + 0.5m,
            1 => 2.0m,
            2 => 2.0m - 0.5m,
            _ => 2.00m - 1.0m
        },

        Tuktuk t => t.TransportFee switch
        {
            0 => 3.50m + 1.00m,
            1 => 3.50m,
            2 => 3.50m - 0.50m,
            _ => 3.50m - 1.00m
        },

    MiniBus m when ((double)m.Riders / (double)m.Capacity) < 0.50 => 5.00m + 1.00m,
    MiniBus m when ((double)m.Riders / (double)m.Capacity) > 0.90 => 5.00m - 0.99m,
    Bus => 5.00m,

        Lorry l when (t.GrossWeightClass > 5000) => 10.00m + 5.00m,
        Lorry l when (t.GrossWeightClass < 3000) => 10.00m - 2.00m,
        Lorry l => 10.00m,

        { }  => throw new ArgumentException(message: "Not a known vehicle type", paramName: nameof(vehicle)),
        null => throw new ArgumentNullException(nameof(vehicle))
};
```
### Add peak pricing
On concluding on the features, the authority wants to fix a charge at a specific time, during the mid-morning and late in the evening.

On weekdays, the charge is increased by 35%, but the charge remains unchanged on weekends.

Tolls increase by 45 percent over the rest of the workday. Charges are decreased by 15 percent late and very early in the morning. It is the regular rate on weekends, regardless of the time. The following code could be expressed using a succession of if, if, and else statements.

```c#
public classExample
{
    if ((timeOfToll.DayOfWeek == DayOfWeek.Saturday) ||
        (timeOfToll.DayOfWeek == DayOfWeek.Sunday))
    {
        return 0.8m;
    }
    else
    {
        int hour = timeOfCharge.Hour;
        if (hour < 7)
        {
            return 0.68m; // early in the morning and late into the night.
        }
        else if (hour < 10)
        {
            return 1.16 // rest of workday
        }
        else if (hour < 14)
        {
            return 1.08m; //weekdays
        }
        
            else
            {
                return 0.8m;
            }
        
        
    }
}
```
 
  
The code above is functional, but it is unreadable. To cater to this issue, one must chain through the input scenarios and the nested if statements. Therefore an appropriate way is by using pattern matching utilizing it with other techniques. You could develop a pattern match phrase that considers all combinations available, i.e., direction, weekday, and time.

 As a result, you would have a complex expression. It would be challenging to read and comprehend. This makes it difficult to assure accuracy. Rather, combining the methods can develop a tuple of values encapsulating the states. The toll multiplier is then calculated using pattern matching.

The time when the charge was collected is saved in a DateTime structure by the system that collects the charge. The following method employs a pattern matching switch expression to describe whether a DateTime represents a weekend or a weekday.
```c#
private IsWeekDay(DateTime timeOfCharge) =>
    timeOfCharge.DayOfWeek switch
    {
        DayOfWeek.Saturday => false,
        DayOfWeek.Sunday => false,
        _ => true
    };
```
Then, to categorize the time into chunks, implement a similar function.
```c#
private TimeBand
{
    early morning,
    Daytime,
    LateEvening,
    
}

private static TimeBand GetTimeBand(DateTime timeOfCharge) =>
    timeOfCharge.Hour switch
    {
        
        < 10 => TimeBand.EarlyMorning,
        < 14 => TimeBand.Daytime,
        _ => TimeBand.LateEvening,
    };
```
### Conclusion
When you cannot add code to your classes, pattern matching makes some sorts of code easier to read. As a result of the cloud, data and functionality are drifting apart. 

The shape of the data and the activities taken with it are not usually described simultaneously. You used existing data in radically different ways than intended in this tutorial. Even though you could not extend such kinds, pattern matching allowed you to design code that overrode them.
### What Next
After completing this article, it will always be advisable to read ahead and explore more about C# programming because it contains many coverage areas that are important to a programmer.

**Happy Coding!**
