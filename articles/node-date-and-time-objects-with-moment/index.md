---
layout: engineering-education
status: publish
published: true
url: /engineering-education/node-date-and-time-objects-with-moment/
title: Working with Moment.js date libraries
description: This article covers the NPM registry, open-source packages, and code security using npm6. NPM provides vulnerability-scanning tools that are built-in your Node.js workflow.
author: joseph-chege
date: 2020-09-21T00:00:00-13:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/node-date-and-time-objects-with-moment/hero.png
    alt: Moment date library
---
Date is one of the crucial development functions that developers come across in their development workflow. To achieve this with ease you need great tools such as moment. Moment is that tool every JavaScript developer want to use to achieve date and time object with simplicity.
<!--more-->
### What is moment?
[Moment](https://www.npmjs.com/package/moment) is a stand-alone open-source JavaScript framework wrapper for date objects that eliminates native JavaScript date objects, which are cumbersome to use. Moment makes dates and time easy to display, format, parse, validate, and manipulate using a clean and concise API. It comes with a bunch of plugins with useful features such as short date formatter, fiscal quarters, timers, twitter dates, ISO calendars, Google calendar API, date ranges, time zones support, date calculations, multi-languages support, localized time, date manipulation functionalities, and many other special date utilities.

### Getting started
[Moment](https://momentjs.com/) is a free to use tool that helps you tackle date and time problems. To [use Moment](https://momentjs.com/docs/#/use-it/) with Node.js, install the module using the command `npm install moment`. Then simply use `require ()` in your application as in the following example:

```js
var moment = require(moment);
```

Moment also run on browsers. It creates a global moment object, which is used to access date with `<script>` tag.
Moment has gained good reputation for being able to deliver its objective. In this article we shall look at:

-   date formatting
-   date parsing
-   date manupulation
-   date validation
-   displaying date
-   time zones
-   date international languages support

#### Date parsing
[Date parsing](https://momentjs.com/docs/#/parsing/) means converting some date and time information into a moment object, which lets you use the moment framework. Moment creates a wrapper for date object. This wrapper will then be called with a `moment(supported inputs)`.

**Example**

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/mparsing?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### Formatting dates
[Formats](https://momentjs.com/docs/#/displaying/format/) are the display options that replaces the corresponding moment default values. Formats helps to display human readable dates. Some commonly used moment formats includes:

```js
moment().format(); //2020-08-14T08:03:20-10:43
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Saturday, August 8th 2020, 10:43:21 am"
moment().format("ddd, hA"); // "Sat, 10AM"
moment().format("[Today is] dddd"); // "Today is Saturday"
```

Moment [unicode patterns](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) \ represent date tokens. Common Moment token format representations are:

**Month**
- M - 1, 2, 3, 4 …10, 11 and 12
- Mo - 1st, 2nd, 3rd, 4th, …10th, 11th, 13th and 12th
- MM - 01, 02, 03, 04 …10, 11 and 12
- MMM – Jan, Feb, Mar, Apr...Oct, Nov and Dec
- MMMM – January, February, March, April...October, November and December

**Day of month**
- D – 1, 2, 3, 4...28, 29, 30 and 31
- Do - 1st, 2nd, 3rd, 4th...29th, 30th and 31st
- DD - 01, 02, 03, 04...28, 29, 30 and 31

**Day of year**
- DD – 1, 2, 3, 4... 362, 363, 364 and 365
- DDDo - 1st, 2nd, 3rd, 4th…362nd, 363rd, 364th and 365th
- DDDD – 001, 002, 003, 004...362, 363, 364 and 365

**Day of week**
- d – 01, 02, 04, 04, 0 06 07
- do - 0st ,1st, 2nd, 3rd, 4th, 5th, 6th and 7th
- dd – Su, Mo, Tu, We, Th, Fr, and Sa
- ddd – Sun, ,Mon, Tue, Wed, Thu, Fri and Sat
- dddd – Sunday, Monday, Tuesday, Wednesday, Thursday, Friday and Saturday

**Year**
- YY - …17, 18, 19, 20, 21, 22 and 23...
- YYYY- …2017, 2018, 2019, 2020, 2021, 2022 and 2023....

**Hour**
- H – 0, 1, 2, 3, 4 … 19, 20, 21, 22 and 23
- HH – 00, 01, 02, 03, 04... 19, 20, 21, 22 and 23
- h – 1, 2, 3, 4 … 19, 20, 21, 22 and 23
- hh – 01, 02, 03, 04... 19, 20, 21, 22 and 23

**Minute**
- M - 0, 1, 2, 4... 54, 55, 55, 57, 58 and 59
- Mm - 00, 01, 02, 04... 54, 55, 56, 57, 58 and 59

**Second**
- s – 0, 1, 2, 3, 4 … 54, 55, 56, 57, 58 and 59
- ss – 00, 01, 02, 03, 04... 54, 55, 55, 56, 57, 58 and 59

#### Displaying formatted dates
Moment helps display [date with specified formats](https://momentjs.com/docs/#/displaying/). `moment()` returns a date and `format()` converts the date string tokens and replaces them with specified format values, which are readable.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-format?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Moment helps you format dates that exist between two dates such as:

[**Time from now**](https://momentjs.com/docs/#/displaying/fromnow/)

Commonly known as time age. `fromnow()` handles relative dates and display date with the suffix "ago". This will display the time that has elapsed since the beginning of the date parsed.

```js
const moment = require('moment');
//moment('2020.01.01', 'YYYY.MM.DD').fromNow();
const timeago = moment([2020, 9, 10]).fromNow();
console.log(timeago);
```

To eliminate the suffix parse a Boolean value `true` to the `fromNow()` function.

```js
const moment = require('moment');
//moment('2020.01.01', 'YYYY.MM.DD').fromNow();
const timeago = moment([2020, 9, 10]).fromNow(true);
console.log(timeago+
" years from now")  ;
```

[**Time from x**](https://momentjs.com/docs/#/displaying/from/)

Compares two dates other than now with the parameters of actual moments.

```js
const moment = require('moment');
var a = moment([2020, 4, 12]);
var b = moment([2020, 8, 13]);
const timex =  a.from(b)
console.log(timex)
```

[**Time to now**](https://momentjs.com/docs/#/displaying/tonow/)

Similar to `fromNow()`, but `toNow()` gives you the opposite intervals with the current time.

```js
const moment = require('moment');
const timetonow = moment([2020, 0, 29]).toNow();
const timetonow1= moment([2020, 0, 29]).toNow(true);// remove prefix "in"
console.log(timetonow,timetonow1)
```

[**Time to x**](https://momentjs.com/docs/#/displaying/to/)

Displays dates other than now.

```js
const moment = require('moment');
 const m1 = moment([2020, 4, 12]);
 const m2 = moment([2020, 8, 13]);
 const timex = m1.to(m2)
 console.log(timex)
```

#### Date manipulating
Another special aspect of moment is that it allows you to [manipulate dates](https://momentjs.com/docs/#/manipulating/) the way you want them to be displayed. You can add and subtract dates between years, months, days, time, seconds using `add ()` and `subtract()` methods. The following examples show how years, days, and weeks can be added or subtracted to and from the current date.

[**Addition**](https://momentjs.com/docs/#/manipulating/add/)

To add time with moment object, parse the time you want to add as the key and the amounts you want to add (years, months, weeks or days).

```js
moment().add(Number, String);
moment().add(Duration);
moment().add(Object);

moment().add(7, 'years');
moment().add(7, 'months');
moment().add(7, 'days');
```

Moment supports abbreviations such as years(y), months(M), weeks(w), days(d), minutes(M), etc.

```js
moment().add(7, 'y');
moment().add(7, 'M');
moment().add(7, 'd');
```

**Example**

```js
 const moment = require('moment');
 //add 7 days from now
 const add = moment().add(7, 'days');
 console.log(add)
```

This example will return moment date object; you can format the date to be more readable.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-add?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


[**Subtraction**](https://momentjs.com/docs/#/manipulating/subtract/)

This works exactly as addition only that `add()` is replaced with `subtract()` and `moment().subtract(Number, String)`.

**Example**

```js
 const moment = require('moment');
 //subtract 7 days from now
 const subtract = moment().subtract(7, 'days');
 console.log(subtract)
 ```

 This example will return moment object date; you can format the date to a human readable date

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-substract?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### Calculating date differences with moment
You can find the [differences between two dates](https://momentjs.com/docs/#/displaying/difference/) with moment. The difference is returned in milliseconds but you can format it the way you want the date-time unit to be displayed.

To find the differences between two or more dates the `diff()` method is used. This method takes date as the first argument and calculates the unit of time difference from an optimal second argument.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-difference?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


#### [Date validation]
As a developer, it is annoying to return a date and it ends up being [invalid](https://momentjs.com/docs/#/customization/invalid-date/). Moment has been simplified to solve this problem. Many applications will prompt a user to enter a date and you need to know how you will get these dates as [valid](https://momentjs.com/docs/#/parsing/is-valid/).

If you provide instructions to the user, i.e. input a specific date format such as y,m,d, there are high chances that some users will tend to ignore these instructions and they could provide dates will different formats.

As a developer, it is your job to get the [invalid date format](https://momentjs.com/docs/#/utilities/invalid/) and validate them to the required format. Moment is a tool that will help you solve such circumstances. Moment uses `isvalid()` method, which will return true if the date is valid and false if the date is invalid.

```js
const moment = require('moment');
console.log(moment("2020-01-01", "YYYY-MM-DD").isValid());
console.log(moment("no date provided", "YYYY-MM-DD").isValid());
```

However, when dealing with partial dates, there is the possibility to run into unexpected results such as the example shown.

```js
const moment = require('moment');
console.log(moment(
    "I feel good to find section.io/engineering-education to be very resourceful on 2020 ", "YYYY-MM-DD"
    ).isValid());
```

This example will return true yet the input provided is not a valid date. This is because the string has "2020" which will be interpreted as "YYYY". To avoid this, you need to use a strict parsing mode with "true" as the third argument.

```js
const moment = require('moment');
console.log(moment(
    "I feel good to find section.io/engineering-education to be very resourceful on 2020 ",
     "YYYY-MM-DD" ,true).isValid());
```

### Detecting invalid/valid dates
Here is an example on [detecting invalid/valid dates](https://www.fwait.com/how-to-validate-date-in-javascript/)
<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-detect-invalid?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Correcting invalid dates
<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-correct-invalid?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Commonly used flags for invalid date
-   **Overflow:** used when dates have an overflow example. Using the 13th month, 32nd day, 367th day of the year, or 29th day in the month of February in a leap year is invalid and is considered as an overflow moment.
-   **invalidMonth:** applies when an invalid month is used. Example jarnuarry, farbruary and MMMMM are invalid dates.
-   **empty:** input date contains nothing i.e. `moment()`.
-   **nullput:** applies to a null moment input `moment(null);`.
-   **invalidFormat:** set when the list of formats is empty. `moment(12-07-2020,[]);`

### Moment date durations
Moment offers [duration objects](https://momentjs.com/docs/#/durations/). Durations have no defined beginning and end date, they are defined as a length of time taken in a moment. Creating a duration moment is simple, call a `moment.duration()` with the time length as the argument.

```js
var moment = require('moment');
var myduration =  moment.duration(10);
console.log(myduration);
```

By default moment, return duration in milliseconds, however you can pass your favorite unit of measurement as the second argument

```js
var moment = require('moment');
var myduration =  moment.duration(10, 'seconds');
console.log(myduration);
```

Alternatively, parse the object of values with many units of measurement

```js
//const { months } = require('moment');
var moment = require('moment');
var myduration = moment.duration({
  milliseconds:'29',
  seconds: '29',
  minutes: '29',
  hours: '29',
  days: '29',
  weeks: '29',
  months: '29',
  years: '29'
});
```

**Examples**

Eg1: [Creating a duration clone](https://momentjs.com/docs/#/durations/clone/) (mutable durations) allows you to get a snapshot of time as some points

```js
var moment = require('moment');
var duration1 = moment.duration();
var duration2 = duration1.clone();
console.log(duration1.add(1, 'second'));
console.log(duration1.asMilliseconds() !== duration2.asMilliseconds());
console.log(duration2);
```

Eg2: [Humanize](https://momentjs.com/docs/#/durations/humanize/) is used to display length of time with duration suffix. Humanize returns a string that describes a duration.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-durations?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

[Humanize](https://momentjs.com/docs/#/durations/humanize/) calculates the unit of time parsed and if the unit exceed to the next unit, the next unit will be returned.

I.e. 24 hours will return as day since one day is equivalent to 24 hours. The length of duration in a day is 24 hours. However, if you only need the specified unit to be returned a second argument (UNIT) is parse

**Example**

```js
var moment = require('moment');
console.log(moment.duration(27, "hours").asHours());
```
### Date queries
[Moment date queries](https://momentjs.com/docs/#/query/) provide comparison methods such as `isBefore()`, `isAfter()`, `isSame()`, `isBetween()` and `isLeapYear()`. These methods return a Boolean value from the moments comparisons used. If a Moment is not defined, it will return the current time as the default moment.

**Examples**

Eg1: check if a moment [is before](https://momentjs.com/docs/#/query/is-before/) other moments.

```js
var moment = require('moment');
console.log(moment('2020-08-12').isBefore('2020-09-20'));
console.log(moment('2020-08-12').isBefore('2020-07-11'));
```

Eg2 check if a moment [is same to](https://momentjs.com/docs/#/query/is-same/) another moment.

```js
var moment = require('moment');
console.log(moment('2020-08-12').isSame('2020-08-12'));
console.log(moment('2020-08-12').isSame('2020-07-11'));
```
Eg3 check if a moment [is between](https://momentjs.com/docs/#/query/is-between/) other moments.

```js
var moment = require('moment');
console.log(moment('2020-08-18').isBetween('2020-08-17', '2020-08-25'));
console.log(moment('2020-08-18').isBetween('2020-08-20', '2020-08-19'));
console.log(moment('2020-08-18').isBetween('2010-08-17', undefined));
console.log(moment('2020-08-20').isBetween('2020-08-20', '2020-08-20', undefined, '(]'));
//moment(undefined) evaluates as moment() and returns the current moment
```

Moment comparisons take a second argument such as

-   Parsing year will check year
-   Parsing month will check month
-   Parsing week will check week
-   Parsing day will check day
-   Parsing hour will check hour

**Example**

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-querries?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Moment time zone
Moment supports [time zone data](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). To use [moment time zone](https://momentjscom.readthedocs.io/en/latest/moment-timezone/01-using-timezones/00-intro/) you need `moment@2.9.0` plus. To get started with moment time zone, `npm install moment-timezone`. `moment.tz` constructor is used to take all the arguments as moment constructors and take `tz` argument as time zone identifier.

Eg 1 simple moment-timezone.

```js
var moment = require('moment-timezone');
//console.log(matchZones);
console.log(moment().tz("America/Los_Angeles").format());
```
eg 2 timezone moment-timezone identifier.

```js
var moment = require('moment-timezone');
var m1 = moment.tz("2019-11-18 11:55", "Africa/Cairo");
var m2 = moment.tz("September 23rd 2020 10pm", "MMM Do YYYY hA", "Africa/Cairo");
var m3 = moment.tz(1592398714100, "Africa/Cairo");
console.log(m1.format());
console.log(m2.format());
console.log(m3.format());
//console.log (moment().tz("Africa/Cairo").format());
```

Eg3 moment-timezone with array, strings and object with no offset.

```js
var moment = require('moment-timezone');
var arr = [2020, 4, 8],
  str = "2020-08-07",
  obj = {
    year: 2020,
    month: 9,
    day: 7
  };
console.log(moment.tz(arr, "America/Anchorage").format());
console.log(moment.tz(str, "America/Anchorage").format());
console.log(moment.tz(obj, "America/Anchorage").format());

console.log(moment.tz(arr, "America/Toronto").format());
console.log(moment.tz(str, "America/Toronto").format());
console.log(moment.tz(obj, "America/Toronto").format());
```

Moment time zones are bundled with [webpacks](https://momentjscom.readthedocs.io/en/latest/moment-timezone/00-use-it/04-webpack/) to remove unwanted data and remain only with zone and date range data.

[`moment-timezone-data-webpack-plugin`](https://momentjs.com/docs/#/use-it/webpack/) helps to buddle timezone data to a minimal possible size to around 900 KBs and can be significantly reduced to between [1MB to 35KBs minified plus gzipped](https://github.com/gilmoreorless/moment-timezone-data-webpack-plugin).

```js
// webpack.config.js
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const currentYear = new Date().getFullYear();
console.log(currentYear);

module.exports = {
  plugins: [
    // To include only specific zones, use the matchZones option
    new MomentTimezoneDataPlugin({
       matchZones: /^America/,
    }),
    // To keep all zones but limit data to specific years, use the year range options
    new MomentTimezoneDataPlugin({
      startYear: currentYear - 5,
      endYear: currentYear + 5,
    }),
  ],
};
```

[*Webpack Code Source*](https://momentjscom.readthedocs.io/en/latest/moment-timezone/00-use-it/04-webpack/)

Moment has two time zones instances
1. `moment.tz(..., String)` parses date in a given timezone.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-timezone1?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

The above moments will have different UTC time because they were created in different timezones.

2. `moment().tz(String)` converts date to provided timezone.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-timezone2?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

The above moments will have the same UTC time because they were created in the same time zones (default time zone). This moment creates a `moment.utc('2020-08-10 10:50)` as a UTC object and then change its time to specified (default) time zone

### Moment.js
Moment.js offers [international language support](https://momentjs.com/docs/#/i18n/loading-into-nodejs/)
When it comes to [multiple languages support](https://momentjscom.readthedocs.io/en/latest/moment/06-i18n/00-intro/) on date objects, moment is great.

By default, `moment.locale` uses the [English language](https://momentjscom.readthedocs.io/en/latest/moment-timezone/01-using-timezones/05-default-timezone/) (United States) strings to return a moment objects with [i18n](https://momentjs.com/docs/#/i18n/).

```js
moment.locale(String);
moment.locale(String[]);
moment.locale(String, Object);
```

[*Locale Code Source*](https://momentjs.com/docs/#/i18n/changing-locale/)

However, you can use `moment.locale` and assign a key and a string value to load multiple locale and switch them or assign locale to a specific moment or even create a locale time setting with customizations.

```js
moment.locale('en-my-settings', {
    // customizations.
});
```
[*Locale Customization Code Source*](https://momentjs.com/docs/#/customization/)

**Example**

### Using French as a moment locale in Node.js

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/m-locale?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### Date-fns Modern date utility library (a light-weight date library)
[Date-fns is a modern date library](https://date-fns.org/) with a collection of functions that allows JavaScript developers to work with date values. Unlike moment, which is object oriented, date-fns is divided into many small and independent functions. Date-fns allows you to import functions, only what you need, unlike moment where you create a moment instance to run functions from it.

The big difference between date-fns and moment is mutability and size. Moment package size is huge when compared to that of date-fns. This is because moment will load the entire functions when you create a moment instance while date-fns will only load the functions that you really need.

However, when it comes to backend applications with Node.js, the package size does not matter that much, its not a big concern, you can use moment just like date-fns. But if you are using a backend browser, the package size will be very decisive. Moment size can still be optimized to [reduce its bundle size to less than 22KBs.](https://github.com/jmblog/how-to-optimize-momentjs-with-webpack) .

Moment is mutable while date-fns is immutable. Moment keeps changing its own date while date-fns always returns a new Date instance.

#### Statistical differences
-   Size
![packages bandle size](/engineering-education/node-date-and-time-objects-with-moment/size.png)
*[Image source](https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e#:~:text=One%20of%20the%20biggest%20difference,momentjs%20change%20its%20own%20state.)*

-   NPM download stats
![npm download stats](/engineering-education/node-date-and-time-objects-with-moment/npm-download-insights.png)
*[Image source](https://nodejs.libhunt.com/compare-moment-vs-date-fns)*

-   GitHub stats
![github stats](/engineering-education/node-date-and-time-objects-with-moment/github-stats.png)
*[Image source](https://www.npmtrends.com/date-fns-vs-moment)*

-   Popularity and activity
![popularity and activity](/engineering-education/node-date-and-time-objects-with-moment/popularity-and-activity.png)
*[Image source](https://www.npmtrends.com/date-fns-vs-moment)*

Object-oriented moment and Function date-fns are both awesome date libraries. The choice depends on your personal taste. They both achieve date object with ease, more than what Native JavaScript date object can offer.

### Conclusion
Moment is the most popular date library out there, It simplifies your work with great outcomes for client-side date manipulations and validations while parsing and displaying dates that are human-readable with the timezone of your choice as well as favoring your locale.

What makes moment even more popular, is its [extensive, available and useful plugins](http://momentjs.com/docs/#/plugins/) that will simplify your specific needs to deal with dates. This article is just a nutshell of how great moment libraries are. It explains only a small part of this library and gives you a taste of the moment application scope. Check [moment official docs](http://momentjs.com/docs/) for more.

### Resources
-   [Moment.js official documentaion](https://momentjs.com/docs/)
-   [Moment.js Github repository](https://github.com/moment/moment)
-   [Moment.js npm](https://www.npmjs.com/package/moment)
-   [Moment.js official website](https://momentjs.com/)
-   [Time zone database data](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
-   [ISO 8601 standards](https://en.wikipedia.org/wiki/ISO_8601)
-   [Webpack](https://webpack.js.org/)
-   [date-fns](https://date-fns.org/)
-   [i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization)
