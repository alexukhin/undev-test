App.Router = Em.Router.extend({
  root: Em.Route.extend({
    index: Em.Route.extend({
      route: '/',
      redirectsTo: 'albums'
    }),
    albums: Em.Route.extend({
      route: '/albums',

        showAlbum: Em.Route.transitionTo('videos.index'),
        editAlbum: Em.Route.transitionTo('videos.edit'),
        connectOutlets: function(router){
          App.albumsController.loadAlbums();
          router.get('applicationController').connectOutlet('albums');
        }        
    }),
    videos: Em.Route.extend({
      route: '/album',
      index: Em.Route.extend({
        route: '/:id',
        showVideo: Em.Route.transitionTo('video'),
        connectOutlets: function(router, context){
          App.videosController.loadVideos(context.id);
          router.get('applicationController').connectOutlet('videos'); 
        } 
      }),
      edit: Em.Route.extend({
        route: '/:id/edit',
        connectOutlets: function(router, context){
          App.edit_albumController.set('content', context);
          App.edit_albumController.title = context.title;
          App.edit_albumController.description = context.description;
          router.get('applicationController').connectOutlet('edit_album');
        }
      })
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