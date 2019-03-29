<template>
    <div class="page" id="main">
        <!-- Wrapper container for footer position set up -->
        <div class="wrapper">
            
            <!-- Navigation Bar -->
            <div class="navigation-bar">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container">
                        <router-link class="navbar-brand" to="/">Braviary</router-link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="userLoggedInDropDown">
                            <ul class="navbar-nav ml-auto">
                                <li v-if="userNotLoggedIn" class="nav-item">
                                    <router-link :to="{name:'Sign Up'}">Sign Up</router-link>
                                </li>
                                <li v-if="userNotLoggedIn" class="nav-item">
                                    <router-link to="/log-in">Log In</router-link>
                                </li>
                                <li v-else class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Welcome, {{ userName }}
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown"> 
                                        <router-link v-if="isAdmin" to="/zookeeper/eagles" class="black-text">All Eagles</router-link>
                                        <div v-if="isAdmin" class="dropdown-divider"></div>
                                        <router-link v-if="isAdmin" to="/zookeeper/users" class="black-text">All Users</router-link>
                                        <div v-if="isAdmin" class="dropdown-divider"></div>
                                        <router-link to="/eagles" class="black-text">Eagles</router-link>
                                        <div class="dropdown-divider"></div>
                                        <router-link to="/me" class="black-text">Profile</router-link>
                                        <div class="dropdown-divider"></div>
                                        <router-link v-on:click.native="userLogOut" to="/" class="black-text">Log Out</router-link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <br>
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
        // data(){
        //     return{
        //         isAdmin: false
        //     }
        // },
        computed: {
            userNotLoggedIn(){
                return !this.$store.state.user.userLoggedIn;
            },
            userName(){
                return this.$store.state.user.userName;
            },
            isAdmin: {
                get: function () {
                    return this.$store.state.user.isAdmin;
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
