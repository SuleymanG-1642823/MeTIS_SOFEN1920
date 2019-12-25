import { Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class ProjectInformation extends Vue {
    @Prop(String) title: string;
    @Prop(String) description: string;
    @Prop(String) createdAt: string;
    @Prop(Array) categories!: string[];
    @Prop(String) creator: string;

    created(){
        // check if date is valid
        if (isNaN(Date.parse(this.createdAt))){
            this.createdAt = '';
        }
    }
}