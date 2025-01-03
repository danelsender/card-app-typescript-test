import {useContext} from 'react'
import { EntryContext } from '../utilities/globalContext'
import { EntryContextType, Entry } from '../@types/context'
import { useNavigate, Link } from "react-router-dom";

export default function AllEntries(){
    const {entries, deleteEntry} = useContext(EntryContext) as EntryContextType
    let navigate = useNavigate();
    if(entries.length == 0){
        return(
            <section>
                <h1 className="text-center font-semibold text-2xl m-5">You don't have any card</h1>
                <p className="text-center font-medium text-md">Lets <Link className="text-blue-400 underline underline-offset-1" to="/create">Create One</Link></p>
            </section>
        )
    }
    return(
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {entries.map((entry: Entry, index: number) => {
                return(
                    <div id={entry.id} key={index} className="bg-gray-300 dark:bg-gray-600 shadow-md shadow-gray-500 m-3 p-4 rounded justify-between flex flex-col">
                        <h1 className="font-bold text-center text-sm break-words">{entry.title}</h1>
                        <p className="text-center text-lg font-light mt-1 mb-3 break-words">{entry.description}</p>
                        <section className="flex items-center justify-between flex-col pt-2">
                           <time className="flex text-left text-sm "> Created: {new Date(entry.created_at.toString()).toLocaleDateString()} </time>
                           <time className="flex text-left text-sm "> Scheduled: {new Date(entry.scheduled_for.toString()).toLocaleDateString()} </time>
                           <div className="flex justify-center">
                              <button onClick={()=> {deleteEntry(entry.id as string)}} className="m-1 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700">Delete</button>
                              <button onClick={()=> {navigate(`/edit/${entry.id}`, { replace: true });}} className="m-1 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700">Edit</button>
                           </div>
                        </section>
                        
                    </div>
                )
            })}
        </section>
    )
}