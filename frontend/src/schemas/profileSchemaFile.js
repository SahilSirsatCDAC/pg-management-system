import * as Yup from 'yup';

export const profileSchema = Yup.object({
    countryCode: Yup.number().min(10).max(99).required("Country code is required"),
    contactNo: Yup.number().min(1111111111).max(9999999999).required("Contact code is required"),
    addrl1: Yup.string().max(50).required("Address Line 1 is required"),
    addrl2: Yup.string().max(50).required("Address Line 2 is required"),
    city: Yup.string().max(20).required("City is required"),
    state: Yup.string().max(20).required("State is required"),
    country: Yup.string().max(20).required("Country is required"),
    zipCode: Yup.number().min(111111).max(999999).required("ZipCode is required")
});