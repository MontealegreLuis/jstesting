define(function() {
    var ShippingForm = function($, $state, $city, view, citiesUrl, refreshOptions) {
        'use strict';

        var form = this;

        this.init = function() {
            $state.on('change', this.getCities);
        };

        this.getCities = function() {
            var stateId = $state.val();

            if (!stateId) {
                return;
            }

            refreshOptions = refreshOptions || form.refreshOptions;

            $.ajax({
                url: citiesUrl,
                dataType: 'json',
                data: {'state': stateId},
                success: refreshOptions
            });
        };

        this.refreshOptions = function(cities) {
            $city.html(view.twig({ref: 'cities'}).render({cities: cities}));
        };

        return this;
    };

    return ShippingForm;
});
