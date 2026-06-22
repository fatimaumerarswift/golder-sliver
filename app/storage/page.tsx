import StorageHero from "@/components/StorageHero";
import StorageCards from "@/components/StorageCards";
import StorageUpdate from "@/components/StorageUpdate";
import Email from "@/components/Email";

export default function Storage() {
  return (
    <>
       <StorageHero/> 
       <StorageUpdate/>
       <StorageCards/>
       <Email/>
    </>
  )
}
