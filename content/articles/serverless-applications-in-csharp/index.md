---
layout: engineering-education
status: publish
published: true
url: /serverless-applications-in-csharp/
title: Developing Serverless Applications in C#
description: This article will show the reader how to develop a serverless application using the C# programming language.
author: ephraim-gathoni
date: 2021-12-24T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/serverless-applications-in-csharp/hero.jpeg
    alt: serverless applications c sharp example image
---
[Serverless](https://www.cloudflare.com/learning/serverless/what-is-serverless/) computing has completely changed the technology space. Developers find it a compelling option since it has made their development efficient and more productive. 
<!--more-->
In recent times, serverless computing has been gaining popularity. The main reason is that it lets the developers deploy their applications to the cloud without dealing with the server infrastructure.

Before serverless, developers had to deal with server resources to support their code. With serverless computing, developers do not need to worry about the operating system and hardware architecture. This gives developers more time to pay attention and write good and quality code for their applications.

This article draws attention to developing a serverless application using the [C#](https://docs.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/) programming language. Then later be deployed on popular cloud solutions such as [Amazon AWS](https://aws.amazon.com/) and [Microsoft Azure](https://azure.microsoft.com/en-us/).

### Table of contents
- [Developing Azure Functions using C#](#developing-azure-functions-using-c)
- [Developing serverless applications on AWS Lambda using C#](#developing-serverless-applications-on-aws-lambda-using-c)
- [Using Visual Studio to code in C# for AWS Lambda](#using-visual-studio-to-code-in-c-for-aws-lambda)
- [Running the code on AWS Lambda](#running-the-code-on-aws-lambda)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Developing Azure Functions using C#
#### Prerequisites
Below are some of the requirements to be met before starting the application development:
- A developer has to [register an account](https://azure.microsoft.com/en-us/free/) with Microsoft Azure.
- A developer has to have an account with [Azure Portal](https://portal.azure.com/) to access [Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction).

Various tools are needed when developing C# applications. The most commonly used are [Visual Studio Code](https://code.visualstudio.com/) and [Visual Studio IDE](https://visualstudio.microsoft.com/vs/). Developers can choose either of the tools depending on their preferences and needs. We will cover both of these tools in detail in the following sections.

#### Using VS Code
It is a powerful and lightweight code editor that supports different operating systems such as Windows, Linux, and Mac OS. Developers can download either of the versions depending on their platforms.

Azure Tools for VS Code are required to allow developers to use the commands that interact with Azure functions in the VS Code editor.

To achieve that, we will browse to the VS Code extension manager located at the left side of the window and search for the [Azure Tools extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-azureextensionpack) and install it, as shown in the figure below:

![Extension pack](/engineering-education/serverless-applications-in-csharp/azure-extensions1.png)

Next, a developer has to sign in to Azure by pressing the keys `CTRL+Shift+P` on the keyboard to launch the command palette in the VS Code editor. Then, a developer will need to enter the `Azure: Sign In` in the text field displayed on top of VS Code editor.

The developer will click on the results that appear after typing on the text field. VS Code editor will generate a code and a list of the instructions to be followed to complete the set-up.

Since a developer will use C# to develop the application in VS Code editor, the developer has to install a [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) for VS Code to support debugging capabilities in VS code editor.

#### Using Visual Studio Integrated Development Environment (IDE)
Starting from [Visual Studio version 15.5](https://docs.microsoft.com/en-us/visualstudio/releasenotes/vs2017-relnotes-v15.5), the latest Visual Studio IDEs are bundled with the [Azure Function](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) tools. This means that even a developer intending to use the new Visual Studio IDE version will have to install [Azure Development workload](https://docs.microsoft.com/en-us/dotnet/azure/configure-visual-studio).

For a developer to use Visual Studio IDE, they will need to sign in to the Microsoft account to create a new `Azure Functions` project. The developer can then proceed and code the application.
The following section will cover how to build serverless applications on AWS Lambda serverless framework.

### Developing serverless applications on AWS Lambda using C#
[AWS Lambda](https://aws.amazon.com/lambda/) is the most popular serverless option which its platform requires little to no administration. It was released in 2014. However, it started its official support for [.NET Core 2.0](https://aws.amazon.com/about-aws/whats-new/2018/01/aws-lambda-supports-c-sharp-dot-net-core-2-0/) runtime in 2018. In the year 2020, it started to support [.NET Core version 3.1](https://aws.amazon.com/blogs/compute/announcing-aws-lambda-supports-for-net-core-3-1/).

There is a difference between the [.NET Core](https://www.tutorialsteacher.com/core/dotnet-core) and [.NET framework](https://dotnet.microsoft.com/en-us/learn/dotnet/what-is-dotnet-framework). Below are the reasons why AWS uses .NET Core over .NET framework:
- The .NET Core was a redesigned version of .NET developed for modern applications, especially cloud-enabled ones. This is beneficial during the coding of Lambda functions.
- .NET Core is modular by design. The developer must only include the part of .NET required when writing Lambda functions. This practice is cost-effective since it consumes little memory and AWS Lambda only charges for memory resources used.
- Since the .NET Core is open source and [Amazon Linux](https://aws.amazon.com/amazon-linux-ami/), an underlying platform for AWS Lambda validates it. AWS can respond to any security issues when using the platform.
- Developers can code for C# independent of the underlying platform using the .NET Core framework. This was impossible in the past, where .NET only supported Windows operating systems.

The developer has to grasp how AWS works to author the code for Lambda functions even before starting to build the functions in C# using Visual Studio.

The concepts below may come up when dealing with AWS Lambda:
- **Handler** – AWS Lambda invokes the handler function to execute the Lambda function. Then, any input data is passed to the handler function as the first parameter. It then passes the context object as the second parameter.
- **Context Object** - It provides information on how the code will interact with AWS Lambda.
- **Logging** - It ensures that logs about the activities performed are captured and well stored. It is essential, and any well-written function should incorporate it. AWS Lambda keeps its logs into CloudWatch Logs.
- **Exceptions** - It happens whenever a Lambda function encounters an error during execution.

We have covered in detail the AWS Lambda framework. We will see how developers can utilize Visual Studio to implement it in the next section.

### Using Visual Studio to code in C# for AWS Lambda
#### Prerequisites
The developer would need the following before coding Lambda functions:
- An active [AWS account](https://portal.aws.amazon.com/billing/signup#/start).
- [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/) installed.
- Visual Studio’s [AWS Toolkit](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.AWSToolkitforVisualStudio2017) installed.

Next, a developer will need to launch Visual Studio. A `Getting Started with the AWS Toolkit for Visual Studio` window will be displayed next to the `Start Page` tab as shown below:

![Getting started with AWS](/engineering-education/serverless-applications-in-csharp/getting-started-with-aws1.png)

The developer will be required to key in the AWS credentials such as `Access Key` and `Secret Key`. These credentials can be retrieved by reading the steps provided in the same window.

Below are the steps the developer can follow when coding the Lambda function:
- Launch a Visual Studio IDE, navigate to `File`, select the `New` option, and click on the `Project` option to create a new project.
- Next, click on `Visual C#` then select the `AWS Lambda Project (.NET Core)` option as shown:

![New AWS project](/engineering-education/serverless-applications-in-csharp/aws-project1.png)

- Input the project name with the preferred name and click the `Ok` button. The other options should be left as default.
- Select the Lambda project type based on project requirements.
- Click the `Finish` button to complete the set-up and create a new Lambda project.

We can note that a file with the name `aws-lambda-tools-defaults.json` will be created and displayed on the solution explorer as shown below:

![JSON File](/engineering-education/serverless-applications-in-csharp/json-file1.png)

This file is essential because the function handler and other options are set.

### Running the code on AWS Lambda
Once the code has been successfully reviewed, the next step will be to run it on AWS Lambda, also known as publishing it.

Below are the steps to be followed:
- In the solution explorer, and on the right side of the Visual Studio IDE, right-click on the project name and click on the `Publish to AWS Lambda` button as shown below:

![Publish to AWS](/engineering-education/serverless-applications-in-csharp/aws-publish1.png)

- Next, in the `Upload to AWS Lambda` pop-up window displayed, input the function's name and click the `Next` button as demonstrated in the below figure. Note that developers can input any name based on their preferences.

![AWS Upload window](/engineering-education/serverless-applications-in-csharp/aws-window1.png)

- Next, input a role associated with the developer AWS account on the `Advanced Function Details` window. There are more sections on this page, including VPC and the Environment section. A developer can only use the VPC section of the function to access resources available in the Amazon VPC.
- A progress window will appear, showing the upload status once the process begins. Note that a page will appear where the developer can test the function and view logs.
- The developer can test the function by clicking the `Invoke` button. This action will also generate the logs as the function is executing. The logs can then be accessed on CloudWatch Logs, where they are stored.

### Conclusion
We have covered what it takes to develop and publish serverless applications using the C# programming language. Developers can confidently explore the Microsoft Azure functions and AWS Lambda options to build serverless infrastructure for their applications.

### Further reading
- [An Overview Of Azure Functions](https://www.c-sharpcorner.com/article/an-overview-of-azure-functions/).
- [A Guide to Lambda Expressions](https://www.c-sharpcorner.com/UploadFile/vendettamit/beginners-guide-to-lambda-expressions/).
- [Anatomy of the Lambda Expression](https://www.tutorialsteacher.com/linq/linq-lambda-expression).
- [AWS vs Azure](https://www.edureka.co/blog/aws-vs-azure/).
- [Understanding Serverless Observability](https://lumigo.io/blog/understanding-serverless-observability/).

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
