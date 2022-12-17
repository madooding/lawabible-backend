import { ChapterContentType } from '@/constants/chapter'

export type IChapter = {
  chapter: number
  bookName: string
  contents: IChapterContent[]
}

export type IChapterContent = {
  type: ChapterContentType
  content: string
  verse?: number
}
