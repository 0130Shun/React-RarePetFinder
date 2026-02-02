import Tranding from "./sections/Tranding";
import Scam from "./sections/Scam";
import RepostPost from "./sections/RepostPost";
import Articles from "../Articles";

export default function Home() {
    return (<>
        <h1>這是首頁</h1>
        <Tranding />
        <Scam />
        <RepostPost />
        <Articles />
    </>)
}