import MetalHero from "@/components/MetalHero";
import Emails from "@/components/Emails";
import MetalUpdates from "@/components/MetalUpdate";
import MetalCards from "@/components/MetalCard";


export default function page() {
  return (
   <>
   <MetalHero/>
   <MetalUpdates/>
   <MetalCards/>
   <Emails/>
   </>
  )
}
