App.videosController = Em.ArrayController.create({
  content: [],
  total: null,
  loadVideos: function(x){
    var self = this;
    self.set('content', []);
    self.set('total', null);
    $.ajax({
      type: 'post',
      url: App.connection.url,
      dataType: 'json',
      data: {
        method: 'albums.getVideos',
        params: {
          album_id: x,
          full_response: true
        }
      },
      success: function(response){
        self.set('total', response.videos.total);
        response.videos.video.forEach(function(video){
          var buf = App.Video.create({
            id: video.id,
            title: video.title,
            description: video.description,
            avatarUrl: video.thumbnails.thumbnail[1]._content,
            likes: video.number_of_likes            
          });
          self.pushObject(buf);
        });
      }
    });
  }
});