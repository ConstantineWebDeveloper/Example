import React, {Component, findDOMNode} from 'react';
import KeyboardButton from '~/view/components/common/keyboardButton.jsx';
import Config from '@/config.json';
import {innerNumberGenerator} from '~/service/generator';
import request from 'browser-request';
import {ParsePhoneNamber} from '~/service/parser';

class OrderPhone extends Component {
	constructor(props) {
		super(props);
		
		this.state = this.props.store.orderInputViewStore.getStore;

		this.unsubscribe = props.store.orderInputViewStore.subscribe(() => {
			this.setState(() => (this.props.store.orderInputViewStore.getStore))
		})
	}

	changeFocus(input){
		if(input == this.state.focus) return;
		this.props.store.orderInputViewStore.changeFocus();
	}

	inputNumber(){
	    if('phone' == this.state.focus) this.props.store.orderInputViewStore.phoneUpdate(this.props.button);
			else this.props.store.orderInputViewStore.sellerUpdate(this.props.button);
		}

	getKeyboard(){
		let keyboard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'delete']
		return keyboard.map((key) => (<KeyboardButton key={key} button={key} click={this.inputNumber} store={this.props.store} state={this.state} />))
	}

	isNext(){
		return (this.state.phone.length == 19 && ParsePhoneNamber(this.state.phone) ) ? '': 'disable';
	}

	cheackWrongNam(){
		return  (this.state.phone.length <= 7 || ParsePhoneNamber(this.state.phone) ) ? '': 'wrong';
	}

	nextStep(){
		if(19 > this.state.phone.length ) return;

		let date = new Date();
		let dt = date.getDate()+'.'+((date.getMonth()+1)<10?'0':'')+(date.getMonth()+1)+'.'+date.getFullYear()+':'+(date.getHours()<10?'0':'') + date.getHours()+':'+(date.getMinutes()<10?'0':'') + date.getMinutes()+':'+(date.getSeconds()<10?'0':'') + date.getSeconds();
		let target = (this.props.store.orderStore.getStore.deliveryType == 'address') ? 'address' : this.props.store.orderStore.getStore.store;
		let number = innerNumberGenerator();
		let selle = (0 < this.state.seller.length) ? this.state.seller : null;
		let priceVar = ('undefined' != typeof this.props.store.productCardViewStore.getStore.product) ? this.props.store.productCardViewStore.getStore.product['PRICE_ACTION'] : 'undefined';

		let url = Config.main.restURL+"?ORDERS?"+this.props.store.orderStore.getStore.orderType+"="+target+";phone="+this.state.phone.replace(/[^0-9]+/g, '').replace(/\s+/g, '')+";model="+this.props.store.orderStore.getStore.model+";size="+this.props.store.orderStore.getStore.size+";price="+priceVar+";time="+dt+";innerNumber="+number+";target="+Config.main.shopCode+";sellerCode=" + this.state.seller;

		request({method:'GET', url: url}, (err, response, body) => {
			if(err) console.log(err);
			console.log(response)
			if(response.statusCode == 200) this.props.store.orderStore.confirmOrder(number);
			console.log(body);
		})
	}

	getClass(id){
		return (id == this.state.focus) ? 'active' : '';
	}
	render(){
		return (
			<div data-type="phone">

				<div className="phone-area">
					<div className="number-block"> 
						<h1>Введіть контактний номер</h1>
						<input id="phone" className={this.getClass('phone')} data-mask="+38 (099) 999-99-99" value={this.state.phone} autoComplete="off" type="text" name="" readOnly onClick={() => this.changeFocus('phone')} />
						<div> <span className={this.cheackWrongNam()} >Некоректний набір</span> </div>
						<p></p>
					</div> 
					
					<div className="consultant-area"> 
						<h1>Номер консультанта</h1>
						<input id="seller" className={this.getClass('seller')} type="text" value={this.state.seller} readOnly onClick={() => this.changeFocus('seller')} />
						<p>Якщо Ви задоволені роботою продавця-консультанта, будь ласка, введіть його номер для підтримки якості обслуговування</p>
					</div>

					<div className="phone-keyboard">
						{this.getKeyboard()}
					</div>
				</div>

				<div className={"border-button-accept "+this.isNext()} onClick={this.nextStep.bind(this)}><p>{this.props.lang.button.confirm}</p></div>
			</div>)
	}

	componentWillUnmount(){
		this.unsubscribe();
	}
}

export default OrderPhone;