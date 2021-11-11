### **Introduction**
 ASP.NET also provides the feature of Databinding, using Databinding you can attach any server controls to various expressions, collections, even methods, or properties. There is also the simplicity to select a data source, which can be a static file, a database or any other source.
So ASP.NET Databinding provides a simple and easy way to build a link between server management and application data. 
### **Prerequisites**
To follow along, you need:
- To have visual studio installed on your computer.
- A basic understanding of C# language.
### **Table of content**
- [Concepts of Databinding in ASP.NET](#concepts-of-Databinding-in-ASP.NET)
- [What is Databinding?](#what-is-Databinding)
- [How to create Databinding in ASP.NET](#how-to-createdatabinding-in-ASP.NET)

### **Concepts of Databinding in ASP.NET**
`Databinding in ASP.NET` makes it easier to combine an ASP.NET code. with the results of database queries, collection, method calls, and properties. 
Through data binding with web control and ADO.NET, control content can be moved, from the Structured Query Language (SQL) select queries.
ASP.NET provides two types of binding, which are:
- Declarative data binding.
- Simple data binding.

Very few controls support both of them, but the rest supports simple data binding by default.
Below is a diagrammatic illustration of the Databinding concept in ASP.NET

![concepts of data binding](/engineering-education/Data-Binding-in-ASP.NET/Data-binding.png)
#### Terminologies used in the diagram above
- Source object - holds the organization data.
- Dependency object - object related to the binding target.
- Source property - the value of this source object property, is the actual data.
- Binding target - Data is tied to this user interface element.
- Dependency Property - data is tied to this attribute of the dependence object.
- Binding source - application data variable where organization data is held.

Let’s consider binding text property with employee name, the relations are as follows:
- Name- property.
- Text - Target property,
- Employee - organization object.
- Textbox - target object.

Binding determines the transmission of data to and fro between the source and the target.
In the case of one-way binding, element data is promptly detected in the organization object, whenever any kind of change is implemented in the UI.
When the user interface is informative and the organization data is read-only then one-way binding will be useful.
Two-way binding is when there is synchronization in the data at both ends (target objects and source objects) automatically. 
Furthermore, interactive user interface forms are created in two-way binding, where back-end variables are updated instantly.
In the case of one-way binding, any change in the user interface, element data is promptly detected in the organization object. Also, the contrary is not allowed. This kind of linking is helpful when data output depends only on the user inputs and continuous re-evaluation is required.
### **What is Databinding?**
Before we move forward, let us have a look at Databinding in general.
The action of establishing a link between organization data and the User Interface is called databinding.
One may be curious to know if there is a difference between Databinding and displaying data on the user interface. There is a very big difference. If Databinding is not done correctly, then any change made is not automatically detected on the user interface. This is the main difference between the two.
User Interface elements are always watching the data variables assigned to them. Any change on the values of the variables, the user elements are instructed to update the change on spot.
The calculator in our smart devices is a real-world scenario of one-way binding.
### **How to create Databinding in ASP.NET**
Below is a step-by-step guide to creating Databinding in ASP.NET. In this guide, we are going to create a simple three control WPF application, that includes a text block, a slider, and a progress bar.

### **Step 1**
Open visual studio and click, **create new project**

![First-image](/engineering-education/Data-Binding-in-ASP.NET/image1.png)

### **Step 2**
In the new project wizard, choose **WPF APP (.NET FRAMEWORK)** and click next.

![Second-image](/engineering-education/Data-Binding-in-ASP.NET/image2.png)

### **Step 3**
Configure the default details and choose **create**.

![Third-image](/engineering-education/Data-Binding-in-ASP.NET/image3.png)

### **Step 4**
Then in the shell application created, drag and drop from the toolbox, progress bar, a slider, and a text block.
In this case, the progress-bar value and the textbox are what we will bind to control the value of the slider.

![Forth-image](/engineering-education/Data-Binding-in-ASP.NET/image4.png)

### **Step 5**
To bind text property of the textblock add the following code,

 ```Text="{Binding Value, ElementName=slider}"```
 
 And the Value property of the Progress Bar use the following code,

 ```Value="{Binding Value, Element Name=slider}"```

 By doing so, you bind the properties to the value of the slider.

 ![Fifth-image](/engineering-education/Data-Binding-in-ASP.NET/image5.png)

 ### **Step 6**
 **Run the application** by clicking start, you would notice the slider control changing the values of the text block and the progress bar. Move the slider to see the change.

 ![Sixth-image](/engineering-education/Data-Binding-in-ASP.NET/image6.png)

 Let us look at the terminologies seen in the example.
 - source property - value property of slider.
 - Dependency Object - objects created are the text block and progress bar.
 - Binding target - The progress bar and the Text block are the Binding targets.
 - Binding source - slider control in the user interface.
 - Dependency property - the progress bar value and text block text property.
 - Source object - slider object created with x: Name="slider"

 ### **Step 7**
 The final code should look like this one below,
 ```
 <Window x:Class="DataBinding.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:DataBinding"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid Margin="-3,-28,-6,0">
   <TextBlock HorizontalAlignment="Left" Margin="184,58,0,0" TextWrapping="Wrap" VerticalAlignment="Top" Height="161" Width="282" FontSize="16"
      Text="{Binding Value, ElementName=slider}" />
        <Slider x:Name="slider" HorizontalAlignment="Left" Margin="201,231,0,0" VerticalAlignment="Top" Height="21" Width="210"/>
        <ProgressBar HorizontalAlignment="Left" Height="20" Margin="203,297,0,0" VerticalAlignment="Top" Width="237"
       Value="{Binding Value, ElementName=slider}"/>

    </Grid>
</Window>

```
#### Conclusion
In this article, we have learned the basic concepts of Databinding in ASP.NET and its implementation. The concept of Databinding in ASP.NET goes far beyond this. I highly recommend exploring more, experimenting more, and writing more codes with various data sources.
