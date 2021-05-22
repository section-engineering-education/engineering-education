---
layout: engineering-education
status: publish
published: true
url: /obscure-html/
title: Five Obscure but Useful HTML Tags
description: This article details five obscure  and not often used but useful HTML tags - All these will work with HTML5 - need to use JavaScript to render it later.
author: mike-white
date: 2020-08-05T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/obscure-html/hero.jpg
    alt: computer image asm example
---
If you're not familiar with [HTML](https://www.w3schools.com/html/default.asp), this article isn't going to be of much use to you. Sorry.

There are [a lot of HTML tags](https://www.w3schools.com/tags/default.asp). Sometimes I learn about one, get really excited to use it in my next project. Then I remember that I hardly ever do web projects at all. Today is the day that I finally get to use my obscure knowledge! I'll show you some of the tags which are the most interesting to me. All these will work with HTML5, and are listed in no particular order.
<!--more-->
### 1. template

The `<template>` tag contains content that the user can't see. You need to use JavaScript to render it later. A template can be rendered many times, at any time, and be placed anywhere on the page.

```html
<button onclick="showContent()">Show Me Some Stuff!</button>

<template>
    <p>Hey look! It's stuff!</p>
    <img src="stuff.jpg">
</template>

<script>
function showContent() {
    var temp = document.getElementsByTagName("template")[0]; // gets the first template in the page
    var clon = temp.content.cloneNode(true); // a clone of the template
    document.body.appendChild(clon); // adds the template to the bottom of the page
}
</script>
```

#### Uses:

* If you need to render the same content many times, but don't want to type it out, you can write some JS code to do it for you
* If you need to repeat content but change just a little bit, you can change it before inserting it into the page as well

### 2. details

By default, content within the `<details>` tags are hidden, but can be shown by clicking on it. Each element should display a summary of what it's about when it's hidden. Using it looks something like this:

```html
<details>
	<summary>Click me to learn about Malaria!</summary>
	Ok, so here's some more information. Malaria, while being extremely common in some areas, is very easy to prevent. Malaria is mainly spread by mosquitos, which can be kept at bay using mosquito nets. It costs about $2 to buy a net. Donate a couple hundred of those, and you will have easily have saved a life.
</details>
```

![A details section before being expanded](/engineering-education/obscure-html/details1.png)<br>
![A details section after being expanded](/engineering-education/obscure-html/details2.png)<br>
#### Uses:

* This could be used for an FAQ in a fairly obvious way
* Samsung uses something similar on [their website](https://www.samsung.com/us/shop/all-deals/) for footnotes

### 3. wbr

The `<wbr>` tag can be used to show a possible word break. Sometimes you have a word that's so long that the web browser automatically breaks it up. Using the `<wbr>` tag gives the browser a specific place to break up a word if it's necessary.

```html
anti<wbr>dise<wbr>stablishmen<wbr>taria<wbr>nism
```

#### Uses
* The Hugo theme I use automatically splits up the words in reasonable places for me. Although, I should say that it isn't using the `<wbr>` tag.  My guess is that it's [using CSS](https://css-tricks.com/almanac/properties/w/word-break/) instead. Not all browsers support this feature. You can use it for compatibility with ***checks notes*** [Google Chrome](https://caniuse.com/#feat=css-hyphens).
* If you have a word that is very very long, like [Lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokich](https://en.wikipedia.org/wiki/Lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon)<br>[lepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon](https://en.wikipedia.org/wiki/Lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon) or [this one](https://en.wiktionary.org/wiki/Appendix:List_of_protologisms/Long_words/Titin#Noun), you may want this.

### 4. abbr
The `<abbr>` tag is used to define an abbreviation. When the text is hovered over, it will show the full title.

```html
To do this, we need <abbr title="HyperText Markup Language">HTML</abbr> content.
```

Yes, we could do the same thing with a regular `<span>`.

```html
To do this, we need <span title="HyperText Markup Language">HTML</span> content.
```

But using `<abbr>` can help the visually impaired, who need text-to-speech software. The text-to-speech tool is more easily able to tell that it's an abbreviation this way.

### 5. time
The `<time>` tag tells the browser that the text refers to a time.

```html
The meeting is on <time datetime="2020-07-17 19:00:00">Friday at 7pm</time>.
```

You don't always need the `datetime` attribute. If you're just showing a time, for example, then you can use `<time>` without the `datetime`, like so.

```html
The meeting is at <time>19:00</time>.
```

#### Uses
* On some browsers (mainly on mobile devices) there will be a link to add the time to the calendar.

### Conclusion
There's a [CodePen](https://codepen.io/botahamec/details/WNrgEbV) with all the examples featured in this article. If you want to look at more HTML tags to play around with, the [W3 HTML Reference](https://www.w3schools.com/tags/ref_byfunc.asp) is always a good read.
