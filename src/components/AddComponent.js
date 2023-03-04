import { addUserData, getUserData } from "@/lib/Helper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQueryClient, useMutation } from "react-query";
import * as yup from 'yup'

export default function AddComponent({ showForm }) {

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        salary: ""
    }

    const queryClient = useQueryClient()


    const handleSubmit = (values) => {
        const { firstName, lastName, email, salary } = values;

        const model = {
            name: `${firstName} ${lastName}`,
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
            email, salary, status: status ?? "Active"
        }
        addMutation.mutate(model);

    }


    const addMutation = useMutation(addUserData, {
        onSuccess: () => {
            queryClient.prefetchQuery('users', getUserData);
            showForm(false);
        }
    });


    const formValidations = yup.object({
        firstName: yup.string().required("First Name Is Must"),
        lastName: yup.string().max(50).required("Last Name Is Must"),
        email: yup.string().email().matches(/^(?!.*@[^,]*,)/).min(10).max(50).required("Email Is Must"),
        salary: yup.number().required("Salary Is Must"),
    })

    return (
        <>
            
            <Formik
                validationSchema={formValidations}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >

                <Form>
                    <div className="m-10 flex ">

                        <div className="flex flex-col w-full mx-2">
                            <Field type="text" name="firstName" placeholder="First Name" className="border px-5 py-3 focus:outline-none rounded-md" />
                            <ErrorMessage name="firstName" />
                        </div>

                        <div className="flex flex-col w-full mx-2">
                            <Field type="text" name="lastName" placeholder="Last Name" className="border px-5 py-3  focus:outline-none rounded-md" />
                            <ErrorMessage name="lastName" />
                        </div>

                    </div>

                    <div className="m-10 flex ">
                        <div className="flex flex-col w-full mx-2">

                            <Field type="text" name="email" placeholder="Email" className="border  px-5 py-3 focus:outline-none rounded-md" />
                            <ErrorMessage name="email" />
                        </div>

                        <div className="flex flex-col w-full mx-2">

                            <Field type="text" name="salary" placeholder="Salary" className="border  px-5 py-3 focus:outline-none rounded-md" />
                            <ErrorMessage name="salary" />

                        </div>

                    </div>
                    <div className=" flex justify-end pb-5 mt-4 mx-10 ">
                        <button className="bg-green-400 hover:bg-green-600 text-md text-white font-bold rounded-md p-2">Submit</button>
                    </div>


                </Form>

            </Formik>


        </>
    )
}