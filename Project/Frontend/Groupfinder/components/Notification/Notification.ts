import {Vue, Component, Prop} from 'vue-property-decorator'
import api from '@/helpers/Api';

@Component
export default class Notification extends Vue{
    maxMsgLength: number = 90;
    expandable: boolean = false;
    expand: boolean = true;
    expandBtnText: string = 'view more';
    shortMsg: string = '';
    displayedMsg: string = '';

    @Prop(String) msg: string;
    @Prop(Boolean) isNew: boolean;
    @Prop(String) createdAt: string;
    @Prop({ default: '' }) readonly destination!: string; // url for redirection

    created(){
        // msg
        if (this.msg.length <= 90){
            this.shortMsg = this.msg;
        }
        else{
            // get first 90 characters
            this.shortMsg = this.shortenMsg(this.msg);
            this.expandable = true;
        }
        this.displayedMsg = this.shortMsg;

        // redirection url
        
    }

    expandCollapseBtnClickEvent(){
        if (this.expand){
            this.displayedMsg = this.msg;
            this.expandBtnText = 'view less';
        }
        else{
            this.displayedMsg = this.shortMsg;
            this.expandBtnText = 'view more';
        }

        // flip bool so the next operation is the oposite (expand -> collapse -> ...)
        this.expand = !this.expand;
    }

    private shortenMsg(msg: string): string {
        return this.msg.slice(0, this.maxMsgLength) + '...';   
    }
}