import { Vue, Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';

@ Component
export default class NameCard extends Vue {
    // Properties
    // @Prop({type: Object as () => User, default: {first_name: "", last_name: "", email: ""}}) readonly user: User | undefined;
    @Prop({type: Number}) readonly user_id !: number;

    // Data
    user: User = {first_name: '', last_name: '', email: ''};

    // Methods
    async mounted() {
        try{
            const response = await axios.get(`http://localhost:4000/test`);
            this.user = response.data;
            console.log(response.data);
        } catch (err) {
            console.log('Error while fetching user data.');
        }
    }
}