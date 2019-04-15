jQuery(document).ready(function(){
  
  startApp().then((data)=>{
    setCampaigns(data).then((campList)=>{
      jQuery(".campaignList").prepend(campList);
    })
    // console.log(JSON.stringify(data));
    // console.log(campaignObj)
  });
 
  })
  

  function startApp(){
    return new Promise((resolve, reject)=>{
      try{
        getCampaigns(campaignListPath).then((data)=>{
          resolve(data);
        });
        
      } catch (error){
        reject(error);
      }
    })
    
  }