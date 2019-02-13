<template>
    <div id="home">
        <div class="container">
            <div v-if="userNotLoggedIn">
                <h2>{{ homeMessage }}</h2>
            </div>
            <div v-else>
                <p>
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#addNewEagle" aria-expanded="false" aria-controls="collapseExample">
                        Add New Eagle
                    </button>
                </p>
                <div class="collapse" id="addNewEagle">
                <div class="card card-body">
                    A form to add new eagle
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    computed: {
        homeMessage(){
            return this.$store.getters.homeMessage;
        },
        userNotLoggedIn(){
            return !this.$store.state.userLoggedIn;
        }
    },
}
</script>