App.albumsController = Em.ArrayController.create({
  content: [],
  total: null,
  loadAlbums: function(){
    var self = this;
    $.post(App.connection.url, {method: 'albums.getAll', params: {user_id: App.connection.userId}}, function(response){
      self.set('total', response.albums.total);
      response.albums.album.forEach(function(item){
        var buf = App.AlbumInList.create({
          id: item.id,
          title: item.title,
          avatarUrl: item.thumbnail_video.thumbnails.thumbnail[1]._content,
          avatarWidth: item.thumbnail_video.thumbnails.thumbnail[1].width,
          avatarHeight: item.thumbnail_video.thumbnails.thumbnail[1].height          
        });
        self.pushObject(buf);
      });
      console.log('ready');
    });
  }
});