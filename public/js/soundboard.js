(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $(function() {
    window.SoundBoardItem = Backbone.Model.extend();
    window.SoundBoardItems = Backbone.Collection.extend({
      model: SoundBoardItem,
      url: "/js/soundBoardItems.json"
    });
    window.soundBoardItems = new SoundBoardItems();
    window.SoundView = Backbone.View.extend({
      playAudio: function(e, id) {
        var $audioElement;
        if (id != null) {
          $audioElement = $("#" + id).find("audio");
        } else {
          $audioElement = $(this.el).find("audio");
        }
        return $audioElement[0].play();
      }
    });
    window.SoundBoardItemView = window.SoundView.extend({
      tagName: "li",
      template: _.template($('#soundBoardItemView').html()),
      events: {
        'click': 'playAudio'
      },
      initialize: function() {},
      render: function() {
        var renderedContent;
        renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        /*
              $(@el).find("audio").on "canplaythrough", =>
                $(@el).removeClass "loading"
              */
        return this;
      }
    });
    window.SoundBoardItemsView = window.SoundView.extend({
      tagName: "ul",
      id: "rap-board-list",
      collection: window.soundBoardItems,
      template: _.template(""),
      initialize: function() {
        _.bindAll(this, 'render');
        return this.collection.bind('reset', this.render);
      },
      keyPress: function(e) {
        var $listElement, collection, item, timeout, _i, _len, _ref, _results;
        collection = this.collection;
        _ref = this.collection.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(e.keyCode === item.attributes.keyCode ? (this.playAudio(null, item.cid), $listElement = $("#" + item.cid), $listElement.addClass("" + item.attributes.className + "-hover"), timeout = setTimeout(function() {
            return $listElement.removeClass("" + item.attributes.className + "-hover");
          }, 250)) : void 0);
        }
        return _results;
      },
      render: function() {
        var collection;
        collection = this.collection;
        $(this.el).html(this.template);
        $(document).on("keypress", __bind(function(e) {
          return this.keyPress(e);
        }, this));
        collection.each(function(item, i) {
          var audioFile, audioType, fileExtension, view, _i, _len, _ref;
          view = new SoundBoardItemView({
            model: item,
            id: item.cid,
            className: item.attributes.isNew ? "artists-" + item.attributes.className + " new" : "artists-" + item.attributes.className
          });
          _ref = item.attributes.audioFiles;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            audioFile = _ref[_i];
            fileExtension = /\.([^\.]+)$/;
            audioType = audioFile.match(fileExtension)[1];
            if (!(item.attributes.audioType != null)) {
              item.attributes.audioType = [];
            }
            if (item.attributes.audioType != null) {
              item.attributes.audioType.push(audioType);
            }
          }
          return $("#rap-board-list").append(view.render().el);
        });
        return this;
      }
    });
    window.App = Backbone.Router.extend({
      routes: {
        '': 'home',
        'bio': 'bio',
        'portfolio/:id': 'portfolio'
      },
      initialize: function() {
        return this.soundBoardItemsView = new SoundBoardItemsView();
      },
      home: function() {
        var $container;
        $container = $("#content");
        $container.prepend(app.soundBoardItemsView.render().el);
        return window.soundBoardItems.fetch({
          success: function() {
            return console.log("soundBoardItems.fetch() success");
          },
          failure: function() {
            return console.log("soundBoardItems.fetch() failure");
          }
        });
      }
    });
    return $(function() {
      window.app = new App();
      return Backbone.history.start();
    });
  });
}).call(this);