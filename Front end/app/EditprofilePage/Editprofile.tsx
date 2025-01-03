'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import '../Components/Components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import HandleEditProfile from "./Handling/HandleEditProfile";
import HandlePatientHistory from "./Handling/HandlePatientHistory";
import HandlePatientDiseases from "./Handling/HandlePatientDiseases";
import GetPatientHistory from "./Handling/GetPatientHistory";
import GetDoctorCV from "./Handling/GetDoctorCV";
import HandleDoctorCV from "./Handling/HandleDoctorCV";



export default function Editprofile() {

    // User Data
    const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);
    const userRole = userObj.role;
    console.log("user,", userObj);

    useEffect(() => {
    GetPatientHistory(userObj.uid)
  .then(data => {
    try {
      console.log("Patient History Data", data);
      setWeight(data.phistory.weight);
      setHeight(data.phistory.height);
      setSmoking(data.phistory.smoking);
    } catch (err) {
      console.error("Error in setting data:", err);
    }
  })
  .catch(error => {
    console.log("Error in fetching Patient History Data:", error);
  });
}, []);

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
    },[]);
 

    const diseasesList = [
        'Diabetes',
        'Hypertension',
        'Cardiovascular Disease',
        'Asthma',
        'Cancer',
      ];

    const [firstname, setFirst_name] = useState(userObj.firstname);
    const [lastname, setLast_name] = useState(userObj.lastname);
    const [email, setEmail] = useState( userObj.email);
    const [phone, setPhone] = useState( userObj.phone);
    const [password, setPassword] = useState( userObj.password);
    const [confirmpassword, setConfirmPassword] = useState( userObj.password);
    const [address, setAddress] = useState( userObj.address);
    const [image, setImage] = useState(userObj.profileimage);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [github, setGithub] = useState(userObj.github);
    const [facebook, setFacebook] = useState(userObj.facebook);
    const [instagram, setInstagram] = useState( userObj.insta);
    const [linkedin, setLinkedin] = useState(userObj.linkedin);
    const [twitter, setTwitter] = useState(userObj.twitter);
    const [gender, setGender] = useState(userObj.gender);
    const [birthdate, setBirthdate] = useState(userObj.bdate)

    const [weight, setWeight] = useState(0.0);
    const [height, setHeight] = useState(0.0);
    const [smoking, setSmoking] = useState(false);
    const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);

    const [summary, setSummary] = useState('');
    const [education, setEducation] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [certification, setCertification] = useState('');
    const [privateclinical, setPrivateClinical] = useState('');


    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


    const handleDiseaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value === "None") {
            setSelectedDiseases([]);
        } else if (selectedDiseases.includes(value)) {
            setSelectedDiseases(selectedDiseases.filter(disease => disease !== value));
        } else {
            setSelectedDiseases([...selectedDiseases, value]);
        }
    };
      

    const handleSmokingChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSmoking(event.target.value == 'true' );
      };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    useEffect(() => {
        if (userObj.bdate) {
          const date = new Date(userObj.bdate);
          const formattedDate = date.toISOString().split('T')[0];
          setBirthdate(formattedDate);
        }
      }, [userObj.bdate]);


    const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitAttempted(true);
      
        const formData = {
          "uid": userObj.uid,
          "firstname": firstname,
          "lastname": lastname ,
          "password": password,
          "address": address,
          "email": email,
          "phone": phone,
          "github":github ,
          "linkedin": linkedin,
          "profileimage":image,
          "role" : userObj.role,
          "date" : userObj.date,
          "facebook": facebook,
          "insta" : instagram,
          "twitter" : twitter,
          "bdate": birthdate
        };

       const patientHistoryData= {
        "pid": userObj.uid,
        "weight": weight,
        "height": height,
        "smoking": smoking,
       }

       const diseasesData = {
        "pid": userObj.uid,
        "diseases": selectedDiseases,
       }

       const DoctorCV ={
        "dId": userObj.uid,
        "summary": summary,
        "specialization": specialization,
        "education": education,
        "certification": certification,
        "privateclinical": privateclinical
       }

        console.log("after editing",formData);
        console.log("after editing",patientHistoryData);
        console.log("after editing",diseasesData);
    
        // Check if first name is empty
        if (firstname === '') {
          setErrorMessage('Please enter a first name');
          return;
        }
      
        // Check if last name is empty
        if (lastname === '') {
          setErrorMessage('Please enter a last name');
          return;
        }

            // Check if birthdate is empty
            if (birthdate === '') {
                setErrorMessage('Please enter a birthdate');
                return;
            }
      
        // Check if email is valid
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(email)) {
          setErrorMessage('Please enter a valid email');
          return;
        }
      
        // Check if phone number is valid
        const phoneRegex = /^[0-9]*$/;
        if (!phoneRegex.test(phone)) {
          setErrorMessage('Please enter a valid phone number');
          return;
        }
      
        // Check if address is empty
        if (address === '') {
          setErrorMessage('Please enter an address');
          return;
        }
      
        // Check if password is empty
        if (password === '') {
          setErrorMessage('Please enter a password');
          return;
        }
      
        // Check if confirm password is empty
        if (confirmpassword === '') {
          setErrorMessage('Please confirm your password');
          return;
        }
      
        // Check if password and confirm password match
        if (password !== confirmpassword) {
          setErrorMessage('Passwords do not match');
          return;
        }

        HandleEditProfile(formData)
        .then(async res => {
           if(res.status === 200)
           {
               console.log(await res.json());
               localStorage.setItem('User', JSON.stringify(formData));
               router.push('/UserProfile');
           }
           else
           {
               setErrorMessage(await res.text());
               console.log("Error: ",await res.text());
           }
        })
        .catch(error => {
           console.log("Error: ", error);
           setErrorMessage("An error occurred. Please try again.");
           router.refresh();
        });

        const updateProfileAndHistory = async () => {
            try {
              const historyResponse = await HandlePatientHistory(patientHistoryData);
              if (historyResponse.status === 200) {
                console.log("Successfully Updated Patient History");
              } else {
                console.log("Failed to Update Patient History", historyResponse.status);
                return;
              }
          
              const diseasesResponse = await HandlePatientDiseases(diseasesData);
              if (diseasesResponse.status === 200) {
                console.log("Successfully Updated Patient Diseases");
                router.push('/UserProfile');
              } else {
                console.log("Failed to Update Patient Diseases", diseasesResponse.status);
              }
            } catch (error) {
              console.log("Error in updateProfileAndHistory:", error);
            }
          };

            const updateDoctorCV = async () => {
                try {
                const cvResponse = await HandleDoctorCV(DoctorCV);
                if (cvResponse.status === 200) {
                    console.log("Successfully Updated Doctor CV");
                    router.push('/UserProfile');
                } else {
                    console.log("Failed to Update Doctor CV", cvResponse.status);
                }
                } catch (error) {
                console.log("Error in updateDoctorCV:", error);
                }
            };

        if (userRole === 'patient') {
            updateProfileAndHistory();
        }
        if (userRole === 'doctor') {
            updateDoctorCV();
        }

      };


    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
      
        if (e.target.value !== password) {
          setErrorMessage('Passwords do not match');
        } else {
          setErrorMessage('');
        }
      };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage('https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80');
        }
    };

    return(
        <>
        <div className="bg-[#669bbc] flex items-center flex-col p-24 min-h-screen w-[100%]">
            <form className="bg-[#669bbc] p-8 w-[90%] flex items-center flex-col space-y-12 sm:space-y-20" onSubmit={handleSubmit}>  

                {/* Photo Part          */}
                <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] sm:w-[100%] flex flex-col items-center">
                    <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font"> Profile Image</h2>
                    <div className="w-64 h-64 mt-6">
                        <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full bg-white" />
                    </div>
                    <label className="block w-64 mt-6">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-[#fdf0d5]
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-[#fdf0d5] file:text-black
                                hover:file:bg-[#f2d7bc]
                                "
                        />
                    </label>
                </div>

                {/* Pesonal Info */}
                <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] md:w-[100%] flex flex-col items-center">
                    <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font"> Personal Information</h2>

                    {/* First Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* First Name */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="password"
                                className=" block text-md font-medium text-[#fdf0d5]"
                            >
                                First Name
                            </label>
                            <input
                                value={firstname}
                                onChange={(e) => setFirst_name(e.target.value)}
                                name="first_name"
                                type="text"
                                id="first_name"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                                placeholder={userObj.firstname}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="password"
                                className=" block text-md font-medium text-[#fdf0d5]"
                            >
                                Last Name
                            </label>
                            <input
                                value={lastname}
                                onChange={(e) => setLast_name(e.target.value)}
                                name="last_name"
                                type="text"
                                id="last_name"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                                placeholder={userObj.lastname}
                            />

                         </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* Address */}
                        <div className="mt-4 w-full md:w-[40%]">
                                <label
                                    htmlFor="password"
                                    className=" block text-md font-medium text-[#fdf0d5]"
                                >
                                    Address
                                </label>
                                <input
                                    
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    name="address"
                                    type="text"
                                    id="password"
                                    className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                                    placeholder={userObj.address}
                                />
                        </div>

                        {/* Phone */}
                        <div className="mt-4 w-full md:w-[40%]">
                                <label className=" block text-md font-medium text-[#fdf0d5]">
                                    Phone Number
                                </label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    name="phone"
                                    type="tel"
                                    className="peer ... w-full p-2 border border-[#fdf0d5] focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:text-rose-400
                                    focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                                        "
                                    placeholder={userObj.phone}
                                />
                                {phone && (
                                    <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                    Please provide a valid phone number.
                                    </p>
                                )}
                        </div> 
                    </div>

                    {/* Third Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                       {/* Password */}
                        <div className="mt-4 w-full md:w-[40%] relative">
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-[#fdf0d5]"
                        >
                            New Password
                        </label>
                        <div className="flex items-center">
                            <input
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}       
                            name="password"
                            type={isPasswordVisible ? "text" : "password"}
                            id="password"
                            className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1 pr-10"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-2">
                            <FontAwesomeIcon className='text-indigo-900' icon={isPasswordVisible ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mt-4 w-full md:w-[40%] relative">
                        <label
                            htmlFor="confirm_password"
                            className="block text-md font-medium text-[#fdf0d5]"
                        >
                            Confirm New Password
                        </label>
                        <div className="flex items-center">
                            <input
                            value={confirmpassword} 
                            onChange={handleConfirmPasswordChange} 
                            name="confirm_password"
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            id="confirm_password"
                            className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1 pr-10"
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2">
                            <FontAwesomeIcon className='text-indigo-900' icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        </div>
                    </div>

                      {/* Fourth Row */}
                      <div className="flex flex-col md:flex-row justify-center w-full mt-6">
                        {/* Birthdate */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="birthday"
                                className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]"
                            >
                                Birth Date
                            </label>
                            <input
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                name="birthday"
                                type="date"
                                id="birthday"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                            />
                        </div>
                    </div>

                </div>

                {/* Patient History */}
                {userRole === 'patient' &&
                    <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] md:w-[100%] flex flex-col items-center">
                    <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font"> Illness History  </h2>

                    {/* First Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* Weight */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="Weight"
                                className=" block after:content-['*'] after:ml-0.5 after:text-red-500 text-md font-medium text-[#fdf0d5]"
                            >
                                Weight
                            </label>
                            <input
                                value={weight}
                                onChange={(e) => setWeight(parseFloat(e.target.value))}
                                name="Weight"
                                type="number"
                                id="Weight"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                            />
                        </div>

                        {/* Height */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="Height"
                                className=" block after:content-['*'] after:ml-0.5 after:text-red-500 text-md font-medium text-[#fdf0d5]"
                            >
                                Height
                            </label>
                            <input
                                value={height}
                                onChange={(e) => setHeight(parseFloat(e.target.value))}
                                name="Height"
                                type="number"
                                id="Height"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                            />

                         </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">
                        <div className="mt-4 w-full md:w-[40%]">
                            {/* smoking */}
                            <label
                                htmlFor="smoking"
                                className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-md font-medium text-[#fdf0d5]"
                            >
                                Do You Smoke?
                            </label>
                            <div className="flex gap-4 mt-1 h-[45px] justify-around bg-white w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg">
                                <div className="flex gap-1 items-center">
                                <p className="text-sm font-medium text-indigo-800 inline-block">Yes</p>
                                <input
                                    type="radio"
                                    name="smoking"
                                    value="true"
                                    checked={smoking === true}
                                    className="custom-radio"
                                    onChange={handleSmokingChange}
                                />
                                </div>
                                <div className="flex gap-1 items-center">
                                <p className="text-sm font-medium text-indigo-800 inline-block">No</p>
                                <input
                                    type="radio"
                                    name="smoking"
                                    value="false"
                                    checked={smoking === false}
                                    className="custom-radio"
                                    onChange={handleSmokingChange}
                                />
                                </div>
                            </div>
                        </div>

                        {/* Diseases */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label 
                           htmlFor="diseases"
                           className="block text-md font-medium text-[#fdf0d5]">
                                Select Diseases
                            </label>
                            <select
                                multiple
                                value={selectedDiseases}
                                onChange={handleDiseaseChange}
                                className="peer ... w-full p-2 border border-[#fdf0d5] focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg placeholder-slate-400 mt-1"
                                size={1}
                            >
                                <option value="None">None</option>
                                {diseasesList.map((disease) => (
                                <option key={disease} value={disease}>
                                    {disease}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    </div>
                }

                 {/* Doctor Cv */}
                 {userRole === 'doctor' &&
                    <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] md:w-[100%] flex flex-col items-center">
                    <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font"> Doctor CV  </h2>

                    {/* First Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* Specialization */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="Specialization"
                                className=" block after:content-['*'] after:ml-0.5 after:text-red-500 text-md font-medium text-[#fdf0d5]"
                            >
                                Specialization
                            </label>
                            <input
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                                name="Specialization"
                                type="text"
                                id="Specialization"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                            />
                        </div>

                        {/* Summary */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="Summary"
                                className=" block after:content-['*'] after:ml-0.5 after:text-red-500 text-md font-medium text-[#fdf0d5]"
                            >
                                Summary
                            </label>
                            <input
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                name="Summary"
                                type="text"
                                id="Summary"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                            />

                         </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">
                        <div className="mt-4 w-full md:w-[40%]">
                            {/* Education */}
                            <label
                                htmlFor="Education"
                                className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-md font-medium text-[#fdf0d5]"
                            >
                                Education
                            </label>
                            <input
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                name="Education"
                                type="text"
                                id="Education"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                            />
                        </div>

                        {/* Certifications */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label 
                           htmlFor="Certifications"
                           className="block text-md font-medium text-[#fdf0d5]">
                                Certification
                            </label>
                            <input
                                value={certification}
                                onChange={(e) => setCertification(e.target.value)}
                                name="Certifications"
                                type="text"
                                id="Certifications"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                            />
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="flex flex-col md:flex-row justify-center w-full mt-6">
                        <div className="mt-4 w-full md:w-[40%]">

                            {/* Private Clinical */}
                            <label
                                htmlFor="Private Clinical"
                                className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-md font-medium text-[#fdf0d5]"
                            >
                                Private Clinical
                            </label>
                            <input
                                value={privateclinical}
                                onChange={(e) => setPrivateClinical(e.target.value)}
                                name="Private Clinical"
                                type="text"
                                id="Private Clinical"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                            />
                        </div>
                    </div>

                    </div>
                }

                {/* Social Media Links */}
                <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] md:w-[100%] flex flex-col items-center">
                    <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font"> Social Media Links</h2>

                    {/* First Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* Facebook */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                            htmlFor="facebook"
                            className="block text-md font-medium text-[#fdf0d5]"
                            >
                            <FontAwesomeIcon icon={faFacebook} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
                            Facebook
                            </label>
                            <input
                                name="facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                type="text"
                                className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:border-pink-500 invalid:text-rose-400
                                focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                                    "
                                placeholder={userObj.facebook}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid Facebook link.
                            </p>
                        </div>

                        {/* Instagram */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label className="block text-md font-medium text-[#fdf0d5]">
                                <FontAwesomeIcon icon={faInstagram} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
                                Instagram 
                            </label>
                            <input
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                name="instagram"
                                type="text"
                                className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
                                focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                                    "
                                placeholder={userObj.insta}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid Instagram link.
                            </p>
                        </div>
                    </div>

                    {/* Secind Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* LinkedIn */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label className="block text-md font-medium text-[#fdf0d5]">
                                <FontAwesomeIcon icon={faLinkedin} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
                                LinkedIn 
                            </label>
                            <input
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                name="linkedin"
                                type="text"
                                className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
                                focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1"
                                placeholder={userObj.linkedin}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid LinkedIn link.
                            </p>
                        </div>

                        {/* Twitter */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label className="block text-md font-medium text-[#fdf0d5]">
                                <FontAwesomeIcon icon={faTwitter} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
                                Twitter 
                            </label>
                            <input  
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                name="twitter"
                                type="text"
                                className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
                                focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                                    "
                                placeholder={userObj.twitter}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid Twitter link.
                            </p>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="flex flex-col md:flex-row justify-center w-full mt-6">

                        {/* Github */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label className="block text-md font-medium text-[#fdf0d5]">
                                <FontAwesomeIcon icon={faGithub} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
                                GitHub 
                            </label>
                            <input
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                name="github"
                                type="text"
                                className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
                                    focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                                    "
                                placeholder={userObj.github}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid GitHub link.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                {submitAttempted && errorMessage && <p className="mt-2 text-rose-400 text-sm">{errorMessage}</p>}
                <div className="flex justify-center w-[340px] md:w-[60%]">
                    <button className=" w-[340px] md:w-[60%] bg-gradient-to-r from-sky-900 to-indigo-900 font-bold text-white p-2 rounded-lg hover:from-indigo-900 hover:to-sky-900 flex items-center justify-center ">
                        Save Your Changes
                        <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff"}} className=" text-xl ml-3" />
                    </button>
                </div>

            </form>

        </div>
        </>
    )
    
}