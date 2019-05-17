# Chrome Extension Starter Kit

Adds a chrome extension to the browser that has a "Click Me" button when the user is on a `https://www.pluralsight.com/*` page. The extension has one option field for storing a message. That message is shown when the extension is opened. When the extension is clicked it tries to find an element on the page with a class of 'title' and get the contents of that element. It then shows a little result area and displays the contents in the extension.

## Installation

1. Clone the repo to your hard drive.
2. npm install
3. npm run build
4. Open `chrome://extensions/` and click `Load unpacked`
5. Navigate to the build folder insider the folder where you cloned the repo and click `Select`.

## Using the Options

There is an `Extensions options` page that has a default message. When testing, you should make sure you can change and save this message by click OK. When you click OK the area below the OK message should log a message showing you what was saved. You can easily add more options. You can search on the code base for `optionMessage` and see everywhere the option is used.

## Using the extension

Navigate to a page on the www.pluralsight.com web site. Click on the extension. First you should notice if you changed the option message it now displays on the popup menu for the extension. Click the `Click Me` button. Very quickly the progress spinner area will be shown (it might be faster than the human eye). A message is sent to the content script which searches the current page to see if there is an HTML element with a class named 'title' attached. If so it will return the contents of that element and show a new alert area at the bottom of the popup with the contents of that data (in a pretty light green background color). That's it. It's just a starter kit, you're expected to modify it to make it do something useful.

## Making your extension

Make your Typescript, image and HTML changes and run `npm run build`. That will do all the steps to recreate a proper build folder. If your editor supports it you can configure it to make its build command execute this script in the package.json file.

You should be able to make any changes to any file. You can make a pretty functional solution with out adding any more files. If you need to add more files remember to update the manifest.json file. The key thing that makes this work with TypeScript is just putting `type="module` in the script tags. Depending on what you do with your extension you will almost certainly need to add more permissions to the manifest.json file. If you want to make an XMLHttpRequest to some API a lot of the code for doing that was left in popuup.ts and commented out.

The one caveat on supporting ES6 style modules like I do in this project is the content-script file. You can't create a corresponding .html file for that. If you need to use modules in those files I would recommend reading
[ES6 modules in chrome extensions — An introduction](bit.ly/chrome-ext-es6)

In particular the [Limitations](bit.ly/chrome-ext-es6#d45a) section has a link to an article about injecting the script. Luckily (for me) even in my real extensions I didn't have a need for this. If I had to reuse some shared code in a content script I might just violate DRY until all of this plays a little nicer with ES6 modules.

There's also a good article on using [ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/). It has nothing specific about chrome extensions but the problem really relates to the issues discussed in this article.
