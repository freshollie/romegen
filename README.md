# Romegen

Roman numerals generator and parsing API.

## Goals

As a backend software engineer, I ensure that my code is 100% unit test
covered. This provides maintainability and faster development through TDD.

I used ESLint to help with automated code formatting and checking.

## Running

`npm install` to install dependencies
`npm start` to start the server

The server starts on port 4943

## Interface

The API interface treats numbers and numerals and resources, and
always responds with a JSON.

Error responses will always come in the form of `{ error: "message" }`
with a status code sent back in the headers.

Path | Response | Description
----- | -------- | ----------
/numerals/:numeralString | `{ decimal: number }` | Returns the decimal of the given numeral string. Invalid strings return an error code 422 with an explanation in the message
/decimal/:number | `{numerals: numeralString }` | Returns the numeral string of the given decimal. Bad numbers return an error code 422 with an explantation

## Improvements

The API is currently entirely synchronous. This could be improved by using `flushPromise`
a library which allows control to be handed away during long running loops. However, I'm
not sure this would make much of a difference, a better approach would to scale the application horizontally to cope for demand.

## Testing

Testing is completed with `jest` and can be run with `npm test`

## Linting

Airbnb linting rules are used for this project, with eslint

run `npm run lint` to run lint tests
