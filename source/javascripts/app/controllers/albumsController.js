App.albumsController = Em.ArrayController.create({
  content: [],
  total: null,
  newAlbumName: null,
  newAlbumVideo: null,
  newAlbumDescription: '',
  loadAlbums: function(){
    this.set('content', []);
    this.set('total', null);
    var self = this;
    $.ajax({
      type: 'post',
      url: App.connection.url,
      dataType: 'json',
      data: {
        method: 'albums.getAll',
        params: {
          user_id: App.connection.userId
        }
      },
      success: function(response){
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
      }
    });
    // $.post(App.connection.url, {method: 'albums.getAll', params: {user_id: App.connection.userId}}, function(response){
    //   self.set('total', response.albums.total);
    //   response.albums.album.forEach(function(item){
    //     var buf = App.AlbumInList.create({
    //       id: item.id,
    //       title: item.title,
    //       description: item.description,
    //       avatarUrl: item.thumbnail_video.thumbnails.thumbnail[1]._content        
    //     });
    //     self.pushObject(buf);
    //   });
    // });
  },
  removeAlbum: function(x){
    var self = this;
    var videoId = x.context.id;
    $.ajax({
      type: 'post',
      url: App.connection.url,
      dataType: 'json',
      data: {
        method: 'albums.delete',
        params: {
          album_id: videoId
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
  },
  addAlbum: function(){
    var self = this;
    $.ajax({
      type: 'post',
      url: App.connection.url,
      dataType: 'json',
      data: {
        method: 'albums.create',
        params: {
          title: self.newAlbumName,
          video_id: self.newAlbumVideo,
          description: self.newAlbumDescription
        }
      },
      success: function(response){
        if(response.stat == 'ok'){
          // self.clearNewAlbumInfo();
          // self.loadAlbums();
          var album_id = response.album[0].id;
          $.ajax({
            type: 'post',
            url: App.connection.url,
            dataType: 'json',
            data: {
              method: 'videos.getInfo',
              params: {
                video_id: self.newAlbumVideo
              }        
            },
            success: function(response){
              if(response.stat == 'ok'){
                var avatarUrl = response.video[0].thumbnails.thumbnail[1]._content;
                self.unshiftObject(App.AlbumInList.create({
                  id: album_id,
                  title: self.newAlbumName,
                  description: self.newAlbumDescription,
                  avatarUrl: avatarUrl                   
                }));
                self.clearNewAlbumInfo();
                var total = parseInt(self.total) + 1;
                self.set('total', total.toString() );
              }
              if(response.stat == 'fail'){
                self.clearNewAlbumInfo();
                var total = parseInt(self.total) + 1;
                self.set('total', total.toString() );
                alert('Альбом был добавлен, но не удалось получить информацию о нем!');
              }
            },
            error: function(){
              self.clearNewAlbumInfo();
              var total = parseInt(self.total) + 1;
              self.set('total', total.toString() );        
              alert('Альбом был добавлен, но не удалось получить информацию о нем!');
            }       
          });
        }
        if(response.stat == 'fail'){
          alert('Ошибка');
        }
      },
      error: function(){
        alert('Ошибка запроса!')
      }
    });
  },
  clearNewAlbumInfo: function(){
    this.set('newAlbumVideo', null);
    this.set('newAlbumName', null);
    this.set('newAlbumDescription', '');    
  }
});