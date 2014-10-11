// Generated by CoffeeScript 1.6.1
(function() {

  describe("DiscussionThreadListView", function() {
    var checkThreadsOrdering, makeThreadWithProps, makeView, renderSingleThreadWithProps;
    beforeEach(function() {
      DiscussionSpecHelper.setUpGlobals();
      setFixtures("<script type=\"text/template\" id=\"thread-list-item-template\">\n  <li data-id=\"<%- id %>\" class=\"forum-nav-thread<% if (typeof(read) != \"undefined\" && !read) { %> is-unread<% } %>\">\n    <a href=\"#\" class=\"forum-nav-thread-link\">\n      <div class=\"forum-nav-thread-wrapper-1\">\n        <span class=\"forum-nav-thread-title\"><%- title %></span>\n        <%\n        var labels = \"\";\n        if (pinned) {\n            labels += '<li class=\"forum-nav-thread-label-pinned\"><i class=\"icon icon-pushpin\"></i>Pinned</li> ';\n        }\n        if (typeof(subscribed) != \"undefined\" && subscribed) {\n            labels += '<li class=\"forum-nav-thread-label-following\"><i class=\"icon icon-star\"></i>Following</li> ';\n        }\n        if (staff_authored) {\n            labels += '<li class=\"forum-nav-thread-label-staff\"><i class=\"icon icon-user\"></i>By: Staff</li> ';\n        }\n        if (community_ta_authored) {\n            labels += '<li class=\"forum-nav-thread-label-community-ta\"><i class=\"icon icon-user\"></i>By: Community TA</li> ';\n        }\n        if (labels != \"\") {\n            print('<ul class=\"forum-nav-thread-labels\">' + labels + '</ul>');\n        }\n        %>\n      </div><div class=\"forum-nav-thread-wrapper-2\">\n        <% if (endorsed) { %>\n          <span class=\"forum-nav-thread-endorsed\"><i class=\"icon icon-ok\"></i><span class=\"sr\">Endorsed response</span></span>\n        <% } %>\n        <span class=\"forum-nav-thread-votes-count\">+<%=\n            interpolate(\n                '%(votes_up_count)s%(span_sr_open)s votes %(span_close)s',\n                {'span_sr_open': '<span class=\"sr\">', 'span_close': '</span>', 'votes_up_count': votes['up_count']},\n                true\n                )\n        %></span>\n        <span class=\"forum-nav-thread-comments-count <% if (unread_comments_count > 0) { %>is-unread<% } %>\">\n            <%\n        var fmt;\n        var data = {\n            'span_sr_open': '<span class=\"sr\">',\n            'span_close': '</span>',\n            'unread_comments_count': unread_comments_count,\n            'comments_count': comments_count\n            };\n        if (unread_comments_count > 0) {\n            fmt = '%(comments_count)s %(span_sr_open)scomments (%(unread_comments_count)s unread comments)%(span_close)s';\n        } else {\n            fmt = '%(comments_count)s %(span_sr_open)scomments %(span_close)s';\n        }\n        print(interpolate(fmt, data, true));\n        %>\n        </span>\n      </div>\n    </a>\n  </li>\n</script>\n<script type=\"text/template\" id=\"thread-list-template\">\n    <div class=\"forum-nav-header\">\n        <a href=\"#\" class=\"forum-nav-browse\" aria-haspopup=\"true\">\n            <i class=\"icon icon-reorder\"></i>\n            <span class=\"sr\">Discussion topics; current selection is: </span>\n            <span class=\"forum-nav-browse-current\">All Discussions</span>\n            ▾\n        </a>\n        <form class=\"forum-nav-search\">\n            <label>\n                <span class=\"sr\">Search</span>\n                <input class=\"forum-nav-search-input\" type=\"text\" placeholder=\"Search all posts\">\n            </label>\n        </form>\n    </div>\n    <div class=\"forum-nav-browse-menu-wrapper\" style=\"display: none\">\n        <form class=\"forum-nav-browse-filter\">\n            <label>\n                <span class=\"sr\">Filter Topics</span>\n                <input type=\"text\" class=\"forum-nav-browse-filter-input\" placeholder=\"filter topics\">\n            </label>\n        </form>\n        <ul class=\"forum-nav-browse-menu\">\n            <li class=\"forum-nav-browse-menu-item forum-nav-browse-menu-all\">\n                <a href=\"#\" class=\"forum-nav-browse-title\">All Discussions</a>\n            </li>\n            <li class=\"forum-nav-browse-menu-item forum-nav-browse-menu-flagged\">\n                <a href=\"#\" class=\"forum-nav-browse-title\"><i class=\"icon icon-flag\"></i>Flagged Discussions</a>\n            </li>\n            <li class=\"forum-nav-browse-menu-item forum-nav-browse-menu-following\">\n                <a href=\"#\" class=\"forum-nav-browse-title\"><i class=\"icon icon-star\"></i>Posts I'm Following</a>\n            </li>\n            <li class=\"forum-nav-browse-menu-item\">\n                <a href=\"#\" class=\"forum-nav-browse-title\">Parent</a>\n                <ul class=\"forum-nav-browse-submenu\">\n                    <li class=\"forum-nav-browse-menu-item\">\n                        <a href=\"#\" class=\"forum-nav-browse-title\">Target</a>\n                        <ul class=\"forum-nav-browse-submenu\">\n                            <li\n                                class=\"forum-nav-browse-menu-item\"\n                                data-discussion-id='{\"sort_key\": null, \"id\": \"child\"}'\n                                data-cohorted=\"false\"\n                            >\n                                <a href=\"#\" class=\"forum-nav-browse-title\">Child</a>\n                            </li>\n                        </ul>\n                    <li\n                        class=\"forum-nav-browse-menu-item\"\n                        data-discussion-id='{\"sort_key\": null, \"id\": \"sibling\"}'\n                        data-cohorted=\"false\"\n                    >\n                        <a href=\"#\" class=\"forum-nav-browse-title\">Sibling</a>\n                    </li>\n                </ul>\n            </li>\n            <li\n                class=\"forum-nav-browse-menu-item\"\n                data-discussion-id='{\"sort_key\": null, \"id\": \"other\"}'\n                data-cohorted=\"false\"\n            >\n                <a href=\"#\" class=\"forum-nav-browse-title\">Other Category</a>\n            </li>\n        </ul>\n    </div>\n    <div class=\"forum-nav-thread-list-wrapper\">\n        <div class=\"forum-nav-refine-bar\">\n            <span class=\"forum-nav-sort\">\n                <select class=\"forum-nav-sort-control\">\n                    <option value=\"date\">by recent activity</option>\n                    <option value=\"comments\">by most activity</option>\n                    <option value=\"votes\">by most votes</option>\n                </select>\n            </span>\n        </div>\n    </div>\n    <div class=\"search-alerts\"></div>\n    <ul class=\"forum-nav-thread-list\"></ul>\n</script>\n<script aria-hidden=\"true\" type=\"text/template\" id=\"search-alert-template\">\n    <div class=\"search-alert\" id=\"search-alert-<%- cid %>\">\n        <div class=\"search-alert-content\">\n          <p class=\"message\"><%- message %></p>\n        </div>\n\n        <div class=\"search-alert-controls\">\n          <a href=\"#\" class=\"dismiss control control-dismiss\"><i class=\"icon icon-remove\"></i></a>\n        </div>\n    </div>\n</script>\n<div class=\"forum-nav\"></div>");
      this.threads = [
        makeThreadWithProps({
          id: "1",
          title: "Thread1",
          votes: {
            up_count: '20'
          },
          comments_count: 1,
          created_at: '2013-04-03T20:08:39Z'
        }), makeThreadWithProps({
          id: "2",
          title: "Thread2",
          votes: {
            up_count: '42'
          },
          comments_count: 2,
          created_at: '2013-04-03T20:07:39Z'
        }), makeThreadWithProps({
          id: "3",
          title: "Thread3",
          votes: {
            up_count: '12'
          },
          comments_count: 3,
          created_at: '2013-04-03T20:06:39Z'
        })
      ];
      spyOn($, "ajax");
      this.discussion = new Discussion([]);
      this.view = new DiscussionThreadListView({
        collection: this.discussion,
        el: $(".forum-nav")
      });
      return this.view.render();
    });
    makeThreadWithProps = function(props) {
      var thread;
      thread = {
        id: "dummy_id",
        pinned: false,
        endorsed: false,
        votes: {
          up_count: '0'
        },
        unread_comments_count: 0,
        comments_count: 0
      };
      return $.extend(thread, props);
    };
    renderSingleThreadWithProps = function(props) {
      return makeView(new Discussion([new Thread(makeThreadWithProps(props))])).render();
    };
    makeView = function(discussion) {
      return new DiscussionThreadListView({
        el: $(".forum-nav"),
        collection: discussion
      });
    };
    checkThreadsOrdering = function(view, sort_order, type) {
      expect(view.$el.find(".forum-nav-thread").children().length).toEqual(3);
      expect(view.$el.find(".forum-nav-thread:nth-child(1) .forum-nav-thread-title").text()).toEqual(sort_order[0]);
      expect(view.$el.find(".forum-nav-thread:nth-child(2) .forum-nav-thread-title").text()).toEqual(sort_order[1]);
      expect(view.$el.find(".forum-nav-thread:nth-child(3) .forum-nav-thread-title").text()).toEqual(sort_order[2]);
      return expect(view.$el.find(".forum-nav-sort-control").val()).toEqual(type);
    };
    describe("thread rendering should be correct", function() {
      var checkRender;
      checkRender = function(threads, type, sort_order) {
        var discussion, view;
        discussion = new Discussion(_.map(threads, function(thread) {
          return new Thread(thread);
        }), {
          pages: 1,
          sort: type
        });
        view = makeView(discussion);
        view.render();
        checkThreadsOrdering(view, sort_order, type);
        expect(view.$el.find(".forum-nav-thread-comments-count:visible").length).toEqual(type === "votes" ? 0 : 3);
        return expect(view.$el.find(".forum-nav-thread-votes-count:visible").length).toEqual(type === "votes" ? 3 : 0);
      };
      it("with sort preference date", function() {
        return checkRender(this.threads, "date", ["Thread1", "Thread2", "Thread3"]);
      });
      it("with sort preference votes", function() {
        return checkRender(this.threads, "votes", ["Thread2", "Thread1", "Thread3"]);
      });
      return it("with sort preference comments", function() {
        return checkRender(this.threads, "comments", ["Thread3", "Thread2", "Thread1"]);
      });
    });
    describe("Sort change should be correct", function() {
      var changeSorting;
      changeSorting = function(threads, selected_type, new_type, sort_order) {
        var discussion, sortControl, sorted_threads, view,
          _this = this;
        discussion = new Discussion(_.map(threads, function(thread) {
          return new Thread(thread);
        }), {
          pages: 1,
          sort: selected_type
        });
        view = makeView(discussion);
        view.render();
        sortControl = view.$el.find(".forum-nav-sort-control");
        expect(sortControl.val()).toEqual(selected_type);
        sorted_threads = [];
        if (new_type === 'date') {
          sorted_threads = [threads[0], threads[1], threads[2]];
        } else if (new_type === 'comments') {
          sorted_threads = [threads[2], threads[1], threads[0]];
        } else if (new_type === 'votes') {
          sorted_threads = [threads[1], threads[0], threads[2]];
        }
        $.ajax.andCallFake(function(params) {
          params.success({
            "discussion_data": sorted_threads,
            page: 1,
            num_pages: 1
          });
          return {
            always: function() {}
          };
        });
        sortControl.val(new_type).change();
        expect($.ajax).toHaveBeenCalled();
        return checkThreadsOrdering(view, sort_order, new_type);
      };
      it("with sort preference date", function() {
        return changeSorting(this.threads, "comments", "date", ["Thread1", "Thread2", "Thread3"]);
      });
      it("with sort preference votes", function() {
        return changeSorting(this.threads, "date", "votes", ["Thread2", "Thread1", "Thread3"]);
      });
      return it("with sort preference comments", function() {
        return changeSorting(this.threads, "votes", "comments", ["Thread3", "Thread2", "Thread1"]);
      });
    });
    describe("search alerts", function() {
      var testAlertMessages;
      testAlertMessages = function(expectedMessages) {
        return expect($(".search-alert .message").map(function() {
          return $(this).html();
        }).get()).toEqual(expectedMessages);
      };
      it("renders and removes search alerts", function() {
        var bar, foo;
        testAlertMessages([]);
        foo = this.view.addSearchAlert("foo");
        testAlertMessages(["foo"]);
        bar = this.view.addSearchAlert("bar");
        testAlertMessages(["foo", "bar"]);
        this.view.removeSearchAlert(foo.cid);
        testAlertMessages(["bar"]);
        this.view.removeSearchAlert(bar.cid);
        return testAlertMessages([]);
      });
      return it("clears all search alerts", function() {
        this.view.addSearchAlert("foo");
        this.view.addSearchAlert("bar");
        this.view.addSearchAlert("baz");
        testAlertMessages(["foo", "bar", "baz"]);
        this.view.clearSearchAlerts();
        return testAlertMessages([]);
      });
    });
    describe("search spell correction", function() {
      var testCorrection;
      beforeEach(function() {
        return spyOn(this.view, "searchForUser");
      });
      testCorrection = function(view, correctedText) {
        var _this = this;
        spyOn(view, "addSearchAlert");
        $.ajax.andCallFake(function(params) {
          params.success({
            discussion_data: [],
            page: 42,
            num_pages: 99,
            corrected_text: correctedText
          }, 'success');
          return {
            always: function() {}
          };
        });
        view.searchFor("dummy");
        return expect($.ajax).toHaveBeenCalled();
      };
      it("adds a search alert when an alternate term was searched", function() {
        testCorrection(this.view, "foo");
        expect(this.view.addSearchAlert.callCount).toEqual(1);
        return expect(this.view.addSearchAlert.mostRecentCall.args[0]).toMatch(/foo/);
      });
      it("does not add a search alert when no alternate term was searched", function() {
        testCorrection(this.view, null);
        expect(this.view.addSearchAlert.callCount).toEqual(1);
        return expect(this.view.addSearchAlert.mostRecentCall.args[0]).toMatch(/no threads matched/i);
      });
      it("clears search alerts when a new search is performed", function() {
        spyOn(this.view, "clearSearchAlerts");
        spyOn(DiscussionUtil, "safeAjax");
        this.view.searchFor("dummy");
        return expect(this.view.clearSearchAlerts).toHaveBeenCalled();
      });
      return it("clears search alerts when the underlying collection changes", function() {
        spyOn(this.view, "clearSearchAlerts");
        spyOn(this.view, "renderThread");
        this.view.collection.trigger("change", new Thread({
          id: 1
        }));
        return expect(this.view.clearSearchAlerts).toHaveBeenCalled();
      });
    });
    describe("username search", function() {
      var setAjaxResults;
      it("makes correct ajax calls", function() {
        var _this = this;
        $.ajax.andCallFake(function(params) {
          expect(params.data.username).toEqual("testing-username");
          expect(params.url.path()).toEqual(DiscussionUtil.urlFor("users"));
          params.success({
            users: []
          }, 'success');
          return {
            always: function() {}
          };
        });
        this.view.searchForUser("testing-username");
        return expect($.ajax).toHaveBeenCalled();
      });
      setAjaxResults = function(threadSuccess, userResult) {
        var _this = this;
        return $.ajax.andCallFake(function(params) {
          if (params.data.text && threadSuccess) {
            params.success({
              discussion_data: [],
              page: 42,
              num_pages: 99,
              corrected_text: "dummy"
            }, "success");
          } else if (params.data.username) {
            params.success({
              users: userResult
            }, "success");
          }
          return {
            always: function() {}
          };
        });
      };
      it("gets called after a thread search succeeds", function() {
        spyOn(this.view, "searchForUser").andCallThrough();
        setAjaxResults(true, []);
        this.view.searchFor("gizmo");
        expect(this.view.searchForUser).toHaveBeenCalled();
        return expect($.ajax.mostRecentCall.args[0].data.username).toEqual("gizmo");
      });
      it("does not get called after a thread search fails", function() {
        spyOn(this.view, "searchForUser").andCallThrough();
        setAjaxResults(false, []);
        this.view.searchFor("gizmo");
        return expect(this.view.searchForUser).not.toHaveBeenCalled();
      });
      it("adds a search alert when an username was matched", function() {
        spyOn(this.view, "addSearchAlert");
        setAjaxResults(true, [
          {
            username: "gizmo",
            id: "1"
          }
        ]);
        this.view.searchForUser("dummy");
        expect($.ajax).toHaveBeenCalled();
        expect(this.view.addSearchAlert).toHaveBeenCalled();
        return expect(this.view.addSearchAlert.mostRecentCall.args[0]).toMatch(/gizmo/);
      });
      return it("does not add a search alert when no username was matched", function() {
        spyOn(this.view, "addSearchAlert");
        setAjaxResults(true, []);
        this.view.searchForUser("dummy");
        expect($.ajax).toHaveBeenCalled();
        return expect(this.view.addSearchAlert).not.toHaveBeenCalled();
      });
    });
    describe("endorsed renders correctly", function() {
      it("when absent", function() {
        renderSingleThreadWithProps({});
        return expect($(".forum-nav-thread-endorsed").length).toEqual(0);
      });
      return it("when present", function() {
        renderSingleThreadWithProps({
          endorsed: true
        });
        return expect($(".forum-nav-thread-endorsed").length).toEqual(1);
      });
    });
    describe("post labels render correctly", function() {
      beforeEach(function() {
        this.moderatorId = "42";
        this.administratorId = "43";
        this.communityTaId = "44";
        return DiscussionUtil.loadRoles({
          "Moderator": [parseInt(this.moderatorId)],
          "Administrator": [parseInt(this.administratorId)],
          "Community TA": [parseInt(this.communityTaId)]
        });
      });
      it("for pinned", function() {
        renderSingleThreadWithProps({
          pinned: true
        });
        return expect($(".forum-nav-thread-label-pinned").length).toEqual(1);
      });
      it("for following", function() {
        renderSingleThreadWithProps({
          subscribed: true
        });
        return expect($(".forum-nav-thread-label-following").length).toEqual(1);
      });
      it("for moderator", function() {
        renderSingleThreadWithProps({
          user_id: this.moderatorId
        });
        return expect($(".forum-nav-thread-label-staff").length).toEqual(1);
      });
      it("for administrator", function() {
        renderSingleThreadWithProps({
          user_id: this.administratorId
        });
        return expect($(".forum-nav-thread-label-staff").length).toEqual(1);
      });
      it("for community TA", function() {
        renderSingleThreadWithProps({
          user_id: this.communityTaId
        });
        return expect($(".forum-nav-thread-label-community-ta").length).toEqual(1);
      });
      return it("when none should be present", function() {
        renderSingleThreadWithProps({});
        return expect($(".forum-nav-thread-labels").length).toEqual(0);
      });
    });
    return describe("browse menu", function() {
      var expectBrowseMenuVisible, setupAjax;
      setupAjax = function(callback) {
        var _this = this;
        return $.ajax.andCallFake(function(params) {
          if (callback) {
            callback(params);
          }
          params.success({
            discussion_data: [],
            page: 1,
            num_pages: 1
          });
          return {
            always: function() {}
          };
        });
      };
      afterEach(function() {
        return $("body").unbind("click");
      });
      expectBrowseMenuVisible = function(isVisible) {
        expect($(".forum-nav-browse-menu:visible").length).toEqual(isVisible ? 1 : 0);
        return expect($(".forum-nav-thread-list-wrapper:visible").length).toEqual(isVisible ? 0 : 1);
      };
      it("should not be visible by default", function() {
        return expectBrowseMenuVisible(false);
      });
      it("should show when header button is clicked", function() {
        $(".forum-nav-browse").click();
        return expectBrowseMenuVisible(true);
      });
      describe("when shown", function() {
        beforeEach(function() {
          return $(".forum-nav-browse").click();
        });
        it("should hide when header button is clicked", function() {
          $(".forum-nav-browse").click();
          return expectBrowseMenuVisible(false);
        });
        it("should hide when a click outside the menu occurs", function() {
          $(".forum-nav-search-input").click();
          return expectBrowseMenuVisible(false);
        });
        it("should hide when a search is executed", function() {
          setupAjax();
          $(".forum-nav-search-input").trigger($.Event("keydown", {
            which: 13
          }));
          return expectBrowseMenuVisible(false);
        });
        it("should hide when a category is clicked", function() {
          $(".forum-nav-browse-title")[0].click();
          return expectBrowseMenuVisible(false);
        });
        it("should still be shown when filter input is clicked", function() {
          $(".forum-nav-browse-filter-input").click();
          return expectBrowseMenuVisible(true);
        });
        return describe("filtering", function() {
          var checkFilter;
          checkFilter = function(filterText, expectedItems) {
            var visibleItems;
            $(".forum-nav-browse-filter-input").val(filterText).keyup();
            visibleItems = $(".forum-nav-browse-title:visible").map(function(i, elem) {
              return $(elem).text();
            }).get();
            return expect(visibleItems).toEqual(expectedItems);
          };
          it("should be case-insensitive", function() {
            return checkFilter("flagged", ["Flagged Discussions"]);
          });
          it("should match partial words", function() {
            return checkFilter("ateg", ["Other Category"]);
          });
          it("should show ancestors and descendants of matches", function() {
            return checkFilter("Target", ["Parent", "Target", "Child"]);
          });
          it("should handle multiple words regardless of order", function() {
            return checkFilter("Following Posts", ["Posts I'm Following"]);
          });
          return it("should handle multiple words in different depths", function() {
            return checkFilter("Parent Child", ["Parent", "Target", "Child"]);
          });
        });
      });
      return describe("selecting an item", function() {
        var testSelectionRequest;
        it("should clear the search box", function() {
          setupAjax();
          $(".forum-nav-search-input").val("foobar");
          $(".forum-nav-browse-menu-following .forum-nav-browse-title").click();
          return expect($(".forum-nav-search-input").val()).toEqual("");
        });
        it("should change the button text", function() {
          setupAjax();
          $(".forum-nav-browse-menu-following .forum-nav-browse-title").click();
          return expect($(".forum-nav-browse-current").text()).toEqual("Posts I'm Following");
        });
        testSelectionRequest = function(callback, itemText) {
          setupAjax(callback);
          return $(".forum-nav-browse-title:contains(" + itemText + ")").click();
        };
        it("should get all discussions", function() {
          return testSelectionRequest(function(params) {
            return expect(params.url.path()).toEqual(DiscussionUtil.urlFor("threads"));
          }, "All");
        });
        it("should get flagged threads", function() {
          return testSelectionRequest(function(params) {
            expect(params.url.path()).toEqual(DiscussionUtil.urlFor("search"));
            return expect(params.data.flagged).toEqual(true);
          }, "Flagged");
        });
        it("should get followed threads", function() {
          return testSelectionRequest(function(params) {
            return expect(params.url.path()).toEqual(DiscussionUtil.urlFor("followed_threads", window.user.id));
          }, "Following");
        });
        it("should get threads for the selected leaf", function() {
          return testSelectionRequest(function(params) {
            expect(params.url.path()).toEqual(DiscussionUtil.urlFor("search"));
            return expect(params.data.commentable_ids).toEqual("child");
          }, "Child");
        });
        return it("should get threads for children of the selected intermediate node", function() {
          return testSelectionRequest(function(params) {
            expect(params.url.path()).toEqual(DiscussionUtil.urlFor("search"));
            return expect(params.data.commentable_ids).toEqual("child,sibling");
          }, "Parent");
        });
      });
    });
  });

}).call(this);
