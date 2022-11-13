export default interface Flashcard {
  id: number
  word: string | null
  translation: string
  image: string | null
  url?: string | null
}
