// Generated by CoffeeScript 1.6.1
(function() {
  var _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (typeof Backbone !== "undefined" && Backbone !== null) {
    this.DiscussionContentView = (function(_super) {

      __extends(DiscussionContentView, _super);

      function DiscussionContentView() {
        var _this = this;
        this.unvote = function() {
          return DiscussionContentView.prototype.unvote.apply(_this, arguments);
        };
        this.vote = function() {
          return DiscussionContentView.prototype.vote.apply(_this, arguments);
        };
        this.toggleVote = function(event) {
          return DiscussionContentView.prototype.toggleVote.apply(_this, arguments);
        };
        this.renderVote = function() {
          return DiscussionContentView.prototype.renderVote.apply(_this, arguments);
        };
        this.unFlagAbuse = function() {
          return DiscussionContentView.prototype.unFlagAbuse.apply(_this, arguments);
        };
        this.flagAbuse = function() {
          return DiscussionContentView.prototype.flagAbuse.apply(_this, arguments);
        };
        this.toggleFlagAbuse = function(event) {
          return DiscussionContentView.prototype.toggleFlagAbuse.apply(_this, arguments);
        };
        this.toggleFollowing = function(event) {
          return DiscussionContentView.prototype.toggleFollowing.apply(_this, arguments);
        };
        this.setWmdContent = function(cls_identifier, text) {
          return DiscussionContentView.prototype.setWmdContent.apply(_this, arguments);
        };
        this.getWmdContent = function(cls_identifier) {
          return DiscussionContentView.prototype.getWmdContent.apply(_this, arguments);
        };
        this.getWmdEditor = function(cls_identifier) {
          return DiscussionContentView.prototype.getWmdEditor.apply(_this, arguments);
        };
        this.makeWmdEditor = function(cls_identifier) {
          return DiscussionContentView.prototype.makeWmdEditor.apply(_this, arguments);
        };
        return DiscussionContentView.__super__.constructor.apply(this, arguments);
      }

      DiscussionContentView.prototype.events = {
        "click .discussion-flag-abuse": "toggleFlagAbuse",
        "keydown .discussion-flag-abuse": function(event) {
          return DiscussionUtil.activateOnSpace(event, this.toggleFlagAbuse);
        }
      };

      DiscussionContentView.prototype.attrRenderer = {
        endorsed: function(endorsed) {
          var _ref;
          if (endorsed) {
            return this.$(".action-endorse").show().addClass("is-endorsed");
          } else {
            if ((_ref = this.model.get('ability')) != null ? _ref.can_endorse : void 0) {
              this.$(".action-endorse").show();
            } else {
              this.$(".action-endorse").hide();
            }
            return this.$(".action-endorse").removeClass("is-endorsed");
          }
        },
        closed: function(closed) {
          if (!this.$(".action-openclose").length) {
            return;
          }
          if (!this.$(".post-status-closed").length) {
            return;
          }
          if (closed) {
            this.$(".post-status-closed").show();
            this.$(".action-openclose").html(this.$(".action-openclose").html().replace(gettext("Close"), gettext("Open")));
            return this.$(".discussion-reply-new").hide();
          } else {
            this.$(".post-status-closed").hide();
            this.$(".action-openclose").html(this.$(".action-openclose").html().replace(gettext("Open"), gettext("Close")));
            return this.$(".discussion-reply-new").show();
          }
        },
        voted: function(voted) {},
        votes_point: function(votes_point) {},
        comments_count: function(comments_count) {},
        subscribed: function(subscribed) {
          if (subscribed) {
            return this.$(".dogear").addClass("is-followed").attr("aria-checked", "true");
          } else {
            return this.$(".dogear").removeClass("is-followed").attr("aria-checked", "false");
          }
        },
        ability: function(ability) {
          var action, selector, _ref, _results;
          _ref = this.abilityRenderer;
          _results = [];
          for (action in _ref) {
            selector = _ref[action];
            if (!ability[action]) {
              _results.push(selector.disable.apply(this));
            } else {
              _results.push(selector.enable.apply(this));
            }
          }
          return _results;
        }
      };

      DiscussionContentView.prototype.abilityRenderer = {
        editable: {
          enable: function() {
            return this.$(".action-edit").closest("li").show();
          },
          disable: function() {
            return this.$(".action-edit").closest("li").hide();
          }
        },
        can_delete: {
          enable: function() {
            return this.$(".action-delete").closest("li").show();
          },
          disable: function() {
            return this.$(".action-delete").closest("li").hide();
          }
        },
        can_endorse: {
          enable: function() {
            return this.$(".action-endorse").show().css("cursor", "auto");
          },
          disable: function() {
            this.$(".action-endorse").css("cursor", "default");
            if (!this.model.get('endorsed')) {
              return this.$(".action-endorse").hide();
            } else {
              return this.$(".action-endorse").show();
            }
          }
        },
        can_openclose: {
          enable: function() {
            return this.$(".action-openclose").closest("li").show();
          },
          disable: function() {
            return this.$(".action-openclose").closest("li").hide();
          }
        }
      };

      DiscussionContentView.prototype.renderPartialAttrs = function() {
        var attr, value, _ref, _results;
        _ref = this.model.changedAttributes();
        _results = [];
        for (attr in _ref) {
          value = _ref[attr];
          if (this.attrRenderer[attr]) {
            _results.push(this.attrRenderer[attr].apply(this, [value]));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      DiscussionContentView.prototype.renderAttrs = function() {
        var attr, value, _ref, _results;
        _ref = this.model.attributes;
        _results = [];
        for (attr in _ref) {
          value = _ref[attr];
          if (this.attrRenderer[attr]) {
            _results.push(this.attrRenderer[attr].apply(this, [value]));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      DiscussionContentView.prototype.$ = function(selector) {
        return this.$local.find(selector);
      };

      DiscussionContentView.prototype.initLocal = function() {
        this.$local = this.$el.children(".local");
        if (!this.$local.length) {
          this.$local = this.$el;
        }
        return this.$delegateElement = this.$local;
      };

      DiscussionContentView.prototype.makeWmdEditor = function(cls_identifier) {
        if (!this.$el.find(".wmd-panel").length) {
          return DiscussionUtil.makeWmdEditor(this.$el, $.proxy(this.$, this), cls_identifier);
        }
      };

      DiscussionContentView.prototype.getWmdEditor = function(cls_identifier) {
        return DiscussionUtil.getWmdEditor(this.$el, $.proxy(this.$, this), cls_identifier);
      };

      DiscussionContentView.prototype.getWmdContent = function(cls_identifier) {
        return DiscussionUtil.getWmdContent(this.$el, $.proxy(this.$, this), cls_identifier);
      };

      DiscussionContentView.prototype.setWmdContent = function(cls_identifier, text) {
        return DiscussionUtil.setWmdContent(this.$el, $.proxy(this.$, this), cls_identifier, text);
      };

      DiscussionContentView.prototype.initialize = function() {
        this.initLocal();
        return this.model.bind('change', this.renderPartialAttrs, this);
      };

      DiscussionContentView.prototype.toggleFollowing = function(event) {
        var $elem, url;
        event.preventDefault();
        $elem = $(event.target);
        url = null;
        if (!this.model.get('subscribed')) {
          this.model.follow();
          url = this.model.urlFor("follow");
        } else {
          this.model.unfollow();
          url = this.model.urlFor("unfollow");
        }
        return DiscussionUtil.safeAjax({
          $elem: $elem,
          url: url,
          type: "POST"
        });
      };

      DiscussionContentView.prototype.toggleFlagAbuse = function(event) {
        var _ref;
        event.preventDefault();
        if ((_ref = window.user.id, __indexOf.call(this.model.get("abuse_flaggers"), _ref) >= 0) || (DiscussionUtil.isFlagModerator && this.model.get("abuse_flaggers").length > 0)) {
          return this.unFlagAbuse();
        } else {
          return this.flagAbuse();
        }
      };

      DiscussionContentView.prototype.flagAbuse = function() {
        var url,
          _this = this;
        url = this.model.urlFor("flagAbuse");
        return DiscussionUtil.safeAjax({
          $elem: this.$(".discussion-flag-abuse"),
          url: url,
          type: "POST",
          success: function(response, textStatus) {
            var temp_array;
            if (textStatus === 'success') {
              /*
              note, we have to clone the array in order to trigger a change event
              */

              temp_array = _.clone(_this.model.get('abuse_flaggers'));
              temp_array.push(window.user.id);
              return _this.model.set('abuse_flaggers', temp_array);
            }
          }
        });
      };

      DiscussionContentView.prototype.unFlagAbuse = function() {
        var url,
          _this = this;
        url = this.model.urlFor("unFlagAbuse");
        return DiscussionUtil.safeAjax({
          $elem: this.$(".discussion-flag-abuse"),
          url: url,
          type: "POST",
          success: function(response, textStatus) {
            var temp_array;
            if (textStatus === 'success') {
              temp_array = _.clone(_this.model.get('abuse_flaggers'));
              temp_array.pop(window.user.id);
              if (DiscussionUtil.isFlagModerator) {
                temp_array = [];
              }
              return _this.model.set('abuse_flaggers', temp_array);
            }
          }
        });
      };

      DiscussionContentView.prototype.renderVote = function() {
        var button, buttonText, buttonTextFmt, voteNum, voted;
        button = this.$el.find(".vote-btn");
        voted = window.user.voted(this.model);
        voteNum = this.model.get("votes")["up_count"];
        button.toggleClass("is-cast", voted);
        button.attr("aria-pressed", voted);
        button.attr("data-tooltip", voted ? gettext("remove vote") : gettext("vote"));
        buttonTextFmt = voted ? ngettext("vote (click to remove your vote)", "votes (click to remove your vote)", voteNum) : ngettext("vote (click to vote)", "votes (click to vote)", voteNum);
        buttonTextFmt = "%(voteNum)s%(startSrSpan)s " + buttonTextFmt + "%(endSrSpan)s";
        buttonText = interpolate(buttonTextFmt, {
          voteNum: voteNum,
          startSrSpan: "<span class='sr'>",
          endSrSpan: "</span>"
        }, true);
        return button.html("<span class='plus-icon'/>" + buttonText);
      };

      DiscussionContentView.prototype.toggleVote = function(event) {
        event.preventDefault();
        if (window.user.voted(this.model)) {
          return this.unvote();
        } else {
          return this.vote();
        }
      };

      DiscussionContentView.prototype.vote = function() {
        var url,
          _this = this;
        window.user.vote(this.model);
        url = this.model.urlFor("upvote");
        return DiscussionUtil.safeAjax({
          $elem: this.$el.find(".vote-btn"),
          url: url,
          type: "POST",
          success: function(response, textStatus) {
            if (textStatus === 'success') {
              return _this.model.set(response);
            }
          }
        });
      };

      DiscussionContentView.prototype.unvote = function() {
        var url,
          _this = this;
        window.user.unvote(this.model);
        url = this.model.urlFor("unvote");
        return DiscussionUtil.safeAjax({
          $elem: this.$el.find(".vote-btn"),
          url: url,
          type: "POST",
          success: function(response, textStatus) {
            if (textStatus === 'success') {
              return _this.model.set(response);
            }
          }
        });
      };

      return DiscussionContentView;

    })(Backbone.View);
  }

}).call(this);
