App.albumsController = Em.ArrayController.create({
  content: [],
  total: null,
  loadAlbums: function(){
    this.set('content', []);
    this.set('total', null);
    var self = this;
    $.post(App.connection.url, {method: 'albums.getAll', params: {user_id: App.connection.userId}}, function(response){
      self.set('total', response.albums.total);
      response.albums.album.forEach(function(item){
        var buf = App.AlbumInList.create({
          id: item.id,
          title: item.title,
          description: item.description,
          avatarUrl: item.thumbnail_video.thumbnails.thumbnail[1]._content        
        });
        self.pushObject(buf);
      });
    });
  }
});