import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const Slide = ({index, uri, loaded, onLoad, style: customStyle}) => {
	
	return (
		<View style={[...customStyle]}>
			<Image onLoad={() => onLoad(index)} source={{uri}} style={style.image} />
			{!loaded && <Text>Loading...</Text>}
		</View>
	);
}

Slide.propTypes = {
	index: PropTypes.number.isRequired,
	uri: PropTypes.string.isRequired,
	loaded: PropTypes.bool.isRequired,
	onLoad: PropTypes.func.isRequired,
	style : PropTypes.array,
};

Slide.defaultProps = {
	style: [],
};

export default Slide;