"use client";
import  Request  from "./Request";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import GetAllAppointments from "./GetAllAppointments";
import { useEffect, useState } from "react";
function Requests() {
    const [requestElements, setRequestElements] = useState();
    const user = localStorage.getItem('User') as string;
    const userObj= JSON.parse(user);
    useEffect(()=>{
        GetAllAppointments(userObj.uid)
        .then(async res => {
            if(res.status === 200){
                const ap = await res.json();
                console.log(ap);
                setRequestElements(ap.map((app: any, index: number) => {
                    if (app.accept === true) {
                        return null;
                    }
                    return (
                        <Request
                            key={index}
                            did={app.did} 
                            name={app.docFirstName +" "+ app.docLastName}
                            image={app.docProfileImage}
                            date={app.apdate}
                            apid={app.apid}
                        />
                    );
                }));
            }
            else {

            }
        })
        .catch(error => {
            console.error(error);
        });
        },[]);

    return (
        <>
        
            <div className="h-full shadow-lg rounded-2xl px-6 py-4 bg-gradient-to-r from-sky-900 to-indigo-900
                            w-full">
                <div className="mb-5 flex flex-row items-center gap-x-2 felx-nowrap">
                    <FontAwesomeIcon icon={faPaperPlane} className="text-2xl text-[#fdf0d5]" /> 
                    <h1 className="ml-2 pacifico-font text-2xl text-[#fdf0d5]">Requests</h1>
                </div>
                <div className="h-[90%] overflow-y-scroll no-scrollbar space-y-5">
                    {requestElements}
                </div>
            </div>
        </>
    );
}

export default Requests;