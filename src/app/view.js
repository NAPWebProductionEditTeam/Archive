(function(window, $, app, hbs) {
    this.render = function(data) {
        var src = $("#archive_issue").html();
        var tpl = hbs.compile(src);
        var rendered = tpl(data);
        var $rendered = $(rendered);
        
        $('#archivedIssues').append($rendered);
        $rendered.slideDown(300, function() {
            app.api.loading(false);
        });
    };
    
    return {
        render: this.render
    };
})(window, jQuery, app, Handlebars);


