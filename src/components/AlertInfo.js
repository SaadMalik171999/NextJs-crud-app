import {
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton,
} from '@chakra-ui/react'

export default function AlertInfo({ isAlert, setIsAlert, Status, Title }) {

    return (
        <>
            {
                isAlert && (
                    <div className="flex justify-center items-center mt-5">
                        <Alert w={380} status={Status}>
                            <AlertIcon />
                            <AlertTitle mr={10}>{Title}</AlertTitle>
                            <CloseButton
                                onClick={() => setIsAlert(!isAlert)}
                            />
                        </Alert>
                    </div>
                )
            }
        </>
    )
}

