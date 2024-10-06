import {
  getDocs,
  query,
  collection,
  orderBy,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from '@/main'
import type { IInterview, IStage } from '@/types'

export const fetchInterviews = async <T extends IInterview>(
  userId: string,
  filter?: string
): Promise<T[]> => {
  let getData
  if (filter) {
    getData = query(
      collection(db, `users/${userId}/interviews`),
      orderBy('createdAt', 'desc'),
      where('result', '==', filter)
    )
  } else {
    getData = query(collection(db, `users/${userId}/interviews`), orderBy('createdAt', 'desc'))
  }

  const listDocs = await getDocs(getData)

  return listDocs.docs.map((doc) => doc.data() as T)
}

export const fetchInterview = async <T extends IInterview>(
  userId: string,
  interviewId: string
): Promise<T> => {
  const docref = doc(db, `users/${userId}/interviews`, interviewId)
  const docSnap = await getDoc(docref)

  if (docSnap.exists()) {
    const data = docSnap.data() as T

    if (data.stages && data.stages.length) {
      data.stages = data.stages.map((stage: IStage) => {
        if (stage.date && stage.date instanceof Timestamp) {
          return {
            ...stage,
            date: stage.date.toDate()
          }
        }
        return stage
      })
    }

    return data
  }

  throw new Error('Интервью не найдено')
}

export const saveInterviewRequest = async (
  userId: string,
  interviewId: string,
  payload: IInterview
): Promise<void> => {
  const docref = doc(db, `users/${userId}/interviews`, interviewId)
  await updateDoc(docref, { ...payload })
}

export const deleteInterviewRequest = async (
  userId: string,
  interviewId: string
): Promise<void> => {
  await deleteDoc(doc(db, `users/${userId}/interviews`, interviewId))
}

export const createInterviewRequest = async (
  userId: string,
  payload: IInterview
): Promise<void> => {
  await setDoc(doc(db, `users/${userId}/interviews`, payload.id), payload)
}
