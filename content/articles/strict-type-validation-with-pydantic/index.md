Validating all of your API’s inputs will prevent it from a variety of vulnerabilities. It could be time-consuming to write your validation logic. Many API frameworks have type validation out of the box, whereas lightweight programming frameworks like Flask do not. Type validation can be made more accessible with frameworks like Pydantic. In this post, we’ll look at various Pydantic features and examples of how to use them.

### Prerequisites


- Python >= 3.6
- Install Pydantic with:

```bash
pip install pydantic[email]
```

### Data Models

Objects in Pydantic are defined using models. A model class inherits from the `BaseModel` class. All of the fields and custom validation logic sit in the data model class. A simple example is a model that defines a user profile and the fields it contains.

```python
from pydantic import BaseModel

class Profile(BaseModel):
    firstname: str
    lastname: str
    location: str
    bio: str
```

The name of the data model is `Profile.` It inherits Pydantic’s `BaseModle` class; it also defines some fields in a profile like first name, last name, and their types. They are all expected to be strings in this case.

```python
new_profile = {
    "firstname": "Tomi",
    "lastname": "Bamimore",
}

profile = Profile(**new_profile)

print(profile)
```

Passing the `new_profile` dictionary, which contains information about a new profile, into the `Profile` model will validate the `new_profile.`  


If you run the code snippet above, you will get this error:

```
pydantic.error_wrappers.ValidationError: 2 validation errors for Profile

location

 field required (type=value_error.missing)

bio

 field required (type=value_error.missing)

```

Missing fields in the `new_profile` dictionary caused this error. Pydantic makes all the fields defined in the data model required by default. You can use `Optional` defined by the `typing` module in Python’s standard library to make a field optional.

```python
from typing import Optional
from pydantic import BaseModel

class Profile(BaseModel):
    firstname: str
    lastname: str
    location: Optional[str]
    bio: Optional[str]


new_profile = {
    "firstname": "Tomi",
    "lastname": "Bamimore",
}

profile = Profile(**new_profile)
print(profile.json())
```

Output:

```json
{"firstname": "Tomi", "lastname": "Bamimore", "location": null, "bio": null}
```

This time, the output is JSON. A JSON output is useful when working with APIs. The output can also be accessed like attributes of an object in Python.

```python
new_profile = {
    "firstname": "Jane",
    "lastname": "Doe",
}
profile = Profile(**new_profile)
print(profile.firstname, profile.lastname)
```

Output:

```bash
Jane Doe
```

### Recursive Models

A data model can be declared as a type in another data model. In the example below, `Bio` is defined as a data model. It is also a type in the `Profile` model.

```python
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
    bio: Bio


new_profile = {
    "firstname": "Jane",
    "lastname": "Doe",
    "bio": {"age": 38, "profession": "Nurse", "school": "MIT"},
}
profile = Profile(**new_profile)
print(profile.dict())
```

Output:

```python
{
    "firstname": "Jane",
    "lastname": "Doe",
    "location": None,
    "bio": {"age": 38, "profession": "Nurse", "school": "MIT"},
}
```

### Pydantic Field Types

Pydantic supports an extensive range of field types from Python’s standard library. The list is limitless and can’t be exhausted in this article. Pydantic also has custom types like `PaymentCardNumber`. See how it works in the snippet below.

```python
from pydantic import BaseModel

from pydantic.types import PaymentCardNumber, ConstrainedInt


class Payment(BaseModel):
    card_number: PaymentCardNumber


new_card = 4238721116652766
new_payment = Payment(card_number=new_card)
print(new_payment)
```

Output:

```
card_number='4238721116652766'
```

Credit Card numbers are validated using the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). Pydantic runs the validation under the hood to validate any input to the `card_number` field. If the input is invalid:

```python
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

Output:

```bash
pydantic.error_wrappers.ValidationError: 1 validation error for Payment

card_number

 card number is not luhn valid (type=value_error.payment_card_number.luhn_check)
```

### Custom Validators

Pydantic also allows writing custom validation methods. It is useful when working with generic data types that need custom validation. In the example below, we will validate an employee ID. It is a string with four integers, a hyphen and two alphabets (2345-HG).

```python
from pydantic import BaseModel, validator


class Employee(BaseModel):
    employee_id: str

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


new_employee = Employee(employee_id="234-HG")
print(new_employee)
```

Output:

```bash
pydantic.error_wrappers.ValidationError: 1 validation error for Employee

employee_id

 Invalid id (type=value_error)
```

In the code snippet above, an incorrect `employee_id` is passed into the model. Pydantic runs the custom validator and returns an error if any of the checks fail. With the correct input, it runs successfully.

```python
new_employee = Employee(employee_id="2345-HG")
print(new_employee.dict())
```

Output:

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

### Generating JSON Schemas

Pydantic models can generate JSON schema complaints with the OpenAPI specifications. You can use the `Field` object to populate the schema with information. Schemas help define the structure of a JSON document. Schemas are also used for generating API documentation.

```python
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


new_profile = {"firstname": "Tomi", "lastname": "Bamimore"}
profile = Profile(**new_profile)
print(profile.schema_json())
```

Output:

```json
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

The first argument to the `Field` object is the default value of the field. You should set it to `None` if you don’t want any default value. 

### Conclusion

Pydantic is built in a way that allows room for flexibility. You can use Pydantic with any development framework, and it works just fine. Frameworks like FastAPI supports Pydantic out of the box. Other loosely coupled frameworks like Flask does not come bundled with Pydantic but allows room for integration. From examples in the article, Pydantic enables you to control input types custom validation. Input validation is a significant step towards securing your application.