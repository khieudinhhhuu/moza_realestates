
//bỏ qua màn login vào thẳng pages khi user đã login lần đầu
//nếu user đã logout thì app về điều hướng bt

class App extends React.Component {

    constructor() {
      super();
      this.state = {
        loading: true,
        authenticated: false,
      };
    }
  
    componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loading: false, authenticated: true });
        } else {
          this.setState({ loading: false, authenticated: false });
        }
      });
    }
  
    render() {
      if (this.state.loading) return null; // Render loading/splash screen etc
  
      if (!this.state.authenticated) {
        return <Login />;
      }
  
      return <Home />;
    }
  }



    // //Logout user

    // //Example of StackNavigator with this case
    // const Navigator = StackNavigator({
    //     Main: {
    //     screen: MainComponent,
    //     },
    //     Auth: {
    //     screen: AuthComponent,
    //     },
    //     Loading: {
    //     screen: LoadingComponent
    //     },
    // },{
    //     initialRouteName : 'Loading'
    // });


    // //in your LoadingComponent you will render your spinner
    // render() {
    //     return(
    //     <View style={styles.spinnerStyle}>
    //         <Spinner size="large" />
    //     </View>
    //     );
    // }

    // //And in componentDidMount of LoadingComponent :
    // firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //         navigate('Home');
    //     } else {
    //         navigate('Login');
    //     }
    // });

    // //And in your signOutUser redirect to Login pages
    // signOutUser = async () => {
    //     try {
    //         await firebase.auth().signOut();
    //         navigate('Auth');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }