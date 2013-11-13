/**
 *
 * Created by Stephen Wille
 * Date: 8/4/13
 */



//var request = require('request');


var emailRegExp = /.+@.+\..*/;
var timespan_year = 31536000000;
var timespan_18_years = 18 * timespan_year;
var UserSchema;
var SALT = 10;




function validate_18_years_old(date)
{
    "use strict";
    return (Date.now() - date.getTime()) > timespan_18_years;
}




var UserSchema = new mongoose.Schema(
    {
        username:{ type:String, required:true, unique:true }
        ,password:{ type:String, required:true }
        ,name:mongoose.Schema.Types.Mixed
        ,email:
            {
                type:String
                ,required:true
                ,match:emailRegExp
            }
        ,gender:
            {
                type:String
                ,required:true
                ,uppercase:true
                ,'enum':['M', 'F']
            }
        ,birthday:
            {
                type:Date
//                ,validate:
//                    [
//                        validate_18_years_old
//                        ,'you must be 18 years old or more'
//                    ]
            }
        ,bio:{type:String}
    });



    UserSchema
        .virtual('full_name')
        .get(function()
            {
                if(typeof this.name === 'string')
                    { return this.name; }

                return [this.name.first, this.name.last].join(' ');
            })
        .set(function(fullName)
            {
                var nameComponents = fullName.split(' ');

                this.name = {last:nameComponents.pop(), first:nameComponents.join(' ')};
            });




    UserSchema.pre('save',function(next)
    {
        var user = this;


        if(! user.isModified('password')) return next();

        bcrypt.genSalt(SALT, function(err, salt)
        {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash)
            {
                if(err) return next(err);

                user.password = hash;

                next();
            });

        });
    });




//    UserSchema.methods.comparePasswords = function(plainPwd, hashedPwd, callback)
//    {
//        console.log('UserSchema');
//
//        bcrypt.compare(plainPwd, hashedPwd, callback);
//    };



module.exports = UserSchema;


