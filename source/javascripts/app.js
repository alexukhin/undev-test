window.App = Em.Application.create({
  ready: function(){
    console.log("Created App Namespace");
  }
});

$(function(){
  App.initialize();
});