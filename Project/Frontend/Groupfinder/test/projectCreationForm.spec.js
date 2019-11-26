import {mount} from "@vue/test-utils"
import projectForm from "@/components/projectCreationForm/projectCreationForm.vue"

describe('ProjectForm', () => {
  test('adds a profile', () => {
    const wrapper = mount(projectForm)
    wrapper.vm.addProfile()
    expect(wrapper.vm.$data.profilesList[0]).toBe("Profile-1")
  })
  test('removes a profile', () => {
    const wrapper = mount(projectForm)
    wrapper.vm.addProfile()
    wrapper.vm.deleteProfileForm('Profile-1')
    expect(wrapper.vm.$data.profilesList).toEqual([])
  })
})
