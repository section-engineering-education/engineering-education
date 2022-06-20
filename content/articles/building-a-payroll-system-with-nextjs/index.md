# Next.js basics with payroll system
Welcome to Next.js, the React framework thats meant for Production because only the needed CSS and Javascript are loaded by the users browser making it extreamly fast. Next.js unlike React.js needs zero setup for the creation of an API by using the file system this saves alot of development time and cost.
This tutorial will equip you with the basic arithmetic operators in Next.js and how to effectively use them in functions, for calculations needed in software programming. 

### Table of Content
- [Prerequisites](#Prerequisites)
- [Next.js Environment Setup](#Next.js-Environment-Setup)
- [Introduction to Payroll System](#Introduction-to-Payroll-System)
- [Payroll Arithmetic Calculations](#payroll-Arithmetic-Calculations)
- [Creating a JSON File and Functions in Next.js](#Creating-a-JSON-File-and-Functions-in-Next.js)
- [Fetching Payroll Data and Computing Calculations in Next.js](#Fetching-Payroll-Data-and-Computing-Calculations-in-Next.js)
- [Conclusion](#Conclusion)
- [Reference](#Reference)

### Prerequisites
In order to follow along, you will need to have the following:
1. Basic knowledge of Javascript.
2. Basic knowledge of React.js and Next.js.
3. Fully set development environment.


### Next.js Environment Setup
In this tutorial we will use Next.js, Node.js will also be needed for creation of a server which provides a runtime environment which is essential to program debugging and development.
You can download Node.js [here](https://nodejs.org/en/download/) if you don't have it installed.
Type this in a fresh command-line interface to install Next.js.

```bash
npx create-next-app@latest
```
![Installation](/engineering-education1/next.js-basics-with-payroll-system/image-three.png)

The installation will begin and you will be asked to name the application, let's call it payroll.
Now type this to enter the project folder and start the server.

```bash
cd payroll
npm run dev
```
The server will start at port 3000, click on the provided link to view it on the browser.
 


### Introduction to Payroll System
A payroll system is a process of calculating employees' pay for work performed during a specific period. In search a system, a timekeeping system is required to approve the hours worked, Overtime and wages.
This information is needed for the calculation of personal gross pay and net pay.

### Payroll Arithmetic Calculations
In calculating the gross pay we need to multiply the wage rates of individual employees by the number of hours worked plus all allowances earned.

 `Gross pay=wages * hours worked + allowances`

The net pay is calculated by deducting all authorized withholdings and pay deductions from the gross pay.

`Net pay=Gross pay - Income tax - Health insurance`


### Creating a JSON File and Functions in Next.js

This is the project workspace created earlier.

![VSWorkspace](/engineering-education1/next.js-basics-with-payroll-system/folder-structure.png)

We need timesheet data but in our case, we are going to create it locally and store it in our file system.
In a real system, the data will come from a database either from an external timekeeping system or inbuilt.
in the workspace got to the Pages folder and create a new file and call it employees.js, here we will create a store in the form of an object with data in it.

employees.js
```javascript
import React from 'react'

export const Employed=[{
  "fullName":"Kevin Kimanthi",
  "NationalId":39403458,
  "hoursWorked":40,
  "basicPay":18,
  "houseAllowance":50,
  "conveyanceAllowance":40,
  "childrenEducationAllowance":50,
  "fuelReimbursements":50,
  "driverReimbursements":100,
  "healthInsurance":10,
  "taxIncome":10
},
{
  "fullName":"Dennis Kimeu",
  "NationalId":39456782,
  "hoursWorked":45,
  "basicPay":25,
  "houseAllowance":50,
  "conveyanceAllowance":40,
  "childrenEducationAllowance":50,
  "fuelReimbursements":50,
  "driverReimbursements":100,
  "healthInsurance":10,
  "taxIncome":10
},
{
  "fullName":"Gideon Abangi",
  "NationalId":37594213,
  "hoursWorked":45,
  "basicPay":30,
  "houseAllowance":50,
  "conveyanceAllowance":40,
  "childrenEducationAllowance":50,
  "fuelReimbursements":50,
  "driverReimbursements":0,
  "healthInsurance":10,
  "taxIncome":10
},
{
  "fullName":"Jack mahui",
  "NationalId":37804215,
  "hoursWorked":45,
  "basicPay":25,
  "houseAllowance":50,
  "conveyanceAllowance":40,
  "childrenEducationAllowance":50,
  "fuelReimbursements":50,
  "driverReimbursements":100,
  "healthInsurance":10,
  "taxIncome":10
}]
```
In order for this to work as planned, we will have to create an API route for data fetching. Navigate to the Pages folder and open the API folder that contains a hello.js file. We are going to create GET and POST HTTP methods, GET is applied while requesting information from a particular source in this case it will be from our employees file while POST is used to insert or update the data. Lets Edit the file by erasing all its contents and copy the code below.

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
This creates an API route with methods that are able to send a request and receive a response of our body that we created earlier.

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

const bsicPay=data.Hoursworked*data.Basicpay

const totalAllowance= data.houseAllowance + data.conveyanceAllowance + data.childrenEducationAllowance
const totalReimbursement=data.fuelReimbursements +data.driverReimbursements
const totalDeduction=data.healthInsurance +data.taxIncome

const grossPay=basicPay + totalAllowance + totalReimbursement
const grossPay=basicPay + totalallowance + totalReimbursement

const netPay=grosspay-totalDeduction

  ```
Now let's add the following arithmetic expressions to our .map function for the calculations to take place effectively. This is possible by writing them just before the return() in .map() function. This consists of the fetching method offered by Next.js

index.js
```javascript
import Link from "next/link"
import React from "react"


const Payroll=({employees})=>{
  return(
    <>
       {employees.map(data=> {
         const bsicPay=data.Hoursworked*data.Basicpay

         const totalAllowance= data.houseAllowance + data.conveyanceAllowance + data.childrenEducationAllowance

         const totalReimbursement=data.fuelReimbursements +data.driverReimbursements
         const totalDeduction=data.healthInsurance +data.taxIncome

         const grossPay=basicPay + totalAllowance + totalReimbursement
         const grossPay=basicPay + totalallowance + totalReimbursement

         const netPay=grosspay-totalDeduction
         return(
           <>
           <ul key={data.fullName}>
             <li>{data.fullName}</li>
             <li>${grossPay}</li>
             <li>${netPay}</li>
           </ul>
           </>
           )
           })}
           </>
  )
}
export async function getServerSideProps(){
    
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
The getServerSideprops data fetching method is offered by Nextjs check [here](https://nextjs.org/learn/basics/data-fetching), the asynchronous  getServerSideProps function enables preparation of the page in advance through pre-rendering of pages.
In the function We have created a store for our url component called data that points to the api and passed it to the json() method which is a better text format for websites, the data now is stored in our store called employed.
The if statement means that:
- if the employees data is not present then notFound will be returned as true.
- else employed will be passed as props called employees.

The key attribute is very important when creating a list, it should be unique in each element of data in the array. The code output should be similar to this.

![Browser output](/engineering-education1/next.js-basics-with-payroll-system/demo.png)

At this point, we have our gross pay and net pay displayed on the web. Click [here](https://github.com/unholydisaster/payroll) for complete source code.


### Conclusion
This tutorial has given us a foundation for doing arithmetic operations in Next.js and an introduction to the payroll system.
Handling payroll involves sending out payslips to employees and a styled view of an application.
In our next tutorial we are going to create pages for payslips and send payments to our employees.

Happy coding!

### Reference
- [Introduction to Next.js](https://Nextjs.org)
- [Payroll system](https://www.betterplace.co.in/blog/3-stages-of-payroll-processing/amp)

