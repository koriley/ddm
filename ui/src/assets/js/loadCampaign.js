jQuery(".campaignButton").click(function () {
    var type = jQuery(this).attr("data-campaign");
    if (type == "new") {
        newCampaign();
    } else {
        console.log("coming soon");
    }
});


function newCampaign() {


}

function getCampaigns(path) {
    // console.log("getCampaigns " + path);
    checkFileExist(path).then((data) => {
        // console.log(data);
        if (data == "true") {
            readAFile(path).then((campaigns) => {
                campaigns = JSON.parse(campaigns);
                console.log(JSON.stringify(campaigns));
                
                console.log(campaigns.campaigns[0].name);
                var html = "<table>";
                for(var i = 0; i <= campaigns.campaigns - 1; i++) {
                    console.log("here " + campaigns.campaigns[i].name)
                    html += "<tr><td>" + campaigns.campaigns[i].name + "</td></tr>";
                }
                html += "</table>";
                jQuery(".campaignSelectorBox").html(html);
            });
        }

    });
}