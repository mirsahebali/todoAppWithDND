import { Tab } from '@headlessui/react'
import TodoTab from './Todotab'
import Timer from "./Timer"
export default function Tabs() {
  return (
    <Tab.Group>
          <div className='flex justify-between bg-gradient-to-b from-cyan-900 to-cyan-500 text-white p-5 items-center w-[100vw]'>
          <div className='font-bold text-2xl'>Focus App</div>
      <Tab.List className={`flex justify-between`}>
        <Tab className={`m-2  border-2 py-3 px-4 hover:bg-white hover:text-black duration-300 rounded-md bg-red-950 border-cyan-950`}>Todo</Tab>
        <Tab className={`m-2  border-2 py-3 px-4 hover:bg-white hover:text-black duration-300 rounded-md bg-red-950 border-cyan-950`}>Focus Timer</Tab>
      </Tab.List>
      </div>
      <Tab.Panels>
        <Tab.Panel><TodoTab/></Tab.Panel>
        <Tab.Panel><Timer/></Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}