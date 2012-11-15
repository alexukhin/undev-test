App.Video = Em.Object.extend({
  id: null,
  title: null,
  description: null,
  avatarUrl: null,
  likes: null,
  url: function(){
    return "http://player.vimeo.com/video/" + this.get('id') + "?api=1;title=0;byline=0;portrait=0;";
  }.property('id')
});