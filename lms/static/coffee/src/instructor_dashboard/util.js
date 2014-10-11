// Generated by CoffeeScript 1.6.1
(function() {
  var IntervalManager, PendingInstructorTasks, create_email_content_table, create_email_message_views, create_task_list_table, created_formatter, find_and_assert, number_sent_formatter, plantInterval, plantTimeout, setup_copy_email_button, std_ajax_err, subject_formatter,
    _this = this;

  plantTimeout = function(ms, cb) {
    return setTimeout(cb, ms);
  };

  plantInterval = function(ms, cb) {
    return setInterval(cb, ms);
  };

  find_and_assert = function($root, selector) {
    var item;
    item = $root.find(selector);
    if (item.length !== 1) {
      console.error("element selection failed for '" + selector + "' resulted in length " + item.length);
      throw "Failed Element Selection";
    } else {
      return item;
    }
  };

  std_ajax_err = function(handler) {
    return function(jqXHR, textStatus, errorThrown) {
      console.warn("ajax error\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
      return handler.apply(this, arguments);
    };
  };

  create_task_list_table = function($table_tasks, tasks_data) {
    var $table_placeholder, columns, grid, options, table_data;
    $table_tasks.empty();
    options = {
      enableCellNavigation: true,
      enableColumnReorder: false,
      autoHeight: true,
      rowHeight: 100,
      forceFitColumns: true
    };
    columns = [
      {
        id: 'task_type',
        field: 'task_type',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

        name: gettext('Task Type'),
        minWidth: 102
      }, {
        id: 'task_input',
        field: 'task_input',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

        name: gettext('Task inputs'),
        minWidth: 150
      }, {
        id: 'task_id',
        field: 'task_id',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

        name: gettext('Task ID'),
        minWidth: 150
      }, {
        id: 'requester',
        field: 'requester',
        /*
        Translators: a "Requester" is a username that requested a task such as sending email
        */

        name: gettext('Requester'),
        minWidth: 80
      }, {
        id: 'created',
        field: 'created',
        /*
        Translators: A timestamp of when a task (eg, sending email) was submitted appears after this
        */

        name: gettext('Submitted'),
        minWidth: 120
      }, {
        id: 'duration_sec',
        field: 'duration_sec',
        /*
        Translators: The length of a task (eg, sending email) in seconds appears this
        */

        name: gettext('Duration (sec)'),
        minWidth: 80
      }, {
        id: 'task_state',
        field: 'task_state',
        /*
        Translators: The state (eg, "In progress") of a task (eg, sending email) appears after this.
        */

        name: gettext('State'),
        minWidth: 80
      }, {
        id: 'status',
        field: 'status',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

        name: gettext('Task Status'),
        minWidth: 80
      }, {
        id: 'task_message',
        field: 'task_message',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

        name: gettext('Task Progress'),
        minWidth: 120
      }
    ];
    table_data = tasks_data;
    $table_placeholder = $('<div/>', {
      "class": 'slickgrid'
    });
    $table_tasks.append($table_placeholder);
    return grid = new Slick.Grid($table_placeholder, table_data, columns, options);
  };

  subject_formatter = function(row, cell, value, columnDef, dataContext) {
    var subject_text;
    if (!value) {
      return gettext("An error occurred retrieving your email. Please try again later, and contact technical support if the problem persists.");
    }
    subject_text = $('<span>').text(value['subject']).html();
    return '<p><a href="#email_message_' + value['id'] + '" id="email_message_' + value['id'] + '_trig">' + subject_text + '</a></p>';
  };

  created_formatter = function(row, cell, value, columnDef, dataContext) {
    if (!value) {
      return "<p>" + gettext("Unknown") + "</p>";
    } else {
      return '<p>' + value + '</p>';
    }
  };

  number_sent_formatter = function(row, cell, value, columndDef, dataContext) {
    if (!value) {
      return "<p>" + gettext("Unknown") + "</p>";
    } else {
      return '<p>' + value + '</p>';
    }
  };

  create_email_content_table = function($table_emails, $table_emails_inner, email_data) {
    var $table_placeholder, columns, grid, options, table_data;
    $table_emails_inner.empty();
    $table_emails.show();
    options = {
      enableCellNavigation: true,
      enableColumnReorder: false,
      autoHeight: true,
      rowHeight: 50,
      forceFitColumns: true
    };
    columns = [
      {
        id: 'email',
        field: 'email',
        name: gettext('Subject'),
        minWidth: 80,
        cssClass: "email-content-cell",
        formatter: subject_formatter
      }, {
        id: 'created',
        field: 'created',
        name: gettext('Time Sent'),
        minWidth: 80,
        cssClass: "email-content-cell",
        formatter: created_formatter
      }, {
        id: 'number_sent',
        field: 'number_sent',
        name: gettext('Number Sent'),
        minwidth: 100,
        maxWidth: 150,
        cssClass: "email-content-cell",
        formatter: number_sent_formatter
      }
    ];
    table_data = email_data;
    $table_placeholder = $('<div/>', {
      "class": 'slickgrid'
    });
    $table_emails_inner.append($table_placeholder);
    grid = new Slick.Grid($table_placeholder, table_data, columns, options);
    return $table_emails.append($('<br/>'));
  };

  create_email_message_views = function($messages_wrapper, emails) {
    var $close_button, $email_content, $email_header, $email_wrapper, $message, $message_content, email_id, email_info, subject_text, _i, _len;
    $messages_wrapper.empty();
    for (_i = 0, _len = emails.length; _i < _len; _i++) {
      email_info = emails[_i];
      if (!email_info.email) {
        return;
      }
      email_id = email_info.email['id'];
      $message_content = $('<section>', {
        "aria-hidden": "true",
        "class": "modal email-modal",
        id: "email_message_" + email_id
      });
      $email_wrapper = $('<div>', {
        "class": 'inner-wrapper email-content-wrapper'
      });
      $email_header = $('<div>', {
        "class": 'email-content-header'
      });
      $email_header.append($('<input>', {
        type: "button",
        name: "copy-email-body-text",
        value: gettext("Copy Email To Editor"),
        id: "copy_email_" + email_id
      }));
      $close_button = $('<a>', {
        href: '#',
        "class": "close-modal"
      });
      $close_button.append($('<i>', {
        "class": 'icon-remove'
      }));
      $email_header.append($close_button);
      subject_text = $('<span>').text(email_info.email['subject']).html();
      $email_header.append($('<h2>', {
        "class": "message-bold"
      }).html('<em>' + gettext('Subject:') + '</em> ' + subject_text));
      $email_header.append($('<h2>', {
        "class": "message-bold"
      }).html('<em>' + gettext('Time Sent:') + '</em> ' + email_info.created));
      $email_header.append($('<h2>', {
        "class": "message-bold"
      }).html('<em>' + gettext('Sent To:') + '</em> ' + email_info.sent_to));
      $email_wrapper.append($email_header);
      $email_wrapper.append($('<hr>'));
      $email_content = $('<div>', {
        "class": 'email-content-message'
      });
      $email_content.append($('<h2>', {
        "class": "message-bold"
      }).html("<em>" + gettext("Message:") + "</em>"));
      $message = $('<div>').html(email_info.email['html_message']);
      $email_content.append($message);
      $email_wrapper.append($email_content);
      $message_content.append($email_wrapper);
      $messages_wrapper.append($message_content);
      $('#email_message_' + email_info.email['id'] + '_trig').leanModal({
        closeButton: ".close-modal",
        copyEmailButton: "#copy_email_" + email_id
      });
      setup_copy_email_button(email_id, email_info.email['html_message'], email_info.email['subject']);
    }
  };

  setup_copy_email_button = function(email_id, html_message, subject) {
    var _this = this;
    return $("#copy_email_" + email_id).click(function() {
      var editor;
      editor = tinyMCE.get("mce_0");
      editor.setContent(html_message);
      return $('#id_subject').val(subject);
    });
  };

  IntervalManager = (function() {

    function IntervalManager(ms, fn) {
      this.ms = ms;
      this.fn = fn;
      this.intervalID = null;
    }

    IntervalManager.prototype.start = function() {
      this.fn();
      if (this.intervalID === null) {
        return this.intervalID = setInterval(this.fn, this.ms);
      }
    };

    IntervalManager.prototype.stop = function() {
      clearInterval(this.intervalID);
      return this.intervalID = null;
    };

    return IntervalManager;

  })();

  PendingInstructorTasks = (function() {
    /* Pending Instructor Tasks Section
    */

    function PendingInstructorTasks($section) {
      var TASK_LIST_POLL_INTERVAL,
        _this = this;
      this.$section = $section;
      this.reload_running_tasks_list = function() {
        return PendingInstructorTasks.prototype.reload_running_tasks_list.apply(_this, arguments);
      };
      this.$table_running_tasks = find_and_assert(this.$section, ".running-tasks-table");
      if (this.$table_running_tasks.length) {
        TASK_LIST_POLL_INTERVAL = 20000;
        this.reload_running_tasks_list();
        this.task_poller = new IntervalManager(TASK_LIST_POLL_INTERVAL, function() {
          return _this.reload_running_tasks_list();
        });
      }
    }

    PendingInstructorTasks.prototype.reload_running_tasks_list = function() {
      var list_endpoint,
        _this = this;
      list_endpoint = this.$table_running_tasks.data('endpoint');
      return $.ajax({
        dataType: 'json',
        url: list_endpoint,
        success: function(data) {
          if (data.tasks.length) {
            return create_task_list_table(_this.$table_running_tasks, data.tasks);
          } else {
            return console.log("No pending instructor tasks to display");
          }
        },
        error: std_ajax_err(function() {
          return console.error("Error finding pending instructor tasks to display");
        })
      });
      /* /Pending Instructor Tasks Section
      */

    };

    return PendingInstructorTasks;

  })();

  if (typeof _ !== "undefined" && _ !== null) {
    _.defaults(window, {
      InstructorDashboard: {}
    });
    window.InstructorDashboard.util = {
      plantTimeout: plantTimeout,
      plantInterval: plantInterval,
      std_ajax_err: std_ajax_err,
      IntervalManager: IntervalManager,
      create_task_list_table: create_task_list_table,
      create_email_content_table: create_email_content_table,
      create_email_message_views: create_email_message_views,
      PendingInstructorTasks: PendingInstructorTasks
    };
  }

}).call(this);
