import StoreClass from '~/store/storeClass';
import TempGoods from '@/special.json';

class SearchStore extends StoreClass {
	constructor(list){
		super({inputValue: null, list: list, result: null, resultCnt: null})
	}
	update(state, action){
		switch(action.type){
			case 'INPUT_CHANGE': {
				if(null == state.inputValue) state.inputValue = action.input;
				else state.inputValue += action.input; state.result = null; 
				break;
			}
			case 'RESET': state.inputValue = ''; state.result = ''; break;
			case 'BACKSPACE': state.inputValue = state.inputValue.slice(0, -1); state.result = state.result.slice(0, -1); break;
			default: return state;
		}

		if('' == state.inputValue) return state;
		
		state.result = state.list.filter((el) => (el.sale.indexOf(state.inputValue) > -1)).map((el) => (el.key)); 
		state.resultCnt = state.result.length;

		for(let n in TempGoods){
			if(TempGoods[n].SALE.indexOf(state.inputValue) > -1) state.result.push(n);
		}

		return state;
	}

	inputChange(input){
		this._store.dispatch({type: 'INPUT_CHANGE', input: input})
	}

	reset(){
		this._store.dispatch({type: 'RESET'})
	}

	backspace(){
		this._store.dispatch({type: 'BACKSPACE'})
	}
}

export default SearchStore;