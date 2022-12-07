import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import school from '@/services/school'

interface objectClass {
    id: number
    name: string
}

export const useSchoolsStore = defineStore('school', () => {
    const schoolList = ref<objectClass[]>([])

    const getSchoolName = async () => {
        const schoolRequest = await school.getSchool()
        const schoolData = schoolRequest.data
        console.log(schoolData)
        for (let i in schoolData){
            schoolList.value.push({id: schoolData[i].id, name: schoolData[i].name})    
        }
      }
      console.log(schoolList.value)
     
    return { schoolList, getSchoolName }
})

