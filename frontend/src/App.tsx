import { Routes, Route, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx'
import JobsPage from './pages/JobsPage.tsx'

export default function App() {
  // defining default layout
  const Layout = () => {
    return (
      <div>
        <Header onToggleTheme={toggleTheme} darkMode={darkMode} />
        <Outlet context={{ darkMode }}/>
        <Footer/>
      </div>  
    )
  }

  // light mode
  const [darkMode, setDarkMode] = useState<boolean>(true)

  const toggleTheme = () => {
      setDarkMode(prev => !prev) // recommended over set(!dark)
  }

  useEffect(()=> {
      if (darkMode) {
          document.documentElement.style.setProperty('--background-color', '#18181B');
          document.body.style.backgroundColor = '#18181B';
      } else {
          document.documentElement.style.setProperty('--background-color', '#ffffff');
          document.body.style.backgroundColor = '#ffffff';
      }
  }, [darkMode])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicyPage />} />
          <Route path="/Jobs" element={<JobsPage />} />
        </Route>
      </Routes>
    </div>
  );
}