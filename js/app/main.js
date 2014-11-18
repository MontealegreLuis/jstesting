require.config({
    paths: {
        'jquery': '../vendor/jquery/dist/jquery',
        'twig': '../vendor/twig.js/twig.min',
        'bootstrap': '../vendor/bootstrap/dist/js/bootstrap.min'
    },
    baseUrl: '/js/app'
});

require(['./app'], function(app) {
    app.init();
});
