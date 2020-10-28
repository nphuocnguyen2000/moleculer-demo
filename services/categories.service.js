"use strict";
const { MoleculerClientError } = require("moleculer").Errors;
const { ForbiddenError }       = require("moleculer-web").Errors;
const DbService                = require("moleculer-db");
const MongooseAdapter          = require("moleculer-db-adapter-mongoose");
const CATEGORY_COLL            = require("../models/category_coll"); 
/**
 * categories service
 */
module.exports = {

	name: "categories",
	mixins: [DbService],
	adapter: new MongooseAdapter(process.env.MONGO_URI || "mongodb://localhost:27017/moleculer-test", 
		{ 
			useNewUrlParser: true, 
			useUnifiedTopology: true 
		}
	),
	model: CATEGORY_COLL,
	/**
	 * Service settings
	 */
	settings: {
		fields: ["_id", "name", "products"],
		// populates : {
		// 	"products": {
		// 		action: "users.get",
		// 		params: ["_id"]
		// 	}
		// }
		entityValidator: {
			name: { type: "string"}
		}
	},

	/**
	 * Service metadata
	 */
	metadata: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		* Test action
		*/
		// test: {
		// 	async handler(ctx) {
		// 		return "Hello Moleculer";
		// 	}
		// }
		create: {
			rest: "POST /",
			params: {
				name: "string"
			},
			async handler(ctx){
				//CHECK VALID PARAMS
				if(!ctx.params){
					throw new MoleculerClientError("Invalid params!", 404, "INVALID_PARAMS");
				}
				//CHECK 
				let nameCategory = await this.adapter.findOne(ctx.params);
				if(nameCategory){
					throw new MoleculerClientError("NameCategory Existed!", 500, "NAMECATEGORY_EXISTED");
				}
				let infoCategory = await this.adapter.insert(ctx.params);
				if(!infoCategory){
					throw new MoleculerClientError("Invalid infoCategory!", 404, "INVALID_INFOCATEGORY");
				}
				console.log({infoCategory});
				return this.transformDocuments(ctx, {}, infoCategory);
			}
		}
	},

	/**
	 * Events
	 */
	events: {
		async "some.thing"(ctx) {
			this.logger.info("Something happened", ctx.params);
		}
	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
