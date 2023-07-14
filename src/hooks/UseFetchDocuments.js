import { useEffect,useState } from "react";
import {db} from '../firebase/config';
import {
  collection, // definir a coleção 
  query, // pegar o dado
  orderBy, // ordenação
  onSnapshot, 
  where, // filtrar os resultados tragos
} from 'firebase/firestore'

export const UseFetchDocuments = (docCollection, search = null, uid = null)=> {

  const [documents, setDocuments] = useState("");
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [cancelled, setCanselled] = useState(false)

  useEffect(() => {

    async function loadData () {
      if(cancelled) return

      setLoading(true)

      const collectionRef = await collection(db, docCollection)

      try {

        let q;
        if(search){
          q = await query(collectionRef, where("tagsArray","array-contains", search),orderBy("createdAt","desc"))
        }else{
          q = await query(collectionRef, orderBy('createdAt', 'desc'))
        }

        await onSnapshot(q, (querySnapshot)=> {

          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        })
        
        setLoading(false)
      } catch (error) {
        console.log(error);
        setError(error.message)
      }
    }
    loadData()

  }, [docCollection, search, uid, cancelled])

  useEffect(() => {
    return () => setCanselled(true)
  }, [])

  return {documents, loading, error}

}
