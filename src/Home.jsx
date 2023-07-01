import React, { useEffect, useState } from 'react'
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { Link } from 'react-router-dom';


function Home() {

    const [count, setCount] = useState(0);




    let Mealtext = [
        'Wanna make a delicious dish?',
        'Search for your next meal!',
        'Discover new recipes!',
        'Cook up something amazing!',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => (prevCount + 1) % Mealtext.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-image">
            <h1>
                "Discover an Abundance of <span>Delicious Recipes</span> with Our Advanced Search Functionality."
            </h1>
            <h2>{Mealtext[count]}</h2>
            <button>
                <Link to="/explore" >
                    Explore <LocalDiningIcon />

                </Link>
                <span></span>
            </button>
        </div>
    )
}

export default Home