module.exports = (function() {

  return {
    currentUser: function() {
      // mocked data
      return {
        id: 1,
        name: "John Lennon",
        email: "john@example.com",
        createdAt: Date.now()
      }
    }
  };

})();
