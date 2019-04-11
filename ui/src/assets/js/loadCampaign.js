jQuery(".campaignButton").click(function () {
    var type = jQuery(this).attr("data-campaign");
    if (type == "new") {
        console.log("clicked new you bastard")
        newCampaign();
    } else {
        console.log("coming soon");
    }
});

jQuery(".campDelete").click(function () {
    var toDelete = jQuery(this).attr("data-delete");
    console.log("delet this number " + toDelete + " and this is the object" + JSON.stringify(campaignObj))
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
                console.log(JSON.stringify(campaigns));
                var campArray = campaigns.campaigns;
                console.log(campaigns.campaigns[0].name);
                var html = "<table>";
                campArray.forEach(function (node, i) {
                    console.log(campaigns.campaigns[i].name)
                    html += "<tr><td>" + campaigns.campaigns[i].name + "</td><td><button type='button' data-load='" + campaigns.campaigns[i].name + "' class='btn btn-primary campLoad'>Load</button><button type='button' data-delete='" + i + "' class='btn btn-primary campDelete'>Delete</button></td></tr>";
                })

                html += "</table>";
                jQuery(".campaignSelectorBox").html(html);
                return "campaigns set";
            });
        }

    });
}

