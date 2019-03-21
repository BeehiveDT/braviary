const config = {

    // ------------------------------------------------------------------
    // parameters
    // ------------------------------------------------------------------

    BASE_URL: window.location.origin,
    API_BASE_URL: window.location.origin,
    HEADER: {
        headers: {
            'Content-Type': 'application/json'
        }
    },
    AUTHORIZED_HEADER: {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ''
        }
    },


    // ------------------------------------------------------------------
    // tool function
    // ------------------------------------------------------------------
    setAPI_BaseURL: function ()
    {
        switch (window.location.hostname)
        {
            case 'localhost':               this.BASE_URL = this.BASE_URL + '/';
                                            break;
            case 'braviary.test':           this.BASE_URL = this.BASE_URL + '/';
                                            break;
            case 'xlab.agriweather.online': this.BASE_URL = 'https://xlab.agriweather.online/braviary/';
                                            break;
            default:                        this.BASE_URL = 'https://xlab.agriweather.online/braviary/';
                                            break;
        }
        this.API_BASE_URL = this.BASE_URL + 'api/'
        return this.API_BASE_URL;
    },
    
    getAPI_URL: function (action, params = {})
    {
        switch (action)
        {
            // API USER
            case 'Log_In_User': return this.API_BASE_URL + 'auth/login';
            case 'Show_User_Profile': return this.API_BASE_URL + 'me';
            // API EAGLE
            case 'Get_Eagle_List': return this.API_BASE_URL + 'eagles';

            default: return this.API_BASE_URL;
        }
    },

    getAuthorized_Header: function (token)
    {
        this.AUTHORIZED_HEADER.headers['Authorization'] = token;
        return this.AUTHORIZED_HEADER;
    }
}

export { config }