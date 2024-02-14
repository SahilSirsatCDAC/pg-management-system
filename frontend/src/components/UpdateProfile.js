import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import useAuth from "../hooks/useAuth"
import axios from '../api/axios';
import { profileSchema } from '../schemas/profileSchemaFile';

export default function UpdateProfile() {
    const { auth } = useAuth();
    const EMAIL = auth?.email;
    const [profilePhoto, setProfilePhoto] = useState({ imgFile: null });
    const [vals, setVals] = useState({});
    const [user, setUser] = useState({});
    const [message, setMessage] = useState(false);

    const retrieveUser = async () => {
        const response = await axios.put(`/user/${EMAIL}`,
            {
                "countryCode": vals.countryCode,
                "contactNo": vals.contactNo,
                "userAddr": {
                    "addrl1": vals.addrl1,
                    "addrl2": vals.addrl2,
                    "city": vals.city,
                    "state": vals.state,
                    "country": vals.country,
                    "zipCode": vals.zipCode
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                },
                // withCredentials: true
            });
        return response.data;
    };

    const getUserDetails = async () => {
        const response = await axios.get(`/user/${EMAIL}`,
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                },
            });
        return response.data;
    };

    const getUserDetailsu = async () => {
        const user = await getUserDetails();
        if (user) {
            console.log(user);
            setUser(user);
        }
        return user;
    };

    useEffect(() => {
        const putUser = async () => {
            const user = await retrieveUser();
            if (user) {
                console.log(user);
                setUser(user);
            }
        };

        if (vals?.countryCode) {
            putUser();
        } else {
            console.log("********");
            console.log(getUserDetailsu());
        }
    }, [vals]);

    const initialValues = {
        "countryCode": "",
        "contactNo": "",
        "addrl1": "",
        "addrl2": "",
        "city": "",
        "state": "",
        "country": "",
        "zipCode": ""
    };

    function handleFile(e) {
        console.log(e.target.files[0])
        setProfilePhoto({ imgFile: e.target.files[0] })
    }
    async function handleUpload(e) {
        if (user?.id) {
            console.log("in upload");
            console.log(profilePhoto);
            console.log(user);

            let formdata = new FormData();
            formdata.append('imgFile', profilePhoto.imgFile);
            const response = await axios.post(`/image/user/${user?.id}`,
                formdata
                , {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                });
            show();
            return response.data;
        }
    }

    function show() {
        console.log("in show")
        console.log(message)
        setMessage(true);
        setTimeout(() => {
            setMessage(false);
            console.log("in show");
            console.log(message);
        }, 3000);
    }


    const alues = {
        "countryCode": user?.countryCode,
        "contactNo": user?.contactNo,
        "addrl1": user?.userAddr?.addrl1,
        "addrl2": user?.userAddr?.addrl2,
        "city": user?.userAddr?.city,
        "state": user?.userAddr?.state,
        "country": user?.userAddr?.country,
        "zipCode": user?.userAddr?.zipCode
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: alues?.addrl1 ? alues : initialValues,
            validationSchema: profileSchema,
            enableReinitialize: true,
            onSubmit: (values) => {
                setVals(values);
                show();
            },
        })
    console.log(errors);

    return (
        <div className='row'>
            <div className='col-3'></div>
            <div className='col-6 my-3'>

                <div>
                    <h3 className="display-3 text-center">Profile</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <h3>User Details :</h3>
                    <hr />
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ 'width': '250px' }}>Country Code</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="countryCode"
                            id="countryCode"
                            placeholder="countryCode"
                            value={values.countryCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.countryCode && touched.countryCode ? (
                        <div className="alert alert-danger" role="alert">
                            {errors.countryCode}
                        </div>
                    ) : null}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ 'width': '250px' }}>Contact No</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="contactNo"
                            id="contactNo"
                            placeholder="contactNo"
                            value={values.contactNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.contactNo && touched.contactNo ? (
                        <div className="alert alert-danger" role="alert">
                            {errors.contactNo}
                        </div>
                    ) : null}
                    <h3>Address Details :</h3>
                    <hr />
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ 'width': '250px' }}>Address Line 1</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="addrl1"
                            id="addrl1"
                            placeholder="addrl1"
                            value={values.addrl1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.addrl1 && touched.addrl1 ? (
                        <div className="alert alert-danger" role="alert">
                            {errors.addrl1}
                        </div>
                    ) : null}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ 'width': '250px' }}>Address Line 2</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="addrl2"
                            id="addrl2"
                            placeholder="addrl2"
                            value={values.addrl2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.addrl2 && touched.addrl2 ? (
                        <div className="alert alert-danger" role="alert">
                            {errors.addrl2}
                        </div>
                    ) : null}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ 'width': '250px' }}>City</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="city"
                            id="city"
                            placeholder="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.city && touched.city ? (
                        <div className="alert alert-danger" role="alert">
                            {errors.city}
                        </div>
                    ) : null}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ 'width': '250px' }}>State</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="state"
                            id="state"
                            placeholder="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.state && touched.state ? (
                        <div className="alert alert-danger" role="alert">
                            {errors.state}
                        </div>
                    ) : null}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ 'width': '250px' }}>Country</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="country"
                            id="country"
                            placeholder="country"
                            value={values.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.country && touched.country ? (
                        <div className="alert alert-danger" role="alert">
                            {errors.country}
                        </div>
                    ) : null}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ 'width': '250px' }}>Zip Code</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            name="zipCode"
                            id="zipCode"
                            placeholder="zipCode"
                            value={values.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.zipCode && touched.zipCode ? (
                        <div className="alert alert-danger" role="alert">
                            {errors.zipCode}
                        </div>
                    ) : null}

                    <div className='text-center'>
                        <button className='btn btn-primary' type='submit'>Update</button>
                    </div>
                </form>
                {message ?
                    <div className="alert alert-success" role="alert">
                        Update Successful
                    </div> : null}
                <div className="mb-3">
                    <label for="imgFile" className="form-label">Profile Pic</label>
                    <input className="form-control" name='imgFile' type="file" id="imgFile" accept=".png,.jpeg"
                        onChange={(e) => handleFile(e)}
                    />
                </div>
                <div className='text-center'>
                    <button className='btn btn-primary' type='submit'
                        onClick={(e) => handleUpload(e)}
                    >Upload</button>
                </div>
            </div>
        </div>
    )
}