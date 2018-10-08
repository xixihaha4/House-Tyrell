# OctoPOS

A customizable Point of Sales system that seamlessly integrates real-time sales interface, inventory tracking, and graphical sales data analysis.  

## Getting Started

### Requirements
Node.js
React.js
MySQL
Sequelize
Socket.io
React-Table

### Installing Dependencies
From within the root directory, run the following:
``` 
npm install
```

### MySQL Database
The current MySQL database connection is configured with AWS RDS.
It is also set up with a Master-Replica structure, where the Replica database only reads data, while the Master database reads and writes data. This feature makes it easy to elastically scale out beyond the capacity constraints of a single DB instance for read-heavy database workloads. 

## Team
Xixi Chen,
Jerry Chen,
Eric Sin,
Manos Kourkoulakos

## Style Guide
This codebase follows the AirBnB style guide incorporated using a linter.  All submitted Pull Requests should also follow AirBnB's style guide.  If you don't have a linter installed,

Two examples for configuring your environment to adhere to this style guide can be found [here](http://www.acuriousanimal.com/2016/08/14/configuring-atom-with-eslint.html) for Atom and [here](https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6) for VSCode.