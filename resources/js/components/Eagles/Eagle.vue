<template>
        <tr>
            <th scope="row">
                # {{ eagle.id }}
                <!-- <font-awesome-icon v-if="fluffiness < 50" class="faa-flash animated red" :icon="['fas', 'exclamation-triangle']"></font-awesome-icon> -->
            </th>
            <td>{{ eagle.name }}</td>
            <td>{{ eagle.frequency }}</td>
            <td>{{ eagle.tolerance }}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped" v-bind:class="classObject" role="progressbar" :style="{ width: fluffiness + '%', color: 'black'}" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100"> &nbsp; {{fluffiness}} %</div>
                </div>
            </td>
            <td>{{ lastFeatherLocal }}</td>
            <td>
                <feather-list :eagle="eagle"></feather-list>
            </td>
            <td>
                <update-eagle :eagle="eagle"></update-eagle>
            </td>
            <td>
                <button v-tooltip.bottom="eagle.job_token? eagle.job_token: `Need to discuss about this`" v-clipboard="copyEagleJobToken" class="btn btn-primary round-button">
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
import FeatherList from './FeatherList.vue'

export default {
    name: 'eagle',
    components: {
        UpdateEagle,
        DeleteEagle,
        FeatherList
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
            msg: 'This is a button.',
            max: 0,
        }
    },
    computed: {
        classObject: function () {
            return {
                'bg-primary': this.max <= this.tolerance,
                'bg-danger': !(this.max <= this.tolerance)
            }
        },
        fluffiness(){

            let _tolerance = this.eagle.tolerance;
            let _frequency = this.eagle.frequency;
            let _feathers = this.eagle.lastTenFeathers;
            let _length = _feathers.length;
            let _fluffiness = 0;
            let _tardy = 0;
            let _max = 0;

            if(_length < 10){
                return 0;
            }else{
                let _then = this.$moment.utc();
                let _current = this.$moment.utc(_feathers[0]);
                let _timeGap = _then.diff(_current, 'minutes');
                let _timeGapOverFreq = Math.floor(_timeGap/ _frequency);

                for (let i = 0; i < _length; i++) {
                    _current = this.$moment.utc(_feathers[i])
                    _timeGap = _then.diff(_current, 'minutes');
                    _then = _current;

                    _timeGapOverFreq = Math.floor(_timeGap/ _frequency);
                    
                    if(_timeGapOverFreq > 1){
                        _tardy += 1;
                    }
                    if(_timeGapOverFreq > _max){
                        _max = _timeGapOverFreq;
                    }
                }

                _fluffiness = (10 - _tardy)/10;
                this.max = _max;

                return (_fluffiness*100).toFixed(0);
            }
        },
        lastFeatherLocal(){
            if(this.eagle.lastTenFeathers.length > 0){
                let _lastFeather = this.eagle.lastTenFeathers[0]
                return this.getLocalTime(_lastFeather);
            }else{
                return 'No Records Yet.'
            }
        }
    },
    methods: {
        copyEagleJobToken() {
            return this.eagle.job_token;
        },
        getLocalTime(lastFeather){
            let _lastFeatherUTC = this.$moment.utc(lastFeather);
            let _lastFeatherLocal = this.$moment(_lastFeatherUTC).local().format('YYYY-MM-DD hh:mm:ss a');
            return _lastFeatherLocal
        }
    },
    mounted(){

    }
}
</script>

<style scoped>

</style>