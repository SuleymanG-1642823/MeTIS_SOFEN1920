import {shallowMount} from "@vue/test-utils";
import EditUserData from '@/components/EditUserData/EditUserData';

var user_prop;
var wrapper;

describe('EditUserData component', () => {
    beforeAll(() => {
        user_prop = {
            id: 1,
            first_name: 'Lennert',
            last_name: 'Geebelen',
            mail: 'lennert.geebelen@student.uhasselt.be',
            address: "Nameofstreet 100",
            zip: "1234",
            city: "Nameofcity",
            tel: "+123456789",
            website: "www.example.com",
            social_media: null,
            available: true,
            private: false
        }
        wrapper = shallowMount(EditUserData, {
            propsData: {user_prop}
        });
    });
    test('Test if submit is permitted.', (done) => {
        expect(wrapper.vm.submit_permitted).toEqual(true);
        wrapper.vm.first_name = "@";
        expect(wrapper.vm.submit_permitted).toEqual(false);
        wrapper.vm.first_name = 'Liese';
        expect(wrapper.vm.submit_permitted).toEqual(true);
        done();
    })
    test('Test SetLinks(links) method', (done) => {
        var newLinks = [
            {prefix: "https://facebook.com/", suffix: "test", state: false},
            {prefix: "https://twitter.com/", suffix: "test", state: false},
            {prefix: "https://linkedin.com/", suffix: "", state: false},
            {prefix: "https://github.com/", suffix: "", state: false},
        ]
        wrapper.vm.setLinks(newLinks);
        expect(wrapper.vm.links).toEqual(newLinks);
        done();
    })
    test('ResetFields(event) method', (done) => {
        wrapper.vm.resetFields();
        expect(wrapper.vm.first_name).toEqual(user_prop.first_name);
        expect(wrapper.vm.last_name).toEqual(user_prop.last_name);
        expect(wrapper.vm.mail).toEqual(user_prop.mail);
        expect(wrapper.vm.tel).toEqual(user_prop.tel);
        expect(wrapper.vm.address).toEqual(user_prop.address);
        expect(wrapper.vm.zip).toEqual(user_prop.zip);
        expect(wrapper.vm.city).toEqual(user_prop.city);
        expect(wrapper.vm.website).toEqual(user_prop.website);
        expect(wrapper.vm.available).toEqual(user_prop.available)
        done();
    })
});
