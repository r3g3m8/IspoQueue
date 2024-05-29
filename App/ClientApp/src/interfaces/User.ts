import Cabinet from "./Cabinet";
import Windows from "./WIndows";

export default interface User {
    id: string | null;
    firstName: string;
    secondName: string | null;
    login: string;
    password: string | null;
    roles: { id: string, name: string }[] | [];
    windows: Windows[] | null;
    cabinet: Cabinet | null;
}