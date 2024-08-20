import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/DashProfile';

export default function DashBoard() {
  const location = useLocation()
  const [ tab, setTab ] = useState('')
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get('tab');
    if(tabFromUrl)
    {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sliebar*/}
        <DashSidebar />
      </div>
        {/* profile ...*/}
        {tab === 'profile' && <DashProfile />}
    </div>
  )
}
