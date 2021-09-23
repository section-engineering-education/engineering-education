---
layout: engineering-education
status: publish
published: true
url: /what-is-mvc-and-how-does-it-work/
title: What is MVC Architecture and how does it work?
description: In this article, the reader will learn about the MVC framework, its benefits, and how to develop efficient software applications using MVC framework.
author: esther-mwangi
date: 2021-09-05T00:00:00-11:30
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/what-is-mvc-and-how-does-it-work/hero.png
    alt: How mvc framework works image
--- 

Today, developers have changed their patterns of designing websites. Most of them use frameworks like [Django](https://www.djangoproject.com), [Rails](https://rubyonrails.org/), [Laravel](https://laravel.com/), [Yii 2](https://www.yiiframework.com/), etc. 
<!--more-->
Programmers utilize various patterns and software architectures to make their code easier to understand and develop applications faster. 

`Model-View-Controller Architecture (MVC)` is one of these design patterns. The MVC framework has become an essential component of modern web application development.

In this article, we will learn about the MVC framework, its benefits, and how to develop efficient software applications.

### Table of contents
- [What is a Framework?](#what-is-a-framework)
- [Software Architecture Definition](#software-architecture-definition)
- [Model-View-Controller Architecture](#model-view-controller-architecture)
- [How Model View Controller Architecture works](#how-model-view-controller-architecture-works)
- [Benefits of Model-View-Controller ](#benefits-of-model-view-controller )

### What is a Framework?
A `Framework` is a skeleton solution (it gives the outline) in which a specific element must be plugged to establish a solid solution. They are made up of a set of related classes that can be specialized to implement an application.

### Software architecture definition
Software architecture is the way a system is organized. This organization covers all components, how they interact, the operating environment, and the software design principles. 

### Model-View-Controller architecture
Currently, `MVC` is the top-ranked software architecture that developers are using. It constitutes three interconnected components. These components are: 

1. Model
2. View
3. Controller

Let us look at the function of each component:

#### 1. Model
The model is the layer that keeps data for the application. The layer is responsible for storing and retrieving data from the database, and it is also responsible for validating the data. 

For example, if you want to create a new user, you will have to create a new user model and save it to the database.

#### 2. View
It is the layer used to present the application. It is used to display the data to the end-user. 

For instance, if you want to create a user view, you will have to create UI components that the user interacts with, such as a login form in an easy-to-understand format.

#### 3. Controller
The controller is the logic layer of the application. It is responsible for processing the user's request and generating the response. It links the view and the model.

For example, the controller will be responsible for validating the user's input, and then it will pass the user's input to the model to save the user.

### How MVC architecture works
The controller receives the request for the application and passes it to the model to send and receive data.

The view then uses the data from the controller to generate presentable information to the end-user.
The view is only concerned with how the information is presented, not with the end presentation. Thus, it is the `Html` file that renders the information from the controller.
 
The view then sends its final presentation to the controller, and the controller then sends the response to the browser, which then displays the response to the end-user.
 > **Note** Models, Views, and other components are linked together in a runnable application by the controllers.

To understand this concept better, let us take a look at the following example.

![MVC Architecture](/engineering-education/what-is-mvc-and-how-does-it-work/mvc.png)  

Let us have a look at what is happening here. 

The user first inputs a particular contact record based on the contact id through the browser. The browser then sends a request to the controller that it wants a specific contact record. 

The controller then interacts with the model to get the contact record. The model will find the record from the database and then return it to the controller.

```php
    protected function findModel($id)
    {
        if (($model = Contact::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    } 
```

The model will then look for the record from the database and then return it to the controller.

```php
/**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'contact';
    }  
```

Once the controller gets the record, it interacts with the view to generate the response. The view will then present the record.
```php
 /**
     * Displays a single Contact model.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }
```
When the View receives the request, it renders the record and sends it to the Controller in `HTML`.
```php
 <div class="contact-form">
    <?php $form = ActiveForm::begin(); ?>
  <?= $form->field($model, 'contact_id')->textInput() ?> 
    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
    <?= $form->field($model, 'email')->textInput(['maxlength' => true]) ?>
    <?= $form->field($model, 'subject')->textInput(['maxlength' => true]) ?>
    <?= $form->field($model, 'body')->textInput(['maxlength' => true]) ?>
    <div class="form-group">
        <?= Html::submitButton('app'Save', ['class' => 'btn btn-success']) ?>
    </div>
    <?php ActiveForm::end(); ?>
</div> 
```

The controller will then respond to the browser based on the `HTML` file from the view.

### Benefits of Model-View-Controller

- **Ease of Debugging**: Since the application is divided into components, it is easier to debug one component without interfering with the other components. For example, if you want to debug the backend, you can do it without debugging the frontend.
- **Ease of Use**: The user can focus on the task at hand and not think about how to use the application.
- **Ease of Extensibility**: Since the application is divided into components, it is easier to add new components without interfering with the other components. For example, if you want to add a new backend, you can do it without modifying the frontend.

### Conclusion
In this tutorial, we have covered the basics of Model-View-Controller Architecture. We have also seen how the MVC architecture works.

The most exciting thing about MVC is that it is not a single pattern. Instead, it is a set of patterns that are used together to build a complex application.

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
