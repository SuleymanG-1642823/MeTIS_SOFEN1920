import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ConfirmationModal extends Vue {
    mTitle: string = 'confirmation';
    mYesText: string = 'Yes';
    mNoText: string = 'No';
    mMessage: string = 'Are you sure?';

    showModal: boolean = true;
    mDontShowAgain: boolean = false;

    @Prop(String) title:string;
    @Prop(String) yesText: string;
    @Prop(String) noText: string;
    @Prop(String) message: string;

    @Prop(Boolean) show: boolean;
    @Prop(Boolean) dontShowAgain: boolean;

    beforeMount(){
        if (this.title !== undefined)   this.mTitle = this.title;
        if (this.yesText !== undefined)   this.mYesText = this.yesText;
        if (this.noText !== undefined)   this.mNoText = this.noText;
        if (this.message !== undefined)   this.mMessage = this.message;
    }

    decline(){
        this.$emit('decline');
        if (this.mDontShowAgain){
            this.$emit('dontShowAgain');
        }
    }

    accept(){
        this.$emit('accept')
        if (this.mDontShowAgain){
            this.$emit('dontShowAgain');
        }
    }

}