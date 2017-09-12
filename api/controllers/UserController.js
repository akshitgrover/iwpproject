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
			data.admin=true;
			data.save();
			req.session.user=data;
			req.session.authenticated=true;
			req.session.admin=false;
			req.session.flash={msg:"Welcome To WittyFood!"};
			if(data.admin){
				req.session.admin=true;
				return res.redirect('/user/adminpanel');
			}
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
				req.session.admin=false;
				if(data.admin){
					req.session.admin=true;
					return res.redirect('/user/adminpanel');
				}
				return res.redirect('/user/userpanel');
			}
			else{
				req.session.err={msg:"Phone Number/Password Didn't Match."};
				return res.redirect('/user/ulogin');
			} 
		});
	},
	userpanel:function(req,res){
		if(req.session.authenticated){
			User.findOne({phoneno:req.session.user.phoneno},function(err,data){
				console.log(data);
				return res.view({user:data});
			});
			return;
		}
		return res.redirect('/user/ulogin');
	},
	adminpanel:function(req,res){
		if(req.session.admin){
			Restaurant.findOne({admin:req.session.user.phoneno},function(err,data){
				if(err){
					console.log(err);
					res.redirect('/user/ulogin');
				}
				Order.find({restaurant:data.name},function(err,ord){
					var arr=[];
					ord.forEach(function(order){
						if(data.ord.indexOf(order.id)==-1){
							arr.push(order);
						}
					});
					return res.view({yetord:arr,compord:data.ord});
				});
			});
			return;
		}
		return res.redirect('/user/ulogin');
	},
	logout:function(req,res){
		if(req.session.authenticated){
			delete req.session.authenticated;
			delete req.session.user;
			delete req.session.admin;
		}
		return res.redirect('/user/ulogin');
	}
};

