Handlebars.registerHelper('image', function(property) {
  var value = Ember.getPath(this, property);
  return new Handlebars.SafeString('<img src="' + value + '">');
});