import {mount} from "@vue/test-utils"
import ProjectEdit from "@/components/ProjectEdit/ProjectEdit.ts"

describe('ProjectForm', () => {
  test('adds a profile', () => {
    const wrapper = mount(ProjectEdit)
    wrapper.vm.addProfile()
    expect(wrapper.vm.$data.project.profiles[0]).toBeTruthy()
  })
  test('removes a profile', () => {
    const wrapper = mount(projectForm)
    wrapper.vm.addProfile()
    wrapper.vm.deleteProfileForm('Profile-1')
    expect(wrapper.vm.$data.profilesList).toEqual([])
  })
})
