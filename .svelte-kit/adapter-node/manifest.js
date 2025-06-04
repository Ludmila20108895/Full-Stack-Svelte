export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/beaches.png","images/caves.png","images/cities.png","images/explorer-logo.png","images/explorer-logo1.png","images/mountains.png","images/parks.png","images/restaurants.jpg","images/waterfall.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.BfNCW87B.js",app:"_app/immutable/entry/app.C_jcKyUQ.js",imports:["_app/immutable/entry/start.BfNCW87B.js","_app/immutable/chunks/DSzy27da.js","_app/immutable/chunks/BJmXy5sT.js","_app/immutable/chunks/Bzwl_pXD.js","_app/immutable/entry/app.C_jcKyUQ.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/BJmXy5sT.js","_app/immutable/chunks/DtBVwIPO.js","_app/immutable/chunks/CS5AdW1K.js","_app/immutable/chunks/Cne19o6N.js","_app/immutable/chunks/Bzwl_pXD.js","_app/immutable/chunks/DAoz8sdF.js","_app/immutable/chunks/6q39oKcq.js","_app/immutable/chunks/nFlSyP-m.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/added-places/[id]",
				pattern: /^\/added-places\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/auth/save-user",
				pattern: /^\/api\/auth\/save-user\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/save-user/_server.ts.js'))
			},
			{
				id: "/api/pois",
				pattern: /^\/api\/pois\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/pois/_server.ts.js'))
			},
			{
				id: "/api/pois/[id]/favourite",
				pattern: /^\/api\/pois\/([^/]+?)\/favourite\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/pois/_id_/favourite/_server.ts.js'))
			},
			{
				id: "/api/pois/[id]/images/[img]/delete",
				pattern: /^\/api\/pois\/([^/]+?)\/images\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false},{"name":"img","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/pois/_id_/images/_img_/delete/_server.ts.js'))
			},
			{
				id: "/api/pois/[id]/upload",
				pattern: /^\/api\/pois\/([^/]+?)\/upload\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/pois/_id_/upload/_server.ts.js'))
			},
			{
				id: "/charts",
				pattern: /^\/charts\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/favourites",
				pattern: /^\/favourites\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/logout/_server.ts.js'))
			},
			{
				id: "/pois",
				pattern: /^\/pois\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/pois/add",
				pattern: /^\/pois\/add\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";