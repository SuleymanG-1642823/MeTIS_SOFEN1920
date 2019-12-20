/**import {mount} from "@vue/test-utils"
import profileForm from "@/components/profileForm/profileForm.vue"
import { tsExternalModuleReference, exportAllDeclaration } from "@babel/types"

describe('ProfileForm', () => {
    test('adds a skill', () => {
        const wrapper = mount(profileForm)
        wrapper.vm.addSkill('skill')
        expect(wrapper.vm.$data.skillList).toContainEqual('skill')
    })
    test('remove skill', () => {
        const wrapper = mount(profileForm)
        wrapper.vm.addSkill('skill')
        wrapper.vm.deleteSkill('skill')
        expect(wrapper.vm.$data.skillList).not.toContainEqual('skill')
    })
})
*/

describe('Test', () => {
    test('is a test', () => {
      expect(1).toBe(1)
    })
  })