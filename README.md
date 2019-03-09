# Gnib Ireland Client

This is a client to get GNIB appointments slots.

[![Build Status](https://travis-ci.org/ricardodantas/gnib-ireland-client.svg?branch=master)](https://travis-ci.org/ricardodantas/gnib-ireland-client) [![Coverage Status](https://coveralls.io/repos/github/ricardodantas/gnib-ireland-client/badge.svg?branch=master)](https://coveralls.io/github/ricardodantas/gnib-ireland-client?branch=master)

## Install

```
npm i gnib-ireland-client --save
```

***

## How to use

```
import gnibIrelandClient from 'gnib-ireland-client';

const response = gnibIrelandClient.checkSlotsAvailability(gnibIrelandClient.Types.New, gnibIrelandClient.Categories.All); // new registration

// OR

const response = gnibIrelandClient.checkSlotsAvailability(gnibIrelandClient.Types.Renewal, gnibIrelandClient.Categories.All); // exiting registration renewal

```

### Available Types:

* New (for new registrations)

* Renewal (for existing gnib registrations)

### Available Categories:

* All (default)

* Work

* Other

* Study

***

## Bugs/Issues
Let me know at https://github.com/ricardodantas/gnib-ireland-client/issues
