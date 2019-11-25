import { mount } from '@vue/test-utils'
import profileForm from '@components/profileForm/profileForm.vue'

describe('profileForm', () => {
    test('adds a profile', () => {
        expect(addProfile("Profile")).toContain("Profile");
    });
})
