import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_for: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    // alert that scheduled_date can not be before created_date
    if (new Date(newEntry.created_at) > new Date(newEntry.scheduled_for)) {
      alert("Scheduled date can not be before created date");
      return;
    }
    // alert that scheduled_date can not be in the past
    // if (new Date(newEntry.scheduled_for) < new Date()) {
    //    alert("Scheduled date can not be in the past");
    //    return;
    // }
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  return (
    <section className="entryBox">
      <input
        className="inputText"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="inputText"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <input
        className="inputText"
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <input
        className="inputText"
        type="date"
        name="scheduled_for"
        value={new Date(newEntry.scheduled_for).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-blue-400 dark:bg-green-800 hover:bg-blue-600 dark:hover:bg-green-600 font-semibold text-white p-3 rounded-md"
      >
        Create
      </button>
    </section>
  );
}
