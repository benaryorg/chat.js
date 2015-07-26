# chat.js [![Build Status](https://travis-ci.org/benaryorg/chat.js.svg?branch=master)](https://travis-ci.org/benaryorg/chat.js)

## Features

_chat.js_ is a JavaScript server application offering a real-time chat.

It has a basic serverside implementation enabling clients to send whatever they
want, as long as it is a JSON object.

### Todo

- [x] Server Implementation
- [x] HTML5 UI
	- [x] Messaging Support
	- [x] HTML5 Notifications
	- [x] Saves Username
	- [x] Saves last 100 Messages
	- [x] Links are replaced with real Links
	- [x] Only 100 Messages are being displayed
	- [x] Changes Title to Uppercase on Message when not visible

## Usage

Just use it as is and it will host the application on localhost on port 3000
via HTTP.

Run it using

	$ node index.js

If you want to use HTTPS please change the source code, or use a reverse proxy.

## Demo

A live version is available at [chat.benary.org](https://chat.benary.org/).

## License

MIT as always, see `LICENSE` file.

