#PayPal Transactions
This is a web-based app that allows PayPal users to send money to other users.

* Front end is a web-based UI
* Back end is a Node.js server with mocked data

##Stories
###Initial Screen
* <s>Static responsive web page</s>

###Send Money Screen
* <s>Form</s>
* <s>Email validation</s>
* <s>Amount validation</s>
* <s>Form layout</s>
* <s>Currency selection</s>
* <s>Payment for options</s>
* <s>Clear / Next buttons</s>
* Handle errors after submit

###Loading Screen
* <s>Serialize form data on submit? REST API?</s>
* <s>Overlay layout</s>
* <s>Centralize loading GIF</s>

###Send Money Success
* <s>Display message with amount and currency</s>
* <s>Layout</s>

###Transaction History
* Load mocked data in a table
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

