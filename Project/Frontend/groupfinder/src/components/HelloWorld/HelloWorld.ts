import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './HelloWorld.html';
require('./HelloWorld.css')

@WithRender
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}