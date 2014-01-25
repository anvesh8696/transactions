var users = [
  {
    id: 1,
    name: "John Lennon",
    email: "john@example.com",
    createdAt: Date.now()
  },
  {
    id: 2,
    name: "Albert Einstein",
    email: "albert@example.com",
    createdAt: Date.now()
  },
  {
    id: 3,
    name: "Carl Sagan",
    email: "carl@example.com",
    createdAt: Date.now()
  },
  {
    id: 4,
    name: "Starbucks",
    email: "starbucks@example.com",
    createdAt: Date.now()
  }
];

var transactions = [
  {
    id           : 1,
    from_user_id : 1,
    to_user_id   : 2,
    amount       : 1000, // cents
    currency     : 'USD',
    message      : '',
    payment_for  : 'family_friends',
    created_at   : Date.now()
  },
  {
    id           : 2,
    from_user_id : 1,
    to_user_id   : 2,
    amount       : 2000, // cents
    currency     : 'USD',
    message      : '',
    payment_for  : 'family_friends',
    created_at   : Date.now() + 5
  },
  {
    id           : 3,
    from_user_id : 1,
    to_user_id   : 4,
    amount       : 1525, // cents
    currency     : 'EUR',
    message      : 'coffee',
    payment_for  : 'goods_services',
    created_at   : Date.now() + 15
  },
  {
    id           : 4,
    from_user_id : 3,
    to_user_id   : 4,
    amount       : 1525, // cents
    currency     : 'JPY',
    message      : 'coffee in japan',
    payment_for  : 'goods_services',
    created_at   : Date.now() + 25
  },
  {
    id           : 5,
    from_user_id : 3,
    to_user_id   : 1,
    amount       : 1525, // cents
    currency     : 'EUR',
    message      : 'coffee',
    payment_for  : 'goods_services',
    created_at   : Date.now() + 35
  },
  {
    id           : 6,
    from_user_id : 1,
    to_user_id   : 3,
    amount       : 2525, // cents
    currency     : 'EUR',
    message      : 'coffee',
    payment_for  : 'goods_services',
    created_at   : Date.now() + 45
  },
  {
    id           : 7,
    from_user_id : 1,
    to_user_id   : 3,
    amount       : 125, // cents
    currency     : 'EUR',
    message      : '',
    payment_for  : 'family_friends',
    created_at   : Date.now() + 55
  },
  {
    id           : 8,
    from_user_id : 1,
    to_user_id   : 4,
    amount       : 1525, // cents
    currency     : 'EUR',
    message      : 'coffee',
    payment_for  : 'family_friends',
    created_at   : Date.now() + 65
  },
  {
    id           : 9,
    from_user_id : 1,
    to_user_id   : 2,
    amount       : 33525, // cents
    currency     : 'USD',
    message      : '',
    payment_for  : 'family_friends',
    created_at   : Date.now() + 75
  },
  {
    id           : 10,
    from_user_id : 1,
    to_user_id   : 4,
    amount       : 1525, // cents
    currency     : 'EUR',
    message      : 'coffee in europe',
    payment_for  : 'family_friends',
    created_at   : Date.now() + 85
  }
];

module.exports = {
  users: users,
  transactions: transactions
};
