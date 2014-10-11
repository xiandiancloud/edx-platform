// Generated by CoffeeScript 1.6.1
(function() {
  var _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof Backbone !== "undefined" && Backbone !== null) {
    this.DiscussionModuleView = (function(_super) {

      __extends(DiscussionModuleView, _super);

      function DiscussionModuleView() {
        var _this = this;
        this.navigateToPage = function(event) {
          return DiscussionModuleView.prototype.navigateToPage.apply(_this, arguments);
        };
        this.renderPagination = function(numPages) {
          return DiscussionModuleView.prototype.renderPagination.apply(_this, arguments);
        };
        this.addThread = function(thread, collection, options) {
          return DiscussionModuleView.prototype.addThread.apply(_this, arguments);
        };
        this.renderDiscussion = function($elem, response, textStatus, discussionId) {
          return DiscussionModuleView.prototype.renderDiscussion.apply(_this, arguments);
        };
        this.loadPage = function($elem, error) {
          return DiscussionModuleView.prototype.loadPage.apply(_this, arguments);
        };
        this.toggleDiscussion = function(event) {
          return DiscussionModuleView.prototype.toggleDiscussion.apply(_this, arguments);
        };
        this.hideDiscussion = function() {
          return DiscussionModuleView.prototype.hideDiscussion.apply(_this, arguments);
        };
        this.toggleNewPost = function(event) {
          return DiscussionModuleView.prototype.toggleNewPost.apply(_this, arguments);
        };
        return DiscussionModuleView.__super__.constructor.apply(this, arguments);
      }

      DiscussionModuleView.prototype.events = {
        "click .discussion-show": "toggleDiscussion",
        "keydown .discussion-show": function(event) {
          return DiscussionUtil.activateOnSpace(event, this.toggleDiscussion);
        },
        "click .new-post-btn": "toggleNewPost",
        "keydown .new-post-btn": function(event) {
          return DiscussionUtil.activateOnSpace(event, this.toggleNewPost);
        },
        "click .new-post-cancel": "hideNewPost",
        "click .discussion-paginator a": "navigateToPage"
      };

      DiscussionModuleView.prototype.paginationTemplate = function() {
        return DiscussionUtil.getTemplate("_pagination");
      };

      DiscussionModuleView.prototype.page_re = /\?discussion_page=(\d+)/;

      DiscussionModuleView.prototype.initialize = function() {
        var match;
        this.toggleDiscussionBtn = this.$(".discussion-show");
        match = this.page_re.exec(window.location.href);
        if (match) {
          return this.page = parseInt(match[1]);
        } else {
          return this.page = 1;
        }
      };

      DiscussionModuleView.prototype.toggleNewPost = function(event) {
        event.preventDefault();
        if (!this.newPostForm) {
          this.toggleDiscussion();
          this.isWaitingOnNewPost = true;
          return;
        }
        if (this.showed) {
          this.newPostForm.slideDown(300);
        } else {
          this.newPostForm.show();
        }
        this.toggleDiscussionBtn.addClass('shown');
        this.toggleDiscussionBtn.find('.button-text').html(gettext("Hide Discussion"));
        this.$("section.discussion").slideDown();
        return this.showed = true;
      };

      DiscussionModuleView.prototype.hideNewPost = function(event) {
        event.preventDefault();
        return this.newPostForm.slideUp(300);
      };

      DiscussionModuleView.prototype.hideDiscussion = function() {
        this.$("section.discussion").slideUp();
        this.toggleDiscussionBtn.removeClass('shown');
        this.toggleDiscussionBtn.find('.button-text').html(gettext("Show Discussion"));
        return this.showed = false;
      };

      DiscussionModuleView.prototype.toggleDiscussion = function(event) {
        var $elem,
          _this = this;
        if (this.showed) {
          return this.hideDiscussion();
        } else {
          this.toggleDiscussionBtn.addClass('shown');
          this.toggleDiscussionBtn.find('.button-text').html(gettext("Hide Discussion"));
          if (this.retrieved) {
            this.$("section.discussion").slideDown();
            return this.showed = true;
          } else {
            $elem = this.toggleDiscussionBtn;
            return this.loadPage($elem, function() {
              _this.hideDiscussion();
              return DiscussionUtil.discussionAlert(gettext("Sorry"), gettext("We had some trouble loading the discussion. Please try again."));
            });
          }
        }
      };

      DiscussionModuleView.prototype.loadPage = function($elem, error) {
        var discussionId, url,
          _this = this;
        discussionId = this.$el.data("discussion-id");
        url = DiscussionUtil.urlFor('retrieve_discussion', discussionId) + ("?page=" + this.page);
        return DiscussionUtil.safeAjax({
          $elem: $elem,
          $loading: $elem,
          takeFocus: true,
          url: url,
          type: "GET",
          dataType: 'json',
          success: function(response, textStatus, jqXHR) {
            return _this.renderDiscussion($elem, response, textStatus, discussionId);
          },
          error: error
        });
      };

      DiscussionModuleView.prototype.renderDiscussion = function($elem, response, textStatus, discussionId) {
        var $discussion, user;
        $elem.focus();
        user = new DiscussionUser(response.user_info);
        window.user = user;
        DiscussionUtil.setUser(user);
        Content.loadContentInfos(response.annotated_content_info);
        DiscussionUtil.loadRoles(response.roles);
        this.course_settings = new DiscussionCourseSettings(response.course_settings);
        this.discussion = new Discussion();
        this.discussion.reset(response.discussion_data, {
          silent: false
        });
        $discussion = $(Mustache.render($("script#_inline_discussion").html(), {
          'threads': response.discussion_data,
          'discussionId': discussionId
        }));
        if (this.$('section.discussion').length) {
          this.$('section.discussion').replaceWith($discussion);
        } else {
          this.$el.append($discussion);
        }
        this.newPostForm = $('.new-post-article');
        this.threadviews = this.discussion.map(function(thread) {
          return new DiscussionThreadInlineView({
            el: this.$("article#thread_" + thread.id),
            model: thread
          });
        });
        _.each(this.threadviews, function(dtv) {
          return dtv.render();
        });
        DiscussionUtil.bulkUpdateContentInfo(window.$$annotated_content_info);
        this.newPostView = new NewPostView({
          el: this.newPostForm,
          collection: this.discussion,
          course_settings: this.course_settings,
          topicId: discussionId
        });
        this.newPostView.render();
        this.discussion.on("add", this.addThread);
        this.retrieved = true;
        this.showed = true;
        this.renderPagination(response.num_pages);
        if (this.isWaitingOnNewPost) {
          return this.newPostForm.show();
        }
      };

      DiscussionModuleView.prototype.addThread = function(thread, collection, options) {
        var article, threadView;
        article = $("<article class='discussion-thread' id='thread_" + thread.id + "'></article>");
        this.$('section.discussion > .threads').prepend(article);
        threadView = new DiscussionThreadInlineView({
          el: article,
          model: thread
        });
        threadView.render();
        return this.threadviews.unshift(threadView);
      };

      DiscussionModuleView.prototype.renderPagination = function(numPages) {
        var pageUrl, params, thing;
        pageUrl = function(number) {
          return "?discussion_page=" + number;
        };
        params = DiscussionUtil.getPaginationParams(this.page, numPages, pageUrl);
        thing = Mustache.render(this.paginationTemplate(), params);
        return this.$('section.pagination').html(thing);
      };

      DiscussionModuleView.prototype.navigateToPage = function(event) {
        var currPage,
          _this = this;
        event.preventDefault();
        window.history.pushState({}, window.document.title, event.target.href);
        currPage = this.page;
        this.page = $(event.target).data('page-number');
        return this.loadPage($(event.target), function() {
          _this.page = currPage;
          return DiscussionUtil.discussionAlert(gettext("Sorry"), gettext("We had some trouble loading the threads you requested. Please try again."));
        });
      };

      return DiscussionModuleView;

    })(Backbone.View);
  }

}).call(this);
