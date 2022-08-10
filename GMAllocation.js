import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Input, Box, InputDate } from "@anchor/react-components";
import { ThemeProvider } from "@anchor/react-components";
import React from "react";
import axios from 'axios';
import { useFormik } from 'formik';
import { toastEmitter, Toast } from '@anchor/react-components';
import { useRouter } from 'next/router'

export default function GMAllocation() {
    const router = useRouter()
    const validate = values => {
        const errors = {};

        if (!values.apmId) {
            errors.apmId = 'Required';
        } else if (!/^[A-Z]{3}[0-9]{3}$/i.test(values.apmId)) {
            errors.apmId = 'Invalid Format';
        }

        if (!values.seatAllocation) {
            errors.seatAllocation = 'Required';
        }

        if (!values.startDate) {
            errors.startDate = 'Required';
        }
        if (!values.endDate) {
            errors.endDate = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            apmId: '',
            seatAllocation: '',
            startDate: Date.now(),
            endDate: Date.now(),
        },
        validate,
        onSubmit: (values) => {
            values.apmId = values.apmId.toUpperCase()
            console.log(values);
            let axiosConfig = {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Credentials": "true",
                  "Access-Control-Allow-Methods": "*",
                }
              };
          
              axios.post('http://localhost:8080/seatme/gmAllocation',
                values, axiosConfig)
                .then((res) => {
                  console.log("RESPONSE RECEIVED: ", res);
                  toastEmitter({ "title": "SUCCESS", "description": "GM Registration Successful" })
                  setTimeout(() => { router.push('/LandingPage') }, 5000)
                })
                .catch((err) => {
                  console.log("AXIOS ERROR: ", err);
                  toastEmitter({ "title": "ERROR", "description": "GM Registration Failed" });
          
                })
            // try {
            // axios({
            //     url: "http://localhost:8080/seatme/gmAllocation",
            //     method: "POST",
            //     data: values
            // }).then((res) => {
            //     console.log(res)
            //     if (res.status === 200) {
            //         toastEmitter({ "title": "SUCCESS", "description": "GM Registration Successful" })
            //         setTimeout(() => { router.push('/LandingPage') }, 1000)
            //     }
            //     else
            //         toastEmitter({ "title": "ERROR", "description": "GM Registration Failed" })
            // })
            //     .catch(error => console.log(error))
            //     toastEmitter({ "title": "ERROR", "description": "GM Registration Failed" })

            //     console.log("RESPONSE RECEIVED : ", data);
            //     toastEmitter({ "title": "SUCCESS", "description": "GM Registration Successful" })
            // } catch (error) {
            //     console.log("AXIOS ERROR : ", error);
            //     toastEmitter({ "title": "ERROR", "description": "GM Registration Failed" })
            // }
        },
    });

    return (
        <ThemeProvider>
            <div>
                <Head>
                    <title>GM Allocation</title>
                </Head>
                <main>
                    <div className={styles.pageTitle}>
                        <h1><b>Genral Manager Registration Form </b></h1>
                    </div>
                    <Box flexGrow={9} p={100} borderColor="border.default" borderWidth={1} borderStyle="solid" >
                        <form onSubmit={formik.handleSubmit}>
                            <Input
                                fit="medium"
                                id="apmId"
                                label="APM ID"
                                name="apmId"
                                placeholder="Enter your APM ID"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apmId}
                                required
                                variant="vanity"
                            />
                            {formik.touched.apmId && formik.errors.apmId ? (
                                <div className={styles.error}>
                                    {formik.errors.apmId}
                                    <br />
                                </div>
                            ) : null}
                            <br />

                            <Input
                                fit="medium"
                                id="seatAllocation"
                                label="Seat Allocation"
                                name="seatAllocation"
                                placeholder="Enter your Seat Allocation"
                                type="text"
                                required
                                variant="vanity"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.seatAllocation}
                            />
                            {formik.touched.seatAllocation && formik.errors.seatAllocation ? (
                                <div className={styles.error}>
                                    {formik.errors.seatAllocation}
                                    <br />
                                </div>
                            ) : null}
                            <br />

                            <InputDate
                                dateFormat="yyyy-MM-dd"
                                fit="medium"
                                id="startDate"
                                label="Enter Start date"
                                name="startDate"
                                width={30}
                                variant="vanity"
                                onChange={(value) => {
                                    formik.setFieldValue('startDate', Date.parse(value));
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.startDate}
                            >
                            </InputDate>
                            {formik.touched.startDate && formik.errors.startDate ? (
                                <div className={styles.error}>
                                    {formik.errors.startDate}
                                    <br />
                                </div>
                            ) : null}
                            <div>
                                <br />

                                <InputDate
                                    dateFormat="yyyy-MM-dd"
                                    fit="medium"
                                    id="endDate"
                                    label="Enter end date"
                                    name="endDate"
                                    variant="vanity"
                                    width={30}
                                    onChange={(value) => {
                                        formik.setFieldValue('endDate', Date.parse(value));
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.endDate}
                                >
                                </InputDate>
                                {formik.touched.endDate && formik.errors.endDate ? (
                                    <div className={styles.error}>
                                        {formik.errors.endDate}
                                        <br />
                                    </div>
                                ) : null}
                            </div>
                            <br />

                            <Button
                                fit="medium"
                                id="submit"
                                label="Submit"
                                name="submit"
                                type="submit"
                                variant="filledAlt"
                                width="auto"
                            />
                        </form>
                        <Toast />
                    </Box>
                </main>
            </div>
        </ThemeProvider>
    )
}
