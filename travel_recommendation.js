// Defined Function 

const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

// Function to generate recommendation accoding to user's input

function searchRecommendation() {
    const input = document.getElementById('user_input').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
            const arrayName = "beaches";
            const arrayName1 = "countries";
            const arrayName2 = "temples";
        
            if (input === "beaches" || input === "beach" || input === "best beaches" || input === "most beautiful beaches") {
                const beach = data[arrayName].find(item => item.name.toLowerCase());

            if (beach) {
                const arrayName = "beaches";
                const beaches = data[arrayName];
            
                resultDiv.innerHTML = ''; 
            
                beaches.forEach(beach => {
                  resultDiv.innerHTML += `
                    <div class="col-lg-4 col-md-6">
                      <div class="img-box">
                        <img src="${beach.imageUrl}" alt="product" class="img-responsive ">
                        <h5 class="my-2"><a href="travel_recommendation.html">${beach.name}</a></h5>
                        <div class="blog-date"> 
                        </div>
                        <p class="para">${beach.description}</p>   
                        <div class="top-gap">
                        <a href="travel_recommendation_contact.html"><button type="button" class="btn btn-warning" style="width: 80%">visit</button></a>
                        </div>
                      </div>
                    </div> 
                  `;
                });
            } 
        
            } else if (input === "countries" || input === "country" || input === "best countries" || input === "most beautiful countries") {
                const country = data[arrayName1].find(item => item.name.toLowerCase());

                if (country) {
                    const arrayName1 = "countries";
                    const countries = data[arrayName1];
                
                    resultDiv.innerHTML = ''; 

                    for (let i = 0; i < countries.length; i++) {
                        const country = countries[i];

                        for (let j = 0; j < country.cities.length; j++) {
                          const city = country.cities[j];
                          
                          let localTime  = '';
                         
                          if (country.name === 'Australia') {
                            const options = { timeZone: 'Australia/Sydney', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                                  localTime = new Date().toLocaleTimeString('en-US', options);
                        
                          } else if (country.name === 'Japan') {
                            const options = { timeZone: 'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                                  localTime = new Date().toLocaleTimeString('en-US', options);
                          } else if (country.name === 'Brazil') {

                            const options = { timeZone: 'America/Sao_Paulo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                                  localTime = new Date().toLocaleTimeString('en-US', options);
                          }
                          
                          resultDiv.innerHTML += `
                          <div class="col-lg-4 col-md-6">
                            <div class="img-box">
                              <img src="${city.imageUrl}" alt="product" class="img-responsive ">
                              <h5 class="my-2"><a href="travel_recommendation.html">${city.name}</a></h5>
                              <div class="blog-date"> 
                              <p class="pos-date"><span class="fa fa-clock-o mr-1"></span>Local Time:</p> <p class="pos-date text-right"><span>${localTime}</span></p></div>
                              <p class="para">${city.description}</p>   
                              <div class="top-gap">
                              <a href="travel_recommendation_contact.html"><button type="button" class="btn btn-warning" style="width: 80%">visit</button></a>
                              </div>
                            </div>
                          </div> 
                        `;
                        }
                      }
                  
                } 
              
            } else if (input === "temples" || input === "temple" || input === "best temples" || input === "most beautiful temples") {
                const temple = data[arrayName2].find(item => item.name.toLowerCase());

                if (temple) {
                    const arrayName = "temples";
                    const temples = data[arrayName];
                
                    resultDiv.innerHTML = ''; 
                    
                
                    temples.forEach(temple => {
                      resultDiv.innerHTML += `
                        <div class="col-lg-4 col-md-6">
                          <div class="img-box">
                            <img src="${temple.imageUrl}" alt="product" class="img-responsive ">
                            <h5 class="my-2"><a href="travel_recommendation.html">${temple.name}</a></h5>
                            <p class="para">${temple.description}</p>                   
                            <div class="top-gap">
                            <a href="travel_recommendation_contact.html"><button type="button" class="btn btn-warning" style="width: 80%">visit</button></a>
                            </div>
                          </div>
                        </div> 
                      `;
                    });
                } 

            }
            else {
                resultDiv.innerHTML = `<div class="alert alert-danger" role="alert">
                                         No Recommendation Found !
                                       </div>`;
                  }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

  btnSearch.addEventListener('click', searchRecommendation);

  // Function to clear searched recommendation

  function clearSearch() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    document.getElementById("user_input").value = "";
   
  }

  btnClear.addEventListener('click', clearSearch);

