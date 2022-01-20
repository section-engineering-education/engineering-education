---
layout: engineering-education
status: publish
published: true
url: /serverless-functions-faas-with-aws-lambda-and-golang/
title: Creating Serverless Functions (FaaS) with AWS Lambda and Golang
description: This tutorial will guide the reader on how to create serverless functions with AWS Lambda and Golang.
author: oluwatomisin-bamimore
date: 2021-09-13T00:00:00-04:20
topics: [Edge Computing]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/hero.png
    alt: Serverless functions on AWS Lambda Image
---
Serverless architecture is a new paradigm that is being used in the development of modern applications. The term serverless refers to the abstraction of servers from application development.
<!--more-->
One advantage of serverless computing over server computing is that the cloud provider takes care of the servers while you concentrate on application development.

Function-as-a-Service (FaaS) is a serverless method of running modular code on the cloud. You can use FaaS to write code that is triggered by events.

For example, when a user clicks on a button in your web application, a specific cloud function is executed.

In this tutorial, we'll build a user profile generator function.

The function will accept some user data and return a profile based on the data. 

After uploading the generator function to AWS Lambda, we'll create a client program that communicates with the user-profile-generating function on AWS Lambda.

If you are new to serverless computing, it is highly recommended to go through these articles:
- [How to build apps with Serverless architecture](/engineering-education/how-to-build-apps-with-serverless-architecture/)
- [Comparing serverless computing with containers](/engineering-education/comparing-serverless-computing-vs-containers/)
- [How to migrate an on-premise application to serverless](/engineering-education/how-to-migrate-an-on-prem-application-to-serverless/)


### Requirements
- [AWS](https://aws.amazon.com) account to access AWS lambda dashboard.
- Use `git clone https://github.com/Bamimore-Tomi/faas-golang.git` to download the source code for this demo.
- Install [Go 1.x](https://golang.org/doc/install) runtime on your machine.

### Setting up an AWS Lambda function
1. After creating your AWS account, on the main dashboard, search for `Lambda`.

![search-aws-lambda](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/search-aws-dashboard.png)

When you click on `Lambda`, the AWS Lambda dashboard will be visible, as shown below:

![aws-lambda-dashboard](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/aws-lambda-dashboard.png)

2. Click on the `Create function` button to create a new AWS Lambda function.

![aws-create-lambda-setting](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/aws-create-lambda-setting.png)

Here, we specify the name of the function as `user-profile`.

3. On the function's dashboard, we will upload the function we want to run in the cloud.

![aws-lambda-function-dashboard](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/aws-lambda-function-dashboard.png)

In the next section, we'll look at how to make a function that runs on AWS Lambda.

### Creating a user-profile function in Golang
In this section, we will see how to create a function that converts it into a zip file before we upload it on AWS Lambda.

We need to install the `aws-lambda-go` package using:

- `go mod init`
- `go get github.com/aws/aws-lambda-go/lambda`

```go
package main

import (
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
)

// Struct for the input the program expects from the client
type InfoEvent struct {
	Firstname string `json:"firstname"`
	Lastname string `json:"lastname"`
	Age int `json:"age"`
}

// Struct for the output the server will send back to the client
type Response struct {
	Profile string `json:"profile"`
}

// Event handler, this function handles requests from clients
func HandleInfoEvent(event InfoEvent) (Response, error) {
	return Response{Profile: fmt.Sprintf("Their name is %s %s, they are %d ", event.Firstname, event.Lastname, event.Age)}, nil
}

func main() {
	lambda.Start(HandleInfoEvent)
}
```

Navigate to the `server` folder to see this source code.

In the program above, we created the `HandleInfoEvent` function. This method runs in the cloud.

Use the following steps to compile and zip the program:

### Installation - MacOS and Linux

1. Compile the executable:

```bash
GOOS=linux go build main.go
```

2. Create the zip file with the following command:

```bash
zip user-profile-function.zip main
```

#### Installation - Windows

1. Download the `build-lambda-zip` tool from GitHub:

```bash
go.exe get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip
```

2. You can now use the tool downloaded earlier to create the zip file:

```bash
Set GOOS=linux

Go build -o main main.go

%USERPROFILE%\Go\bin\build-lambda-zip.exe -output main.zip main
```

You can now upload the generated zip file to AWS Lambda.

You can test the function to check if it works well.

First, we need to change the handler's name from the default `hello` to `main`.

The Lambda function handler is the method in your function code that processes events.

![aws-lambda-edit-hanler](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/aws-lambda-edit-handler.png)

Click on `Edit`:

![aws-lambda-runtime-settings](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/aws-lambda-runtime-settings.png)

Change the handler field from `hello` to `main` and click `Save`.

### Testing the function on AWS Lambda
1. On the main dashboard, click on `Test`:

![aws-lambda-dashboard-test](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/aws-lambda-test.png)

2. Input this sample data in the JSON editor on the page and click on `Test`.

```json
{
	"firstname": "Oluwatomisin",
	"lastname": "Bamimore",
	"age": 19
}
```

![aws-lambda-test-prompt](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/aws-lambda-test-prompt.png)

The result will be:

![aws-lambda-test-result](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/aws-lambda-test-result.png)

### Calling the Lambda function from Golang
We can also execute the same function locally.

For that, we have to install the `AWS Go SDK` as shown:

```bash
go get github.com/aws/aws-sdk-go
```

We can now use this code segment to execute the function in the cloud and see the results locally.

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/lambda"
	"github.com/joho/godotenv"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
)

type Info struct {
	Firstname string `json:"firstname"`
	Lastname string `json:"lastname"`
	Age int `json:"age"`
}

type Response struct {
	Profile string `json:"profile"`
}

func main() {
	// Load the environment variable which has the IAM credentials needed to connect to AWS
	godotenv.Load()
	// Initialize new aws session
	sess := session.Must(session.NewSessionWithOptions(session.Options{SharedConfigState: session.SharedConfigEnable}))
	// Initialize new aws client using IAM credentials
	client := lambda.New(sess, &aws.Config{Region: aws.String("us-east-1"), Credentials: credentials.NewStaticCredentials(os.Getenv("aws_access_key_id"), os.Getenv("aws_secret_access_key"), "")})
	// Prepare request parameters
	request := Info{Firstname: "Oluwatomisin", Lastname: "Bamimore", Age: 16}

	payload, err := json.Marshal(request)

	if err != nil {
		fmt.Println("Error marshalling request")
		os.Exit(0)
	}

	result, err := client.Invoke(&lambda.InvokeInput{FunctionName: aws.String("user-profile"), Payload: payload})

	if err != nil {
		fmt.Println("Error calling user-profile function", err)
		os.Exit(0)
	}

	var resp Response

	err = json.Unmarshal(result.Payload, &resp)

	if err != nil {
		fmt.Println("Error unmarshalling user-profile response")
		os.Exit(0)
	}

	// Print response from lambda function
	fmt.Println(resp.Profile)
}
```

You need to create an [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) user with the correct permissions.

Store the `aws_access_key_id` and the `aws_secret_access_key` in a `.env` file in the directory that you are currently working in.

![sample-env-file](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/sample-env-file.png)

After running the program, AWS will execute the cloud function, and you will get this result.

![sample-program-output](/engineering-education/serverless-functions-faas-with-aws-lambda-and-golang/sample-program-output.png)

The program passes in some arguments (json format) into the cloud function and returns the result.

### Conclusion
We have seen how to deploy and consume AWS Lambda functions.

In this tutorial, we learned by building a user-profile generator function written in Golang.

We also tested the Lambda function by sending triggers using an actual client program and the Lambda console on AWS.

In other languages, such as Python, JavaScript, and Java, we use the same mechanism for creating serverless functions.

Happy coding.

### Further reading
- [Learn FaaS](https://www.ibm.com/cloud/learn/faas)
- [FaaS in Wikipedia](https://en.wikipedia.org/wiki/Function_as_a_service)
- [AWS Lambda FAQs](https://aws.amazon.com/lambda/faqs/)
- [More about AWS Lambda](https://en.wikipedia.org/wiki/AWS_Lambda)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)