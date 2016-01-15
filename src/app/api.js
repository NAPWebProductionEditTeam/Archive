(function(window, $, app) {
    this.data = this.defaults = {
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
    
    this.user_settings = ['region', 'language'];
    
    this.get = function(key) {
        if (typeof(this.data[key]) !== 'undefined') {
            return this.data[key];
        }
        
        return null;
    };
    
    this.get_url = function() {
        var data = this.data;
        var user_settings = this.user_settings;
        
        for (var i = 0; i < user_settings.length; i++) {
            var setting;
            
            if ((setting = $('body').data(user_settings[i]))) {
                data[user_settings[i]] = setting;
            }
        }
        
        return '/' + data.region + '/magazineArchive.nap?sort=' + data.sort + '&limit=' + data.limit + '&offset=' + data.offset + '&total=' + data.total + '&exclude=true';
    };
    
    this.next = function(callback) {
        if (this.get('next') !== null) {
            this.data.next = this.get_url();
        }
        
        this.loading(true);
        
        $.getJSON(this.data.next, function(json) {
            this.data.next = json.next;
            this.data.total = json.total;
            
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
    
    this.isLoading = function() {
        return this.get('loading');
    };
    
    this.loading = function(loading) {
        this.data.loading = loading;
    };
    
    app.api = {
        next: this.next,
        loading: this.loading
    };
})(window, jQuery, app);
