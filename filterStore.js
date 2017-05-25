import StoreClass from '~/store/storeClass';
import {cloneClearFilter} from '~/service/parser';

class FilterStore extends StoreClass {
	constructor(filter){
		super({
			all: cloneClearFilter(filter.all),
			available: cloneClearFilter(filter.all),
			selected: cloneClearFilter(filter.mask),
			mask: cloneClearFilter(filter.mask)
		})
	}

	update(state, action){
		switch(action.type){
			case 'APPEND': 
				state.selected.map((el) => {
				  action.selected.map((item) => {
				    if(el.category == item.category) el.items = [...new Set([...el.items, ...item.items])];
				  })
				}); break;
			case 'DETACH':
				state.selected.map((el) => {
				  action.selected.map((item) => {
				    if(el.category == item.category) el.items = el.items.filter((del) => (false == del.includes(item.items)));
				  })
				}); break;
			case 'RESET': state.selected = cloneClearFilter(state.mask); break;
			case 'AVAILABLE': state.available = action.available; break;
			default: break;
		}
		
		return state;
	}

	append(filters){
		this._store.dispatch({type: 'APPEND', selected: filters})
	}

	detach(filters){
		this._store.dispatch({type: 'DETACH', selected: filters})
	}

	reset(){
		this._store.dispatch({type: 'RESET'})
	}

	setAvailable(available){
		this._store.dispatch({type: 'AVAILABLE', available: available})
	}
}



export default FilterStore;