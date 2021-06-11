---
layout: engineering-education
status: publish
published: true
url: /javascript-dates-manipulation-with-date-fns/
title: Javascript Dates Manipulation with Date-fns
description: This article will cover the basic applications of date-fns, date-fns is a lightweight library that provides comprehensive functions for date formatting and manipulation.
author: joseph-chege
date: 2020-10-01T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/javascript-dates-manipulation-with-date-fns/hero.jpg
    alt: date-fns library JavaScript
---
At times during the development process, we constantly run into date objects 🕣. We need tools to assist us in handling those instances. There are two big players ([Moment.js](https://momentjs.com/) and [date-fns](https://date-fns.org/)) when it comes to JavaScript date management. This article will cover the basic applications of date-fns.
<!--more-->

### What is Date-fns?
Date-fns is a lightweight 🚀 library that provides comprehensive functions for date formatting and manipulation. It is a simple to use API with many small functions to work with. Date-fns is termed to be [Lodash](https://lodash.com/) for dates with [over 140 functions](https://date-fns.org/v2.7.0/docs/Getting-Started).

### Why Date-fns ⚡
- **Immutable and pure** - date-fns has pure built-in functions that return a new date instance rather than modifying the parsed date. This helps reduce and prevent bugs.
- **Native Date** - date-fns uses existing native JavaScript date API.
- **Modular** - you pick what you need, date-fns only imports the functions you need rather than the whole API functions pack. It works well with module bundlers such as [webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/guide/en/), and [Browserify](http://browserify.org/). It also supports the tree-shaking algorithm.
- **Fast** - date-fns is a small API that is very light, thus guaranteeing users the best experience.
- **Documentation** - date-fns has well-outlined documentation with very clear and simple instructions to follow along. It also has use-case examples (code snippets) for every date function.
- **I18n** - perhaps you want to display dates with your users' favorite locale. Date-fns has a dozen locales to work with whenever you need them.
- **Typescript and Flow** - supports both typescript and flow.

For more benefits on date-fns [check this article out](https://date-fns.org/).

### Getting Started with Date-fns
Date-fns is available in the [npm packages collection](https://www.npmjs.com/package/date-fns). If you have [Node.js installed](http://nodejs.org/), you can install date-fns using the command `npm install date-fns`.

If you are using yarn `yarn add date-fns` will get you started. Date-fns can be used with both [CommonJS Modules](https://nodejs.org/api/modules.html) and [ES modules](https://nodejs.org/api/esm.html).

In this article, we will dive into the CommonJS module with date instances such as:

- Displaying dates
- Date formatting
- Date locale
- Time zones
- Date arithmetic
- Date comparisons, and other important applications of date-fns functions

### Date Format
Date formatting is key when displaying a date. Formatting helps display human-readable dates. Date format replaces the individual date tokens to a format string. Formats specify the part of the date token you want to format and how the token will be displayed. To understand this better let's have a look at some date token representation patterns that you can choose to display as formats.

**Note:** Some of these [Unicode patterns](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) are different from other date libraries such as Moment.js.

Calendar Year
- y - 0, 1, 2, 3, 4, ..., 17, 18, 1900, 2000, 2001, 2022, 2023, ...
- yo - 0th, 1st, 2nd, 3rd, 4th, ..., 15th, 16th, 17th, 19th, 20th, ...
- yy - 00, 01, 02, 14, ..., 15, 16, 17, 19 and 20, 21, 22, ...
- yyy - 000, 001, 002, ..., 014, ..., 2017, 2018, 2019, 2020, 2021, 2022, 2023, ...
- yyyy - 0000, 0001, 0002, ..., 0014, ..., 2017, 2018, 2019, 2020, 2021, 2022, 2023, ...

Month
- M - 1, 2, 3, 4, ..., 10, 11 and 12
- Mo - 1st, 2nd, 3rd, ..., 4th, 10th, 11th, 13th and 12th
- MM - 01, 02, 03, 04 ...10, 11 and 12
- MMM – Jan, Feb, Mar, Apr, ..., Oct, Nov and Dec
- MMMM – January, February, March, April, ..., October, November and December
- MMMMM - J, F, M, A, M, J, J, A, S, O, N and D

Day of month
- d – 1, 2, 3, 4, ..., 28, 29, 30 and 31
- do - 1st, 2nd, 3rd, 4th, ..., 29th, 30th and 31st
- dd - 01, 02, 03, 04, ..., 28, 29, 30 and 31

Day of year
- D – 1, 2, 3, 4, ..., 362, 363, 364 and 365
- Do - 1st, 2nd, 3rd, 4th, ..., 362nd, 363rd, 364th and 365th
- DD – 01, 02, 03, 04, ..., 362, 363, 364 and 365
- DDD – 001, 002, 003, 004, ..., 362, 363, 364 and 365

Day of week
- E..EEE– Sun, Mon, Tue, Wed, Thu, Fri and Sat
- EEEE – Sunday, Monday, Tuesday, Wednesday, Thursday, Friday and Saturday
- EEEEE – S, M, T, W, T, F, and S
- EEEEEE – Su, Mo, Tu, We, Th, Fr and Sa

Hour (0-23)
- H – 0, 1, 2, 3, 4, ..., 19, 20, 21, 22 and 23
- Ho – 0th, 1st, 2nd, 3rd, 4th, ..., 19th, 20th, 21th, 22nd and 23rd
- HH – 00, 01, 02, 03, 04, ..., 19, 20, 21, 22 and 23

Hour (1-12)
- h – 1, 2, 3, 4, ..., 11 and 12
- ho – 1st, 2nd, 3rd, 4th, ..., 11th and 12th
- hh – 01, 02, 03, 04, ..., 11 and 12

Minute
- m - 0, 1, 2, 4, ..., 54, 55, 55, 57, 58 and 59
- mo –0th 1st, 2nd, 3rd, 4th, ..., 12th, 58th,59th
- mm - 00, 01, 02, 04, ..., 54, 55, 56, 57, 58 and 59

Second
- s – 0, 1, 2, 3, 4, ..., 54, 55, 56, 57, 58 and 59
- so –0th 1st, 2nd, 3rd, 4th, ..., 12th, 58th, 59th
- ss – 00, 01, 02, 03, 04, ..., 54, 55, 55, 56, 57, 58 and 5

[Check more Unicode date format for Date-fns](https://date-fns.org/v2.16.1/docs/Unicode-Tokens)

### Parsing and Displaying Date
As we have explained, date-fns is a collection of many small functions. Use `require('date-fn');` to get started. To start [parsing and displaying](https://date-fns.org/v2.16.1/docs/parse) dates you need to import the functions you require, thus you don't have to import the whole API (only what you need). Let's display simply today's date.

```js
//import the function you want to use
const {format} = require('date-fns');
```
```js
const {format} = require('date-fns');
//today's date
const today =format(new Date(),'dd.MM.yyyy');
console.log(today);
```

This will display the default current date with the date-fns default format. `format` displays the date token to a more human-readable and looks exactly the way you want it (return the date parsed from string using the given format string).

### Displaying Formatted Date

```js
const {format} = require('date-fns');
const date = new Date();
console.log(date);
console.log(`${format(date, 'dd.MM.yyyy')}`);
console.log(`${format(date, 'yyyy-MM-dd').toString()}`);
console.log(`today is ${format(date, 'EEEE, MMMM yyyy')}`);
console.log(`today is  ${format(date, 'EEEE,MMMM do, yyyy hh:mm a')}`);
console.log(`Today's date: ${format(date, 'MMMM, yyyy')}`);
console.log(`Today's date: ${format(date, 'MMMM.do.')}`);
console.log(`Today's date: ${format(date, 'EEEE do HH:mm ')}`);
console.log(`${format(date, 'EEEE,MMMM do, yyyy ppppp')}`);
console.log(`${format(date, 'do  MMMM yyyy OOOO')}`);
```

Alternatively, you can parse a default date value such as:

```js
const {format} = require('date-fns');
//parse a default date value
const date = new Date('2020/09/19');
console.log(date);
console.log(`${format(date, 'dd.MM.yyyy')}`);
console.log(`${format(date, 'yyyy-MM-dd').toString()}`);
console.log(`${format(date, 'EEEE, MMMM yyyy')}`);
console.log(`${format(date, 'EEEE,MMMM do, yyyy hh:mm a')}`);
console.log(`${format(date, 'MMMM, yyyy')}`);
console.log(`${format(date, 'MMMM.do.')}`);
console.log(`${format(date, 'EEEE do HH:mm ')}`);
console.log(`${format(date, 'EEEE,MMMM do, yyyy ppppp')}`);
console.log(`${format(date, 'do  MMMM yyyy OOOO')}`);
```

The examples above will display the date parsed with several date formats. [Check out more date formats](https://date-fns.org/v2.16.1/docs/format) you can play with and get more ideas of how date-fns formats works.

**Note:** we have only imported the `format` function as it is what we need, that's one of the dynamic features of date-fns. When formatting date-fns token values try to avoid some [common mistakes](https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md) such as:

```js
format(date, 'DD.MM.YYYY'); ❌
format(date, 'dd.MM.yyyy'); ✔
```

These mistakes commonly occur if the Unicode patterns do not match to the correct date-fns Unicode tokens.

### Date Arithmetic (additions, subtractions)
It is hard to do arithmetic calculations for dates. Date-fns simplifies addition and subtraction of dates between years, months, days, weeks, and seconds using simple functions such as `addDays`, `addWeeks`, `addMonths`, `subDays`, `subWesks`, `subMonths` etc.

#### Additions
Syntax: `addDays(date, amount)`

- date - The date to be changed
- amount - Amount of days to be added

Let's perform simple date [addition](https://date-fns.org/v2.16.1/docs/add). To get started, import the `add` functions, then add the unit of time to the base date. Specify the operation you want to perform as the first argument followed by the number of units to add. Include the format function to format the date returned.

Example:

```js
//import the reqqiureds  funtions
const {addMinutes,addHours,addDays,addMonths,addYears,format} = require('date-fns');
const date = new Date('2020.09.29 10:12:00');
//add days
const sum1 = addDays(date, 4);
//add months
const sum2 = addMonths(date, 3);
//add years
const sum3 = addYears(date, 3);
//add minutes
const sum4 = addMinutes(date, 40);
console.log(format(sum1, 'dd MMMM yyyy HH:mm'));
console.log(format(sum2, 'dd MMMM yyyy HH:mm'));
console.log(format(sum3, 'dd MMMM yyyy HH:mm'));
console.log(format(sum4, 'dd MMMM yyyy HH:mm'));
```

**Note:** Date units added/subtracted with positive decimals will be rounded off with `math.floor` and decimals less than zero will be rounded using `math.cell`.

#### Subtractions
Works exactly like addition, only that the `add` prefix function is replaced with a `sub`. Then [subtract](https://date-fns.org/v2.16.1/docs/sub) your specified units of time.

Syntax: `subDays(date, amount)`

Import sub function as shown in the example below. Similarly, you can choose format function to manipulate your display options.

```js
const date = new Date('2020.09.29 10:12:00');
//sub days
const a = subDays(date, 4);
//sub minutes
const b = subMinutes(date, 40);
//sub months
const c = subMonths(date, 3);
//sub years
const d = subYears(date, 2);
console.log(format(a, 'dd MMMM yyyy HH:mm'));
console.log(format(b, 'dd MMMM yyyy HH:mm'));
console.log(format(c, 'dd MMMM yyyy HH:mm'));
console.log(format(d, 'dd MMMM yyyy HH:mm'));
```

### Date Locale
Users who visits your website may come from different parts of the world. Assuming they do not speak your native language, how will you implement specifics or multiple locales to engage with those users?

Formatting dates was easy. How about locale? It cannot be that hard with date-fns, and it actually is as easy as pie. All you need is to import the locale plugin from date-fns.

Date-fns supports [I18n](https://date-fns.org/docs/I18n#supported-languages) to internationalize date functions and display localized formatted dates.

You need to use the `require('date-fns/locale');` and pass the optional locales as the argument.

I.e. `require('date-fns/locale/fr');` )('`fr` for French').
For example, let's have a simple date parsed and returned in French Locale.

```js
const date = new Date('2019/01/01');
const frenchLocale = require('date-fns/locale/fr');
const format = require('date-fns/format');
const formattedDate = format(date, 'EEEE,MMMM do, yyyy hh:mm a', {
    locale: frenchLocale
});
console.log(formattedDate);
```
**Multiple locales example:**

```js
const newYears = new Date();
const format = require('date-fns/format');
const frenchLocale = require('date-fns/locale/fr');
const russionaLocale = require('date-fns/locale/ca');
const spanishLocale = require('date-fns/locale/es');
const USLocale = require('date-fns/locale/en-US');
const eo = require('date-fns/locale/eo');
console.log( format(newYears, 'EEEE,MMMM do, yyyy hh:mm a', {
    locale: frenchLocale}));
console.log( format(newYears, 'EEEE,MMMM do, yyyy hh:mm a', {
    locale: eo}));
console.log( format(newYears, 'EEEE,MMMM do, yyyy hh:mm a', {
    locale: russionaLocale}));
console.log( format(newYears, 'EEEE,MMMM do, yyyy hh:mm a', {
    locale: spanishLocale}));
console.log( format(newYears, 'EEEE,MMMM do, yyyy hh:mm a', {
    locale: USLocale}));
```

Check official doc to have a look at [supported locale/supported-languages](https://date-fns.org/v2.16.1/docs/I18n-Contribution-Guide)

### Date Time Zones
Date-fns supports [time zone data](https://date-fns.org/v2.16.1/docs/Time-Zones) to work with UTC or ISO date strings. This will help you display the date and time in the local time of your users.

The difficulty comes when working with another time zone's local time, for example showing the local time of an event in LA at 8 pm PST on a Node.js server in Europe or a user's machine set to EST.

In this case, there are two relevant pieces of information:
- A fixed moment in time in the form of a timestamp, UTC or ISO date string, and
- The time zone descriptor, usually an offset or [IANA](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) time zone name (e.g. America/Los_Angeles)

#### Time Zone Helpers
To understand [time zone helpers](https://github.com/marnusw/date-fns-tz#time-zone-helpers), assume you have a system where you set an event to start at a specific time and your system local time should be shown when the site is accessed anywhere in the world.

- zonedTimeToUtc returns a given date equivalent to the time zone UTC (parses date in a given time zone)
- utcToZonedTime return local time from a UTC (converts date to the provided time zone)

#### Example Use Cases
Below are some [use cases](https://github.com/marnusw/date-fns-tz) for us to look at.

`npm install date-fns-tz`

zonedTimeToUtc
```js
const {format,zonedTimeToUtc,} = require("date-fns-tz");
const today = new Date(); // Wed Sep 16 2020 13:25:16
const timeZone = 'Europe/Paris'; // Let's see what time it is Down Under
const timeInBrisbane = zonedTimeToUtc(today, timeZone);
console.log(`
Default time zone: ${format(today, 'yyyy-MM-dd HH:mm:ss')}
Time in Paris: ${format(timeInBrisbane, 'yyyy-MM-dd HH:mm:ss')
}`);
```

utcToZonedTime

```js
const {format,utcToZonedTime,} = require("date-fns-tz");
const today = new Date(); // Wed Sep 16 2020 13:25:16
const timeZone = 'Europe/Paris'; // Let's see what time it is Down Under
const timeInBrisbane = utcToZonedTime(today, timeZone);
console.log(`
Default time zone: ${format(today, 'yyyy-MM-dd HH:mm:ss')}
Time in Paris: ${format(timeInBrisbane, 'yyyy-MM-dd HH:mm:ss')
}`);
```

### Date Comparisons
Date-fns provides you with comparison functions that help you determine if a given time is before, after, or within another date period. Or if the given date lies in the past or in the future of the comparing date. Some of the commonly used comparing functions include:

#### isAfter
Checks if the first [date is after](https://date-fns.org/v2.16.1/docs/isAfter) the second and returns a Boolean value true if the first date exists after the second date and if false, the arguments are not true.

Syntax: `isAfter(date, dateToCompare)`

-   Date - the date that should be after the second date (as the first argument)
-   DateToCompare - the second date to be compared with the first date. (As the second argument)

Example 1:

Import the functions you need.

```js
const { isAfter,addHours, subHours } = require('date-fns');
```
```JS
const { isAfter,addHours, subHours } = require("date-fns");
const date1 = new Date();
const date2 = addHours(new Date(), 5);
const date3 = subHours(new Date(), 5);
console.log(isAfter(date1, date2));
console.log(isAfter(date1, date3));
```

Example 2:

```JS
const { isAfter, isFuture, addHours } = require("date-fns");
const date1 = new Date();
const date2 = addHours(new Date(), 5);
console.log(`Date1 is ${isAfter(date1, date2) ? "after" : "before"} Date2`);
console.log(`Date2 is ${isFuture(date2) ? "not" : ""} in the past`);
```

#### isBefore
Checks if the first [date is before](https://date-fns.org/v2.16.1/docs/isBefore) the second  date.

```JS
const { isBefore, addHours, subHours } = require("date-fns");
const date1 = new Date();
const date2 = addHours(new Date(), 5);
const date3 = subHours(new Date(), 5);
console.log(isBefore(date1, date2));
console.log(isBefore(date1, date3));
```

#### isFuture
Checks if the given date is [in the future](https://date-fns.org/v2.16.1/docs/isFuture) in comparison to the date/time now.

**Note:** if the date we are comparing is the time right now, `isFuture` will return this as false. In such a case, date-fns will interpret the 'now' date as the present time and not a future time.

```js
const { isFuture, addHours, subHours } = require("date-fns");
const date1 = new Date();
const date2 = addHours(new Date(), 5);
const date3 = subHours(new Date(), 5);
console.log(isFuture(date1));
console.log(isFuture(date2));
console.log(isFuture(date3));
```

#### ASC and Desc
Compares a collection of dates and sort them in [ascending](https://date-fns.org/v2.16.1/docs/compareAsc) or [descending](https://date-fns.org/v2.16.1/docs/compareDesc) order.

```js
const { compareDesc, compareAsc, addMonths, subYears } = require("date-fns");
const date1 = new Date();
const date2 = new Date("2019.04.12");
const date3 = new Date("2020/10/03");
const date4 = new Date("2021,01,19");
const date5 = addMonths(new Date(), 8);
const date6 = subYears(new Date(), 2);
const arrASC = [date1, date2, date3, date4, date5, date6];
const arrDesc = [date1, date2, date3, date4, date5, date6];
console.log(arrASC.sort(compareAsc));
console.log(arrDesc.sort(compareDesc));
```

There are many comparison function options such as:

#### isWeekend
Checks if a given date [is a weekend](https://date-fns.org/v2.16.1/docs/isWeekend).

```js
const { isWeekend, addHours, subHours } = require("date-fns");
const date1 = new Date("2020,09,19");
const date2 = new Date("2020,09,18");
console.log(isWeekend(date1));
console.log(isWeekend(date2));
```

#### isDate
Checks if a given string [value is an instance of a date](https://date-fns.org/v2.16.1/docs/isDate) and returns true is the date provided is actually a date value.

```js
const { isDate} = require("date-fns");
// Will return true as the string provided is a date instance
const date1 = new Date("2020,09,19");
// Will return true as the string provided is a date instance
const date2 = new Date(2020,09,18);
// Will return true as NaN represent an invalid date to return true
const date3 = new Date(NaN);
// Will return false as the string provided is not a date instance new Date() is not included
const date4 = "2020,09,18";
// Will return true as the string 2020 is a date instance
const date5 = new Date("2020");
// Will return true as new Date() will return the current date which is a date instance
const date6 = new Date();
// Will return false as the string "not a date" is a date instance
const date7 = "not a date";

console.log(isDate(date1));
console.log(isDate(date2));
console.log(isDate(date3));
console.log(isDate(date4));
console.log(isDate(date5));
console.log(isDate(date6));
console.log(isDate(date7));
```

Check out more comparison functions and helpers such as [isPast](https://date-fns.org/v2.16.1/docs/isPast), [isEqual](https://date-fns.org/v2.16.1/docs/isEqual), [isExits](https://date-fns.org/v2.16.1/docs/isExists), [isMatch](https://date-fns.org/v2.16.1/docs/isMatch), and many more.

### Date Validation
Date-fns provides you with [date validation helpers](https://date-fns.org/v2.16.1/docs/isValid) with the [isValid() function](https://date-fns.org/v2.16.1/docs/isValid) that checks if a given date is valid.

By default, date-fns returns a Boolean variable true if the date parsed is indeed a valid date or false if the date string parsed is not a valid date.

```js
const { isValid } = require("date-fns");
const valid_date1 = isValid(new Date('2020, 09, 21'))
const valid_date2 = isValid(new Date('2020, 02, 30'))
console.log((valid_date1))
console.log((valid_date2))
```

However, in the example above, you will be surprised to find out the `new Date ('2020, 02, 30')` returns true yet the date itself is obviously invalid. There is no date with a February 30th day.

Interestingly, this is not a bug in date-fns. To elaborate this further enter a `new Date ('2020, 02, 30')` on your browser's console (in my case I am using a Google chrome console).

This date instance will be interpreted as `Sun Mar 01, 2020, 00:00:00 '2020, 02, 30'`. February ends on 29th (2020 is a leap year) and the extra day will be added to represent the date of the next month, which indeed will be valid.

To avoid such instances parse the date before checking the `isValid()`.

Lets run through another example:

```js
const {isValid,parse} = require("date-fns");

const validate1 = parse('29.02.2020', 'dd.MM.yyyy', new Date());
const validate2 = parse('30.02.2020', 'dd.MM.yyyy', new Date());

console.log(validate1);
console.log(validate2);
console.log(isValid(validate1));
console.log(isValid(validate2));
```

### Differences Between Dates
Date-fns provides several functions to manipulate and calculate the differences that exists between two given dates. These functions represent the difference between calculations for several units of time such as:

- [differenceInSeconds](https://date-fns.org/v2.16.1/docs/differenceInSeconds) (number of seconds between given dates)
- [differenceInMinutes](https://date-fns.org/v2.16.1/docs/differenceInMinutes) (number of minutes between given dates)
- [differenceInDays](https://date-fns.org/v2.16.1/docs/differenceInDays) (number of days between given dates)
- [differenceInBusinnesDays](https://date-fns.org/v2.16.1/docs/differenceInBusinessDays) (number of business days period between two given dates)
- [differenceInWeeks](https://date-fns.org/v2.16.1/docs/differenceInWeeks) (number of weeks between given dates)
- [differenceInYears](https://date-fns.org/v2.16.1/docs/differenceInYears) (number of years between given dates)

Each unit will get the number of the given unit differences between two dates.

For example:

Calculating the difference of days and the number of business days that exists between now and Christmas.

```js
const {differenceInDays ,differenceInBusinessDays} = require("date-fns");
const startDate = new Date();
const endDate = new Date("2020,12,25");
const daysBetween = differenceInDays(endDate, startDate);
const workdaysBetween = differenceInBusinessDays(endDate, startDate);
console.log(daysBetween);
console.log(workdaysBetween);
```

### Date-fns Intervals
Date-fns provides you with interval helpers to combine two dates and determine the time interval between them. An interval object has two properties:
- Start - the start of the interval
- End - the end of the interval

This interval helper includes
- [areIntervalsOverlapping](https://date-fns.org/v2.16.1/docs/areIntervalsOverlapping) - checks if the given time interval overlaps another time interval
- [eachDayOfInterval](https://date-fns.org/v2.16.1/docs/eachDayOfInterval) - gives an array of dates that exist within a specified interval
- [eachHourOfInterval](https://date-fns.org/v2.16.1/docs/eachHourOfInterval) - gives an array of hours that exist within a specified interval
- [eachMonthOfInterval](https://date-fns.org/v2.16.1/docs/eachMonthOfInterval) - gives an array of months that exist within a specified interval
- [eachWeekOfInterval](https://date-fns.org/v2.16.1/docs/eachWeekOfInterval) - gives an array of weeks that exist within a specified interval
- [eachYearOfInterval](https://date-fns.org/v2.16.1/docs/eachYearOfInterval) - gives an array of years that exist within a specified interval
- [isWithiIterval](https://date-fns.org/v2.16.1/docs/isWithinInterval) - determines if a given date is within a specified interval

Head to the [date-fns docs to check out more interval helpers](https://date-fns.org/v2.16.1/docs/Interval) and how you can apply them to your application.

### Comparison Between Moment.js and Date-fns 🎁
Moment.js is a stand-alone open-source JavaScript framework wrapper for date objects. It eliminates native JavaScript date objects, which are cumbersome to use. Moment.js makes dates and time easy to display, format, parse, validate, and manipulate using a clean and concise API. Unlike date-fns, its biggest downside is that its API size is huge. For more information on Moment.js, check out [this article](/nodejs-date-and-time-objects-with-moment/).

As we have seen in the examples above, date-fns is a collection of many small and independent functions allowing you to only import functions that are needed. Unlike Moment.js where you create a moment instance to run functions from it. With Moment.js, there isn't a way to import a specified function. That means you have to import the whole API chain even when loading a simple date thus creating performance overheads.

Example:
```js
const moment = require('moment');
const today = moment();
console.log(today.format('YYYY MM DD'));
```

Date-fns only grabs the specific function and this makes is a much smaller library than Moment.js.

```js
const {format} = require('date-fns');
const today =format(new Date(),'dd.MM.yyyy');
console.log(today);
```

`moment@2.28.0`
![moment](/engineering-education/javascript-dates-manipulation-with-date-fns/moment.png)

[Source: bundlephobia](https://bundlephobia.com/)

`date-fns@2.16.1`
![date-fns](/engineering-education/javascript-dates-manipulation-with-date-fns/date-fns.png)

[Source: bundlephobia](https://bundlephobia.com/)

Even so, if you love working with Moment.js, its size should not be a big concern. You can [configure Moment.js with webpack](https://stackoverflow.com/a/25426019/1775026) to remove data that you aren't using, such as locale plugins, and this will significantly reduce Moment.js bundle size.

Moment.js fits well when working with a big project because you will end up using much of Moment.js functionalities therefore the bundle size won't matter. If you just want to load simple dates that need one or two methods then date-fns will definitely work in your favor.

If you are dealing with time zones, I would suggest you check out Moment.js. Its [time zone functionalities](https://momentjs.com/timezone/docs/) are extensive compared to those of date-fns. Moment.js has more [locale support functionalities](https://momentjs.com/docs/#/i18n/) to extend a more global reach with your date instances.

#### Statistical Comparison
- NPM download stats
![npm-download-insights](/engineering-education/javascript-dates-manipulation-with-date-fns/npm-download-insights.png)

[Source: nodejs libhunt](https://nodejs.libhunt.com/compare-moment-vs-date-fns).

- GitHub stats
![github-stats.png](/engineering-education/javascript-dates-manipulation-with-date-fns/github-stats.png)

[Source: npmtrends](https://www.npmtrends.com/date-fns-vs-moment)

- Popularity and activity popularity and activity
![popularity-and-activity](/engineering-education/javascript-dates-manipulation-with-date-fns/popularity-and-activity.png)

[Source: npmtrends](https://www.npmtrends.com/date-fns-vs-moment)

### Date Manipulating Framework Alternatives
#### Day.js
⏰ [Day.js](https://github.com/iamkun/dayjs) is a 2KBs immutable date library alternative to Moment.js with the same modern API.
- 🕒 Familiar Moment.js API & patterns
- 💪 Immutable
- 🔥 Chainable
- 🌐 I18n support
- 📦 2kb mini library
- 👫 All browsers supported

[Source: iamkun](https://github.com/iamkun/dayjs)

#### Luxon
[Luxon](https://github.com/moment/luxon) is a library that makes it easier to work with dates and times in JavaScript. If you wanted to have, add and subtract them, format and parse them, ask them hard questions, and so on, Luxon provides a much easier and comprehensive interface than the native types with features such as:
- DateTime, duration, and interval types
- Immutable, chainable, unambiguous API
- Parsing and formatting for common and custom formats
- Native time zone and Intl support (no locale or tz files)

[Source: moment/luxon](https://github.com/moment/luxon)

#### Fecha
[Fecha](https://github.com/taylorhakes/fecha) is a lightweight date formatting and parsing (~2KB). Meant to replace the parsing and formatting functionality of Moment.js.
- Size (Min. and Gzipped) 2.1KBs
- Date parsing
- Date formatting
- Date manipulation

[Source: taylorhakes](https://github.com/taylorhakes/fecha)

#### Timeago.js
🕗 ⌛ [Timeago.js](https://github.com/hustcc/timeago.js) is a nano library(less than 2 kb) used to format datetime with time ago statement. **eg: '3 hours ago'**.
- I18n supported
- Time ago and time in supported
- Real-time render supported
- Node.js and browser supported
- Well tested

[Source: hustcc](https://github.com/hustcc/timeago.js)

#### Easytimer.js
Easy to use Timer/Chronometer/Countdown library compatible with AMD, ES6, and Typescript. [Easytimer.js](https://github.com/albert-gonzalez/easytimer.js) is a simple library for counting time in five different units: a tenth of seconds, seconds, minutes, hours, and days. It has interesting features:
- The refresh interval can be configured in a tenth of seconds, seconds, minutes, and hours.
- Dispatches events when the timer starts, stops, pauses and when every type of unit changes.
- A custom callback can be defined and it will be executed with every timer refresh.
- Two timer modes: Regular and Countdown.
- Configurable start and target values.

[Source: albert-gonzalez](https://github.com/albert-gonzalez/easytimer.js)

### Conclusion
Date-fns is a great library that you should put on your checklist if you have a project that needs some date manipulations. It has good support and is well maintained. This article is meant to introduce you to some of the common functions and give you a taste of this library's scope. What libraries like Moment.js and date-fns do, can still be achieved with native JavaScript. However, they make working with date objects fun, easier, and with improved code readability.

### Resources
-  [Date-fns official website](https://date-fns.org/)
-  [Date-fns GitHub repository](https://github.com/date-fns/date-fns.git)
-  [Date-fns npm](https://npmjs.org/package/date-fns)
-  [Date-fns getting started docs](https://date-fns.org/docs/Getting-Started)
-  [Date-fns locale](https://date-fns.org/v2.16.1/docs/I18n-Contribution-Guide)
-  [Date-fns time-zones](https://date-fns.org/v2.16.1/docs/Time-Zones)
-  [Date-fns date-fns-tz](https://github.com/marnusw/date-fns-tz)
-  [Time zone database data](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
-  [ISO 8601 standards](https://en.wikipedia.org/wiki/ISO_8601)
-  [Unicode data](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
-  [Webpack](https://webpack.js.org/)
-  [Moment.js](https://github.com/moment/moment.git)
-  [i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization)

---
Peer review contribution by: [Linus Muema](/engineering-education/authors/linus-muema/)
