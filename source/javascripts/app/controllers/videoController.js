App.VideoController = Em.Controller.extend({});
App.videoController = Em.Controller.create({
  content: null,
  stat: null,

  loadVideo: function(x){
    this.content = null;
    this.set('stat', null);
    var self = this;
    $.ajax({
      type: 'post',
      url: App.connection.url,
      dataType: 'json',
      data: {
        method: 'videos.getInfo',
        params: {
          video_id: x
        }        
      },
      success: function(response){
        var buf = App.Video.create({
          id: response.video[0].id,
          //url: "http://player.vimeo.com/video/" + response.video[0].id,
          title: response.video[0].title,
          description: response.video[0].description,
          likes: response.video[0].number_of_likes,
          isLike: response.video[0].is_like
        });
        self.content = buf;
        self.set('stat', response.stat);    
        // self.set('id', response.video[0].id);
        // self.set('url', "http://player.vimeo.com/video/" + response.video[0].id);
        // self.set('title', response.video[0].title);
        // self.set('description', response.video[0].description);
        // self.set('likes', response.video[0].number_of_likes);
      }
    });
  },
  likeOrNot: function(){
    var self = this;
    if( this.content.get('isLike') == 0 ){
      $.ajax({
        type: 'post',
        url: App.connection.url,
        dataType: 'json',
        data: {
          method: 'videos.setLike',
          params: {
            video_id: this.content.id,
            like: true
          }        
        },
        success: function(response){
          console.log(response);
          if( response.stat == 'ok' ){
            self.content.set('isLike', 1);
          } else {
            alert('Ошибка!');
          }
        },
        error: function(){
          alert('Ошибка запроса!')
        }     
      });
    } else {
      $.ajax({
        type: 'post',
        url: App.connection.url,
        dataType: 'json',
        data: {
          method: 'videos.setLike',
          params: {
            video_id: this.content.id,
            like: false
          }        
        },
        success: function(response){
          console.log(response);
          if( response.stat == 'ok' ){
            self.content.set('isLike', 0);
          } else {
            alert('Ошибка!');
          }
        },
        error: function(){
          alert('Ошибка запроса!')
        }     
      });     
    }
  }
});