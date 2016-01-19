(function(window, $, app, hbs) {
    var render = function(data) {
        var src = app.templates.archive;
        var tpl = hbs.compile(src);
        var rendered = tpl(data);
        var $rendered = $(rendered);
        
        $('#archivedIssues').append($rendered);
        $rendered.slideDown(300, function() {
            app.api.loading(false);
        });
    };
    
    app.view = {
        render: render
    };
})(window, jQuery, Archive, Handlebars);


