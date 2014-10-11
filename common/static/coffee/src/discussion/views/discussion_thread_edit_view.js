// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof Backbone !== "undefined" && Backbone !== null) {
    this.DiscussionThreadEditView = (function(_super) {

      __extends(DiscussionThreadEditView, _super);

      function DiscussionThreadEditView() {
        return DiscussionThreadEditView.__super__.constructor.apply(this, arguments);
      }

      DiscussionThreadEditView.prototype.events = {
        "click .post-update": "update",
        "click .post-cancel": "cancel_edit"
      };

      DiscussionThreadEditView.prototype.$ = function(selector) {
        return this.$el.find(selector);
      };

      DiscussionThreadEditView.prototype.initialize = function() {
        return DiscussionThreadEditView.__super__.initialize.call(this);
      };

      DiscussionThreadEditView.prototype.render = function() {
        this.template = _.template($("#thread-edit-template").html());
        this.$el.html(this.template(this.model.toJSON()));
        this.delegateEvents();
        DiscussionUtil.makeWmdEditor(this.$el, $.proxy(this.$, this), "edit-post-body");
        return this;
      };

      DiscussionThreadEditView.prototype.update = function(event) {
        return this.trigger("thread:update", event);
      };

      DiscussionThreadEditView.prototype.cancel_edit = function(event) {
        return this.trigger("thread:cancel_edit", event);
      };

      return DiscussionThreadEditView;

    })(Backbone.View);
  }

}).call(this);
