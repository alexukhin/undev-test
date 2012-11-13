window.App = Em.Application.create({
  rootElement: "#application",
  init: function(){
    console.log("Created App Namespace");
  }
});

$(function(){
  App.initialize();
});