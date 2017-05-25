import StoreClass from '~/store/storeClass';

class ScreenSaversStore extends StoreClass {
	constructor(){
		super({open: true})
	}

	update(state, action){
		var self = this;

		switch(action.type){
				case 'open':  return Object.assign(state, {open: true});   break;
				case 'close': return Object.assign(state, {open: false});  break;
			default: return state;
		}

		return state;
	}


	open(){
		this._store.dispatch({type: 'open'})
	}

	close(){
		this._store.dispatch({type: 'close'})
	}



}

export default ScreenSaversStore;