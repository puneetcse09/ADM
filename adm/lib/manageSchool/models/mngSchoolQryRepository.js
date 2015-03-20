/**
 * Created by ravikant on 13/10/14.
 */

//Manage School

//get All Schools
function getAllSchools(){
    var queryConfig=[
        {
        	 startNode:{nodeName:"School",nodeQueryAlias:"sc"},
             relation:null,
             endNode:null,
             returnAliases:["sc"],
             queryType:'search',
             limit:50
        }
    ]
    return queryConfig;
}
module.exports.getAllSchools=getAllSchools;

//get selected School details
function getSelectedSchoolDetails(){
    var queryConfig=[
                     /*
                     {
			        	
			        	 startNode:{nodeName:"School",nodeQueryAlias:"sc"},
			             relation:null,
			             endNode:null,
			             returnAliases:["sc"],
			             queryType:'search'
                   }
*/
       
        	 {
                 startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
                 relation:{relationName:"CONTACT_OF",relationQueryAlias:"sc_contact"},
                 endNode:{nodeName:"Contact",nodeQueryAlias:"contact",isNew:false},
                 returnAliases:["sc","contact"],
                 queryType:'search'
             },
             {
                 startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
                 relation:{relationName:"PRIMARY_ADDRESS_OF",relationQueryAlias:"us_pa"},
                 endNode:{nodeName:"PrimaryAddress",nodeQueryAlias:"pa",isNew:false},
                 returnAliases:["sc","contact","pa"],
                 queryType:'search'
             },
             {
                 startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
                 relation:{relationName:"SECONDARY_ADDRESS_OF",relationQueryAlias:"sc_sa"},
                 endNode:{nodeName:"SecondaryAddress",nodeQueryAlias:"sa",isNew:false},
                 returnAliases:["sc","contact","pa","sa"],
                 queryType:'search'
             },
             {
                 startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
                 relation:{relationName:"SOCIAL_NETWORK_OF",relationQueryAlias:"sc_socn"},
                 endNode:{nodeName:"SocialNetwork",nodeQueryAlias:"socn",isNew:false},
                 returnAliases:["sc","contact","pa","sa","socn"],
                 queryType:'search'
             },
             {
                 startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
                 relation:{relationName:"IMAGE_OF",relationQueryAlias:"sc_img"},
                 endNode:{nodeName:"Image",nodeQueryAlias:"img",isNew:false},
                 returnAliases:["sc","contact","pa","sa","socn","img"],
                 queryType:'search'
             }
     
    ]
    return queryConfig;
}
module.exports.getSelectedSchoolDetails=getSelectedSchoolDetails;

//add new school
function adddNewSchool(){
    var queryConfig=[
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:true},
            relation:null,
            endNode:null,
            returnAliases:["sc"],
            queryType:'create'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"CONTACT_OF",relationQueryAlias:"sc_contact"},
            endNode:{nodeName:"Contact",nodeQueryAlias:"contact",isNew:true},
            returnAliases:["sc","contact"],
            queryType:'create'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"PRIMARY_ADDRESS_OF",relationQueryAlias:"us_pa"},
            endNode:{nodeName:"PrimaryAddress",nodeQueryAlias:"pa",isNew:true},
            returnAliases:["sc","contact","pa"],
            queryType:'create'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"SECONDARY_ADDRESS_OF",relationQueryAlias:"sc_sa"},
            endNode:{nodeName:"SecondaryAddress",nodeQueryAlias:"sa",isNew:true},
            returnAliases:["sc","contact","pa","sa"],
            queryType:'create'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"SOCIAL_NETWORK_OF",relationQueryAlias:"sc_socn"},
            endNode:{nodeName:"SocialNetwork",nodeQueryAlias:"socn",isNew:true},
            returnAliases:["sc","contact","pa","sa","socn"],
            queryType:'create'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"IMAGE_OF",relationQueryAlias:"sc_img"},
            endNode:{nodeName:"Image",nodeQueryAlias:"img",isNew:true},
            returnAliases:["sc","contact","pa","sa","socn","img"],
            queryType:'create'
        }
    ];
    return queryConfig;
}
module.exports.adddNewSchool=adddNewSchool;

//function updateSchool(){
//    var queryConfig=[
//        {
//            startNode:{nodeName:"School",nodeQueryAlias:"sc"},
//            relation:{relationName:"LIBRARY_OF",relationQueryAlias:"sc_lib"},
//            endNode:{nodeName:"Library",nodeQueryAlias:"lib"},
//            returnAliases:["lib"],
//            queryType:'search'
//        },
//        {
//            startNode:{nodeName:"Library",nodeQueryAlias:"lib"},
//            relation:{relationName:"PRIMARY_ADDRESS_OF",relationQueryAlias:"lib_pa"},
//            endNode:{nodeName:"PrimaryAddress",nodeQueryAlias:"pa"},
//            returnAliases:["lib","pa","lib_pa"],
//            queryType:'search'
//        },
//        {
//            updates:[
//                {nodeName:"Library",nodeQueryAlias:"lib"},
//                {nodeName:"PRIMARY_ADDRESS_OF",nodeQueryAlias:"lib_pa"},
//                {nodeName:"PrimaryAddress",nodeQueryAlias:"pa"}
//            ],
//            returnAliases:["lib","lib_pa","pa"],
//            queryType:'update'
//        }
//    ];
//    return queryConfig;
//}
//module.exports.updateSchool=updateSchool;

module.exports.tempQ=function(){
    var queryConfig=[
//        {
//            startNode:{nodeName:"School",nodeQueryAlias:"sc"},
//            relation:null,
//            endNode:null,
//            returnAliases:["sc"],
//            queryType:'search'
//        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"CONTACT_OF",relationQueryAlias:"sc_contact"},
            endNode:{nodeName:"Contact",nodeQueryAlias:"contact",isNew:false},
            returnAliases:["sc","contact"],
            queryType:'search'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"PRIMARY_ADDRESS_OF",relationQueryAlias:"us_pa"},
            endNode:{nodeName:"PrimaryAddress",nodeQueryAlias:"pa",isNew:false},
            returnAliases:["sc","contact","pa"],
            queryType:'search'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"SECONDARY_ADDRESS_OF",relationQueryAlias:"sc_sa"},
            endNode:{nodeName:"SecondaryAddress",nodeQueryAlias:"sa",isNew:false},
            returnAliases:["sc","contact","pa","sa"],
            queryType:'search'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"SOCIAL_NETWORK_OF",relationQueryAlias:"sc_socn"},
            endNode:{nodeName:"SocialNetwork",nodeQueryAlias:"socn",isNew:false},
            returnAliases:["sc","contact","pa","sa","socn"],
            queryType:'search'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"IMAGE_OF",relationQueryAlias:"sc_img"},
            endNode:{nodeName:"Image",nodeQueryAlias:"img",isNew:false},
            returnAliases:["sc","contact","pa","sa","socn","img"],
            queryType:'search'
        }
   ];
    /*var queryConfig=[
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc"},
            relation:null,
            endNode:null,
            returnAliases:["sc"],
            queryType:'search'
        },
        {
            startNode:{nodeName:"School",nodeQueryAlias:"sc",isNew:false},
            relation:{relationName:"BELONGS_TO",relationQueryAlias:"sc_u"},
            endNode:{nodeName:"User",nodeQueryAlias:"u",isNew:true},
            returnAliases:["u"],
            queryType:'create'
        },
        {
            startNode:{nodeName:"ChildBook",nodeQueryAlias:"co",isNew:true},
            relation:null,
            endNode:null,
            returnAliases:["u","c"],
            queryType:'create'
        }
    ]*/
    return queryConfig;
};