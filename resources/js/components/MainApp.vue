<template>
    <div id="main">
        <!-- Wrapper container for footer position set up -->
        <div class="wrapper">
            <!-- Navigation Bar -->
            <div class="navigation-bar">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container">
                        <router-link class="navbar-brand" to="/">WatchTurtle</router-link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav ml-auto">
                                <router-link to="/sign-up">Sign Up</router-link>
                                <!-- <span class="navbar-item-divider">|</span> -->
                                <router-link to="/log-in">Log In</router-link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- Page content -->
            <router-view></router-view>
        </div>
        
        <!-- Footer -->
        <section class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 ">
                        <div class="text-center text-white">
                                &copy; 2018 Your Company. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    // import NavigationBar from './NavigationBar.vue';

    export default {
        // mounted() {
        //     console.log('Component mounted.')
        // }
        name: 'main-app',
        // components: {
        //     NavigationBar
        // }
    }
</script>
