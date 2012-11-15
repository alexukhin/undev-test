App = Em.Application.create({
  rootElement: "#application",
  ready: function(){
    console.log("Created App Namespace");
  }
});

$(function(){
  App.initialize();
});