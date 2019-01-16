<template>
    <div id="main">
        <navigation-bar></navigation-bar>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import NavigationBar from './NavigationBar.vue';

    export default {
        // mounted() {
        //     console.log('Component mounted.')
        // }
        name: 'main-app',
        components: {
            NavigationBar
        }
    }
</script>
