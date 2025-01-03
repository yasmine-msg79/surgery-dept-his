"use client";

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLocationDot, faWeightScale, faRulerVertical, faJoint, faMaskFace, faChevronDown, faGraduationCap, faAward, faUserDoctor, faHouseChimneyMedical } from '@fortawesome/free-solid-svg-icons';
import '../Components/Components.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import GetPatientHistory from '../EditprofilePage/Handling/GetPatientHistory';
import GetDoctorCV from '../EditprofilePage/Handling/GetDoctorCV';



function UserInfo (){

    const [weight, setWeight] = useState(0.0);
    const [height, setHeight] = useState(0.0);
    const [smoking, setSmoking] = useState(false);
    const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
    const [role, setRole] = useState('');

    const [summary, setSummary] = useState('');
    const [education, setEducation] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [certification, setCertification] = useState('');
    const [privateclinical, setPrivateClinical] = useState('');

    const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);

    useEffect(() => {
        if (userObj) {
            setRole(userObj.role);
        }
    }, [userObj]);

    useEffect(() => {
        GetPatientHistory(userObj.uid)
        .then(data => {
          try {
            console.log("Patient History Data from Navbar", data);
            console.log("Patient History Data from Navbar", data.diseases);
            setWeight(data.phistory.weight);
            setHeight(data.phistory.height);
            setSmoking(data.phistory.smoking);
            setSelectedDiseases(data.diseases);
          } catch (err) {
            console.error("Error in setting data:", err);
          }
        })
        .catch(error => {
          console.log("Error in fetching Patient History Data:", error);
        });
        }, [userObj.id]);

        const GetSelectedDiseases = (diseases: Array<string>) => {
            if (diseases.length === 0) return "None";
            return diseases.join(", ");
          };
        const diseases = GetSelectedDiseases(selectedDiseases);
        console.log("Diseases:", diseases);

        useEffect(() => {
            GetDoctorCV(userObj.uid)
            .then(data => {
                try{
                    console.log("Doctor CV Data", data);
                    setSummary(data.summary);
                    setEducation(data.education);
                    setSpecialization(data.specialization);
                    setCertification(data.certification);
                    setPrivateClinical(data.privateclinical);
                } catch (err) {
                    console.error("Error in setting data:", err);
                }
            })
            .catch(error => {
                console.log("Error in fetching Doctor CV Data:", error);
            })
            const personalInfo = document.querySelector(".personal-info-title") as HTMLElement;
            const personalInfoContent = document.querySelector(".personal-info-content") as HTMLElement;
            const profileImage = document.querySelector(".profile-image") as HTMLElement;
            const infoBox = document.querySelector(".info-box") as HTMLElement;
            personalInfoContent.style.opacity = "0";
            personalInfo.style.opacity = "0";
            profileImage.style.opacity = "100";
            infoBox.style.height = "5rem";
            },[]);
    const handelDropDown = () => {
        const personalInfo = document.querySelector(".personal-info-title") as HTMLElement;
        const personalInfoContent = document.querySelector(".personal-info-content") as HTMLElement;
        const profileImage = document.querySelector(".profile-image") as HTMLElement;
        const infoBox = document.querySelector(".info-box") as HTMLElement;
        const arrow = document.querySelector(".arrow") as HTMLElement;
        if (personalInfoContent.style.opacity === "0") {
            arrow.style.transform = "rotate(180deg)";
            personalInfoContent.style.opacity = "100";
            personalInfo.style.opacity = "100";
            profileImage.style.opacity = "0";
            infoBox.style.height = "";
        } else {
            arrow.style.transform = "rotate(0deg)";
            personalInfoContent.style.opacity = "0";
            personalInfo.style.opacity = "0";
            profileImage.style.opacity = "100";
            infoBox.style.height = "5rem";
        }
    }

return (
    <>
    {role != "admin" && 
    <div className="transition-all duration-300 ease-out hover:ease-in   shadow-2xl rounded-3xl 
                     px-6 py-4 bg-gradient-to-r from-sky-900 to-indigo-900 w-full info-box">


        {/* personal info */}
            
        <div className="relative flex flex-row justify-between items-start ">
            
            {/* title */}
            <h1 className={`text-nowrap transition-opacity ease-in duration-50  
             ml-2 pacifico-font text-3xl mb-5 text-[#fdf0d5] personal-info-title
             `}>Personal info</h1>
    
            {/* image */}
            <div className={`absolute  transition-opacity ease-in duration-50  
                flex flex-row justfiy-start items-center gap-x-5 profile-image
                
                 `}>
                <img
                src={userObj.profileimage}
                alt="User"
                className={`w-[50px] h-[50px]
                rounded-full border-2 border-[#669bbc] hover:border-[#fdf0d5] transition duration-300 ease pointer bg-white`}
            />
                <p className=" text-[#fdf0d5] text-2xl text-nowrap">{userObj.firstname} {userObj.lastname}</p>
            </div>
            {/* edit button*/}


            <FontAwesomeIcon icon={faChevronDown} 
            className=" transition-all duration-200 ease-in text-[#fdf0d5] text-2xl inline mr-1 absolute right-2 top-2 hover:text-gray-400 cursor-pointer arrow"
            onClick={handelDropDown} />
            {/* <Link href="/EditprofilePage">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square mt-2 text-[#669bbc] hover:text-[#fdf0d5] transition duration- 300 ease courser-pointer" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
           </Link> */}
        </div>

        {/* personal info content */}
         <div className={`p-4 flex flex-row flex-wrap justify-between gap-y-8  rounded-3xl
                          transition-opacity duration-300 ease-out opacity-0 personal-info-content`}>
            {/* name */}
            <div className="basis-[40%] 
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faUser} className="text-[#fdf0d5] text-2xl inline mr-1" /> 
                    <h1 className=" text-2xl text-[#fdf0d5]">Name</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{userObj.firstname} {userObj.lastname}</p>
            </div>

            {/* email */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faEnvelope} className="text-[#fdf0d5] text-2xl inline mr-1" /> 
                    <h1 className=" text-2xl text-[#fdf0d5]">Email</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{userObj.email}</p>
            </div>
                
            {/* phone */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">

                    <FontAwesomeIcon icon={faPhone} className="text-[#fdf0d5] text-2xl inline mr-1" /> 
                    <h1 className=" text-2xl text-[#fdf0d5]">Phone</h1>
                </div>
                <p className= "text-[#fdf0d5] mt-2">{userObj.phone}</p>
            </div>
                
            {/* address */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#fdf0d5] text-2xl inline mr-1" />
                    <h1 className=" text-2xl text-[#fdf0d5]">Address</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{userObj.address}</p>
            </div>

            {/* Patient Only */}     
            {role == "patient" && (<> 
            {/* weight */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faWeightScale} className="text-[#fdf0d5] text-2xl inline mr-1" />
                    <h1 className=" text-2xl text-[#fdf0d5]">Weight</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{weight} kg</p>
                </div>

            {/* height */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faRulerVertical} className="text-[#fdf0d5] text-2xl inline mr-1" />
                    <h1 className=" text-2xl text-[#fdf0d5]">Height</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{height} cm</p>
                </div>

            {/* smoking */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faJoint} className="text-[#fdf0d5] text-2xl inline mr-1" />
                    <h1 className=" text-2xl text-[#fdf0d5]">Smoking</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{smoking ? "Yes" : "No"}</p>
                </div>

            {/* diseases */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faMaskFace} className="text-[#fdf0d5] text-2xl inline mr-1" />
                    <h1 className=" text-2xl text-[#fdf0d5]">Diseases</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{diseases}</p>
                </div>
                </>)}


            {/* Doctor Only */}     
            {role == "doctor" && (<> 
           
            {/* Specialization */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faUserDoctor} className="text-[#fdf0d5] text-2xl inline mr-1" />
                    <h1 className=" text-2xl text-[#fdf0d5]">Specialization</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{specialization} </p>
                </div>

            {/* Education */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-[#fdf0d5] text-2xl inline mr-1" />
                    <h1 className=" text-2xl text-[#fdf0d5]">Education</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{education}</p>
                </div>

            {/* Private Clinical */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <FontAwesomeIcon icon={faHouseChimneyMedical} className="text-[#fdf0d5] text-2xl inline mr-1" />
                    <h1 className=" text-2xl text-[#fdf0d5]">Private Clinical</h1>
                </div>
                <p className=" text-[#fdf0d5] mt-2">{privateclinical}</p>
                </div>
                </>)}
                {/* links */}

         <div className={`my-8 flex flex-row content-end justify-center gap-x-3 
                          transition-translate ease-out duration-300 delay-200  
                          transition-opacity  
                          w-full`}>
            {/* Facebook Link */}
            {userObj.facebook && (
                <a href={userObj.facebook} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                </a>
                )}

            {/* LinkedIn Link */}
            {userObj.linkedin && (
                <a href={userObj.linkedin} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
                </a>
                )}

            {/* Instagram Link */}
            {userObj.insta && (
                <a href={userObj.insta} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                </a>
                )}

            {/* Github Link */}
            {userObj.github && (
                <a href={userObj.github} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                </a>
                )}

             {/* Twitter Link */}
             {userObj.twitter && (
                <a href={userObj.twitter} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
                    </svg>
                </a>
                )}
         </div>
         </div>

         
    </div>}

    {role == "admin" && 
    <div className="group  transition-all duration-300 h-[400px] shadow-2xl rounded-3xl 
                     px-6 py-4 bg-gradient-to-r from-sky-900 to-indigo-900 w-full">


        {/* personal info */}
            
        <div className="relative flex flex-row justify-between items-start">
            
            {/* title */}
            <h1 className={`text-nowrap transition-opacity ease-in duration-50  
             ml-2 pacifico-font text-3xl mb-5 text-[#fdf0d5]  
             `}>Personal info</h1>

            {/* image */}
            
        </div>

        {/* personal info content */}
         <div className={`p-4 flex flex-row flex-wrap justify-between gap-y-10  rounded-3xl
                           `}>
            {/* name */}
            <div className="basis-[40%] 
                            transition-translate ease-out duration-100  translate-y-0 
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person text-[#fdf0d5]" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                    <h1 className=" text-2xl text-[#fdf0d5]">Name</h1>
                </div>
                <p className=" text-[#fdf0d5] ">{userObj.firstname} {userObj.lastname}</p>
            </div>

            {/* email */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  translate-y-0 
                            ">
                <div className="flex flex-row items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope text-[#fdf0d5]" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                    </svg>
                    <h1 className=" text-2xl text-[#fdf0d5]">Email</h1>
                </div>
                <p className=" text-[#fdf0d5] ">{userObj.email}</p>
            </div>
                
            {/* phone */}
            
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  translate-y-0 
                            ">
                <div className="flex flex-row items-center gap-x-2">

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-telephone text-[#fdf0d5]" viewBox="0 0 16 16">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                    <h1 className=" text-2xl text-[#fdf0d5]">Phone</h1>
                </div>
                <p className= "text-[#fdf0d5] ">{userObj.phone}</p>
            </div>
                
            {/* address */}
            <div className="basis-[40%]
                            transition-translate ease-out duration-100  translate-y-0 
                            ">
                <div className="flex flex-row items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt text-[#fdf0d5]" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <h1 className=" text-2xl text-[#fdf0d5]">Address</h1>
                </div>
                <p className=" text-[#fdf0d5]">{userObj.address}</p>
            </div>
         </div>

         {/* links */}

         <div className={`my-8 flex flex-row content-end justify-center gap-x-3 
                          transition-translate ease-out duration-300 delay-200 translate-y-0 
                          transition-opacity
                          max-[]`}>
            {/* Facebook Link */}
            {userObj.facebook && (
                <a href={userObj.facebook} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                </a>
                )}

            {/* LinkedIn Link */}
            {userObj.linkedin && (
                <a href={userObj.linkedin} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
                </a>
                )}

            {/* Instagram Link */}
            {userObj.insta && (
                <a href={userObj.insta} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                </a>
                )}

            {/* Github Link */}
            {userObj.github && (
                <a href={userObj.github} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                </a>
                )}

             {/* Twitter Link */}
             {userObj.twitter && (
                <a href={userObj.twitter} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook transition ease-out duration-300 hover:text-[#bdada5] text-[#fdf0d5]" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
                    </svg>
                </a>
                )}

         </div>
    </div>}
    
    </>
)

}
export default UserInfo;