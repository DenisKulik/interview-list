import { getDocs, query, collection, orderBy, deleteDoc, doc } from 'firebase/firestore'
import type { IInterview } from '@/types'
import { db } from '@/main'

export const fetchInterviews = async <T extends IInterview>(userId: string): Promise<T[]> => {
  const getData = query(collection(db, `users/${userId}/interviews`), orderBy('createdAt', 'desc'))
  const listDocs = await getDocs(getData)

  return listDocs.docs.map((doc) => doc.data() as T)
}

export const deleteInterviewRequest = async (
  userId: string,
  interviewId: string
): Promise<void> => {
  await deleteDoc(doc(db, `users/${userId}/interviews`, interviewId))
}
