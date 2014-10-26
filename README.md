# twitch-mean

Twitch is a trademark or registered trademark of Twitch Interactive, Inc. in the U.S. and/or other countries. "Twitch-MEAN" is not operated by, sponsored by, or affiliated with Twitch Interactive, Inc. in any way.

## What is it exactly ?

It is a modern stack: MongoDB, ExpressJS, AngularJS, NodeJS. (BONUS: Twitch Passport User Support).

Service | Description
------------ | -------------
![MongoDB](http://i.imgur.com/RTpfBjE.png) | MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable.
![ExpressJS](http://i.imgur.com/jZlmyuc.png) | Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.
![AngularJS](http://i.imgur.com/7cAlzCF.png) | AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.
![NodeJS](http://i.imgur.com/Ma9aR83.png) | Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.

## Installation

- [Click here](https://github.com/Schmoopiie/twitch-mean/archive/master.zip) to download the repository
- Extract the files wherever you want
- [Register a new application](http://www.twitch.tv/kraken/oauth2/clients/new) on Twitch
- Change the configuration file ``config/config.json``
- Type ``npm install`` in the root directory
- Type ``grunt`` in the root directory when everything is installed

## Protections

**Content Security Policy (CSP)**

Content Security Policy (CSP) is a computer security concept, to prevent cross-site scripting (XSS) and related attacks. It is a Candidate Recommendation of the W3C working group on Web Application Security. CSP provides a standard HTTP header that allows website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

**Cross-Site Request Forgery (CSRF)**

CSRF is an attack which forces an end user to execute unwanted actions on a web application in which he/she is currently authenticated. With a little help of social engineering (like sending a link via email/chat), an attacker may trick the users of a web application into executing actions of the attacker's choosing. A successful CSRF exploit can compromise end user data and operation in case of normal user. If the targeted end user is the administrator account, this can compromise the entire web application.

**Privacy Preferences Project (P3P)**

The Platform for Privacy Preferences Project (P3P) is a protocol allowing websites to declare their intended use of information they collect about web browser users. Designed to give users more control of their personal information when browsing, P3P was developed by the World Wide Web Consortium (W3C) and officially recommended on April 16, 2002. Development ceased shortly thereafter and there have been very few implementations of P3P. Microsoft Internet Explorer is the only major browser to support P3P. The president of TRUSTe has stated that P3P has not been implemented widely due to the difficulty and lack of value.

**HTTP Strict Transport Security (HSTS)**

HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in [RFC 6797](http://tools.ietf.org/html/rfc6797).

**X-Frame**

The X-Frame-Options HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a <frame>, <iframe> or <object> . Sites can use this to avoid clickjacking attacks, by ensuring that their content is not embedded into other sites.

**Cross-Site Scripting (XSS)**

Cross-Site Scripting (XSS) is a type of computer security vulnerability typically found in Web applications. XSS enables attackers to inject client-side script into Web pages viewed by other users. A cross-site scripting vulnerability may be used by attackers to bypass access controls such as the same origin policy.

## License

The MIT License (MIT)

Copyright (c) 2014 Schmoopiie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.