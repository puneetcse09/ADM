/**
 * Created by ravikant on 7/12/14.
 */
function userProfileImage(){
    var queryConfig=[
        {
            startNode:{nodeName:"User",nodeQueryAlias:"us"},
            relation:{relationName:"IMAGE_OF",relationQueryAlias:"img_us"},
            endNode:{nodeName:"Image",nodeQueryAlias:"img"},
            returnAliases:["img"]
        }
    ]
    return queryConfig;
}
module.exports.userProfileImage=userProfileImage;