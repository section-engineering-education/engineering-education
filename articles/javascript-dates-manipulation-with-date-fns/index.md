At times during the development process, we constantly jump into date objects 🕣  and we need tools to assist us to handle those instances. There are two big players ([MomentJS](https://momentjs.com/) and [date-fns](https://date-fns.org/)) when it comes to JavaScript date management. This article will comprehensively cover the basic applications of date-fns.

# What is date-fns?

Date-fns is a lightweight 🚀 date library that provides comprehensive functions toolset for date formatting and manipulation with a lot of simplicity. It is a simple to use API with many small functions to work with dates. Date-fns is termed to be [Lodash](https://lodash.com/) for dates with [over 140 fuctions](https://date-fns.org/v2.7.0/docs/Getting-Started) to work with. 

# Why date-fns ⚡
- **Immutable and pure** - date-fns has pure built-in functions that return a new date instance rather than modifying the parsed date. This helps to reduce and to prevent bugs.
- **Native Date date** - fns uses existing native JavaScript date API.
- **Modular** - you pick what you need, date-fns only import the function you need rather than the whole API functions pack, with modern modules such as webpack, Rollup and Browsefy with tree shaking algorithm support.
- **Fast** - date-fns is a small API that is very light, thus guarantees users' the best experience.
- **Documentation** - what is better without good Docs? Date-fns has well-outlined documentation which very clear and simple to follow along with example use-cases (code snippets) for every date function.
- **I18n** - perhaps you want to display dates with your users' favorite locale. Date-fns have a dozen locales that you can choose to use whenever you need them.
- **Typescript and Flow** - supports both typescript and flow.

[Check more benefits of date fns](https://date-fns.org/)

# Getting started with date-fns

Date-fns is available in the [npm packages collection](https://www.npmjs.com/package/date-fns). And if then you have [Node.js installed](http://nodejs.org/) you are good to go. You need to install date-fns using the following command `npm install date-fns`. Alternatively, if you are using yarn `yarn add date-fns` will get you strated. Date-fns can be used with both CommonJS Module System and ES modules. In this article, we shall dive into CommonJS module system use case with date instances such as
- Displaying dates
- Date formatting
- Date locale
- Time zones
- Date arithmetic
- Date comparisons, and other important applications of date-fns functions.

# Date format

Date formatting is key when displaying a date. Formatting helps to display human-readable dates. Date format replaces the individual date tokens to a format string, which specifies the part of the date token you want to format and how the token will be displayed. To understand this more let's have a look and date token representation patterns that you can choose to display as formats 
**Note:** some of these [Unicode patterns](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) are different from other date libraries such as MomentJS

Calendar Year
- y - ...17, 18, 1900, 2000, 2001, 2022 and 2023...
- yo - 0th, 1st, 2nd, 3rd, 4th, 15th, 16th, 17th, 19th, 20th…
- yy - 00, 01, 02, 14... 15, 16, 17, 19 and 20, 21, 22…
- yyyy - ...2017, 2018, 2019, 2020, 2021, 2022 and 2023....

Month
- M - 1, 2, 3, 4 ...10, 11 and 12
- Mo - 1st, 2nd, 3rd, 4th, 10th, 11th, 13th and 12th
- MM - 01, 02, 03, 04 ...10, 11 and 12
- MMM – Jan, Feb, Mar, Apr...Oct, Nov and Dec
- MMMM – January, February, March, April...October, November and December
- MMMMM - J,F,M,A,M,J,J,A,S,O,N,D

Day of month
- d – 1, 2, 3, 4...28, 29, 30 and 31
- do - 1st, 2nd, 3rd, 4th...29th, 30th and 31st
- dd - 01, 02, 03, 04...28, 29, 30 and 31

Day of year
- D – 1, 2, 3, 4... 362, 363, 364 and 365
- Do - 1st, 2nd, 3rd, 4th ...362nd, 363rd, 364th and 365th
- DDD – 01, 02, 03, 04...362, 363, 364 and 365
- DDD – 001, 002, 003, 004...362, 363, 364 and 365

Day of week
- E.EEE– Sun, Mon, Tue, Wed, Thu, Fri and Sat
- EEEE – Sunday, Monday, Tuesday, Wednesday, Thursday, Friday and Saturday
- EEEEE – Su, Mo, Tu, Th, Fr, Sa, and We
- EEEEEE – S, M, T, W, T, F, and S

Hour (1-23)
- H – 0, 1, 2, 3, 4 ... 19, 20, 21, 22 and 23
- Ho – 0th, 1st, 2nd, 3rd, 4th ... 19th, 20th, 21th, 22nd and 23rd
- HH – 00, 01, 02, 03, 04... 19, 20, 21, 22 and 23

Hour (1-12)
- h – 1, 2, 3, 4 ... 12,
- ho – 1th, 2nd, 3rd, 4th ... 12th,
- hh – 01, 02, 03, 04... 12

Minute
- m - 0, 1, 2, 4... 54, 55, 55, 57, 58 and 59
- mo –0th 1st, 2nd, 3rd, 4th ... 12th, 58th,59th
- mm - 00, 01, 02, 04... 54, 55, 56, 57, 58 and 59

Second
- s – 0, 1, 2, 3, 4 ... 54, 55, 56, 57, 58 and 59
- so –0th 1st, 2nd, 3rd, 4th ... 12th, 58th, 59th
- ss – 00, 01, 02, 03, 04... 54, 55, 55, 56, 57, 58 and 5
[Check more Unicode date format for Date-fns](https://date-fns.org/v2.16.1/docs/Unicode-Tokens)

# [Parsing and displaying date](https://date-fns.org/v2.16.1/docs/parse)

As we have explained, date-fns is a collection of many small functions. Use `require('date-fn');` to get started. To start displaying any date you need to import the functions you require, thus you don't have to import the whole API (work with only what you need). Let's display a simple today's date.
```js
//import the funtion you want to use 
const {format} = require('date-fns');
```
```js
const {format} = require('date-fns');
const today =format(new Date(),'dd.MM.yyyy');
console.log(today);
```
This will display the default current date with the date-fns default format. Now, this is where date format comes in to display this date token to a more human-readable and look exactly the way you want (return the date parsed from string using the given format string).

## Displaying formatted date

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/date-fns-format?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Alternatively, you can parse a default date value such as

const {format} = require(&#39;date-fns&#39;);

Alternatively, you can parse a default date value

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

The above examples will display the date parsed with several date formats. You [check out more date formats](https://date-fns.org/v2.16.1/docs/format) you can play with and get more ideas of how date-fns formats works.

**Note:** we have only imported format function since it is only what we need, that's one of the very dynamic features of date-fns. When formatting date-fns token values try to avoid some [common mistakes](https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md) such as


```js
format(date, 'DD.MM.YYYY'); ❌ 
format(date, 'dd.MM.yyyy'); ✔️
```
# Date arithmetic (additions, subtractions)

It is hard to do arithmetic calculations for dates. Date-fns simplifies this with ease. You can add and subtract dates between years, months, days, time, seconds using simple functions such as `addDays`, `addWeeks`, `addMonths`, `subDays`, `subWesks`, `subMonths` etc

## [Additions](https://date-fns.org/v2.16.1/docs/add)

Syntax
`addDays(date, amount)`
- date - The date to be changed
- amount - Amount of days to be added

Let's perform simple date additions. To get started, import the required functions, then add the unit of time to the base date. Specify the operation you want to perform as the first argument followed but the number of units to add. You can add the format function to format the date returned to your specified display format.

Example

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/date-fns-add?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

**Note:** date units added/subtracted with positive decimals will be rounded off with `math.floor` and decimals less than zero will be rounded using `math.cell`.

## [Subtractions](https://date-fns.org/v2.16.1/docs/sub)

Works exactly like addition, only that the `add` prefix function is replaced with a `sub`. Then just subtract your specified units of time.

Syntax example
`subDays(date, amount)`
Here you import sub-functions to perform subtractions. Similarly, you can choose format function to manipulate your display options.
```js
const date = new Date('2020.09.29 10:12:00');
//sub days
const sub2 = subDays(date, 4);
//sub months
const sub3 = subMonths(date, 3);
//sub years
const sub4 = subYears(date, 3);
//sub minutes
const sub5 = subMinutes(date, 40);
console.log(format(sub2, 'dd MMMM yyyy HH:mm'));
console.log(format(sub3, 'dd MMMM yyyy HH:mm'));
console.log(format(sub4, 'dd MMMM yyyy HH:mm'));
console.log(format(sub5, 'dd MMMM yyyy HH:mm'));
```

# [Date locale](https://date-fns.org/docs/I18n#supported-languages)

Users who typically visit your website may come across the different  world, assume they do not speak your native language, so how will you implement specific locale to support this? Well, formatting dates was easy. How about locale? It cannot be that hard with date-fns, actually it is easy as pie. All you need is to import the locale plugin from date-fns. Date-fns support I18n with a simple way to internationalize date functions and display localized formatted dates. You need to use the `require locale` and pass the optional locale as the argument.

For example, let's have a simple date parsed and outputted in French Locale

```js
const newYears = new Date('2019/01/01');
const frenchLocale = require('date-fns/locale/fr');
const format = require('date-fns/format');
const formattedDate = format(newYears, 'EEEE,MMMM do, yyyy hh:mm a', {
    locale: frenchLocale
});
console.log(formattedDate);
```
**Multiple locales example**

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/date-fns-ocae?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

[Check official doc to have a look at supported locale/supported-languages](https://date-fns.org/v2.16.1/docs/I18n-Contribution-Guide)

# [Date time zones](https://date-fns.org/v2.16.1/docs/Time-Zones)

Date-fns supports time zone data for working with UTC or ISO date strings. This will help you to display the date and time in local time of your users. The difficulty comes when working with another time zone's local time, like showing the local time of an event in LA at 8 pm PST on a Node server in Europe or a user's machine set to EST. In this case, there are two relevant pieces of information:
- A fixed moment in time in the form of a timestamp, UTC or ISO date string, and
- The time zone descriptor, usually an offset or [IANA](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) time zone name (e.g. America/Los_Angeles).

## [Time zone helpers](https://github.com/marnusw/date-fns-tz#time-zone-helpers)

To understand time zone helpers more assume you have a system where you set an event to start at a specific time and your system local time should be shown when the site is accessed anywhere in the world.

- zonedTimeToUtc returns a given date equivalent to the time zone UTC (parses date in a given time zone)
- utcToZonedTime return local time from a UTC (converts date to the provided time zone)

## [Use cases](https://github.com/marnusw/date-fns-tz)
`npm install date-fns date-fns-tz`

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

# Date comparisons

Date-fns provides you with important comparison functions that will help you to determine if a given time is before, after, or within another given date period or if the given date lies in the past or in the future of the comparing date. Some of the commonly used comparing functions include

## [isAfter](https://date-fns.org/v2.16.1/docs/isAfter)

Checks if the first date is after the Second and returns a Boolean value true if the first date exits after the second date and if false, the arguments are not true.

Syntax
`isAfter(date, dateToCompare)`
-   Date - the date that should be after the second date (as the first argument)
-   DateToCompare - the second date to be compared with the first date. (As the second argument)

Ex1
const { isAfter,addHours, subHours } = require(&quot;date-fns&quot;);

```JS
const { isAfter,addHours, subHours } = require("date-fns");
const date1 = new Date();
const date2 = addHours(new Date(), 5);
const date3 = subHours(new Date(), 5);
console.log(isAfter(date1, date2));
console.log(isAfter(date1, date3));
```
Ex2

```JS
const { isAfter, isFuture, addHours } = require("date-fns");
const date1 = new Date();
const date2 = addHours(new Date(), 5);
console.log(`Date1 is ${isAfter(date1, date2) ? "after" : "before"} Date2`);
console.log(`Date2 is ${isFuture(date2) ? "not" : ""} in the past`);
```
## [isBefore](https://date-fns.org/v2.16.1/docs/isBefore)

Checks if the first date is before the Second.
```JS
const { isBefore, addHours, subHours } = require("date-fns");
const date1 = new Date();
const date2 = addHours(new Date(), 5);
const date3 = subHours(new Date(), 5);
console.log(isBefore(date1, date2));
console.log(isBefore(date1, date3)); 
```

## [isFuture](https://date-fns.org/v2.16.1/docs/isFuture)

Checks if the given date is in the future in comparison to the date/time now.
**Note:** if the comparing date is the time right now the `isFuture` will return this as false. In such a case, date-fns will interprete the now date as the present time and not a future time.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/date-fns-isfuture?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Compare a collection of dates and sort them in [Desc or ASC](https://date-fns.org/v2.16.1/docs/compareAsc) order
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

There are many comparison functions options such as

## [isWeekend](https://date-fns.org/v2.16.1/docs/isWeekend)

Checks if a given date is a is a weekend

```js
const { isWeekend, addHours, subHours } = require("date-fns");
const date1 = new Date("2020,09,19");
const date2 = new Date("2020,09,18");
console.log(isWeekend(date1));
console.log(isWeekend(date2));
```

## [isDate](https://date-fns.org/v2.16.1/docs/isDate)

Checks if a given string value is an instance of a date and return true is the date provided is actually a date value.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/date-fns-isdate?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Check out more Comparison functions and helpers such as [isPast](https://date-fns.org/v2.16.1/docs/isPast), [isEqual](https://date-fns.org/v2.16.1/docs/isEqual), [isExits](https://date-fns.org/v2.16.1/docs/isExists), [isMatch](https://date-fns.org/v2.16.1/docs/isMatch) and many more.

# [Date validation](https://date-fns.org/v2.16.1/docs/isValid)

Date-fns provides you with date validation helpers with the [isValid function](https://date-fns.org/v2.16.1/docs/isValid) that helps you to check if a given date is valid.

By default, date-fns returns a Boolean variable true if he date parsed is indeed a valid date or false if the date string passed is not a valid date.

```js
const { isValid } = require("date-fns");
const validate1 = isValid(new Date('2020, 09, 21'))
const validate2 = isValid(new Date('2020, 02, 30'))
console.log((validate1))
console.log((validate2))
```
However, in the above example, you will be surprised to find out the `new Date ('2020, 02, 30')` returns true yet the date itself is obviously invalid. February 30, there is no date with a February 30th day. Interestingly, this is not a bug in date-fns. To elaborate this more enter a `new Date ('2020, 02, 30')` on your browser's console (in my case am using google chrome console).

This date instance will be interpreted as `Sun Mar 01 2020 00:00:00 '2020, 02, 30'`. February ends February on 29th ( 2020 is a leap year) and adds the extra day will be added to represent the date of the next month, which indeed will be valid.
To avoid such instances parse the date before checking isValid.

Example

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/date-fns-isvalid?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

# Differences between dates

Date-fns provides several functions to manipulate and calculate the differences that exits between two given dates. These functions represent difference calculations between several units of time such as
- [differenceInSeconds](https://date-fns.org/v2.16.1/docs/differenceInSeconds) (number of seconds between given dates)
- [differenceInMinutes](https://date-fns.org/v2.16.1/docs/differenceInMinutes) (number of minutes between given dates)
- [differenceInDays](https://date-fns.org/v2.16.1/docs/differenceInDays) (number of days between given dates)
- [differenceInBusinnesDays](https://date-fns.org/v2.16.1/docs/differenceInHours) (number of business days period between two given dates)
- [differenceInWeeks](https://date-fns.org/v2.16.1/docs/differenceInWeeks) (number of weeks between given dates)
- [differenceInYears](https://date-fns.org/v2.16.1/docs/differenceInYears) (number of years between given dates)

Each unit will get the number of the given Unit differences between two dates

For example

Calculating the difference of days and the number of business days that exits between now and Christmas.
```js
const {differenceInDays ,differenceInBusinessDays} = require("date-fns");
const startDate = new Date();
const endDate = new Date("2020,12,25");
const daysBetween = differenceInDays(endDate, startDate);
const workdaysBetween = differenceInBusinessDays(endDate, startDate);
console.log(daysBetween);
console.log(workdaysBetween);
```
# Date-fns intervals

Date-fns provides you with interval helpers to combine two dates and determine the time interval between them. An interval object has two properties;
- Start - the start of the interval
- end - the end of the interval

This interval helper includes;
- [areIntervalsOverlapping](https://date-fns.org/v2.16.1/docs/areIntervalsOverlapping) - checks if the given time interval overlaps another time interval
- [eachDayOfInterval](https://date-fns.org/v2.16.1/docs/eachDayOfInterval) - gives an array of dates that exist within a specified interval
- [eachHourOfInterval](https://date-fns.org/v2.16.1/docs/eachHourOfInterval) - gives an array of hours that exist within a specified interval
- [eachMonthOfInterval](https://date-fns.org/v2.16.1/docs/eachMonthOfInterval) - gives an array of months that exist within a specified interval
- [eachWeekOfInterval](https://date-fns.org/v2.16.1/docs/eachWeekOfInterval) - gives an array of weeks that exist within a specified interval
- [eachYearOfInterval](https://date-fns.org/v2.16.1/docs/eachYearOfInterval) - gives an array of years that exist within a specified interval
- [isWithiIterval](https://date-fns.org/v2.16.1/docs/isWithinInterval) - determines if a given date is within a specified interval

Head out to [date-fns docs to check out more interval helpers](https://date-fns.org/v2.16.1/docs/Interval) and how you can apply them to your application.

# 🎁Comparison between MomentJS and date-fns

Moment is a stand-alone open-source JavaScript framework wrapper for date objects that eliminates native JavaScript date objects, which are cumbersome to use. Moment makes dates and time easy to display, format, parse, validate, and manipulate using a clean and concise API. Unlike date-fns, the biggest downtime of MomentJS is its size.

As we have seen in the above examples, date-fns is a collection of many small and independent functions allowing you to import functions that you only need, unlike moment where you create a moment instance to run functions from it. With MomentJS, there isn't a way to import a specified function. That's means you have to import the whole API chain even when loading a simple date thus creating performance overhead.

example
```js
const moment = require('moment');
const today = moment();
console.log(today.format('YYYY MM DD'));
```
Date-fns only grabs the specific function and this makes is a much smaller library than MomentJS.
```js
const {format} = require('date-fns');
const today =format(new Date(),'dd.MM.yyyy');
console.log(today);
```
![image title](/engineering-education/new-folder-name/image-name.jpg)
![image title](/engineering-education/new-folder-name/image-name.jpg)
Nevertheless, if you love working with MomentJS, its size should not be a big worry. You can [configure moment with webpack](https://stackoverflow.com/a/25426019/1775026) or remove data that you aren't using such as locale plugins and this will significantly reduce MomentJS buddle size. MomentJS fit well when working with a big project because you will end up using much of moment functionalities thus the buddle size won't matter, but if you just want to load simple dates that require one or two methods then date-fns will definitely work on your favor. If you are dealing with time zones, I would advise you to check out momentJS. Its time zone functionalities are extensive compared to those of date-fns, and momentJS has more locale support functionalities that may help you to extend more global reach with your date instances.

Statistical Comparison

Size packages bundle size
![image title](/engineering-education/new-folder-name/image-name.jpg)
Image source

NPM download stats npm download stats
![image title](/engineering-education/new-folder-name/image-name.jpg)
Image source

GitHub stats Image source
![image title](/engineering-education/new-folder-name/image-name.jpg)
Popularity and activity popularity and activity
![image title](/engineering-education/new-folder-name/image-name.jpg)
Image source

What is matter a lot is to meet your demand

# Other date manipulating framework alternatives worth checking out.

## [DayJS](https://github.com/iamkun/dayjs)

⏰ Day.js is a 2KBs immutable date library alternative to Moment.js with the same modern API
- 🕒 Familiar Moment.js API & patterns
- 💪 Immutable
- 🔥 Chainable
- 🌐 I18n support
- 📦 2kb mini library
- 👫 All browsers supported

## [Luxon](https://github.com/moment/luxon)

Luxon is a library that makes it easier to work with dates and times in JavaScript. If you want, add and subtract them, format and parse them, ask them hard questions, and so on, Luxon provides a much easier and comprehensive interface than the native types it wraps with features such as
- DateTime, Duration, and Interval types.
- Immutable, chainable, unambiguous API.
- Parsing and formatting for common and custom formats.
- Native time zone and Intl support (no locale or tz files).

## [Fecha](https://github.com/taylorhakes/fecha)

Lightweight date formatting and parsing (~2KB). Meant to replace the parsing and formatting functionality of moment.js.
- Size (Min. and Gzipped) 2.1KBs
- Date Parsing
- Date Formatting
- Date Manipulation

## [Timeago.js](https://github.com/albert-gonzalez/easytimer.js)

🕗 ⌛ timeago.js is a nano library(less than 2 kb) used to format datetime with *** time ago statement. eg: '3 hours ago'.
- i18n supported.
- Time ago and time in supported.
- Real-time render supported.
- Node and browser supported.
- Well tested.

## [Easytimer.js](https://github.com/hustcc/timeago.js)

Easy to use Timer/Chronometer/Countdown library compatible with AMD, ES6 and Typescript

EasyTimer.js is a simple library for counting time in five different units: tenth of seconds, seconds, minutes, hours and days. It has interesting features:
- The refresh interval can be configured in tenth of seconds, seconds, minutes and hours.
- Dispatches events when timer starts, stops, pauses and when every type of unit changes.
- A custom callback can be defined and it will be executed every timer refresh.
- Two timer modes: Regular and Countdown.
- Configurable start and target values.

# Conclusion

Date-fns is a great library that you should put on your checklist if you have a project that needs some date manipulations. I have good support and well maintained. As you may find out in the [date-fns official documentation](https://date-fns.org/), this article is meant to introduce you to some of the common functions to give you a taste of this library's scope. What libraries like momenjs and date-fns can do, can still be achieved with naïve JavaScript. However, the make working with date objects fun and easier with improved code readability.