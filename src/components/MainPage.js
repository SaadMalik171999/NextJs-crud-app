
import { deleteUserData, getUserData } from "@/lib/Helper";
import { DeleteToggleAction } from "@/redux/reducer";
import React, { useEffect, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import AddComponent from "./AddComponent";
import AlertInfo from "./AlertInfo";
import Table from "./Table";
import UpdateComponent from "./UpdateComponent";

export default function MainPage() {

    const [show, setshow] = useState(false)
    const [isAlert, setIsAlert] = useState(false);
    const [isupdateAlert, setIsupdateAlert] = useState(false);
    const [isdeleteAlert, setIsdeleteAlert] = useState(false);

    const visible = useSelector((state) => state.app.client.toggleForm)
    const deletedId = useSelector((state) => state.app.client.deleteId)
    const deletedToggle = useSelector((state) => state.app.client.deleteToggle)

    const showForm = (e) => {
        setshow(e);
        setIsAlert(true);
    }

    const updateAlert = () => {
        setIsupdateAlert(true);
    }

    const deleteAlert = () => {
        setIsdeleteAlert(true);
    }
    return (
        <>
            {isAlert && <AlertInfo isAlert={isAlert} setIsAlert={setIsAlert} Status="success" Title="Employee is Added successfully" />}
            {isupdateAlert && <AlertInfo isAlert={isupdateAlert} setIsAlert={setIsupdateAlert} Status="warning" Title="Employee is updated successfully" />}
            {isdeleteAlert && <AlertInfo isAlert={isdeleteAlert} setIsAlert={setIsdeleteAlert} Status="error" Title="Employee is deleted successfully" />}

            <div className="flex justify-center items-center">
                <div className=" pt-16 h-[100vh]">
                    <div className="">
                        <h1 className="text-center font-bold text-4xl">Employee Management</h1>
                    </div>
                    <div className="flex justify-between border-b-2 border-purple-500 pb-5 mt-4 mx-10 ">

                        <button disabled={visible} onClick={() => setshow(!show)} className="bg-purple-600 hover:bg-purple-400 disabled:bg-gray-200 text-white text-md font-bold rounded-md p-2 mr-2">Add Employee</button>
                        <div >
                            {
                                deletedToggle ? (<DeleteComponent deletedId={deletedId} deleteAlert={deleteAlert} />) : ""
                            }
                        </div>


                    </div>
                    {
                        show && !visible ? <AddComponent showForm={showForm} /> : ""
                    }

                    {
                        visible ? <UpdateComponent updateAlert={updateAlert} /> : ""
                    }
                    <Table show={show} setshow={setshow} />

                </div>
            </div>
        </>
    )
}

function DeleteComponent({ deletedId, deleteAlert }) {

    const queryClient = useQueryClient();
    const dispatch = useDispatch();


    const deletehandler = async () => {
        if (deletedId) {
            await deleteUserData(deletedId);
            await queryClient.prefetchQuery('users', getUserData);
            dispatch(DeleteToggleAction(false));
            deleteAlert();
        }
    }

    const cancelhandler = async () => {
        dispatch(DeleteToggleAction(false));

    }

    return (
        <div className='flex gap-5'>
            <button>Are you sure?</button>
            <button onClick={deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
                Yes <span className='px-1'><BiX color='rgb(255 255 255)' size={25} /></span></button>
            <button onClick={cancelhandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50'>
                No <span className='px-1'><BiCheck color='rgb(255 255 255)' size={25} /></span></button>
        </div>
    )
}
