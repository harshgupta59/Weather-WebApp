window.addEventListener('load',()=>{
  
     let long;
     let lat;
     let temperatureDescription = document.querySelector('.temperature-description')
     let temperatureDegree = document.querySelector('.temperature-degree-value');    
     let locationTimezone = document.querySelector('.location-timezone');
     let icon=document.querySelector('#icon');
     let temperaturetypec=document.querySelector('.temperature-degree-C');
     let temperaturetypef=document.querySelector('.temperature-degree-F');
     let temperaturesection=document.querySelector('.temperature-degree');
     let time=document.querySelector('.time');
     let day=document.querySelector('.day');
     var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
     let windDescrip=document.querySelector('.wind');
     let humidityDescrip=document.querySelector('.humidity');

     function addZero(num){
         return num<10?`0${num}`:num;
     }
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

                //Set DOM elements from API
                temperatureDegree.innerHTML=temperature;
                temperatureDescription.innerHTML=description;
                locationTimezone.innerHTML=city_name+', '+country_name;
                        
                //set icon image by fetching iconID
                const iconID=data.weather[0].icon;
                icon.src="icons/"+iconID+".png";
                
                //celcius to conversion formula 
                let fahrenheit=((temperature) * (1.8) + 32).toFixed(2);

                //Temperature conversion
                temperaturetypec.addEventListener('click',()=>{
                    temperaturetypec.innerHTML="&#8451;";
                    temperatureDegree.innerHTML=temperature;
                });
                temperaturetypef.addEventListener('click',()=>{
                    temperaturetypef.innerHTML="&#8457;";
                    temperatureDegree.innerHTML=fahrenheit;
                });

                
                //Set current time
                function currentDate(){
                    let today=new Date();
                    let hours=addZero(today.getHours());
                    let minutes=addZero(today.getMinutes());
                    let seconds=addZero(today.getSeconds());
                    time.innerHTML=`${hours}:${minutes}:${seconds}`;
                    day.innerHTML=days[today.getDay()];
                }

                setInterval(currentDate, 1000);
                
                //set wind,humidity
                humidity=data.main.humidity;
                windspeed=(data.wind.speed*3.6).toFixed(0);
                windDescrip.innerHTML=`Wind: ${windspeed} km/hr`;
                humidityDescrip.innerHTML=`Humidity: ${humidity}%`;
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
