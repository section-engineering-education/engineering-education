# Next.js basics with payroll

React.js has very cool features and frameworks and we are going to focus on Next.js, the coolest thing about Next.js is that the back-end is already set for us and the only thing you need to do is connect it to the database and you have a full-stack web application.
The other cool thing that most people don't want to try is that you can use arithmetic operators just like in javascript functions and build an amazing software for daily unavoidable calculations.
We will be creating an amazing basic payroll system in Next.js.

### Table of Content
- [Prerequisites](#Prerequisites)
- [Objectives](#Objectives)
- [Next.js Environment Setup](#Next.js-Environment-Setup)
- [Introduction to Payroll System](Introduction-to-Payroll-System)
- [Payroll Arithmetic Calculations](#payroll-Arithmetic-Calculations)
- [Creating a JSON File and Functions in Next.js](#Creating-a-JSON-File-and-Functions-in-Next.js)
- [Fetching Payroll Data and Computing Calculations in Next.js](#Fetching-Payroll-Data-and-Computing-Calculations-in-Next.js)
- [Conclusion](#Conclusion)

### Prerequisites
In order to follow along, you will need to have the following:
1. Basic knowledge of Javascript.
2. Basic knowledge of React.js and Next.js.
3. Fully set development environment.

### Objectives
This tutorial will equip you with the basic arithmetic operators in Next.js and how to effectively use them in functions, for calculations needed in software programming.

### Next.js Environment Setup
In this tutorial we will use Next.js, Node.js will be needed for the javascript runtime needed.
You can download Node.js [here](https://nodejs.org/en/download/) if you don't have it installed.
Type this in a fresh command-line interface to install Next.js.

```bash
npx create-next-app@latest
```
The installation will begin and you will be asked to name the application, let's call it payroll.
Now type this to enter the project folder and start the server.

```bash
cd payroll
Npm run dev
```
The server will start at port 3000, click on the provided link to view it on the browser.
 


### Introduction to Payroll System
A payroll system is a process of calculating employees' pay for work performed during a specific period. In search a system, a timekeeping system is required to approve the hours worked, Overtime and wages.
This information is needed for the calculation of personal gross pay and net pay.

### Payroll Arithmetic Calculations
In calculating the gross pay we need to multiply the wage rates of individual employees by the number of hours worked plus all allowances earned.

 <h4>Gross pay=wages * hours worked + allowances</h6>

The net pay is calculated by deducting all authorized withholdings and pay deductions from the gross pay.

<h4>Net pay=Gross pay - Income tax - Health insurance</h4>


### Creating a JSON File and Functions in Next.js

This is the project workspace created earlier.

![VSWorkspace](/engineering-education/next.js-basics-with-payroll-system./image-one.png)

We need timesheet data but in our case, we are going to create it locally and store it in our file system.
In a real system, the data will come from a database either from an external timekeeping system or inbuilt.
in the workspace got to the Pages folder and create a new file and call it employees.js, here we will create a store in the form of an object with data in it.

employees.js
```javascript
import React from 'react'

export const Employed=[{
  Fullname:"Kevin Kimanthi",
  Nationalid:39403458,
  Hoursworked:40,
  Basicpay:18,
  Houseallowance:50,
  Conveyanceallowance:40,
  Childreneducationallowance:50,
  FuelReimbursements:50,
  DriverReimbursements:100,
  HealthInsurance:10,
  Taxincome:10
},
{
  Fullname:"Dennis Kimeu",
  Nationalid:39456782,
  Hoursworked:45,
  Basicpay:25,
  Houseallowance:50,
  Conveyanceallowance:40,
  Childreneducationallowance:50,
  FuelReimbursements:50,
  DriverReimbursements:100,
  HealthInsurance:10,
  Taxincome:10
},
{
  Fullname:"Gideon Abangi",
  Nationalid:37594213,
  Hoursworked:45,
  Basicpay:30,
  Houseallowance:50,
  Conveyanceallowance:40,
  Childreneducationallowance:50,
  FuelReimbursements:50,
  DriverReimbursements:0,
  HealthInsurance:10,
  Taxincome:10
},
{
  Fullname:"Jack mahui",
  Nationalid:37804215,
  Hoursworked:45,
  Basicpay:25,
  Houseallowance:50,
  Conveyanceallowance:40,
  Childreneducationallowance:50,
  FuelReimbursements:50,
  DriverReimbursements:100,
  HealthInsurance:10,
  Taxincome:10
}]
```
In order for this to work as planned, we will have to create an API route for data fetching. Navigate to the Pages folder and open the API folder that contains a hello.js file, edit the file by erasing all its contents and copy this code.

hello.js
```javascript
import { Employed } from "../employees"

export default function handler(req, res) {
const {method}=req;
if(method==="GET"){
    return res.status(200).json(Employed)
}

if(method === "POST"){
  const {body}=req;
  Employed.push({ ...body, id:Employed.length +1});
  return res.status(200).json(Employed);
}
}

```
This creates an API route with methods that are able to send and receive "GET" and "POST" requests for our body that we created earlier by importing it and sending it as a response to our required file.

After dealing with the API route, we are going to create a function that computes all this data by automatically linking it to the arithmetic calculations.
We are going to use a .map() function to iterate our data and create a list from this data.

In the pages folder, open the index.js file and edit it by deleting all its contents, then add the following code to create a Payroll application. This is called a functional component.  

index.js
```javascript
import React from "react"

const Payroll=()=>{
    return(
       {employees.map(Data=> {
                 return(
                <>
                </>
                 )
              })}
    )
}
export default Payroll
```

The .map() function first receives the data and a callback function is created inside the braces and 'Data' is formed as the new response.


### Fetching Payroll Data and Computing Calculations in Next.js

After creating the .map() function we will need to do the calculations inside the function for effective linking of data to their arithmetic operators.
In reference to our earlier formulas, below are the calculations.

```javascript

  const Basicpay=Data.Hoursworked*Data.Basicpay
  const Totalallowance= Data.Houseallowance + Data.Conveyanceallowance + Data.Childreneducationallowance

  const TotalReimbursement=Data.FuelReimbursements +Data.DriverReimbursements

  const Totaldeduction=Data.HealthInsurance +Data.Taxincome

  const Grosspay=Basicpay + Totalallowance + TotalReimbursement
  const Netpay=Grosspay-Totaldeduction
  ```
Now let's add the following arithmetic expressions to our .map function for the calculations to take place effectively. This is possible by writing them just before the return() in .map() function. This consists of the fetching method offered by Next.js

index.js
```javascript
import Link from "next/link"
import React from "react"


const Payroll=({employees})=>{
    return(
       {employees.map(Data=> {

  const Basicpay=Data.Hoursworked*Data.Basicpay
  const Totalallowance= Data.Houseallowance + Data.Conveyanceallowance + Data.Childreneducationallowance

  const TotalReimbursement=Data.FuelReimbursements +Data.DriverReimbursements

  const Totaldeduction=Data.HealthInsurance +Data.Taxincome

  const Grosspay=Basicpay + Totalallowance + TotalReimbursement
  const Netpay=Grosspay-Totaldeduction
                 return(
                <>
                <div key={Data.Fullname}>
                <Link href={`/${Data._Fullname}`} passHref>
                <a>{Data.Fullname}</a>
                </Link>
                <h2>${Grosspay}</h2>
                <h2>${Netpay}</h2>
                </div>
                </>
                 )
              })}
    )
}
export async function getServerSideProps(context){
    
    const data=await fetch(`http://localhost:3000/api/hello/`);
    const employed=await data.json()

    if(!employed){
        return {
            notFound:true
        }
    }
    return{
        props:{
            employees:employed
        }
    }
}

export default Payroll
```
The data fetching method is offered by Nextjs check [here](https://nextjs.org/learn/basics/data-fetching). The key attribute is very important when creating a list, it should be unique in each element of data in the array. The JSX inside the return is legal to use  '<h3><h2></h2></h3>', the code output should be similar to this.

![Browser output](/engineering-education/next.js-basics-with-payroll-system./image-two.png)

At this point, we have our gross pay and net pay displayed on the web.


### Conclusion
This tutorial has given us a foundation for doing arithmetic operations in Next.js and an introduction to the payroll system.
Handling payroll involves sending out payslips to employees and a styled view of an application.
In our next tutorial we are going to cover all this and maybe send payments to our employees.

Happy coding!




