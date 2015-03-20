/**
 * Created by ravikant on 20/11/14.
 */

module.exports=function(createdBy){
    this.updatedAt=0;
    this.createdAt=(new Date()).getTime();
    this.createdBy=createdBy?createdBy:"";
    this.updatedBy="";
    this.image="";
    this.icon="";
    this.nameTags="";
    this.height=0;
    this.album="";
    this.photoId=1;
    this.width=0;
}


