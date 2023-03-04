import { addUserData, getUserByIdData, getUserData, updateUserData } from "@/lib/Helper";
import { toggleChangeAction } from "@/redux/reducer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup'


export default function UpdateComponent({ updateAlert }) {

    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const updateMutation = useMutation((newData) => updateUserData(updateId, newData), {
        onSuccess: async (data) => {
            queryClient.prefetchQuery('users', getUserData);
            dispatch(toggleChangeAction());
            updateAlert();
        }
    });

    const handleUpdate = async (values) => {
        const { firstName, lastName, email, salary } = values;

        const model = {
            name: `${firstName} ${lastName}`,
            email, salary
        }
        updateMutation.mutate(model);

    }
    const updateId = useSelector((state) => state.app.client.updateId);

    const { isLoading, isError, data, error } = useQuery(['user', updateId], () => getUserByIdData(updateId));


    if (isError) return <div>Got Error {error}</div>;
    if (isLoading) return <div>Employee is Loading ....</div>;

    const [firstName, lastName] = data?.name.split(' ');

    const initialValues = {
        firstName: firstName,
        lastName: lastName,
        email: data?.email,
        salary: data?.salary
    }

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
                onSubmit={handleUpdate}
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
                        <button type="submit" className="bg-green-400 hover:bg-green-600 text-md text-white font-bold rounded-md p-2">Update</button>
                    </div>


                </Form>

            </Formik>


        </>
    )
}