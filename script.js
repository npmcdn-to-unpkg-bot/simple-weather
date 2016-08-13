var dayIcons = {
    'chanceflurries': 'wi-day-rain-mix',
    'chancerain': 'wi-day-rain',
    'chancesleet': 'wi-day-sleet',
    'chancesnow': 'wi-day-snow',
    'chancetstorms': 'wi-day-thunderstorm',
    'clear': 'wi-day-sunny',
    'cloudy': 'wi-cloudy',
    'flurries': 'wi-day-rain-mix',
    'fog': 'wi-day-fog',
    'hazy': 'wi-day-haze',
    'mostlycloudy': 'wi-day-cloudy-high',
    'mostlysunny': 'wi-day-cloudy',
    'partlysunny': 'wi-day-cloudy-high',
    'rain': 'wi-day-rain',
    'sleet': 'wi-day-sleet',
    'snow': 'wi-day-snow',
    'sunny': 'wi-day-sunny',
    'tstorms': 'wi-day-thunderstorm',
    'unknown': 'wi-day-thunderstorm',
    'cloudy': 'wi-cloudy',
    'partlycloudy': 'wi-day-cloudy'
};
var nightIcons = {
    'chanceflurries': 'wi-night-rain-mix',
    'chancerain': 'wi-night-rain',
    'chancesleet': 'wi-night-sleet',
    'chancesnow': 'wi-night-snow',
    'chancetstorms': 'wi-night-thunderstorm',
    'clear': 'wi-night-clear',
    'cloudy': 'wi-cloudy',
    'flurries': 'wi-night-rain-mix',
    'fog': 'wi-night-fog',
    'hazy': 'wi-night-haze',
    'mostlycloudy': 'wi-night-cloudy-high',
    'mostlysunny': 'wi-night-cloudy',
    'partlysunny': 'wi-night-cloudy-high',
    'rain': 'wi-night-rain',
    'sleet': 'wi-night-sleet',
    'snow': 'wi-night-snow',
    'sunny': 'wi-night-clear',
    'tstorms': 'wi-night-thunderstorm',
    'unknown': 'wi-night-thunderstorm',
    'cloudy': 'wi-cloudy',
    'partlycloudy': 'wi-night-cloudy'
};
new Vue({
    el: 'html',
    data: {
        weatherIcon: 'wi-cloud-down',
        temp_c: '',
        city: ''
    },
    created: function() {
        this.fetchAPI();
    },
    methods: {
        fetchAPI: function(num) {
            var urlAPI = 'https://api.wunderground.com/api/f041a6b2e4781d71/conditions/conditions/q/autoip.json';
            this.$http.get(urlAPI)
                .then(
                    function(res) {
                        var dataRes = res.data.current_observation;
                        if (this.isNight) {
                            this.weatherIcon = nightIcons[dataRes.icon];
                        } else {
                            this.weatherIcon = dayIcons[dataRes.icon];
                        }
                        this.temp_c = dataRes.temp_c;
                        this.city = dataRes.observation_location.city;
                    },
                    function(res) {
                        console.log(res);
                    });
        }
    },
    computed: {
        isNight: function() {
            var time = (new Date()).getHours();
            return (time > 20) || (time < 6);
        },
        getContentColor: function() {
            return this.isNight ? '#333' : '#eee';
        }
    }
})
