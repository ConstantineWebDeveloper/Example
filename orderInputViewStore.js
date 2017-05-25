import StoreClass from '~/store/storeClass';

class OrderInputViewStore extends StoreClass {
	constructor(){
		super({
			focus: 'phone',
			phone: '+38 (0',
			seller: ''
		})
	}

	update(state, action){
		switch(action.type){
			case 'CHANGE_FOCUS': state.focus = action.focus; break;
			case 'PHONE_INPUT': state.phone = action.phone; break;
			case 'SELLER_INPUT': state.seller = action.seller; break;
			case 'RESET': state = {focus: 'phone', phone: '+38 (0', seller: ''}; break;
			default: return state;
		}

		return state;
	}

	phoneValidate(value, char){
		if('delete' == char) {
		switch(value.length){
			case 10: return value.slice(0, -1); break;
			case 18: return value.slice(0, -2); break;
			case 15: return value.slice(0, -2); break;
			case 11: return value.slice(0, -3); break;
			default: if(6 < value.length) return value.slice(0, -1);else return value
			}
		}

    switch (value.length) {
      case 8: value += ') '+char; break;
      case 13: value += '-'+char; break;
      case 16: value += '-'+char; break;
      case 4:
      case 19: value = value; break;
      default: value += char; break;
    }

		return value;
	}

	sellerValidate(value, char){
		if('delete' == char) {
			if(0 < value.length) return value.slice(0, -1);
			else return value;
		}else{
			if(10 > value.length) return value+char;
			else return value;
		}
	}

	changeFocus(){
		let focus = ('phone' == this.getStore.focus) ? 'seller' : 'phone';
		this._store.dispatch({type: 'CHANGE_FOCUS', focus: focus});
	}

	phoneUpdate(value){
		this._store.dispatch({type: 'PHONE_INPUT', phone: this.phoneValidate(this.getStore.phone, value)});
	}

	sellerUpdate(value){
		this._store.dispatch({type: 'SELLER_INPUT', seller: this.sellerValidate(this.getStore.seller, value)});
	}

	reset(){
		this._store.dispatch({type: 'RESET'})
	}
}

export default OrderInputViewStore;