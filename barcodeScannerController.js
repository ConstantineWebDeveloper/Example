import BarcodeScannerSpec from './barcodeScannerSpec';

class BarcodeScannerController {
	constructor(store, sizes, sale){
		this.store = store;
		this.sizes = sizes;
		this.sale = sale;

		this.result = {
			key: null,
			item: null
		}

		this.scanValue = '';

		this.tempGoods = new BarcodeScannerSpec;

		this.waitScanning();
	}

	waitScanning(){
		document.onkeydown = (e) => {
			e = e || window.event;
			
			if(e.keyCode === 13) {
				this.initCheck();
				this.scanValue = '';
			}
			else this.scanValue += e.key;
		}
	}

	initCheck(){
		let key = null;

		this.scanValue = this.scanValue.replace(/Shift|%/gi, "");

		//console.log(this.scanValue)
		// console.time('SCANNER');

		if(/[A-z]/.test(this.scanValue) == true) {
			if(null == key) key = this.checkSaleField();
		}else{
			for(let Ast in this.sizes){
				if(true == this.checkSizesCode(Ast) || true == this.checkAstCode(Ast)) {
					key = this.sizes[Ast]['Ast']; break;
				} 
			}
		}

		//console.log(this.store.productStore.getStore.origin[key])
		if(null != key && 'undefined' != typeof this.store.productStore.getStore.origin[key] && 'undefined' != typeof this.store.productStore.getStore.origin[key].SALE ) {
			this.result = {
				key: key, 
				item: this.store.productStore.getStore.origin[key]}
			this.openProductCard();
			
		} else {
			let spec = this.tempGoods.startSearch({scanValue: this.scanValue});
			console.log(spec)
			if(spec.key != null) {
				this.result = spec;
				this.openProductCard('spec');
			} else this.notFound();
		}

		//console.log('RESULT', this.result)

		// console.timeEnd('SCANNER');
	}

	checkSizesCode(Ast){
		return (this.scanValue == this.sizes[Ast]['SIZECODE']) ? true : false;
	}

	checkAstCode(Ast){
		return (this.scanValue == Ast) ? true : false;
	}

	checkSaleField(){
		for(let n in this.sale){
			if(this.sale[n][1] != this.scanValue) continue;
			else return this.sale[n][0];
		}
		return false;
	}

	openProductCard(type = null){
		if(type == 'spec'){
			this.store.productCardViewStore.open(this.result.key, this.result.item, 'spec');
		}else{
			this.store.productCardViewStore.open(this.result.key, this.result.item);
		}
		this.store.orderStore.model(this.result.key);
	}

	notFound(){
		this.store.productCardViewStore.notFound();
	}
}

export default BarcodeScannerController;	