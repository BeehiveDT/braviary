<template>
        <tr>
            <th scope="row">
                # {{ eagle.id }}
                <font-awesome-icon v-if="fluffiness < 50" class="faa-flash animated red" :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
            </th>
            <td>{{ eagle.name }}</td>
            <td>{{ eagle.frequency }}</td>
            <td>{{ eagle.tolerance }}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" :style="{ width: fluffiness + '%', color: 'black'}" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100"> &nbsp; {{fluffiness}} %</div>
                </div>
            </td>
            <td>{{ lastFeatherLocal }}</td> 
            <td>
                <update-eagle :eagle="eagle"></update-eagle>
            </td>
            <td>
                <button v-tooltip.top-center="eagle.job_token" v-clipboard="copyEagleJobToken" class="btn btn-primary round-button">
                    <font-awesome-icon :icon="['fas', 'clipboard']"></font-awesome-icon>
                </button>
            </td>
            <td>
                <delete-eagle :eagle="eagle"></delete-eagle>
            </td>
        </tr>
</template>

<script>
import UpdateEagle from './UpdateEagle.vue';
import DeleteEagle from './DeleteEagle.vue';


export default {
    name: 'eagle',
    components: {
        UpdateEagle,
        DeleteEagle
    },
    props: {
        eagle: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            name: this.eagle.name,
            frequency: this.eagle.frequency,
            tolerance: this.eagle.tolerance,
            lastFeather: '',
            lastFeatherLocal: '',
            msg: 'This is a button.'
        }
    },
    computed: {
        fluffiness(){

            let _tolerance = this.tolerance;
            let _frequency = this.frequency;
            let _lastFeatherTime = Date.parse(this.lastFeather);
            let _fluffiness = 0;
            let _timeGap = 0;
            let _timeGapOverFreq = this.tolerance;

            if(!isNaN(_lastFeatherTime)){

                let _now = this.$moment.utc();
                let _timeZone = this.$moment.tz.guess();
                let _then = this.$moment.tz(this.$moment(_lastFeatherTime),'YYYY-MM-DD HH:mm',_timeZone);
                let _utcOffset = this.$moment().utcOffset();
                let _nowThenDiff = _now.diff(_then, 'minutes');

                // time gap in minutes
                // from: last feather check in time
                // to: current time
                _timeGap = _nowThenDiff - _utcOffset;
                _timeGapOverFreq = Math.floor(_timeGap / _frequency);

                // numberator cannot be negative
                if(_timeGapOverFreq <= _tolerance){
                    let _numerator = _tolerance - _timeGapOverFreq;
                    _fluffiness = _numerator / _tolerance;
                    _fluffiness = _fluffiness.toFixed(2)
                }
            }

            let _result = (_fluffiness*100).toFixed(0);
            
            return _result;
        },
    },
    methods: {
        // num is the number of feathres to retrieve
        // num = 1 retrieves last feather
        copyEagleJobToken() {
            return this.eagle.job_token;
        }
    },
    mounted(){
        this.$store.dispatch('eagle/retrieveEagleFeathers', { 
            limit: 1,
            id: this.eagle.id
            })
            .then(response => {
                let _lastFeather = response.feathers[0];
                if (_lastFeather){
                    this.lastFeather = _lastFeather;
                    let _lastFeatherUTC = this.$moment.utc(_lastFeather);
                    let _lastFeatherLocal = this.$moment(_lastFeatherUTC).local().format('YYYY-MM-DD HH:mm:ss');
                    this.lastFeatherLocal = _lastFeatherLocal;
                }else{
                    this.lastFeatherLocal = "None Found";
                }
            })
            .catch(error => {
                // do nothing
            })
    }
}
</script>

<style scoped>

</style>