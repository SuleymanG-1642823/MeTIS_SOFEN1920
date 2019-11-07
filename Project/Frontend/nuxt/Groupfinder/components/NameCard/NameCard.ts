import { Vue, Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';

@ Component
export default class NameCard extends Vue {
    // Properties
    @Prop({type: Object as () => User, default: {first_name: "", last_name: "", email: ""}}) readonly user: User | undefined;
    //@Prop({type: String}) readonly name_prop: string | undefined;

    // Data

    // Methods

    // ...
}