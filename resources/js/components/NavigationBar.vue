<template>
    <div class="navigation-bar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <!-- <a class="navbar-brand" href="#">WatchTurtle</a> -->
                <router-link class="navbar-brand" to="/">WatchTurtle</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                        <router-link to="/sign-up">Sign Up</router-link>
                        <!-- <span class="navbar-item-divider">|</span> -->
                        <router-link to="/log-in">Log In</router-link>
                        <!-- <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link" href="#">Features</a>
                        <a class="nav-item nav-link" href="#">Pricing</a>
                        <a class="nav-item nav-link disabled" href="#">Disabled</a> -->
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>