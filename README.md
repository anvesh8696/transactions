#Transactions
Web-based mocked app that simulates a way for users to send money to other users.

* Front end is a web-based UI
* Back end is a Node.js server with mocked data

##Stories
###Initial Screen
* <del>Static responsive web page</del>

###Send Money Screen
* <del>Form</del>
* <del>Email validation</del>
* <del>Amount validation</del>
* <del>Form layout</del>
* <del>Currency selection</del>
* <del>Payment for options</del>
* <del>Clear / Next buttons</del>
* <del>Handle errors after submit</del>

###Loading Screen
* <del>Serialize form data on submit? REST API?</del>
* <del>Overlay layout</del>
* <del>Centralize loading GIF</del>

###Send Money Success
* <del>Display message with amount and currency</del>
* <del>Layout</del>

###Transaction History
* <del>Load mocked data in a table</del>
* Layout
* Handle names that don't fit
* Infinite scroll listing

##Models
###User
* id
* name
* email
* created_at

###Transaction
* id
* from_user_id
* to_user_id
* amount
* currency
* message
* payment_for
* created_at

