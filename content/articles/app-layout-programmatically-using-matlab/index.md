---
layout: engineering-education
status: publish
published: true
url: /app-layout-programmatically-using-matlab/
title: App Layout Design using Matlab
description: This article will discuss how to design an app layout using Matlab functions.
author: vitalis-odhiambo
date: 2022-04-11T00:00:00-09:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/app-layout-programmatically-using-matlab/hero.jpg
    alt: App Layout Design Using Matlab Example Image
---
An app layout consists of several components that contain the user interface (UI) elements. User interface elements fall into four main categories; input control elements, informational elements, navigation components, and containers.
<!--more-->
Matlab provides an interactive environment for developing [UI-figure](https://www.mathworks.com/help/matlab/ref/matlab.ui.figureappd-properties.html) based application layouts programmatically using Matlab functions. Uifigure based apps are designed using user interface figures meant for app development.

The user interface elements perform different functions in the application. The behavior and appearance of a user interface element are added as the element's properties and functions.

#### Prerequisites
To follow along with this tutorial, you need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](https://www.section.io/engineering-education/getting-started-with-matlab/).

#### Objectives
In this article, we will discuss the design of the following layout structures of UI-figure based apps:
- Containers.
- Components.
- Dialog and notification boxes.

#### Containers
Containers are structures that hold the app components together. A default user interface container in Matlab is made using the function `uifigure`.

The title of the container is added using the syntax `fig=uifigure('Name','figure title');` while the position is added using the function `fig.position=[];`.

The code snippet below demonstrates creation of a default container:

```matlab
fig = uifigure('Name','Broadsheet 1);  % container title
fig.position = [580 550 360 280]; %figure position
```

![Container](/engineering-education/app-layout-programmatically-using-matlab/applayout-a.jpg)

#### Types of UIfigure container
Types of containers include:
- Panel container.
- Tab group container.

#### Panel container
Panel containers are used for grouping the user interface components together. Panel containers are made using the function `uipanel();`.

The properties of a panel container are specified using the function `uipanel(Name, value);`. The value is defined using one or more arguments.

The function `parent` creates a panel in a specified parent container. The syntax for parent container properties is shown below:

```matlab
panel=uipanel(parent,Name,value);`
```

The code snippet below shows the creation of a figure containing two panels and a button. The main panel is labelled 'panel 1', the sub-panel is labelled 'panel 2', and the button is labelled 'Start':

```Matlab
fig = figure; % Main container
%Main panel properties
main_panel = uipanel('Title','Panel 1','FontSize',15,...
             'BackgroundColor','red',...
             'Position',[.25 .1 .67 .67]);
% sub panel properties
sub_panel = uipanel('Parent',main_panel,'Title','panel 2', 'FontSize',12,...
              'Position',[.4 .1 .5 .5]);
% button properties
c = uicontrol('Parent',sub_panel,'String','Start',...
              'Position',[18 18 72 36]);
```

![Panel container](/engineering-education/app-layout-programmatically-using-matlab/applayout-b.jpg)

#### Tab group containers
A tab group container is created using the function `uitabgroup()`. It allows identification and navigation through different tabs.

Tab group container properties are added using the syntax `uitabgroup(Name,value)`. The syntax for specifying parent container is `uitabgroup(Parent,Name,value)`.

For demonstrations, we will create a tab group with two tabs. The first tab will have the title 'Tools' while the second tab will have the title 'View':

```matlab
fig = figure;
tab_group = uitabgroup(fig,'Position',[.07 .05 .3 .8]); % tab group position in the main container
tab1 = uitab(tab_group,'Title','Tools'); % first tab properties
tab2=uitab(tab_group,'Title','View'); %second tab properties
```

![Tab group containing two tabs](/engineering-education/app-layout-programmatically-using-matlab/applayout-c.jpg)

Tab group can also contain other components for option selection and input controls. Components like dropdown buttons are added using the function `uidropdown();` while a checkbox is added using the function `uicheckbox();`.

The code snippet below shows how to design tab group containers holding components with specified properties. For example, the main tab will have the title 'Member gender', the dropdown button will contain two options; 'male' and 'female', while the button will be labelled 'Enter':

```matlab
fig = uifigure; % main container
tab_group = uitabgroup(fig,'Position',[50 50 196 145]); % tab group properties
t = uitab(tab_group,'Title','Member gender'); % main tab properties
drop_down = uidropdown(t,'Position',[11 90 140 22],'Items',{'Male','Female'}); % drop down button properties
cb = uicheckbox(t,'Position',[11 65 140 22],'Text','Member'); %check box properties
b = uibutton(t,'Position',[11 40 140 22],'Text','Enter'); % button properties
```

![Tab containing components](/engineering-education/app-layout-programmatically-using-matlab/applayout-d.jpg)

#### Components
Components in an application enable a user to perform the following operations.
- Navigate through the app.
- Feed the app with information.
- Share information with the user.

We will discuss the creation of the following app component:
- Buttons.
- Checkbox.
- Drop down.

#### Button
Buttons are created using the function `uibutton();`. A button may have a text or an icon on it.

A simple button layout is created using the code snippet below:

```Matlab
f = uifigure % main figure
b = uibutton(f);
```

![Simple button](/engineering-education/app-layout-programmatically-using-matlab/applayout-e.jpg)

Button properties are added using the syntax `uibutton(fig,'properties');`. Such properties include position and the message content of the button.

For example, we will design a state button displaying the massage 'Reset' at a position [100,50,30,100]:

```matlab
f=uifigure % Main container
btn = uibutton(f,'state','Text','Reset','Value',true,'Position',[60,110,110,25]); % button properties
```

![State button](/engineering-education/app-layout-programmatically-using-matlab/applayout-f.jpg)

The main types of buttons are radio and toggle. Radio buttons are created using the function `uiradiobutton()` while toggle buttons are created using the function `uitogglebutton();`.

#### Checkbox
A checkbox allows the user to select or deselect items in the application. The selected items are marked with a tick or a dash.

In Matlab, a checkbox is created using the function `uicheckbox()`. The name and position of the checkbox can be added using the syntax `uicheckbox('Name', 'value');`.

The code snippet below demonstrates the creation of a checkbox. When the checkbox is clicked, it is automatically checked:

```Matlab
f = uifigure; % main container
check_box = uicheckbox(f); % checkbox function
```

![Unmarked check box](/engineering-education/app-layout-programmatically-using-matlab/applayout-g.jpg)

![Marked check box](/engineering-education/app-layout-programmatically-using-matlab/applayout-h.jpg)

#### Dropdown
Dropdown offers a list of options for a particular action. The function `uidropdown();` is used to create a dropdown. Visible properties of dropdown is added using the syntax `uidropdown(figure, 'value');`:

```matlab
f = uifigure;% main container
drop_down = uidropdown(f,'Items',{'Road','Air','Water','Pipeline','Railway'},'Value','Road'); % drop down properties
```

![Drop down items](/engineering-education/app-layout-programmatically-using-matlab/applayout-i.jpg)

#### Dialog and notifications
Dialog and notifications elements enable the app to communicate warnings, alerts, the progress of particular activity, or instructions to the user.

Dialog and notification elements are usually accompanied by specific signs inform of icons. We will discuss the layout design of the following dialog and notification elements:
- Alert dialog box.
- Confirmation dialog box.

#### Alert dialog box
Alert dialog boxes are used to notify the app user with information that demands his attention. It is created using the function `uialert()`. The code snippet below shows the design of the alert dialog box layout with a massage 'Unsupported format':

```Matlab
f = uifigure; % main container
uialert(f,'Unsupported format','invalid file'); % alert box  messages
```

![Alert dialog box](/engineering-education/app-layout-programmatically-using-matlab/applayout-j.jpg)

The code snippet below shows how to use the alert dialog box for a warning:

```matlab
fig = uifigure; % main container
message = {'Too loud!','Consider reducing the volume.'}; % message to display
uialert(fig,message,'Warning',...
'Icon','warning'); % alert box properties
```

![Warning dialog box](/engineering-education/app-layout-programmatically-using-matlab/applayout-k.jpg)

#### Confirmation dialog box
A confirmation dialog box is created using the function `uiconfirm`. It enables the user to instruct the app on handling certain activities. The instruction is chosen from options provided by the application.

A confirmation dialog box can have one or more options available for selection.

We will create a confirmation box with the title 'Quit' and a message 'Do you want to save this file.'. The available options will be 'save, do not save, and cancel'.'. The code below shows this process:

```Matlab
fig = uifigure; %main containerx
msg = 'Do you want to save this file.'; % confirmation dialog box massage
title ='Quit'; % box title
selections= uiconfirm(fig,msg,title, ...
           'Options',{'save','do not save','Cancel'}, ...
           'DefaultOption',2,'CancelOption',3); % options available for selection
```

![Confirmation dialog box](/engineering-education/app-layout-programmatically-using-matlab/applayout-l.jpg)

#### Conclusion
App layout design is used in designing mobile applications or websites. In addition, apps are helpful in communication, data storage, and entertainment. This article demonstrated how Matlab provides an interactive environment for designing app layouts using Matlab functions.

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
