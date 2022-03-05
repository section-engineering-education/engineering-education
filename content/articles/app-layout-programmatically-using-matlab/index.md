### App layout design programmatically using Matlab

### Introduction
App layout consists of structures that contain the user interface(UI) elements. User interface elements fall into four main categories: Input control elements, informational elements, navigation components, and containers.

Matlab provides an interactive environment for developing uifigure based apps layouts programmatically using Matlab functions.

The user interface elements perform different functions in the app operations. The behaviour and appearance of a user interface element are added as the element's properties and functions.

### Prerequisites
To follow along with this tutorial, you will need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### Objectives
In the article, we discuss the design of the following layout structures of uifigure based apps :

- Containers.
- Components.
- Dialog and notification boxes.

### Containers
Containers are the structures that hold the app components together. For example, a default user interface container in Matlab is made using the function `uifigure`.

Properties like the title of the container is added by using the sysntax `fig=uifigure('Name','figure title');` while the position is added using the function `fig.position=[];`.

The below codes demonstrate creating of a default container. The title will be specified as 'Broadsheet 1'.
```matlab
fig = uifigure('Name','Broadsheet 1);  % container title
fig.position = [580 550 360 280]; %figure position
```
![Container](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_a.jpg)

### Types of UIfigure container
Types of containers include:

- Panel container.
- Tab group container.

### Panel container
Panel containers are used for grouping together the user interface components. Panel containers are made using function `uipanel();`.

Panel container properties can be specified using the function `uipanel(Name, value);` the value is defined using one or more arguments. The function `parent` creates a panel in a specified parent container. The syntax for parent container properties is `panel=uipanel(parent,Name,value);`.

The below codes shows the creation of a figure containing two panels and a button. The main panel is labelled 'panel 1', the sub-panel is labelled 'panel 2', and the button is labelled 'Start'.
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
![Panel container](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_b.jpg)

### Tab group containers
A tab group container is created using the function `uitabgroup()`; it allows identification and navigation through different tabs.

Tab group container properties are addea using the syntax `uitabgroup(Name,value)`. Syntax for specifying parent container is `uitabgroup(Parent,Name,value)`.

For demonstrations, we will create tab group with two tabs, the first tab will have a title 'Tools' while the second tab will have a title 'View'.
```matlab
fig = figure;
tab_group = uitabgroup(fig,'Position',[.07 .05 .3 .8]); % tab group position in the main container
tab1 = uitab(tab_group,'Title','Tools'); % first tab properties
tab2=uitab(tab_group,'Title','View'); %second tab properties
```
![Tab group containing two tabs](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_c.jpg)

Tab group can also contain other components for option selection and control inputs.components like drop down buttons is added usin function `uidropdown();` while checkbox is added using the function `uicheckbox();`.

The below codes shows how to design tab group containers contaning components with speciied properties. The main ta will have a title 'Member gender', drop down button will contain two opyions that is 'male' and 'female' while the button will be labeled 'Enter'.
```matlab
fig = uifigure; % main container
tab_group = uitabgroup(fig,'Position',[50 50 196 145]); % tab group properties
t = uitab(tab_group,'Title','Member gender'); % main tab properties
drop_down = uidropdown(t,'Position',[11 90 140 22],'Items',{'Male','Female'}); % drop down button properties
cb = uicheckbox(t,'Position',[11 65 140 22],'Text','Member'); %check box properties
b = uibutton(t,'Position',[11 40 140 22],'Text','Enter'); % button properties
```
![Tab containing components](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_d.jpg)

### Components
Components in Apps enable the user to.

- Navigate through the app.
- Feed the app with information.
- Share information with the user.

We will discuss how the creation of the following app component:

- Buttons.
- Checkbox.
- Drop down.

### Button
Buttons are created using the function `uibutton();`. Buttons may have messages or icons.

A simple button layout can be formed using the below codes.
```Matlab
f = uifigure % main figure
b = uibutton(f); 
```
![Simple button](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_e.jpg)

Button properties are added using the syntax `uibutton(fig,'properties');`. Such properties include position and the message content of the button.

For example we will design a state button displaying the massage 'Reset' at a position [100,50,30,100]. The below codes are used.
```matlab
f=uifigure % Main container
btn = uibutton(f,'state','Text','Reset','Value',true,'Position',[60,110,110,25]); % button properties
```
![State button](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_f.jpg)

The main types of buttons are radio and toggle buttons. Radio buttons are created using the function `uiradiobutton()` while toggle buttons are created using the function `uitogglebutton();`.

### Check box
Checkboxes allow the user to select or deselect items in the app. The selected items are marked with a tick or a dash.

In Matlab, a check box is created using the function `uicheckbox()`. Properties like the name and position of the check box can be added using the syntax `uicheckbox('Name', 'value');`.

The below codes demonstrate the creation of a check box. When the box is clicked, it is automatically marked using a tick sign.
```Matlab
f = uifigure; % main container
check_box = uicheckbox(f); % checkbox function
```
![Unmarked check box](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_g.jpg)

![Marked check box](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_h.jpg)

### Drop down
Dropdown offers the user with list o options of a particular app function. It is normally indicated with an icon of an arrow pointing downwards or an inverted triangle.

The function `uidropdown();` is used to create drop down. Visible properties of drop down is added using the syntax `uidropdown(figure,'value');`.

For demonstration, we will create a drop down options specified as ' Road, Air,Pipeline, Water and Railway'. The below codes shows this process.
```matlab
f = uifigure;% main container
drop_down = uidropdown(f,'Items',{'Road','Air','Water','Pipeline','Railway'},'Value','Road'); % drop down properties
```
![Drop down items](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_i.jpg)

### Dialog and notifications
Dialog and communication elements enable the app to communicate with the user. These communications include warnings, alerts, progress of certain activity, or instructions.

Dialog and notification elements are normally accompanied by certain signs inform of icons.

We are going to discuss the layout design of the following dialog and notification elements:

- Alert dialog box.
- Confirmation dialog box.
### Alert dialog box
Alert dialog boxes are used to notify the app user with information that demands the user's attention. The pieces of information contained are the main reasons the app can not execute certain instructions.

An alert dialog box is created using the function `uialert()`. The below codes shows the design of the alert dialog box layout with a massage 'Unsupported format'.
```Matlab
f = uifigure; % main container
uialert(f,'Unsupported format','invalid file'); % alert box  messages
```
![Alert dialog box](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_j.jpg)

You can use the alert dialog box to convey warning information like potential hazardous occurrences.

the below codes shows how to use alert dialog box for warning informations.
```matlab
fig = uifigure; % main container
message = {'Too loud!','Consider reducing the volume.'}; % message to display
uialert(fig,message,'Warning',...
'Icon','warning'); % alert box properties
```
![Warning dialog box](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_k.jpg)

### Confirmation dialog box
They are created using the function `uiconfirm`. The confirmation dialog box enables the user to input instructions on how the app can handle certain activities.

A confirmation dialog box can have one or more options available for selection.

We will create a confirmation box with the title 'Quit' and a message 'Do you want to save this file.'. The available options will be 'save, do not save, and cancel'.'. The below codes shows this process.
```Matlab
fig = uifigure; %main container
msg = 'Do you want to save this file.'; % confirmation dialog box massage 
title ='Quit'; % box title
selections= uiconfirm(fig,msg,title, ...
           'Options',{'save','do not save','Cancel'}, ...
           'DefaultOption',2,'CancelOption',3); % options available for selection
```
![Confirmation dialog box](/engineering-education/app-layout-design-prorammatically-using-matlab/applayout_l.jpg)

### Conclusion
App layout design is used in making apps or designing websites. In addition, apps are useful in communications, data storage, or entertainment. As demonstrated in the article, Matlab provides an interactive environment for designing app layout via coding using Matlab functions.
