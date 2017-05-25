import React, {Component, createElement} from 'react';
import Banner from './Banner.jsx';
import KeyboardComposition from './keyboard/keyboardComposition.jsx';
import ListSlider from '~/view/components/common/listSlider.jsx';
import ProductListItem from '~/view/components/main/productList/productListItem.jsx';
import Config from '@/config.json';

class SearchComposition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: []
		}

		this.unsubscribe = props.store.searchStore.subscribe(() => {
			this.setState(() => {
				return {result: props.store.searchStore.getStore.result}
			})
		})
	}
	
	orientation(){

	let param = {
		className: "catalog-item-wrapper",
		perPage: 5,
		orientation: "horizontal" ,
		list: (null == this.state.result) ? [] : this.state.result,
		items: ProductListItem, 
		itemsParam: {
			store: this.props.store, lang: this.props.lang}
		};

	(Config.orientation.screen == 'vert') ? param.perPage = 6 :  param.perPage = 5;

	return param;

	}

	render(){	

		return (
			<section data-type="search" className="page-content-wrap">
				<div className="search-top">
					<Banner />
					<KeyboardComposition store={this.props.store} />  
      	</div>
      	{createElement(ListSlider, this.orientation(), null)}
		</section>)
	}

	componentWillUnmount(){
		this.unsubscribe();
	}
}

export default SearchComposition;