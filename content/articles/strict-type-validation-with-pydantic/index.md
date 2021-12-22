---
layout: engineering-education
status: publish
published: true
url: /strict-type-validation-with-pydantic/
title: Strict Type Validation With Pydantic
description: This tutorial will guide the reader on how to type validate the inputs using Pydantic. We will also learn about create custom validators. Type validation can be made more accessible with frameworks like Pydantic.
author: oluwatomisin-bamimore
date: 2021-11-21T00:00:00-12:20
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/strict-type-validation-with-pydantic/hero.png
    alt: Strict Type Validation With Pydantic Image
---
Type validation is the process of making sure what you get is what you are expecting. If an endpoint is supposed to get an integer, you use type validation to ensure the input is an integer and not a string. It could be time-consuming to write your validation logic.
<!--more-->
Many API frameworks have type validation out of the box, whereas lightweight programming frameworks like Flask do not. Type validation can be made more accessible with frameworks like Pydantic.

In this post, we'll look at various Pydantic features and examples on how to use them.

### Prerequisites
For the reader to follow along, they must have the following:
- Have Python (>= 3.6) installed.
- Install `Pydantic` with:

```bash
pip install pydantic
```

### Data models
Objects in Pydantic are defined using models. A model class inherits from the `BaseModel` class. All of the fields and custom validation logic sit in the data model class.

A simple example is a model that defines a user profile and the fields it contains.

```python
from pydantic import BaseModel

class Profile(BaseModel):
    firstname: str
    lastname: str
    location: str
    bio: str
```

In the above snippet, the name of the data model is `Profile.` It inherits Pydantic's `BaseModel` class; it also defines some fields in a profile like `firstname`, `lastname`, and their types. They are all expected to be strings in this case.

```python
# create a new profile with some fields
new_profile = {
    "firstname": "Tomi",
    "lastname": "Bamimore",
}

# validate the new_profile with the Profile data model
profile = Profile(**new_profile)
print(profile)
```

Passing the `new_profile` dictionary, which contains information about a new profile, into the `Profile` model will validate the `new_profile`.

If you run the code snippet above, you will get this error:

```bash
pydantic.error_wrappers.ValidationError: 2 validation errors for Profile
location
 field required (type=value_error.missing)
bio
 field required (type=value_error.missing)
```

Missing fields in the `new_profile` dictionary caused this error. Pydantic makes all the fields defined in the data model to be "required" by default.

Alternatively, you can use `Optional` defined by the `typing` module in Python's standard library to make a field optional.

```Python
from typing import Optional
from pydantic import BaseModel

# create a pydantic data model
class Profile(BaseModel):
    firstname: str
    lastname: str
    location: Optional[str]
    bio: Optional[str]

# create a new profile with some fields
new_profile = {
    "firstname": "Tomi",
    "lastname": "Bamimore",
}

# validate the new_profile with the Profile data model
profile = Profile(**new_profile)
print(profile.json())
```

**Output:**

```json
{"firstname": "Tomi", "lastname": "Bamimore", "location": null, "bio": null}
```

This time, the output is a JSON.

A JSON output is useful when working with APIs. You can also access results like attributes of an object in Python.

```python
new_profile = {
    "firstname": "Jane",
    "lastname": "Doe",
}
profile = Profile(**new_profile)
print(profile.firstname, profile.lastname)
```

**Output:**

```bash
Jane Doe
```

### Recursive models
When dealing with nested fields, using a data model as a data type in another model arises.

A data model can be declared as a type in another data model. You need recursive models when a field in one model has other child fields related to it. This is the concept of recursive models. 

In the example below, `Bio` is defined as a data model. `Bio` is also a type in the `Profile` model.

```Python
from typing import Optional

from pydantic import BaseModel

class Bio(BaseModel):
    age: Optional[int]
    profession: str
    school: str

class Profile(BaseModel):
    firstname: str
    lastname: str
    location: Optional[str]
    # Model Bio is now the type of a field in the Profile model
    bio: Bio

new_profile = {
    "firstname": "Jane",
    "lastname": "Doe",
    "bio": {"age": 38, "profession": "Nurse", "school": "MIT"},
}
profile = Profile(**new_profile)
print(profile.dict())
```

**Output:**

```Python
{
    "firstname": "Jane",
    "lastname": "Doe",
    "location": None,
    "bio": {"age": 38, "profession": "Nurse", "school": "MIT"},
}
```

### Pydantic field types
Pydantic supports an extensive range of field types from Python's standard library. The list is limitless and can't be exhausted in this article.

Pydantic also has custom types like `PaymentCardNumber`. 

See how it works in the snippet below:

```Python
from pydantic import BaseModel

from pydantic.types import PaymentCardNumber, ConstrainedInt

# Define the Payment model
class Payment(BaseModel):
    # card_number is defined as a field with PaymentCardNumber type
    card_number: PaymentCardNumber

# A valid credit card number
new_card = 4238721116652766
new_payment = Payment(card_number=new_card)
print(new_payment)
```

**Output:**

```bash
card_number='4238721116652766'
```

Credit card numbers are validated using the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). Pydantic runs the validation under the hood to validate any input to the `card_number` field.

If the input is invalid:

```Python
from pydantic import BaseModel, conint
from pydantic.types import PaymentCardNumber

class Payment(BaseModel):
    # constrain amount to greater than or equal to 300
    amount: conint(ge=300)
    card_number: PaymentCardNumber

new_card = 7618972848548894
new_payment = Payment(card_number=new_card, amount=300)
print(new_payment)
```

**Output:**

```bash
pydantic.error_wrappers.ValidationError: 1 validation error for Payment
card_number
 card number is not luhn valid (type=value_error.payment_card_number.luhn_check)
```

### Custom validators
Pydantic also allows writing custom validation methods. It is useful when working with generic data types that need custom validation.

In the example below, we will validate an employee ID. It is a string with four integers, a hyphen and two alphabets. 

For example, `2345-HG`.

```Python
from pydantic import BaseModel, validator

class Employee(BaseModel):
    employee_id: str
    # validator decorator is used to wrap custom validation fuction for a field
    @validator("employee_id")
    def employee_id_validator(cls, value):
        splitted = value.split("-")
        if len(splitted) != 2:
            raise ValueError("Invalid id")
        if len(splitted[0]) != 4:
            raise ValueError("Invalid id")
        if len(splitted[1]) != 2:
            raise ValueError("Invalid id")
        return value

# validate a new employee id
new_employee = Employee(employee_id="234-HG")
print(new_employee)
```

**Output:**

```bash
pydantic.error_wrappers.ValidationError: 1 validation error for Employee
employee_id
 Invalid id (type=value_error)
```

In the code snippet above, an incorrect `employee_id` is passed into the model. Pydantic runs the custom validator and returns an error if any of the checks fail.

With the correct input, it runs successfully:

```python
new_employee = Employee(employee_id="2345-HG")
print(new_employee.dict())
```

**Output:**

```python
{'employee_id': '2345-HG'}
```

Your validation logic can be as complex as you want. It is a good practice to use a try/except block when working with Pydantic models.

```python
try:
    new_employee = Employee(employee_id="2345-HG")
    print(new_employee.dict())

except:
    # Error handling logic
    print("ERROR")
```

### Generating JSON schemas
Pydantic models can generate JSON schema complaints with the OpenAPI specifications. You can use the `Field` object to populate the schema with information.

Schemas help define the structure of a JSON document. Schemas are needed for generating API documentation.

```Python
from typing import Optional
from pydantic import BaseModel, Field

class Bio(BaseModel):
    age: Optional[int]
    profession: str
    school: str

class Profile(BaseModel):
    firstname: str = Field("Jane", title="Firstname", description="User's firstname")
    lastname: str = Field("Doe", title="Lastname", description="User's lastname")
    location: Optional[str] = Field(
        None, title="Location", description="User's location"
    )
    bio: Optional[Bio] = Field(None, title="Bio", description="Short bio of user")

# create a new profile
new_profile = {"firstname": "Tomi", "lastname": "Bamimore"}
profile = Profile(**new_profile)
# generate json schema
print(profile.schema_json())
```

**Output:**

```bash
{
    "title": "Profile",
    "type": "object",
    "properties": {
        "firstname": {
            "title": "Firstname",
            "description": "User's firstname",
            "default": "Jane",
            "type": "string",
        },
        "lastname": {
            "title": "Lastname",
            "description": "User's lastname",
            "default": "Doe",
            "type": "string",
        },
        "location": {
            "title": "Location",
            "description": "User's location",
            "type": "string",
        },
        "bio": {
            "title": "Bio",
            "description": "Short bio of user",
            "allOf": [{"$ref": "#/definitions/Bio"}],
        },
    },
    "definitions": {
        "Bio": {
            "title": "Bio",
            "type": "object",
            "properties": {
                "age": {"title": "Age", "type": "integer"},
                "profession": {"title": "Profession", "type": "string"},
                "school": {"title": "School", "type": "string"},
            },
            "required": ["profession", "school"],
        }
    },
}
```

The first argument to the `Field` object is the default value of the field. You should set it to `None` if you don't want any default value. The other keyword arguments in the `Field` are for optional properties in the schema.

### Conclusion
Pydantic is built in a way that allows room for flexibility. You can use Pydantic with any development framework, and it works just fine.

Frameworks like FastAPI support Pydantic out of the box. Other loosely coupled frameworks like Flask do not come bundled with Pydantic but allow room for integration.

From examples in the article, Pydantic enables you to control input types custom validation, because input validation is a significant step towards securing your application.

Happy learning!

### Further reading
- [Validators](https://pydantic-docs.helpmanual.io/usage/validators/)
- [Data quality](https://towardsdatascience.com/8-reasons-to-start-using-pydantic-to-improve-data-parsing-and-validation-4f437eae7678)
- [Schemas](https://pydantic-docs.helpmanual.io/usage/schema/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
