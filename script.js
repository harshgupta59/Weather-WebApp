window.addEventListener('load',()=>{
  
     let long;
     let lat;
     let temperatureDescription = document.querySelector('.temperature-description')
     let temperatureDegree = document.querySelector('.temperature-degree-value');    
     let locationTimezone = document.querySelector('.location-timezone');
     let icon=document.querySelector('#icon');
     let temperaturetype=document.querySelector('.temperature-degree span');
     const temperaturesection=document.querySelector('.temperature-degree');

     if(navigator.geolocation){
         
        const Successcallback=(position)=>{

            long=position.coords.longitude;
            lat=position.coords.latitude;
            
            const APIkey='836881cfa7d610e726d05b08947dd459';
            const API=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`;

            fetch(API)
            .then(response => response.json())
            .then(data => {
                
                //getting data fromAPI
                const temperature=(data.main.temp-273.15).toFixed(2);
                const description=data.weather[0].description;
                country_name=data.sys.country;
                const city_name=data.name;
                const timezone=country_name+' / '+data.name;

                //Set DOM elements from API
                temperatureDegree.textContent=temperature;
                temperatureDescription.textContent=description;
                locationTimezone.textContent=timezone;
                
                //set icon image by fetching iconID
                const iconID=data.weather[0].icon;
                icon.src="icons/"+iconID+".png";
                
                //celcius to conversion formula 
                let fahrenheit=((temperature) * (1.8) + 32).toFixed(2);

                //Temperature conversion
                temperaturesection.addEventListener('click',()=>{
                    console.log(temperaturetype);
                    if(temperaturetype.textContent==="F"){
                        temperaturetype.textContent="*C";
                        temperatureDegree.textContent=temperature;
                    }
                    else{
                        temperaturetype.textContent="F";
                        temperatureDegree.textContent=fahrenheit;
                    }
                });

            });
            
         };

             const Errorcallback = (error)=>{
             alert("Location access needed to run this app");

             //reload the current document
             location.reload();

         };

         navigator.geolocation.getCurrentPosition(Successcallback,Errorcallback);
     }
     else{

         alert("Geolocation is not supported by this browser");

     }
});