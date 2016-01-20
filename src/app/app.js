var magazineArchive = magazineArchive || {};

(function(window, $, app){
    var transitionHeight = function() {
        var height = $('#archive').height();
            height = height > 624 ? height : 624;
        
        $('#magazineHolder').height(624).animate({height: height}, 'slow');
    };
    
    app.transitionHeight = transitionHeight;
})(window, $, magazineArchive);
