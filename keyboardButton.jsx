import React, {Component} from 'react';
import SearchStore from '~/store/catalog/searchStore.js';

class KeyboardButton extends Component {
	constructor(props) {
		super(props);
	}

	getButtonVal(){
		switch(this.props.button){
			case '': 
			case 'enter': 
			case 'space': break;
			case 'close':
				this.props.store.searchStore.reset();
				this.props.store.pageStore.changePage('primary'); break;
			case 'delete': this.props.store.searchStore.reset(); break;
			case 'backspace': this.props.store.searchStore.backspace(); break;
			default: this.props.store.searchStore.inputChange(this.props.button); break;
		}
	}

	getButtonClass(){
		switch(this.props.button){
			default: return 'simple-button'; break;
		}
	}

	render(){
		return (
			<div className={this.getButtonClass()} data-paste={this.props.button} onClick={this.getButtonVal.bind(this)}>
				<p>{this.props.keyContext}</p>
			</div>)
	}
}

export default KeyboardButton;