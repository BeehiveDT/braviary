// Load Component Page
import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import LogIn from './components/LogIn.vue'

// Assign Page to paths
export const routes = [

    {
        path:'/',
        component: Home
    },
    {
        path:'/sign-up',
        component: SignUp
    },
    {
        path: '/log-in',
        component: LogIn
    }
];