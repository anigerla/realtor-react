import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, query, orderBy, limit, getDocs, doc } from "firebase/firestore"
import { db } from "../firebase"
import Spinner from "../components/Spinner"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, {
    EffectFade,
    Autoplay,
    Navigation,
    Pagination
} from "swiper"
import "swiper/css/bundle"

export default function Slider() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  SwiperCore.use([Autoplay, Navigation, Pagination])
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings")
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5))
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach((listing)=>{
        return listings.push({
          id: listing.id,
          data: listing.data()
        })
      })
      setListings(listings)
      setLoading(false)
    }
    fetchListings()
  }, [])
  
  if(loading){
    return <Spinner />
  }
  if(listings.length === 0){
    return <></>
  }
  return listings && 
  <>
    <Swiper
        slidesPerView={1}
        navigation
        pagination={{type: "progressbar"}}
        effect="fade"
        module={[EffectFade]}
        autoplay={{delay: 3000}}
    >
        {listings.map(({data, id})=>(
            <SwiperSlide 
                key={id} 
                onClick={()=>navigate(`/category/${data.type}/${id}`)}
            >
                <div 
                    style={{
                        background: `url(${data.imgUrls[0]}) center, no-repeat`, 
                        backgroundSize: "cover"
                    }}
                    className="relative w-full h-[300px] overflow-hidden curs"
                ></div>
                <p className="absolute text-[#f1faee] left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-2xl">{data.name}</p>
                <p className="absolute text-[#f1faee] left-1 bottom-3 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-bl-3xl">
                    $ {data.discountedPrice ?? data.regularPrice}
                    {data.type === "rent" && " / month"}
                </p>
            </SwiperSlide>
        ))}
    </Swiper>
  </>
}