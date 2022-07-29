---
layout: engineering-education
status: publish
published: true
url: /building-a-payroll-system-with-nextjs/
title: Building a Payroll System with Next.js
description: This tutorial will walk the reader with the basic arithmetic operators in Next.js and how to effectively use them in functions, for calculations needed in software programming. 
author: eli-musa
date: 2022-07-29T00:00:00-12:20
topics: [Languages, Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-payroll-system-with-nextjs/hero.jpg
    alt: Building a payroll system with next.js Hero Image
---
Welcome to my Next.js tutorial. Next.js is the React framework that is meant for production. This is because we only need CSS and JavaScript to be loaded which makes Next extremely fast. Unlike React.js, Next.js needs zero setup for the creation of an API by using the file system this saves alot of development time and cost.
<!--more-->

This tutorial will walk the reader with the basic arithmetic operators in Next.js and how to effectively use them in functions, for calculations needed in software programming. 

### Table of contents
- [Prerequisites](#Prerequisites)
- [Next.js environment setup](#nextjs-environment-setup)
- [Introduction to payroll system](#introduction-to-payroll-system)
- [Payroll arithmetic calculations](#payroll-arithmetic-calculations)
- [Creating a JSON file and functions in Next.js](#creating-a-json-file-and-functions-in-next.js)
- [Fetching payroll data and computing calculations in Next.js](#fetching-payroll-data-and-computing-calculations-in-next.js)
- [Dynamic pages for payslip generation](#dynamic-pages-for-payslip-generation)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Prerequisites
In order to follow along, the reader will need to have the following:
1. Basic knowledge of JavaScript.
2. Basic knowledge of React.js and Next.js.
3. Fully set up development environment.


### Next.js environment setup
In this tutorial we will use Next.js, & Node.js which will also be needed for creation of a server. This will provide a runtime environment which is essential to program debugging and development.

You can download Node.js [here](https://nodejs.org/en/download/) if you don't have it installed.

Type this in a fresh command-line interface to install Next.js.

```bash
npx create-next-app@latest
```

![Installation](/engineering-education/building-a-payroll-system-with-nextjs/Image-three.png)

The installation will begin and you will be asked to name the application, let's call it payroll.

Now type this to enter the project folder and start the server.

```bash
cd payroll
npm run dev
```

The server will start at port 3000, click on the provided link to view it on the browser.

### Introduction to payroll system
A payroll system is a process of calculating employees' pay for work performed during a specific period. Int is a timekeeping system that is required to approve the hours worked, overtime and wages. This information is needed for the calculation of personal gross pay and net pay.

### Payroll arithmetic calculations
When calculating the gross pay we need to multiply the wage rates of individual employees by the number of hours worked plus all allowances earned.

`Gross pay=wages * hours worked + allowances`

The net pay is calculated by deducting all authorized withholdings and pay deductions from the gross pay.

`Net pay=Gross pay - Income tax - Health insurance`


### Creating a JSON file and functions in Next.js
This is the project workspace created earlier.

![VSWorkspace](/engineering-education/building-a-payroll-system-with-nextjs/folder-structure.png)

We need timesheet data but in our case, we are going to create it locally and store it in our file system. In a real system, the data will come from a database either from an external timekeeping system or one that is inbuilt.

In the current working directory create a folder and call it data, in it create a new file and call it employees.json. Here we will create a store in the form of an object with data in it.

employees.json
```javascript
[{
  "fullName":"Kevin Kimanthi",
  "_id":39403458,
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
  "_id":39456782,
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

In order for this to work as planned, we will have to create an API route for data fetching. Navigate to the Pages folder and open the API folder that contains a hello.js file. We are going to create GET and POST HTTP methods. 

GET is applied while requesting information from a particular source, in this case it will be from our employees.json file while POST is used to insert or update the data. Lets delete the hello.js file and create a new folder employees and add index.js in it.

index.js
```javascript
import fs from "fs"
import path from "path"

function getData(){
    const filePath=path.join(process.cwd(),"data", "employees.json")
    const fileData=fs.readFileSync(filePath)
    const data=JSON.parse(fileData)
    return data
}

export default function handler(req, res) {
  const {method}=req;
  if(method==="GET"){
    const data=getData()
    return res.status(200).json({employees:data})


}else if(req.method==="POST"){
  const {
    fullName,
    _id,
    hoursWorked,
    basicPay,
    houseAllowance,
    conveyanceAllowance,
    childrenEducationAllowance,
    fuelReimbursements,
    driverReimbursements,
    healthInsurance,
    taxIncome}=req.body
    
    const data=getData()


    const newEmployees={
      fullName,
      _id,
      hoursWorked,
      basicPay,
      houseAllowance,
      conveyanceAllowance,
      childrenEducationAllowance,
      fuelReimbursements,
      driverReimbursements,
      healthInsurance,
      taxIncome
        }

        data.push(newEmployees)
        const filePath=path.join(process.cwd(),"data","employees.json")
        fs.writeFileSync(filePath,JSON.stringify(data))
        return res.status(201).json({message:"Added",employees:newEmployees})
    }

}

```

We will first import the file system and path module to help us manage data stored in our files.

The getData function will get the data for our API using the file stytem:
- The store filePath contains path.join() method, this joins the specified paths in which the data is stored, process.cwd() means current working directory.
- The store fileData contains our file reading method fs.readFileSync() that reads the data in our specified path.
- The data is then parsed in JSON format to our API handler function.

The handler function uses methods that are able to send a request and receive a response of our body that we created earlier and then send it to our API route as json body.

After dealing with the API route, we are going to create a function that computes all this data by automatically linking it to the arithmetic calculations.
We are going to use a .map() function to iterate our data and create a list from this data.

In the pages folder, open the index.js file and edit it by deleting all its contents, then add the following code to create a payroll application. This is called a functional component.  

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


### Fetching payroll data and computing calculations in Next.js
After creating the .map() function we will need to do the calculations inside the function for effective linking of data to their arithmetic operators. In reference to our earlier formulas, below are the calculations.

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
           <Link href={`/${data._id}`} passHref>
             <a>{data.fullName}</a>
           </Link> 
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
    
    const data=await fetch(`http://localhost:3000/api/employees/`);
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

The getServerSideprops data fetching method is offered by Next.js, you can check [here](https://nextjs.org/learn/basics/data-fetching). The asynchronous getServerSideProps function enables preparation of the page in advance through pre-rendering of pages.

In the function we have created a store for our URL component called data that points to the API and passed it to the json() method. This is a better text format for websites, the data is now stored in our store called employed.

The if statement means that:
- if the employees data is not present then notFound will be returned as true.
- else employed will be passed as props called employees.

The key attribute is very important when creating a list, it should be unique in each element of data in the array. The code output should be similar to this. We are also going to need the link component so that we can move from home page to the payslip page when a name is clicked.

![Browser output](/engineering-education/building-a-payroll-system-with-nextjs/demo.png)

At this point, we have our employees, gross pay and net pay displayed on the web.

### Dynamic pages for payslip generation
We are going to create another API endpoint in our API folder, lets create a new file in employees and call it [id].js and create a new API route handling function. Dynamic routes and pages are named using the block parathesis.

Lets add this code to our file:

[id].js
```javascript

import fs from "fs"
import path from "path"

function getData(){
    const filePath=path.join(process.cwd(),"data", "employees.json")
    const fileData=fs.readFileSync(filePath)
    const data=JSON.parse(fileData)
    return data
}

export default function handler(req, res){
     const{
       query:{id},
       method
       }=req;
       if(method==="GET"){
         const data=getData()
         const employeById=data.findById(id);
         res.status(200).json({success:true,employee:employeById});
}
}
```

Here we first define how we get the data from our file system using our getData() function, then create our API route handler thats going to help us get data by the employees id.

In the if statement with method set to "GET":
- the store data is assigned the function getData().
- the employedById store is assigned a value of data according to the id off the employee using the method findById().
- a response is sent as json to the API routes body.

Lets go back to our pages folder and create a dynamic page for our payslips, create a file and call it [id].js and add this code in it.

[id].js
```javascript

import { withApiUrl } from "next-api-url";

export default function Employee({employees}){

    return(
        <>
         {note.map(employee=>{
           return(
            <ul key={employee.fullName}>
             <li>{employee.fullName}</li>
             <li>{employee._id}</li>
             <li>{employee.hoursWorked}</li>
             <li>{employee.basicPay}</li>
             <li>{employee.houseAllowance}</li>
             <li>{employee.conveyanceAllowance}</li>
             <li>{employee.childrenEducationAllowane}</li>
             <li>{employee.fuelReimbursements}</li>
             <li>{employee.driverReimbursements}</li>
             <li>{employee.healthInsurance}</li>
             <li>{employee.taxIncome}</li>
            </ul>
           )
         })}
        </>
    )
}

export const getServerSideProps = withApiUrl(async ({query:{id}}, url) =>{
    // get the current environment
    const {data}= await (await fetch(`${url}/employees/${id}`)).json();
     // extract the data
  
    return {
        props: {
            employees:data
        },
    };
  
})

```

In the getServerSideProps() data fetching method we are going to use next-api-url module, a quick solution to the Server Error: "Only absolute URLs are supported" encountered while deploying next.js web apps to the cloud. The package is a helper to quickly get the absolute URL to use in Next.js data fetching methods.

Install it by typing this command in your terminal.

```bash

npm i next-api-url

```

For more information on next-api-url package click [here](https://www.npmjs.com/package/next-api-url), in our case we just have to simply provide the query parameters to the getServerSideProps function as id and the base URL from the server.

We then assign our data fetching method to an object store as const data and pass the data as props to our functional component as employees. Our data is now mapped to our page ready as our payslip information.

When we click any employees name on home page we immediately get directed to his/her personal payslip. Here we can decide and add a download button and style the payslip as needed.

### Conclusion
This tutorial has given us a foundation for doing arithmetic operations in Next.js while creating an example payroll system. In our next tutorial we are going to create a tool that generates financial statements in an organization.

Happy coding!

### References
- [Introduction to Next.js](https://Nextjs.org)
- [Payroll system](https://www.betterplace.co.in/blog/3-stages-of-payroll-processing/amp)

