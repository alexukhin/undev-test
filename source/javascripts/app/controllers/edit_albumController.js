App.Edit_albumController = Em.Controller.extend({});
App.edit_albumController = Em.Controller.create({
  content: null,
  title: null,
  description: null,
  editInfo: function(){
    var self = this;
    if(this.title != this.content.title && this.title){
      $.ajax({
        type: 'post',
        url: App.connection.url,
        dataType: 'json',
        data: {
          method: 'albums.setTitle',
          params: {
            album_id: self.content.id,
            title: self.content.title
          }
        },
        success: function(response){
          if(response.stat == 'ok'){
            alert('Альбом переименован!');
          }
          if(response.stat == 'false'){
            alert('Вы ввели неверное название!');
          }
        },
        error: function(){
          alert('Ошибка соединения!');
        }
      });
    }
    if(this.description != this.content.description){
      $.ajax({
        type: 'post',
        url: App.connection.url,
        dataType: 'json',
        data: {
          method: 'albums.setDescription',
          params: {
            album_id: self.content.id,
            description: self.content.description
          }
        },
        success: function(response){
          if(response.stat == 'ok'){
            alert('Описаное отредактировано!');
          }
          if(response.stat == 'false'){
            alert('Вы ввели неверное описание');
          }
        },
        error: function(){
          alert('Ошибка соединения!');
        }
      });
    }
  }
});