import React, {Component} from 'react';

class ScreenSaverSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 1, 
			path : 'build/img/screenSaver/',
			slideCnt: 3,
			current: 1
		} 

		this.timer = null; 
	}

	incrementCount(){
		this.timer = setTimeout(this.step.bind(this), 5000);
	}

	step(){
		let count = (this.state.count < this.state.slideCnt) ? ++this.state.count : 1;
		this.setState(() => {
			return { 
				count: count,
				current: (this.state.current == 1) ? 2 : 1
			}
		})
	}

	isCurrent(current){
		let cur = (this.state.current == current);

		return {
			current: cur ? 'slideOut' : 'slideIn',
			count: cur ? (this.state.count == 1) ? this.state.slideCnt : this.state.count - 1 : this.state.count
		}
	}

	render(){
		let slide1 = this.isCurrent(1);
		let slide2 = this.isCurrent(2);

		return (<div>
				<img className={`slide ${slide1.current}`} src={`${this.state.path}${slide1.count}.jpg`} alt="" />
				<img className={`slide ${slide2.current}`} src={`${this.state.path}${slide2.count}.jpg`} alt="" />
			</div>)
	}

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  componentDidMount(){
  	this.incrementCount();
  }

  componentDidUpdate(){
  	this.incrementCount();
  }
}

export default ScreenSaverSlider;