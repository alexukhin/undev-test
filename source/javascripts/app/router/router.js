App.Router = Em.Router.extend({
  root: Em.Route.extend({
    index: Em.Route.extend({
      route: '/',
      redirectsTo: 'albums'
    }),
    albums: Em.Route.extend({
      route: '/albums',
      connectOutlets: function(router){
        router.get('applicationController').connectOutlet('albums', App.albumsController.loadAlbums());
      }
    })
  })
});