---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-constraint-layout-in-android/
title: Getting Started with Constraint Layout in Android
description: This article goes through designing and working with user interface elements in Android using the Constraint Layout using Andriod Studio IDE.
author: eric-gacoki
date: 2021-01-25T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-constraint-layout-in-android/hero.png
    alt: Constraint Layout in Android
---
Almost every Android application requires a user interface which it holds UI elements. A `ViewGroup` is a special [view](https://developer.android.com/reference/android/view/View) that holds other views. Sub-classes or children of a `ViewGroup` are called `layouts`. 
<!--more-->
In this tutorial, we'll learn how to design and work with UI elements using `Constraint Layout version 2.0.4`.
### Prerequisites
This tutorial assumes that you:
- Have [Android Studio IDE](https://developer.android.com/studio) installed on your machine.
- Have a basic experience on how to use Android Studio (especially creating a project and navigating through the IDE).

### Getting started
First, launch Android Studio and create an `Empty Activity` project. We'll lay our focus on the `activity_main.xml` file all through this tutorial. This is where we'll declare and design the layout.

Before we move on, ensure that you have the latest stable version of constraint layout dependency in your app-level `build.gradle` file. Add the following if it is missing.

```bash
dependencies{
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
}
```

### Layout declaration
To set up a Constraint layout, paste the following code into your `XML` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/constraintLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

</androidx.constraintlayout.widget.ConstraintLayout>
```

Views and widgets are added inside the layout tag which then becomes the parent to the respective element. In the above code, the device's screen serves as the layout's parent.

### Adding a view into a Constraint layout
Views and widgets are those components that the app users see on the screen. We can drag and drop the desired element from the `palette` onto the design preview. Alternatively, we can add the respective element in the XML code.

Each element has four "circular-shaped-dots" on its edges known as `Constraint handles`. They're used to constrain/attach/align a view to a certain position on the screen. Unconstrained views float to the top of the screen hence it is important to give at least two constraints, a vertical and a horizontal one. 

In a later part of the tutorial, we'll learn about cases when we don't need to constrain a view at all. Meanwhile, a newly added view (in this case a `Button`) looks like this.

![image](/engineering-education/getting-started-with-constraint-layout-in-android/adding-view.png)

To constrain a view, hold and drag the handle to the desired point. In this case, we'll attach a button fully to the parent.

![image](/engineering-education/getting-started-with-constraint-layout-in-android/constraining-view.png)

Notice the error icon disappears.

![image](/engineering-education/getting-started-with-constraint-layout-in-android/constrained-view.png)

The zigzag (sometimes curved) lines represent alignments and they're only visible in the preview. Alternatively, we can constrain it by writing the respective `XML code`.

```xml
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="A"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintBottom_toBottomOf="parent" />
```

### Relative Constraining
In most cases, we might want to use more than one view in our layout. For better responsiveness and overall effectiveness, views are constrained with respect to each other, preferably the closest one. This helps us avoid writing boilerplate code trying to attach every view to the parent.

#### A). Vertical alignment
The code snippet below shows how a view can be constrained `vertically` relative to another view. Note that each view requires a unique `id` that identifies it from the others.

```xml
<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="A"
    android:layout_marginTop="150dp"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/a" />
```

##### Key points:

- **margin** is the distance of separation (measured in `DP`) between the view and the point of alignment. It is the closest a view can get to that point.

- **wrap_content** is a dimension property that ensures the view only occupies the width/height required. The view's size responds respectively to the view's content.

The above `XML code` has the following appearance in the preview:

![image](/engineering-education/getting-started-with-constraint-layout-in-android/vertical-constraint.png)

#### B). Horizontal alignment
Similarly, a view can be constrained `horizontally` relative to another view.

See the code below.

```xml
<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="A"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toEndOf="@+id/a"
    app:layout_constraintTop_toTopOf="parent" />
```

Preview:

![image](/engineering-education/getting-started-with-constraint-layout-in-android/horizontal-constraint.png)

#### C). Using a constraint set
In cases where we have views whose dimensions are the same, we can simplify their alignment by defining the dimension for one view then constraint the others to it so that they reflect the dimension. This is called `constraint set` alignment.

##### i). Matching width of the set
Referencing views need to set their width to `0dp`. This doesn't mean that the view won't appear, it means that it (the view and its margin) will take the width of where it is constrained `horizontally`. Also, this makes the width variable and responsive.

```xml
<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="150dp"
    android:text="A"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="@+id/a"
    app:layout_constraintStart_toStartOf="@+id/a"
    app:layout_constraintTop_toBottomOf="@+id/a" />
```

![image](/engineering-education/getting-started-with-constraint-layout-in-android/match-width.png)

##### ii). Matching height of the constraint set
Similar to the width, we can make a view occupy a height equal to the `vertical` alignment points.

```xml
<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="50dp"
    android:text="A"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="0dp"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="@+id/a"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toEndOf="@+id/a"
    app:layout_constraintTop_toTopOf="@+id/a" />
```

Preview:

!["match constraint (height)"](/engineering-education/getting-started-with-constraint-layout-in-android/match-height.png)

#### D). Baselines
A baseline is a horizontal invisible line that is centered in a view. A view can only have one baseline used to align it horizontally.

To add a baseline, right-click on the view that you want to align the baseline to that of another view. Select `show baseline`.

!["show baseline"](/engineering-education/getting-started-with-constraint-layout-in-android/select-baseline.png)

Hold and drag the baseline (the same way as a handle) to the other view's baseline.

```xml
<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="50dp"
    android:text="A"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBaseline_toBaselineOf="@+id/a"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toEndOf="@+id/a" />
```

Design preview:

![image](/engineering-education/getting-started-with-constraint-layout-in-android/baseline.png "baseline constraining")

Whenever we drag view `A`, view `B` is dragged as well.

#### E). Circular position alignment
Constraint layout has the capability of aligning views with respect to the center of another view at a given angle and radius. 

See the figure below.

![image](/engineering-education/getting-started-with-constraint-layout-in-android/circular-alignment.png)

Note that the angle is measured from the `normal` line.

The following attributes can be applied.

- `layout_constraintCircle` - the referenced view's id. Its center serves as the center for the alignment.

- `layout_constraintCircleAngle` - the angle of displacement given in degrees ranging from `0 to 360`.

- `layout_constraintCircleRadius` - distance (in `DP`) between the centers of the two views. This determines how far a referencing view is placed from the referenced one.

```xml
 <Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="A"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintCircle="@id/a"
    app:layout_constraintCircleAngle="60"
    app:layout_constraintCircleRadius="100dp"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
```

#### F). Chains
Chains are one of the coolest features of the constraint layout. They simplify the alignment of views and help them utilize the space available effectively as desired. There are four chain styles, `compressed`, `spread`, `weighted`, and `packed`.

To create a chain, select the views to be chained and right-click on any of them. Select `create chain` then choose the chain orientation, either **vertical** or **horizontal**. The first view in the chain defines the chaining style. By default, the style is set to `spread`.

The snippet below shows a horizontal chain.

```xml
<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="A"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toStartOf="@+id/b"
    app:layout_constraintHorizontal_bias="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toStartOf="@+id/c"
    app:layout_constraintHorizontal_bias="0.5"
    app:layout_constraintStart_toEndOf="@+id/a"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/c"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="C"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.5"
    app:layout_constraintStart_toEndOf="@+id/b"
    app:layout_constraintTop_toTopOf="parent" />
```

For a chain to exist between two views, there must be a 1:1 alignment ratio between them. For instance to create a **horizontal chain** between views `A` and `B`, we need to align A's **constraintEnd_toStartOf** B and B's **constraintStart_toEndOf** A. Likewise, **constraintTop** and **constraintBottom** are used to create a **vertical chain**.

Preview:

![image](/engineering-education/getting-started-with-constraint-layout-in-android/horizontal-chain.png)

We can also create a vertical chain like the one below.

!["vertical chain"](/engineering-education/getting-started-with-constraint-layout-in-android/vertical-chain.png)

Here we have combined chains and the constraint set (width matching).

The figure below shows different chain styles.

![image](/engineering-education/getting-started-with-constraint-layout-in-android/chain-styles.png)

To change the style, right-click on the chain then select a chain style.

### Helpers
Thus far we've learned different techniques of constraining views, yet where we do most of the alignment work. Constraint layout has a design features named `Helpers` that enable us to align views with less code as effectively as possible. They also make the whole design process faster and relatively maintainable.

With that said, let us go over a few different helpers.

#### A). Guideline
A guideline is an invisible helper that simplifies the layout by offering a central line of alignment especially if the views have duplicate margin values. Its position on screen can be specified in **DP** (start or end) or **percentage** regardless of its orientation. 

The latter mentioned is preferred for its responsive outcome. The constraint guide percentage is specified in a `100th` value of the actual value. For instance, `20%` is written as `0.2`.

To add a guideline in your layout, right-click on the layout then select `Guideline`. Alternatively, you can click the `Helpers icon` (picuted below) and select the respective helper.

![icon](/engineering-education/getting-started-with-constraint-layout-in-android/helpers-icon.png)

We're going to add a 20%-aligned vertical guideline and use it to constrain two buttons.

```xml
<androidx.constraintlayout.widget.Guideline
    android:id="@+id/guideline"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    app:layout_constraintGuide_percent="0.20" />

<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="80dp"
    android:text="A"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="@+id/guideline"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="@+id/guideline"
    app:layout_constraintTop_toBottomOf="@+id/a" />
```

Preview:

![image](/engineering-education/getting-started-with-constraint-layout-in-android/guideline.png)

The position can be changed by dragging the guideline. It is paramount to **note** that a guideline's alignment is **independent** of the views on either of its sides.

#### B). Barrier
As the name suggests, a barrier is an invisible helper that offers a point that views cannot go beyond. It can either be `top`, `bottom`, `left` or `right` directed. Unlike a guideline, a barrier's orientation grows as the size of the views on the opposite side of the direction grows. 

For instance, in a left-oriented barrier, the views on the right side appear captured and cannot move freely horizontally unlike the views on the left side.

```xml
<androidx.constraintlayout.widget.Barrier
    android:id="@+id/barrier"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:barrierDirection="left" />

<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="A"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="@id/barrier"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintVertical_bias="0.25" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="@id/barrier"
    app:layout_constraintTop_toTopOf="parent" />
```

Preview:

![image](/engineering-education/getting-started-with-constraint-layout-in-android/barrier.png)

#### C). Group
A group is an assembly of views. A group is a nice feature to use when you want to work with a variety of views in the same way. To create a group, we need to refer to the id's of the views we want to be members of the group.

```xml
<androidx.constraintlayout.widget.Group
    android:id="@+id/group"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:constraint_referenced_ids="a,b" />

<Button
    android:id="@+id/a"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="65dp"
    android:text="A"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="@+id/a"
    app:layout_constraintStart_toStartOf="@+id/a"
    app:layout_constraintTop_toBottomOf="@+id/a" />
```

With a group, we can change the text of the two buttons by changing the text of the group as if it were a button. This is a great technique to avoid duplicating code.

#### D). Layer
A layer allows us to **transform** several views simultaneously. It does an important task of creating a virtual layer from views. Similar to a group, we need to pass in the referenced view ids.

```xml
<androidx.constraintlayout.helper.widget.Layer
    android:id="@+id/layer"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:constraint_referenced_ids="a,b" />
```

#### E). Flow
A flow is a virtual layout that aligns views with respect to available space in different wrap modes and styles. This widget can be used in place of a chain, especially when we don't know the size of the parent at runtime. It is distinct in that it can lay views out of the parent layout or let them flow to the next line.

##### Here are some of the flow-based attributes
- `constraint_referenced_ids` - identifies members of the flow by their IDs.

- `orientation` - defines `horizontal` or `vertical` appearance.

- `gap` - this is the space between views inside the flow. It is given in `DP` either horizontally or vertically oriented.

- `style` - configures how views are placed in a given orientation. This can be `packed`, `spread` or `spread_inside`.

- `wrap mode` - configures how the flow should handle views when they overflow or wrap off its dimension.

There are **three** wrap modes that a flow can apply.

1. none - allows the views to lay outside the layout.

2. chain - aligns views in a new chain whenever they overflow. This should not be confused with the chained constraints we learned about earlier.

3. aligned - aligns views in rows and columns.

When using a flow, we don't need to attach the member views anywhere in the layout. All we need to do is constrain the flow itself then pass in the respective IDs.

A flow uses the `FCFS` (first come first served) algorithm where the order of views is determined by the order of the referenced IDs.

```xml
<Button
    android:id="@+id/a"
    android:layout_width="250dp"
    android:layout_height="wrap_content"
    android:text="A" />

<Button
    android:id="@+id/b"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="B" />

<Button
    android:id="@+id/c"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="C" />

<androidx.constraintlayout.helper.widget.Flow
    android:id="@+id/flow"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    app:constraint_referenced_ids="a,b,c"
    app:flow_horizontalGap="20dp"
    app:flow_horizontalStyle="packed"
    app:flow_wrapMode="chain"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
```

Preview:
![image](/engineering-education/getting-started-with-constraint-layout-in-android/flow.png)

### Conclusion
In this tutorial, we've learned how to design a responsive UI using constraint layout features. There might be new features in the future releases of constraint layout. Check out the [official documentation](https://developer.android.com/reference/androidx/constraintlayout/widget/ConstraintLayout) to learn more and keep yourself updated.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
