import React, { Component } from 'react';
import { ScrollView, View, Image, Text, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import ScreenWrapper from 'app/components/common/ScreenWrapper';
import ScreenLoading from 'app/components/common/ScreenLoading';
import QuickHelp from 'app/components/Home/QuickHelp';
import OperatingHours from 'app/components/Home/OperatingHours';
import Slide from 'app/components/Slide';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import style from './style';

class Home extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleImageLoaded = this.handleImageLoaded.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			data: [
				{ url: 'https://i.imgur.com/MtjAPCJ.png' },
				{ url: 'https://i.imgur.com/VHE366s.png' },
				{ url: 'https://i.imgur.com/jHyN5vz.png' },
			],
			loadQueue: []
		};
	}

	/**
	 * Update the loaded status of the image with the given index
	 * @param  {Number} i The index of the image
	 * @return {Void}   
	 */
	handleImageLoaded(i) {
		const queue = [...this.state.loadQueue];
		queue[i] = true;

		this.setState({loadQueue: queue});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {office} = this.props;
		const {data, loadQueue} = this.state;

		if(!office.id) {
			return <ScreenLoading />;
		}

		return (
			<ScrollView contentContainerStyle={{display: 'flex'}}>

				<View style={{height: 250}}>
					<Swiper>
						{data.map(({url, ready}, i) => {
							return (
								<Slide
									key={i}
									index={i}
									uri={url}
									loaded={!!loadQueue[i]}
									onLoad={this.handleImageLoaded} 
								/>
							);
						})}
					</Swiper>
				</View>

				<ScreenWrapper style={[{paddingTop: 0}]}>
					<Text style={[style.title]}>{office.name}</Text>

					<QuickHelp style={[{marginBottom: 15}]} />

					{office.ready && <OperatingHours hours={office.operating_hours} />}

					<View style={{height: 200, backgroundColor: 'lime'}}>
						<Text>Review container</Text>
					</View>

					<View style={{height: 200, backgroundColor: 'green'}}>
						<Text>"Office Description/Bio"</Text>
					</View>

					<Text style={[style.title]}>About the Doctor</Text>

					<View style={{height: 200, backgroundColor: 'turquoise'}}>
						<Text>Picture of Doctor?</Text>
					</View>

					<View style={{height: 200, backgroundColor: 'lightblue'}}>
						<Text>Bio of Doctor</Text>
					</View>
				</ScreenWrapper>
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} options.office The office model
 * @return {Object}                  
 */
function mapStateToProps({office}) {
	return {
		office,
	};
}

/**
 * Map the store's action dispatcher to the component's props
 * @param  {Function} dispatch The dispatch function
 * @return {Object}           
 */
function mapDispatchToProps(dispatch) {
	return {
		setUserModel: (data) => dispatch(UserAction.setUserModel(data)),
	};
}