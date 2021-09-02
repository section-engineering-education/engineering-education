Creating Serverless Functions (Faas) with AWS Lambda and Golang

Serverless architecture is a new paradigm that is being used in the development of modern applications. The term "serverless" refers to the abstraction of "servers" from application development. Function-as-a-Service (FaaS) is a serverless method of running modular code on the cloud. You can use FaaS to write code that is triggered by events. For example, when a user clicks on a button in your web application, a specific cloud function is executed.

We'll build a user profile generator function in this tutorial. The function will accept some user data and return a proifle based on the data. After uploading the generator function to AWS lambda, we'll create a client program that communicates with user profile generating function on AWS Lambda.

### Requirements

- [AWS](https://aws.amazon.com) account
- `git clone https://github.com/Bamimore-Tomi/faas-golang.git`
- Go 1.x installed on your machine

### Setting up a Lambda Function on AWS

1. After Creating your AWS account, on the main dashboard, search for Lambda.![search-aws-lambda](search-aws-dashboard.png)When you click on Lamda, the AWS lambda will be visible.![aws-lambda-dashboard](aws-lambda-dashboard.png)
2. Click on the Create Function button to set up a new AWS Lambda function.![aws-create-lambda-setting](aws-create-lambda-setting.png)The name of the function is user-profile. Click on Create function.
3. On the function’s dashboard, we will upload the function we want to run in the cloud. ![aws-lambda-function-dashboard](aws-lambda-function-dashboard.png)In the next section, we'll look at how to make a function that runs on AWS Lambda.

### Creating the User-Profile Function in Golang

In this section, we will see how to make the function that AWS Lambda will run and how to convert it into a zip file before we upload it on AWS Lambda. We need to install the "aws-lambda-go" package with:

- `go mod init`
- `go get github.com/aws/aws-lambda-go/lambda`

```go

package main

 

import (

 "fmt"

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

Navigate to the “server” folder to see this source code. In the program above, we created the `HandleInfoEvent` function. This is the function that runs in the cloud. Use the following steps to compile and zip the program.

#### Macos and Linux Installation Instructions

1. Compile the executable.

```bash

GOOS=linux go build main.go

```

2. Create the zip file with

```bash

zip user-profile-function.zip main

```

#### Windows Installation Instructions

1. Download the `build-lambda-zip` tool from GitHub

```bash

go.exe get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip

```

2. You can now use the tool downloaded earlier to create the zip file.

```bash

Set GOOS=linux

Go build -o main main.go

%USERPROFILE%\Go\bin\build-lambda-zip.exe -output main.zip main

```

You can now upload the zip file generated. You can test the function you uploaded right on AWS to see if it works well. First, we need to change the handler's name from the default `hello` to `main`. The Lambda function handler is the method in your function code that processes events.

![aws-lambda-edit-hanler](aws-lambda-edit-handler.png)

Click on Edit:

![aws-lambda-runtime-settings](aws-lambda-runtime-settings.png)Change the handler field from hello to main and save.

### Testing the Function on AWS Lambda

1. On the main dashboard, click on Test![aws-lambda-dashboard-test](aws-lambda-test.png)
2. Input this sample data in the json editor on the page and click on Test.

```json

{

"firstname":"Oluwatomisin",

"lastname":"Bamimore",

"age":19

}

```

![aws-lambda-test-prompt](aws-lambda-test-prompt.png)

The function we uploaded is executed. This is the result.![aws-lambda-test-result](aws-lambda-test-result.png)

### Calling the Lambda Function From Golang

We can also execute the function uploaded to AWS lambda locally. We have to install the AWS Go SDK.

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

 // "github.com/aws/aws-lambda-go/lambda"

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

You need to create an [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) user with the correct permissions. Store the `aws_access_key_id` and the `aws_secret_access_key` in a `.env` file in the directory you are currently working in.

![sample-env-file](sample-env-file.png)After running the program, AWS will execute the cloud function, and you will get this result.

![sample-program-output](sample-program-output.png)

The program passes in some arguments (json format) into the cloud function and returns the result.

### Conclusion

We have successfully deployed and tested our AWS Lambda function. We also tested the Lambda function using an actual client program and the Lambda console on AWS. In other languages, such as Python, JavaScript, and Java, the same mechanism can be used to create serverless functions.
