---
layout: engineering-education
status: publish
published: true
url: /implementation-of-pattern-matching-in-the-building-of-type-driven-algorithms/
title: Implementation of Pattern Matching in the Building of Type Driven Algorithms
description: This tutorial will help the reader to implement the pattern matching in the building of type driven algorithms.
author: dinah-anyango
date: 2022-06-27T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementation-of-pattern-matching-in-the-building-of-type-driven-algorithms/hero.jpg
    alt: Implementation of pattern matching building type driven algorithms Hero Image
---
This article is going to explore various functionalities of the C# programming language and how it is used in implementing various concepts, but to be more specific, the article covers the use of pattern matching.
<!--more-->

### Table of contents
- [Prerequisite](#prerequisite)
- [Pattern matching](#pattern-matching)
- [Pattern-appropriate designs](#pattern-appropriate-designs)
- [Calculation of Tolls that are calculated at a Basic Level](#calculation-of-tolls-that-are-calculated-at-a-basic-level)
- [Add in the cost of occupancy](#add-in-the-cost-of-occupancy)
- [Addition to the pricing](#addition-of-the-pricing)
- [Conclusion](#conclusion)
- [What next](#what-next)

### Prerequisite
To carry on with this article, you will be required to download Visual Studio and have it installed on your machine. You can click [here](https://www.geeksforchinggeeks.org/setting-environment-c-sharp/). One should also have some knowledge about the C# programming language.

### Pattern matching
Today's development involves various techniques which include how one perceives data and many more factors.

A programming team may lack the capability to have access to the incoming data. Every data type can be represented in its unique fashion in an object-oriented environment.

Once you develop an application, it will have virtual functions, new types, and abstraction and in doing so the code that will be written will be less.

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
        public int GrossWeightClassx { get; set; } //assign and return the values
    }
}

namespace LiveryReg
{
    public class Tuktuk
    {
        public int TransportFee { get; set; } //assign and return the values
    }

    public class Bk
    {
        public int Size { get; set; } //assign and return the values
        public int Customer { get; set; } //assign and return the values
    }
}
```

### Pattern-appropriate designs
Solving the following is easier using pattern matching.
- The stuff you will have to deal with is not organized logically for your objectives. You can work with classes from a variety of different systems.
- If you buy a new car, you'll have to pay more tolls than you would for an older model. In this case, the method used will not be an exact sliver of the abstract class. The toll charge is calculated for each vehicle if it is treated as an individual.

The implementation of C-Sharp pattern matching attributes is much more quickly when the activities to be executed are not linked to its structure.

### Calculation of tolls that are calculated at a basic level
When Tolls are being calculated, the type of the vehicle provides the toll amount.
- $1.10 for a Car.
- $1.99 for a tuk-tuk.
- $3,57 for a minibus.
- $7.89 for a lorry.
 The class TollCalculator finds the toll for each vehicle.

Consider the example below.
```c#
using System;
using CommReg1;
using ConsVehicleReg1;
using LiveryReg1;


namespace TollCalc_description1
{
    class ProgramDescription
    {
        public decimal CalculateToll1(object vehicle) =>
            vehicle switch
        {
            Car a          => 1.10m,       //implies that given Car a, return 1.10m
            Tuktuk t          => 1.99m,    //implies that given tuktuk t, return 1.99m
            MiniBus m           => 3.57m,  //implies that given minibus m , return 3.57m
            Lorry l => 7.89m,
            { }             => throw new ArgumentException(message: "type unkwown", paraName: nameof(vehicle)),
            null            => throw new ArgumentNullException(nameof(vehicle))
        };
    }
}
```
A switch expression (different from the switch statement) computes the declaration pattern present in the code. Our variable is the vehicle and then the switch statement and its content inside the curly braces.

### Add in the cost of occupancy
An extra charge is instilled for occupancy of the vehicle changes.
- A $0.35 surcharge is added to cars and tuk-tuks with no passengers.
- A $1.00 discount is given to cars and tuk-tuks carrying three or more people.
- Minibusses that are less than half-full are charged an additional $1.00.
- Minibusses that are more than 80% filled are eligible for a $0.99 discount.

One switch is more than enough in implementing these rules.
```c#
vehicle switch
{
    Car {Customers: 4} => 1.95m + 0.3m, //implies that given Car with 4 customers, return 1.95m + 0.3m
    Car {Customers: 5} => 2.0m, //implies that given Car with 5 customers, return 2.0m
    Car {Customers: 6} => 2.0m - 0.22m, //implies that given Car with 6 customers, return 2.0m - 0.22m
    Car                 => 2.00m - 0.99m,
};
```

Expound the cases for minibusses to utilize the occupancy restrictions.
```c#
vehicle switch
{
    MiniBus t when ((double)t.Riders / (double)t.Capacity) < 0.50 => 5.00m + 1.00m, //If the Minibus1 condition is less than 0.50, return 5.00m + 1.00m
    MiniBus t when ((double)t.Riders / (double)t.Capacity) > 0.90 => 5.00m - 0.99m, //If the Minibus2 condition is greater than 0.90, return 5.00m - 0.99m
    MiniBus => 5.00m,
};
```

Many passengers in the delivery vehicles are unimportant to the toll authority. The class in which the weight of the vehicle lies in what is considered when change is needed.
- Lorries weighing over 4500 pounds will be charged an additional $4.35.
- Light lorries weighing less than 2500 pounds receive a $1.85 discount.
The following code is used to implement that rule.
```c#
vehicle switch
{
    Lorry l when (l.GrossWeightClass > 4500) => 10.00m + 4.35m, // Having the Lorry1 grossweight more than 4500,return 10.00m + 4.35m
    Lorry l when (l.GrossWeightClass < 2500) => 10.00m - 1.85m, // Having the Lorry2 grossweight less than 2500,return 10.00m - 1.85m
    Lorry => 10.00m,
};
```

The `when` clause in the example description does not compute the equality on a function, but it computes the circumstances. After the completion, something similar to this below should be your result.
```c#
vehicle switch 
{
    Car {Customers: 4} => 1.95m + 0.34m, //switch starts here
    Car {Customers: 5} => 2.0m,
    Car {Customers: 6} => 2.0m - 0.22m,
    Car                 => 2.00m - 0.99m,

    Tuktuk {TransportFee: 4}  => 3.50m + 1.00m,
    Tuktuk {TransportFee: 5}  => 3.50m,
    Tuktuk {TransportFee: 6}  => 3.50m - 0.50m,
    Tuktuk             => 3.50m - 1.00m, //Otherwise return 3.50m - 1.00m

    MiniBus t when ((double)t.Riders / (double)t.Capacity) < 0.50 => 5.00m + 1.00m,//If the Minibus1 condition is less than 0.50, return 5.00m + 1.00m
    MiniBus t when ((double)t.Riders / (double)t.Capacity) > 0.90 => 5.00m - 0.99m, //If the Minibus2 condition is greater than 0.90, return 5.00m - 0.99m
    MiniBus => 5.00m,


    Lorry z when (w.GrossWeightClass > 5000) => 10.00m + 5.00m, // when weight is greater than 5000, result is(10.00m + 5.00m)
    Lorry z when (w.GrossWeightClass < 3000) => 10.00m - 2.00m, // when weight is less than 3000, result is(10.00m - 2.00m)
    Lorry => 10.00m,

    { }     => throw new ArgumentException(msg: "a sort of vehicle that is well-known..", paramName: nameof(vehicle)),
    null    => throw new ArgumentNullException(nameof(vehicle))
};
```
In this scenario, the code may be repetitive, so nested switches are used to overcome the issue. In the previous cases, both the Car and the Tuktuk had four independent arms.
```c#
public float CalculateTollX(object vehicle) =>
    vehicle switch
    {
        Car y => y.Customers switch
        {
            0 => 2.00m + 0.5m, //if zero, return 2.00m + 0.5m
            1 => 2.0m,         //if one, return 2.0m
            2 => 2.0m - 0.5m,  //if two, return 2.0m - 0.5m
            _ => 2.00m - 1.0m
        },

        Tuktuk v => v.TransportCost switch
        {
            0 => 3.50m + 1.00m, //if zero, return 3.50m + 1.00m
            1 => 3.50m,         //if one, return 3.50m
            2 => 3.50m - 0.50m, //if two, return 3.50m - 0.50m
            _ => 3.50m - 1.00m
        },

    MiniBus t when ((double)t.Riders / (double)t.Capacity) < 0.50 => 5.00m + 1.00m, //If the Minibus1 condition is less than 0.50, return 5.00m + 1.00m
    MiniBus t when ((double)t.Riders / (double)t.Capacity) > 0.90 => 5.00m - 0.99m, //If the Minibus2 condition is greater than 0.90, return 5.00m - 0.99m
    Bus => 5.00m,

        Lorry z when (w.GrossWeightClass > 5000) => 10.00m + 5.01m, //If the Lorry1 condition is greater than 5000, return 10.00m + 5.00m
        Lorry z when (w.GrossWeightClass < 3000) => 10.00m - 2.00m,  //If the Lorry2 condition is less than 3000, return 10.00m - 2.00m
        Lorry z => 10.00m, // else return 10.00m

        { }  => throw new ArgumentException(msg: "Vehicle type unknown", paramName: nameof(vehicle)),
        null => throw new ArgumentNullException(nameof(vehicle))
};
```
### Addition of the pricing
In concluding on the features, the authority wants to fix a charge at a specific time, during the mid-morning and late in the evening.

On weekdays, the charge is increased by 35%, but the charge remains unchanged on weekends.

The toll rises by 45 percent (or more) throughout the weekdays. Charges are decreased by 15 percent late and very early in the morning, but the charge remains the same. A series of if, if, and else statements could describe the following code.

```c#
public classExample
{
    if ((timeOfToll.DayOfWeek == DayOfWeek.Saturday) || //if the day of week is Saturday  
        (timeOfToll.DayOfWeek == DayOfWeek.Sunday))     //or if the day of week is Sunday , 
    {
        return 0.8m;                                   // then return the results as 0.8m                                
    }
    else
    {
        int hour = timeOfCharge.Hour;                  // otherwise use the time in hour brackets
        if (hour < 7)
        {
            return 0.68m; // early in the morning and late into the night.
        }
        else if (hour < 10) // If the time in hour form is greater than 10
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
The code described above works as required, though it's not very clear, and to make it as clear as possible to a reader, one must hover through the nested if statements and the input scenarios, and with several techniques, pattern matching does it best.

As an outcome, the expressions become more difficult, which, as a result, is more unreadable and accuracy is never achieved. Instead, through the combination of operations, a tuple of values encompassing the states can be formed. Therefore, if the individual methods are brought together as one, then pattern matching is applied and solves the toll calculations.

The time when the charge was collected is saved in a DateTime structure by the system that collects the charge. Below is an example description.
```c#
private IsWeekDay(DateTime timeOfCharge) =>
    timeOfCharge.DayOfWeek switch
    {
        DayOfWeek.Saturday => false, // if the day is saturday, false
        DayOfWeek.Sunday => false, // if the day is saturday, false
        _ => true                  // otherwise true
    };
```
Implement a similar method to divide the time into pieces.
```c#
private TimeBand
{
    early morning, //denoting morning time
    Daytime, // denoting daytime time
    LateEvening, //denoting Lateevening time
    
}

private static TimeBand GetTimeBand(DtTime timeOfCharge) => // Get what time what is to be done i.e. morning, daytime or evening
    timeOfCharge.Hour switch              
    {
        
        < 10 => TimeBand.EarlyMorning,  //morning timeband
        < 14 => TimeBand.Daytime,       //daytime timeband
        _ => TimeBand.LateEvening,      //lateevening timeband
    }; 
```
### Conclusion
In conclusion, we have discussed how the C# programming language aids in implementing various functionalities, and in our case in this article, pattern matching.

### What Next
After completing this article, it will always be advisable to read ahead and explore more about C# programming because it contains many coverage areas that are important to a programmer.

**Happy Coding!**
---
Peer Review Contributions by: [Mohamed Alghadban](/engineering-education/authors/mohamed-alghadban/)
