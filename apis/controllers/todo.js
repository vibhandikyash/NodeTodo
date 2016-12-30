var list = require('../models/list')


module.exports = {


     getall : function(callback){
         list.find({}, 'list' , (function(err, items){
             callback(items);
         }));
    },

    add : function(item){
        console.log('add.item : ' + item);
        var newitem = new list({
            list : item
        });

        return Boolean(newitem.save(function(err){
        if(err){
            return false;
            console.log(err);
        }
        return true;
        }));
    },

    remove : function(id, callback){
        console.log('removing id :' + id);

        list.findOneAndRemove({ _id : id} , function(err,removed){
            if(err) callback(false);
            else callback(true);
        });
    }
}
