import Buffering from "./Assets/Buffering.gif";
import { CImage } from "@coreui/react";
import { useContext } from "react";
import UserContext from "../Contexts/User/UserContext";

function Loading()
{
    let userContext = useContext(UserContext);
    let {loading} = userContext;

    return (
        <>
            {loading && <img width={200} src={Buffering} alt="loading"/>}
        </>
    );
}

export default Loading;