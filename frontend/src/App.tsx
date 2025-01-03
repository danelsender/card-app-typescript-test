import React, {useEffect, useState} from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Switch } from "@mui/material"

export default function App() {

   // state to toggle the dark mode
   const [toggleDarkMode, setToggleDarkMode] = useState(false);

  // function to toggle the dark mode as true or false
//   const toggleDarkTheme = () => {
//     setToggleDarkMode(!toggleDarkMode);
//   };

const toggleDarkTheme = () => {
   document.documentElement.classList.toggle('dark')
   setToggleDarkMode(!toggleDarkMode);
}

   // applying the primary and secondary theme colors
const darkTheme = createTheme({
   palette: {
      mode: toggleDarkMode ? 'dark' : 'light', // handle the dark mode state on toggle
      primary: {
         main: '#90caf9',
     },
      secondary: {
         main: '#f48fb1',
     },
   },
});

  return (
      
      <div className="text-black dark:text-white dark:bg-black" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

         // Adding the switch button  
         <Switch onChange={toggleDarkTheme} />
         <section>
            <Router>
               <EntryProvider>
                  <NavBar></NavBar>
                     <Routes>
                     <Route path="/" element={<AllEntries/>}>
                     </Route>
                     <Route path="create" element={<NewEntry/>}>
                     </Route>
                     <Route path="edit/:id" element={<EditEntry/>}>
                     </Route>
                     </Routes>
               </EntryProvider>
            </Router>
         </section>
    </div>
    
  );
}
