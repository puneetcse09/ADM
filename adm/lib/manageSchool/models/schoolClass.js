/**
 * Created by ravikant on 16/9/14.
 */
function schoolClass() {
	this.basicDetails = {
		name : "",
		shortName : "",
		schoolId : "",
		desc : "",
		schoolHeadId : "",
		schoolBoard : "",
		softDelete : false,
		schoolUrl : "",
		schoolRegNum : "",
		establishDate:"",
		createdBy:"", //username
		createdAt:(new Date()).getTime(),
        updatedBy:"", //username
        updatedAt:(new Date()).getTime(),
		_id : ''
	};
	this.imageData = {
		imagePath : '',
		createdBy:"", //username
		createdAt:(new Date()).getTime(),
        updatedBy:"", //username
        updatedAt:(new Date()).getTime(),
		_id : ''
	};
	this.primaryAddress = {
		street2 : '',
		pincode : '',
		street1 : '',
		state : '',
		district : '',
		city : '',
		country : '',
		addressPlace:'Please enter your City',
		createdBy:"", //username
		createdAt:(new Date()).getTime(),
        updatedBy:"", //username
        updatedAt:(new Date()).getTime(),
		_id : ''
	};
	this.secondaryAddress = {
		street2 : '',
		pincode : '',
		street1 : '',
		state : '',
		district : '',
		city : '',
		country : '',
		addressPlace:'Please enter your City',
		createdBy:"", //username
		createdAt:(new Date()).getTime(),
        updatedBy:"", //username
        updatedAt:(new Date()).getTime(),
		_id : ''
	};
	this.contact = {
		emailPrimary : '',
		emailSecondary : '',
		phonePrimary : '',
		phoneSecondary : '',
		createdBy:"", //username
		createdAt:(new Date()).getTime(),
        updatedBy:"", //username
        updatedAt:(new Date()).getTime(),
		_id : ''
	};
    this.socialNetwork={
        skypeId: '',
        facebookId: '',
        twitterUrl: '',
        skypeUrl: '',
        twitterId: '',
        facebookScreenName: '',
        facebookUrl: '',
        createdBy:"", //username
		createdAt:(new Date()).getTime(),
        updatedBy:"", //username
        updatedAt:(new Date()).getTime(),
        _id: ''
    };
//	this.schoolHead = {
//	school head details (user)	
//	};
	this.setSchoolDetails = function(basicDetails, primaryAddress,
			secondaryAddress, contact, socialNetwork, imageData) {
		this.basicDetails = basicDetails;
		this.primaryAddress = primaryAddress;
		this.secondaryAddress = secondaryAddress;
		this.contact = contact;
        this.socialNetwork = socialNetwork;
        this.imageData=imageData;
	}
}

module.exports=schoolClass;
