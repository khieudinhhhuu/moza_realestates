// import React from 'react'
// import PropTypes from 'prop-types'
// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
//   Text
// } from 'react-native'
// import ImagePicker from 'react-native-image-picker'
// import ImageResizer from 'react-native-image-resizer'
// import RNFS from 'react-native-fs'

// export default class PhotoUpload extends React.Component {
//   static propTypes = {
//     containerStyle: PropTypes.object,
//     photoPickerTitle: PropTypes.string,
//     maxHeight: PropTypes.number,
//     maxWidth: PropTypes.number,
//     format: PropTypes.string,
//     quality: PropTypes.number,
//     onPhotoSelect: PropTypes.func, // returns the base64 string of uploaded photo
//     onError: PropTypes.func, // if any error occur with response
//     onTapCustomButton: PropTypes.func, // on tap custom button
//     onStart: PropTypes.func, // when user starts (useful for loading, etc)
//     onCancel: PropTypes.func, // when user cancel
//     onResponse: PropTypes.func, // on response exists!
//     onRender: PropTypes.func, // after render
//     onResizedImageUri: PropTypes.func, // when image resized is ready
//     imagePickerProps: PropTypes.object // react-native-image-picker props
//   }

//   state = {
//     maxHeight: this.props.height || 600,
//     maxWidth: this.props.width || 600,
//     format: this.props.format || 'JPEG',
//     quality: this.props.quality || 100,
//     buttonDisabled: false
//   }

//   options = {
//     title: this.props.photoPickerTitle || 'Select Photo',
//     storageOptions: {
//       skipBackup: true,
//       path: 'images'
//     },
//     ...this.props.imagePickerProps
//   }

//   openImagePicker = () => {
//     this.setState({buttonDisabled: true})
//     if (this.props.onStart) this.props.onStart()

//     // get image from image picker
//     ImagePicker.showImagePicker(this.options, async response => {
//       this.setState({buttonDisabled: false})

//       let rotation = 0 
//       const {originalRotation} = response
      

//       if (this.props.onResponse) this.props.onResponse(response)

//       if (response.didCancel) {
//         console.log('User cancelled image picker')
//         if (this.props.onCancel) this.props.onCancel('User cancelled image picker')
//         return
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error)
//         if (this.props.onError) this.props.onError(response.error)
//         return
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton)
//         if (this.props.onTapCustomButton) this.props.onTapCustomButton(response.customButton)
//         return
//       }

//       let { maxHeight, maxWidth, quality, format } = this.state
      
//       //Determining rotation param
//       if ( originalRotation === 90) { 
//         rotation = 90 
//       } else if (originalRotation === 180) { 
//         //For a few images rotation is 180. 
//         rotation = -180 
//       } else if ( originalRotation === 270 )  {
//         //When taking images with the front camera (selfie), the rotation is 270.
//         rotation = -90 
//       }
//       // resize image
//       const resizedImageUri = await ImageResizer.createResizedImage(
//         `data:image/jpeg;base64,${response.data}`,
//         maxHeight,
//         maxWidth,
//         format,
//         quality,
//         rotation
//       )

//       if (this.props.onResizedImageUri) this.props.onResizedImageUri(resizedImageUri)

//       const filePath = Platform.OS === 'android' && resizedImageUri.uri.replace
//         ? resizedImageUri.uri.replace('file:/data', '/data')
//         : resizedImageUri.uri

//       // convert image back to base64 string
//       const photoData = await RNFS.readFile(filePath, 'base64')
//       let source = { uri: resizedImageUri.uri }
//       this.setState({
//         avatarSource: source
//       })

//       // handle photo in props functions as data string
//       if (this.props.onPhotoSelect) this.props.onPhotoSelect(photoData)
//     })
//   }

//   renderChildren = props => {
//     return React.Children.map(props.children, child => {
//       if (child && child.type === Image && this.state.avatarSource) {
//         return React.cloneElement(child, {
//           source: this.state.avatarSource
//         })
//       } else return child
//     })
//   }

//   componentDidUpdate() {
//     if (this.props.onAfterRender) this.props.onAfterRender(this.state)
//   }

//   render() {
//     return (
//       <View style={[styles.container, this.props.containerStyle]}>
//         <TouchableOpacity
//           onPress={this.openImagePicker}
//           disabled={this.state.buttonDisabled}
//         >
//           {this.renderChildren(this.props)}
//             <Image style={styles.imageAvatar} source={require('../../assets/image/trang.jpg')}/>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   imageAvatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 100, 
//   },
// })

import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, } from 'react-native';
var ImagePicker = require('react-native-image-picker');
import PhotoUpload from 'react-native-photo-upload';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
//import ImagePicker from 'react-native-image-picker';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {/* <Image 
            source={{ uri: this.state.filePath.path}} 
            style={{width: 100, height: 100}} /> */}
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          />
          <TextComponent style={{ alignItems: 'center' }}>
            {this.state.filePath.uri}
          </TextComponent>
          <TouchableOpacity style={styles.avatar} onPress={this.chooseFile.bind(this)}>
              <Image style={styles.imageAvatar} source={ this.state.filePath }/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 130, 
    borderWidth: 0.5,
    borderColor: '#666',
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
  },
  imageAvatar: {
    width: '90%',
    height: '90%',
    borderRadius: 100, 
  },
});

// import { Image } from 'react-native'
//  import PhotoUpload from 'react-native-photo-upload'

//  <PhotoUpload
//    onPhotoSelect={avatar => {
//      if (avatar) {
//        console.log('Image base64 string: ', avatar)
//      }
//    }}
//  >
//    <Image
//      style={{
//        paddingVertical: 30,
//        width: 150,
//        height: 150,
//        borderRadius: 75
//      }}
//      resizeMode='cover'
//      source={{
//        uri: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
//      }}
//    />
//  </PhotoUpload>