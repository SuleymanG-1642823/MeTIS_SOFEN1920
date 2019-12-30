import {shallowMount} from "@vue/test-utils";
import SocialMedia from "@/components/SocialMedia/SocialMedia";

var wrapper;
var social_media_prop;
var set_links = function setLinks(links){
    this.links = links;
}

describe('SocialMedia component', () => {
    beforeAll(() => {
        social_media_prop = [
            {prefix: "https://facebook.com/", suffix: "firstname.lastname", state: false},
            {prefix: "https://twitter.com/", suffix: "firstname.lastname", state: false},
            {prefix: "https://linkedin.com/", suffix: "firstname.lastname", state: false},
            {prefix: "https://github.com/", suffix: "", state: false},
        ]
        wrapper = shallowMount(SocialMedia, {
            propsData: {social_media_prop, set_links}
        })
    })
    test('test for correctly initializing component', (done) => {
        expect(wrapper.vm.links).toEqual(social_media_prop);
        done();
    })
})