import { useEffect } from "react";

  

const Lyrics = () => {
    
    useEffect(() => {
        const x = async () => {
            const s = await fetch('http://api.musixmatch.com/ws/1.1/track.search?apiKey=ce0dbbf10c077527c36bb1c7d6029367', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
                
            });
            console.log(s)
        }

        x()
    }, []);

    return (
        <div> 
  
        </div>
    )
}

export default Lyrics;