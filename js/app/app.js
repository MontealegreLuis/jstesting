define(['twig', 'jquery', './src/ShippingForm'], function (view, $, ShippingForm) {
    'use strict';

    var app = {};

    app.init = function() {
        var form;

        view.twig({
            href: '/js/app/templates/cities.html.twig',
            async: false,
            id: 'cities'
        });

        form = new ShippingForm($, $('#states'), $('#cities'), view, '/app/cities.json');
        form.init();
    };

    return app;
});