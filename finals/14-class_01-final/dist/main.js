(()=>{"use strict";var t={207:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e){this.timestamp=t,this.productos=e,this.id=0}}},627:function(t,e,o){var s=this&&this.__awaiter||function(t,e,o,s){return new(o||(o=Promise))((function(r,i){function d(t){try{u(s.next(t))}catch(t){i(t)}}function n(t){try{u(s.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(d,n)}u((s=s.apply(t,e||[])).next())}))},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(860),d=r(o(407)),n=r(o(951)),u=r(o(885)),a=(0,i.Router)(),c=new d.default("14-class_01-final_carts.json");a.post("/",((t,e)=>s(void 0,void 0,void 0,(function*(){try{const o=yield c.saveOne(u.default.buildCartFromRequest(t));e.status(200).send({message:`Cart guardado con el id ${o}`,id:o})}catch(t){console.error(t),e.status(500).send({message:"No se pudo guardar el carrito"})}})))),a.delete("/:id",((t,e)=>s(void 0,void 0,void 0,(function*(){const o=t.params.id;try{yield c.deleteById(Number(o)),e.status(200).send({message:`Carrito con el id ${o} eliminado`})}catch(t){console.error(t),e.status(500).send({message:`No se pudo eliminar el carrito con el id ${o}`})}})))),a.get("/:id",((t,e)=>s(void 0,void 0,void 0,(function*(){const o=t.params.id;try{const t=yield c.getById(Number(o));e.status(200).send(t)}catch(t){console.error(t),e.status(500).send({message:`No se pudo cargar el carrito con el id ${o}`})}})))),a.post("/:id/products",((t,e)=>s(void 0,void 0,void 0,(function*(){const o=Number(t.params.id);try{let s=yield c.getById(Number(o)),r=n.default.buildProductFromRequest(t);r.id=t.body.id,s.productos.push(r),yield c.updateOne(o,s),e.status(200).send({success:`Producto agregado con al carrito [${o}]`,product:r})}catch(t){console.error(t),e.status(500).send({message:`No se pudo guardar el producto en el carrito [${o}]`})}})))),a.delete("/:id/products/:id_prod",((t,e)=>s(void 0,void 0,void 0,(function*(){const o=Number(t.params.id),s=Number(t.params.id_prod);try{let t=yield c.getById(Number(o));t.productos=t.productos.filter((t=>t.id!=s)),yield c.updateOne(o,t),e.status(200).send({success:`Producto [${s}] eliminado del carrito [${o}]`})}catch(t){console.error(t),e.status(500).send({message:`No se pudo eliminar el producto [${s}] del carrito [${o}]`})}})))),e.default=a},885:function(t,e,o){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(o(245)),i=s(o(207));class d{}e.default=d,d.TIMESTAMP_FORMAT="DD/MM/YYYY - HH:mm:ss",d.buildCartFromRequest=t=>new i.default((0,r.default)().format((0,r.default)().format(d.TIMESTAMP_FORMAT)),t.body)},407:function(t,e,o){var s=this&&this.__awaiter||function(t,e,o,s){return new(o||(o=Promise))((function(r,i){function d(t){try{u(s.next(t))}catch(t){i(t)}}function n(t){try{u(s.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(d,n)}u((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const r=o(147),i=o(292);class d{constructor(t){this.getAll=()=>s(this,void 0,void 0,(function*(){try{return this.objects=yield JSON.parse(yield(0,i.readFile)(this.path,"utf-8")),this.objects}catch(t){throw new Error(`Error trying to read file: ${this.path}`)}})),this.saveAll=()=>s(this,void 0,void 0,(function*(){try{this.objects=this.objects.sort(((t,e)=>t.id-e.id)),yield(0,i.writeFile)(this.path,JSON.stringify(this.objects,null,"\t"),"utf-8")}catch(t){throw new Error(`Error trying to write file: ${this.path}`)}})),this.saveOne=t=>s(this,void 0,void 0,(function*(){try{return yield this.getAll(),t.id=this.objects.length?this.objects[this.objects.length-1].id+1:1,this.objects.push(t),yield this.saveAll(),t.id}catch(e){throw new Error(`Error trying to save object: ${t}`)}})),this.getById=t=>s(this,void 0,void 0,(function*(){yield this.getAll();let e=this.objects.filter((e=>e.id===t))[0];if(!e)throw new Error(`No se encontró el id ${t}`);return e})),this.updateOne=(t,e)=>s(this,void 0,void 0,(function*(){yield this.getAll();const o=this.objects.filter((e=>e.id!=t));if(this.objects.length==o.length)throw new Error(`No se encontró el id ${t}`);e.id=t,o.push(e),this.objects=o,yield this.saveAll()})),this.deleteById=t=>s(this,void 0,void 0,(function*(){yield this.getAll();const e=this.objects.length;if(this.objects=this.objects.filter((e=>e.id!==t)),e==this.objects.length)throw new Error(`No se encontró el id ${t}`);yield this.saveAll()})),this.name=t,this.path=d.DIRECTORY+this.name,this.objects=new Array,d.mkdir()}}e.default=d,d.DIRECTORY="./data/",d.mkdir=()=>s(void 0,void 0,void 0,(function*(){try{if((0,r.existsSync)(d.DIRECTORY))return;yield(0,i.mkdir)(d.DIRECTORY)}catch(t){throw new Error(`Error trying to create the directory: ${d.DIRECTORY}`)}}))},607:function(t,e,o){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(o(860)),i=s(o(142)),d=s(o(187)),n=s(o(627));i.default.config();const u=(0,r.default)(),a=process.env.PORT||8080;u.use(r.default.json()),u.use(r.default.urlencoded({extended:!0})),u.use("/api/products",d.default),u.use("/api/carts",n.default),u.get("*",((t,e)=>{e.status(404).send({error:-2,description:"Ruta no implementada"})})),u.listen(a,(()=>{console.log(`🚀 [Server]: Server is running at port ${a}`)})).on("error",(t=>{console.error("⚠️ [Server]: Error on server",t)}))},768:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,o,s,r){this.name=t,this.price=e,this.thumbnail=o,this.stock=r,this.timestamp=s,this.id=0}}},951:function(t,e,o){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(o(245)),i=s(o(768));class d{}e.default=d,d.TIMESTAMP_FORMAT="DD/MM/YYYY - HH:mm:ss",d.buildProductFromRequest=t=>{const{name:e,thumbnail:o,price:s,stock:n}=t.body;return new i.default(e,s,o,(0,r.default)().format((0,r.default)().format(d.TIMESTAMP_FORMAT)),n)}},187:function(t,e,o){var s=this&&this.__awaiter||function(t,e,o,s){return new(o||(o=Promise))((function(r,i){function d(t){try{u(s.next(t))}catch(t){i(t)}}function n(t){try{u(s.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(d,n)}u((s=s.apply(t,e||[])).next())}))},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(860),d=r(o(407)),n=r(o(951)),u=r(o(321)),a=(0,i.Router)(),c=new d.default("14-class_01-final_products.json");a.get("/",((t,e)=>s(void 0,void 0,void 0,(function*(){try{const t=yield c.getAll();e.status(200).send(t)}catch(t){console.error(t),e.status(500).send({message:"No se pudo cargar los productos"})}})))),a.get("/:id",((t,e)=>s(void 0,void 0,void 0,(function*(){const o=t.params.id;try{const t=yield c.getById(Number(o));e.status(200).send(t)}catch(t){console.error(t),e.status(500).send({message:`No se pudo cargar el producto con el id ${o}`})}})))),a.post("/",((t,e)=>s(void 0,void 0,void 0,(function*(){if((0,u.default)("/products","post",e))try{const o=yield c.saveOne(n.default.buildProductFromRequest(t));e.status(200).send({message:`Producto guardado con el id ${o}`,id:o})}catch(t){console.error(t),e.status(500).send({message:"No se pudo guardar el producto"})}})))),a.put("/:id",((t,e)=>s(void 0,void 0,void 0,(function*(){if((0,u.default)("/products","put",e))try{yield c.updateOne(Number(t.params.id),n.default.buildProductFromRequest(t)),e.status(200).send({success:`Producto actualizado con el id [${t.params.id}]`})}catch(t){console.error(t),e.status(500).send({message:"No se pudo actualizar el producto"})}})))),a.delete("/:id",((t,e)=>s(void 0,void 0,void 0,(function*(){if(!(0,u.default)("/products","delete",e))return;const o=t.params.id;try{yield c.deleteById(Number(o)),e.status(200).send({message:`Producto con el id ${o} eliminado`})}catch(t){console.error(t),e.status(500).send({message:`No se pudo eliminar el producto con el id ${o}`})}})))),e.default=a},321:function(t,e,o){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),s(o(142)).default.config();const r=process.env.IS_ADMIN||"true";e.default=(t,e,o)=>"true"==r||(o.status(501).send({error:-1,message:`url ${t} method ${e} not authorized`}),!1)},142:t=>{t.exports=require("dotenv")},860:t=>{t.exports=require("express")},245:t=>{t.exports=require("moment")},147:t=>{t.exports=require("fs")},292:t=>{t.exports=require("fs/promises")}},e={};!function o(s){var r=e[s];if(void 0!==r)return r.exports;var i=e[s]={exports:{}};return t[s].call(i.exports,i,i.exports,o),i.exports}(607)})();