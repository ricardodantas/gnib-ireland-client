# Gnib Ireland Client

This is a client to get GNIB appointments slots.

[![Build Status](https://travis-ci.org/ricardodantas/gnib-ireland-client.svg?branch=master)](https://travis-ci.org/ricardodantas/gnib-ireland-client) [![Coverage Status](https://coveralls.io/repos/github/ricardodantas/gnib-ireland-client/badge.svg?branch=master)](https://coveralls.io/github/ricardodantas/gnib-ireland-client?branch=master)

## Install

```
npm i gnibIreland --save
```

***

## How to use

```
import gnibIreland from 'gnib-ireland-client';

const response = gnibIreland.checkSlotsAvailability('New'); // new registration

// OR

const response = gnibIreland.checkSlotsAvailability('Renewal'); // exiting registration renewal

```

### Available Types:

* New (for new registrations)

* Renewal (for existing gnib registrations)

***

## Bugs/Issues
Let me know at https://github.com/ricardodantas/gnib-ireland-client/issues
