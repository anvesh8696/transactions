#PayPal Transactions
This is a web-based app that allows PayPal users to send money to other users.

* Front end is a web-based UI
* Back end is a Node.js server with mocked data

##Stories
###Initial Screen
* Static responsive web page

###Send Money Screen
* Form
* Email validation
* Amount validation
* Form layout
* Currency selection
* Payment for options
* Clear / Next buttons

###Loading Screen
* Serialize form data on submit? REST API?
* Overlay layout
* Centralize loading GIF

###Send Money Success
* Display message with amount and currency
* Layout

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

