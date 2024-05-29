import Windows from "./WIndows";

export default interface Cabinet {
    id: string
    name: string
    windows: Windows[] | undefined;
}