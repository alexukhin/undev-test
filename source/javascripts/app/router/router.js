App.Router = Em.Router.extend({
  root: Em.Route.extend({
    index: Em.Route.extend({
      route: '/',
      redirectsTo: 'albums'
    }),
    albums: Em.Route.extend({
      route: '/albums',
      showAlbum: Em.Route.transitionTo('videos'),
      connectOutlets: function(router){
        App.albumsController.loadAlbums();
        router.get('applicationController').connectOutlet('albums');
      }
    }),
    videos: Em.Route.extend({
      route: '/album/:id',
      showVideo: Em.Route.transitionTo('video'),
      connectOutlets: function(router, context){
        App.videosController.loadVideos(context.id);
        router.get('applicationController').connectOutlet('videos');
      }
    }),
    video: Em.Route.extend({
      route: '/video/:id',
      connectOutlets: function(router, context){
        App.videoController.loadVideo(context.id);
        router.get('applicationController').connectOutlet('video');
      }
    })
  })
});