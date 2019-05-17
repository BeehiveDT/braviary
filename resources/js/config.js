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
        this.API_BASE_URL = process.env.MIX_BASE_URL + 'api/'
        return this.API_BASE_URL;
    },
    
    getAPI_URL: function (action, payload = {})
    {
        switch (action)
        {
            // API USER
            case 'Sign_Up_User':        return this.API_BASE_URL + 'auth/register';
            case 'Log_In_User':         return this.API_BASE_URL + 'auth/login';
            case 'Log_Out_User':        return this.API_BASE_URL + 'auth/logout';
            case 'Show_User_Profile':   return this.API_BASE_URL + 'me';                                           // GET
            case 'Update_User_Profile': return this.API_BASE_URL + 'me';                                           // POST

            // API EAGLE
            case 'Get_Eagles_List':     return this.API_BASE_URL + 'eagles';                                        // GET
            case 'Create_Eagle':        return this.API_BASE_URL + 'eagles';                                        // POST
            case 'Update_Eagle':        return this.API_BASE_URL + 'eagles' + '/' + payload.id;
            case 'Delete_Eagle':        return this.API_BASE_URL + 'eagles' + '/' + payload.id;
            case 'Get_Eagle_Feathers':  return this.API_BASE_URL + 'eagles' + '/' + payload.id + '/' + 'feathers'
            case 'Get_Eagles_Feathers': return this.API_BASE_URL + 'eagles' + '/' + 'feathers';  // GET

            // API EAGLE VIEWER
            case 'Add_Eagle_Viewer':    return this.API_BASE_URL + 'eagles' + '/' + payload.id + '/' + 'link';      // POST
            case 'Get_Eagle_Viewers':   return this.API_BASE_URL + 'eagles' + '/' + payload.id + '/' + 'viewers';   // GET
            case 'Delete_Eagle_Viewer': return this.API_BASE_URL + 'eagles' + '/' + payload.id + '/' + 'unlink';    // POST

            // API ZOOKEEPER
            case 'Get_Zookeeper_Eagle_List': return this.API_BASE_URL + 'zookeeper' + '/' + 'eagles';               // GET
            case 'Get_Zookeeper_User_List': return this.API_BASE_URL + 'zookeeper' + '/' + 'users';               // GET

            default: return this.API_BASE_URL;
        }
    },

    getAuthorized_Header: function (token, params = {})
    {
        this.AUTHORIZED_HEADER.headers['Authorization'] = token;
        if(Object.keys(params).length > 0){
            this.AUTHORIZED_HEADER.params = params;
        }
        return this.AUTHORIZED_HEADER;
    }
}

export { config }