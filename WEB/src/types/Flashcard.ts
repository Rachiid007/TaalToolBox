export default interface Flashcard {
  id: number
  word: string
  translation: string
  image: File | null
  url: string
}
