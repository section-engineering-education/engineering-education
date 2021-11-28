### Build data-driven and type-driven algorithms using pattern matching
### Pattern matching scenarios
Integrating data from numerous sources and displaying facts in a single place, in a single unified application, and your perception concerning the data is a characteristic of modern development.

None of the types that reflect the incoming data will be within your control or accessible to you or your team. In a conventional object-oriented approach, you'd define types in your program to represent each data type from the various data sources.

Your application would deal with the new types, creating inheritance hierarchies, virtual methods, and abstractions. Those strategies work, and they're sometimes the most effective ones. You can write less code in other situations.
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
- The stuff you'll have to deal with isn't organized logically for your objectives. You can work with classes from a variety of different systems.
- The functionality you're giving isn't part of the underlying abstraction of these classes. The amount of toll a vehicle must pay varies depending on the type of vehicle, although it is not a primary function of the vehicle.

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
To examine the declaration pattern in the given code, a switch expression (which is not the same as a switch statement) is used. A switch expression in the above code starts with the variable vehicle and finishes with the switch keyword. The switch arms are next, which are encased by curly braces.
### Add in the cost of occupancy.
An extra charge is instilled occupancy of the vehicle changes.
- A $0.35 surcharge is added to cars and tuk-tuks that have no passengers.
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
Any number of passengers in the delivery vehicles is unimportant to the toll authority. Instead, they change the toll fee by considering the weight class of the vehicle.
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
Within a property pattern, Car Passengers: 1 is an example of a consistent pattern.

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
### Conclusion
When you can't add code to your classes, pattern matching makes some sorts of code easier to read. As a result of the cloud, data and functionality are drifting apart. 

The shape of the data and the activities taken with it aren't usually described at the same time. You used existing data in radically different ways than it was intended in this tutorial. Even though you couldn't extend such kinds, pattern matching allowed you to design code that overrode them.
### Happy Coding!