import { deleteUserData, getUserData } from "@/lib/Helper";
import { addUpdateIdAction, DeleteIdAction, DeleteToggleAction, toggleChangeAction } from "@/redux/reducer";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from 'react-redux'

export default function Table({ show }) {

    const { isLoading, isError, data, error } = useQuery('users', getUserData);

    if (isError) return <div>Got Error {error}</div>;
    if (isLoading) return <div>Employee is Loading ....</div>;
    return (
        <>
            <table className="min-w-full my-5 ">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Name</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Email</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Salary</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Birthday</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Status</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {
                        data?.map((obj, i) => <Tr {...obj} key={i} show={show} />)
                    }
                </tbody>
            </table>
        </>
    )
}


function Tr({ _id, name, avatar, email, salary, date, status, show }) {


    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const onUpdate = () => {
        dispatch(toggleChangeAction());
        dispatch(addUpdateIdAction(_id));
    }

    const onDelete = async (id) => {
        if (id) {
            dispatch(DeleteIdAction(id));
            dispatch(DeleteToggleAction(true));
       
        }
    }

    return (
        <tr className="bg-gray-50 text-center">
            <td className="px-16 py-2 flex flex-row items-center">
                <img src={avatar || '#'} alt="" className="h-8 w-8 rounded-full object-cover" />
                <span className="text-center ml-2 font-semibold">{name || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <span>{email || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <span>{salary || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <span>{date || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <button className="cursor"><span className={`${status == "Active" ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>{status || "Unknown"}</span></button>
            </td>
            <td className="px-16 py-2 flex justify-around gap-5">
                <button className="cursor text-green-500 disabled:text-gray-200" disabled={show} onClick={onUpdate} ><BiEdit size={25} ></BiEdit></button>
                <button className="cursor text-red-500 disabled:text-gray-200" onClick={() => onDelete(_id)}><BiTrashAlt size={25} ></BiTrashAlt></button>
            </td>
        </tr>
    )
}