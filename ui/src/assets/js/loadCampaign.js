jQuery(".campaignButton").click(function () {
    var type = jQuery(this).attr("data-campaign");
    if (type == "new") {
        console.log("clicked new you bastard")
        newCampaign();
    } else {
        console.log("coming soon");
    }
});

jQuery(".campaignSelectorBox").on("click", ".campDelete", function () {
    var toDelete = jQuery(this).attr("data-delete");
    // console.log("clicked");
    //should add a are you sure popup
    console.log("delet this number " + toDelete + " and this is the object" + JSON.stringify(campaignObj.campaigns));
    campaignObj.campaigns.splice(toDelete);
    console.log(JSON.stringify(campaignObj));
    writeFile(campaignListPath, JSON.stringify(campaignObj)).then((data)=>{
        if(data == "File Written"){
            getCampaigns(campaignListPath);
        }
    })

})

function newCampaign() {


}

function getCampaigns(path) {
    // console.log("getCampaigns " + path);
    checkFileExist(path).then((data) => {
        // console.log(data);
        if (data == "true") {
            readAFile(path).then((campaigns) => {
                campaigns = JSON.parse(campaigns);
                campaignObj = campaigns;
                setCampaigns(campaignObj)
            });
        }
    });
}

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
            jQuery(".campaignSelectorBox").html(html);
            resolve("setCampaigns");
        } catch (error) {
            reject(error);
        }
    });
}