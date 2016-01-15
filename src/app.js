(function(window, $, app){
    $(window.document).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $("#archivedIssues li:last").offset().top) {
            if (! app.api.isLoading()) {
                app.api.next(function(data) {
                    app.view.render(data);
                });
            }
        }
    });
})(window, jQuery, app);
