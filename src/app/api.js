(function(window, $, app) {
    var data, defaults;
    defaults = data = {
        region: 'intl',
        sort: 'desc',
        language: 'en',
        limit: 8,
        total: null,
        getBundle: false,
        offset: 0,
        next: null,
        loading: false
    };
    
    var user_settings = ['region', 'language'];
    
    var get = function(key) {
        if (typeof(data[key]) !== 'undefined') {
            return data[key];
        }
        
        return null;
    };
    
    var get_url = function() {
        for (var i = 0; i < user_settings.length; i++) {
            var setting;
            
            if ((setting = $('body').data(user_settings[i]))) {
                data[user_settings[i]] = setting;
            }
        }
        
        return '/' + data.region + '/magazineArchive.nap?sort=' + data.sort + '&limit=' + data.limit + '&offset=' + data.offset + '&total=' + data.total + '&exclude=true';
    };
    
    var isLoading = function() {
        return get('loading');
    };
    
    var loading = function(loading) {
        data.loading = loading;
    };
    
    var next = function(callback) {
        if (get('next') === null) {
            data.next = get_url();
        }
        
        loading(true);
        
        console.log('geJson');
        console.log(data.next);
        console.log($);
        $.getJSON(data.next, function(json) {
            data.next = json.next;
            data.total = json.total;
            
            var response = {
                'issues': []
            };
            
            for (var i = 0; i < json.slice.length; i++) {
                response.issues.push({
                    'covers': {
                        'at1x': json.slice[i].cover,
                        'at2x': json.slice[i].cover.replace(/(.*)(\..*)$/, '$1@2x$2')
                    },
                    'issue_number': json.slice[i].number,
                    'date': json.slice[i].date.medium
                });
            }
            
            callback(response);
        });
    };
    
    app.api = {
        next: next,
        isLoading: isLoading,
        loading: loading
    };
})(window, jQuery, Archive);
