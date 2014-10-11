// Generated by CoffeeScript 1.6.1
(function() {

  describe("NewPostView", function() {
    beforeEach(function() {
      setFixtures("<article class=\"new-post-article\" style=\"display: block;\">\n    <div class=\"inner-wrapper\">\n        <form class=\"new-post-form\">\n            <div class=\"left-column\" >\n            </div>\n        </form>\n    </div>\n</article>\n\n<script aria-hidden=\"true\" type=\"text/template\" id=\"new-post-tab-template\">\n    <div class=\"inner-wrapper\">\n        <form class=\"new-post-form\">\n            <div class=\"left-column\">\n                '<%= topic_dropdown_html %>\n                '<%= options_html %>'\n            </div>\n        </form>\n    </div>\n</script>\n\n<script aria-hidden=\"true\" type=\"text/template\" id=\"new-post-inline-template\">\n    <div class=\"inner-wrapper\">\n        <div class=\"new-post-form-errors\">\n        </div>\n        <form class=\"new-post-form\">\n            <%= editor_html %>\n            <%= options_html %>\n        </form>\n    </div>\n</script>\n\n<script aria-hidden=\"true\" type=\"text/template\" id=\"new-post-menu-entry-template\">\n    <li role=\"menuitem\"><a href=\"#\" class=\"topic\" data-discussion_id=\"<%- id %>\" aria-describedby=\"topic-name-span-<%- id %>\" cohorted=\"<%- is_cohorted %>\"><%- text %></a></li>\n</script>\n\n<script aria-hidden=\"true\" type=\"text/template\" id=\"new-post-menu-category-template\">\n    <li role=\"menuitem\">\n        <a href=\"#\"><span class=\"category-menu-span\"><%- text %></span></a>\n        <ul role=\"menu\"><%= entries %></ul>\n    </li>\n</script>\n\n<script aria-hidden=\"true\" type=\"text/template\" id=\"new-post-topic-dropdown-template\">\n    <span class=\"topic-dropdown-label\" id=\"topic-dropdown-label\">Create new post about:</span>\n    <div class=\"form-topic-drop\">\n        <a href=\"#\" aria-labelledby=\"topic-dropdown-label\" class=\"topic_dropdown_button\">${_(\"Show All Discussions\")}<span class=\"drop-arrow\" aria-hidden=\"true\">▾</span></a>\n        <div class=\"topic_menu_wrapper\">\n            <div class=\"topic_menu_search\" role=\"menu\">\n                <label class=\"sr\" for=\"browse-topic-newpost\">Filter List</label>\n                <input type=\"text\" id=\"browse-topic-newpost\" class=\"form-topic-drop-search-input\" placeholder=\"Filter discussion areas\">\n            </div>\n            <ul class=\"topic_menu\" role=\"menu\"><%= topics_html %></ul>\n        </div>\n    </div>\n</script>\n\n<script aria-hidden=\"true\" type=\"text/template\" id=\"new-post-options-template\">\n    <div class=\"options\">\n        <input type=\"checkbox\" name=\"follow\" class=\"discussion-follow\" id=\"new-post-follow\" checked><label for=\"new-post-follow\">follow this post</label>\n        <% if (allow_anonymous) { %>\n        <br>\n        <input type=\"checkbox\" name=\"anonymous\" class=\"discussion-anonymous\" id=\"new-post-anonymous\">\n        <label for=\"new-post-anonymous\">post anonymously</label>\n        <% } %>\n        <% if (allow_anonymous_to_peers) { %>\n        <br>\n        <input type=\"checkbox\" name=\"anonymous_to_peers\" class=\"discussion-anonymous-to-peers\" id=\"new-post-anonymous-to-peers\">\n        <label for=\"new-post-anonymous-to-peers\">post anonymously to classmates</label>\n        <% } %>\n        <% if (cohort_options) { %>\n        <div class=\"form-group-label choose-cohort\">\n            ## Translators: This labels the selector for which group of students can view a post\n            Make visible to:\n            <select class=\"group-filter-select new-post-group\" name=\"group_id\">\n                <option value=\"\">All Groups</option>\n                <% _.each(cohort_options, function(opt) { %>\n                    <option value=\"<%= opt.value %>\" <% if (opt.selected) { %>selected<% } %>><%- opt.text %></option>\n                <% }); %>\n            </select>\n        </div>\n        <% } %>\n    </div>\n</script>\n\n<script aria-hidden=\"true\" type=\"text/template\" id=\"new-post-editor-template\">\n    <div class=\"form-row\">\n        <label class=\"sr\" for=\"new-post-title\">new post title</label>\n        <input type=\"text\" id=\"new-post-title\" class=\"new-post-title\" name=\"title\" placeholder=\"Title\">\n    </div>\n    <div class=\"form-row\">\n        <div class=\"new-post-body\" name=\"body\" placeholder=\"Enter your question or comment…\"></div>\n    </div>\n    <input type=\"submit\" id=\"new-post-submit\" class=\"submit\" value=\"Add post\">\n    <a href=\"#\" class=\"new-post-cancel\">Cancel</a>\n</script>");
      window.$$course_id = "edX/999/test";
      spyOn(DiscussionUtil, "makeWmdEditor");
      return this.discussion = new Discussion([], {
        pages: 1
      });
    });
    describe("Drop down works correct", function() {
      beforeEach(function() {
        this.view = new NewPostView({
          el: $(".new-post-article"),
          collection: this.discussion,
          course_settings: new DiscussionCourseSettings({
            "category_map": {
              "subcategories": {
                "Basic Question Types": {
                  "subcategories": {},
                  "children": ["Selection From Options"],
                  "entries": {
                    "Selection From Options": {
                      "sort_key": null,
                      "is_cohorted": true,
                      "id": "cba3e4cd91d0466b9ac50926e495b76f"
                    }
                  }
                }
              },
              "children": ["Basic Question Types"],
              "entries": {}
            },
            "allow_anonymous": true,
            "allow_anonymous_to_peers": true
          }),
          mode: "tab"
        });
        this.view.render();
        this.parent_category_text = "Basic Question Types";
        return this.selected_option_text = "Selection From Options";
      });
      it("completely show parent category and sub-category", function() {
        var complete_text, dropdown_text, selected_text_width;
        complete_text = this.parent_category_text + " / " + this.selected_option_text;
        selected_text_width = this.view.getNameWidth(complete_text);
        this.view.maxNameWidth = selected_text_width + 1;
        this.view.$el.find("ul.topic_menu li[role='menuitem'] > a")[1].click();
        dropdown_text = this.view.$el.find(".form-topic-drop > a").text();
        return expect(complete_text + ' ▾').toEqual(dropdown_text);
      });
      it("completely show just sub-category", function() {
        var complete_text, dropdown_text, selected_text_width;
        complete_text = this.parent_category_text + " / " + this.selected_option_text;
        selected_text_width = this.view.getNameWidth(complete_text);
        this.view.maxNameWidth = selected_text_width - 10;
        this.view.$el.find("ul.topic_menu li[role='menuitem'] > a")[1].click();
        dropdown_text = this.view.$el.find(".form-topic-drop > a").text();
        expect(dropdown_text.indexOf("…")).toEqual(0);
        return expect(dropdown_text).toContain(this.selected_option_text);
      });
      it("partially show sub-category", function() {
        var complete_text, dropdown_text, parent_width, selected_text_width;
        parent_width = this.view.getNameWidth(this.parent_category_text);
        complete_text = this.parent_category_text + " / " + this.selected_option_text;
        selected_text_width = this.view.getNameWidth(complete_text);
        this.view.maxNameWidth = selected_text_width - parent_width;
        this.view.$el.find("ul.topic_menu li[role='menuitem'] > a")[1].click();
        dropdown_text = this.view.$el.find(".form-topic-drop > a").text();
        expect(dropdown_text.indexOf("…")).toEqual(0);
        return expect(dropdown_text.lastIndexOf("…")).toBeGreaterThan(0);
      });
      return it("broken span doesn't occur", function() {
        var complete_text, dropdown_text, selected_text_width;
        complete_text = this.parent_category_text + " / " + this.selected_option_text;
        selected_text_width = this.view.getNameWidth(complete_text);
        this.view.maxNameWidth = this.view.getNameWidth(this.selected_option_text) + 100;
        this.view.$el.find("ul.topic_menu li[role='menuitem'] > a")[1].click();
        dropdown_text = this.view.$el.find(".form-topic-drop > a").text();
        return expect(dropdown_text.indexOf("/ span>")).toEqual(-1);
      });
    });
    return it("posts to the correct URL", function() {
      var topicId, view;
      topicId = "test_topic";
      spyOn($, "ajax").andCallFake(function(params) {
        expect(params.url.path()).toEqual(DiscussionUtil.urlFor("create_thread", topicId));
        return {
          always: function() {}
        };
      });
      view = new NewPostView({
        el: $(".new-post-article"),
        collection: this.discussion,
        course_settings: new DiscussionCourseSettings({
          allow_anonymous: false,
          allow_anonymous_to_peers: false
        }),
        mode: "inline",
        topicId: topicId
      });
      view.render();
      view.$(".new-post-form").submit();
      return expect($.ajax).toHaveBeenCalled();
    });
  });

}).call(this);
