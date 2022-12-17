import { ChapterContentType } from '@/constants/chapter'

export type IChapter = {
  bookId: number
  bookName: string
  bookNameLW: string
  bookNameTH: string
  chapter: number
  contents: IChapterContent[]
}

export type IChapterContent = {
  type: ChapterContentType
  content: string
  verse?: number
}
