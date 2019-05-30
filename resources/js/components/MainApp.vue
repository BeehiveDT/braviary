<template>
    <div class="page" id="main">
        <!-- Wrapper container for footer position set up -->
        <div class="wrapper">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">Braviary</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul v-if="userNotLoggedIn" class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/sign-up">Sign Up</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/log-in">Log In</router-link>
                            </li>
                        </ul>
                        <ul v-else class="navbar-nav ml-auto">
                            <li v-if="isAdmin" class="nav-item">
                                <router-link to="/zookeeper/eagles">All Eagles</router-link>
                            </li>
                            <!-- <li v-if="isAdmin" class="nav-item">
                                <router-link v-if="isAdmin" to="/zookeeper/users">All Users</router-link>
                            </li> -->
                            <li class="nav-item">
                                <router-link to="/eagles">Eagles</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/me">Profile</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link v-on:click.native="userLogOut" to="/">Log Out</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
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
    export default {
        name: 'main-app',
        computed: {
            userNotLoggedIn(){
                return !this.$store.state.user.userLoggedIn;
            },
            userName(){
                return this.$store.state.user.userName;
            },
            isAdmin: {
                get: function () {
                    return this.$store.state.user.userIsAdmin;
                },
                set: function (newValue) {
                    this.isAdmin = newValue;
                }
            }
        },
        methods: {
            userLogOut(){
                this.$store.dispatch('user/logOutUser')
                    .then(response => { 
                        // do nothing
                    })
                    .catch(error => {
                        // do nothing
                    })
            }
        },
        mounted(){
            
        }
    }
</script>
