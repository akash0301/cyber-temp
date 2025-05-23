import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import plus from "../../assets/plus.svg";
import search from "../../assets/search.svg";
import filter from "../../assets/filter.svg";
import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";
import close from "../../assets/close.svg";
import hidden from "../../assets/hidden.svg";
import horizontal_menu from "../../assets/horizontal_menu.svg";
import Cards from "./cards";
import { Button } from "../../../components/ui/button";

const open = [
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
];
const inprogress = [
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
];
const resolved = [
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
  {
    title: "Vulnerability",
    sno: "TCKT0000156",
    desc: "Lorem ipsum dolor sit amet, adipiscing elit Aene...",
    team: "Team Name",
    date: "June 30, 2024",
  },
];

function Tickets() {
  return (
    <AlertDialog>
      <div>
        <Topbar active="Tickets" />
        <Sidebar activePage="Tickets" />
        <div className="flex items-end justify-end ">
          <div className="text-white h-full w-[80vw] px-4 pr-8 py-6 top-24 relative">
            <div className="flex justify-between w-full mb-8">
              <div className="flex gap-4">
                <div>
                  <div className="bg-[#171717] border-2 border-[#292929] rounded-lg p-2 flex">
                    <img src={search} className="mx-2" />
                    <input
                      className="bg-[#171717] mx-2 border-none focus:outline-0 w-80"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <div className="flex rounded-lg border-2 border-[#292929] px-8">
                  <div className="flex gap-2 items-center">
                    <img src={filter} />
                    <p className="text-[#868686]">Filter</p>
                  </div>
                </div>
              </div>
              <AlertDialogTrigger>
                <div className="p-2 flex rounded-lg bg-[#005de9] items-center">
                  <img src={plus} className="h-4 mx-2" />
                  <p className="mr-2">Add New Ticket</p>
                </div>
              </AlertDialogTrigger>
            </div>
            <div className="w-full mt-6 grid grid-cols-4 gap-8">
              <div>
                <div className="w-full flex justify-between items-center my-6">
                  <div className="flex gap-4 items-center">
                    <p className="text-[#939393] text-lg">Open</p>
                    <p className="text-[#ffad00] rounded-full h-6 w-6 flex items-center justify-center bg-[#412c00]">
                      5
                    </p>
                  </div>
                  <div>
                    <img src={horizontal_menu} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {open.map((op) => (
                    <Cards
                      title={op.title}
                      sno={op.sno}
                      team={op.team}
                      desc={op.desc}
                      date={op.date}
                      clr="#ffad00"
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="w-full flex justify-between items-center my-6">
                  <div className="flex gap-4 items-center">
                    <p className="text-[#939393] text-lg">In Progress</p>
                    <p className="text-[#ff0071] rounded-full h-6 w-6 flex items-center justify-center bg-[#350018]">
                      2
                    </p>
                  </div>
                  <div>
                    <img src={horizontal_menu} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {inprogress.map((op) => (
                    <Cards
                      title={op.title}
                      sno={op.sno}
                      team={op.team}
                      desc={op.desc}
                      date={op.date}
                      clr="#ff0071"
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="w-full flex justify-between items-center my-6">
                  <div className="flex gap-4 items-center">
                    <p className="text-[#939393] text-lg">Open</p>
                    <p className="text-[#9333ea] rounded-full h-6 w-6 flex items-center justify-center bg-[#2a0050]">
                      3
                    </p>
                  </div>
                  <div>
                    <img src={horizontal_menu} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {resolved.map((op) => (
                    <Cards
                      title={op.title}
                      sno={op.sno}
                      team={op.team}
                      desc={op.desc}
                      date={op.date}
                      clr="#9333ea"
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="w-full flex justify-between items-center my-6">
                  <div className="flex gap-4 items-center">
                    <p className="text-[#939393] text-lg">Hidden Columns</p>
                    <p className="text-[#ffad00]"></p>
                  </div>
                  <AlertDialogTrigger>
                    <div>
                      <img src={plus} />
                    </div>
                  </AlertDialogTrigger>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="border-dashed border-2 border-[#363636] rounded-xl flex items-center justify-center">
                    <div className="flex gap-2 font-bold py-[4.5rem]">
                      <img src={hidden} />
                      <p className="text-[#6d6d6d]">No Hidden Tickets</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialogContent className="fixed top-0 left-0 z-50 text-white border-0 h-screen w-screen bg-black/50 flex items-center justify-center">
        <div className="bg-[#1c1c1c] absolute rounded-xl px-4 pb-4 w-[35vw]">
          <AlertDialogCancel className="w-full bg-[#1c1c1c] flex justify-end border-none p-0">
            <img src={close} />
          </AlertDialogCancel>
          <AlertDialogHeader className="flex flex-col items-start pb-3 border-b-2 border-[#373737] w-full">
            <AlertDialogTitle className="text-2xl">
              Add New Ticket
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#7e7e7e]">
              Enter Details for Software Vulnerability Assessment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-6">
            <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4">
              <label className="font-semibold">Project Name</label>
              <input
                type="text"
                className="bg-[#272727] font-thin w-full focus:outine-0 focus:border-0 p-3 rounded-lg"
                placeholder="Enter name of the project"
              />
            </div>
            <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4">
              <label className="font-semibold">Vunerability</label>
              <input
                type="text"
                className="bg-[#272727] font-thin w-full focus:outine-0 p-3 rounded-lg"
                placeholder="Enter vulnerability name"
              />
            </div>
            <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4">
              <label className="font-semibold">Teams</label>
              <input
                type="text"
                className="bg-[#272727] font-thin w-full focus:outine-0 p-3 rounded-lg"
                placeholder="Enter team name"
              />
            </div>
            <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4">
              <label className="font-semibold">Description</label>
              <textarea
                className="bg-[#272727] font-thin w-full focus:outine-0 p-3 rounded-lg"
                placeholder="Enter Description"
              />
            </div>
          </div>
          <AlertDialogFooter className="flex gap-3 items-center justify-end">
            <AlertDialogCancel className="rounded-lg bg-[#1c1c1c] border-2 border-[#1368e8] px-8 my-2">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="rounded-lg bg-[#1368e8] px-8 my-2">
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Tickets;
