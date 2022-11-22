import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dalService from '@/services/dalService'
// import Dadleveldata from '@/types/Dadleveldata'

export const useDadLevels = defineStore('dadlevels', () => {
  const levelSelector = ref(0)
  const DalDataList = ref<any[]>([])
  const selectedImage = ref('')
  DalDataList.value.push(
    {
      fields: [
        {
          test: '1',
          number: 1,
          top: '15%',
          left: '6%',
          width: '10%',
          height: '4%',
          rightValue: 'Naam'
        },
        {
          test: '2',
          number: 2,
          top: '20%',
          left: '31%',
          width: '20%',
          height: '4%',
          rightValue: 'test@gmail.com'
        },
        {
          test: '3',
          number: 3,
          top: '25%',
          left: '31%',
          width: '15%',
          height: '4%',
          rightValue: '488 04 05 06'
        },
        {
          test: '4',
          number: 4,
          top: '31%',
          left: '6%',
          width: '15%',
          height: '4%',
          rightValue: 'Adres'
        },
        {
          test: '5',
          number: 5,
          top: '36%',
          left: '6%',
          width: '15%',
          height: '4%',
          rightValue: 'Geboortedatum'
        },
        {
          test: '6',
          number: 6,
          top: '6%',
          left: '6%',
          width: '20%',
          height: '5%',
          rightValue: 'Personalia'
        },
        {
          test: '7',
          number: 7,
          top: '72%',
          left: '6%',
          width: '18%',
          height: '5%',
          rightValue: 'Opleidingen'
        }
      ],
      backImage: '/src/assets/images/form4.png'
    },
    {
      fields: [
        {
          test: '1',
          number: 1,
          top: '2%',
          left: '6%',
          width: '70%',
          height: '8%',
          rightValue: 'Curriculum Vitae'
        },
        {
          test: '2',
          number: 2,
          top: '22%',
          left: '7%',
          width: '60%',
          height: '7%',
          rightValue: 'Persoonsgegevens'
        },
        {
          test: '3',
          number: 3,
          top: '74%',
          left: '6%',
          width: '50%',
          height: '8%',
          rightValue: 'Werkervaring'
        }
      ],
      backImage: '/src/assets/images/form2mobile.png'
    }
  )

  const addData = (data: any) => {
    DalDataList.value.push(data)
  }
  const getData = () => {
    return DalDataList.value
  }
  const setLevel = (level: number) => {
    levelSelector.value = level
  }
  const getLevel = () => {
    return levelSelector.value
  }

  const getDragAndLearn = async () => {
    const DalList = await dalService.getDragAndLearn().catch((error) => {
      console.log(error)
    })
    console.log(DalList)
    // DalDataList.value.push(DalList);
  }
  const addDragAndLearn = (newDragAndLearnExercice: any) => {
    dalService.postDragAndLearn(newDragAndLearnExercice).catch((error) => {
      console.log(error)
      return 1
    })
    DalDataList.value.push(newDragAndLearnExercice)
  }

  const getImageUrl = () => {
    return selectedImage.value
  }

  const addImageUrl = (url: string) => {
    selectedImage.value = url
  }

  return {
    selectedImage,
    DalDataList,
    addData,
    getData,
    setLevel,
    getLevel,
    getDragAndLearn,
    addDragAndLearn,
    getImageUrl,
    addImageUrl
  }
})
