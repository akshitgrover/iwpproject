/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		res.view();
	},
	signup:function(req,res){
		res.view();
	},
	ulogin:function(req,res){
		res.view();
	},
	create:function(req,res){
		req.session.err="";
		req.session.flash="";
		if(req.param('password')!=req.param('confirmpassword')){
				req.session.err={msg:"Passwords Didn't Match!"};
				return res.redirect('/user/signup')
		}
		User.create(req.params.all(),function(err,data){
			if(err){
				req.session.err={msg:"Something Went Wrong!"};
				return res.redirect('/user/index')
			}
			data.orders=[];
			data.admin=false;
			data.save();
			req.session.user=data;
			req.session.authenticated=true;
			req.session.flash={msg:"Welcome To WittyFood!"};
			return res.redirect('/user/userpanel'); 
		});
	},
	login:function(req,res){
		req.session.err="";
		req.session.flash="";
		User.findOne({phoneno:req.param('phoneno')},function(err,data){
			if(err){
				req.session.err={msg:"Something Went Wrong!"};
				return res.redirect('/user/index')
			}
			if(data && req.param('password')==data.password){
				req.session.user=data;
				req.session.authenticated=true;
				return res.redirect('/user/userpanel');
			}
			else{
				req.session.err={msg:"Phone Number/Password Didn't Match."};
				return res.redirect('/user/ulogin');
			} 
		});
	},
	userpanel:function(req,res){
		res.view();
	}
};

