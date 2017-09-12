/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	cres:function(req,res){
		return res.view();
	},
	orderfood:function(req,res){
		if(!req.session.user){
			return res.redirect('/user/ulogin');
		}
		Order.create({uphoneno:req.session.user.phoneno},function(err,data){
			User.findOne({phoneno:req.session.user.phoneno},function(err,udata){
				data.restaurant=req.param('name');
				data.item=[];
				var d=new Date();
				data.date=d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
				console.log(req.param('item'));
				var items=req.param('item');
				if(items.constructor==Array){
					data.item=items;
				}
				else{
					data.item.push(items);
				}
				data.save();
				udata.orders.push(data);
				udata.save();
				console.log(data);
				req.session.flash={msg:"Your Order Has Been Placed!"};
				return res.redirect('/user/userpanel');
			});
		});
	},
	createres:function(req,res){
		Restaurant.create({name:req.param('name')},function(err,data){
			if(err){
				console.log(err);
			}
			data.admin=req.param('admin');
			data.address=req.param('address');
			data.menu=['donuts','tea'];
			data.phoneno=req.param('phoneno');
			data.save();
			res.json(200,{msg:"Created Successfully."});
		});
	},
	getdet:function(req,res){
		Restaurant.find(function(err,rests){
			var arr=[];
			console.log(rests);
			rests.forEach(function(data){
				arr.push(data.name);
			});
			res.view({rest:arr});
		});	
	},
	getmenu:function(req,res){
		Restaurant.findOne({name:req.param('name')},function(err,rest){
			console.log(rest);
			return res.view({menu:rest});
		});
	},
	orderf:function(req,res){
		if(!req.session.admin){
			return res.redirect('/user/ulogin');
		}
		Order.findOne({id:req.param('id')},function(err,data){
			Restaurant.findOne({admin:req.session.user.phoneno},function(err,rest){
				if(rest.ord.indexOf(data.id)==-1) rest.ord.push(data.id);
				rest.save();
				return res.redirect('/user/adminpanel');
			});
		});
	}
};

