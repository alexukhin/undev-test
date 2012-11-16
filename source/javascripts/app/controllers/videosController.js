App.VideosController = Em.ArrayController.extend({});
App.videosController = Em.ArrayController.create({
  content: [],
  total: null,
  albumId: null,
  newVideoId: null,
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
        self.set('albumId', x);
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
  },
  addVideo: function(){
    var self = this;
    if(self.newVideoId){
      $.ajax({
        type: 'post',
        url: App.connection.url,
        dataType: 'json',
        data: {
          method: 'albums.addVideo',
          params: {
            album_id: self.albumId,
            video_id: self.newVideoId
          }
        },
        success: function(response){
          if(response.stat == 'ok'){
            $.ajax({
              type: 'post',
              url: App.connection.url,
              dataType: 'json',
              data: {
                method: 'videos.getInfo',
                params: {
                  video_id: self.newVideoId
                }
              },
              success: function(response){
                self.unshiftObject(App.Video.create({
                  id: response.video[0].id,
                  title: response.video[0].title,
                  description: response.video[0].description,
                  avatarUrl: response.video[0].thumbnails.thumbnail[1]._content,
                  likes: response.video[0].number_of_likes                    
                }));
                self.set('newVideoId', null);
                var total = parseInt(self.total) + 1;
                self.set('total', total.toString() );
              },
              error: function(){
                var total = parseInt(self.total) + 1;
                self.set('total', total.toString() );
                alert('Видео загружено, но информацию о нем не удалось получить!');
              }             
            });
          }
          if(response.stat == 'fail'){
            alert('Ошибка запроса!');
          }
        }     
      });
    }
  },
  removeVideo: function(x){
    var self = this;
    var videoId = x.context.id;
    $.ajax({
      type: 'post',
      url: App.connection.url,
      dataType: 'json',
      data: {
        method: 'albums.removeVideo',
        params: {
          video_id: videoId,
          album_id: self.albumId
        }
      },
      success: function(response){
        if(response.stat == 'ok'){
          self.removeObject(x.context);
          self.set('total', self.total - 1);          
        }
        if(response.stat == 'fail'){
          alert('Ошибка!');
        }
      },
      error: function(){
        alert('Ошибка запроса!');
      }
    });
  }
});