jQuery(document).ready(function(){
  
  startApp().then((data)=>{
    console.log(data);
    console.log(campaignObj)
  });
 
  })
  

  function startApp(){
    return new Promise((resolve, reject)=>{
      try{
        getCampaigns(campaignListPath);
        resolve("startUp");
      } catch (error){
        reject(error);
      }
    })
    
  }