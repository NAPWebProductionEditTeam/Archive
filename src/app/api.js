var app = app || {};

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
    }
    
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
    }
    
    this.next = function() {
        if (! this.get('next')) {
            this.set('next', this.get_url());
        }
        
        var data = this.call();
        
        // filter data to:
        // {
        //        covers: {
        //            1x: '',
        //            2x: ''
        //        }
        //        number: int,
        //        date: str
        // }
        
        // set next, total, ...
        
        return data;
    };
    
    this.call = function() {
        this.data.loading = true;
        
        // call api && return all data
        // set loading to false
    }
    
    this.loading = function() {
        return this.get('loading');
    }
    
    app.api = {
        next: this.next,
        loading: this.loading
    };
})(window, jQuery, app);
