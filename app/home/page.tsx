import Image from "next/image";

export default function Home(){
    return (<div style={{
                display: "flex",
                justifyContent: "center"
            }}> 
        <Image 
            src="/project-foam.png"
            alt="Project Foam placeholder logo"
            height={1080}
            width={1080}
            priority
            />
    </div>);
}