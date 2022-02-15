---
layout: engineering-education
status: publish
published: true
url: /building-a-checkout-form-with-stripe-elements/
title: Building a Checkout Form With Stripe Elements 
description: This tutorial will take the reader through Stripe elements and how we can use it to create a payment checkout form. It discusses the payment collection flow process and how taxation can be handled.
author: geoffrey-omukuba
date: 2022-01-21T00:00:00-13:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-checkout-form-with-stripe-elements/hero.png
    alt: Building a Checkout Form With Stripe Elements Hero Image
---
Stripe elements provide developers with prebuilt UI components to create beautiful checkout flows for their applications. In addition, Stripe elements are good when changing your application into a payment solution.
<!--more-->
If you are ready to start getting payments and get up and start quickly, then Stripe elements are the best way to start. Stripe elements is a way of accepting payments in optimized conversion as a critical component to your business.

A checkout form is an online form where you put your card or other details of the means of payment that you want to use. You also put your name and other details for your purchase in this form.

This article will look at how to integrate Stripe elements into an [ASP.NET](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0) Core blazor app. 

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [A custom form](#a-custom-form)
- [Payment collection workflow](#payment-collection-workflow)
- [A sample blazor app](#a-sample-blazor-app)
- [Adding Stripe elements to our checkout form in our blazor application](#adding-stripe-elements-to-our-checkout-form-in-our-blazor-application)
- [How taxation is handled](#how-taxation-is-handled)
- [Conclusion](#conclusion)

### Prerequisites
For a better understanding of this article, you will need:
- [Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/) installed
- [.NET 5 SDK](https://dotnet.microsoft.com/en-us/download)
- Basic [Javascript](https://www.w3schools.com/js/) knowledge
- Basic [C#](https://docs.microsoft.com/en-us/dotnet/csharp/) knowledge
- A Stripe test account. You can set up your Stripe account [here](https://dpogroup.com/checkout/?gclid=CjwKCAiAiKuOBhBQEiwAId_sK_u8G3FyjEKWMpmN3L-puuO2QWKO4gUPq5by1OpRp7ZIp6LQoOOkrBoCdwgQAvD_BwE)

### A custom form
A custom checkout form has a card input field where you add card details, a name input field where you input your name, an email field and a phone number field. The figure below briefly illustrates what a checkout form looks like. This form helps us understand what we want to implement.

![A custom checkout form](/engineering-education/building-a-checkout-form-with-stripe-elements/custom.png)

### Payment collection workflow
When we click send on the payment page, we submit information to the server. On the server, we are creating a payment intent. A payment intent is a service object representing the different states that a payment may be in when it is created. i.e:

- Created
- Waiting Confirmation
- Confirmed
- Completed

When a payment intent is returned, we will use the special client's secret property and the Stripe javascript in Stripe elements to confirm card payment details.

After the card details have been confirmed, the payment intent will return **completed**; otherwise, it will return **failed**. The image below illustrates the payment collection workflow of Stripe elements.

![Payment collection workflow](/engineering-education/building-a-checkout-form-with-stripe-elements/workflow.png)

### A sample blazor app
To implement Stripe elements in our checkout form, we need to create a sample blazor app to enable us to perform this operation.

To start, we will need to open Microsoft Visual Studio and select `Create new project` as shown in the figure below:

![New blazor project](/engineering-education/building-a-checkout-form-with-stripe-elements/selectproject.png)

After clicking on `Create new Project`, select `Blazor Server App` on the next screen and click `Next` as seen in the figure below:

![Type of application](/engineering-education/building-a-checkout-form-with-stripe-elements/blazorapp.png)

The next screen requires us to enter the name of our application, enter the name and click `Next`. For this project, we will name our application `CheckOutForm` as shown below:

![Name of Application](/engineering-education/building-a-checkout-form-with-stripe-elements/name.png)

On the next screen, we are required to select the target framework for our application, select `.Net Core 5.0(Current support)` and click `Create` as shown in the figure below:

![Target framework](/engineering-education/building-a-checkout-form-with-stripe-elements/framework.png)

When we debug our application on a web browser, it will appear as seen in the figure below:

![App appearance](/engineering-education/building-a-checkout-form-with-stripe-elements/appearance.png)

### Adding Stripe elements to our checkout form in our blazor application
We can count and fetch data in our application that we have just created, but we cannot monetize it. This is where Stripe elements come in. We will be using Stripe to get paid in our application.

The first thing we need to create is our payment page. To do this, we will add a page in our pages folder and name it `PaymentPage.razor`, which will contain the following code:

```C#
@page "/pay"
@inherits PaymentBase
<h1>Purchase Our products</h1>
<StripeConstituent _subRequest="BillingInfo" @ref="StripePaymentBase" PaymentProcessed="SendSubToServerAsync"></StripeConstituent>
```

We will also create another file called `PaymentPage.razor.cs` in the same folder as `PaymentPage.razor`. This file has a Stripe constituent and a Stripe billing request that we will create. We will also initialize the payment information in this file and the placeholder for sending the information to the server.

The code below will help implement this information:

```C#
namespace CheckOutForm.Client.Pages
{
    public class PaymentPageBase : ConstituentBase
    {
        protected StripeConstituent StripePaymentBase;
        [Inject] NavigationManager _navigationManager { get; set; }
        [Inject] HttpClient _httpClient { get; set; }
        protected StripeBillingRequest BillingInfo;
        protected override void OnInitialized()
        {
            BillingInfo = new();
            base.OnInitialized();
        }
        private async Task<APIResultModel> PostToBackend(string url, string jsonPayload)
        {
            APIResultModel apiResult = new APIResultModel();
            HttpResponseMessage responseMessage;
            HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Post, url);

            try
            {
                requestMessage.Content = new StringContent(jsonPayload,
                    Encoding.UTF8, "application/json");
                responseMessage = await SendMessageAsync(requestMessage);
                apiResult.Message = await responseMessage.Content.ReadAsStringAsync();
                apiResult.Success = responseMessage.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                apiResult.Success = false;
                if (ex.Message.Contains("One or more errors"))
                {
                    apiResult.Message = ex.InnerException.Message;
                }
                else if (ex.Message.Equals("The requested message is already send."))
                {
                    apiResult.Message = "An error occurred while contacting the server. Please try again later. Thank you.";
                }
                else
                {
                    apiResult.Message = ex.Message;
                }
            }
            return apiResult;
        }
        private async Task<HttpResponseMessage> SendMessageAsync(HttpRequestMessage requestMessage)
        {
            HttpResponseMessage response;
            response = await _httpClient.SendAsync(requestMessage);
            return response;
        }
    }
}
```

The other thing we will be doing is to create a `StripeConstituent.razor` file. This file will contain the card holder name, email and the card element. This is implemented in the HTML code below:

```HTML
<div class="row">
    <div class="col-sm-6 col-lg-6 col-md-6">
        <EditForm Model="@_subRequest">
            <ChildContent Context="EditContext">
                <DataAnnotationsValidator />
                <div class="row">
                    <div class="col-sm-6 col-lg-6 col-md-6">
                        <div class="form-group">
                            <label for="CreditCardholderName"> Credit Card Holder Name</label>
                            <InputText id="CreditCardHolderName" class="form-control" @bind-Value="@_subRequest.PaymentName" placeholder="Enter the Full Name of the Cardholder"></InputText>
                        </div>
                        <ValidationMessage For="@(() => _subRequest.PaymentName)" />
                    </div>
                    <div class="col-sm-6 col-lg-6 col-md-6">
                        <div class="form-group">
                            <label for="payment-email">Email to be notified</label>
                            <InputText id="payment-email" class="form-control" @bind-Value="@_subRequest.PaymentEmail" placeholder="Enter the Email of the Cardholder"></InputText>
                        </div>
                        <ValidationMessage For="@(() => _subRequest.paymentEmail)" />
                    </div>
                </div>
            </ChildContent>
        </EditForm>
    </div>
    <div class="col-sm-3 col-lg-3 col-md-3">
        <div class="form-group">
            <label for="card-element">Card Details</label>
            <div id="card-element" style="display: block;
                                          width: auto;
                                          padding: 0.52rem  .75rem;
                                          font-size: 2rem;
                                          line-height: 1.4;
                                          color: #606060;
                                          background-color: #808080;
                                          background-clip: padding-box;
                                          border: 1px solid #0f0f;
                                          border-radius: .25rem;
                                          transition: border-color .20s ease-in-out,box-shadow .20s ease-in-out;">
            </div>
            <div id="card-element-errors" role="alert" color="red"></div>
            <div style="height:11px">
            </div>
        </div>
    </div>
    <div class="col-sm-3 col-lg-3 col-md-3">
        <button @onclick="ProcessPaymentAsync" style="margin-top: 50px;" class="btn btn-primary">Buy</button>
    </div>
</div>
```

In the above code, we have a button for paying for our purchased order that will enable us to process the payment.

We will also need to create a partial class extending the `StripeConstituent`. In this class, we will have our JavaScript runtime, and this is where we will be passing in our JavaScript.

We are also passing down the billing information, precisely the boolean information that we are getting from the payment page in this class.

We will have a callback function called whenever a payment is processed. So, we have to wait for Stripe to process that payment first to ensure that the current credit card is valid.

If the current credit card is valid, the callback function gives us the payment identifier we send to the server. We never touch the credit card number since it is all developed by Stripe.

We will also have a boolean value for initial time use because it is only on the first time that you render the page that you want to create the card. Therefore, we will set this boolean to true.

The last thing we will do in the `StripeConstituent.razor.cs` file is to render the boolean value by invoking the initialize from the Javascript that will create the credit card element.

We will create a function to process payments once the user clicks on the `Buy` button. This will be implemented with the code under the function `public async Task ProcessPaymentAsync()`.

We will use the code snippet below in the `StripeConstituent.razor.cs` file to implement it:

```C#
namespace CheckOutForm.Client.Constituent
{
    public partial class StripeConstituent : IDisposable
    {
        [Inject] IJSRuntime _js { get; set; }
        [Parameter] public StripeBillingRequest _subRequest { get; set; }
        [Parameter] public EventCallback<bool> PaymentProcessed { get; set; }
        protected bool _initialTime;
        private DotNetObjectReference<StripeComponent> _objRef;
        protected override async Task OnInitializedAsync()
        {
            _initialTime = true;
        }
        public void Dispose()
        {
            _objRef?.Dispose();
        }
        public async Task ProcessPaymentAsync()
        {
            _objRef = DotNetObjectReference.Create(this);
            await _js.InvokeVoidAsync("createPaymentMethodServer", _objRef, _subRequest.BillingEmail, _subRequest.BillingName);
        }
        protected override async Task OnAfterRenderAsync(bool initialRender)
        {
            if (_initialTime)
            {
                _initialTime = false;
                await _js.InvokeVoidAsync("Initiate");
            }
        }
        [JSInvokable("Subscribe")]
        public Task Subscribe(string paymentIdentifier)
        {
            _subRequest.BillingMethod = paymentIdentifier;
            return PaymentProcessed.InvokeAsync(true);
        }
    }
}
```

We will create another file in the `wwwroot` folder and name it `script.js`.

In this file, we will start by initializing the variables we will be using. It is where the Stripe's public key is initialized. The public key is found from the Stripe account that we created.

We then set the Stripe elements and apply the necessary styling to our card element to look good. The code below will help implement this:

```Javascript
let stripe, user, amount, card;
stripe = window.Stripe('pk_test_51HsZbzBkXnJ98OJr1J1FhgukggfdtyuVfiCSxqyAKyvtVQukCfdsyjgfssdfdyjDt5cRqJ5HT7aSclkwIlgssfvfg7OXmqbfX00KesyaFAy');
let elements = stripe.elements();
let  style = {
    base: {
        color: '#ffff',
        fontFamily: 'system-ui, Georgia, "Gill Sans" ',
        fontSmoothing: 'auto',
        fontSize: '20px',
        '::placeholder': {
            color: '#0000ff'
        }
    },
    invalid: {
        color: '#808080',
        iconColor: '#808080'
    }
};
```

When initiating, we called the function below; the function creates the credit card element and pops up the credit card number, CVV and valid date of the card. We will also check for errors on the card and display them.

```Javascript
let newcard = true;
function Initiate() {
    if (newcard) {
        card = elements.create('card', { style: style });
        newcard = false;
    }
    card.mount('#card-element');
    card.on('change', function (event) {
        errorHandler(event);
    });
}
```

We will create a function in the JavaScript file that handles any errors during the payment. We will use the code below:

```Javascript
function errorHandler(event) {

    let errorHandler = document.getElementById('card-element-errors');

    if (event.error) {
        errorHandler.textContent = event.error.message;
    } else {
        errorHandler.textContent = '';
    }
}
```

The card element in the code snippet below is what JavaScript will look for. The `createPaymentMethod` is calling the `stripe.createBillingMethod`, and in the instance where there is no error, it calls for the credit card subscription from the `dotnetHelper` and passes the billing method identifier.

```Javascript
function createPaymentMethod(dotnetHelper, cardElement, billingEmail, billingName)
{
    return stripe
        .createBillingMethod({
            type: 'card',
            card: cardElement,
            payment_details: {
                name: paymentName,
                email: paymentEmail,
            },
        })
        .then((result) => {
            if (result.error) {
                errorHandler(result);
            } else {
                createSubscription(dotnetHelper, result.billingMethod.id );
            }
        });
}
```

We need to create a billing method server and pass in the `dotnetHelper`, `paymentEmail`, `paymentName`.

```Javascript
function createBillingMethodServer(dotnetHelper, paymentEmail, paymentName)
{
    createBillingMethod(dotnetHelper, card, paymentEmail, paymentName);
}

function createSubscription(dotnetHelper, BillingMethodIdentifier)
{
    dotnetHelper.invokeMethodAsync('Subscribe', paymentMethodIdentifier);
    dotnetHelper.dispose();
}
```

Now, the last thing to do is go to the `index.html` file and add the javascript link in the head of the `html` code.

```HTML
    <script src="https://js.stripe.com/v3/"></script>
    <script src="stripescript.js"></script>
```

### How taxation is handled
When we talk about international payments, taxes are the best thing to keep in mind. However, with Stripe elements, taxation issues are easily handled. 

Stripe elements enable you to configure where you are, and it customizes for you every region and thresh-holds where you will start paying taxes. This helps it automatically apply taxes based on the customer's shipping address.

When we are building our own checkout forms with Stripe elements, we need to determine where our customer is located to present the correct taxes to the customer.

A new Stripe feature is being worked on, which has support for remittance of taxes in the United States. This feature collects taxes and pays them to us in the United States.

### Conclusion
From this article, it is clear that with the help of Stripe elements, businesses can easily enable the flow of cash from different parts of the world, which adhere to government policies and regulations. Moreover, this is easier since taxation is calculated based on the shipping destination.

I hope you find this article helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
