import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import school from '@/services/school'

export const useSchoolsStore = defineStore('school', () => {
    const schoolList = ref<any[]>([])

    const getSchoolName = async () => {
        const schoolRequest = await school.getSchool()


        for (let i in schoolRequest.data){
            schoolList.value.push(schoolRequest[i].name)
        }
      }

    return { schoolList }
})

