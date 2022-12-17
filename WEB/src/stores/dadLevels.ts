import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dalService from '@/services/dalService'
import type Dadleveldata from '@/types/Dadleveldata'
import type { LevelMap } from '@/types/map'
import mapService from '@/services/mapService'
// import useMapStore from './map'

// const mapLevelData = await useMapStore().newLevel

export const useDadLevels = defineStore('dadlevels', () => {
  const levelSelector = ref(0)
  const DalDataList = ref<any[]>([])
  const DalDataListTemp: any = ref({ fields: { pc: [], mobile: [] }, backImage: '' })

  // const selectedImageUrl = ref('')
  const selectedImageData = ref(null)

  const levelName = ref('Niveau test 1')

  DalDataList.value.push(
    {
      fields: {
        pc: [
          {
            test: '1',
            number: 1,
            top: '15%',
            left: '6%',
            width: '10%',
            height: '4%',
            rightValue: 'Naam',
            fontSize: '14px'
          },
          {
            test: '2',
            number: 2,
            top: '20%',
            left: '31%',
            width: '20%',
            height: '4%',
            rightValue: 'test@gmail.com',
            fontSize: '14px'
          },
          {
            test: '3',
            number: 3,
            top: '25%',
            left: '31%',
            width: '15%',
            height: '4%',
            rightValue: '488 04 05 06',
            fontSize: '14px'
          },
          {
            test: '4',
            number: 4,
            top: '31%',
            left: '6%',
            width: '15%',
            height: '4%',
            rightValue: 'Adres',
            fontSize: '14px'
          },
          {
            test: '5',
            number: 5,
            top: '36%',
            left: '6%',
            width: '15%',
            height: '4%',
            rightValue: 'Geboortedatum',
            fontSize: '14px'
          },
          {
            test: '6',
            number: 6,
            top: '6%',
            left: '6%',
            width: '20%',
            height: '5%',
            rightValue: 'Personalia',
            fontSize: '14px'
          },
          {
            test: '7',
            number: 7,
            top: '72%',
            left: '6%',
            width: '18%',
            height: '5%',
            rightValue: 'Opleidingen',
            fontSize: '14px'
          }
        ],
        mobile: []
      },
      backImage: 'src/assets/images/form4.png'
    },
    {
      fields: {
        pc: [],
        mobile: [
          {
            test: '1',
            number: 1,
            top: '2%',
            left: '6%',
            width: '70%',
            height: '8%',
            rightValue: 'Curriculum Vitae',
            fontSize: '14px'
          },
          {
            test: '2',
            number: 2,
            top: '22%',
            left: '7%',
            width: '60%',
            height: '7%',
            rightValue: 'Persoonsgegevens',
            fontSize: '14px'
          },
          {
            test: '3',
            number: 3,
            top: '74%',
            left: '6%',
            width: '50%',
            height: '8%',
            rightValue: 'Werkervaring',
            fontSize: '14px'
          }
        ]
      },
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

  // const getDragAndLearn = async () => {
  //   const DalList = await dalService.getDragAndLearn().catch((error) => {
  //     console.log(error)
  //   })
  //   console.log(DalList)
  //   // DalDataList.value.push(DalList);
  // }
  const addDragAndLearnDB = async (
    mapLevelData: LevelMap,
    newDragAndLearnExerciceData: Dadleveldata,
    newDragAndLearnImage: File | null
  ) => {
    if (newDragAndLearnImage === null) {
      console.log('no image')
      return 1
    }
    const payload = {
      levelData: JSON.stringify(newDragAndLearnExerciceData)
    }

    mapService
      .setDadLevelMap(mapLevelData, payload)
      .catch((error) => {
        console.log(error)
        return 1
      })
      .then((response: number) => {
        dalService
          .postDalImage(newDragAndLearnImage, response)
          .catch((error) => {
            console.log(error)
            return 1
          })
          .then((response) => {
            return response
          })
      })
    // DalDataList.value.push(payload)
  }

  // const addDragAndLearnImage = (image: any) => {
  //   dalService.postDalImage(image).catch((error) => {
  //     console.log(error)
  //     return 1
  //   })
  // }

  const setTempData = (data: any, type: string) => {
    DalDataListTemp.value.fields[type] = data
  }

  const getTempData = () => {
    return DalDataListTemp.value.fields
  }

  const getImageUrl = () => {
    return DalDataListTemp.value.backImage
  }

  const setImageUrl = (url: string) => {
    DalDataListTemp.value.backImage = url
  }

  const getImageData = () => {
    return selectedImageData.value
  }

  const setImageData = (data: any) => {
    selectedImageData.value = data
  }

  // const getTotalData = () => {
  //   let payload = {
  //     levelData: DalDataListTemp.value,
  //     levelName: levelName.value,
  //     creator: ''
  //   }
  //   return payload
  // }

  return {
    DalDataList,
    levelSelector,
    addData,
    getData,
    setLevel,
    getLevel,
    // getDragAndLearn,
    addDragAndLearnDB,
    // addDragAndLearnImage,
    setTempData,
    getTempData,
    getImageUrl,
    setImageUrl,
    getImageData,
    setImageData
    // getTotalData
  }
})
