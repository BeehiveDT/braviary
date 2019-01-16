<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- Protects against cross-site forgeries -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script>window.Laravel = { crsfToken: '{{ csrf_token() }}'}</script>
        <title>Braviary 勇士雄鷹</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" type="text/css" rel="stylesheet">
        
    </head>
    <body>
        <div id="app">
            <main-app></main-app>
        </div>

        <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    </body>
</html>
