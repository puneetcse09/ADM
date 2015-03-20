/**
 * Created by ravikant on 10/9/14.
 */
var fs=require('fs');
module.exports=function(app,Utils){
    //read Image
    app.post("/application/readImage",Utils.ensureAuthenticated,function(req,res){
        var file=req.files["imageFile"];
        var dataPath=file.path;
        var type = file.type;
        var prefix = "data:" + type + ";base64,";
        var responseObj=new Utils.Response();
        var imgStr=prefix+Utils.base64_encode(dataPath);
        responseObj.responseData=imgStr || "";
        res.json(responseObj);
    });

    app.get('/AllModelsMetadata',Utils.ensureAuthenticated,function(req,res){
        var dir='../../models/';
        var data={};
        fs.readdir(dir,function(err,files){
            if (err) throw err;
            var c=0;
            files.forEach(function(file){
                console.log(dir+file);
                c++;
                fs.readFile(dir+file,'utf-8',function(err,jsonFile){
                    if (err) throw err;
                    data[file]=html;
                    if (0===--c) {
                        console.log(data);  //socket.emit('init', {data: data});
                    }
                });
            });
        });
    });
}