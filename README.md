#[jobQuery](http://jobqueryclient.azurewebsites.net/)

A custom CMS for Hack Reactor to manage hiring day. *eHarmony* for jobs.

## Features

1. Form builder for admins to collect student data
1. Interface for students to provide feedback
1. Student and admin dashboards that highlight outstanding actions
1. Summary views for admins
1. Generate interview schedules by solving a stable marriage problem

## Technology Stack

- Angular.js

## Local System Prerequisites
- Node.JS
- MongoDB
- bower
- npm

## How to Run Locally
1. Clone both the jobquery-client and jobquery-server to your local machine.
1. In both repos, run `npm install` and `bower install` from main directory.
1. Start a local instance of mongo by typing `mongod` in the terminal.
  - You will need to import data into the local DB. Contact a group admin.
1. In another terminal tab, run `node server.js` in `jobquery-server/`.
1. In a third terminal tab, run `gulp devserve` in `jobquery-client/`.
1. Open a browser and navigate to http://localhost:8000.

## To Run End-to-End Tests
Reference the Angular Protractor [tutorial](http://angular.github.io/protractor/#/tutorial).

### Setup

1. Install Protractor globally using `npm install -g proctractor`.
1. Update the webdrivers using `webdriver-manager update`.
1. Create a file named `test/E2E/privateInfo.js` with usernames, passwords, etc. The setup at this time is:

        exports.admin = ['someemail@email.com', 'password'];

        exports.user = ['someemail@email.com', 'password'];
1. Start the selenium server in a new terminal tab: `webdriver-manager start`.
1. Run jobQuery locally, see steps above. 

There should be 4 tabs open:
- Server
- MongoDB
- Client
- Selenium server

### Run
In a fifth terminal window, navigate to `jobquery-client/test/E2E/conf.js` and enter `protractor conf.js` to run tests.
