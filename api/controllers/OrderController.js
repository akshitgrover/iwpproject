/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	orderfood:function(req,res){
		Order.create({phoneno:req.param(req.session.user.phoneno)},function(err,data){
			data.restaurant=req.param('restaurant');
			data.item=[];
			var items=req.param('item');
			if(items.constructor==Array){
				data.item=items;
			}
			else{
				data.item.push(items);
			}
			data.save();
			req.session.flash={msg:"Your Order Has Been Placed!"};
			return res.redirect('/user/userpanel');
		});
	}
};

