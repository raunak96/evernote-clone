import { useEffect, useState } from 'react';

const useDebounce = (id,title,body) => {
    const [note,setNote] = useState({title:'',body:'',id:''});
    useEffect(()=>{
        const cleartime=setTimeout(()=>setNote(note=>({...note,id,body,title})),1500);

        return ()=>clearTimeout(cleartime);
    },[id,title,body]);

    return note;
};

export default useDebounce;