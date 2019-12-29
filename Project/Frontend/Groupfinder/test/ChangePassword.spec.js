import {mount, shallowMount} from "@vue/test-utils";
import ChangePassword from "@/components/ChangePassword/ChangePassword";

var userID_prop;
var wrapper;

describe('ChangePassword component', () => {
    beforeAll(() => {
        userID_prop = 1;
        wrapper = shallowMount(ChangePassword, {
            propsData: {userID_prop}
        });
    });
    test('Validate new password', (done) => {
        expect(wrapper.vm.validateData("abcd", "abcd")).toEqual(false);
        expect(wrapper.vm.validateData("abcdefgh", "abcdefgh")).toEqual(false);
        expect(wrapper.vm.validateData("Abcdefgh", "Abcdefgh")).toEqual(false);
        expect(wrapper.vm.validateData("12345678", "12345678")).toEqual(false);
        expect(wrapper.vm.validateData("ABCD1234", "ABCD1234")).toEqual(false);
        expect(wrapper.vm.validateData("abcd1234", "abcd1234")).toEqual(false);
        expect(wrapper.vm.validateData("Test1234", "abcd")).toEqual(false);
        expect(wrapper.vm.validateData("Test1234", "Test1234")).toEqual(true);
        done();
    })
})