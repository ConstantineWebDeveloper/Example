import React, {Component} from 'react';
import KeyboardButton from './keyboardButton.jsx';

class KeyaboardComposition extends Component {
	constructor(props) {
		super(props);
		this.letters = 
						["1","2","3","4","5","6","7","8","9","0","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F",
					   	"G","H","J","K","L","-","delete", "Z","X","C","V","B","N","M", "backspace", "close"];
	}


	getButtons(){
		return this.letters.map((el) => (
				<KeyboardButton key={el} button={el} keyContext={this.getContext(el)} store={this.props.store} />
			))
	}

	getContext(val){
		switch(val){
			case 'delete': return 'Очистити';
			case 'backspace': return '';
			case 'close': return '';
			case 'language': return '';
			case 'space': return '';
			case 'enter': return 'Готово';
			default: return val;
		}
	}

	render(){
		return (
			<div className="keyboard">
				{this.getButtons()}
			</div>)
	}
}

export default KeyaboardComposition;