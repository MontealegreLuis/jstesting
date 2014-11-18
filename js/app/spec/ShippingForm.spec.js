define(['src/ShippingForm'], function(ShippingForm) {
    'use strict';

    describe('ShippingForm', function () {
        it('should initialize onchange event', function () {
            var $state = jasmine.createSpyObj('state', ['on']);
            var form = new ShippingForm({}, $state);

            form.init();

            expect($state.on).toHaveBeenCalledWith('change', form.getCities);
        });

        it('should skip getting the cities if there is no current state selected', function () {
            var $state = {
                val: function() {}
            };
            var $ = jasmine.createSpyObj('$', ['ajax']);
            var form = new ShippingForm($, $state);

            spyOn($state, 'val').andReturn('');

            form.getCities();

            expect($state.val).toHaveBeenCalled();
            expect($.ajax).not.toHaveBeenCalled();
        });

        it('should get the cities when a state is selected', function () {
            var $state = {
                val: function() {}
            };
            var $ = {
                ajax: function(options) {
                    options.success.call();
                }
            };
            var refreshOptions = jasmine.createSpy('refreshOptions');
            var form = new ShippingForm($, $state, {}, {}, '/app/cities.json', refreshOptions);

            spyOn($state, 'val').andReturn('21');
            spyOn($, 'ajax').andCallThrough();

            form.getCities();

            expect($state.val).toHaveBeenCalled();
            expect($.ajax).toHaveBeenCalled();
            expect(refreshOptions).toHaveBeenCalled();
        });

        it('should refresh the cities options', function () {
            var $city = jasmine.createSpyObj('city', ['html']);
            var view = {
                twig: function() {
                    return {
                        render: function() {}
                    };
                }
            }
            var form = new ShippingForm({}, {}, $city, view, '/app/cities.json');

            spyOn(view, 'twig').andCallThrough();

            form.refreshOptions([{value: 12, label: 'Puebla'}]);

            expect($city.html).toHaveBeenCalled();
            expect(view.twig).toHaveBeenCalled();
        });
    });
});
