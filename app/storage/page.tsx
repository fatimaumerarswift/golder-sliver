import StorageHero from "@/components/StorageHero";
import StorageCards from "@/components/StorageCards";
import StorageUpdate from "@/components/StorageUpdate";
import Emails from "@/components/Emails";

export default function Storage() {
  return (
    <>
       <StorageHero/> 
       <StorageUpdate/>
       <StorageCards/>
       <Emails/>
    </>
  )
}
