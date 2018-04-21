# ember-data-date-only-transform
[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]

This addon provides a `date-only` transform for API fields that only include the date and no time info. It correctly adjusts for a browser quirk where parsing a date string without time can return a Date object for the previous day.

Here's a quick browser console example showing the quirk when parsing a date only string:
```
new Date('2018-04-20').toString()
> "Thu Apr 19 2018 19:00:00 GMT-0500 (CDT)"
```
Notice how the browser changes the day of month from the 20th of April to the 19th.

This transform takes care of the browser quirk so the day of month on the deserialized date object is not the day before.

This quirk only happens for people in the Western hemisphere because the browser implicitly assumes the time is `00:00:00.000Z` when not provided. Then the browser applies the Time Zone adjustment so `2018-04-20T00:00:00.000Z` in the Central time zone is 7 pm the day before on 4/19/2018.

## Installation

```
ember install ember-data-date-only-transform
```

## Usage

```
birthdate: DS.attr('date-only')
```

## Development

* `git clone` this repository
* `npm install`

## Running Tests

* `ember test`
* `ember try:each` to test against multiple Ember versions

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
