---
layout: engineering-education
status: publish
published: true
url: /nodejs-date-and-time-objects-with-moment/
title: Working with Moment.js Date Libraries
description: Date and time Objects are those development difficulties that we jump into at some point when developing Node.js/JavaScript applications. This article discusses how to handle these objects with Moment.js library.
author: joseph-chege
date: 2020-09-23T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nodejs-date-and-time-objects-with-moment/hero.png
    alt: Moment date library
---
Date is a crucial development function that developers come across in their development workflow. To achieve this with ease you need great tools such as Moment.js. Moment.js is the tool every JavaScript developer wants to use to achieve date and time object with simplicity.
<!--more-->
### What is Moment.js?
[Moment.js](https://www.npmjs.com/package/moment) is a stand-alone open-source JavaScript framework wrapper for date objects that eliminates native JavaScript date objects, which are cumbersome to use. Moment.js makes dates and time easy to display, format, parse, validate, and manipulate using a clean and concise API. It comes with many plugins with useful features such as a short date formatter, fiscal quarters, timers, twitter dates, ISO calendars, Google Calendar API, date ranges, time zones support, date calculations, multi-languages support, localized time, date manipulation functionalities, and many other special date utilities.

### Getting Started
[Moment.js](https://momentjs.com/) is a free tool that helps you tackle date and time problems. To [use Moment.js](https://momentjs.com/docs/#/use-it/) with Node.js, install the module using the command `npm install moment`. Then simply use `require ()` in your application as in the following example:

```js
const moment = require('moment');
```

Moment.js also runs on browsers. It creates a global moment object, which is used to access date with `<script>` tag.
Moment.js has gained a good reputation for being able to deliver its objective. In this article we shall look at:

-   date formatting
-   date parsing
-   date manipulation
-   date validation
-   displaying date
-   time zones
-   date international languages support

#### Date Parsing
[Date parsing](https://momentjs.com/docs/#/parsing/) means converting some date and time information into a moment object, which lets you use the Moment.js framework. Moment.js creates a wrapper for a date object. This wrapper will then be called with `moment(supported inputs)`.

**Example**

```js
const moment = require('moment');
// current date and time
const m = moment();
//default moment date and time timezone(local mode)
console.log(m);
//using a format
console.log(m.format());
console.log(m.format('dddd, MMMM Do YYYY, h:mm:ss a'));
//UTC date and time mode
console.log(m.utc());
console.log(m.utc().format());
```

#### Formatting Dates
[Formats](https://momentjs.com/docs/#/displaying/format/) are the display options that replace the corresponding moment default values. Formats helps to display human readable dates. Some commonly used moment formats includes:

```js
moment().format(); //2020-08-14T08:03:20-10:43
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Saturday, August 8th 2020, 10:43:21 am"
moment().format("ddd, hA"); // "Sat, 10AM"
moment().format("[Today is] dddd"); // "Today is Saturday"
```

Moment.js [unicode patterns](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) represent date tokens. The common Moment.js token format representations are:

**Month**
- M - 1, 2, 3, 4 ...10, 11 and 12
- Mo - 1st, 2nd, 3rd, 4th ...10th, 11th, 13th and 12th
- MM - 01, 02, 03, 04 ...10, 11 and 12
- MMM – Jan, Feb, Mar, Apr ...Oct, Nov and Dec
- MMMM – January, February, March, April ...October, November and December

**Day of month**
- D – 1, 2, 3, 4 ...28, 29, 30 and 31
- Do - 1st, 2nd, 3rd, 4th ...29th, 30th and 31st
- DD - 01, 02, 03, 04 ...28, 29, 30 and 31

**Day of year**
- DDD – 1, 2, 3, 4 ...362, 363, 364 and 365
- DDDo - 1st, 2nd, 3rd, 4th ...362nd, 363rd, 364th and 365th
- DDDD – 001, 002, 003, 004 ...362, 363, 364 and 365

**Day of week**
- d – 0, 1, 2, 3, 4, 5 and 6
- do - 0st, 1st, 2nd, 3rd, 4th, 5th and 6th
- dd – Su, Mo, Tu, We, Th, Fr, and Sa
- ddd – Sun, Mon, Tue, Wed, Thu, Fri and Sat
- dddd – Sunday, Monday, Tuesday, Wednesday, Thursday, Friday and Saturday

**Year**
- YY - ...17, 18, 19, 20, 21, 22 and 23...
- YYYY- ...2017, 2018, 2019, 2020, 2021, 2022 and 2023....

**Hour(23 hrs)**
- H – 0, 1, 2, 3, 4 ...19, 20, 21, 22 and 23
- HH – 00, 01, 02, 03, 04 ...19, 20, 21, 22 and 23

**Hour (12 hrs)**
- h – 1, 2, 3, 4 ...10, 11 and 12
- hh – 01, 02, 03, 04 ...10, 11 and 12

**Minute**
- m - 0, 1, 2, 4 ...54, 55, 55, 57, 58 and 59
- mm - 00, 01, 02, 04 ...54, 55, 56, 57, 58 and 59

**Second**
- s – 0, 1, 2, 3, 4 ...54, 55, 56, 57, 58 and 59
- ss – 00, 01, 02, 03, 04 ...54, 55, 55, 56, 57, 58 and 59

#### Displaying Formatted Dates
Moment.js helps display [date with specified formats](https://momentjs.com/docs/#/displaying/). `moment()` returns a date and `format()` converts the date string tokens and replaces them with specified format values, which are readable.

```js
const moment = require('moment');
const today = moment();
console.log(today.format());
console.log(today.format("ddd, hA"));
console.log(today.format("[Today is] dddd"));
console.log(today.format('YYYY MM DD'));
console.log(today.format('DD.MM.YYYY HH:mm'));
console.log(
    "Today is " +
    today.format('dddd, MMMM Do YYYY, h:mm:ss a')
);
```

Moment.js helps you format dates that exist between two dates such as:

[**Time from now**](https://momentjs.com/docs/#/displaying/fromnow/)

Commonly known as time ago, `fromNow()` handles relative dates and displays date with the suffix "ago". This will display the time that has elapsed since the beginning of the date parsed.

```js
const moment = require('moment');
//Calculate time since September 9, 2020
const timeago = moment([2020, 08, 9]).fromNow();
console.log(timeago);
```

To eliminate the suffix, parse a Boolean value `true` to the `fromNow()` function.

```js
const moment = require('moment');
//Calculate time since September 9, 2020
const timeago = moment([2020, 08, 9]).fromNow(true);// remove suffix "ago"
console.log(timeago)  ;
```

[**Time from x**](https://momentjs.com/docs/#/displaying/from/)

Compares two dates other than now with the parameters of actual moments.

```js
const moment = require('moment');
const a = moment([2020, 4, 12]);
const b = moment([2020, 8, 13]);
const c =  a.from(b)
console.log(c)
```

[**Time to now**](https://momentjs.com/docs/#/displaying/tonow/)

Similar to `fromNow()`, but `toNow()` gives you the opposite intervals with the current time.

```js
const moment = require("moment");
const a = moment([2020, 7, 29]).toNow();
const b = moment([2020, 7, 29]).toNow(true); // remove prefix "in"
console.log(a);
console.log(b);
```

[**Time to x**](https://momentjs.com/docs/#/displaying/to/)

Displays dates other than now.

```js
const moment = require('moment');
const a = moment([2020, 4, 12]);
const b = moment([2020, 8, 13]);
const c = a.to(b)
console.log(c)
```

#### Date Manipulation
Another special aspect of Moment.js is that it allows you to [manipulate dates](https://momentjs.com/docs/#/manipulating/) the way you want them to be displayed. You can add and subtract dates between years, months, days, time, and seconds using `add ()` and `subtract()` methods. The following examples show how years, days, and weeks can be added or subtracted to and from the current date.

[**Addition**](https://momentjs.com/docs/#/manipulating/add/)

Moment.js mutates the original moment by adding time. To add time with moment object, parse the time you want to add as the key and the amounts you want to add (years, months, weeks or days).

```js
//To add time, pass the key of what time you want to add, and the amount you want to add.
moment().add(7, 'years');
moment().add(7, 'months');
moment().add(7, 'days');
```

Moment supports abbreviations such as years(y), months(M), weeks(w), days(d), minutes(m), etc.

```js
//There are some shorthand keys as well if you're into that whole brevity thing.
moment().add(7, 'y');
moment().add(7, 'M');
moment().add(7, 'd');
```

Check out more [shorthand keys](https://momentjs.com/docs/#/manipulating/add/)

**Example**

```js
 const moment = require('moment');
 //add 7 days from now
 const sum = moment().add(7, 'd');
 console.log(sum)
```

This example will return moment date object; you can format the date to be more readable.

```js
const moment = require('moment');
//add 7 days from now
const now = moment()
const add = now.add(7, 'd');
//with moment keys can be appriviated
console.log(add.format('dddd Do MMMM, YYYY'));
console.log(add.format('dddd, MMMM Do YYYY, h:mm:ss a'));
```

[**Subtraction**](https://momentjs.com/docs/#/manipulating/subtract/)

This works exactly as addition only that `add()` is replaced with `subtract()` and `moment().subtract(Number, String)`.

**Example**

```js
 const moment = require('moment');
 //subtract 7 days from now
 const subtract = moment().subtract(7, 'days');
 console.log(subtract)
 ```

 This example will return moment object date; you can format the date to a more human readable date.

```js
const moment = require('moment');
//subtract 7 days from now
const now = moment()
const subtract = now.subtract(7, 'd');
//with moment keys can be appriviated
console.log(subtract.format('dddd Do MMMM, YYYY'));
console.log(subtract.format('dddd, MMMM Do YYYY, h:mm:ss a'));
```

#### Calculating Date Differences with Moment.js
You can find the [differences between two dates](https://momentjs.com/docs/#/displaying/difference/) with Moment.js. The difference is returned in milliseconds but you can format it the way you want the date-time unit to be displayed.

To find the differences between two or more dates, the `diff()` method is used. This method takes date as the first argument and calculates the unit of time difference from an optimal second argument.

```js
const moment = require('moment');
const date1 = moment('2020-09-04');
const date2 = moment('2020-07-21');
console.log(`difference is ${date1.diff(date2)} `);
console.log(`difference is ${date1.diff(date2, 'milliseconds')} millisecond(s)`);
console.log(`difference is ${date1.diff(date2, 'minutes')} minute(s)`);
console.log(`difference is ${date1.diff(date2, 'hours')} hour(s)`);
console.log(`difference is ${date1.diff(date2, 'days')} day(s)`);
console.log(`difference is ${date1.diff(date2, 'weeks')} week(s)`);
console.log(`difference is ${date1.diff(date2, 'months')} month(s)`);
console.log(`difference is ${date1.diff(date2, 'years')} year(s)`);
```

#### Date Validation
As a developer, it is annoying to return a date that ends up being [invalid](https://momentjs.com/docs/#/customization/invalid-date/). Moment.js has been simplified to solve this problem. Many applications will prompt a user to enter a date and you need to know how you will get these dates as [valid](https://momentjs.com/docs/#/parsing/is-valid/).

If you provide instructions to the user, i.e. input a specific date format such as y,m,d, there are high chances that some users will tend to ignore these instructions and they could provide dates with different formats.

As a developer, it is your job to get the [invalid date format](https://momentjs.com/docs/#/utilities/invalid/) and validate them to the required format. Moment.js is a tool that will help you solve these circumstances. Moment.js uses `isValid()` method, which will return true if the date is valid and false if the date is invalid.

```js
const moment = require('moment');
console.log(moment("2020-01-01", "YYYY-MM-DD").isValid());
console.log(moment("no date provided", "YYYY-MM-DD").isValid());
```

However, when dealing with partial dates, there is the possibility to run into unexpected results such as the example shown.

```js
const moment = require('moment');
console.log(moment(
    "I feel good to find section.io/engineering-education to be very resourceful in 2020 ", "YYYY-MM-DD"
    ).isValid());
```

This example will return true yet the input provided is not a valid date. This is because the string has "2020" which will be interpreted as "YYYY". To avoid this, you need to use a strict parsing mode with "true" as the third argument.

```js
const moment = require('moment');
console.log(moment(
    "I feel good to find section.io/engineering-education to be very resourceful in 2020 ",
     "YYYY-MM-DD" ,true).isValid());
```

### Detecting Invalid/Valid Dates
Here is an example of [detecting invalid/valid dates](https://www.fwait.com/how-to-validate-date-in-javascript/)

```js
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>repl.it</title>
	<link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
	<div>
		<input type="text" placeholder="MM" id="month">
        <input type="text" placeholder="DD" id="date">
        <input type="text" placeholder="YYYY" id="year">
        <button>Check</button>
        <h1>Result</h1>
  </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="script.js"></script>
  </body>
</html>
```

### Correcting Invalid Dates
```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>

<h2> Input Dates </h2>
    <div id = "input1"> 14 / 1 / 2020 </div>
    <div id = "input2"> 1 / 14 / 2020 </div>

<h2> Output Dates(1 format) </h2>
    <div id = "output1" > </div>
    <div id = "output2" > </div>

<h2> Output(multiple formats) </h2>
    <div id = "output3" > </div>
    <div id = "output4" > </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```

### Commonly Used Flags for Invalid Date
-   **Overflow:** used when dates have an overflow example. Using the 13th month, 32nd day, 367th day of the year, or 29th day in the month of February in a leap year is invalid and is considered as an overflow moment.
-   **invalidMonth:** applies when an invalid month is used. Example jarnuarry, farbruary and MMMMM are invalid dates.
-   **empty:** input date contains nothing i.e. `moment()`.
-   **nullput:** applies to a null moment input `moment(null);`.
-   **invalidFormat:** set when the list of formats is empty. `moment(12-07-2020,[]);`

### Moment.js Date Durations
Moment.js offers [duration objects](https://momentjs.com/docs/#/durations/). Durations have no defined beginning and end date, they are defined as a length of time taken in a moment. Creating a duration moment is simple, call a `moment.duration()` with the time length as the argument.

```js
const moment = require('moment');
const myduration =  moment.duration(10);
console.log(myduration);
```

By default, Moment.js will return duration in milliseconds, however you can parse any unit of measurement of choice as the second argument.

```js
const moment = require('moment');
const myduration =  moment.duration(10, 'seconds');
console.log(myduration);
```

Alternatively, parse the object of values with many units of measurement.

```js
const moment = require('moment');
const myduration = moment.duration({
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

Example 1: [Creating a duration clone](https://momentjs.com/docs/#/durations/clone/) (mutable durations) allows you to get a snapshot of time as some points.

```js
const moment = require('moment');
const duration1 = moment.duration();
const duration2 = duration1.clone();
console.log(duration1.add(1, 'second'));
console.log(duration1.asMilliseconds() !== duration2.asMilliseconds());
console.log(duration2);
```

Example 2: [Humanize](https://momentjs.com/docs/#/durations/humanize/) is used to the display length of time with duration suffix. Humanize returns a string that describes a duration.

```js
const moment = require('moment');
//suffix-less(a few seconds)
console.log(moment.duration(1, "seconds").humanize());
// add second parameter "true" If you want an oriented duration i.e. in a few seconds(with suffix)
console.log(moment.duration(1, "seconds").humanize(true));
//For suffixes before now, pass in a negative number.
console.log(moment.duration(-1, "seconds").humanize(true));

console.log(moment.duration(1, "minutes").humanize());
console.log(moment.duration(1, "minutes").humanize(true));
console.log(moment.duration(-1, "minutes").humanize(true));

console.log(moment.duration(24, "hours").humanize());
console.log(moment.duration(24, "hours").humanize(true));
console.log(moment.duration(-24, "hours").humanize(true));

//Humanize output can be configured with relative time thresholds. To specify thresholds for a particular invocation of humanize, pass them as a sole argument or after suffix arg:
console.log(moment.duration(-1, 'week').humanize(true, {
  d: 7,
  w: 4
}));
console.log(moment.duration(-1, 'week').humanize({
  d: 7,
  w: 4
}));
```

[Humanize](https://momentjs.com/docs/#/durations/humanize/) calculates the unit of time parsed and if the unit exceeds the next unit, the next unit will be returned.

Note: 24 hours will return as a day since one day is equivalent to 24 hours. However, if you only need the specified unit to be returned a second argument (UNIT) is parsed.

**Example**

```js
const moment = require('moment');
console.log(moment.duration(27, "hours").asHours());
```

### Date Queries
[Moment.js date queries](https://momentjs.com/docs/#/query/) provide comparison methods such as `isBefore()`, `isAfter()`, `isSame()`, `isBetween()` and `isLeapYear()`. These methods return a Boolean value from the moments comparisons used. If a moment is not defined, it will return the current time as the default moment.

**Examples**

Example 1: check if a moment [is before](https://momentjs.com/docs/#/query/is-before/) other moments.

```js
const moment = require('moment');
console.log(moment('2020-08-12').isBefore('2020-09-20'));
console.log(moment('2020-08-12').isBefore('2020-07-11'));
```

Example 2: check if a moment [is same as](https://momentjs.com/docs/#/query/is-same/) another moment.

```js
const moment = require('moment');
console.log(moment('2020-08-12').isSame('2020-08-12'));
console.log(moment('2020-08-12').isSame('2020-07-11'));
```

Example 3: check if a moment [is between](https://momentjs.com/docs/#/query/is-between/) other moments.

```js
const moment = require('moment');
console.log(moment('2020-08-18').isBetween('2020-08-17', '2020-08-25'));
console.log(moment('2020-08-18').isBetween('2020-08-20', '2020-08-19'));
console.log(moment('2020-08-18').isBetween('2010-08-17', undefined));
console.log(moment('2020-08-20').isBetween('2020-08-20', '2020-08-20', undefined, '(]'));
//moment(undefined) evaluates as moment() and returns the current moment
```

Moment.js comparisons take a second argument such as

-   Parsing year will check year
-   Parsing month will check month
-   Parsing week will check week
-   Parsing day will check day
-   Parsing hour will check hour

**Example**

```js
const moment1 = require('moment');
const moment2 = require('moment-timezone');
//year copmarision
console.log(moment1('2020-07-29').isSame('2020-09-11', 'year'));
console.log(moment1('2019-07-29').isSame('2012-09-11', 'year'));

//month copmarision
console.log(moment1('2020-09-12').isSame('2020-09-03', 'month'));
console.log(moment1('2020-09-10').isSame('2020-08-02', 'month'));

//day copmarision
console.log(moment1('2020-08-29').isSame('2020-08-29', 'day'));
console.log(moment1('2020-07-29').isSame('2020-07-28', 'day'));

//hour copmarision
console.log(moment1('2020-08-29 12:00:00').isSame('2020-08-29 12:00:00', 'hour'));
console.log(moment1('2020-08-29 12:00:00').isSame('2020-08-29 11:00:00', 'hour'));

//utc/timezone comparision
var a = moment2.tz("2018-11-08T12:00:00", "UTC").isSame(moment2.tz("2018-11-09T10:00:00", "Australia/Sydney"), "day");
var b =  moment2.tz("2018-11-09T10:00:00", "Australia/Sydney").isSame(moment2.tz("2018-11-08T12:00:00", "UTC"), "day");
console.log(a);
console.log(b);
```

### Moment.js Time Zone
Moment.js supports [time zone data](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). To use [moment time zone](https://momentjscom.readthedocs.io/en/latest/moment-timezone/01-using-timezones/00-intro/) you need `moment@2.9.0` or higher. To get started with moment time zone, `npm install moment-timezone`. `moment.tz` constructor is used to taking all the arguments as moment constructors and take `tz` argument as time zone identifier.

Example 1: simple moment-timezone.

```js
const moment = require('moment-timezone');
//console.log current time in Los_Angeles America
console.log(moment().tz("America/Los_Angeles").format());
```
Example 2: timezone moment-timezone identifier.

```js
const moment = require('moment-timezone');
const a = moment.tz("2019-11-18 11:55", "Africa/Cairo");
const b = moment.tz("September 23rd 2020 10pm", "MMM Do YYYY hA", "Africa/Cairo");
const c = moment.tz(1592398714100, "Africa/Cairo");
//console.log current time in Cairo Africa with diffrent fromats
console.log(a.format());
console.log(b.format());
console.log(c.format());
```

Example 3: moment-timezone with array, strings and object with no offset.

```js
const moment = require('moment-timezone');
const arr = [2020, 4, 8],
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

Moment.js time zones are bundled with [webpacks](https://momentjscom.readthedocs.io/en/latest/moment-timezone/00-use-it/04-webpack/) to remove unwanted data and leaves only zone and date range data.

[`moment-timezone-data-webpack-plugin`](https://momentjs.com/docs/#/use-it/webpack/) helps bundle timezone data to a minimal possible size to around 900 KBs and can be significantly reduced to between [1MB to 35KBs minified plus gzipped](https://github.com/gilmoreorless/moment-timezone-data-webpack-plugin).

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

Moment.js has two time zones instances
1. `moment.tz(..., String)` parses date in a given timezone.

```js
const moment = require('moment-timezone');
const m1 = moment.tz("2020-08-10 10:50", "Asia/Taipei");
const m2 = moment.tz("2020-08-10 10:50", "America/Toronto");
const m3 = moment.tz("2020-08-10 10:50", "Europe/Vatican");
const m4 = moment.tz("2020-08-10 10:50", "Atlantic/Cape_Verde");

console.log(m1.format());
console.log(m2.format());
console.log(m3.format());
console.log(m4.format());

console.log(m1.utc().format());
console.log(m2.utc().format());
console.log(m3.utc().format());
console.log(m4.utc().format());
```

The above moments will have different UTC time because they were created in different timezones.

2. `moment().tz(String)` converts date to provided timezone.

```js
const moment = require('moment-timezone');
const m1 = moment.utc("2020-08-10 10:50").utc("Asia/Beirut");
const m2 = moment.utc("2020-08-10 10:50").utc("Europe/Paris");
const m3 = moment.utc("2020-08-10 10:50").utc("Pacific/Fiji");
const m4  = moment.utc("2020-08-10 10:50").utc("Indian/Reunion");

console.log(m1.format());
console.log(m2.format());
console.log(m3.format());
console.log(m4.format());

console.log(m1.utc().format());
console.log(m2.utc().format());
console.log(m3.utc().format());
console.log(m4.utc().format());
```

The above moments will have the same UTC time because they were created in the same time zones (default time zone). This moment creates a `moment.utc('2020-08-10 10:50)` as a UTC object and then changes its time to specified (default) time zone

### Moment.js Language Support
Moment.js offers [international language support](https://momentjs.com/docs/#/i18n/loading-into-nodejs/)
When it comes to [multiple languages support](https://momentjscom.readthedocs.io/en/latest/moment/06-i18n/00-intro/) on date objects, Moment.js is great.

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
```js
const moment = require('moment');
moment.locale('fr', {
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Aujourd’hui à] LT',
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem: function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // Used to determine first week of the year.
    }
});

console.log(moment(1316116057189).fromNow());
// il y a une heure

console.log(moment().format('HH:mm'));
console.log(moment().format('HH:mm:ss'));
console.log(moment().format('[Demain à] LT DD/MM/YYYY'));
console.log(moment().format('dddd [dernier à] LT dddd Do MMMM, YYYY'));
console.log(moment().format('[Aujourd’hui à] LT dddd D MMMM YYYY HH:mm'));
```

#### Date-fns Modern date utility library (a light-weight date library)
[Date-fns is a modern date library](https://date-fns.org/) with a collection of functions that allows JavaScript developers to work with date values. Unlike Moment.js, which is object oriented, date-fns is divided into many small and independent functions. Date-fns allows you to import functions, only those that you need, unlike Moment.js where you create a moment instance to run functions from it.

The big difference between date-fns and Moment.js is its mutability and size. Moment.js package size is huge when compared to that of date-fns. This is because moment will load all functions when you create a moment instance while date-fns will only load the functions that you really need.

However, when it comes to backend applications with Node.js, the package size does not matter that much, its not a big concern, you can use Moment.js just like date-fns. But if you are using a backend browser, the package size will be very important. Moment.js size can still be optimized to [reduce its bundle size to less than 22KBs.](https://github.com/jmblog/how-to-optimize-momentjs-with-webpack) .

Moment.js is mutable while date-fns is immutable; Moment.js keeps changing its own date while date-fns always returns a new Date instance.

#### Statistical Differences
- Size   
![packages bundle size](/engineering-education/nodejs-date-and-time-objects-with-moment/size.png)
<br>
*[Image source](https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e#:~:text=One%20of%20the%20biggest%20difference,momentjs%20change%20its%20own%20state.)*

-   NPM download stats
![npm download stats](/engineering-education/nodejs-date-and-time-objects-with-moment/npm-download-insights.png)
<br>
*[Image source](https://nodejs.libhunt.com/compare-moment-vs-date-fns)*

-   GitHub stats
![github stats](/engineering-education/nodejs-date-and-time-objects-with-moment/github-stats.png)
<br>
*[Image source](https://www.npmtrends.com/date-fns-vs-moment)*

-   Popularity and activity
![popularity and activity](/engineering-education/nodejs-date-and-time-objects-with-moment/popularity-and-activity.png)
<br>
*[Image source](https://www.npmtrends.com/date-fns-vs-moment)*

Object-oriented Moment.js and Function date-fns are both awesome date libraries. The choice depends on your personal taste. They both achieve date object with ease, more than what native JavaScript date object can offer.

### Conclusion
Moment.js is the most popular date library out there, it simplifies your work with great results for client-side date manipulations and validations while parsing and displaying dates that are human-readable with the timezone of your choice as well as favoring your locale.

What makes Moment.js even more popular, is its [extensive, available, and useful plugins](http://momentjs.com/docs/#/plugins/) that will simplify your specific needs to deal with dates. This article explains only a small part of this library and gives you a taste of the Moment.js application scope. Check [Moment.js official docs](http://momentjs.com/docs/) for more.

### Resources
-   [Moment.js official documentation](https://momentjs.com/docs/)
-   [Moment.js Github repository](https://github.com/moment/moment)
-   [Moment.js npm](https://www.npmjs.com/package/moment)
-   [Moment.js official website](https://momentjs.com/)
-   [Time zone database data](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
-   [ISO 8601 standards](https://en.wikipedia.org/wiki/ISO_8601)
-   [Webpack](https://webpack.js.org/)
-   [date-fns](https://date-fns.org/)
-   [i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization)

---
Peer Review Contributions by: [Mike White](/engineering-education/authors/mike-white/)
