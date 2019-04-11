jQuery(".campAdd").on("click", () => {
    newCampaign();
});

//the delete button
jQuery(".campaignList").on("click", ".campDelete", function () {
    var toDelete = jQuery(this).attr("data-delete");
    // console.log("clicked");
    //should add a are you sure popup
    console.log("delet this number " + toDelete + " and this is the object" + JSON.stringify(campaignObj.campaigns));
    campaignObj.campaigns.splice(toDelete);
    console.log(JSON.stringify(campaignObj));
    writeFile(campaignListPath, JSON.stringify(campaignObj)).then((data) => {
        if (data == "File Written") {
            getCampaigns(campaignListPath);
        }
    })

});

jQuery(".campaignList").on("click", ".saveNewCamp", function(){
    var newCampName = jQuery("input[name='newCamp']").val();
    var campObj = {"name":newCampName};
    campaignObj.campaigns.push(campObj);
    // console.log(JSON.stringify(campaignObj))
    writeFile(campaignListPath, JSON.stringify(campaignObj)).then((data) => {
        if (data == "File Written") {
            getCampaigns(campaignListPath).then((data)=>{
                setCampaigns(data).then(function(campList){
                    jQuery(".campaignList").html(campList);
                })
            })
        }
    })
})

function newCampaign() {
    getCampaigns(campaignListPath).then((data)=>{
        setCampaigns(data).then((html)=>{
           var addOnHtml = "<tr><td><input type='text' name='newCamp' /></td><td><button type='button' class='btn btn-primary saveNewCamp'>Save</button></td></tr></table>";
           var newHtml = html.replace("</table>", addOnHtml);
           jQuery(".campaignList").html(newHtml);
        })
    })

}

//Gets the list of campaigns
function getCampaigns(path) {
    return new Promise((resolve, reject) => {
        try {
            // console.log("getCampaigns " + path);
            checkFileExist(path).then((data) => {
                // console.log(data);
                if (data == "true") {
                    readAFile(path).then((campaigns) => {
                        campaigns = JSON.parse(campaigns);
                        campaignObj = campaigns;
                        resolve(campaignObj);
                    });
                }
            });
        }catch (error) {
            reject(error);
        }
    })
}

//Puts the list of campaigns on the campaign selector.
function setCampaigns(campaigns) {
    return new Promise((resolve, reject) => {
        try {
            var campArray = campaigns.campaigns;
            var html = "<table>";
            campArray.forEach(function (node, i) {
                console.log(JSON.stringify(node))
                // console.log(campaigns.campaigns[i].name)
                html += "<tr><td>" + campaigns.campaigns[i].name + "</td><td><button type='button' data-load='" + campaigns.campaigns[i].name + "' class='btn btn-primary campLoad'>Load</button><button type='button' data-delete='" + i + "' class='btn btn-primary campDelete'>Delete</button></td></tr>";
            })
            html += "</table>";
            
            resolve(html);
        } catch (error) {
            reject(error);
        }
    });
}