import {shallowMount} from "@vue/test-utils";
import UserData from "@/components/UserData/UserData";

var user_prop;
var wrapper;

describe('UserData component', () => {
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
        wrapper = shallowMount(UserData, {
            propsData: {user_prop}
        })
    });
    test('test for correctly initializing component', (done) => {
        expect(wrapper.vm.privateData).toBe(user_prop.private);
        expect(wrapper.vm.user).toEqual(user_prop);
        expect(wrapper.vm.social_media).toBe(null);
        done();
    })
    test('calculateAvgRating(reviews: Review[]) method', (done) => {
        var review = {
            id: 1,
            writer_id: 2,
            writer_first_name: 'Liese',
            writer_last_name: 'Bekkers',
            receiver_id: 1,
            receiver_first_name: 'Lennert',
            receiver_last_name:'Geebelen',
            project_id: 1,
            rating: 5,
            message: 'msg'
        }
        var reviews = [];
        reviews.push(review);
        review = {
            id: 1,
            writer_id: 3,
            writer_first_name: 'Arno',
            writer_last_name: 'Verstraete',
            receiver_id: 1,
            receiver_first_name: 'Lennert',
            receiver_last_name:'Geebelen',
            project_id: 1,
            rating: 3,
            message: 'msg'
        }
        reviews.push(review);
        expect(wrapper.vm.calculateAvgRating(reviews)).toBe(4);
        done();
    })
})