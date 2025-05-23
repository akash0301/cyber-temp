import React, { useEffect, useState } from "react";
import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";
import filter from "../../assets/filter.svg";
import display from "../../assets/display.svg";
import plus from "../../assets/plus.svg";
import video from "../../assets/video.svg";
import clipboard from "../../assets/clipboard.svg";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";
import audit from "../../assets/audit.svg";
import web from "../../assets/web.svg";
import back from "../../assets/back.svg";
import expand from "../../assets/expand.svg";
import scope from "../../assets/scope.svg";
import webapp from "../../assets/webapp.svg";
import network from "../../assets/network.svg";
import close from "../../assets/close.svg";
import horizontal_menu from "../../assets/horizontal_menu.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
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
import { useNavigate, useParams } from "react-router-dom";
import json from "../../json/CWE_V.4.3.json";
import api from "@/src/api/api";
import { toast } from "react-hot-toast";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    managerName: "",
    status: "Pending",
    type: "Web App",
    startDate: "",
    endDate: "",
  });
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const { id } = useParams();

  const handleSubmit = async () => {
    try {
      await api.post(
        `http://localhost:3000/api/v1/client/create-project/${id}`,
        projectDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const response = await api.get(
        `http://localhost:3000/api/v1/client/get-projects/${id}?page=${currentPage}&limit=${recordsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setProjects((prevProjects) => [...prevProjects, response.data]);

      setProjectDetails({
        projectName: "",
        managerName: "",
        status: "Pending",
        type: "Web App",
        startDate: "",
        endDate: "",
      });

      toast.success("Project added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error adding project");
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      const response = await api.get(
        `http://localhost:3000/api/v1/client/get-projects/${id}?page=${currentPage}&limit=${recordsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setProjects(response.data.projects);
      setTotalRecords(response.data.total);
    };
    fetchProject();
  }, [currentPage, recordsPerPage]);

  const handleRecordsPerPageChange = (event) => {
    setRecordsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage * recordsPerPage < totalRecords) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  const fetchVulnerabilities = async (id) => {
    const response = await api.get(
      `http://localhost:3000/api/v1/client/get-vulnerabilities/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setVulnerabilities(response.data.vulnerabilities);
  };

  const handleRowClick = (project) => {
    setSelectedProject({ ...project });
    fetchVulnerabilities(project._id);
  };

  const navigate = useNavigate();

  return (
    <Sheet>
      <AlertDialog>
        <div>
          <Topbar active="Project Details" />
          <Sidebar activePage="clients" />
          <div className="flex items-end justify-end ">
            <div className="text-white h-full w-[80vw] px-4 pr-8 py-6 top-24 relative">
              <div className="flex justify-between w-full mb-8">
                <div className="flex rounded-lg border-2 border-[#292929] w-[20%]">
                  <div className="flex gap-2 items-center justify-center border-r-2 border-[#292929] w-1/2 m-2">
                    <img src={filter} />
                    <p className="text-[#868686]">Filter</p>
                  </div>
                  <div className="flex gap-2 items-center justify-center m-2 w-1/2">
                    <img src={display} />
                    <p className="text-[#868686]">Display</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-0 border-none">
                      <div className="h-full items-center justify-center flex border-2 p-2 rounded-lg px-3 border-[#343434]">
                        <img src={horizontal_menu} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#1c1c1c] rounded-lg p-2 text-2xl w-72 border-none">
                      <DropdownMenuItem>
                        <div className="border-b-2 border-[#272727] hover:cursor-pointer">
                          <div className="flex gap-2 items-center my-2">
                            <div>
                              <img src={video} className="h-5" />
                            </div>
                            <div className="text-white">
                              <p>Book Meeting</p>
                            </div>
                          </div>
                          <div className="text-[#7e7e7e] text-xs my-2">
                            <p>Coming Soon</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="hover:cursor-pointer">
                          <div className="flex gap-2 items-center my-2">
                            <div>
                              <img src={clipboard} className="h-5" />
                            </div>
                            <div className="text-white">
                              <p>Documents</p>
                            </div>
                          </div>
                          <div className="text-[#7e7e7e] text-xs my-2">
                            <p>Coming Soon</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialogTrigger>
                    <div className="p-2 flex rounded-lg bg-[#005de9] items-center">
                      <img src={plus} className="h-4 mx-2" />
                      <p className="mr-2">Add New Project</p>
                    </div>
                  </AlertDialogTrigger>
                </div>
              </div>
              <div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow className="text-[#747474] border-0">
                        <TableHead className="w-[20%] text-start px-8 py-5">
                          Project Name
                        </TableHead>
                        <TableHead className="w-[20%] text-start">
                          Manager
                        </TableHead>
                        <TableHead className="w-[15%] text-start">
                          Type
                        </TableHead>
                        <TableHead className="w-[15%] text-start">
                          Status
                        </TableHead>
                        <TableHead className="w-[15%] text-start">
                          Start Date
                        </TableHead>
                        <TableHead className="w-[15%] text-start">
                          End Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project, idx) => (
                        <>
                          <TableRow
                            key={idx}
                            className={`border-0 hover:cursor-pointer ${
                              idx % 2 === 0 ? "bg-[#1b1b1b]" : ""
                            }`}
                            onClick={() => handleRowClick(project)}
                          >
                            <TableCell
                              className="w-[20%] text-start px-8"
                              onClick={() => fetchVulnerabilities(project._id)}
                            >
                              <SheetTrigger>{project.projectName}</SheetTrigger>
                            </TableCell>
                            <TableCell className="w-[20%] text-start">
                              <SheetTrigger>{project.managerName}</SheetTrigger>
                            </TableCell>
                            <TableCell className="w-[15%] text-start">
                              <div className="flex gap-2">
                                <div>
                                  <img
                                    src={
                                      project.type === "Audit"
                                        ? audit
                                        : project.type === "Network"
                                        ? network
                                        : web
                                    }
                                  />
                                </div>
                                <SheetTrigger>{project.type}</SheetTrigger>
                              </div>
                            </TableCell>
                            <TableCell className="w-[15%] text-start">
                              <SheetTrigger>{project.status}</SheetTrigger>
                            </TableCell>
                            <TableCell className="w-[15%] text-start">
                              <SheetTrigger>
                                {project.startDate.split("T")[0]}
                              </SheetTrigger>
                            </TableCell>
                            <TableCell className="w-[15%] text-start">
                              <SheetTrigger>{`${
                                project.endDate.split("T")[0]
                              }`}</SheetTrigger>
                            </TableCell>
                          </TableRow>
                          {selectedProject && (
                            <SheetContent className="fixed top-0 right-0 w-screen bg-black/50">
                              <div className="absolute top-0 right-0 z-50 min-h-screen text-white border-0 w-[50vw] bg-[#1c1c1c] p-8 flex flex-col justify-between">
                                <div className="w-full h-full">
                                  <div className="flex">
                                    <SheetClose>
                                      <img
                                        src={back}
                                        className="pr-4 border-r-2 border-[#393939]"
                                      />
                                    </SheetClose>
                                    <div
                                      className="mx-4 hover:cursor-pointer"
                                      onClick={() =>
                                        navigate(
                                          `/projects/${selectedProject.projectName}-${selectedProject._id}`
                                        )
                                      }
                                    >
                                      <img src={expand} />
                                    </div>
                                  </div>
                                  <div className="py-4">
                                    <div className="flex gap-6 items-center">
                                      <p className="text-3xl">
                                        {selectedProject.projectName}
                                      </p>
                                      <p className="text-white text-xs bg-[#00874d] rounded-md py-1 px-6">
                                        Complete
                                      </p>
                                    </div>
                                    <div className="my-4 text-sm flex gap-2">
                                      <div>
                                        <img src={webapp} />
                                      </div>
                                      <div>
                                        <p>Web App</p>
                                      </div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <div>
                                        <span className="text-[#535353]">
                                          Managed by:{" "}
                                        </span>
                                        {selectedProject.managerName}
                                      </div>
                                      <div className="flex gap-2 items-center">
                                        <div>
                                          <p>
                                            {
                                              selectedProject.startDate.split(
                                                "T"
                                              )[0]
                                            }{" "}
                                            -{" "}
                                            {
                                              selectedProject.endDate.split(
                                                "T"
                                              )[0]
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="py-4">
                                    <div className="rounded-xl bg-[#202020]">
                                      <div className="flex justify-between px-8 py-4">
                                        <div className="text-2xl">
                                          List of vulnerabilities
                                        </div>
                                        <div className="flex gap-4 text-sm">
                                          <div className="flex p-1 px-2 gap-1 border-2 rounded-lg border-[#0066ff] items-center">
                                            <img src={scope} />
                                            <p>Scope</p>
                                          </div>
                                          <div
                                            className="flex p-1 px-2 gap-1 rounded-lg bg-[#0066ff] items-center"
                                            onClick={() => {
                                              if (
                                                selectedProject &&
                                                selectedProject._id
                                              ) {
                                                console.log(
                                                  "Navigating to Add Vulnerability for Project ID:",
                                                  selectedProject._id
                                                );
                                                navigate(
                                                  `/Projects/${selectedProject._id}/add`
                                                );
                                              } else {
                                                console.error(
                                                  "No project selected or invalid project ID."
                                                );
                                              }
                                            }}
                                          >
                                            <img src={plus} className="h-4" />
                                            <p>Add Vulnerability</p>
                                          </div>
                                        </div>
                                      </div>
                                      <Table>
                                        <TableHeader className="border-y-2 border-[#2d2d2d]">
                                          <TableRow className="text-[#747474] border-0">
                                            <TableHead className="w-[20%] text-start px-8 py-">
                                              Test Name
                                            </TableHead>
                                            <TableHead className="w-[20%] text-start">
                                              Severity
                                            </TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {vulnerabilities.map(
                                            (vulnerability, idx) => (
                                              <TableRow
                                                key={idx}
                                                className={`border-0 hover:cursor-pointer ${
                                                  idx % 2 === 0
                                                    ? "bg-[#1b1b1b]"
                                                    : ""
                                                }`}
                                              >
                                                <TableCell className="w-[80%] text-start px-8">
                                                  <SheetTrigger>
                                                    {vulnerability.issueTitle}
                                                  </SheetTrigger>
                                                </TableCell>
                                                <TableCell className="w-[20%] text-start">
                                                  <SheetTrigger>
                                                    {vulnerability.severity}
                                                  </SheetTrigger>
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                        </TableBody>
                                      </Table>
                                    </div>
                                    {/* <div className="my-8 flex justify-between w-full border">
                                      <div className="flex gap-4 items-center">
                                        <div className="text-xs text-[#a2a1a8]">
                                          Showing
                                        </div>
                                        <div className="">
                                          <select className="p-1 text-xs rounded-md bg-inherit border-2 border-[#292929]">
                                            <option className="bg-[#171717]">
                                              10
                                            </option>
                                            <option className="bg-[#171717]">
                                              9
                                            </option>
                                            <option className="bg-[#171717]">
                                              8
                                            </option>
                                            <option className="bg-[#171717]">
                                              7
                                            </option>
                                            <option className="bg-[#171717]">
                                              6
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="text-xs text-[#a2a1a8]">
                                        <p>Showing 1 to 10 out of 60 records</p>
                                      </div>
                                      <div className="flex gap-2 items-center text-[#a2a1a8]">
                                        <div>
                                          <img src={left} />
                                        </div>
                                        <div className="text-xs p-1 px-2 text-[#0066ff] border border-[#0066ff] rounded-md">
                                          <p>1</p>
                                        </div>
                                        <div className="text-xs p-1 px-2">
                                          <p>2</p>
                                        </div>
                                        <div className="text-xs p-1 px-2">
                                          <p>3</p>
                                        </div>
                                        <div className="text-xs p-1 px-2">
                                          <p>4</p>
                                        </div>
                                        <div>
                                          <img src={right} />
                                        </div>
                                      </div>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </SheetContent>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="my-8 flex justify-between w-full">
                  <div className="flex gap-4 items-center">
                    <div className="text-xs text-[#a2a1a8]">Showing</div>
                    <div>
                      <select
                        className="p-1 text-xs rounded-md bg-inherit border-2 border-[#292929] bg-black"
                        value={recordsPerPage}
                        onChange={handleRecordsPerPageChange}
                      >
                        <option className="bg-black" value={10}>
                          10
                        </option>
                        <option className="bg-black" value={20}>
                          20
                        </option>
                        <option className="bg-black" value={30}>
                          30
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-[#a2a1a8]">
                    <p>
                      Showing {startRecord} to {endRecord} out of {totalRecords}{" "}
                      records
                    </p>
                  </div>

                  <div className="flex gap-2 items-center text-[#a2a1a8]">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`p-1 px-2 rounded-md ${
                        currentPage === 1
                          ? "text-gray-400"
                          : "border-[#0066ff] text-[#0066ff]"
                      }`}
                    >
                      &lt;
                    </button>

                    {Array.from(
                      { length: totalRecords / recordsPerPage + 1 },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageClick(index + 1)}
                          className={`p-1 px-2 rounded-md ${
                            currentPage === index + 1
                              ? "border border-[#0066ff] text-[#0066ff]"
                              : "text-[#a2a1a8]"
                          }`}
                        >
                          {index + 1}
                        </button>
                      )
                    )}

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalRecords}
                      className={`p-1 px-2 rounded-md ${
                        currentPage === totalRecords
                          ? "text-gray-400"
                          : "border-[#0066ff] text-[#0066ff]"
                      }`}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AlertDialogContent className="fixed top-0 left-0 z-50 text-white border-0 h-screen w-screen bg-black/50 flex items-center justify-center">
          <div className="absolute bg-[#1c1c1c] rounded-xl px-4 pb-4 w-[35vw]">
            <AlertDialogCancel className="w-full flex justify-end border-none p-0 bg-inherit">
              <img src={close} />
            </AlertDialogCancel>
            <AlertDialogHeader className="flex flex-col items-start pb-3 border-b-2 border-[#373737] w-full">
              <AlertDialogTitle className="text-2xl">
                Add New Project(Test)
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[#7e7e7e]">
                Enter Details for Software Vulnerability Assessment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-6">
              <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4">
                <label className="font-semibold">Project/Test Name</label>
                <input
                  type="text"
                  className="bg-[#272727] font-thin w-full focus:outine-0 focus:border-0 p-3 rounded-lg"
                  placeholder="Enter name of the project/test"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      projectName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4">
                <label className="font-semibold">Manager Name</label>
                <input
                  type="text"
                  className="bg-[#272727] font-thin w-full focus:outine-0 p-3 rounded-lg"
                  placeholder="Enter manager name"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      managerName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4 w-1/2">
                  <label className="font-semibold">Type</label>
                  <select
                    type="text"
                    className="bg-[#272727] font-thin w-full focus:outine-0 p-3 rounded-lg"
                    placeholder="Select test status"
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="volvo">Web App</option>
                    <option value="saab">Software</option>
                    <option value="opel">Android</option>
                    <option value="audi">Mac</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4 w-1/2">
                  <label className="font-semibold">Status</label>
                  <select
                    type="text"
                    className="bg-[#272727] font-thin w-full focus:outine-0 p-3 rounded-lg"
                    placeholder="Select test type"
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="volvo">Pending</option>
                    <option value="saab">Waitlisted</option>
                    <option value="opel">Incomplete</option>
                    <option value="audi">Complete</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4 w-1/2">
                  <label className="font-semibold">From</label>
                  <input
                    type="date"
                    className="bg-[#272727] font-thin w-full focus:outine-0 p-3 rounded-lg"
                    placeholder="Select Date"
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 text-[#d2d2d2] text-sm my-4 w-1/2">
                  <label className="font-semibold">To</label>
                  <input
                    type="date"
                    className="bg-[#272727] font-thin w-full focus:outine-0 p-3 rounded-lg"
                    placeholder="Select Date"
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <AlertDialogFooter className="flex gap-3 items-center justify-end">
              <AlertDialogCancel className="rounded-lg border-2 border-[#1368e8] bg-inherit px-8 my-2">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-lg bg-[#1368e8] px-8 my-2"
                onClick={handleSubmit}
              >
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
}

export default Projects;
