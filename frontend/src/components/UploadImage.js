import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useParams,useNavigate  } from 'react-router-dom';
import useAuth from "../hooks/useAuth"

export default function UploadImage() {
    const { auth, setAuth } = useAuth();
    const [profilePhoto, setProfilePhoto] = useState({ imgFile: null });
    let { component } = useParams();
    let { componentId } = useParams();
    let history = useNavigate ();
    const [success, setSuccess] = useState(false);
    function handleFile(e) {
        console.log(e.target.files[0])
        setProfilePhoto({ imgFile: e.target.files[0] })
    }
    async function handleUpload(e) {
        console.log("in upload");
        console.log(profilePhoto);

        if(profilePhoto.imgFile){
        let formdata = new FormData();
        formdata.append('imgFile', profilePhoto.imgFile);
        const response = await axios.post(`/image/${component}/${componentId}`,
            formdata
            , {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                },
            });
        setSuccess(true);
        return response.data;
        }else{
            console.log("first select file")
        }

    }

    return (
        <div className='row'>
            <div className='col-3'></div>
            <div className='col-6 my-3'>
                <div className="mb-3">
                    <label for="imgFile" className="form-label">Upload Image for {component}</label>
                    <input className="form-control" name='imgFile' type="file" id="imgFile" accept=".png,.jpeg"
                        onChange={(e) => handleFile(e)}
                    />
                </div>
                <div className='text-center mb-3'>
                    <button className='btn btn-primary' type='submit'
                        onClick={(e) => handleUpload(e)}
                    >Upload</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className='btn btn-primary'
                        onClick={() => history(-1)}
                    >Back</button>
                </div>
                {success ? <div className="alert alert-success" role="alert">
                    Image Upload Successful... 
                </div> : null}
            </div>

        </div>
    )
}
